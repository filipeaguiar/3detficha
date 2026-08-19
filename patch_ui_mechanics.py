import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Replace Vantagens rendering
old_vantagens = """{ADVANTAGES_CATALOG.map(adv => (
                      <div key={adv.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{adv.name}</strong>
                          <span style={{ fontSize: '0.8rem', background: 'var(--accent-color)', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{adv.cost}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adv.desc}</p>
                      </div>
                    ))}"""

new_vantagens = """{ADVANTAGES_CATALOG.map(adv => {
                      const isSelected = currentForm.advantages?.includes(adv.id);
                      return (
                        <div 
                          key={adv.id} 
                          onClick={() => {
                            const current = currentForm.advantages || [];
                            if (isSelected) {
                              updateCurrentForm({ advantages: current.filter(id => id !== adv.id) });
                            } else {
                              updateCurrentForm({ advantages: [...current, adv.id] });
                            }
                          }}
                          style={{ 
                            background: isSelected ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-hover)', 
                            padding: '1rem', 
                            borderRadius: '4px', 
                            border: `1px solid ${isSelected ? 'var(--accent-color)' : 'var(--border-color)'}`,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--accent-color)' : '#fff' }}>
                              {isSelected && '✓ '} {adv.name}
                            </strong>
                            <span style={{ fontSize: '0.8rem', background: isSelected ? 'var(--accent-color)' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{adv.cost}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{adv.desc}</p>
                        </div>
                      );
                    })}"""

code = code.replace(old_vantagens, new_vantagens)

# Replace Desvantagens rendering
old_desvantagens = """{DISADVANTAGES_CATALOG.map(disadv => (
                      <div key={disadv.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{disadv.name}</strong>
                          <span style={{ fontSize: '0.8rem', background: '#ff4d4d', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{disadv.cost}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{disadv.desc}</p>
                      </div>
                    ))}"""

new_desvantagens = """{DISADVANTAGES_CATALOG.map(disadv => {
                      const isSelected = currentForm.disadvantages?.includes(disadv.id);
                      return (
                        <div 
                          key={disadv.id} 
                          onClick={() => {
                            const current = currentForm.disadvantages || [];
                            if (isSelected) {
                              updateCurrentForm({ disadvantages: current.filter(id => id !== disadv.id) });
                            } else {
                              updateCurrentForm({ disadvantages: [...current, disadv.id] });
                            }
                          }}
                          style={{ 
                            background: isSelected ? 'rgba(255, 77, 77, 0.1)' : 'var(--surface-hover)', 
                            padding: '1rem', 
                            borderRadius: '4px', 
                            border: `1px solid ${isSelected ? '#ff4d4d' : 'var(--border-color)'}`,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <strong style={{ fontSize: '1.1rem', color: isSelected ? '#ff4d4d' : '#fff' }}>
                              {isSelected && '✓ '} {disadv.name}
                            </strong>
                            <span style={{ fontSize: '0.8rem', background: isSelected ? '#ff4d4d' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{disadv.cost}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{disadv.desc}</p>
                        </div>
                      );
                    })}"""

code = code.replace(old_desvantagens, new_desvantagens)

# Replace Skills rendering
old_skills = """{SKILLS_CATALOG.map(skill => (
                  <div key={skill.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#fff', marginBottom: '0.4rem' }}>{skill.name}</strong>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{skill.desc}</p>
                  </div>
                ))}"""

new_skills = """{SKILLS_CATALOG.map(skill => {
                  const isSelected = currentForm.skills?.includes(skill.id);
                  return (
                    <div 
                      key={skill.id} 
                      onClick={() => {
                        const current = currentForm.skills || [];
                        if (isSelected) {
                          updateCurrentForm({ skills: current.filter(id => id !== skill.id) });
                        } else {
                          updateCurrentForm({ skills: [...current, skill.id] });
                        }
                      }}
                      style={{ 
                        background: isSelected ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-hover)', 
                        padding: '1rem', 
                        borderRadius: '4px', 
                        border: `1px solid ${isSelected ? 'var(--accent-color)' : 'var(--border-color)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--accent-color)' : '#fff' }}>
                          {isSelected && '✓ '} {skill.name}
                        </strong>
                        <span style={{ fontSize: '0.7rem', background: isSelected ? 'var(--accent-color)' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>1pt</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{skill.desc}</p>
                    </div>
                  );
                })}"""

code = code.replace(old_skills, new_skills)


with open('src/App.tsx', 'w') as f:
    f.write(code)
