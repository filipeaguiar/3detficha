# complex-technique-patterns Specification

## Purpose
TBD - created by archiving change generalize-complex-technique-patterns. Update Purpose after archive.
## Requirements
### Requirement: The system must classify complex techniques by reusable behavior patterns
The system SHALL support reusable behavior patterns for complex techniques rather than treating each one as an isolated exception.

#### Scenario: Technique requires structured handling
- **WHEN** a technique does not fit a fixed single-bonus model
- **THEN** it is modeled through a supported behavior pattern
- **AND** the pattern can be reused by other techniques with similar structure

### Requirement: The app must separate safe automation from table-declared resolution
The system SHALL automate only the parts of a technique that are safe to compute locally and SHALL explicitly disclose when the remaining resolution belongs to player/narrator judgment.

#### Scenario: Technique depends on target state or narrative ruling
- **WHEN** a technique effect depends on damage threshold, target resistance, obstacle layout, or narrative choice
- **THEN** the app shows the structured use and relevant constraints
- **AND** does not misrepresent the unresolved portion as fully automated

## ADDED Requirements

### Requirement: Every catalog technique must declare a supported gameplay pattern
The system SHALL classify every structured technique as a fixed modifier, cycling variant, immediate action, persistent assisted effect, temporary package, or explicitly narrative entry.

#### Scenario: Technique is added to gameplay
- **WHEN** the character owns a structured technique
- **THEN** play mode presents behavior consistent with its declared pattern
- **AND** avoids unsupported implicit automation

### Requirement: Structured effects must prefer exact safe automation over approximated unrelated bonuses
The system SHALL automate only mechanics directly represented by the rule and SHALL NOT add generic Gain, Loss, or numeric bonuses merely to make a narrative effect mechanical.

#### Scenario: Effect is conditional on target damage
- **WHEN** the app cannot know whether the target met the damage condition
- **THEN** the condition remains assisted
- **AND** no unconditional modifier is applied as a substitute
