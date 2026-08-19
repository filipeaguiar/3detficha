import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

tabs_header = """
            {/* Tabs Header */}
            <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '1.5rem', overflowX: 'auto', whiteSpace: 'nowrap', gap: '0.5rem', paddingBottom: '0.5rem' }}>
              {([
                { id: 'concept', label: 'Conceito', icon: '👤' },
                { id: 'attributes', label: 'Atributos', icon: '📊' },
                { id: 'advantages', label: 'Vantagens', icon: '🎭' },
                { id: 'skills', label: 'Perícias', icon: '🤹' },
                { id: 'techniques', label: 'Técnicas', icon: '⚔️' }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.6rem 1rem',
                    background: activeTab === tab.id ? 'var(--surface-hover)' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '3px solid var(--accent-color)' : '3px solid transparent',
                    color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-muted)',
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s',
                    borderRadius: '4px 4px 0 0'
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONCEITO */}
            <div style={{ display: activeTab === 'concept' ? 'block' : 'none' }}>
"""

# Replace the start of mode edit up to "NOME DO PERSONAGEM"
# We insert the tabs header right after the `<div className="panel slide-up"...>` and `<div style={{ display: 'flex', justifyContent: 'space-between'...>` section.
code = code.replace("""
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>NOME DO PERSONAGEM</div>""", tabs_header + """
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>NOME DO PERSONAGEM</div>""")

with open('src/App.tsx', 'w') as f:
    f.write(code)
