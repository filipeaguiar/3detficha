## Context

The 3D dice rolling feature uses `@3d-dice/dice-box` instantiated within a React `useEffect` in the `useDiceBox` custom hook. The application is a PWA that locks orientation to portrait via the manifest. However, if loaded on a desktop or a device in landscape mode, the root container becomes `display: none` via media query, causing the `#dice-box` container to have `0x0` dimensions. When `DiceBox.init()` is called under these constraints or simply throws an error (e.g. lack of WebGL support), it rejects silently because there's no `.catch()` block. Additionally, React 18 Strict Mode double-invocation causes race conditions where `new DiceBox` is called multiple times because the reference is not set until the initial promise resolves.

## Goals / Non-Goals

**Goals:**
- Guarantee `DiceBox` only initializes once per session/hook lifecycle.
- Handle WebGL/Initialization promise rejections to prevent silent failure states.
- Ensure the canvas resizes properly if the app emerges from a `display: none` landscape state back into portrait mode.

**Non-Goals:**
- Completely rewriting the dice mechanics or switching to another dice physics library.
- Removing the landscape-blocking feature entirely (it serves to force users into the preferred portrait mode).

## Decisions

1. **State Locking in `useEffect`:**
   Instead of just checking `!diceBoxRef.current`, we will set `diceBoxRef.current = 'initializing'` immediately before calling `new DiceBox()`. This acts as a lock to prevent concurrent `init()` calls caused by fast re-renders or Strict Mode double invocation.
   
2. **Graceful Error Catching:**
   Append `.catch(err => { console.error(err); diceBoxRef.current = null; })` to the `diceBox.init()` promise. If the physics engine fails to boot, resetting the ref to `null` guarantees that subsequent interactions could attempt re-initialization (or at least provide developers a clear fallback state instead of a broken stuck state).

3. **Window Resize Handling:**
   To mitigate the `0x0` dimension issue when leaving landscape orientation, we will ensure that `DiceBox` receives a `resize` signal after the container becomes visible. Instead of just a fixed timeout, we should rely on standard resize events if the engine fails to pick them up, or trigger a clear `diceBox.clear()` and `diceBox.updateConfig()` before rolling if needed.

## Risks / Trade-offs

- [Risk] PWA startup sequence might still briefly render in landscape before locking.
  → Mitigation: The PWA manifest handles the lock, but for browser usage, catching the resize event from the OS/Browser and refreshing the WebGL context ensures the dice canvas scales correctly.
