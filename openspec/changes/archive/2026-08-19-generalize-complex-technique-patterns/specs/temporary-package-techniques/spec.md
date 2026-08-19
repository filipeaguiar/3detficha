## ADDED Requirements

### Requirement: The system must support temporary package techniques with partial automation
The system SHALL support techniques that temporarily grant a package of rules, effects, or advantages with only partial automation.

#### Scenario: Technique grants temporary package
- **WHEN** the player activates a temporary package technique
- **THEN** the app records the package as active
- **AND** applies any safely automatable effects
- **AND** discloses any remaining manual or narrator-handled portions

### Requirement: Temporary package techniques must preserve selected temporary choices
The system SHALL preserve temporary player choices made as part of the package while that package remains active.

#### Scenario: Technique requires temporary package choices
- **WHEN** the player chooses temporary options inside the technique package
- **THEN** the app stores and displays those choices for the active package duration
