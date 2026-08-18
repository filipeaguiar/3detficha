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
  extraDice?: number;
  costValue?: number;
  costResource?: 'none' | 'PV' | 'PM' | 'PA';
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
  rollBonuses: RollBonus[];
  wildShapeAdvantages?: string[];
  advantages?: string[];
  disadvantages?: string[];
  skills?: string[];
};

export type CharacterLinkRelation = 'base' | 'form' | 'alternate';

export type CharacterSheet = {
  id: string;
  characterName: string;
  selectedKitId: string;
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
};

export type CharacterKit = {
  id: string;
  name: string;
  exigencias: string;
  nucleos: string;
  powers: KitPower[];
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
