## MODIFIED Requirements

### Requirement: Play mode must allow cycling technique variants
The system SHALL provide a control that selects among available internal variants independently from the control that executes, activates, or deactivates the selected variant.

#### Scenario: Player selects a Raio Místico mode
- **WHEN** the player changes the variant selection
- **THEN** the selected mode SHALL change without spending resources or resolving an action
- **AND** the currently selected mode SHALL remain visible

#### Scenario: Player executes the selected mode
- **WHEN** the player activates or resolves the technique action
- **THEN** the system SHALL execute the already selected variant
- **AND** SHALL NOT silently cycle to another mode

### Requirement: Technique variant cost must be derived from the active mode
The system SHALL use the selected variant to determine the displayed cost, validate the available resource, and charge the cost at the variant's declared activation, resolution, trigger, or maintenance moment.

#### Scenario: Enhanced instant mode increases PM cost
- **WHEN** the player resolves an enhanced instant variant
- **THEN** the UI SHALL show its adjusted PM cost before resolution
- **AND** the adjusted cost SHALL be charged exactly once during that resolution

#### Scenario: Scene variant is activated
- **WHEN** the player activates Praga, Encantar, Queimar o Cosmo, or Megalon Superior
- **THEN** the selected scene cost SHALL be charged at activation
- **AND** SHALL NOT wait for or attach itself to an unrelated later roll

## ADDED Requirements

### Requirement: Immediate-action variants SHALL remain selectable
The system SHALL allow variant selection before executing an immediate action.

#### Scenario: Player chooses Absorver Mana with an action
- **WHEN** the player selects the action variant and then executes Absorver Mana
- **THEN** the system SHALL resolve `1D + H` temporary PM
- **AND** SHALL NOT force the movement variant
