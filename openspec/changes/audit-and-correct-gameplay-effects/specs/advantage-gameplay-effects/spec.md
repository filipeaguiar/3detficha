## ADDED Requirements

### Requirement: Acquired advantages SHALL be the canonical source of official effects
The system SHALL derive each official advantage effect from the acquired advantage and its configured variant without requiring a duplicate manual modifier.

#### Scenario: Character acquires Precise Special Attack
- **WHEN** the character owns `ataque_especial::preciso`
- **THEN** the attack action SHALL expose the Preciso effect without requiring a separate preset
- **AND** the effect SHALL replace Poder with Habilidade only when that attack is resolved

#### Scenario: Legacy preset duplicates an acquired advantage
- **WHEN** a saved character contains both an official advantage and its legacy preset
- **THEN** the system SHALL apply the official effect only once
- **AND** SHALL preserve unrelated custom modifiers

### Requirement: Advantage effects SHALL respect their rule conditions
The system SHALL apply an advantage's deterministic effect only when its configured condition, action context, attribute, skill, target declaration, or scene declaration is satisfied.

#### Scenario: Carismático is used outside a social test
- **WHEN** the player resolves an attack or a non-social test
- **THEN** Carismático SHALL NOT add Poder or any other bonus

#### Scenario: Arena is declared for one test
- **WHEN** the player confirms that the current test occurs in the configured Arena and pays 2 PM
- **THEN** that test SHALL receive one Ganho
- **AND** the effect SHALL be consumed after that test

### Requirement: Repeatable and specialized advantages SHALL preserve configuration per acquisition
The system SHALL support multiple acquisitions where allowed and SHALL store each acquisition's permanent choices separately.

#### Scenario: Character owns Maestria for two skills
- **WHEN** the player acquires Maestria twice
- **THEN** each acquisition SHALL store a selected owned skill
- **AND** each critical modifier SHALL apply only to tests of its configured skill

#### Scenario: Character owns multiple Ajudantes
- **WHEN** the player acquires Ajudante more than once
- **THEN** each acquisition SHALL retain its function and skill choices
- **AND** one acquisition SHALL NOT overwrite another

### Requirement: Deterministic and assisted advantage behavior SHALL be distinguished
The system SHALL mark each advantage behavior as automatic, assisted, or narrative and SHALL NOT approximate unresolved behavior with an unrelated numeric bonus.

#### Scenario: Advantage depends on a target category
- **WHEN** the app cannot infer whether the target matches Inimigo
- **THEN** the UI SHALL request or expose an assisted declaration
- **AND** SHALL apply critical 5+ or Ganho according to the configured Inimigo rule after confirmation

### Requirement: Official advantage variants SHALL match the supported reference options
The system SHALL expose the reference variants needed to configure acquired advantages, including attack, defense, senses, levels, specializations, and repeatable choices.

#### Scenario: User configures a reference Special Attack effect
- **WHEN** the effect exists in the supported reference catalog
- **THEN** it SHALL be available as a variant or permanent acquisition choice
- **AND** its point cost and gameplay behavior SHALL match the reference
