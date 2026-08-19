import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

old_button_content = """<div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: calculatedTotalExtraDice > 0 ? '#5EB05D' : calculatedTotalExtraDice < 0 ? '#ff4d4d' : 'inherit' }}>
                      {calculatedTotalExtraDice === 0 ? 'Normal' : calculatedTotalExtraDice > 0 ? `+${calculatedTotalExtraDice} Ganho` : `${calculatedTotalExtraDice} Perda`}
                    </span>
                  </div>"""

new_button_content = """<div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', alignItems: 'center' }}>
                    <CubeIcon />
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: calculatedTotalExtraDice > 0 ? '#5EB05D' : calculatedTotalExtraDice < 0 ? '#ff4d4d' : 'inherit' }}>
                      {calculatedTotalExtraDice === 0 ? 'Normal' : calculatedTotalExtraDice > 0 ? `+${calculatedTotalExtraDice} Ganho` : `${calculatedTotalExtraDice} Perda`}
                    </span>
                  </div>"""
                  
code = code.replace(old_button_content, new_button_content)

with open('src/App.tsx', 'w') as f:
    f.write(code)
