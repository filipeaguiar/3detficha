## ADDED Requirements

### Requirement: Modifier button UI displays mana cost visually
The system SHALL replace the textual mana cost on a modifier button with a slanted rectangular visual indicator that matches the style of the existing mana bar. The variant cost indicator SHALL be removed.

#### Scenario: Render modifier button with visual cost
- **WHEN** a modifier button is rendered in the UI
- **THEN** the button shall show a slanted rectangle representing its mana cost, and shall not display any textual mana cost or variant cost indicator.
