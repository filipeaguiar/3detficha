## ADDED Requirements

### Requirement: Actions workspace SHALL be a dedicated high-level module
The system SHALL implement the independent Ações destination as a dedicated high-level component with explicit TypeScript contracts for active-form data, classified action collections, navigation state, and update callbacks. `App.tsx` SHALL coordinate the destination without containing its detailed category JSX.

#### Scenario: Compose actions mode
- **WHEN** `App.tsx` renders the Ações destination
- **THEN** it SHALL delegate the workspace and category presentation to dedicated action-domain components
- **AND** shared low-level types and classification helpers SHALL not depend on high-level UI modules

#### Scenario: Build validates workspace contracts
- **WHEN** the configured production build is executed
- **THEN** data and callback contracts among `App`, the actions workspace, editor, and play components SHALL pass TypeScript validation
