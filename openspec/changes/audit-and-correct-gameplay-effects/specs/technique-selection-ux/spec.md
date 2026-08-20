## ADDED Requirements

### Requirement: Acquired techniques SHALL preserve all runtime metadata
The guided acquisition flow SHALL copy context, replacement, skill mode, trigger, cost timing, automation level, repeatability, variants, and assisted configuration from the catalog into the owned instance.

#### Scenario: Player acquires Raio Místico
- **WHEN** acquisition completes
- **THEN** the created technique SHALL immediately be classified as an attack
- **AND** SHALL work without saving or reloading the character

### Requirement: Specialized advantage requirements SHALL use configured values
The guided flow SHALL compare exact configured advantage choices when a technique requires a specialization.

#### Scenario: Gambiarra requires Maestria in Saber
- **WHEN** the character owns Maestria configured for Mística
- **THEN** Gambiarra SHALL remain unavailable
- **AND** the UI SHALL name Maestria (Saber) as missing

### Requirement: Repeatable acquisitions SHALL retain independent state
The guided flow SHALL permit repeated acquisition only where the reference allows and SHALL assign stable independent identifiers and permanent choices.

#### Scenario: Technique is acquired more than once
- **WHEN** a repeatable technique permits another acquisition
- **THEN** the new instance SHALL retain its own selections and assisted state
- **AND** SHALL NOT overwrite or duplicate the first instance's action identifiers

### Requirement: Support level SHALL be visible before acquisition
The guided flow SHALL disclose whether a technique is automatic, assisted, or narrative before the player acquires it.

#### Scenario: Player inspects a partially automated technique
- **WHEN** part of its outcome remains table-declared
- **THEN** the UI SHALL identify the automatic and unresolved portions
