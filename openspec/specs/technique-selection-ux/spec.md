# technique-selection-ux Specification

## Purpose
TBD - created by archiving change add-cycling-technique-variants. Update Purpose after archive.
## Requirements
### Requirement: Guided technique selection must preserve single acquisition for multi-mode techniques
The system SHALL treat multi-mode techniques as a single acquisition entry in the guided technique selection flow.

#### Scenario: Player selects Raio Místico from the catalog
- **WHEN** the player adds a supported multi-mode technique from the catalog
- **THEN** only one owned technique entry is created
- **AND** its internal play variants do not appear as separate purchases

### Requirement: Guided technique selection must support repeatable techniques with internal permanent choices
The system SHALL support guided acquisition of repeatable techniques whose value comes from permanent internal selections.

#### Scenario: Player adds Golpes through guided selection
- **WHEN** the player acquires Golpes from the technique catalog
- **THEN** the flow prompts for strike selections tied to that acquisition
- **AND** repeated acquisitions preserve prior selections instead of overwriting them

