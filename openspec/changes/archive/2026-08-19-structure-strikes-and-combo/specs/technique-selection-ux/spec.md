## ADDED Requirements

### Requirement: Guided technique selection must support repeatable techniques with internal permanent choices
The system SHALL support guided acquisition of repeatable techniques whose value comes from permanent internal selections.

#### Scenario: Player adds Golpes through guided selection
- **WHEN** the player acquires Golpes from the technique catalog
- **THEN** the flow prompts for strike selections tied to that acquisition
- **AND** repeated acquisitions preserve prior selections instead of overwriting them
