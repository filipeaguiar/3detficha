## MODIFIED Requirements

### Requirement: Catalog entries must preserve acquisition rules and requirements
Each technique entry SHALL define its XP category, acquisition cost, resource cost, cost timing, duration, action context, applicable attribute or replacement, skill use, automation level, repeatability, variants, and structured requirements according to the reference.

#### Scenario: Character does not meet a technique requirement
- **WHEN** a technique requires an attribute minimum, advantage, specialized advantage, skill, or prerequisite technique not present on the character
- **THEN** guided selection marks it unavailable
- **AND** discloses every unmet requirement

#### Scenario: Technique is acquired
- **WHEN** the guided flow creates the owned technique instance
- **THEN** all gameplay-relevant catalog metadata SHALL be copied to that instance
- **AND** the behavior SHALL be available immediately without requiring a reload

## ADDED Requirements

### Requirement: The reference catalog SHALL have an executable coverage matrix
The system SHALL maintain validation data for every catalog advantage and technique, including support level, requirements, cost, duration, context, variants, and expected deterministic effects.

#### Scenario: Catalog validation runs
- **WHEN** project validation checks the reference matrix
- **THEN** all 59 advantages and 51 techniques SHALL have a classified entry
- **AND** missing identifiers, variants, requirements, contexts, or mandatory effects SHALL fail validation

### Requirement: Specialized requirements SHALL be validated exactly
The system SHALL distinguish a generic advantage from a configured specialization required by a technique.

#### Scenario: Technique requires Maestria in Mística
- **WHEN** the character owns Maestria configured for another skill
- **THEN** the technique SHALL remain unavailable
- **AND** the missing Mística specialization SHALL be disclosed
