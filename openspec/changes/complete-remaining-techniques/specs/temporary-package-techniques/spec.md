## ADDED Requirements

### Requirement: Temporary packages must persist rule-bounded choices per acquisition
The system SHALL store temporary package choices separately for each acquisition instance and preserve them while the package is active.

#### Scenario: Character owns multiple battle areas
- **WHEN** the character acquires Área de Batalha more than once
- **THEN** each acquisition retains its own temporary advantage choices
- **AND** activating one does not overwrite another

### Requirement: Temporary packages must support assisted maintenance
The system SHALL expose maintenance as an explicit assisted action when a technique requires recurring payment but the app has no turn system.

#### Scenario: Player maintains Área de Batalha
- **WHEN** the package is active and the player confirms maintenance
- **THEN** the app deducts the maintenance PM cost
- **AND** keeps the package active

### Requirement: Temporary advantages must only be automated when supported safely
The system SHALL display all selected temporary advantages and SHALL apply only effects that the current bonus engine can represent exactly.

#### Scenario: Selected package includes unsupported advantage behavior
- **WHEN** the package becomes active
- **THEN** the choice remains visible
- **AND** the UI marks its unresolved behavior as table-declared
