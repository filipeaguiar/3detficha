import { ALL_KITS } from '../../kitsData';
import type { CharacterKit } from '../../types/character';

const STRUCTURED_KIT_OVERRIDES: Partial<Record<string, Partial<CharacterKit>>> = {
  druida: {
    notes: ['Forma Selvagem concede escolhas próprias por forma transformada.'],
    choiceGroups: [
      {
        id: 'druida_forma_selvagem',
        label: 'Forma Selvagem',
        kind: 'advantage',
        min: 2,
        max: 2,
        options: [
          { id: 'agil', label: 'Ágil' },
          { id: 'forte', label: 'Forte' },
          { id: 'vigoroso', label: 'Vigoroso' },
          { id: 'resistente', label: 'Resistente' }
        ]
      }
    ]
  },
  barbaro: {
    notes: ['Frenesi de Combate é buff automável no motor atual.'],
  },
  cavaleiro: {
    unsupportedNotes: ['Inspirar aliado depende de alvo externo e permanece aproximação/manual no fluxo atual.'],
  },
  cientista: {
    unsupportedNotes: ['Pesquisa depende de revelação contextual pelo narrador.'],
  },
  clerigo: {
    unsupportedNotes: ['Dom Divino e Poder Concedido dependem de escolha contextual e subsistema de vantagens temporárias.'],
  },
  alquimista: {
    unsupportedNotes: ['Diagrama e Diagrama Pessoal seguem parcialmente bounded/manual por dependerem de escolha contextual da técnica/vantagem afetada.'],
  },
  card_gamer: {
    unsupportedNotes: ['Carta na Manga e Escolha uma Carta dependem de resolução contextual/ajudante fora do motor base.'],
  }
};

export const KITS_CATALOG: CharacterKit[] = (ALL_KITS as CharacterKit[]).map((kit) => ({
  ...kit,
  ...(STRUCTURED_KIT_OVERRIDES[kit.id] || {}),
  powers: (kit.powers || []).map((power) => ({
    ...power,
    structuredEffect: power.structuredEffect || (power.bonusType || power.value || power.extraDice || power.critThresholdMod || power.autoCrit
      ? {
          id: `kitfx_${power.id}`,
          name: power.name,
          desc: power.desc,
          attribute: power.attribute || 'any',
          bonusType: power.bonusType || 'none',
          value: power.value || 0,
          duration: power.type === 'buff' || power.type === 'per_scene' ? 'scene' : 'instant',
          critThresholdMod: power.critThresholdMod || 0,
          autoCrit: !!power.autoCrit,
          extraDice: power.extraDice || 0,
          costValue: power.costPM || 0,
          costResource: power.costPM ? 'PM' : 'none',
        }
      : undefined)
  }))
}));
