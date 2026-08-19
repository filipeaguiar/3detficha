## Why

Currently, the 3D dice rolling feature (`@3d-dice/dice-box`) has initialization flaws that can leave the dice permanently unavailable for rolling. The issues include missing error handling for `DiceBox.init()` promise rejection, race conditions causing double initialization (especially in React Strict Mode), and canvas dimension issues (0x0) when the app starts with `display: none` due to the landscape orientation media query. Since the app is a PWA with orientation locked to portrait in the manifest, we need a robust initialization flow that accounts for orientation logic, prevents multiple `init()` calls, and handles WebGL/asset loading errors gracefully.

## What Changes

- Add state locking to prevent double initialization of `DiceBox` instances in `useDiceBox.ts`.
- Implement `.catch()` for `DiceBox.init()` to gracefully handle promise rejections and allow subsequent initialization attempts.
- Handle component unmount with proper cleanup logic.
- Ensure the dice box container handles window resize events correctly, specifically when toggling out of landscape view (where it starts hidden).

## Capabilities

### New Capabilities
- `dice-initialization`: Robust initialization, error handling, and cleanup for the 3D dice component.

### Modified Capabilities
- (None)

## Impact

- `src/hooks/useDiceBox.ts` (Hooks for dice logic)
- Potential minimal adjustments to `App.tsx` or `src/index.css` if necessary for responsiveness fallback.
