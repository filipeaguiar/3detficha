with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

points_calc = """
  // CALCULATOR
  const calculatePoints = () => {
    let total = poder + habilidade + resistencia;
    
    if (currentForm.skills) total += currentForm.skills.length;
    
    if (currentForm.advantages) {
      currentForm.advantages.forEach(advId => {
        const adv = ADVANTAGES_CATALOG.find(a => a.id === advId);
        if (adv) {
          const match = adv.cost.match(/\\d+/);
          if (match) total += parseInt(match[0], 10);
        }
      });
    }

    if (currentForm.disadvantages) {
      currentForm.disadvantages.forEach(disId => {
        const dis = DISADVANTAGES_CATALOG.find(d => d.id === disId);
        if (dis) {
          const match = dis.cost.match(/-\\d+/);
          if (match) total += parseInt(match[0], 10);
          else {
             const matchPos = dis.cost.match(/\\d+/);
             if (matchPos) total -= parseInt(matchPos[0], 10);
          }
        }
      });
    }
    return total;
  };

  const totalPoints = calculatePoints();
"""

lines.insert(1611, points_calc)

with open('src/App.tsx', 'w') as f:
    f.writelines(lines)
