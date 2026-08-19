## ADDED Requirements

### Requirement: Robust Dice Initialization
The system SHALL ensure the 3D dice engine initializes exactly once and gracefully recovers or fails without locking the application state.

#### Scenario: App boots in strict mode or rapid re-renders
- **WHEN** the `useDiceBox` hook executes its initialization effect multiple times concurrently
- **THEN** the system SHALL set an initialization lock on the first call
- **AND** the system SHALL ignore subsequent initialization attempts while the lock is active

#### Scenario: WebGL or assets fail to load
- **WHEN** the `DiceBox.init()` promise rejects
- **THEN** the system SHALL catch the error and log it
- **AND** the system SHALL reset the initialization state to allow potential future attempts or fallback without permanently breaking the roll button

#### Scenario: App opened in landscape mode (browser context)
- **WHEN** the app starts with `#root` hidden due to orientation constraints
- **THEN** the `DiceBox` engine SHALL NOT crash the application
- **AND** when returning to portrait mode, the system SHALL ensure the canvas dimensions are properly resolved for rolling.
