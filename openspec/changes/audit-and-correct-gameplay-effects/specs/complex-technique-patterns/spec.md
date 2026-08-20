## ADDED Requirements

### Requirement: Technique effects SHALL declare an automation level
Every technique and effect variant SHALL declare whether its behavior is automatic, assisted, or narrative.

#### Scenario: Effect is fully determined by local character state
- **WHEN** attribute, skill, dice, critical, cost, and resource outcome can be computed locally
- **THEN** the system SHALL automate those mechanics

#### Scenario: Effect depends on an external target or table state
- **WHEN** target resistance, damage threshold, position, elapsed rounds, or narrator judgment is unknown
- **THEN** the system SHALL expose the unresolved step as assisted or narrative
- **AND** SHALL NOT grant an unconditional substitute bonus

### Requirement: Mixed-mode techniques SHALL support behavior metadata per variant
A technique variant SHALL be able to override context, attribute, skill, trigger, cost timing, duration, and automation level independently of the parent technique.

#### Scenario: Monasticismo switches from defense to object breaking
- **WHEN** the player selects Inviolável and later Palma de Ferro
- **THEN** each variant SHALL apply its Ganho only to its own defense or Poder context
- **AND** changing the variant SHALL NOT leave the previous context active

### Requirement: Assisted deterministic consequences SHALL still execute locally
The system SHALL automate deterministic local consequences even when the complete technique remains assisted.

#### Scenario: Bomba Vital is fired with stored energy
- **WHEN** the player confirms firing a configured Bomba Vital stock
- **THEN** the system SHALL add the stored value to the attack
- **AND** grant Ganho at the rule threshold
- **AND** apply the deterministic post-use PM consequence
- **AND** leave target allocation and damage outcomes assisted
