import re

with open('src/components/common/Icons.tsx', 'r') as f:
    icons = f.read()

new_icons = """
export const SquareIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

export const CheckSquareIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
"""
icons += new_icons

with open('src/components/common/Icons.tsx', 'w') as f:
    f.write(icons)

with open('src/components/play/PlayMode.tsx', 'r') as f:
    play = f.read()

play = play.replace("WandSparklesIcon, ", "WandSparklesIcon, SquareIcon, CheckSquareIcon, ")

old_badge = "{bonus.gameplayPattern === 'prepared-magic' && <span className=\"bonus-attr-micro\" style={{ background: 'transparent', color: bonus.assistedState?.prepared ? '#7bd389' : '#ff8fab', fontSize: '0.85rem' }} title={bonus.assistedState?.prepared ? 'Magia Preparada' : 'Magia Despreparada'}>{bonus.assistedState?.prepared ? <WandSparklesIcon size={14} /> : <CrystalBallIcon size={14} />}</span>}"
new_badge = "{bonus.gameplayPattern === 'prepared-magic' && <span className=\"bonus-attr-micro\" style={{ background: 'transparent', color: bonus.assistedState?.prepared ? '#7bd389' : 'var(--text-muted)', fontSize: '0.85rem' }} title={bonus.assistedState?.prepared ? 'Magia Preparada' : 'Magia Despreparada'}>{bonus.assistedState?.prepared ? <CheckSquareIcon size={14} /> : <SquareIcon size={14} />}</span>}"

play = play.replace(old_badge, new_badge)

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(play)

print("Icons and PlayMode updated")
