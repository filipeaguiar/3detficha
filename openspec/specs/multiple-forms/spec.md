## ADDED Requirements

### Requirement: Character Forms Embedded Solely in CharacterSheet
The system SHALL store all alternate forms as elements of `CharacterSheet.forms` and SHALL NOT create auxiliary `CharacterSheet` entities or external link group records for transformations.

#### Scenario: User creates a new form
- **WHEN** user clicks "Nova Forma" in the editor
- **THEN** the system SHALL append a new `CharacterForm` to the current character's `forms` array
- **AND** the system SHALL NOT create a new entry in `characterSheets`
- **AND** the system SHALL NOT create a `linkGroupId`

#### Scenario: Legacy linked sheets migration
- **WHEN** the application loads with existing `linkGroups` or linked sheets in `localStorage`
- **THEN** the system SHALL merge auxiliary forms into the primary character sheet's `forms` array
- **AND** the system SHALL remove the auxiliary sheets from the global character list
- **AND** the system SHALL clear the legacy `3det_character_link_groups` storage key

### Requirement: Combat Resource Preservation Across Transformations
The system SHALL preserve damage and resource expenditure when transforming between forms in Play Mode, rather than resetting resources to 100%.

#### Scenario: Transforming with depleted PV or PM
- **WHEN** a character with damage (e.g. 3/10 PV) transforms into a form with maxPV of 15
- **THEN** current PV SHALL remain 3 (or capped at the new maximum if lower)
- **AND** current PV SHALL NOT be restored to maximum

#### Scenario: Switching active character in switcher
- **WHEN** a user switches to a completely different character in the character switcher
- **THEN** the system SHALL initialize that character's resources to its maximums

### Requirement: Form Lifecycle Operations
The system SHALL allow adding, editing, renaming, uploading avatars for, and removing non-base forms directly within the active character.

#### Scenario: Removing an alternate form
- **WHEN** user removes an alternate form at index N (where N > 0)
- **THEN** that form SHALL be removed from `CharacterSheet.forms`
- **AND** `activeFormIndex` SHALL reset to 0 (base form)
