## 1. Tab Types and Icons

- [x] 1.1 In `src/components/common/Icons.tsx`, add `TabDisadvantagesIcon`.
- [x] 1.2 In `src/components/editor/CharacterEditor.tsx`, update `EditorTab` type to include `'disadvantages'` and add the new tab to `EDITOR_TABS`.
- [x] 1.3 In `src/App.tsx`, update the `activeTab` state type to include `'disadvantages'`.

## 2. Editor UI Separation

- [x] 2.1 In `src/components/editor/CharacterEditor.tsx`, split `advantageSearch` into `advantageSearch` and `disadvantageSearch` state.
- [x] 2.2 In `src/components/editor/CharacterEditor.tsx`, separate the Advantages and Disadvantages JSX into their own tab panels (`activeTab === 'advantages'` and `activeTab === 'disadvantages'`).
