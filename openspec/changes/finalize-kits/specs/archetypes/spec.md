## ADDED Requirements

### Requirement: Archetypes and kits must coexist as independent rules layers
The system SHALL keep archetype behavior and kit behavior separated even when both are selected on the same character.

#### Scenario: Character has both archetype and kit
- **WHEN** a character selects an archetype and a kit
- **THEN** each layer keeps its own cost, granted package, selections, and active effects
- **AND** the system does not merge their origins or double-charge overlapping behavior
