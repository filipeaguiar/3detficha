import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from '../constants/advantagesData';
import type { CharacterForm, CharacterSheet, KitPower, RollBonus } from '../types/character';

export function normalizeRollBonus(raw: any): RollBonus {
  const name = raw.name || raw.label || 'Bônus';
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
    extraDice: typeof raw.extraDice === 'number' ? raw.extraDice : 0,
    costValue: typeof raw.costValue === 'number' ? raw.costValue : 1,
    costResource: raw.costResource || 'none',
  };
}

export function createDefaultSheet(): CharacterSheet {
  return {
    id: 'char_default',
    characterName: 'Dahllan Druida',
    selectedKitId: 'druida',
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

export function loadInitialSheets(): { sheets: CharacterSheet[]; activeId: string } {
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
            rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus)
          }))
        }));
        const activeId = savedActiveId || normalized[0].id;
        return { sheets: normalized, activeId };
      }
    }

    const legacySaved = localStorage.getItem('3det_ficha');
    if (legacySaved) {
      const parsed = JSON.parse(legacySaved);
      const migratedSheet: CharacterSheet = {
        id: 'char_' + Date.now(),
        characterName: parsed.characterName || 'Personagem',
        selectedKitId: parsed.selectedKitId || 'druida',
        accentColor: parsed.accentColor || '#ff0066',
        soundOn: parsed.soundOn ?? true,
        forms: Array.isArray(parsed.forms) && parsed.forms.length > 0 ? parsed.forms.map((f: any) => ({
          ...f,
          rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus)
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
            wildShapeAdvantages: []
          }
        ]
      };
      return { sheets: [migratedSheet], activeId: migratedSheet.id };
    }
  } catch (e) {
    console.error('Error loading characters from storage:', e);
  }

  return { sheets: [defaultSheet], activeId: defaultSheet.id };
}

export function getBonusSubtitle(bonus: RollBonus): string {
  const parts: string[] = [];

  if (bonus.bonusType === 'attr_mod' && bonus.value) {
    const attrLetter = bonus.attribute === 'poder' ? 'P' : bonus.attribute === 'habilidade' ? 'H' : bonus.attribute === 'resistencia' ? 'R' : 'Atributo';
    parts.push(`+${bonus.value} ${attrLetter}`);
  } else if (bonus.bonusType === 'flat' && bonus.value) {
    parts.push(`+${bonus.value} Fixo`);
  } else if (bonus.bonusType === 'full_attr') {
    const srcLetter = bonus.attrSource === 'poder' ? 'P' : bonus.attrSource === 'habilidade' ? 'H' : 'R';
    parts.push(`+${srcLetter}`);
  }

  if (bonus.critThresholdMod && bonus.critThresholdMod < 0) parts.push('Crítico 5+');
  if (bonus.autoCrit) parts.push('Crítico Auto');
  if (bonus.extraDice && bonus.extraDice > 0) parts.push(`+${bonus.extraDice}D Ganho`);
  else if (bonus.extraDice && bonus.extraDice < 0) parts.push(`${bonus.extraDice}D Perda`);
  if (bonus.duration === 'scene') parts.push('Cena');

  let text = parts.join(' • ');
  if (!text && bonus.name) text = bonus.name;

  if (bonus.costResource && bonus.costResource !== 'none' && bonus.costValue) {
    text += ` [-${bonus.costValue} ${bonus.costResource}]`;
  }
  return text || 'Sem bônus direto';
}

export function getKitPowerModifier(power: KitPower) {
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

export function calculatePoints(currentForm: CharacterForm): number {
  let total = currentForm.poder + currentForm.habilidade + currentForm.resistencia;

  if (currentForm.skills) total += currentForm.skills.length;

  if (currentForm.advantages) {
    currentForm.advantages.forEach((advId: string) => {
      const adv = ADVANTAGES_CATALOG.find(a => a.id === advId);
      if (adv) {
        const match = adv.cost.match(/\d+/);
        if (match) total += parseInt(match[0], 10);
      }
    });
  }

  if (currentForm.disadvantages) {
    currentForm.disadvantages.forEach((disId: string) => {
      const dis = DISADVANTAGES_CATALOG.find(d => d.id === disId);
      if (dis) {
        const match = dis.cost.match(/-\d+/);
        if (match) total += parseInt(match[0], 10);
        else {
          const matchPos = dis.cost.match(/\d+/);
          if (matchPos) total -= parseInt(matchPos[0], 10);
        }
      }
    });
  }

  return total;
}
