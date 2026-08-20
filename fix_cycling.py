import re

# 1. Update App.tsx `toggleActiveBonus`
with open('src/App.tsx', 'r') as f:
    app_tsx = f.read()

# Add logic for cycling variants
old_logic_cycling = """    if (bonus.gameplayPattern === 'narrative') {"""
new_logic_cycling = """    if (bonus.gameplayPattern === 'cycling-variant') {
      if (!activeBonuses.has(id)) {
        setActiveBonuses((current) => { const next = new Set(current); next.add(id); return next; });
        if (bonus.variants && bonus.variants.length > 0) {
           updateRollBonus(id, { selectedVariantId: bonus.variants[0].id });
        }
        return;
      } else {
        const currentIndex = bonus.variants?.findIndex(v => v.id === bonus.selectedVariantId) ?? 0;
        if (bonus.variants && currentIndex < bonus.variants.length - 1) {
          updateRollBonus(id, { selectedVariantId: bonus.variants[currentIndex + 1].id });
          return;
        } else {
          setActiveBonuses((current) => { const next = new Set(current); next.delete(id); return next; });
          if (bonus.variants && bonus.variants.length > 0) {
             updateRollBonus(id, { selectedVariantId: bonus.variants[0].id });
          }
          return;
        }
      }
    }

    if (bonus.gameplayPattern === 'narrative') {"""

app_tsx = app_tsx.replace(old_logic_cycling, new_logic_cycling)

with open('src/App.tsx', 'w') as f:
    f.write(app_tsx)

print("App.tsx updated")
