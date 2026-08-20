## MODIFIED Requirements

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
