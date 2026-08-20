## ADDED Requirements

### Requirement: Roll modifiers SHALL be resolved in action context
The system SHALL filter active effects by action context, attribute, skill, condition, and selected variant before accumulating dice, attribute modifiers, critical modifiers, or automatic criticals.

#### Scenario: Defense modifier is active during an attack
- **WHEN** the player resolves an attack while a defense-only modifier is selected
- **THEN** the defense modifier SHALL NOT affect the attack
- **AND** SHALL NOT be consumed or charged by that attack

#### Scenario: Attribute-specific effect is active
- **WHEN** an effect applies only to Poder and the resolved test uses Habilidade without a transfer rule
- **THEN** the effect SHALL NOT modify the test

### Requirement: Attribute replacement SHALL preserve compatible transferred modifiers
The system SHALL resolve a single effective attribute replacement before accumulating modifiers and SHALL transfer only modifiers that the replacing rule explicitly permits.

#### Scenario: Preciso is combined with Potente
- **WHEN** Preciso replaces Poder with Habilidade on an attack and Potente is active
- **THEN** the attack SHALL use Habilidade
- **AND** the Potente attack modifier SHALL increase the effective Habilidade for that attack

#### Scenario: Two incompatible replacements are selected
- **WHEN** Preciso and Choque are selected for the same attack
- **THEN** the system SHALL block resolution
- **AND** ask the player to choose one replacement

### Requirement: Skills SHALL grant dice rather than fixed attribute bonuses
The system SHALL represent an applicable owned skill as one Ganho and SHALL include it in the clamped one-to-three-die pool.

#### Scenario: Combat test uses an applicable skill
- **WHEN** an attack or defense resolves with Luta, or with an allowed Mística combat source
- **THEN** the action SHALL roll one additional die
- **AND** SHALL NOT add a fixed +2 as a substitute

#### Scenario: General test uses a declared owned skill
- **WHEN** the player selects an owned applicable skill for a non-combat test
- **THEN** the test SHALL receive one additional die

### Requirement: Critical modifiers SHALL apply only to compatible tests
The system SHALL calculate critical threshold and automatic criticals from the effects remaining after contextual filtering.

#### Scenario: Perigoso attack is selected
- **WHEN** the player resolves the compatible attack
- **THEN** that attack SHALL score rolled criticals on 5 or 6
- **AND** an unrelated defense SHALL retain its own critical threshold

### Requirement: Resource validation SHALL precede action execution
The system SHALL validate every immediate, activation, trigger, and maintenance cost before changing resources or effect state.

#### Scenario: Character cannot afford an activation
- **WHEN** the action cost exceeds the available resource
- **THEN** the action SHALL NOT execute
- **AND** no resource or active state SHALL change
