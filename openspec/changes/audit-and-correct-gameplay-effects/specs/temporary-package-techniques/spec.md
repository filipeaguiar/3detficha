## ADDED Requirements

### Requirement: Temporary package effects SHALL obey attribute and skill filters
The system SHALL apply deterministic package effects only to tests matching the package's declared attribute, skill, action, and condition.

#### Scenario: Chakra de Poder is active
- **WHEN** the player resolves a Poder test
- **THEN** the configured Ganho and automatic critical SHALL apply
- **AND** an unrelated Habilidade or Resistência test SHALL not receive them

#### Scenario: Percepção Cósmica is active
- **WHEN** the player resolves a Percepção test
- **THEN** the test SHALL receive Ganho and one automatic critical
- **AND** other tests SHALL not receive those effects unless the player pays for and confirms the permitted skill substitution

### Requirement: Temporary package resource effects SHALL be applied and reverted safely
The system SHALL apply deterministic temporary resource changes at activation and SHALL execute declared end consequences when the package is ended.

#### Scenario: Chakra de Resistência activates
- **WHEN** its activation cost is paid
- **THEN** the character SHALL receive the temporary PV defined by the rule
- **AND** the package SHALL identify its perfect-defense effect

#### Scenario: Chakra ends
- **WHEN** the player ends the package
- **THEN** the declared resource reduction and exhaustion consequence SHALL be presented or applied according to its automation level

### Requirement: Maintenance SHALL validate resources before preserving a package
The system SHALL validate each assisted maintenance payment before keeping a package active.

#### Scenario: Maintenance cannot be paid
- **WHEN** current PM is below the maintenance cost
- **THEN** maintenance SHALL fail without making PM negative
- **AND** the UI SHALL require the player to end or otherwise resolve the package
