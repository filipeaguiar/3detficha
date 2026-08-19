## ADDED Requirements

### Requirement: Guided technique selection must preserve single acquisition for multi-mode techniques
The system SHALL treat multi-mode techniques as a single acquisition entry in the guided technique selection flow.

#### Scenario: Player selects Raio Místico from the catalog
- **WHEN** the player adds a supported multi-mode technique from the catalog
- **THEN** only one owned technique entry is created
- **AND** its internal play variants do not appear as separate purchases
