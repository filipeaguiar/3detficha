## ADDED Requirements

### Requirement: Test Results Must Sum All Rolled Dice
The system SHALL calculate the total result of a test by summing all dice rolled, instead of picking the highest or lowest individual die.

#### Scenario: Normal roll with extra dice (Ganho)
- **WHEN** the player rolls a test with 2 or 3 dice
- **THEN** the system SHALL sum all the results (e.g., a roll of 4 and 5 equals 9)
- **AND** add the sum to the relevant attribute to form the final total.

### Requirement: Dice Pool Modifiers Determine Quantity
The system SHALL apply "Ganho" and "Perda" modifiers to the total number of dice rolled, clamped between 1 and 3.

#### Scenario: Roll with negative modifiers (Perda)
- **WHEN** a player rolls a test with a negative modifier (e.g., -1 Perda)
- **THEN** the system SHALL reduce the number of dice rolled by that amount
- **AND** ensure at least 1 die is always rolled, regardless of how large the penalty is.
