import re

with open('src/components/play/PlayMode.tsx', 'r') as f:
    tsx = f.read()

old_block = """                  <div key={bonus.id} className={`bonus-toggle ${isActive ? 'active' : ''}`} onClick={() => toggleActiveBonus(bonus.id)} onContextMenu={(e) => { e.preventDefault(); setDetailModal({ title: bonus.alias || bonus.name, subtitle: getBonusSubtitle(bonus), body: `${bonus.name !== (bonus.alias || bonus.name) ? `Base: ${bonus.name}\\n\\n` : ''}${activeVariant?.note || bonus.persistentAssisted?.note || bonus.temporaryPackage?.note || 'Técnica configurada nesta forma.'}`, tone: 'technique' }); }} title={`${bonus.alias || bonus.name}: ${getBonusSubtitle(bonus)}`}>
                    <div className="bonus-toggle-header">
                      <span className="bonus-toggle-label">{bonus.alias ? bonus.alias : bonus.name}</span>
                      {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: '#33ccff', color: '#000' }}>CENA</span>}
                      {isImmediate && <span className="bonus-attr-micro" style={{ background: '#ffd166', color: '#000' }}>AÇÃO</span>}
                      {isPersistentAssisted && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.active ? (assistedConfig?.statusLabel || 'ATIVO') : 'ASSISTIDO'}</span>}
                      {isTemporaryPackage && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ffd166', color: '#000' }}>{bonus.assistedState?.active ? (temporaryConfig?.statusLabel || 'PACOTE') : 'PACOTE'}</span>}

                      {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.prepared ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.prepared ? 'PREPARADA' : 'DESPREPARADA'}</span>}
                      

                      {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute.charAt(0).toUpperCase()}</span>}
                    </div>
                    {bonus.alias && <span className="bonus-toggle-raw-name">{bonus.name}</span>}
                    <span className="bonus-toggle-value">{getBonusSubtitle(bonus)}</span>
                    {isPersistentAssisted && assistedConfig?.triggerCostValue ? <span className="bonus-toggle-raw-name">{assistedConfig.triggerLabel || 'Acionar'} [-{assistedConfig.triggerCostValue} {assistedConfig.triggerCostResource || 'PM'}]</span> : null}
                    {isPersistentAssisted && typeof bonus.assistedState?.stockCount === 'number' ? <span className="bonus-toggle-raw-name">Estoque: {bonus.assistedState.stockCount}</span> : null}
                    {isPersistentAssisted && assistedConfig?.kind === 'stock' && !bonus.assistedState?.active && assistedConfig.stockMaxAttribute ? <span className="bonus-toggle-raw-name" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} onClick={(event) => event.stopPropagation()}><button type="button" className="bonus-remove-btn" onClick={() => { const current = bonus.assistedState?.configuredStock ?? assistedConfig.stockMin ?? 0; configureAssistedBonus(bonus.id, { configuredStock: Math.max(assistedConfig.stockMin ?? 0, current - 1) }); }}>−</button><span>Preparar: {bonus.assistedState?.configuredStock ?? assistedConfig.stockCount ?? assistedConfig.stockMin ?? 0}</span><button type="button" className="bonus-remove-btn" onClick={() => { const baseMaximum = assistedConfig.stockMaxAttribute === 'poder' ? poder : assistedConfig.stockMaxAttribute === 'resistencia' ? resistencia : habilidade; const multiplier = assistedConfig.stockMaxMultiplierAttribute === 'poder' ? poder : assistedConfig.stockMaxMultiplierAttribute === 'resistencia' ? resistencia : assistedConfig.stockMaxMultiplierAttribute === 'habilidade' ? habilidade : 1; const maximum = baseMaximum * multiplier; const current = bonus.assistedState?.configuredStock ?? assistedConfig.stockMin ?? 0; configureAssistedBonus(bonus.id, { configuredStock: Math.min(maximum, current + 1) }); }}>+</button></span> : null}
                    {isPersistentAssisted && bonus.assistedState?.active ? <span className="bonus-toggle-raw-name" onClick={(event) => event.stopPropagation()}><button type="button" className="bonus-remove-btn" onClick={() => endAssistedBonus(bonus.id)}>Encerrar sem acionar</button></span> : null}
                    {isTemporaryPackage ? <span className="bonus-toggle-raw-name">{bonus.assistedState?.active ? `Pacote: ${(bonus.assistedState.packageChoices || []).map((id) => ADVANTAGES_CATALOG.find((advantage) => advantage.id === id)?.name || id).join(', ') || 'escolhas narrativas'}` : 'Toque para ativar o pacote assistido'}</span> : null}
                    {isTemporaryPackage && bonus.assistedState?.active && temporaryConfig?.maintenanceCostValue ? <span className="bonus-toggle-raw-name" onClick={(event) => event.stopPropagation()}><button type="button" className="bonus-remove-btn" onClick={() => maintainTemporaryPackage(bonus.id)}>Manter [-{temporaryConfig.maintenanceCostValue} {temporaryConfig.maintenanceCostResource || 'PM'}]</button></span> : null}

                    
                    

                    {bonus.variants && bonus.variants.length > 1 ? <span className="bonus-toggle-raw-name" style={{ marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={(e) => { e.stopPropagation(); cycleBonusVariant(bonus.id); }} title="Alternar variante">↻</button><span>{activeVariant?.label || 'Variante'}</span></span> : null}
                  </div>"""


new_block = """                  <div key={bonus.id} className={`bonus-toggle ${isActive ? 'active' : ''}`} onClick={() => toggleActiveBonus(bonus.id)} onContextMenu={(e) => { e.preventDefault(); setDetailModal({ title: bonus.alias || bonus.name, subtitle: getBonusSubtitle(bonus), body: `${bonus.name !== (bonus.alias || bonus.name) ? `Base: ${bonus.name}\\n\\n` : ''}${activeVariant?.note || bonus.persistentAssisted?.note || bonus.temporaryPackage?.note || 'Técnica configurada nesta forma.'}`, tone: 'technique' }); }} title={`${bonus.alias || bonus.name}: ${getBonusSubtitle(bonus)}`}>
                    <div className="bt-top">
                      <div className="bt-title">
                        <span className="bt-name">{bonus.alias ? bonus.alias : bonus.name}</span>
                        {bonus.alias && <span className="bt-raw-name">{bonus.name}</span>}
                      </div>
                      <div className="bt-badges">
                        {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: '#33ccff', color: '#000' }}>CENA</span>}
                        {isImmediate && <span className="bonus-attr-micro" style={{ background: '#ffd166', color: '#000' }}>AÇÃO</span>}
                        {isPersistentAssisted && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.active ? (assistedConfig?.statusLabel || 'ATIVO') : 'ASSISTIDO'}</span>}
                        {isTemporaryPackage && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ffd166', color: '#000' }}>{bonus.assistedState?.active ? (temporaryConfig?.statusLabel || 'PACOTE') : 'PACOTE'}</span>}
                        {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.prepared ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.prepared ? 'PREPARADA' : 'DESPREPARADA'}</span>}
                        {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute.charAt(0).toUpperCase()}</span>}
                      </div>
                    </div>
                    
                    <div className="bt-body">
                      <span className="bt-effect">{getBonusSubtitle(bonus)}</span>
                    </div>

                    {(isPersistentAssisted || isTemporaryPackage || (bonus.variants && bonus.variants.length > 1)) && (
                      <div className="bt-footer" onClick={(event) => event.stopPropagation()}>
                        {isPersistentAssisted && assistedConfig?.triggerCostValue ? <span>{assistedConfig.triggerLabel || 'Acionar'} [-{assistedConfig.triggerCostValue} {assistedConfig.triggerCostResource || 'PM'}]</span> : null}
                        {isPersistentAssisted && typeof bonus.assistedState?.stockCount === 'number' ? <span>Estoque: {bonus.assistedState.stockCount}</span> : null}
                        {isPersistentAssisted && assistedConfig?.kind === 'stock' && !bonus.assistedState?.active && assistedConfig.stockMaxAttribute ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><button type="button" className="bonus-remove-btn" onClick={() => { const current = bonus.assistedState?.configuredStock ?? assistedConfig.stockMin ?? 0; configureAssistedBonus(bonus.id, { configuredStock: Math.max(assistedConfig.stockMin ?? 0, current - 1) }); }}>−</button><span>Preparar: {bonus.assistedState?.configuredStock ?? assistedConfig.stockCount ?? assistedConfig.stockMin ?? 0}</span><button type="button" className="bonus-remove-btn" onClick={() => { const baseMaximum = assistedConfig.stockMaxAttribute === 'poder' ? poder : assistedConfig.stockMaxAttribute === 'resistencia' ? resistencia : habilidade; const multiplier = assistedConfig.stockMaxMultiplierAttribute === 'poder' ? poder : assistedConfig.stockMaxMultiplierAttribute === 'resistencia' ? resistencia : assistedConfig.stockMaxMultiplierAttribute === 'habilidade' ? habilidade : 1; const maximum = baseMaximum * multiplier; const current = bonus.assistedState?.configuredStock ?? assistedConfig.stockMin ?? 0; configureAssistedBonus(bonus.id, { configuredStock: Math.min(maximum, current + 1) }); }}>+</button></span> : null}
                        {isPersistentAssisted && bonus.assistedState?.active ? <span><button type="button" className="bonus-remove-btn" onClick={() => endAssistedBonus(bonus.id)}>Encerrar sem acionar</button></span> : null}
                        {isTemporaryPackage ? <span>{bonus.assistedState?.active ? `Pacote: ${(bonus.assistedState.packageChoices || []).map((id) => ADVANTAGES_CATALOG.find((advantage) => advantage.id === id)?.name || id).join(', ') || 'escolhas narrativas'}` : 'Ative o pacote assistido'}</span> : null}
                        {isTemporaryPackage && bonus.assistedState?.active && temporaryConfig?.maintenanceCostValue ? <span><button type="button" className="bonus-remove-btn" onClick={() => maintainTemporaryPackage(bonus.id)}>Manter [-{temporaryConfig.maintenanceCostValue} {temporaryConfig.maintenanceCostResource || 'PM'}]</button></span> : null}
                        {bonus.variants && bonus.variants.length > 1 ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={() => cycleBonusVariant(bonus.id)} title="Alternar variante">↻</button><span>{activeVariant?.label || 'Variante'}</span></span> : null}
                      </div>
                    )}
                  </div>"""

# I need to use regex since spacing might differ
# Let's just find everything between `<div key={bonus.id}` and the end of that map function
idx_start = tsx.find('<div key={bonus.id} className={`bonus-toggle ${isActive ? \'active\' : \'\'}`}')
idx_end = tsx.find('                );\n              })}\n            </div>', idx_start)

if idx_start != -1 and idx_end != -1:
    tsx = tsx[:idx_start] + new_block + '\n' + tsx[idx_end:]
    with open('src/components/play/PlayMode.tsx', 'w') as f:
        f.write(tsx)
    print("PlayMode updated")
else:
    print("Could not find block")
