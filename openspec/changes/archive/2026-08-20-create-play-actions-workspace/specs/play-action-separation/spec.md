## MODIFIED Requirements

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

## ADDED Requirements

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
