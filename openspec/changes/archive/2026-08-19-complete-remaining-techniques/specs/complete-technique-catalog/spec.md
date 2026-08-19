## ADDED Requirements

### Requirement: The structured catalog must cover every technique in the reference chapter
The system SHALL provide one structured catalog entry for every named technique in the Techniques chapter, including tricks, common techniques, and legendary techniques.

#### Scenario: User searches for a reference technique
- **WHEN** the user searches the guided technique catalog for any technique named in the reference chapter
- **THEN** the corresponding technique is available as one structured entry
- **AND** it is not replaced by an unrelated or duplicate purchase

### Requirement: Catalog entries must preserve acquisition rules and requirements
Each technique entry SHALL define its XP category, acquisition cost, resource cost, duration, and structured requirements according to the reference.

#### Scenario: Character does not meet a technique requirement
- **WHEN** a technique requires an attribute minimum, advantage, skill, or prerequisite technique not present on the character
- **THEN** guided selection marks it unavailable
- **AND** discloses every unmet requirement

### Requirement: Narrative technique outcomes must remain explicit
Catalog entries SHALL describe outcome-dependent or narrative portions that the app does not automate.

#### Scenario: Technique depends on an external target or table decision
- **WHEN** the user inspects or activates the technique
- **THEN** the UI identifies the unresolved effect as table-declared or narrator-handled
