import re

with open('src/index.css', 'r') as f:
    css = f.read()

# Let's add the new CSS classes at the end of the file
new_css = """

/* NOVA PROPOSTA DE CARDS */
.bonus-toggles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.bonus-toggle {
  display: flex;
  flex-direction: column;
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  padding: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
  -webkit-user-select: none;
  user-select: none;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  text-align: left;
  position: relative;
  min-height: 85px;
}

.bonus-toggle::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 8px;
  box-shadow: inset 0 0 0 2px transparent;
  transition: box-shadow 0.2s;
  pointer-events: none;
}

.bonus-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  border-color: var(--text-muted);
}

.bonus-toggle.active {
  background-color: var(--accent-transparent);
  border-color: var(--accent-color);
  box-shadow: 0 6px 16px var(--accent-glow);
}

.bonus-toggle.active::before {
  box-shadow: inset 0 0 0 2px var(--accent-color);
}

.bt-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 0.75rem 0.25rem 0.75rem;
  gap: 0.5rem;
}

.bt-title {
  display: flex;
  flex-direction: column;
  min-width: 0; /* for text-overflow */
}

.bt-name {
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.5px;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;
}

.bonus-toggle.active .bt-name {
  color: var(--accent-color);
}

.bt-raw-name {
  font-size: 0.65rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  text-transform: uppercase;
}

.bt-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-end;
  flex-shrink: 0;
  max-width: 50%;
}

.bt-body {
  padding: 0.25rem 0.75rem 0.75rem 0.75rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bt-effect {
  font-size: 0.85rem;
  color: var(--text-main);
  font-weight: 500;
  line-height: 1.3;
}

.bt-footer {
  background: rgba(0,0,0,0.15);
  border-top: 1px solid var(--border-color);
  padding: 0.4rem 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.bonus-toggle.active .bt-footer {
  background: rgba(0,0,0,0.3);
  border-top-color: var(--accent-color);
}

"""

# Replace old classes
css = re.sub(r'\.bonus-toggles-grid \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle:hover \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle\.active \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle\.active \.bonus-toggle-label,[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle-header \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle-label \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle-raw-name \{[\s\S]*?\}', '', css)
css = re.sub(r'\.bonus-toggle-value \{[\s\S]*?\}', '', css)

with open('src/index.css', 'w') as f:
    f.write(css + new_css)

print("CSS updated")
