## MODIFIED Requirements

### Requirement: App subcomponents isolate visual sections and repeated UI patterns
The system SHALL keep `App.tsx` focused on orchestration and SHALL organize repeated or visually distinct interface regions into dedicated subcomponents or reusable rendering units, especially for editor tabs, play mode groups, modal content, and shared card patterns.

#### Scenario: Editor UI renders through modular visual sections
- **WHEN** the character editor displays tab-specific content
- **THEN** repeated visual structures and larger tab bodies SHALL be implemented through modular rendering units instead of remaining as one large monolithic JSX block.

#### Scenario: Editor tab manages its own filtering and gating
- **WHEN** the user switches between editor tabs or changes search and eligibility filters
- **THEN** the tab content SHALL keep its current behavior while being organized into maintainable rendering sections that isolate tab-specific concerns.
