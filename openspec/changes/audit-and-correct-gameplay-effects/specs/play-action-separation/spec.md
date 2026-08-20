## ADDED Requirements

### Requirement: Combat and general actions SHALL resolve isolated effect sets
Ataque, Defesa, general tests, technique activations, persistent triggers, and maintenance actions SHALL each resolve only effects compatible with that action type.

#### Scenario: Attack and defense modifiers are selected together
- **WHEN** the player executes Ataque
- **THEN** only attack-compatible and universal effects SHALL be charged and consumed
- **AND** selected defense effects SHALL remain available for Defesa

#### Scenario: Utility technique is selected before combat
- **WHEN** the player performs a combat action unrelated to that utility technique
- **THEN** the utility technique SHALL NOT be charged, consumed, or added to the result

### Requirement: Dedicated combat actions SHALL expose their resolved rules before rolling
The Ataque and Defesa controls SHALL display the effective attribute, applicable combat skill, dice count, critical threshold, and total payable cost derived for that action.

#### Scenario: Preciso and Raio Místico are selected
- **WHEN** the player views Ataque before rolling
- **THEN** the control SHALL identify Habilidade, Mística, the resolved dice count, and the combined cost

### Requirement: Equivalent mandatory costs SHALL be charged once
The action resolver SHALL deduplicate overlapping mandatory cost components that represent the same underlying combat action.

#### Scenario: Magical defense uses Barreira Mística
- **WHEN** the simplified Mística defense cost and Barreira Mística represent the same magical-defense expenditure
- **THEN** the base mode SHALL cost 1 PM total
- **AND** the enhanced mode SHALL cost 2 PM total
