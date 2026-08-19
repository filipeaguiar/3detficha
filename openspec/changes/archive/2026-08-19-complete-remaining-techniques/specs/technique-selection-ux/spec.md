## ADDED Requirements

### Requirement: Guided selection must support attribute and technique prerequisites
The system SHALL evaluate attribute minimums and owned prerequisite techniques in addition to advantage and skill requirements.

#### Scenario: Legendary technique requires a prior technique
- **WHEN** the character does not own the required earlier technique
- **THEN** the legendary technique remains unavailable
- **AND** the missing prerequisite is named

### Requirement: Guided selection must configure complex techniques at acquisition
The system SHALL collect required permanent configuration for repeatable or configurable techniques without forcing free-text bonus editing.

#### Scenario: Player acquires a configurable technique
- **WHEN** the technique requires a permanent choice or per-acquisition configuration
- **THEN** the guided flow presents valid choices
- **AND** stores them against the unique acquisition instance
