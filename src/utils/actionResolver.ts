import type {
  ActionRequest,
  CharacterForm,
  ItemizedCost,
  KitPower,
  ResolvedActionPlan,
  ResolvedAppliedBonus,
  RollBonus,
} from '../types/character';
import { getActiveBonusVariant, getKitPowerModifier } from './character';

export type ActionResolverContext = {
  currentForm: CharacterForm;
  rollBonuses: RollBonus[];
  currentPV: number;
  currentPM: number;
  currentPA: number;
  temporaryPM?: number;
  activeKitBuffsList?: Array<{ power: KitPower; mod: ReturnType<typeof getKitPowerModifier> }>;
  passiveArchetypeSkillEffects?: Array<{ id: string; name: string; attribute: 'habilidade'; bonusType: 'attr_mod'; value: number; duration: 'scene' }>;
  selectedKitId?: string;
  selectedArchetypeId?: string;
};

export function resolveActionPlan(
  request: ActionRequest,
  context: ActionResolverContext
): ResolvedActionPlan {
  const { currentForm, rollBonuses, currentPV, currentPM, currentPA, temporaryPM = 0, activeKitBuffsList = [], passiveArchetypeSkillEffects = [] } = context;
  const activeIds = request.activeBonusIds
    ? (request.activeBonusIds instanceof Set ? request.activeBonusIds : new Set(request.activeBonusIds))
    : new Set<string>();

  if (request.sourceBonusId) {
    activeIds.add(request.sourceBonusId);
  }

  // 1. Collect candidate bonuses
  const candidateBonuses = rollBonuses.filter((b) => activeIds.has(b.id));

  // 2. Filter candidates by action context
  const contextFilteredBonuses = candidateBonuses.filter((bonus) => {
    const variant = getActiveBonusVariant(bonus);
    const scope = variant?.actionScope || bonus.actionScope || 'any';
    if (scope === 'any') return true;
    if (request.actionType === 'attack') return scope === 'attack';
    if (request.actionType === 'defense') return scope === 'defense';
    if (request.actionType === 'general') return scope === 'general';
    if (request.actionType === 'activation' || request.actionType === 'trigger' || request.actionType === 'maintenance') {
      return bonus.id === request.sourceBonusId || scope === request.actionType;
    }
    return true;
  });

  // 3. Deduplicate by effectKey if present
  const deduplicatedBonuses: RollBonus[] = [];
  const seenEffectKeys = new Set<string>();
  for (const bonus of contextFilteredBonuses) {
    const variant = getActiveBonusVariant(bonus);
    const effectKey = variant?.effectKey || bonus.effectKey;
    if (effectKey) {
      if (seenEffectKeys.has(effectKey)) continue;
      seenEffectKeys.add(effectKey);
    }
    deduplicatedBonuses.push(bonus);
  }

  // 4. Determine attribute replacements and detect conflicts
  const defaultAttr: 'poder' | 'habilidade' | 'resistencia' =
    request.actionType === 'attack'
      ? 'poder'
      : request.actionType === 'defense'
      ? 'resistencia'
      : request.targetAttribute || 'habilidade';

  const requestedReplacements = new Set<'poder' | 'habilidade' | 'resistencia'>();
  for (const bonus of deduplicatedBonuses) {
    const variant = getActiveBonusVariant(bonus);
    const replacement = variant?.replacementAttribute || bonus.replacementAttribute;
    const scope = variant?.actionScope || bonus.actionScope;
    if (replacement && (!scope || scope === request.actionType || scope === 'any')) {
      requestedReplacements.add(replacement);
    }
  }

  let hasConflicts = false;
  let conflictMessage: string | undefined;
  let effectiveAttributeName: 'poder' | 'habilidade' | 'resistencia' = defaultAttr;

  if (requestedReplacements.size > 1) {
    hasConflicts = true;
    const actionLabel = request.actionType === 'defense' ? 'a defesa' : request.actionType === 'attack' ? 'o ataque' : 'o teste';
    conflictMessage = `Escolha apenas uma substituição de atributo para ${actionLabel}.`;
  } else if (requestedReplacements.size === 1) {
    effectiveAttributeName = Array.from(requestedReplacements)[0];
  } else if (request.targetAttribute) {
    effectiveAttributeName = request.targetAttribute;
  }

  // 5. Determine applicable skill and Ganho (+1D)
  let applicableSkill: string | undefined;
  let skillBonusDice = 0;

  const hasLuta = (currentForm.skills || []).includes('luta');
  const hasMistica = (currentForm.skills || []).includes('mistica');
  const hasMagia = (currentForm.advantages || []).some((adv) => adv.split('::')[0] === 'magia');
  const hasCombatMagicBonus = deduplicatedBonuses.some(
    (b) => b.sourceCatalogId === 'raio_mistico' || b.sourceCatalogId === 'barreira_mistica' || b.sourceCatalogId === 'bola_de_fogo'
  );

  if (request.actionType === 'attack' || request.actionType === 'defense') {
    if (hasLuta) {
      applicableSkill = 'luta';
      skillBonusDice = 1;
    } else if (hasMistica && (hasMagia || hasCombatMagicBonus)) {
      applicableSkill = 'mistica';
      skillBonusDice = 1;
    }
  } else if (request.actionType === 'general') {
    if (request.selectedSkill && (currentForm.skills || []).includes(request.selectedSkill)) {
      applicableSkill = request.selectedSkill;
      skillBonusDice = 1;
    }
  }

  // 6. Base attribute value
  let baseAttributeValue = currentForm[effectiveAttributeName] || 0;
  if (effectiveAttributeName === 'poder' && currentForm.wildShapeAdvantages?.includes('Forte')) {
    baseAttributeValue += 1;
  } else if (effectiveAttributeName === 'resistencia' && currentForm.wildShapeAdvantages?.includes('Vigoroso')) {
    baseAttributeValue += 2;
  }

  let attrBonusValue = 0;
  let flatBonusTotal = 0;
  let automaticCriticals = 0;
  let totalExtraDice = (request.manualBonusDice || 0) + skillBonusDice;
  let totalCritMod = 0;

  const appliedBonuses: ResolvedAppliedBonus[] = [];
  const consumedBonusIds: string[] = [];
  const preservedBonusIds: string[] = [];
  const assistedNotes: string[] = [];

  // Passive archetype skill effects (e.g. +1 in Habilidade)
  if (effectiveAttributeName === 'habilidade' && passiveArchetypeSkillEffects.length > 0) {
    for (const effect of passiveArchetypeSkillEffects) {
      attrBonusValue += effect.value;
      appliedBonuses.push({
        name: effect.name,
        desc: `+${effect.value} no Atributo (passivo do arquétipo)`,
        automationLevel: 'automatic',
      });
    }
  }

  // Add combat skill notice to applied bonuses if in combat
  if (request.actionType === 'attack' || request.actionType === 'defense') {
    const skillDesc = skillBonusDice > 0 ? `+1D por perícia (${applicableSkill === 'luta' ? 'Luta' : 'Mística'})` : 'Rolagem padrão';
    appliedBonuses.push({
      name: request.label || (request.actionType === 'attack' ? 'Ataque' : 'Defesa'),
      desc: skillDesc,
      automationLevel: 'automatic',
    });
  }

  // Wildshape Ágil grants +1D
  if (currentForm.wildShapeAdvantages?.includes('Ágil')) {
    totalExtraDice += 1;
    appliedBonuses.push({
      name: 'Ágil (Forma Selvagem)',
      desc: '+1D Ganho',
      automationLevel: 'automatic',
    });
  }

  // Manual dice adjustment
  if (typeof request.manualDiceCount === 'number') {
    appliedBonuses.push({
      name: `Dados (${request.manualDiceCount}D)`,
      desc: `Rolagem com ${request.manualDiceCount} dado(s)`,
      automationLevel: 'assisted',
    });
  } else if (typeof request.manualBonusDice === 'number' && request.manualBonusDice !== 0) {
    appliedBonuses.push({
      name: request.manualBonusDice > 0 ? 'Ganho (Mestre/Mesa)' : 'Perda (Mestre/Mesa)',
      desc: `${request.manualBonusDice > 0 ? `+${request.manualBonusDice}` : request.manualBonusDice}D na rolagem`,
      automationLevel: 'assisted',
    });
  }

  // 7. Accumulate active bonuses
  for (const bonus of deduplicatedBonuses) {
    const variant = getActiveBonusVariant(bonus);
    const effectiveBonusType = variant?.bonusType || bonus.bonusType || 'none';
    const effectiveValue = typeof variant?.value === 'number' ? variant.value : bonus.value || 0;
    const effectiveCritMod = typeof variant?.critThresholdMod === 'number' ? variant.critThresholdMod : bonus.critThresholdMod || 0;
    const effectiveAutoCrit = typeof variant?.autoCrit === 'boolean' ? variant.autoCrit : !!bonus.autoCrit;
    const effectiveAutoCritsCount = typeof variant?.automaticCriticals === 'number' ? variant.automaticCriticals : bonus.automaticCriticals || 0;
    const effectiveExtraDice = typeof variant?.extraDice === 'number' ? variant.extraDice : bonus.extraDice || 0;
    const bonusAttr = variant?.attribute || bonus.attribute || 'any';
    const actionScope = variant?.actionScope || bonus.actionScope;

    // Check condition key
    const conditionKey = variant?.conditionKey || bonus.conditionKey;
    if (conditionKey && request.declaredConditions) {
      const conditionMet = !!request.declaredConditions[conditionKey];
      if (!conditionMet) {
        continue;
      }
    }

    // Check attribute compatibility
    const isTransferredActionBonus = actionScope && (actionScope === request.actionType || actionScope === 'any');
    if (!isTransferredActionBonus && bonusAttr !== 'any' && bonusAttr !== effectiveAttributeName) {
      continue;
    }

    // Maestria check: if bonus is Maestria, verify that test uses the configured skill
    const requiredSkill = variant?.requiredSkill || bonus.requiredSkill;
    if (requiredSkill && applicableSkill !== requiredSkill) {
      continue;
    }

    let desc = '';
    if (variant?.replacementAttribute || bonus.replacementAttribute) {
      const rep = variant?.replacementAttribute || bonus.replacementAttribute;
      const repLabel = rep === 'poder' ? 'Poder' : rep === 'habilidade' ? 'Habilidade' : 'Resistência';
      desc = `Usa ${repLabel} no lugar do atributo padrão`;
    }

    if (effectiveBonusType === 'attr_mod') {
      attrBonusValue += effectiveValue;
      desc += desc ? ` | +${effectiveValue} no Atributo` : `+${effectiveValue} no Atributo`;
    } else if (effectiveBonusType === 'flat') {
      flatBonusTotal += effectiveValue;
      desc += desc ? ` | +${effectiveValue} Total` : `+${effectiveValue} Total`;
    } else if (effectiveBonusType === 'full_attr') {
      const srcAttr = variant?.attrSource || bonus.attrSource || 'poder';
      const val = currentForm[srcAttr] || 0;
      flatBonusTotal += val;
      desc += desc ? ` | +${val} (${srcAttr})` : `+${val} (${srcAttr})`;
    }

    if (effectiveCritMod) {
      totalCritMod += effectiveCritMod;
      const critVal = Math.max(4, 6 + effectiveCritMod);
      desc += desc ? ` | Crítico ${critVal}+` : `Crítico ${critVal}+`;
    }

    if (effectiveAutoCrit || effectiveAutoCritsCount > 0) {
      const count = Math.max(effectiveAutoCrit ? 1 : 0, effectiveAutoCritsCount);
      automaticCriticals += count;
      desc += desc ? ` | ${count} Crítico${count > 1 ? 's' : ''} Auto` : `${count} Crítico${count > 1 ? 's' : ''} Auto`;
    }

    if (effectiveExtraDice) {
      totalExtraDice += effectiveExtraDice;
      desc += desc ? ` | ${effectiveExtraDice > 0 ? '+' : ''}${effectiveExtraDice}D` : `${effectiveExtraDice > 0 ? '+' : ''}${effectiveExtraDice}D`;
    }

    if (bonus.tableNotes && bonus.tableNotes.length > 0) {
      assistedNotes.push(...bonus.tableNotes);
    }
    if (variant?.note) {
      assistedNotes.push(variant.note);
    }

    const costRes = variant?.costResource || bonus.costResource;
    const costVal = typeof variant?.costValue === 'number' ? variant.costValue : bonus.costValue;
    let costStr = '';
    if (bonus.duration === 'instant' && costRes && costRes !== 'none' && costVal) {
      costStr = `-${costVal} ${costRes}`;
    } else if (bonus.duration === 'scene') {
      costStr = 'Buff de Cena';
    }

    appliedBonuses.push({
      name: bonus.alias || bonus.name,
      alias: bonus.alias,
      desc: desc || 'Efeito ativo',
      cost: costStr,
      sourceKey: bonus.id,
      automationLevel: variant?.automationLevel || bonus.automationLevel || 'automatic',
    });

    if (bonus.duration === 'scene') {
      preservedBonusIds.push(bonus.id);
    } else {
      consumedBonusIds.push(bonus.id);
    }
  }

  // Apply active kit buffs
  for (const kitBuff of activeKitBuffsList) {
    const mod = kitBuff.mod;
    if (mod.bonusType === 'attr_mod' && (mod.attribute === effectiveAttributeName || mod.attribute === 'any')) {
      attrBonusValue += mod.value;
    } else if (mod.bonusType === 'flat') {
      flatBonusTotal += mod.value;
    }
    if (mod.critThresholdMod) totalCritMod += mod.critThresholdMod;
    if (mod.autoCrit) automaticCriticals += 1;
    if (mod.extraDice) totalExtraDice += mod.extraDice;

    appliedBonuses.push({
      name: kitBuff.power.name,
      desc: 'Poder de Kit Ativo',
      cost: 'Buff de Cena',
      automationLevel: 'automatic',
    });
  }

  // Calculate dice count & crit range
  const clampedExtraDice = Math.max(-2, Math.min(2, totalExtraDice));
  const defaultDiceCount = Math.max(1, Math.min(3, 1 + clampedExtraDice));
  const diceCount = typeof request.manualDiceCount === 'number' ? request.manualDiceCount : defaultDiceCount;
  const critRange = Math.max(4, Math.min(6, (request.manualCritRange || 6) + totalCritMod));
  const totalEffectiveAttribute = Math.max(0, baseAttributeValue + attrBonusValue);

  // 8. Calculate itemized costs and deduplicate by costKey
  const rawCosts: ItemizedCost[] = [];

  // Base action cost (e.g. Mística defense default 1 PM when not using Luta)
  if (request.actionType === 'defense' && !hasLuta && hasMistica && hasMagia) {
    rawCosts.push({
      resource: 'PM',
      value: 1,
      timing: 'instant',
      costKey: 'magical_defense_cost',
      sourceName: 'Defesa com Mística',
    });
  }

  if (request.baseCostPM && request.baseCostPM > 0) {
    rawCosts.push({
      resource: 'PM',
      value: request.baseCostPM,
      timing: 'instant',
      sourceName: request.label || 'Custo base',
    });
  }
  if (request.baseCostPV && request.baseCostPV > 0) {
    rawCosts.push({
      resource: 'PV',
      value: request.baseCostPV,
      timing: 'instant',
      sourceName: request.label || 'Custo base',
    });
  }
  if (request.baseCostPA && request.baseCostPA > 0) {
    rawCosts.push({
      resource: 'PA',
      value: request.baseCostPA,
      timing: 'instant',
      sourceName: request.label || 'Custo base',
    });
  }

  // Instant bonus costs (scene costs are paid on activation, not during roll)
  for (const bonus of deduplicatedBonuses) {
    if (bonus.duration !== 'instant' || bonus.gameplayPattern === 'prepared-magic') continue;
    const variant = getActiveBonusVariant(bonus);
    const costResource = variant?.costResource || bonus.costResource || 'none';
    const costValue = typeof variant?.costValue === 'number' ? variant.costValue : bonus.costValue || 0;
    const costTiming = variant?.costTiming || bonus.costTiming || 'instant';
    const costKey = variant?.costKey || bonus.costKey;

    if (costResource !== 'none' && costValue > 0) {
      rawCosts.push({
        resource: costResource,
        value: costValue,
        timing: costTiming,
        costKey,
        sourceName: bonus.alias || bonus.name,
      });
    }
  }

  // Deduplicate costs that share the same non-empty costKey
  const itemizedCosts: ItemizedCost[] = [];
  const costByKey = new Map<string, ItemizedCost>();

  for (const cost of rawCosts) {
    if (cost.costKey) {
      const existing = costByKey.get(cost.costKey);
      if (!existing || cost.value > existing.value) {
        costByKey.set(cost.costKey, cost);
      }
    } else {
      itemizedCosts.push(cost);
    }
  }
  costByKey.forEach((cost) => itemizedCosts.push(cost));

  const totalCostPV = itemizedCosts.filter((c) => c.resource === 'PV').reduce((sum, c) => sum + c.value, 0);
  const totalCostPM = itemizedCosts.filter((c) => c.resource === 'PM').reduce((sum, c) => sum + c.value, 0);
  const totalCostPA = itemizedCosts.filter((c) => c.resource === 'PA').reduce((sum, c) => sum + c.value, 0);

  const availablePM = currentPM + temporaryPM;
  const canAffordPV = totalCostPV <= currentPV;
  const canAffordPM = totalCostPM <= availablePM;
  const canAffordPA = totalCostPA <= currentPA;

  const unmetResources: string[] = [];
  if (!canAffordPV) unmetResources.push(`PV (${totalCostPV} necessários, ${currentPV} disponíveis)`);
  if (!canAffordPM) unmetResources.push(`PM (${totalCostPM} necessários, ${availablePM} disponíveis)`);
  if (!canAffordPA) unmetResources.push(`PA (${totalCostPA} necessários, ${currentPA} disponíveis)`);

  const canAfford = canAffordPV && canAffordPM && canAffordPA && !hasConflicts;

  return {
    actionType: request.actionType,
    effectiveAttributeName,
    baseAttributeValue,
    attrBonusValue,
    totalEffectiveAttribute,
    flatBonusTotal,
    applicableSkill,
    skillBonusDice,
    extraDice: totalExtraDice,
    diceCount,
    critRange,
    automaticCriticals,
    itemizedCosts,
    totalCostPV,
    totalCostPM,
    totalCostPA,
    canAfford,
    unmetResources,
    hasConflicts,
    conflictMessage,
    appliedBonuses,
    consumedBonusIds,
    preservedBonusIds,
    assistedNotes,
  };
}
