import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// QoL: Automatically select all text/numbers in input fields on tap/focus
function handleInputAutoSelect(target: EventTarget | null) {
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    if (['checkbox', 'radio', 'file', 'submit', 'button'].includes(target.type)) {
      return;
    }
    // Delay slightly so mobile touch/virtual keyboard positioning doesn't clear the selection
    setTimeout(() => {
      try {
        target.select();
        if (typeof target.setSelectionRange === 'function' && target.type !== 'number') {
          target.setSelectionRange(0, target.value.length);
        }
      } catch {
        // Safe fallback for browser variants
      }
    }, 50);
  }
}

document.addEventListener('focusin', (e) => handleInputAutoSelect(e.target));
document.addEventListener('click', (e) => handleInputAutoSelect(e.target));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

