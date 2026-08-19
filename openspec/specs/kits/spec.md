## ADDED Requirements

### Requirement: Kits must be fully modeled as a distinct rules layer
The system SHALL treat kits as a first-class rules layer separate from free-picked advantages, disadvantages, skills, and archetypes.

#### Scenario: Kit data is distinct from other character picks
- **WHEN** a character has a kit selected
- **THEN** kit-granted behavior and kit-specific selections are stored and identified separately from free-picked content
- **AND** UI can distinguish what belongs to the kit

### Requirement: Kit cost must be applied exactly once
The system SHALL apply kit point cost once and SHALL NOT double-charge for content or effects granted by the selected kit.

#### Scenario: Selected kit contributes only its own cost
- **WHEN** a character selects a kit
- **THEN** total point calculation includes the kit cost exactly once
- **AND** no extra duplicate cost is added for the same granted package

### Requirement: Kit internal choices must be explicitly selectable and persisted
The system SHALL support kits that require player choices inside the selected kit package.

#### Scenario: Player chooses one option inside a kit
- **WHEN** a kit requires choosing one among multiple options
- **THEN** the editor presents the available options
- **AND** the selection is persisted on the character
- **AND** displayed kit behavior reflects the chosen option

### Requirement: Kit-supported gameplay effects must integrate into the bonus engine
The system SHALL expose automatable kit effects to the gameplay layer using the existing bonus/effect engine where possible.

#### Scenario: Kit grants an activatable roll effect
- **WHEN** a selected kit has a compatible roll-modifying effect
- **THEN** the effect appears in play mode as an available kit effect
- **AND** it modifies the roll according to its rule

### Requirement: Unsupported kit effects must be explicitly disclosed
The system SHALL not silently omit unsupported or only partially automated kit effects.

#### Scenario: Kit includes unsupported effect logic
- **WHEN** a selected kit contains an effect not implemented in the engine
- **THEN** the editor and/or detail UI identifies it as manual or narrator-handled
- **AND** the user is not led to believe it is automated

### Requirement: Kit passive package must be visible in edit and play flows
The system SHALL clearly show the passive package and activatable powers of the selected kit.

#### Scenario: User inspects the selected kit
- **WHEN** the character has a kit selected
- **THEN** the editor and play/detail UI show the kit identity, relevant passive package, activatable powers, and manual notes when present

### Requirement: The app must support characters without kit
The system SHALL allow a valid character to have no selected kit.

#### Scenario: Character is created or edited without kit
- **WHEN** the player chooses no kit
- **THEN** the character remains valid
- **AND** no kit cost is applied
- **AND** no kit package is injected
