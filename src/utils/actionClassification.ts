import { TECHNIQUES_CATALOG } from '../constants/app/techniques';
import type { CharacterForm, RollBonus } from '../types/character';
import { getKnownStrikes } from './character';

export type KnownStrikeAction = ReturnType<typeof getKnownStrikes>[number];

export type ClassifiedActions = {
  attacks: KnownStrikeAction[];
  techniques: RollBonus[];
  modifiers: RollBonus[];
};

const techniqueCatalogIds = new Set(TECHNIQUES_CATALOG.map((entry) => entry.catalogId));

export function classifyFormActions(currentForm: CharacterForm, visibleBonuses: RollBonus[] = currentForm.rollBonuses || []): ClassifiedActions {
  const attacks = getKnownStrikes(currentForm);
  const nonStrikeBonuses = visibleBonuses.filter((bonus) => bonus.sourceCatalogId !== 'golpes' && !bonus.id.startsWith('strike_'));

  return {
    attacks,
    techniques: nonStrikeBonuses.filter((bonus) => !!bonus.sourceCatalogId && techniqueCatalogIds.has(bonus.sourceCatalogId)),
    modifiers: nonStrikeBonuses.filter((bonus) => !bonus.sourceCatalogId || !techniqueCatalogIds.has(bonus.sourceCatalogId)),
  };
}
