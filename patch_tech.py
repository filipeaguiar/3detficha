import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

tabs_tech = """
            </div> {/* END ATRIBUTOS */}

            {/* TAB VANTAGENS */}
            <div style={{ display: activeTab === 'advantages' ? 'block' : 'none', minHeight: '200px' }}>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <em>Sistema de Vantagens e Desvantagens em breve!</em>
              </div>
            </div>

            {/* TAB PERICIAS */}
            <div style={{ display: activeTab === 'skills' ? 'block' : 'none', minHeight: '200px' }}>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <em>Sistema de Perícias em breve!</em>
              </div>
            </div>

            {/* TAB TECNICAS */}
            <div style={{ display: activeTab === 'techniques' ? 'block' : 'none' }}>
"""

code = code.replace("""
            <h2 className="panel-title" style={{ marginTop: '2rem' }}>Técnicas & Bônus desta Forma</h2>""", tabs_tech + """
            <h2 className="panel-title" style={{ marginTop: '2rem' }}>Técnicas & Bônus desta Forma</h2>""")

with open('src/App.tsx', 'w') as f:
    f.write(code)
