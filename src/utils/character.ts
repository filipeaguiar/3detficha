import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from '../constants/advantagesData';
import { ARCHETYPES_CATALOG } from '../constants/app/archetypes';
import { TECHNIQUES_CATALOG, type TechniqueCatalogEntry } from '../constants/app/techniques';
import { ADVANTAGE_VARIANT_OPTIONS, DISADVANTAGE_VARIANT_OPTIONS } from '../constants/app/variants';
import { STRIKES_CATALOG } from '../constants/app/strikes';
import type { StrikeCatalogEntry } from '../constants/app/strikes';
import type { CharacterForm, CharacterLinkGroup, CharacterSheet, KitPower, RollBonus, XPCreditRule } from '../types/character';

export function normalizeRollBonus(raw: any): RollBonus {
  const name = raw.name || raw.label || 'Bônus';
  const catalogTechnique = TECHNIQUES_CATALOG.find((technique) => technique.catalogId === raw.sourceCatalogId || technique.name === name);
  let bonusType: RollBonus['bonusType'] = raw.bonusType || 'flat';
  let attrSource: RollBonus['attrSource'] = raw.attrSource;

  if (!raw.bonusType && raw.type) {
    if (raw.type === 'fixed') bonusType = 'flat';
    else if (['poder', 'habilidade', 'resistencia'].includes(raw.type)) {
      bonusType = 'full_attr';
      attrSource = raw.type;
    }
  }

  return {
    id: raw.id || Date.now().toString() + Math.random().toString().slice(2, 6),
    name,
    alias: raw.alias || '',
    attribute: raw.attribute || 'any',
    bonusType,
    value: typeof raw.value === 'number' ? raw.value : 0,
    duration: raw.duration === 'scene' ? 'scene' : 'instant',
    attrSource: attrSource || 'poder',
    critThresholdMod: typeof raw.critThresholdMod === 'number' ? raw.critThresholdMod : 0,
    autoCrit: !!raw.autoCrit,
    automaticCriticals: typeof raw.automaticCriticals === 'number' ? raw.automaticCriticals : catalogTechnique?.automaticCriticals,
    extraDice: typeof raw.extraDice === 'number' ? raw.extraDice : 0,
    costValue: typeof raw.costValue === 'number' ? raw.costValue : 1,
    costResource: raw.costResource || 'none',
    xpCost: typeof raw.xpCost === 'number' ? raw.xpCost : catalogTechnique?.xpCost,
    xpCategory: raw.xpCategory || catalogTechnique?.xpCategory,
    fundedBySourceIds: Array.isArray(raw.fundedBySourceIds) ? raw.fundedBySourceIds : undefined,
    sourceCatalogId: raw.sourceCatalogId || catalogTechnique?.catalogId,
    gameplayPattern: raw.gameplayPattern || catalogTechnique?.gameplayPattern,
    tableNotes: Array.isArray(raw.tableNotes) ? raw.tableNotes : catalogTechnique?.tableNotes,
    variants: Array.isArray(raw.variants) ? raw.variants : catalogTechnique?.variants,
    selectedVariantId: raw.selectedVariantId || catalogTechnique?.selectedVariantId,
    variantSelectionMode: raw.variantSelectionMode || catalogTechnique?.variantSelectionMode,
    immediateAction: raw.immediateAction || catalogTechnique?.immediateAction,
    persistentAssisted: raw.persistentAssisted || catalogTechnique?.persistentAssisted,
    temporaryPackage: raw.temporaryPackage || catalogTechnique?.temporaryPackage,
    assistedState: raw.assistedState,
  };
}

export function createDefaultSheet(): CharacterSheet {
  return {
    id: 'char_default',
    characterName: 'Dahllan Druida',
    selectedKitId: '',
    selectedArchetypeId: 'humano',
    accentColor: '#5EB05D',
    soundOn: true,
    forms: [
      {
        id: 'base',
        name: 'Forma Humana',
        poder: 1,
        habilidade: 2,
        resistencia: 2,
        maisVida: 0,
        maisMana: 0,
        rollBonuses: [],
        wildShapeAdvantages: []
      }
    ]
  };
}

export function loadInitialSheets(): { sheets: CharacterSheet[]; activeId: string; linkGroups: CharacterLinkGroup[] } {
  const defaultSheet = createDefaultSheet();

  try {
    const savedList = localStorage.getItem('3det_character_list');
    const savedActiveId = localStorage.getItem('3det_active_character_id');

    if (savedList) {
      const parsedList = JSON.parse(savedList);
      if (Array.isArray(parsedList) && parsedList.length > 0) {
        const normalized = parsedList.map((sheet: any) => ({
          ...sheet,
          forms: (sheet.forms || []).map((f: any) => ({
            ...f,
            rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus),
            archetypeSelections: f.archetypeSelections || {},
            kitSelections: f.kitSelections || {},
          }))
        }));
        const activeId = savedActiveId || normalized[0].id;
        const savedGroups = localStorage.getItem('3det_character_link_groups');
        const parsedGroups = savedGroups ? JSON.parse(savedGroups) : [];
        return { sheets: normalized, activeId, linkGroups: Array.isArray(parsedGroups) ? parsedGroups : [] };
      }
    }

    const legacySaved = localStorage.getItem('3det_ficha');
    if (legacySaved) {
      const parsed = JSON.parse(legacySaved);
      const migratedSheet: CharacterSheet = {
        id: 'char_' + Date.now(),
        characterName: parsed.characterName || 'Personagem',
        selectedKitId: parsed.selectedKitId || '',
        selectedArchetypeId: parsed.selectedArchetypeId || 'humano',
        accentColor: parsed.accentColor || '#ff0066',
        soundOn: parsed.soundOn ?? true,
        forms: Array.isArray(parsed.forms) && parsed.forms.length > 0 ? parsed.forms.map((f: any) => ({
          ...f,
          rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus),
          archetypeSelections: f.archetypeSelections || {},
          kitSelections: f.kitSelections || {},
        })) : [
          {
            id: 'base',
            name: 'Forma Normal',
            poder: parsed.poder ?? 1,
            habilidade: parsed.habilidade ?? 1,
            resistencia: parsed.resistencia ?? 1,
            maisVida: parsed.maisVida ?? 0,
            maisMana: parsed.maisMana ?? 0,
            rollBonuses: (parsed.rollBonuses || []).map(normalizeRollBonus),
            wildShapeAdvantages: [],
            archetypeSelections: {},
            kitSelections: {}
          }
        ]
      };
      return { sheets: [migratedSheet], activeId: migratedSheet.id, linkGroups: [] };
    }
  } catch (e) {
    console.error('Error loading characters from storage:', e);
  }

  return { sheets: [defaultSheet], activeId: defaultSheet.id, linkGroups: [] };
}

export function getActiveBonusVariant(bonus: RollBonus) {
  if (!bonus.variants || bonus.variants.length === 0) return null;
  return bonus.variants.find((variant) => variant.id === bonus.selectedVariantId) || bonus.variants[0] || null;
}

export function getBonusSubtitle(bonus: RollBonus): string {
  const parts: string[] = [];
  const activeVariant = getActiveBonusVariant(bonus);
  const effectiveBonusType = activeVariant?.bonusType || bonus.bonusType;
  const effectiveValue = typeof activeVariant?.value === 'number' ? activeVariant.value : bonus.value;
  const effectiveCritThresholdMod = typeof activeVariant?.critThresholdMod === 'number' ? activeVariant.critThresholdMod : bonus.critThresholdMod;
  const effectiveAutoCrit = typeof activeVariant?.autoCrit === 'boolean' ? activeVariant.autoCrit : bonus.autoCrit;
  const effectiveAutomaticCriticals = typeof activeVariant?.automaticCriticals === 'number' ? activeVariant.automaticCriticals : (bonus.automaticCriticals || 0);
  const effectiveExtraDice = typeof activeVariant?.extraDice === 'number' ? activeVariant.extraDice : bonus.extraDice;

  if (effectiveBonusType === 'attr_mod' && effectiveValue) {
    const attrLetter = bonus.attribute === 'poder' ? 'P' : bonus.attribute === 'habilidade' ? 'H' : bonus.attribute === 'resistencia' ? 'R' : 'Atributo';
    parts.push(`+${effectiveValue} ${attrLetter}`);
  } else if (effectiveBonusType === 'flat' && effectiveValue) {
    parts.push(`+${effectiveValue} Fixo`);
  } else if (effectiveBonusType === 'full_attr') {
    const srcLetter = bonus.attrSource === 'poder' ? 'P' : bonus.attrSource === 'habilidade' ? 'H' : 'R';
    parts.push(`+${srcLetter}`);
  }

  if (effectiveCritThresholdMod && effectiveCritThresholdMod < 0) {
    const critValue = Math.max(4, 6 + effectiveCritThresholdMod);
    parts.push(`Crítico ${critValue}+`);
  }
  if (effectiveAutoCrit || effectiveAutomaticCriticals > 0) {
    const count = Math.max(effectiveAutoCrit ? 1 : 0, effectiveAutomaticCriticals);
    parts.push(count > 1 ? `${count} Críticos Auto` : 'Crítico Auto');
  }
  if (effectiveExtraDice && effectiveExtraDice > 0) parts.push(`+${effectiveExtraDice}D Ganho`);
  else if (effectiveExtraDice && effectiveExtraDice < 0) parts.push(`${effectiveExtraDice}D Perda`);
  if (bonus.duration === 'scene') parts.push('Cena');

  let text = parts.join(' • ');
  if (!text && bonus.name) text = bonus.name;

  const effectiveCostResource = activeVariant?.costResource || bonus.costResource;
  const effectiveCostValue = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : bonus.costValue;
  if (effectiveCostResource && effectiveCostResource !== 'none' && effectiveCostValue) {
    text += ` [-${effectiveCostValue} ${effectiveCostResource}]`;
  }
  return text || 'Sem bônus direto';
}

export function getKitPowerModifier(power: KitPower) {
  if (power.structuredEffect) {
    return {
      bonusType: power.structuredEffect.bonusType || 'none',
      attribute: power.structuredEffect.attribute || 'any',
      value: power.structuredEffect.value || 0,
      extraDice: power.structuredEffect.extraDice || 0,
      critThresholdMod: power.structuredEffect.critThresholdMod || 0,
      autoCrit: !!power.structuredEffect.autoCrit,
      duration: power.structuredEffect.duration || (power.type === 'buff' || power.type === 'per_scene' ? 'scene' : 'instant')
    } as const;
  }

  if (power.bonusType || power.value || power.extraDice || power.critThresholdMod) {
    return {
      bonusType: power.bonusType || 'attr_mod',
      attribute: power.attribute || 'any',
      value: power.value || 0,
      extraDice: power.extraDice || 0,
      critThresholdMod: power.critThresholdMod || 0,
      autoCrit: !!power.autoCrit,
      duration: power.type === 'buff' || power.type === 'per_scene' ? 'scene' : 'instant'
    } as const;
  }

  const desc = power.desc || '';
  let attr: 'poder' | 'habilidade' | 'resistencia' | 'any' = 'any';
  let val = 0;
  let bType: 'attr_mod' | 'flat' | 'none' = 'none';
  let extraDice = 0;
  let critMod = 0;
  const autoCrit = false;

  if (/P\+(\d+)/i.test(desc)) {
    attr = 'poder';
    val = parseInt(desc.match(/P\+(\d+)/i)![1]);
    bType = 'attr_mod';
  } else if (/H\+(\d+)/i.test(desc)) {
    attr = 'habilidade';
    val = parseInt(desc.match(/H\+(\d+)/i)![1]);
    bType = 'attr_mod';
  } else if (/R\+(\d+)/i.test(desc)) {
    attr = 'resistencia';
    val = parseInt(desc.match(/R\+(\d+)/i)![1]);
    bType = 'attr_mod';
  }

  if (/Ganho/i.test(desc) || /\+1D/i.test(desc)) extraDice = 1;
  if (/Crítico 5\+/i.test(desc)) critMod = -1;

  return {
    bonusType: bType,
    attribute: attr,
    value: val,
    extraDice,
    critThresholdMod: critMod,
    autoCrit,
    duration: power.type === 'buff' || power.type === 'per_scene' ? 'scene' : 'instant'
  } as const;
}

function getFirstNumericCost(cost?: string): number {
  if (!cost) return 0;
  const negativeMatch = cost.match(/-\d+/);
  if (negativeMatch) return parseInt(negativeMatch[0], 10);
  const positiveMatch = cost.match(/\d+/);
  return positiveMatch ? parseInt(positiveMatch[0], 10) : 0;
}

export function getXPCreditRules(currentForm: CharacterForm): XPCreditRule[] {
  const rules: XPCreditRule[] = [];
  (currentForm.advantages || []).forEach((advId: string) => {
    const [baseId, variantKey] = advId.split('::');
    if (baseId === 'grimorio') {
      const rank = variantKey === 'supremo' ? 3 : variantKey === 'avancado' ? 2 : 1;
      rules.push({ sourceId: advId, label: 'Grimório', xpPerRank: 10 * rank, allowedCategories: ['trick', 'common'] });
    }
  });
  return rules;
}

export function getEligibleXPCreditSources(currentForm: CharacterForm, category: 'trick' | 'common' | 'legendary' | 'generic', excludeBonusId?: string) {
  const rules = getXPCreditRules(currentForm);
  const budgets = new Map<string, number>();
  rules.forEach(rule => budgets.set(rule.sourceId, rule.xpPerRank));

  const techniques = (currentForm.rollBonuses || []).filter((bonus) => bonus.id !== excludeBonusId && typeof bonus.xpCost === 'number' && bonus.xpCost > 0);
  techniques.forEach((bonus) => {
    const bonusCategory = bonus.xpCategory || 'generic';
    let remaining = bonus.xpCost || 0;
    (bonus.fundedBySourceIds || []).forEach((sourceId) => {
      const rule = rules.find(r => r.sourceId === sourceId && r.allowedCategories.includes(bonusCategory));
      if (!rule || remaining <= 0) return;
      const available = budgets.get(sourceId) || 0;
      const consumed = Math.min(available, remaining);
      budgets.set(sourceId, available - consumed);
      remaining -= consumed;
    });
  });

  return rules
    .filter(rule => rule.allowedCategories.includes(category))
    .map(rule => ({ ...rule, remainingXP: budgets.get(rule.sourceId) || 0 }));
}

export function getXPCreditSummary(currentForm: CharacterForm) {
  const rules = getXPCreditRules(currentForm);
  const budgets = new Map<string, number>();
  rules.forEach(rule => budgets.set(rule.sourceId, rule.xpPerRank));

  const techniques = (currentForm.rollBonuses || []).filter((bonus) => typeof bonus.xpCost === 'number' && bonus.xpCost > 0);
  techniques.forEach((bonus) => {
    const category = bonus.xpCategory || 'generic';
    let remaining = bonus.xpCost || 0;
    (bonus.fundedBySourceIds || []).forEach((sourceId) => {
      const rule = rules.find(r => r.sourceId === sourceId && r.allowedCategories.includes(category));
      if (!rule || remaining <= 0) return;
      const available = budgets.get(sourceId) || 0;
      const consumed = Math.min(available, remaining);
      budgets.set(sourceId, available - consumed);
      remaining -= consumed;
    });
  });

  return rules.map(rule => ({
    ...rule,
    spentXP: rule.xpPerRank - (budgets.get(rule.sourceId) || 0),
    remainingXP: budgets.get(rule.sourceId) || 0,
  }));
}

export function calculatePoints(currentForm: CharacterForm, kitCost = 0, archetypeCost = 0): number {
  let total = currentForm.poder + currentForm.habilidade + currentForm.resistencia + kitCost + archetypeCost;

  if (currentForm.skills) total += currentForm.skills.length;

  if (currentForm.advantages) {
    currentForm.advantages.forEach((advId: string) => {
      const [baseId, variantKey] = advId.split('::');
      const adv = ADVANTAGES_CATALOG.find(a => a.id === baseId);
      const variant = variantKey ? ADVANTAGE_VARIANT_OPTIONS[baseId]?.find(v => v.key === variantKey) : undefined;
      const numericCost = getFirstNumericCost(variant?.cost || adv?.cost);
      total += numericCost;
    });
  }

  if (currentForm.disadvantages) {
    currentForm.disadvantages.forEach((disId: string) => {
      const [baseId, variantKey] = disId.split('::');
      const dis = DISADVANTAGES_CATALOG.find(d => d.id === baseId);
      const variant = variantKey ? DISADVANTAGE_VARIANT_OPTIONS[baseId]?.find(v => v.key === variantKey) : undefined;
      const numericCost = getFirstNumericCost(variant?.cost || dis?.cost);
      total += numericCost;
    });
  }

  const rules = getXPCreditRules(currentForm);
  const budgets = new Map<string, number>();
  rules.forEach(rule => budgets.set(rule.sourceId, rule.xpPerRank));
  if (currentForm.rollBonuses) {
    currentForm.rollBonuses.forEach((bonus) => {
      let remainingXP = bonus.xpCost || 0;
      const category = bonus.xpCategory || 'generic';
      if (remainingXP > 0) {
        (bonus.fundedBySourceIds || []).forEach((sourceId) => {
          const rule = rules.find(r => r.sourceId === sourceId && r.allowedCategories.includes(category));
          if (!rule || remainingXP <= 0) return;
          const available = budgets.get(sourceId) || 0;
          const consumed = Math.min(available, remainingXP);
          budgets.set(sourceId, available - consumed);
          remainingXP -= consumed;
        });
        total += Math.max(0, Math.ceil(remainingXP / 10));
      }
    });
  }

  return total;
}

export function isTechniqueEligible(currentForm: CharacterForm, technique: TechniqueCatalogEntry): { eligible: boolean; unmet: string[] } {
  const unmet: string[] = [];
  const requirements = technique.requirements || {};
  const advantages = new Set(currentForm.advantages || []);
  const skills = new Set(currentForm.skills || []);
  const ownedTechniques = new Set((currentForm.rollBonuses || []).map((bonus) => bonus.sourceCatalogId || bonus.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')));

  (requirements.advantages || []).forEach((id) => {
    if (![...advantages].some((value) => value === id || value.startsWith(`${id}::`))) unmet.push(`Vantagem: ${id}`);
  });
  (requirements.exactAdvantages || []).forEach((id) => {
    if (!advantages.has(id)) unmet.push(`Vantagem específica: ${id.replace('::', ' — ')}`);
  });
  (requirements.skills || []).forEach((id) => {
    if (!skills.has(id)) unmet.push(`Perícia: ${id}`);
  });
  (requirements.techniques || []).forEach((id) => {
    if (!ownedTechniques.has(id)) unmet.push(`Técnica: ${id.replaceAll('_', ' ')}`);
  });
  Object.entries(requirements.attributes || {}).forEach(([attribute, minimum]) => {
    const value = currentForm[attribute as 'poder' | 'habilidade' | 'resistencia'];
    if (typeof minimum === 'number' && value < minimum) unmet.push(`${attribute.charAt(0).toUpperCase() + attribute.slice(1)} ${minimum}`);
  });
  if (requirements.anyAttributeMin && Math.max(currentForm.poder, currentForm.habilidade, currentForm.resistencia) < requirements.anyAttributeMin) unmet.push(`Um atributo ${requirements.anyAttributeMin}`);
  if (requirements.anyOfAttributes) {
    const matches = Object.entries(requirements.anyOfAttributes).some(([attribute, minimum]) => currentForm[attribute as 'poder' | 'habilidade' | 'resistencia'] >= (minimum || 0));
    if (!matches) unmet.push(`Uma destas exigências: ${Object.entries(requirements.anyOfAttributes).map(([attribute, minimum]) => `${attribute} ${minimum}`).join(', ')}`);
  }
  if ((requirements.anyOfAdvantages || []).length > 0 && !(requirements.anyOfAdvantages || []).some((id) => [...advantages].some((value) => value === id || value.startsWith(`${id}::`)))) unmet.push(`Uma destas vantagens: ${(requirements.anyOfAdvantages || []).join(', ')}`);
  if ((requirements.anyOfSkills || []).length > 0 && !(requirements.anyOfSkills || []).some((id) => skills.has(id))) unmet.push(`Uma destas perícias: ${(requirements.anyOfSkills || []).join(', ')}`);
  if (requirements.oneOf) {
    const matchesAdvantage = (requirements.oneOf.advantages || []).some((id) => [...advantages].some((value) => value === id || value.startsWith(`${id}::`)));
    const matchesSkill = (requirements.oneOf.skills || []).some((id) => skills.has(id));
    const matchesTechnique = (requirements.oneOf.techniques || []).some((id) => ownedTechniques.has(id));
    if (!matchesAdvantage && !matchesSkill && !matchesTechnique) unmet.push(`Uma destas opções: ${[...(requirements.oneOf.advantages || []), ...(requirements.oneOf.skills || []), ...(requirements.oneOf.techniques || [])].join(', ')}`);
  }

  return { eligible: technique.universal || unmet.length === 0, unmet };
}

export function getKnownStrikes(currentForm: CharacterForm) {
  const selections = currentForm.strikeSelections || [];
  return selections.flatMap((selection) => selection.strikeIds.map((strikeId) => ({ acquisitionId: selection.acquisitionId, strike: STRIKES_CATALOG.find((entry) => entry.id === strikeId) })).filter((entry) => entry.strike));
}

export function createStrikeBonus(strike: StrikeCatalogEntry, acquisitionId: string): RollBonus {
  return {
    id: `strike_${acquisitionId}_${strike.id}`,
    name: strike.name,
    alias: '',
    attribute: 'poder',
    bonusType: strike.bonusType || 'none',
    value: strike.value || 0,
    duration: 'instant',
    critThresholdMod: strike.critThresholdMod || 0,
    autoCrit: strike.autoCrit || false,
    extraDice: strike.extraDice || 0,
    costValue: strike.costValue,
    costResource: strike.costResource,
    immediateAction: strike.immediateAction,
  };
}

export function createTechniqueBonusFromCatalog(technique: TechniqueCatalogEntry, currentForm: CharacterForm): RollBonus {
  const receivesFreeSmallWishes = technique.catalogId === 'pequenos_desejos' && (currentForm.skills || []).includes('mistica') && (currentForm.advantages || []).some((id) => id === 'magia' || id.startsWith('magia::'));
  const effectiveXPCost = receivesFreeSmallWishes ? 0 : (technique.xpCost || 0);
  const credits = getEligibleXPCreditSources(currentForm, technique.xpCategory || 'common');
  const autoFunding = credits.filter((credit) => credit.remainingXP >= effectiveXPCost).map((credit) => credit.sourceId);
  return {
    id: Date.now().toString() + Math.random().toString().slice(2, 6),
    name: technique.name,
    alias: technique.alias || '',
    attribute: technique.attribute,
    bonusType: technique.bonusType,
    value: technique.value,
    duration: technique.duration,
    attrSource: technique.attrSource,
    critThresholdMod: technique.critThresholdMod,
    autoCrit: technique.autoCrit,
    automaticCriticals: technique.automaticCriticals,
    extraDice: technique.extraDice,
    costValue: technique.costValue,
    costResource: technique.costResource,
    xpCost: effectiveXPCost,
    xpCategory: technique.xpCategory,
    fundedBySourceIds: technique.xpCategory === 'legendary' ? [] : autoFunding.slice(0, 1),
    sourceCatalogId: technique.catalogId,
    gameplayPattern: technique.gameplayPattern || (technique.temporaryPackage ? 'temporary-package' : technique.persistentAssisted ? 'persistent-assisted' : technique.immediateAction ? 'immediate-action' : technique.variants?.length ? 'cycling-variant' : 'fixed-modifier'),
    tableNotes: technique.tableNotes,
    variants: technique.variants,
    selectedVariantId: technique.selectedVariantId,
    variantSelectionMode: technique.variantSelectionMode,
    immediateAction: technique.immediateAction,
    persistentAssisted: technique.persistentAssisted,
    temporaryPackage: technique.temporaryPackage,
    assistedState: technique.persistentAssisted
      ? { active: false, remainingUses: undefined, stockCount: 0, configuredStock: technique.persistentAssisted.stockCount ?? technique.persistentAssisted.stockMin }
      : technique.temporaryPackage ? { active: false, packageChoices: [] } : undefined,
  };
}

export function getArchetypeCost(archetypeId?: string): number {
  if (!archetypeId) return 0;
  return ARCHETYPES_CATALOG.find((a) => a.id === archetypeId)?.cost || 0;
}
