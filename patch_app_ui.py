import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Replace the empty Vantagens and Perícias with actual UI
new_tabs = """
            {/* TAB VANTAGENS */}
            <div style={{ display: activeTab === 'advantages' ? 'block' : 'none', minHeight: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>Vantagens & Desvantagens</h2>
              </div>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
                <em>(O catálogo será carregado aqui)</em>
              </div>
            </div>

            {/* TAB PERICIAS */}
            <div style={{ display: activeTab === 'skills' ? 'block' : 'none', minHeight: '300px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>Perícias</h2>
              </div>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: '4px' }}>
                <em>(O catálogo será carregado aqui)</em>
              </div>
            </div>
"""

code = re.sub(r'\{\/\* TAB VANTAGENS \*\/\}[\s\S]*?\{\/\* TAB TECNICAS \*\/\}', new_tabs + "\n            {/* TAB TECNICAS */}", code)

with open('src/App.tsx', 'w') as f:
    f.write(code)
