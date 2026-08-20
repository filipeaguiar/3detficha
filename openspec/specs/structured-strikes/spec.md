# structured-strikes Specification

## Purpose
TBD - created by archiving change structure-strikes-and-combo. Update Purpose after archive.
## Requirements
### Requirement: Golpes must be a repeatable technique with permanent strike selections
The system SHALL support Golpes as a technique that grants two permanent strike selections per acquisition and may be acquired multiple times.

#### Scenario: Player acquires Golpes once
- **WHEN** the player adds Golpes to the character
- **THEN** the character gains one owned Golpes acquisition
- **AND** the system requires exactly two strike selections for that acquisition

#### Scenario: Player acquires Golpes again
- **WHEN** the player adds Golpes a second time
- **THEN** the character retains the previous strike selections
- **AND** gains two additional strike selections
- **AND** the owned technique is not collapsed into a single lossy entry

### Requirement: Known strikes must be visible individually in gameplay
The system SHALL expose the strikes learned through Golpes as individually identifiable gameplay actions in a dedicated attacks section that is separate from non-strike techniques.

#### Scenario: Character has selected strikes
- **WHEN** the player enters play mode
- **THEN** each known strike is visible by name in the dedicated attacks section
- **AND** its cost and usage note are available in the UI
- **AND** it is not duplicated as a general technique action

### Requirement: Strikes must remain distinct from non-strike techniques
The system SHALL distinguish known strikes from other techniques and advantages in both gameplay logic and play-mode presentation.

#### Scenario: Gameplay logic checks strike-only behavior
- **WHEN** a feature requires a strike
- **THEN** the system only considers learned strikes from Golpes
- **AND** does not treat unrelated techniques as valid strikes

#### Scenario: Play mode presents available actions
- **WHEN** known strikes and non-strike techniques are both available
- **THEN** strikes are rendered in the attacks section
- **AND** unrelated techniques are rendered in the techniques section

