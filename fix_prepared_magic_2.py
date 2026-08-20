import re

with open('src/App.tsx', 'r') as f:
    app_tsx = f.read()

old_logic = """    if (bonus.gameplayPattern === 'prepared-magic') {
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
    }"""

new_logic = """    if (bonus.gameplayPattern === 'prepared-magic') {
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
        // State 2 -> State 0
        const cost = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : (bonus.costValue || 0);
        const resource = activeVariant?.costResource || bonus.costResource;
        if (resource === 'PM') setCurrentPM(prev => Math.min(maxPM, prev + cost));
        else if (resource === 'PA') setCurrentPA(prev => Math.min(maxPA, prev + cost));
        else if (resource === 'PV') setCurrentPV(prev => Math.min(maxPV, prev + cost));
        
        setActiveBonuses((current) => { const next = new Set(current); next.delete(id); return next; });
        updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), prepared: false } });
        return;
      }
    }"""

app_tsx = app_tsx.replace(old_logic, new_logic)

with open('src/App.tsx', 'w') as f:
    f.write(app_tsx)

with open('src/components/play/PlayMode.tsx', 'r') as f:
    play_tsx = f.read()

btn_logic = """{bonus.gameplayPattern === 'prepared-magic' && bonus.assistedState?.prepared && !isActive ? <span className="bonus-toggle-raw-name" onClick={(event) => event.stopPropagation()}><button type="button" className="bonus-remove-btn" onClick={() => configureAssistedBonus(bonus.id, { prepared: false })}>Cancelar preparo</button></span> : null}"""
play_tsx = play_tsx.replace(btn_logic, "")

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(play_tsx)

print("Done")
