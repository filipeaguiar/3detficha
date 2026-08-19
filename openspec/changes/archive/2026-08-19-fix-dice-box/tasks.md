## 1. Setup Dice Initialization Lock

- [x] 1.1 In `useDiceBox.ts`, add a component mount flag (`let isMounted = true;`) inside the initialization `useEffect`.
- [x] 1.2 In `useDiceBox.ts`, add cleanup to the `useEffect` returning `() => { isMounted = false; }`.
- [x] 1.3 In `useDiceBox.ts`, modify the initialization condition to check that `diceBoxRef.current` is neither truthy nor `'initializing'`.
- [x] 1.4 In `useDiceBox.ts`, set `diceBoxRef.current = 'initializing'` immediately inside the `if` block before instantiating `DiceBox`.

## 2. Implement Error Catching

- [x] 2.1 In `useDiceBox.ts`, append a `.catch(err => { ... })` block to the `diceBox.init()` Promise.
- [x] 2.2 Inside the `.catch` block, check `if (isMounted)`, log the error cleanly, and reset `diceBoxRef.current = null`.

## 3. Handling App Orientation / Resize Constraints

- [x] 3.1 In `useDiceBox.ts`, update the `.then()` fulfillment handler to also wrap its actions in an `if (isMounted)` check.
- [x] 3.2 Verify that the `window.dispatchEvent(new Event('resize'))` still runs successfully in the `.then()` block, and potentially expose a method if the dice needs manual resizing.
