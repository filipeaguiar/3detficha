export type PersistentAssistedConfig = {
  kind: 'repeatable-trigger' | 'stock';
  initialCostValue?: number;
  initialCostResource?: 'none' | 'PV' | 'PM' | 'PA';
  triggerCostValue?: number;
  triggerCostResource?: 'none' | 'PV' | 'PM' | 'PA';
  stockCount?: number;
  stockMin?: number;
  stockMaxAttribute?: 'poder' | 'habilidade' | 'resistencia';
  stockMaxMultiplierAttribute?: 'poder' | 'habilidade' | 'resistencia';
  costPerStock?: number;
  consumeAllOnTrigger?: boolean;
  statusLabel?: string;
  triggerLabel?: string;
  note?: string;
};

export type TemporaryPackageConfig = {
  kind: 'temporary-package';
  statusLabel?: string;
  maintenanceCostValue?: number;
  maintenanceCostResource?: 'none' | 'PV' | 'PM' | 'PA';
  choiceBudget?: number;
  maxChoices?: number;
  note?: string;
};

export type ImmediateActionConfig = {
  kind: 'recover_pm' | 'grant_temporary_pm';
  rollFormula: '1d6' | '1d6+h';
  resultLabel?: string;
  capAttribute?: 'poder' | 'habilidade' | 'resistencia';
};

export type RollBonusVariant = {
  id: string;
  label: string;
  costValue?: number;
  costResource?: 'none' | 'PV' | 'PM' | 'PA';
  value?: number;
  bonusType?: 'attr_mod' | 'flat' | 'full_attr' | 'none';
  extraDice?: number;
  critThresholdMod?: number;
  autoCrit?: boolean;
  automaticCriticals?: number;
  note?: string;
  immediateAction?: ImmediateActionConfig;
  persistentAssisted?: PersistentAssistedConfig;
  temporaryPackage?: TemporaryPackageConfig;
};

export type StrikeSelection = {
  acquisitionId: string;
  strikeIds: string[];
};

export type RollBonus = {
  id: string;
  name: string;
  alias?: string;
  attribute: 'any' | 'poder' | 'habilidade' | 'resistencia';
  bonusType: 'attr_mod' | 'flat' | 'full_attr' | 'none';
  value: number;
  duration: 'instant' | 'scene';
  attrSource?: 'poder' | 'habilidade' | 'resistencia';
  critThresholdMod?: number;
  autoCrit?: boolean;
  automaticCriticals?: number;
  extraDice?: number;
  costValue?: number;
  costResource?: 'none' | 'PV' | 'PM' | 'PA';
  xpCost?: number;
  xpCategory?: 'trick' | 'common' | 'legendary' | 'generic';
  fundedBySourceIds?: string[];
  sourceCatalogId?: string;
  gameplayPattern?: 'fixed-modifier' | 'cycling-variant' | 'immediate-action' | 'persistent-assisted' | 'temporary-package' | 'narrative';
  tableNotes?: string[];
  variants?: RollBonusVariant[];
  selectedVariantId?: string;
  variantSelectionMode?: 'cycle' | 'table-declared';
  immediateAction?: ImmediateActionConfig;
  persistentAssisted?: PersistentAssistedConfig;
  temporaryPackage?: TemporaryPackageConfig;
  assistedState?: {
    active?: boolean;
    remainingUses?: number;
    stockCount?: number;
    configuredStock?: number;
    packageChoices?: string[];
  };
};

export type CharacterVariantSelection = {
  key: string;
  label: string;
  value?: string;
  cost?: string;
};

export type XPCreditRule = {
  sourceId: string;
  label: string;
  xpPerRank: number;
  allowedCategories: Array<'trick' | 'common' | 'legendary' | 'generic'>;
};

export type CharacterForm = {
  id: string;
  name: string;
  avatarUrl?: string;
  poder: number;
  habilidade: number;
  resistencia: number;
  maisVida: number;
  maisMana: number;
  maisAcao?: number;
  rollBonuses: RollBonus[];
  wildShapeAdvantages?: string[];
  advantages?: string[];
  disadvantages?: string[];
  skills?: string[];
  archetypeAdvantages?: string[];
  archetypeDisadvantages?: string[];
  archetypeSkills?: string[];
  archetypeSelections?: Record<string, string[]>;
  kitSelections?: Record<string, string[]>;
  variantSelections?: Record<string, CharacterVariantSelection[]>;
  strikeSelections?: StrikeSelection[];
};

export type CharacterLinkRelation = 'base' | 'form' | 'alternate';

export type ArchetypeEffect = {
  id: string;
  name: string;
  desc: string;
  attribute?: 'any' | 'poder' | 'habilidade' | 'resistencia';
  bonusType?: 'attr_mod' | 'flat' | 'full_attr' | 'none';
  value?: number;
  duration?: 'instant' | 'scene';
  critThresholdMod?: number;
  autoCrit?: boolean;
  extraDice?: number;
  costValue?: number;
  costResource?: 'none' | 'PV' | 'PM' | 'PA';
};

export type ArchetypeChoiceOption = {
  id: string;
  label: string;
  grantsAdvantages?: string[];
  grantsDisadvantages?: string[];
  grantsSkills?: string[];
  grantsEffects?: ArchetypeEffect[];
};

export type ArchetypeChoiceGroup = {
  id: string;
  label: string;
  kind: 'advantage' | 'disadvantage' | 'skill' | 'variant' | 'effect';
  min: number;
  max: number;
  options: ArchetypeChoiceOption[];
};

export type CharacterArchetype = {
  id: string;
  name: string;
  cost: number;
  group: string;
  desc: string;
  traits: string[];
  grantedAdvantages?: string[];
  grantedDisadvantages?: string[];
  grantedSkills?: string[];
  grantedEffects?: ArchetypeEffect[];
  choiceGroups?: ArchetypeChoiceGroup[];
  unsupportedNotes?: string[];
  notes?: string[];
};

export type CharacterSheet = {
  id: string;
  characterName: string;
  selectedKitId: string;
  selectedArchetypeId?: string;
  accentColor: string;
  soundOn: boolean;
  forms: CharacterForm[];
  linkGroupId?: string;
  relationType?: CharacterLinkRelation;
  relationLabel?: string;
};

export type CharacterLinkGroup = {
  id: string;
  primarySheetId: string;
  sheetIds: string[];
};

export type KitEffect = {
  id: string;
  name: string;
  desc: string;
  attribute?: 'any' | 'poder' | 'habilidade' | 'resistencia';
  bonusType?: 'attr_mod' | 'flat' | 'full_attr' | 'none';
  value?: number;
  duration?: 'instant' | 'scene';
  critThresholdMod?: number;
  autoCrit?: boolean;
  extraDice?: number;
  costValue?: number;
  costResource?: 'none' | 'PV' | 'PM' | 'PA';
};

export type KitChoiceOption = {
  id: string;
  label: string;
  grantsAdvantages?: string[];
  grantsDisadvantages?: string[];
  grantsSkills?: string[];
  grantsEffects?: KitEffect[];
};

export type KitChoiceGroup = {
  id: string;
  label: string;
  kind: 'advantage' | 'disadvantage' | 'skill' | 'variant' | 'effect';
  min: number;
  max: number;
  options: KitChoiceOption[];
};

export type KitPower = {
  id: string;
  name: string;
  desc: string;
  type: 'per_scene' | 'per_session' | 'passive' | 'transformation' | 'buff';
  maxUsesPerScene?: number;
  costPM?: number;
  repeatCostPM?: number;
  bonusType?: 'attr_mod' | 'flat' | 'none';
  attribute?: 'any' | 'poder' | 'habilidade' | 'resistencia';
  value?: number;
  extraDice?: number;
  critThresholdMod?: number;
  autoCrit?: boolean;
  structuredEffect?: KitEffect;
  unsupportedNotes?: string[];
};

export type CharacterKit = {
  id: string;
  name: string;
  exigencias: string;
  nucleos: string;
  powers: KitPower[];
  grantedAdvantages?: string[];
  grantedDisadvantages?: string[];
  grantedSkills?: string[];
  grantedEffects?: KitEffect[];
  choiceGroups?: KitChoiceGroup[];
  unsupportedNotes?: string[];
  notes?: string[];
};

export type RollResultBonus = {
  name: string;
  alias?: string;
  desc: string;
  cost?: string;
};

export type RollResult = {
  rolls: number[];
  diceSum: number;
  criticals: number;
  isCriticalFail: boolean;
  finalTotal: number;
  usedAttributeName: string;
  baseAttributeValue: number;
  attrBonusValue: number;
  totalEffectiveAttribute: number;
  flatBonusTotal: number;
  critRangeUsed: number;
  appliedBonuses: RollResultBonus[];
};
