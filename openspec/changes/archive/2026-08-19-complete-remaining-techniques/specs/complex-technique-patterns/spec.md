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
