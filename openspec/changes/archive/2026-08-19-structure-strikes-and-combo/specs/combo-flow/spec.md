## ADDED Requirements

### Requirement: Combo must operate only on learned strikes
The system SHALL allow Combo to use only strikes learned through Golpes.

#### Scenario: Player starts combo
- **WHEN** the player activates Combo in gameplay
- **THEN** the available follow-up actions are restricted to learned strikes
- **AND** unrelated techniques and advantages are excluded

### Requirement: Combo must not repeat a strike within the same sequence
The system SHALL prevent the same strike from being used twice in the same combo sequence.

#### Scenario: Strike already used in combo
- **WHEN** the player has already used a strike in the active combo
- **THEN** that strike is no longer available for the same combo sequence

### Requirement: Combo must be modeled as a single-turn transient flow
The system SHALL model Combo as a transient gameplay sequence that is completed within the same turn.

#### Scenario: Combo sequence is started
- **WHEN** the player begins a combo
- **THEN** the UI tracks the current combo state for that turn
- **AND** the combo does not persist as a scene or long-duration effect

### Requirement: Combo follow-up count must respect Habilidade
The system SHALL limit additional combo strikes according to the character's Habilidade.

#### Scenario: Character reaches combo follow-up limit
- **WHEN** the player has used the maximum allowed extra strikes in the current combo
- **THEN** no further combo follow-up strike can be added
