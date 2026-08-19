## ADDED Requirements

### Requirement: Archetypes must be fully modeled as a distinct rules layer
The system SHALL treat archetypes as a first-class layer separate from free-picked advantages, disadvantages, skills, and kits.

#### Scenario: Archetype data is distinct from free picks
- **WHEN** a character has an archetype selected
- **THEN** granted content from the archetype is stored and identified separately from free-picked content
- **AND** UI can distinguish which items come from the archetype

### Requirement: Archetype cost must be applied exactly once
The system SHALL apply archetype point cost once and SHALL NOT double-charge for granted archetype content.

#### Scenario: Granted advantage does not add extra point cost
- **WHEN** an archetype grants an advantage
- **THEN** the total point calculation includes the archetype cost
- **AND** does not add the granted advantage cost again

### Requirement: Archetype-granted disadvantages must not consume normal disadvantage allowance
The system SHALL keep archetype-granted disadvantages outside the normal free disadvantage cap logic.

#### Scenario: Archetype disadvantage is tracked separately
- **WHEN** a character receives a disadvantage from an archetype
- **THEN** that disadvantage is marked as archetype-granted
- **AND** is not counted as a manually chosen disadvantage for cap purposes

### Requirement: Archetype internal choices must be explicitly selectable and persisted
The system SHALL support archetypes that require player choices inside the archetype package.

#### Scenario: Player chooses one granted option inside an archetype
- **WHEN** an archetype requires choosing one among multiple options
- **THEN** the editor presents the available options
- **AND** the selection is persisted on the character
- **AND** granted content reflects the chosen option

### Requirement: Locked archetype-granted items must not be removable directly
The system SHALL prevent direct removal of archetype-granted content unless the archetype changes or the archetype choice changes.

#### Scenario: User tries to remove a locked granted item
- **WHEN** an advantage granted by the archetype is shown in the editor
- **THEN** it is visually marked as locked/by archetype
- **AND** user interaction does not remove it as a free pick

### Requirement: Changing archetype must recalculate granted content safely
The system SHALL remove stale archetype-granted content and apply the new archetype package without deleting unrelated free-picked items.

#### Scenario: Character changes from one archetype to another
- **WHEN** the selected archetype changes
- **THEN** old archetype-granted items are removed
- **AND** new archetype-granted items are applied
- **AND** unrelated free selections remain intact

### Requirement: Archetype-supported gameplay effects must integrate into the bonus engine
The system SHALL expose automatable archetype effects to the gameplay layer using the existing bonus/effect engine where possible.

#### Scenario: Archetype grants an activatable roll effect
- **WHEN** an archetype has a compatible roll-modifying effect
- **THEN** the effect appears in play mode as an available archetype effect
- **AND** it modifies the roll according to its rule

### Requirement: Unsupported archetype effects must be explicitly disclosed
The system SHALL not silently omit unsupported effects.

#### Scenario: Archetype includes unsupported effect logic
- **WHEN** an archetype contains an effect not implemented in the engine
- **THEN** the editor and/or detail UI identifies it as manual or narrator-handled
- **AND** the user is not led to believe it is automated

### Requirement: The base archetype catalog must be complete for the included source section
The system SHALL include every archetype from the implemented source section with correct cost and package metadata.

#### Scenario: User browses available archetypes
- **WHEN** the archetype selector is opened
- **THEN** all supported base archetypes from the implemented source section are present
- **AND** each shows its cost and summary correctly

### Requirement: The app must support characters without archetype and without kit
The system SHALL allow a valid character to have no archetype and/or no kit.

#### Scenario: Character is created without kit or archetype
- **WHEN** the player chooses no kit and no archetype
- **THEN** the character remains valid
- **AND** no kit/archetype cost is applied
- **AND** no granted package is injected
