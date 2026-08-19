## ADDED Requirements

### Requirement: Distinct Tabs for Advantages and Disadvantages
The Character Editor SHALL provide separate navigation tabs for Advantages (`advantages`) and Disadvantages (`disadvantages`).

#### Scenario: Navigating to Advantages tab
- **WHEN** user clicks on the "Vantagens" tab in the editor
- **THEN** the system SHALL display only the advantages catalog and selection list

#### Scenario: Navigating to Disadvantages tab
- **WHEN** user clicks on the "Desvantagens" tab in the editor
- **THEN** the system SHALL display only the disadvantages catalog and selection list

### Requirement: Independent Search for Advantages and Disadvantages
The system SHALL maintain independent search filters for the Advantages and Disadvantages tabs.

#### Scenario: Searching in Advantages tab
- **WHEN** user types a search query in the Advantages tab
- **THEN** only advantages matching the search query SHALL be shown
- **AND** the Disadvantages tab search filter SHALL remain unaffected
