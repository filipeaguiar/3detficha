## ADDED Requirements

### Requirement: Derived Resources Must Have Minimum Value of 1
The system SHALL ensure that maximum Health Points (PV), Mana Points (PM), and Action Points (PA) never drop below 1, even if the underlying attribute (Resistance, Ability, Power) is 0.

#### Scenario: Character has 0 in an attribute
- **WHEN** a character has Resistance 0, Ability 0, or Power 0
- **THEN** maxPV SHALL be at least 1
- **AND** maxPM SHALL be at least 1
- **AND** maxPA SHALL be at least 1

### Requirement: `+Ação` Advantage Scaling and Representation
The system SHALL allow purchasing ranks in `+Ação`, granting +2 PA per rank invested, and exposing it in the character editor.

#### Scenario: Character has ranks in `+Ação`
- **WHEN** `maisAcao` is set to N (where N > 0)
- **THEN** maxPA SHALL equal `Math.max(1, (Poder * 1) + (N * 2))`
- **AND** each rank SHALL consume 1 point in `calculatePoints`

### Requirement: Resource Ranks Contributed to Point Total
The system SHALL include purchased ranks in `maisVida`, `maisMana`, and `maisAcao` in the character's total spent points.

#### Scenario: Calculating points with resource enhancements
- **WHEN** a character has ranks in `maisVida`, `maisMana`, or `maisAcao`
- **THEN** `calculatePoints` SHALL add 1 point per rank to the overall character cost

### Requirement: Short Rest Follows 3DeT Victory Recovery
The system SHALL restore PV equal to Resistance and PM equal to Ability (minimum 1 each) upon performing a Quick Rest (Descanso Curto).

#### Scenario: Performing a Quick Rest
- **WHEN** user activates Quick Rest
- **THEN** current PV SHALL increase by `Math.max(1, resistencia)` (capped at maxPV)
- **AND** current PM SHALL increase by `Math.max(1, habilidade)` (capped at maxPM)
- **AND** current PA SHALL NOT be restored
