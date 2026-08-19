# persistent-assisted-techniques Specification

## Purpose
TBD - created by archiving change generalize-complex-technique-patterns. Update Purpose after archive.
## Requirements
### Requirement: The system must support persistent assisted technique effects
The system SHALL support techniques that are activated once and remain available for assisted follow-up use, partial consumption, or later triggering.

#### Scenario: Technique stays armed after activation
- **WHEN** the player activates a persistent assisted technique
- **THEN** the play mode stores its active assisted state
- **AND** the user can later consume, trigger, or reference that state through the UI

### Requirement: Persistent assisted effects must expose remaining uses, stock, or follow-up cost when applicable
The system SHALL display the relevant assisted state for techniques that keep stock, charges, repeat triggers, or follow-up reaction costs.

#### Scenario: Technique has later consumable state
- **WHEN** the player inspects an active persistent assisted technique
- **THEN** the UI shows its remaining relevant state clearly
- **AND** the user can distinguish initial activation from later assisted use

