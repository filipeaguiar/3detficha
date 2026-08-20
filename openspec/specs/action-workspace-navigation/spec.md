# action-workspace-navigation Specification

## Purpose
Define the independent Ações destination and its exclusive navigation among attacks, techniques, and modifiers or bonuses.

## Requirements
### Requirement: Ações SHALL be an independent application destination
The system SHALL provide an “Ações” destination that is separate from both character editing and gameplay and is reachable through its own application menu item.

#### Scenario: Open actions from the menu
- **WHEN** the user selects “Ações” in the application menu
- **THEN** the menu SHALL close
- **AND** the system SHALL display the actions workspace for the active character and active form
- **AND** it SHALL not display the character editor beneath the workspace

### Requirement: Actions workspace SHALL provide exclusive category navigation
The actions workspace SHALL provide separate navigation destinations for Ataques, Técnicas, and Modificadores/Bônus and SHALL render only the selected category content.

#### Scenario: Navigate among action categories
- **WHEN** the user selects one of the actions workspace categories
- **THEN** only entries belonging to that category SHALL be displayed
- **AND** entries from the other categories SHALL not be stacked below it

#### Scenario: Category is empty
- **WHEN** the selected category has no entries for the active form
- **THEN** the workspace SHALL display a category-specific empty state
- **AND** SHALL provide guidance to acquire or configure the relevant entries

### Requirement: Actions workspace SHALL follow the active character form
The actions workspace SHALL classify and display entries belonging to the currently active character form without copying or migrating persisted action data.

#### Scenario: Switch active form
- **WHEN** the user changes the active form while the actions workspace is open
- **THEN** the displayed attacks, techniques, and modifiers SHALL update to those belonging to the new active form

### Requirement: Workspace navigation SHALL preserve existing application flows
The system SHALL provide clear navigation from the actions workspace back to gameplay and character editing without resetting persisted character data or transient gameplay resources.

#### Scenario: Leave the actions workspace
- **WHEN** the user navigates from Ações to Jogar or Editar Ficha
- **THEN** the selected character, active form, resources, and saved action configuration SHALL remain unchanged
