import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

tabs_end = """
            </div> {/* END TECNICAS */}

            <button className="btn-roll" onClick={() => setMode('play')} style={{ marginTop: '2rem' }}>
"""

code = code.replace("""
            <button className="btn-roll" onClick={() => setMode('play')} style={{ marginTop: '2rem' }}>""", tabs_end)

with open('src/App.tsx', 'w') as f:
    f.write(code)
