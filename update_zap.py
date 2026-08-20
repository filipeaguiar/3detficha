import re

with open('src/components/common/Icons.tsx', 'r') as f:
    icons = f.read()

# Add new icons
new_icons = """
export const HourglassIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
);

export const CrystalBallIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="7" />
    <path d="M14.5 7.5a3.5 3.5 0 0 0-5 0" />
    <path d="M8 21h8" />
    <path d="M10 17h4" />
  </svg>
);
"""

icons += new_icons

old_zap = """export const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">"""
new_zap = """export const ZapIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">"""

icons = icons.replace(old_zap, new_zap)

with open('src/components/common/Icons.tsx', 'w') as f:
    f.write(icons)

print("Icons.tsx updated")
