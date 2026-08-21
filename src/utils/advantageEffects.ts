import type { CharacterForm, RollBonus } from '../types/character';

export function getDerivedAdvantageEffects(currentForm: CharacterForm): RollBonus[] {
  const effects: RollBonus[] = [];
  const advantages = currentForm.advantages || [];

  for (const advId of advantages) {
    const [baseId, variantKey] = advId.split('::');

    if (baseId === 'ataque_especial') {
      const variant = variantKey || 'potente';
      if (variant === 'potente') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Potente)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'attr_mod',
          value: 2,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_potente',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'potente_ii') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Potente II)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'attr_mod',
          value: 4,
          duration: 'instant',
          costValue: 2,
          costResource: 'PM',
          effectKey: 'ataque_especial_potente_ii',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'perigoso') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Perigoso)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          critThresholdMod: -1,
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_perigoso',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'preciso') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Preciso)',
          attribute: 'habilidade',
          actionScope: 'attack',
          replacementAttribute: 'habilidade',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_preciso',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'choque') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Choque)',
          attribute: 'resistencia',
          actionScope: 'attack',
          replacementAttribute: 'resistencia',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_choque',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'area') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Área)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_area',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'assisted',
        });
      } else if (variant === 'distante') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Distante)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_distante',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'assisted',
        });
      } else if (variant === 'amplo') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Amplo)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_amplo',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'assisted',
        });
      } else if (variant === 'penetrante') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Penetrante)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'ataque_especial_penetrante',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'assisted',
        });
      } else if (variant === 'titanico') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Ataque Especial (Titânico)',
          attribute: 'poder',
          actionScope: 'attack',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          autoCrit: true,
          costValue: 3,
          costResource: 'PM',
          effectKey: 'ataque_especial_titanico',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      }
    } else if (baseId === 'defesa_especial') {
      const variant = variantKey || 'tenaz';
      if (variant === 'tenaz') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Tenaz)',
          attribute: 'resistencia',
          actionScope: 'defense',
          bonusType: 'attr_mod',
          value: 2,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'defesa_especial_tenaz',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'tenaz_ii') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Tenaz II)',
          attribute: 'resistencia',
          actionScope: 'defense',
          bonusType: 'attr_mod',
          value: 4,
          duration: 'instant',
          costValue: 2,
          costResource: 'PM',
          effectKey: 'defesa_especial_tenaz_ii',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'blindada') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Blindada)',
          attribute: 'resistencia',
          actionScope: 'defense',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          critThresholdMod: -1,
          costValue: 1,
          costResource: 'PM',
          effectKey: 'defesa_especial_blindada',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'esquiva') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Esquiva)',
          attribute: 'habilidade',
          actionScope: 'defense',
          replacementAttribute: 'habilidade',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'defesa_especial_esquiva',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'bloqueio') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Bloqueio)',
          attribute: 'poder',
          actionScope: 'defense',
          replacementAttribute: 'poder',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'defesa_especial_bloqueio',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      } else if (variant === 'cobertura') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Cobertura)',
          attribute: 'resistencia',
          actionScope: 'defense',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 1,
          costResource: 'PM',
          effectKey: 'defesa_especial_cobertura',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'assisted',
        });
      } else if (variant === 'reflexao') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Reflexão)',
          attribute: 'resistencia',
          actionScope: 'defense',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          costValue: 2,
          costResource: 'PM',
          effectKey: 'defesa_especial_reflexao',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'assisted',
        });
      } else if (variant === 'titanica') {
        effects.push({
          id: `derived_adv_${advId}`,
          name: 'Defesa Especial (Titânica)',
          attribute: 'resistencia',
          actionScope: 'defense',
          bonusType: 'none',
          value: 0,
          duration: 'instant',
          autoCrit: true,
          costValue: 3,
          costResource: 'PM',
          effectKey: 'defesa_especial_titanica',
          isDerivedOfficial: true,
          originAdvantageId: advId,
          automationLevel: 'automatic',
        });
      }
    } else if (baseId === 'maestria') {
      const skill = variantKey || 'luta';
      effects.push({
        id: `derived_adv_${advId}`,
        name: `Maestria (${skill.charAt(0).toUpperCase() + skill.slice(1)})`,
        attribute: 'any',
        actionScope: 'general',
        bonusType: 'none',
        value: 0,
        duration: 'instant',
        critThresholdMod: -1,
        requiredSkill: skill,
        effectKey: `maestria_${skill}`,
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'automatic',
        tableNotes: [`Crítico 5+ em testes da perícia ${skill.charAt(0).toUpperCase() + skill.slice(1)}.`],
      });
    } else if (baseId === 'agil') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Ágil',
        attribute: 'habilidade',
        actionScope: 'general',
        conditionKey: 'agilidade',
        bonusType: 'attr_mod',
        value: 2,
        duration: 'instant',
        effectKey: 'adv_agil',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Recebe H+2 em testes envolvendo agilidade, coordenação ou equilíbrio.'],
      });
    } else if (baseId === 'carismatico') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Carismático',
        attribute: 'poder',
        actionScope: 'general',
        conditionKey: 'social',
        bonusType: 'attr_mod',
        value: 2,
        duration: 'instant',
        effectKey: 'adv_carismatico',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Recebe P+2 em interações sociais.'],
      });
    } else if (baseId === 'forte') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Forte',
        attribute: 'poder',
        actionScope: 'general',
        conditionKey: 'esforco_fisico',
        bonusType: 'attr_mod',
        value: 2,
        duration: 'instant',
        effectKey: 'adv_forte',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Recebe P+2 em testes de esforço físico.'],
      });
    } else if (baseId === 'genio') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Gênio',
        attribute: 'habilidade',
        actionScope: 'general',
        conditionKey: 'inteligencia',
        bonusType: 'attr_mod',
        value: 2,
        duration: 'instant',
        effectKey: 'adv_genio',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Recebe H+2 para problemas com inteligência, raciocínio e conhecimento.'],
      });
    } else if (baseId === 'resoluto') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Resoluto',
        attribute: 'resistencia',
        actionScope: 'general',
        conditionKey: 'vontade',
        bonusType: 'attr_mod',
        value: 2,
        duration: 'instant',
        effectKey: 'adv_resoluto',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Recebe R+2 em testes envolvendo força de vontade e resolução mental.'],
      });
    } else if (baseId === 'vigoroso') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Vigoroso',
        attribute: 'resistencia',
        actionScope: 'general',
        conditionKey: 'vigor',
        bonusType: 'attr_mod',
        value: 2,
        duration: 'instant',
        effectKey: 'adv_vigoroso',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Recebe R+2 em testes de fadiga, venenos, doenças e morte.'],
      });
    } else if (baseId === 'arena') {
      const terrain = variantKey ? ` (${variantKey.charAt(0).toUpperCase() + variantKey.slice(1)})` : '';
      effects.push({
        id: `derived_adv_${advId}`,
        name: `Arena${terrain}`,
        attribute: 'any',
        actionScope: 'general',
        conditionKey: 'arena',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        costValue: 2,
        costResource: 'PM',
        effectKey: `adv_arena_${variantKey || 'base'}`,
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Ganho (+1D) ao realizar testes no terreno escolhido.'],
      });
    } else if (baseId === 'inimigo') {
      const isMaior = variantKey === 'maior';
      effects.push({
        id: `derived_adv_${advId}`,
        name: isMaior ? 'Inimigo Maior' : 'Inimigo',
        attribute: 'any',
        actionScope: 'general',
        conditionKey: 'inimigo',
        bonusType: 'none',
        value: 0,
        critThresholdMod: -1,
        extraDice: isMaior ? 1 : 0,
        duration: 'instant',
        costValue: 1,
        costResource: 'PM',
        effectKey: `adv_inimigo_${variantKey || 'comum'}`,
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Crítico 5+' + (isMaior ? ' e Ganho (+1D)' : '') + ' ao enfrentar a criatura escolhida.'],
      });
    } else if (baseId === 'devoto') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Devoto',
        attribute: 'any',
        actionScope: 'general',
        conditionKey: 'devoto',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        effectKey: 'adv_devoto',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Ganho ao defender sua causa, crença ou filosofia.'],
      });
    } else if (baseId === 'famoso') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Famoso',
        attribute: 'poder',
        actionScope: 'general',
        conditionKey: 'social',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        effectKey: 'adv_famoso',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Ganho em testes sociais com NPCs que o conheçam.'],
      });
    } else if (baseId === 'inofensivo') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Inofensivo',
        attribute: 'habilidade',
        actionScope: 'general',
        conditionKey: 'iniciativa_surpresa',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        effectKey: 'adv_inofensivo',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Ganho em testes de iniciativa e surpresa.'],
      });
    } else if (baseId === 'patrono') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Patrono',
        attribute: 'any',
        actionScope: 'general',
        conditionKey: 'compras_servico',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        effectKey: 'adv_patrono',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Ganho em compras e tarefas a serviço da instituição.'],
      });
    } else if (baseId === 'torcida') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Torcida',
        attribute: 'any',
        actionScope: 'general',
        conditionKey: 'torcida',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        effectKey: 'adv_torcida',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Ganho motivacional sempre que acompanhado ou ovacionado.'],
      });
    } else if (baseId === 'ajudante') {
      effects.push({
        id: `derived_adv_${advId}`,
        name: 'Ajudante',
        attribute: 'any',
        actionScope: 'general',
        bonusType: 'none',
        value: 0,
        extraDice: 1,
        duration: 'instant',
        costValue: 2,
        costResource: 'PM',
        effectKey: 'adv_ajudante',
        isDerivedOfficial: true,
        originAdvantageId: advId,
        automationLevel: 'assisted',
        tableNotes: ['Concede Ganho (+1D) em testes com a ajuda do aliado.'],
      });
    }
  }

  return effects;
}
