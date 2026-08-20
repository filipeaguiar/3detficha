import re

with open('src/components/common/Icons.tsx', 'r') as f:
    icons = f.read()

# Fix PoderIcon
old_poder = """export const PoderIcon = () => (
  <svg width="3em" height="3.4em" """
new_poder = """export const PoderIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3em"} height={size || "3.4em"} """
icons = icons.replace(old_poder, new_poder)

# Fix HabilidadeIcon
old_hab = """export const HabilidadeIcon = () => (
  <svg width="3.2em" height="3.2em" """
new_hab = """export const HabilidadeIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3.2em"} height={size || "3.2em"} """
icons = icons.replace(old_hab, new_hab)

# Fix ResistenciaIcon
old_res = """export const ResistenciaIcon = () => (
  <svg width="2.4em" height="3em" """
new_res = """export const ResistenciaIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "2.4em"} height={size || "3em"} """
icons = icons.replace(old_res, new_res)

with open('src/components/common/Icons.tsx', 'w') as f:
    f.write(icons)

# Update PlayMode.tsx to pass size
with open('src/components/play/PlayMode.tsx', 'r') as f:
    play = f.read()

old_attr_icons = """{bonus.attribute === 'poder' ? <PoderIcon /> : bonus.attribute === 'habilidade' ? <HabilidadeIcon /> : <ResistenciaIcon />}"""
new_attr_icons = """{bonus.attribute === 'poder' ? <PoderIcon size={14} /> : bonus.attribute === 'habilidade' ? <HabilidadeIcon size={14} /> : <ResistenciaIcon size={14} />}"""
play = play.replace(old_attr_icons, new_attr_icons)

with open('src/components/play/PlayMode.tsx', 'w') as f:
    f.write(play)

print("Attribute icons fixed")
