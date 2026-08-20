with open('src/components/play/PlayMode.tsx', 'r') as f:
    content = f.read()

# Replace the opening tag of the bonus-toggle
content = content.replace(
    '<button key={bonus.id} className={`bonus-toggle ${isActive ? \'active\' : \'\'}`} onClick={() => toggleActiveBonus(bonus.id)}',
    '<div key={bonus.id} className={`bonus-toggle ${isActive ? \'active\' : \'\'}`} onClick={() => toggleActiveBonus(bonus.id)}'
)

# The closing tag for this is `</button>` right before `); \n              })} \n            </div>`
# Let's find that specific block
block_end = """
                    {bonus.variants && bonus.variants.length > 1 ? <span className="bonus-toggle-raw-name" style={{ marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={(e) => { e.stopPropagation(); cycleBonusVariant(bonus.id); }} title="Alternar variante">↻</button><span>{activeVariant?.label || 'Variante'}</span></span> : null}
                  </button>
                );
              })}
"""

new_block_end = """
                    {bonus.variants && bonus.variants.length > 1 ? <span className="bonus-toggle-raw-name" style={{ marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={(e) => { e.stopPropagation(); cycleBonusVariant(bonus.id); }} title="Alternar variante">↻</button><span>{activeVariant?.label || 'Variante'}</span></span> : null}
                  </div>
                );
              })}
"""

content = content.replace(block_end, new_block_end)

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(content)

print("Done")
