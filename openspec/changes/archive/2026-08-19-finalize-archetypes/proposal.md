# Finalize Archetypes

## Why
The app now has initial archetype selection, catalog coverage for the core base archetypes, point costs, and partial automatic integration. However, archetypes are not yet fully implemented according to the source rules. Several archetypes still rely on notes instead of executable behavior, optional internal choices are not modeled, granted packages are only partially enforced in gameplay, and some special-case interactions remain descriptive only.

## What Changes
- Complete archetype data modeling for all currently included base archetypes.
- Model internal archetype choices explicitly (e.g. talent pick, disadvantage pick, perk pick, skill pick).
- Apply archetype-granted packages consistently across editor, totals, play mode, and persistence.
- Implement supported special effects in the gameplay engine where possible.
- Mark unsupported effects clearly and avoid silent partial behavior.
- Keep support for characters without archetype and without kit.

## Impact
- Affected specs: archetypes
- Affected code: archetype catalog, character types, point calculation, editor UI, play-mode bonus engine, persistence/migration, modal/detail presentation
