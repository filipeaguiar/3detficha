## ADDED Requirements

### Requirement: Play mode SHALL separate attacks from techniques
The system SHALL render known attacks or strikes in a dedicated play-mode section and SHALL render non-attack techniques and bonuses in a separate section.

#### Scenario: Character has attacks and techniques
- **WHEN** the player enters play mode with at least one known strike and at least one non-attack technique
- **THEN** the strikes SHALL appear in the attacks section
- **AND** the non-attack techniques SHALL appear in the techniques section

### Requirement: Play actions SHALL not be duplicated between sections
The system SHALL ensure that an action represented as a known strike is not also rendered as the same actionable entry in the non-attack techniques section.

#### Scenario: Golpes grants known strikes
- **WHEN** the character owns Golpes and has permanent strike selections
- **THEN** each selected strike SHALL appear once in the attacks section
- **AND** the Golpes acquisition SHALL not create duplicate strike actions in the techniques section

### Requirement: Separated sections SHALL preserve action behavior
The system SHALL preserve existing costs, activation handlers, combo state, variant state, assisted state, context details, and disabled states after attacks and techniques are separated.

#### Scenario: Player activates an action after separation
- **WHEN** the player activates a strike or technique from its dedicated section
- **THEN** the action SHALL execute with the same gameplay behavior and resource rules as before the separation
