# cycling-technique-variants Specification

## Purpose
TBD - created by archiving change add-cycling-technique-variants. Update Purpose after archive.
## Requirements
### Requirement: A technique may be acquired once and used in multiple internal modes
The system SHALL support techniques that are purchased a single time but can be used in one of several internal variants during play.

#### Scenario: Technique has base mode and enhanced mode
- **WHEN** the player acquires a multi-mode technique
- **THEN** the character stores a single owned technique entry
- **AND** the gameplay UI can switch its active use mode without creating duplicate purchased techniques

### Requirement: Play mode must allow cycling technique variants
The system SHALL allow the player to cycle through available internal variants of a supported technique during play.

#### Scenario: Player cycles Raio Místico mode
- **WHEN** the player interacts with the technique control in play mode
- **THEN** the active mode changes between base and supported enhanced variants
- **AND** the currently selected mode is visible in the UI

### Requirement: Technique variant cost must be derived from the active mode
The system SHALL use the currently selected internal variant to determine the PM cost presented and applied for the technique use.

#### Scenario: Enhanced mode increases PM cost
- **WHEN** the player selects an enhanced mode of a technique
- **THEN** the UI shows the appropriate PM cost for that mode
- **AND** using the technique applies the adjusted cost

### Requirement: Table-declared effect variants must be disclosed as metagame choices
The system SHALL disclose when a technique variant effect is chosen at the table instead of being fully automated by the app.

#### Scenario: Effect option is declared outside the app
- **WHEN** the player selects a variant whose exact effect is resolved by table declaration
- **THEN** the UI indicates that the effect choice is declared in play/metagame
- **AND** the user is not misled into thinking every effect is fully automated

### Requirement: Raio Místico and Barreira Mística must use the new variant pattern
The system SHALL implement the initial multi-mode pattern for Raio Místico and Barreira Mística.

#### Scenario: Player uses one of the initial supported techniques
- **WHEN** the character has Raio Místico or Barreira Mística
- **THEN** the technique can cycle between its base use and variant uses in play mode
- **AND** acquisition cost remains a single 10XP technique purchase

