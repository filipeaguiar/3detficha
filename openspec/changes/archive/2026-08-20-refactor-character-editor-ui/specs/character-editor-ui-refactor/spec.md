## ADDED Requirements

### Requirement: Character editor tabs SHALL use reusable UI composition patterns
The system SHALL render the editing experience using a consistent set of reusable editor UI patterns for tab containers, cards, nested option groups, selectable entries, and action areas.

#### Scenario: Render editor tabs with shared structures
- **WHEN** a user navigates between concept, attributes, advantages, disadvantages, skills, and techniques tabs
- **THEN** each tab SHALL use the same editor-specific structural patterns for section framing, spacing, and interactive grouping where equivalent content types are shown.

### Requirement: Character editor forms SHALL use shared field styling
The system SHALL render editor text inputs, search fields, numeric fields, and select controls using a shared visual treatment for borders, spacing, focus state, and typography.

#### Scenario: Render editable fields in the editor
- **WHEN** a user views or focuses form controls in the editor
- **THEN** equivalent control types SHALL present a consistent visual style and focus treatment across tabs.

### Requirement: Character editor selectable lists SHALL use consistent state presentation
The system SHALL present selectable items such as advantages, disadvantages, skills, nested option choices, and technique strike selections with a consistent visual model for default, selected, granted, disabled, and warning states where applicable.

#### Scenario: Show selected and granted entries
- **WHEN** a user views selectable content that can be owned, granted, or disabled
- **THEN** the editor SHALL render those states with consistent structural treatment and clearly differentiated visual emphasis.
