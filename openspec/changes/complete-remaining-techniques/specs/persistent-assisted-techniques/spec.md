## ADDED Requirements

### Requirement: Persistent stock must be configurable from rule-bounded values
The system SHALL support persistent assisted techniques whose initial stock is selected within a rule-derived bound and whose activation cost depends on that stock.

#### Scenario: Player prepares Petrovna arrows
- **WHEN** the player prepares Setas Infalíveis de Petrovna
- **THEN** the app allows a stock from one through Habilidade
- **AND** charges one PM per prepared arrow
- **AND** replaces any previously prepared set

### Requirement: Assisted persistent effects must support explicit ending
The system SHALL allow the player to end a persistent assisted effect when an external resistance or narrative condition ends it.

#### Scenario: Desprezo target resists a later trigger
- **WHEN** the player confirms that Desprezo ended
- **THEN** the active assisted state is cleared without another trigger cost

### Requirement: Stock consumption must be user-controlled and visible
The system SHALL display remaining stock and allow complete consumption without requiring target tracking.

#### Scenario: Player fires prepared arrows
- **WHEN** the player fires the prepared set
- **THEN** all remaining arrows are consumed
- **AND** the app discloses automatic damage per arrow for allocation among targets at the table
