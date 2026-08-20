import re

with open('src/components/common/Icons.tsx', 'r') as f:
    icons = f.read()

# Fix HabilidadeIcon
old_hab = """export const HabilidadeIcon = () => (
  <svg width="3em" height="3.4em" """
new_hab = """export const HabilidadeIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3em"} height={size || "3.4em"} """
icons = icons.replace(old_hab, new_hab)

# Fix ResistenciaIcon
old_res = """export const ResistenciaIcon = () => (
  <svg width="3em" height="3.4em" """
new_res = """export const ResistenciaIcon = ({ size }: { size?: number | string }) => (
  <svg width={size || "3em"} height={size || "3.4em"} """
icons = icons.replace(old_res, new_res)

with open('src/components/common/Icons.tsx', 'w') as f:
    f.write(icons)

print("Icons fixed")
