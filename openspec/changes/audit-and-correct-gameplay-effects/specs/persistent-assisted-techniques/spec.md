## ADDED Requirements

### Requirement: Persistent activation and trigger costs SHALL be distinct and validated
The system SHALL validate and charge preparation, activation, trigger, and maintenance costs at their declared moments without substituting one for another.

#### Scenario: Player prepares Petrovna arrows
- **WHEN** the configured stock is within the Habilidade bound and enough PM is available
- **THEN** the preparation cost SHALL equal the configured number of arrows
- **AND** the prepared stock SHALL become active

#### Scenario: Player lacks PM for a persistent activation
- **WHEN** the initial cost cannot be paid
- **THEN** no stock or active state SHALL be created

### Requirement: Persistent triggers SHALL execute safe local effects
The system SHALL apply deterministic stock-derived bonuses, resource consequences, and consumption when the player confirms a persistent trigger.

#### Scenario: Player fires Bomba Vital
- **WHEN** a positive stock is confirmed for firing
- **THEN** the attack plan SHALL receive Poder equal to the stock
- **AND** receive Ganho when stock is at least 20
- **AND** consume all stock after resolution
- **AND** reduce current PM according to the technique rule

#### Scenario: Player fires Petrovna arrows
- **WHEN** the prepared set is triggered
- **THEN** the app SHALL expose the deterministic damage per arrow and consume the stock
- **AND** target allocation SHALL remain assisted

### Requirement: Persistent effects SHALL remain isolated from unrelated rolls
The system SHALL NOT consume or apply a persistent state until its explicit compatible trigger is executed.

#### Scenario: Character attacks while arrows remain prepared
- **WHEN** the player performs an ordinary attack without triggering the arrows
- **THEN** the prepared stock SHALL remain unchanged
- **AND** its cost or effect SHALL NOT enter the ordinary attack
