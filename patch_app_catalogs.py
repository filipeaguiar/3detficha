import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Add imports if not present
imports = """
import { SKILLS_CATALOG } from './constants/skillsData';
import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from './constants/advantagesData';
"""
if "SKILLS_CATALOG" not in code:
    code = code.replace("import { ALL_KITS } from './kitsData';", "import { ALL_KITS } from './kitsData';\n" + imports)

# Replace placeholders with mapped UI
ui_vantagens = """
            {/* TAB VANTAGENS */}
            <div style={{ display: activeTab === 'advantages' ? 'block' : 'none', minHeight: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>Vantagens & Desvantagens</h2>
              </div>
              <div style={{ display: 'grid', gap: '1.5rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                <div>
                  <h3 style={{ color: 'var(--accent-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Vantagens</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                    {ADVANTAGES_CATALOG.map(adv => (
                      <div key={adv.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{adv.name}</strong>
                          <span style={{ fontSize: '0.8rem', background: 'var(--accent-color)', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{adv.cost}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{adv.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ color: '#ff4d4d', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Desvantagens</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                    {DISADVANTAGES_CATALOG.map(disadv => (
                      <div key={disadv.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{disadv.name}</strong>
                          <span style={{ fontSize: '0.8rem', background: '#ff4d4d', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{disadv.cost}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{disadv.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TAB PERICIAS */}
            <div style={{ display: activeTab === 'skills' ? 'block' : 'none', minHeight: '300px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>Perícias</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', maxHeight: '500px', overflowY: 'auto' }}>
                {SKILLS_CATALOG.map(skill => (
                  <div key={skill.id} style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#fff', marginBottom: '0.4rem' }}>{skill.name}</strong>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
"""

code = re.sub(r'\{\/\* TAB VANTAGENS \*\/\}[\s\S]*?\{\/\* TAB TECNICAS \*\/\}', ui_vantagens + "\n            {/* TAB TECNICAS */}", code)

with open('src/App.tsx', 'w') as f:
    f.write(code)
