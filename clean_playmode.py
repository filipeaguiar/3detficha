import re

with open('src/components/play/PlayMode.tsx', 'r') as f:
    play = f.read()

# Replace inline styles with simpler ones
play = play.replace("style={{ background: 'transparent', color: '#33ccff', fontSize: '0.85rem' }}", "style={{ background: 'transparent', color: '#33ccff', padding: 0 }}")
play = play.replace("style={{ background: 'transparent', color: '#ffd166', fontSize: '0.85rem' }}", "style={{ background: 'transparent', color: '#ffd166', padding: 0 }}")
play = play.replace("style={{ background: 'transparent', color: bonus.assistedState?.prepared ? '#7bd389' : 'var(--text-muted)', fontSize: '0.85rem' }}", "style={{ background: 'transparent', color: bonus.assistedState?.prepared ? '#7bd389' : 'var(--text-muted)', padding: 0 }}")
play = play.replace("style={{ background: 'transparent', width: '14px', height: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}", "style={{ background: 'transparent', padding: 0, color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}")

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(play)

print("PlayMode.tsx inline styles cleaned")
