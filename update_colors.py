import re

with open('src/index.css', 'r') as f:
    css = f.read()

# Update active state background
css = css.replace('background-color: var(--accent-transparent);', 'background-color: var(--accent-color);')

# Increase gap in badges
css = css.replace('gap: 4px;', 'gap: 6px;')

# Add override for active text and icon colors
new_css = """
.bonus-toggle.active,
.bonus-toggle.active .bt-name,
.bonus-toggle.active .bt-raw-name,
.bonus-toggle.active .bt-effect,
.bonus-toggle.active .bt-footer,
.bonus-toggle.active .bt-footer span,
.bonus-toggle.active .bonus-attr-micro,
.bonus-toggle.active .bt-badges span {
  color: var(--accent-text-color) !important;
}

.bonus-toggle.active .bt-footer {
  background: rgba(0, 0, 0, 0.15); /* Slightly darken the footer to distinguish it, but keep it transparent */
  border-top-color: rgba(0, 0, 0, 0.2);
}

.bonus-toggle.active .bonus-remove-btn {
  color: var(--accent-text-color) !important;
  border-color: var(--accent-text-color) !important;
}
"""

css += new_css

with open('src/index.css', 'w') as f:
    f.write(css)

print("index.css updated")
