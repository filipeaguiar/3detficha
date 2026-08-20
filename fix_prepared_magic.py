import re

# 1. Update App.tsx `toggleActiveBonus`
with open('src/App.tsx', 'r') as f:
    app_tsx = f.read()

toggle_logic = """
    if (bonus.gameplayPattern === 'prepared-magic') {
      if (!bonus.assistedState?.prepared) {
        // State 0 -> State 1
        const cost = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : (bonus.costValue || 0);
        const resource = activeVariant?.costResource || bonus.costResource;
        spendResource(resource, cost);
        updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), prepared: true } });
        return;
      } else if (!activeBonuses.has(id)) {
        // State 1 -> State 2
        setActiveBonuses((current) => { const next = new Set(current); next.add(id); return next; });
        return;
      } else {
        // State 2 -> State 1
        setActiveBonuses((current) => { const next = new Set(current); next.delete(id); return next; });
        return;
      }
    }

    if (bonus.temporaryPackage) {
"""
app_tsx = app_tsx.replace("    if (bonus.temporaryPackage) {", toggle_logic)

# 2. Update App.tsx `Auto-deactivate instant bonuses`
reset_logic = """
      // Auto-deactivate instant bonuses and reset prepared magic
      setActiveBonuses(prev => {
        const next = new Set<string>();
        rollBonuses.forEach(b => {
          if (b.duration === 'scene' && prev.has(b.id)) {
            next.add(b.id);
          }
        });
        return next;
      });

      // Reset prepared state for prepared-magic that were active (consumed)
      activeBonusesList.forEach(b => {
        if (b.gameplayPattern === 'prepared-magic' && b.assistedState?.prepared) {
          updateRollBonus(b.id, { assistedState: { ...(b.assistedState || {}), prepared: false } });
        }
      });
"""
app_tsx = app_tsx.replace("""
      // Auto-deactivate instant bonuses
      setActiveBonuses(prev => {
        const next = new Set<string>();
        rollBonuses.forEach(b => {
          if (b.duration === 'scene' && prev.has(b.id)) {
            next.add(b.id);
          }
        });
        return next;
      });
""", reset_logic)

with open('src/App.tsx', 'w') as f:
    f.write(app_tsx)

# 3. Update PlayMode.tsx rendering
with open('src/components/play/PlayMode.tsx', 'r') as f:
    play_tsx = f.read()

badge_logic = """
                      {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.prepared ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.prepared ? 'PREPARADA' : 'DESPREPARADA'}</span>}
                      {bonus.gameplayPattern === 'narrative' && <span className="bonus-attr-micro" style={{ background: '#ff8fab', color: '#000' }}>MESA</span>}
"""
play_tsx = play_tsx.replace("                      {bonus.gameplayPattern === 'narrative' && <span className=\"bonus-attr-micro\" style={{ background: '#ff8fab', color: '#000' }}>MESA</span>}", badge_logic)

unprepare_logic = """
                    {bonus.gameplayPattern === 'prepared-magic' && bonus.assistedState?.prepared && !isActive ? <span className="bonus-toggle-raw-name" onClick={(event) => event.stopPropagation()}><button type="button" className="bonus-remove-btn" onClick={() => updateRollBonus(bonus.id, { assistedState: { ...bonus.assistedState, prepared: false } })}>Cancelar preparo</button></span> : null}
                    {bonus.tableNotes?.length ? <span className="bonus-toggle-raw-name" style={{ color: '#ffd166' }}>Mesa: {bonus.tableNotes.join(' • ')}</span> : null}
"""
play_tsx = play_tsx.replace("                    {bonus.tableNotes?.length ? <span className=\"bonus-toggle-raw-name\" style={{ color: '#ffd166' }}>Mesa: {bonus.tableNotes.join(' • ')}</span> : null}", unprepare_logic)

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(play_tsx)

print("Done")
