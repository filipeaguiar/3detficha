import { resolveActionPlan } from '../utils/actionResolver';
import { getDerivedAdvantageEffects } from '../utils/advantageEffects';
import { auditCatalogCoverage, validateRequirements } from '../utils/ruleMatrix';
import { createTechniqueBonusFromCatalog } from '../utils/character';
import { ALL_TECHNIQUES } from '../constants/app/techniques';
import type { CharacterForm, RollBonus } from '../types/character';

function createMockForm(overrides: Partial<CharacterForm> = {}): CharacterForm {
  return {
    id: 'test_form',
    name: 'Forma Teste',
    poder: 2,
    habilidade: 3,
    resistencia: 2,
    maisVida: 0,
    maisMana: 0,
    maisAcao: 0,
    skills: [],
    advantages: [],
    disadvantages: [],
    rollBonuses: [],
    archetypeSelections: {},
    kitSelections: {},
    ...overrides,
  };
}

export function runActionResolverTests() {
  console.log('--- RUNNING ACTION RESOLVER & GAMEPLAY EFFECTS TEST SUITE ---');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: any) {
    if (condition) {
      passed++;
      console.log(`  [PASS] ${testName}`);
    } else {
      failed++;
      console.error(`  [FAIL] ${testName}`, detail || '');
    }
  }

  // 1. Catalog Coverage Audit
  {
    const audit = auditCatalogCoverage();
    assert(audit.advantagesCount >= 59, `Catalog contains at least 59 advantages (found ${audit.advantagesCount})`);
    assert(audit.techniquesCount >= 51, `Catalog contains at least 51 techniques (found ${audit.techniquesCount})`);
    assert(audit.isComplete, `All catalog items are mapped with zero unmapped items`);
  }

  // 2. Exact Requirements Validation
  {
    const formWithSaber = createMockForm({ skills: ['saber'], advantages: ['maestria::saber'] });
    const gambiarraReq = validateRequirements('gambiarra', formWithSaber);
    assert(gambiarraReq.satisfied, 'Gambiarra requirements satisfied with Maestria (Saber)');

    const formWithoutSaber = createMockForm({ skills: ['luta'], advantages: ['maestria::luta'] });
    const gambiarraFail = validateRequirements('gambiarra', formWithoutSaber);
    assert(!gambiarraFail.satisfied, 'Gambiarra requirements fail when missing Maestria (Saber)');
  }

  // 3. Preciso + Raio Místico
  {
    const form = createMockForm({
      poder: 1,
      habilidade: 4,
      resistencia: 2,
      skills: ['mistica'],
      advantages: ['magia', 'ataque_especial::preciso'],
    });
    const derivedBonuses = getDerivedAdvantageEffects(form);
    const raioCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'raio_mistico')!;
    const raioBonus = createTechniqueBonusFromCatalog(raioCatalog, form);
    const allBonuses = [...derivedBonuses, raioBonus];

    const plan = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        selectedSkill: 'mistica',
        activeBonusIds: new Set([raioBonus.id, ...derivedBonuses.map((b) => b.id)]),
      },
      {
        currentForm: form,
        rollBonuses: allBonuses,
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );

    assert(plan.effectiveAttributeName === 'habilidade', 'Preciso + Raio Místico attacks using Habilidade');
    assert(plan.baseAttributeValue === 4, 'Base attribute value is 4 (Habilidade)');
    assert(plan.diceCount === 2, 'Dice count is 2D (1 base + 1D Ganho from Mística)');
    assert(plan.totalCostPM === 2, 'Raio Místico (1 PM) + Ataque Especial Preciso (1 PM) costs 2 PM');
    assert(plan.canAfford, 'Can afford attack with 10 PM');
    assert(!plan.hasConflicts, 'No conflicts detected');
  }

  // 3b. Raio Místico Flamejante adds +2 to Poder and costs 2 PM
  {
    const form = createMockForm({
      poder: 3,
      habilidade: 2,
      resistencia: 2,
      skills: ['mistica'],
      advantages: ['magia'],
    });
    const raioCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'raio_mistico')!;
    const raioBonus = { ...createTechniqueBonusFromCatalog(raioCatalog, form), selectedVariantId: 'flamejante' };

    const plan = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        selectedSkill: 'mistica',
        activeBonusIds: new Set([raioBonus.id]),
      },
      {
        currentForm: form,
        rollBonuses: [raioBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );

    assert(plan.effectiveAttributeName === 'poder', 'Raio Místico Flamejante attacks using Poder');
    assert(plan.totalEffectiveAttribute === 5, 'Effective attribute is 5 (3 base + 2 Flamejante)');
    assert(plan.diceCount === 2, 'Dice count is 2D (1 base + 1D Ganho from Mística)');
    assert(plan.totalCostPM === 2, 'Raio Místico Flamejante costs 2 PM');
    assert(plan.canAfford, 'Can afford attack with 10 PM');
  }

  // 4. Potente modifier transfer when Preciso replaces attribute
  {
    const form = createMockForm({
      poder: 2,
      habilidade: 3,
      resistencia: 2,
      advantages: ['ataque_especial::preciso', 'ataque_especial::potente'],
    });
    const derivedBonuses = getDerivedAdvantageEffects(form);

    const plan = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        activeBonusIds: new Set(derivedBonuses.map((b) => b.id)),
      },
      {
        currentForm: form,
        rollBonuses: derivedBonuses,
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );

    assert(plan.effectiveAttributeName === 'habilidade', 'Attack uses Habilidade due to Preciso');
    assert(plan.attrBonusValue === 2, 'Potente +2 transfers to attack attribute (Habilidade)');
    assert(plan.totalEffectiveAttribute === 5, 'Total effective attribute is 5 (3 base + 2 Potente)');
  }

  // 5. Barreira Mística + Mística Defense Deduplication
  {
    const form = createMockForm({
      poder: 1,
      habilidade: 2,
      resistencia: 3,
      skills: ['mistica'],
      advantages: ['magia'],
    });
    const barreiraCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'barreira_mistica')!;
    const barreiraBonus = createTechniqueBonusFromCatalog(barreiraCatalog, form);

    const plan = resolveActionPlan(
      {
        actionType: 'defense',
        targetAttribute: 'resistencia',
        selectedSkill: 'mistica',
        activeBonusIds: new Set([barreiraBonus.id]),
      },
      {
        currentForm: form,
        rollBonuses: [barreiraBonus],
        currentPV: 15,
        currentPM: 10,
        currentPA: 1,
      }
    );

    assert(plan.totalCostPM === 1, 'Barreira Mística (1 PM) + Mística Defense (1 PM) deduplicate to 1 PM total');
    assert(plan.diceCount === 2, 'Dice count is 2D (1 base + 1D Ganho from Mística)');
  }

  // 5b. Mística Defense Fallback when 0 PM
  {
    const form = createMockForm({
      poder: 1,
      habilidade: 2,
      resistencia: 3,
      skills: ['mistica'],
      advantages: ['magia'],
    });

    const plan = resolveActionPlan(
      {
        actionType: 'defense',
        targetAttribute: 'resistencia',
        selectedSkill: 'mistica',
      },
      {
        currentForm: form,
        rollBonuses: [],
        currentPV: 15,
        currentPM: 0,
        currentPA: 0,
      }
    );

    assert(plan.totalCostPM === 0, 'Mística Defense with 0 PM costs 0 PM (fallback to basic defense)');
    assert(plan.diceCount === 1, 'Mística Defense with 0 PM falls back to 1D (no skill bonus)');
    assert(plan.canAfford, 'Can afford basic defense with 0 PM');
  }

  // 6. Incompatible Simultaneous Replacements Conflict Detection
  {
    const form = createMockForm({
      poder: 2,
      habilidade: 2,
      resistencia: 2,
      advantages: ['ataque_especial::preciso'],
    });
    const precisoBonus: RollBonus = {
      id: 'adv_preciso',
      name: 'Preciso',
      alias: '',
      attribute: 'poder',
      bonusType: 'none',
      value: 0,
      duration: 'scene',
      attrSource: 'poder',
      actionScope: 'attack',
      replacementAttribute: 'habilidade',
    };
    const choqueBonus: RollBonus = {
      id: 'tech_choque',
      name: 'Choque',
      alias: '',
      attribute: 'poder',
      bonusType: 'none',
      value: 0,
      duration: 'instant',
      attrSource: 'poder',
      actionScope: 'attack',
      replacementAttribute: 'resistencia',
    };

    const plan = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        activeBonusIds: new Set(['adv_preciso', 'tech_choque']),
      },
      {
        currentForm: form,
        rollBonuses: [precisoBonus, choqueBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );

    assert(plan.hasConflicts === true, 'Conflicting attribute replacements flag hasConflicts: true');
    assert(typeof plan.conflictMessage === 'string' && plan.conflictMessage.length > 0, 'Clear conflict message provided');
  }

  // 7. Temporary PM Lifecycle (Absorver Mana)
  {
    const form = createMockForm();
    const bolaFogoCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'bola_de_fogo')!;
    const bolaBonus = createTechniqueBonusFromCatalog(bolaFogoCatalog, form);

    const plan = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        activeBonusIds: new Set([bolaBonus.id]),
      },
      {
        currentForm: form,
        rollBonuses: [bolaBonus],
        currentPV: 10,
        currentPM: 1, // 1 regular PM
        temporaryPM: 2, // 2 temporary PM from Absorver Mana -> total available: 3 PM
        currentPA: 1,
      }
    );

    assert(plan.totalCostPM === 3, 'Bola de Fogo costs 3 PM');
    assert(plan.canAfford === true, 'Can afford 3 PM cost using temporary PM (1 regular + 2 temporary = 3 total)');
  }

  // 8. Resource Unaffordability Validation
  {
    const form = createMockForm();
    const bolaFogoCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'bola_de_fogo')!;
    const bolaBonus = createTechniqueBonusFromCatalog(bolaFogoCatalog, form);

    const plan = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        activeBonusIds: new Set([bolaBonus.id]),
      },
      {
        currentForm: form,
        rollBonuses: [bolaBonus],
        currentPV: 10,
        currentPM: 1, // Only 1 PM, needs 3 PM
        currentPA: 1,
      }
    );

    assert(plan.canAfford === false, 'Cannot afford Bola de Fogo with only 1 PM');
    assert(plan.unmetResources.some((r) => r.includes('PM')), 'Unmet resources lists PM');
  }

  // 9. Queimar o Cosmo Attribute and Scene Resolution
  {
    const queimarCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'queimar_o_cosmo')!;
    const queimarBonus = createTechniqueBonusFromCatalog(queimarCatalog);
    assert(queimarBonus.gameplayPattern === 'cycling-variant', 'Queimar o Cosmo is configured as cycling-variant');
    assert(queimarBonus.duration === 'scene', 'Queimar o Cosmo duration is scene');
    assert(Boolean(queimarBonus.variants && queimarBonus.variants.length === 5), 'Queimar o Cosmo has 5 intensity levels');
  }

  // 10. Percepção Cósmica Filtering
  {
    const percepcaoCatalog = ALL_TECHNIQUES.find((t) => t.catalogId === 'percepcao_cosmica')!;
    const percepcaoBonus = createTechniqueBonusFromCatalog(percepcaoCatalog);
    assert(Boolean(percepcaoCatalog.requirements?.exactAdvantages?.includes('maestria::percepcao')), 'Percepção Cósmica requires Maestria (Percepção)');
    assert(percepcaoBonus.temporaryPackage?.statusLabel === 'Percepção Cósmica', 'Percepção Cósmica has temporary package status');
  }

  // 11. Ataque Especial Área Derived Effect
  {
    const form = createMockForm({
      poder: 3,
      advantages: ['ataque_especial::area', 'ataque_especial::potente'],
    });
    const derived = getDerivedAdvantageEffects(form);
    const areaEffect = derived.find((e) => e.effectKey === 'ataque_especial_area');
    const potenteEffect = derived.find((e) => e.effectKey === 'ataque_especial_potente');
    assert(Boolean(areaEffect), 'Derived effect for Ataque Especial (Área) is generated');
    assert(areaEffect?.costValue === 1, 'Ataque Especial (Área) costs 1 PM');
    assert(areaEffect?.actionScope === 'attack', 'Ataque Especial (Área) is scoped to attack');
    assert(Boolean(potenteEffect), 'Derived effect for Ataque Especial (Potente) is generated alongside Área');
  }

  // 13. Mais Além (Humano Archetype) Ganho in Attack and Defense
  {
    const formWithLuta = createMockForm({
      poder: 2,
      resistencia: 2,
      skills: ['luta'],
    });

    const maisAlemBonus: RollBonus = {
      id: 'arch_humano_mais_alem',
      name: 'Mais Além',
      alias: '',
      attribute: 'any',
      bonusType: 'none',
      value: 0,
      duration: 'instant',
      attrSource: 'poder',
      critThresholdMod: 0,
      autoCrit: false,
      extraDice: 1,
      costValue: 2,
      costResource: 'PM',
      costTiming: 'instant',
      actionScope: 'any',
    };

    // Attack with Luta + Mais Além -> 3D (1 base + 1 Luta + 1 Mais Além)
    const attackPlanWithLuta = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        selectedSkill: 'luta',
        activeBonusIds: new Set([maisAlemBonus.id]),
      },
      {
        currentForm: formWithLuta,
        rollBonuses: [maisAlemBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );
    assert(attackPlanWithLuta.diceCount === 3, 'Attack with Luta + Mais Além rolls 3D (1 base + 1 Luta + 1 Ganho)');
    assert(attackPlanWithLuta.totalCostPM === 2, 'Mais Além costs 2 PM on attack');

    // Defense with Luta + Mais Além -> 3D (1 base + 1 Luta + 1 Mais Além)
    const defensePlanWithLuta = resolveActionPlan(
      {
        actionType: 'defense',
        targetAttribute: 'resistencia',
        selectedSkill: 'luta',
        activeBonusIds: new Set([maisAlemBonus.id]),
      },
      {
        currentForm: formWithLuta,
        rollBonuses: [maisAlemBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );
    assert(defensePlanWithLuta.diceCount === 3, 'Defense with Luta + Mais Além rolls 3D (1 base + 1 Luta + 1 Ganho)');
    assert(defensePlanWithLuta.totalCostPM === 2, 'Mais Além costs 2 PM on defense');

    // Form without combat skill + Mais Além -> 2D (1 base + 1 Mais Além)
    const formWithoutLuta = createMockForm({
      poder: 2,
      resistencia: 2,
      skills: [],
    });

    const attackPlanNoSkill = resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        activeBonusIds: new Set([maisAlemBonus.id]),
      },
      {
        currentForm: formWithoutLuta,
        rollBonuses: [maisAlemBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );
    assert(attackPlanNoSkill.diceCount === 2, 'Attack without skill + Mais Além rolls 2D (1 base + 1 Ganho)');

    const defensePlanNoSkill = resolveActionPlan(
      {
        actionType: 'defense',
        targetAttribute: 'resistencia',
        activeBonusIds: new Set([maisAlemBonus.id]),
      },
      {
        currentForm: formWithoutLuta,
        rollBonuses: [maisAlemBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );
    assert(defensePlanNoSkill.diceCount === 2, 'Defense without skill + Mais Além rolls 2D (1 base + 1 Ganho)');

    // General test + Mais Além -> 2D
    const generalPlan = resolveActionPlan(
      {
        actionType: 'general',
        targetAttribute: 'habilidade',
        activeBonusIds: new Set([maisAlemBonus.id]),
      },
      {
        currentForm: formWithoutLuta,
        rollBonuses: [maisAlemBonus],
        currentPV: 10,
        currentPM: 10,
        currentPA: 1,
      }
    );
    assert(generalPlan.diceCount === 2, 'General roll + Mais Além rolls 2D (1 base + 1 Ganho)');
  }

  console.log(`--- TEST RESULTS: ${passed} passed, ${failed} failed ---`);
  return { passed, failed };
}
