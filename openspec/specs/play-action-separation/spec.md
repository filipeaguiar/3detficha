# play-action-separation Specification

## Purpose
Define how play mode separates known attacks from non-attack techniques while preserving gameplay behavior and avoiding duplicate actions.

## Requirements
### Requirement: Play mode SHALL separate attacks from techniques
The system SHALL render known attacks or strikes in a dedicated play-mode section and SHALL render non-attack techniques separately from manual modifiers and general bonuses. The independent Ações workspace SHALL expose Ataques, Técnicas, and Modificadores/Bônus as exclusive navigation destinations rather than one stacked list.

#### Scenario: Character has attacks, techniques, and modifiers
- **WHEN** the player opens the actions workspace with at least one entry in each category
- **THEN** strikes SHALL be available under Ataques
- **AND** non-attack techniques SHALL be available under Técnicas
- **AND** manual modifiers and general bonuses SHALL be available under Modificadores/Bônus
- **AND** selecting one destination SHALL not render the other destinations below it

#### Scenario: Player enters gameplay
- **WHEN** the player enters play mode
- **THEN** activation controls SHALL preserve the established attack and non-attack distinction
- **AND** SHALL not reintroduce duplicate strike actions

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

### Requirement: Action classification SHALL be explicit and stable
The system SHALL derive typed collections for attacks, techniques, and modifiers/bonuses from the active form and SHALL not encode category membership only through presentation markup.

#### Scenario: Golpes acquisition is classified
- **WHEN** a form owns Golpes with permanent strike selections
- **THEN** each selected strike SHALL be classified as an attack
- **AND** the Golpes acquisition record SHALL not be rendered as a duplicate technique or modifier action

#### Scenario: Legacy or custom bonus is classified
- **WHEN** an existing bonus does not have sufficient catalog metadata to qualify as a technique or attack
- **THEN** it SHALL remain accessible under Modificadores/Bônus
- **AND** SHALL not be discarded from the character
