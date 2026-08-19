## ADDED Requirements

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
