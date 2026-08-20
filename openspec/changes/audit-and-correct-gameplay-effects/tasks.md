## 1. Rule Model and Resolution Foundation

- [x] 1.1 Add typed action contexts, effect keys, attribute/skill filters, triggers, cost timing, automation levels, and variant-level overrides to the character rule types.
- [x] 1.2 Implement a pure action resolver that produces effective attribute, skill, dice pool, critical rules, bonuses, itemized costs, consumed effects, preserved effects, and assisted notes.
- [x] 1.3 Implement conflict detection for incompatible attribute replacements and stable deduplication for equivalent official effects and costs.
- [x] 1.4 Add pre-execution validation for PM, PV, and PA costs across roll resolution, activation, trigger, and maintenance actions.
- [x] 1.5 Route dice count, critical threshold, automatic criticals, and result details through the resolved action plan without changing the established all-dice-sum formula.

## 2. Persistence and Compatibility

- [x] 2.1 Extend normalization to preserve new catalog metadata and infer source/effect keys for recognized legacy presets.
- [x] 2.2 Update technique acquisition to copy action scope, replacement, skill mode, trigger, cost timing, automation level, and all variant runtime metadata immediately.
- [x] 2.3 Deduplicate official legacy presets against acquired advantages while retaining custom and unrecognized modifiers.
- [x] 2.4 Normalize duplicate legacy representations of +Ação, +Mana, and +Vida into their canonical rank fields without double cost or resource gain.
- [x] 2.5 Add compatibility checks using representative saved sheets from before the contextual effect model.

## 3. Advantage Acquisition and Configuration

- [x] 3.1 Replace official modifier re-acquisition with derived gameplay effects from `currentForm.advantages` and configured variants.
- [x] 3.2 Add stable per-acquisition records for repeatable advantages and permanent choices such as Ajudante, Arena, Inimigo, Maestria, Mentor, Sentido, Ataque Especial, and Defesa Especial.
- [x] 3.3 Complete the supported reference variants for Ataque Especial, Defesa Especial, Sentido, Imune, Alcance, and other configurable advantages.
- [x] 3.4 Correct Alcance labels and levels and unify the editor controls for +Ação, +Mana, and +Vida with their canonical ranks.
- [x] 3.5 Update guided acquisition and point calculation for repeated, specialized, variable-cost, and archetype-granted advantages.

## 4. Advantage Gameplay Effects

- [x] 4.1 Implement contextual attribute effects for Ágil, Carismático, Forte, Gênio, Resoluto, and Vigoroso, including their optional critical 5+ costs where applicable.
- [x] 4.2 Implement assisted Ganho and critical effects for Arena, Devoto, Famoso, Inimigo, Inofensivo, Maestria, Patrono, Sentido, Telepata, Teleporte, and Torcida.
- [x] 4.3 Implement canonical Ataque Especial and Defesa Especial effects, replacements, costs, critical rules, and assisted outcomes from acquired variants.
- [x] 4.4 Implement structured actions for Ajudante functions, Cura, Foco, Magia, Regeneração, and other deterministic local resource effects.
- [x] 4.5 Classify remaining advantages as automatic, assisted, or narrative and expose their activation costs, duration, configuration, and unresolved table steps without fabricated bonuses.
- [x] 4.6 Remove or correct the legacy Arena, Inimigo, Uso de Perícia, Ajudante, and Carismático presets so they cannot apply incorrect mechanics.

## 5. Skills and Action Interface

- [x] 5.1 Resolve Luta and allowed Mística combat use as Ganho and prevent magical combat costs from being charged twice with Raio ou Barreira Mística.
- [x] 5.2 Add an assisted owned-skill selector for tests outside combat and remove the fixed +2 `Uso de Perícia` behavior.
- [x] 5.3 Update Ataque and Defesa cards to preview resolved attribute, skill, dice count, critical threshold, itemized total cost, conflicts, and disabled resource state.
- [x] 5.4 Ensure attack, defense, general tests, activations, triggers, and maintenance consume only their compatible effect sets.
- [x] 5.5 Keep manual dice and critical controls available only as explicit table overrides and distinguish them from automatic effects in result details.

## 6. Technique Lifecycle and Variants

- [x] 6.1 Separate variant selection controls from activation and execution for all cycling techniques.
- [x] 6.2 Charge instant, scene, trigger, and maintenance costs at their declared moments and never attach utility costs to unrelated later rolls.
- [x] 6.3 Correct scene cycling for Praga, Encantar, Queimar o Cosmo, and Megalon Superior.
- [x] 6.4 Correct immediate variant selection and temporary-PM lifetime/partial spending for Absorver Mana.
- [x] 6.5 Add per-variant contexts and attributes for Monasticismo Marcial, Ninjutsu, Super-Movimento, Ás Indomável, and other mixed-mode techniques.
- [x] 6.6 Preserve explicitly narrative variant execution as immediate assisted actions rather than empty modifiers consumed by a later roll.

## 7. Technique Deterministic Effects

- [x] 7.1 Add attack/defense context and correct deterministic behavior for Bola de Fogo, Raio Místico, Barreira Mística, Disparo de Energia, Poeira Glacial, Relâmpago, Rajada de Golpes, Golpe Púrpura, Pisão do Titã, Dim Mak, and Mata-Kaiju.
- [x] 7.2 Implement local recovery and resource outcomes for Cancioneiro Popular, Consertar, Role os Dados, and other techniques whose recipient is represented locally.
- [x] 7.3 Implement Queimar o Cosmo attribute levels, limits, activation costs, duration, and non-changing resource maxima according to the rule.
- [x] 7.4 Implement Percepção Cósmica Ganho, automatic critical, Percepção filtering, maintenance, and assisted skill substitution.
- [x] 7.5 Implement Abrir Chakra attribute filtering, deterministic benefits, temporary PV where applicable, perfect-defense disclosure, and end consequences.
- [x] 7.6 Implement Bomba Vital stock-derived Poder, 20+ Ganho, explicit firing, stock consumption, PM reduction, and assisted external contributions.
- [x] 7.7 Verify Setas Infalíveis, Desprezo, Rapsódia das Arcas, Área de Batalha, temporary summons, Megalon, Mikron, and Raio da Fúria against persistent/package requirements and safe automation boundaries.

## 8. Requirements, Catalog Coverage, and UX

- [x] 8.1 Represent and enforce exact specializations such as Maestria (Mística), Maestria (Saber), Maestria (Arte), Maestria (Percepção), and Maestria (Manha).
- [x] 8.2 Build the auditable rule matrix for all 59 advantages and 51 techniques with requirement, cost, duration, context, variants, automation level, and expected effects.
- [x] 8.3 Add executable catalog validation for missing IDs, invalid references, incomplete variants, unsupported repeatability, absent effect metadata, and coverage count regressions.
- [x] 8.4 Show automatic, assisted, and narrative support labels and unresolved steps consistently in Editar Ficha, Ações, Jogar, and result details.
- [x] 8.5 Verify that derived official actions are not duplicated across Ataques, Técnicas, and Modificadores/Bônus and that custom modifiers remain accessible.

## 9. Verification and Release

- [x] 9.1 Add table-driven rule tests for contextual filtering, skill Ganho, replacement transfer, critical modifiers, cost timing, cost deduplication, resource validation, consumption, and persistence.
- [x] 9.2 Add regression scenarios for Preciso + Raio Místico, Barreira Mística with Mística defense, simultaneous attack/defense modifiers, scene cycling, Absorver Mana variants, Percepção Cósmica, Chakras, and Bomba Vital.
- [x] 9.3 Manually verify acquisition, migration, action previews, general tests, responsive controls, assisted notes, and saved-sheet reload behavior in the browser.
- [x] 9.4 Run strict OpenSpec validation, rule-matrix validation, build, lint, and `git diff --check`, resolving all new errors before release.
- [x] 9.5 Review migration output and gameplay behavior, then commit, push, and deploy the completed change.
