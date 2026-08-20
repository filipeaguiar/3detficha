## Why

Currently, Advantages and Disadvantages share a single tab ("Vantagens") in the Character Editor. Because both lists are long and contain diverse descriptions and variants, sharing a single tab creates visual clutter and unnecessary scrolling. Separating them into dedicated tabs improves navigation, search ergonomics, and overall user experience.

## What Changes

- **Dedicated Editor Tabs**: Split the combined "Vantagens" tab into two distinct tabs: `advantages` ("Vantagens") and `disadvantages` ("Desvantagens").
- **Dedicated Search Inputs**: Separate search state so filtering advantages does not affect the disadvantages view, and vice versa.
- **Dedicated Tab Icon**: Add an appropriate icon for the Desvantagens tab (`TabDisadvantagesIcon`).
- **Update Editor Types**: Add `'disadvantages'` to the `EditorTab` union type.

## Capabilities

### New Capabilities
- `editor-tab-separation`: Dedicated navigation and searching for Advantages and Disadvantages in the Character Editor.

### Modified Capabilities
- (None)

## Impact

- `src/components/common/Icons.tsx` (Add `TabDisadvantagesIcon`)
- `src/components/editor/CharacterEditor.tsx` (Split tab definition, render separate panels, create separate search inputs)
- `src/App.tsx` (Update `activeTab` state type if needed)
