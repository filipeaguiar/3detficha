import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

target = """              </div>
            
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />
            
              <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Modificadores de Rolagem</h2>"""

replacement = """              </div>

              {/* CHARACTER TRAITS */}
              {((currentForm.advantages && currentForm.advantages.length > 0) || (currentForm.disadvantages && currentForm.disadvantages.length > 0) || (currentForm.skills && currentForm.skills.length > 0)) && (
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {currentForm.advantages?.map(id => {
                    const adv = ADVANTAGES_CATALOG.find(a => a.id === id);
                    return adv ? (
                      <button key={id} onClick={() => alert(`${adv.name}\\n\\nCusto: ${adv.cost}\\n\\n${adv.desc}`)} style={{ background: 'var(--accent-color)', border: 'none', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        {adv.name}
                      </button>
                    ) : null;
                  })}
                  {currentForm.skills?.map(id => {
                    const skill = SKILLS_CATALOG.find(a => a.id === id);
                    return skill ? (
                      <button key={id} onClick={() => alert(`${skill.name}\\n\\n${skill.desc}`)} style={{ background: '#33ccff', border: 'none', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        {skill.name}
                      </button>
                    ) : null;
                  })}
                  {currentForm.disadvantages?.map(id => {
                    const disadv = DISADVANTAGES_CATALOG.find(a => a.id === id);
                    return disadv ? (
                      <button key={id} onClick={() => alert(`${disadv.name}\\n\\nCusto: ${disadv.cost}\\n\\n${disadv.desc}`)} style={{ background: '#ff4d4d', border: 'none', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        {disadv.name}
                      </button>
                    ) : null;
                  })}
                </div>
              )}
            
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />
            
              <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Modificadores de Rolagem</h2>"""

code = code.replace(target, replacement)

with open('src/App.tsx', 'w') as f:
    f.write(code)
