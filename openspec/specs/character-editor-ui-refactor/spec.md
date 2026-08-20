# character-editor-ui-refactor Specification

## Purpose
Definir padrões reutilizáveis de composição visual e estrutural para a tela de edição da ficha, garantindo consistência entre abas, formulários e listas selecionáveis sem alterar o comportamento funcional da edição.

## Requirements
### Requirement: Character editor tabs SHALL use reusable UI composition patterns
The system SHALL render the editing experience using a consistent set of reusable editor UI patterns for tab containers, cards, nested option groups, selectable entries, and action areas, and SHALL keep the techniques tab focused on technique discovery, eligibility, acquisition, and removal instead of embedding detailed attack, action, and modifier configuration.

#### Scenario: Render editor tabs with shared structures
- **WHEN** a user navigates between concept, attributes, advantages, disadvantages, skills, and techniques tabs
- **THEN** each tab SHALL use the same editor-specific structural patterns for section framing, spacing, and interactive grouping where equivalent content types are shown.

#### Scenario: Render techniques acquisition
- **WHEN** a user opens the techniques tab
- **THEN** the editor SHALL present the technique catalog, eligibility, XP metadata, Golpes acquisition, and owned-technique removal using the shared editor composition system
- **AND** SHALL direct detailed action and modifier configuration to the independent Ações workspace

#### Scenario: Acquire a technique
- **WHEN** the user acquires a technique or a Golpes selection in the editor
- **THEN** the acquisition SHALL be persisted using the existing character data model
- **AND** its configurable action entries SHALL become available in the appropriate Ações category

### Requirement: Character editor forms SHALL use shared field styling
The system SHALL render editor text inputs, search fields, numeric fields, and select controls using a shared visual treatment for borders, spacing, focus state, and typography, and SHALL minimize one-off inline field presentation when the same control type appears elsewhere in the editor.

#### Scenario: Render editable fields in the editor
- **WHEN** a user views or focuses form controls in the editor
- **THEN** equivalent control types SHALL present a consistent visual style and focus treatment across tabs.

#### Scenario: Render repeated field controls consistently
- **WHEN** equivalent buttons, labels, search inputs, selects, or numeric controls appear in different editor sections
- **THEN** they SHALL use shared styling patterns instead of diverging visual treatments that make one section appear unfinished or inconsistent.

### Requirement: Character editor selectable lists SHALL use consistent state presentation
The system SHALL present selectable items such as advantages, disadvantages, skills, nested option choices, and technique strike selections with a consistent visual model for default, selected, granted, disabled, and warning states where applicable.

#### Scenario: Show selected and granted entries
- **WHEN** a user views selectable content that can be owned, granted, or disabled
- **THEN** the editor SHALL render those states with consistent structural treatment and clearly differentiated visual emphasis.

#### Scenario: Show owned techniques and special configuration states
- **WHEN** a user views owned techniques or technique-specific configuration controls
- **THEN** those entries SHALL use the same selection-state language and card hierarchy as the rest of the editor while still exposing their special controls.
