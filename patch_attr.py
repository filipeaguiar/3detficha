import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

tabs_attr = """
            </div> {/* END CONCEITO */}

            {/* TAB ATRIBUTOS */}
            <div style={{ display: activeTab === 'attributes' ? 'block' : 'none' }}>
"""

code = code.replace("""
            <div className="stats-grid">
              <div className="stat-box edit-stat-box" style={{ '--btn-color': '#FF9E00'""", tabs_attr + """
            <div className="stats-grid">
              <div className="stat-box edit-stat-box" style={{ '--btn-color': '#FF9E00'""")

with open('src/App.tsx', 'w') as f:
    f.write(code)
