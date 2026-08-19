import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Add points calculation before the main App return
points_calc = """
  // CALCULATOR
  const calculatePoints = () => {
    let total = poder + habilidade + resistencia;
    
    if (currentForm.skills) total += currentForm.skills.length;
    
    if (currentForm.advantages) {
      currentForm.advantages.forEach(advId => {
        const adv = ADVANTAGES_CATALOG.find(a => a.id === advId);
        if (adv) {
          const match = adv.cost.match(/\d+/);
          if (match) total += parseInt(match[0], 10);
        }
      });
    }

    if (currentForm.disadvantages) {
      currentForm.disadvantages.forEach(disId => {
        const dis = DISADVANTAGES_CATALOG.find(d => d.id === disId);
        if (dis) {
          const match = dis.cost.match(/-\d+/);
          if (match) total += parseInt(match[0], 10);
          else {
             const matchPos = dis.cost.match(/\d+/);
             if (matchPos) total -= parseInt(matchPos[0], 10);
          }
        }
      });
    }
    return total;
  };

  const totalPoints = calculatePoints();

  return (
    <>
      <div id="dice-box" style={{ visibility: mode === 'play' ? 'visible' : 'hidden' }}></div>
"""

# Instead of "return (", we find exactly the start of the return block for the App component.
# It usually looks like:
#   return (
#     <>
#       <div id="dice-box" style={{ visibility: mode === 'play' ? 'visible' : 'hidden' }}></div>
old_return = """  return (
    <>
      <div id="dice-box" style={{ visibility: mode === 'play' ? 'visible' : 'hidden' }}></div>"""

code = code.replace(old_return, points_calc)

# UI placement
ui_tracker = """
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h1 className="panel-title" style={{ margin: 0 }}>Cadastro da Ficha</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--surface-color)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius)', border: `1px solid ${totalPoints > 10 ? 'var(--danger-color)' : 'var(--border-color)'}` }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>PONTOS:</span>
                  <strong style={{ fontSize: '1.2rem', color: totalPoints > 10 ? 'var(--danger-color)' : 'var(--accent-color)', fontFamily: 'Bebas Neue, sans-serif' }}>
                    {totalPoints} / 10
                  </strong>
                </div>

                <button
"""

code = code.replace("""
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h1 className="panel-title" style={{ margin: 0 }}>Cadastro da Ficha</h1>
              <button
""", ui_tracker)


with open('src/App.tsx', 'w') as f:
    f.write(code)
