import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Fix forms mapping in parser
old_map = """forms: Array.isArray(parsed.forms) && parsed.forms.length > 0 ? parsed.forms.map((f: any) => ({
          ...f,
          rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus)
        }))"""
new_map = """forms: Array.isArray(parsed.forms) && parsed.forms.length > 0 ? parsed.forms.map((f: any) => ({
          ...f,
          rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus),
          advantages: f.advantages || [],
          disadvantages: f.disadvantages || [],
          skills: f.skills || [],
          wildShapeAdvantages: f.wildShapeAdvantages || []
        }))"""

code = code.replace(old_map, new_map)

with open('src/App.tsx', 'w') as f:
    f.write(code)
