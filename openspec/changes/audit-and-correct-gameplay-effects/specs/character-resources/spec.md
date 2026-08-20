## ADDED Requirements

### Requirement: Resource enhancement advantages SHALL have one canonical representation
`+Ação`, `+Mana`, and `+Vida` SHALL use the rank fields that calculate maximum resources and point cost, and SHALL NOT also exist as independent no-effect advantage purchases.

#### Scenario: Player purchases +Mana
- **WHEN** the player increases the +Mana rank through the advantage flow or attribute resource control
- **THEN** both controls SHALL update the same canonical rank
- **AND** the character SHALL pay one point and receive 10 maximum PM per rank exactly once

#### Scenario: Legacy character contains duplicate resource representation
- **WHEN** a saved character has both a resource rank and the corresponding catalog advantage identifier
- **THEN** normalization SHALL preserve the effective purchased rank
- **AND** SHALL prevent duplicate point cost or duplicate resource increase

### Requirement: Temporary resource changes SHALL preserve their declared lifetime
The system SHALL retain and expire temporary PV, PM, or PA according to the originating rule rather than an unrelated next roll.

#### Scenario: Absorver Mana grants temporary PM
- **WHEN** temporary PM is generated
- **THEN** spending SHALL consume only the amount used
- **AND** any remainder SHALL persist until the rule's expiry point or explicit assisted expiry
- **AND** the character SHALL not absorb again while temporary PM remains
