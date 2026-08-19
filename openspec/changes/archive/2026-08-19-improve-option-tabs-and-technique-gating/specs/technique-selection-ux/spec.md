## ADDED Requirements

### Requirement: Advantages and disadvantages must be separated in the editor UX
The system SHALL present advantages and disadvantages as distinct selectable groups in the editor instead of mixing them in a single ambiguous flow.

#### Scenario: User browses character options
- **WHEN** the player opens the relevant editor areas
- **THEN** advantages and disadvantages are shown as separate sections or lists
- **AND** each section keeps its own controls and feedback

### Requirement: All selectable option tabs must support filtering
The system SHALL provide filtering controls for each relevant editor tab that presents a selectable catalog of options.

#### Scenario: User searches within a tab
- **WHEN** the player types a search or applies a filter in a selectable tab
- **THEN** only matching options remain visible in that tab
- **AND** the filter affects that tab without corrupting unrelated selections

### Requirement: Techniques must be filtered by character requirements
The system SHALL filter or block techniques that do not satisfy the current character requirements.

#### Scenario: Technique requires Magia and Mística
- **WHEN** a character lacks the required advantage or skill for a technique
- **THEN** that technique is not offered as normally selectable
- **AND** the UI clearly indicates it is unavailable or hides it according to the chosen filtering mode

### Requirement: Universal techniques must remain visible independently of restrictive requirements
The system SHALL support techniques that are valid for broad or universal use.

#### Scenario: Universal technique is listed
- **WHEN** the player opens the technique selection flow
- **THEN** techniques marked as universal/common-use remain available without specialized requirements

### Requirement: Techniques must carry structured XP metadata
The system SHALL model selectable techniques with structured XP cost and category metadata.

#### Scenario: Technique is selected from the catalog
- **WHEN** a technique is added through the guided flow
- **THEN** its XP cost and XP category are stored on the created technique entry
- **AND** the UI can use these values for funding and total calculation

### Requirement: XP-funded technique selection must be guided by the UI
The system SHALL allow the user to assign compatible XP-credit sources through guided UI instead of manual hidden identifiers.

#### Scenario: Technique can be funded by Grimório
- **WHEN** the character has a compatible XP-credit-granting advantage and selects a compatible technique
- **THEN** the editor offers that source as a funding option
- **AND** the UI shows available, spent, and remaining XP relevant to that choice

### Requirement: Incompatible XP credit must be blocked in the UI
The system SHALL prevent the UI from suggesting invalid XP-credit sources for incompatible techniques.

#### Scenario: Legendary technique with Grimório
- **WHEN** the player edits or selects a legendary technique
- **THEN** a Grimório-based source is not offered as valid funding
- **AND** the UI indicates why that funding path is unavailable
