## MODIFIED Requirements

### Requirement: Character editor tabs SHALL use reusable UI composition patterns
The system SHALL render the editing experience using a consistent set of reusable editor UI patterns for tab containers, cards, nested option groups, selectable entries, and action areas, and SHALL keep the techniques tab focused on technique discovery, eligibility, acquisition, and removal instead of embedding detailed attack, action, and modifier configuration.

#### Scenario: Render editor tabs with shared structures
- **WHEN** a user navigates between concept, attributes, advantages, disadvantages, skills, and techniques tabs
- **THEN** each tab SHALL use the same editor-specific structural patterns for section framing, spacing, and interactive grouping where equivalent content types are shown.

#### Scenario: Render techniques acquisition
- **WHEN** a user opens the techniques tab
- **THEN** the editor SHALL present the technique catalog, eligibility, XP metadata, Golpes acquisition, and owned-technique removal using the shared editor composition system
- **AND** SHALL direct detailed action and modifier configuration to the independent Ações workspace

#### Scenario: Acquire a technique
- **WHEN** the user acquires a technique or a Golpes selection in the editor
- **THEN** the acquisition SHALL be persisted using the existing character data model
- **AND** its configurable action entries SHALL become available in the appropriate Ações category
