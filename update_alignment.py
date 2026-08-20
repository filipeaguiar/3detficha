import re

with open('src/index.css', 'r') as f:
    css = f.read()

# Make bonus-attr-micro a flex container to perfectly center icons vertically
old_css = """.bonus-attr-micro {
  font-size: 0.65rem;
  font-weight: 800;
  background: rgba(0, 0, 0, 0.4);
  padding: 0 4px;
  border-radius: 2px;
}"""

new_css = """.bonus-attr-micro {
  font-size: 0.65rem;
  font-weight: 800;
  background: rgba(0, 0, 0, 0.4);
  padding: 0 4px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18px; /* Force consistent height */
  line-height: 1;
}

.bt-badges svg {
  display: block; /* Removes inline gap below SVGs */
}"""

css = css.replace(old_css, new_css)

with open('src/index.css', 'w') as f:
    f.write(css)

print("index.css updated for alignment")
