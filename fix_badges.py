import re

with open('src/components/play/PlayMode.tsx', 'r') as f:
    play_tsx = f.read()

# Replace attribute badge text with Icons
old_badges = """                        {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: '#33ccff', color: '#000' }}>CENA</span>}
                        {isImmediate && <span className="bonus-attr-micro" style={{ background: '#ffd166', color: '#000' }}>AÇÃO</span>}
                        {isPersistentAssisted && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.active ? (assistedConfig?.statusLabel || 'ATIVO') : 'ASSISTIDO'}</span>}
                        {isTemporaryPackage && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ffd166', color: '#000' }}>{bonus.assistedState?.active ? (temporaryConfig?.statusLabel || 'PACOTE') : 'PACOTE'}</span>}
                        {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.prepared ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.prepared ? 'PREPARADA' : 'DESPREPARADA'}</span>}
                        {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute.charAt(0).toUpperCase()}</span>}"""

new_badges = """                        {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: 'transparent', color: '#33ccff', fontSize: '0.85rem' }} title="Dura até o fim da cena">⏳</span>}
                        {isImmediate && <span className="bonus-attr-micro" style={{ background: 'transparent', color: '#ffd166', fontSize: '0.85rem' }} title="Ação Imediata">⚡</span>}
                        {isPersistentAssisted && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.active ? (assistedConfig?.statusLabel || 'ATIVO') : 'ASSISTIDO'}</span>}
                        {isTemporaryPackage && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ffd166', color: '#000' }}>{bonus.assistedState?.active ? (temporaryConfig?.statusLabel || 'PACOTE') : 'PACOTE'}</span>}
                        {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: 'transparent', color: bonus.assistedState?.prepared ? '#7bd389' : '#ff8fab', fontSize: '0.85rem' }} title={bonus.assistedState?.prepared ? 'Magia Preparada' : 'Magia Despreparada'}>{bonus.assistedState?.prepared ? '✨' : '🔮'}</span>}
                        {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ background: 'transparent', width: '14px', height: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute === 'poder' ? <PoderIcon /> : bonus.attribute === 'habilidade' ? <HabilidadeIcon /> : <ResistenciaIcon />}</span>}"""

play_tsx = play_tsx.replace(old_badges, new_badges)

# Remove the variant cycler button
old_cycler = """{bonus.variants && bonus.variants.length > 1 ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={() => cycleBonusVariant(bonus.id)} title="Alternar variante">↻</button><span>{activeVariant?.label || 'Variante'}</span></span> : null}"""
new_cycler = """{bonus.variants && bonus.variants.length > 1 && bonus.gameplayPattern !== 'cycling-variant' ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={() => cycleBonusVariant(bonus.id)} title="Alternar variante">↻</button><span>{activeVariant?.label || 'Variante'}</span></span> : null}
                        {bonus.gameplayPattern === 'cycling-variant' && isActive ? <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)' }}>Variante: {activeVariant?.label || 'Base'}</span> : null}"""

play_tsx = play_tsx.replace(old_cycler, new_cycler)

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(play_tsx)

print("PlayMode.tsx updated")
