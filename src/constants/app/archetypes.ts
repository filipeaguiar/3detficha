import type { CharacterArchetype } from '../../types/character';

export const ARCHETYPES_CATALOG: CharacterArchetype[] = [
  {
    id: 'none',
    name: 'Sem Arquétipo',
    cost: 0,
    group: 'Livre',
    desc: 'Personagem sem arquétipo específico.',
    traits: [],
  },
  {
    id: 'humano',
    name: 'Humano',
    cost: 0,
    group: 'Base',
    desc: 'O arquétipo humano é o padrão para personagens sem outro povo específico.',
    traits: ['Mais Além'],
    grantedEffects: [
      { id: 'arch_humano_mais_alem', name: 'Mais Além', desc: 'Gaste 2PM para ter Ganho em um teste.', attribute: 'any', bonusType: 'none', extraDice: 1, duration: 'instant', costValue: 2, costResource: 'PM' },
    ],
    notes: ['Uma vez por cena, pode gastar 2PM para ter Ganho em um teste.'],
  },
  {
    id: 'aberrante',
    name: 'Aberrante',
    cost: 1,
    group: 'Base',
    desc: 'Ser bizarro, mutante ou extraplanar demais para o mundo natural.',
    traits: ['Deformidade', 'Teratismo'],
    grantedDisadvantages: ['monstruoso'],
    choiceGroups: [
      {
        id: 'aberrante_deformidade',
        label: 'Deformidade',
        kind: 'skill',
        min: 1,
        max: 1,
        options: [
          { id: 'animais', label: 'Animais', grantsSkills: ['animais'] },
          { id: 'arte', label: 'Arte', grantsSkills: ['arte'] },
          { id: 'esporte', label: 'Esporte', grantsSkills: ['esporte'] },
          { id: 'influencia', label: 'Influência', grantsSkills: ['influencia'] },
          { id: 'luta', label: 'Luta', grantsSkills: ['luta'] },
          { id: 'manha', label: 'Manha', grantsSkills: ['manha'] },
          { id: 'maquinas', label: 'Máquinas', grantsSkills: ['maquinas'] },
          { id: 'medicina', label: 'Medicina', grantsSkills: ['medicina'] },
          { id: 'mistica', label: 'Mística', grantsSkills: ['mistica'] },
          { id: 'percepcao', label: 'Percepção', grantsSkills: ['percepcao'] },
          { id: 'saber', label: 'Saber', grantsSkills: ['saber'] },
          { id: 'sobrevivencia', label: 'Sobrevivência', grantsSkills: ['sobrevivencia'] }
        ]
      }
    ],
    unsupportedNotes: ['Teratismo (Técnica Comum à escolha) ainda não tem subsistema dedicado de técnicas oficiais por arquétipo.'],
    notes: ['Escolha uma perícia para receber atributo +1 ao testá-la.', 'Recebe uma Técnica Comum à escolha, respeitando exigências.'],
  },
  {
    id: 'abissal',
    name: 'Abissal',
    cost: 1,
    group: 'Base',
    desc: 'Ser infernal ou vindo de planos malignos.',
    traits: ['Desfavor'],
    grantedAdvantages: ['agil'],
    grantedDisadvantages: ['infame'],
    grantedEffects: [
      { id: 'arch_abissal_desfavor', name: 'Desfavor', desc: 'Gaste 3PM para impor Perda ao alvo até o próximo turno.', attribute: 'poder', bonusType: 'none', extraDice: -1, duration: 'instant', costValue: 3, costResource: 'PM' },
    ],
  },
  {
    id: 'alien',
    name: 'Alien',
    cost: 1,
    group: 'Base',
    desc: 'Estrangeiro de outro planeta, tempo ou dimensão.',
    traits: ['Talento', 'Xenobiologia'],
    grantedDisadvantages: ['inculto'],
    choiceGroups: [
      {
        id: 'alien_talento',
        label: 'Talento Alienígena',
        kind: 'advantage',
        min: 1,
        max: 1,
        options: [
          { id: 'agil', label: 'Ágil', grantsAdvantages: ['agil'] },
          { id: 'carismatico', label: 'Carismático', grantsAdvantages: ['carismatico'] },
          { id: 'forte', label: 'Forte', grantsAdvantages: ['forte'] },
          { id: 'genio', label: 'Gênio', grantsAdvantages: ['genio'] },
          { id: 'resoluto', label: 'Resoluto', grantsAdvantages: ['resoluto'] },
          { id: 'vigoroso', label: 'Vigoroso', grantsAdvantages: ['vigoroso'] }
        ]
      }
    ],
    unsupportedNotes: ['Xenobiologia ainda não reduz dinamicamente o custo em PM de uma vantagem escolhida.'],
    notes: ['Escolha uma entre Ágil, Carismático, Forte, Gênio, Resoluto ou Vigoroso.', 'Escolha uma vantagem que possua para usar pela metade do custo em PM.'],
  },
  {
    id: 'anao',
    name: 'Anão',
    cost: 1,
    group: 'Base',
    desc: 'Povo robusto, teimoso e tradicional.',
    traits: ['Abascanto', 'A Ferro e Fogo'],
    grantedDisadvantages: ['lento'],
    notes: ['Recebe Sentido (Infravisão).', 'Em testes de Máquinas, o atributo correspondente tem +1.'],
  },
  {
    id: 'anfibio',
    name: 'Anfíbio',
    cost: 1,
    group: 'Base',
    desc: 'Ser aquático adaptado à vida dentro e fora d’água.',
    traits: ['Imune (Anfíbio)'],
    grantedAdvantages: ['vigoroso'],
    grantedDisadvantages: ['ambiente'],
  },
  {
    id: 'celestial',
    name: 'Celestial',
    cost: 1,
    group: 'Base',
    desc: 'Ser de planos superiores, anjo ou entidade benigna.',
    traits: ['Arrebatar'],
    grantedAdvantages: ['carismatico'],
    grantedDisadvantages: ['codigo::heroico'],
    grantedEffects: [
      { id: 'arch_celestial_arrebatar', name: 'Arrebatar', desc: 'Gaste 3PM para conceder Ganho no teste de um aliado.', attribute: 'any', bonusType: 'none', extraDice: 1, duration: 'instant', costValue: 3, costResource: 'PM' },
    ],
  },
  {
    id: 'centauro',
    name: 'Centauro',
    cost: 2,
    group: 'Base',
    desc: 'Criatura táurica de grande corpo e mobilidade.',
    traits: ['Corpo Táurico'],
    grantedAdvantages: ['vigoroso'],
    grantedDisadvantages: ['diferente'],
    grantedEffects: [
      { id: 'arch_centauro_corpo_taurico', name: 'Corpo Táurico', desc: 'Gaste 1PM para crítico 5+ em esforço físico, iniciativa, correr ou perseguir.', attribute: 'any', bonusType: 'none', critThresholdMod: -1, duration: 'instant', costValue: 1, costResource: 'PM' },
    ],
  },
  {
    id: 'ciborgue',
    name: 'Ciborgue',
    cost: 2,
    group: 'Base',
    desc: 'Ser vivo integrado a partes mecânicas ou artificiais.',
    traits: ['Construto Vivo'],
    grantedAdvantages: ['imune::resiliente'],
    choiceGroups: [
      {
        id: 'ciborgue_diretriz',
        label: 'Diretriz',
        kind: 'disadvantage',
        min: 1,
        max: 1,
        options: [
          { id: 'codigo::heroico', label: 'Código Heroico', grantsDisadvantages: ['codigo::heroico'] },
          { id: 'codigo::honra', label: 'Código de Honra', grantsDisadvantages: ['codigo::honra'] },
          { id: 'codigo::justica', label: 'Código de Justiça', grantsDisadvantages: ['codigo::justica'] },
          { id: 'transtorno::fobia', label: 'Transtorno — Fobia', grantsDisadvantages: ['transtorno::fobia'] },
          { id: 'transtorno::mitomania', label: 'Transtorno — Mitomania', grantsDisadvantages: ['transtorno::mitomania'] },
          { id: 'transtorno::compulsao', label: 'Transtorno — Compulsão', grantsDisadvantages: ['transtorno::compulsao'] }
        ]
      }
    ],
    unsupportedNotes: ['Imunidades adicionais de Ciborgue seguem parcialmente manuais/contextuais.'],
    notes: ['Também é imune a Abiótico e Doenças.', 'Escolha um Código ou Transtorno para Diretriz.'],
  },
  {
    id: 'construto',
    name: 'Construto',
    cost: 1,
    group: 'Base',
    desc: 'Ser artificial, mecânico ou mágico, feito e não nascido.',
    traits: [],
    grantedDisadvantages: ['bateria', 'sem_vida'],
    notes: ['Imune a Abiótico, Doenças, Resiliente e Sem Mente.'],
  },
  {
    id: 'dahllan',
    name: 'Dahllan',
    cost: 1,
    group: 'Base',
    desc: 'Povo de seiva vegetal, ligado à natureza e aos animais.',
    traits: ['Benção da Natureza', 'Empatia Selvagem'],
    grantedDisadvantages: ['codigo'],
    unsupportedNotes: ['Código Dahllan permanece manual/narrador-handled.'],
    notes: ['Em testes de Animais, o atributo correspondente tem +1.', 'Código Dahllan: vegana e protetora de animais.'],
  },
  {
    id: 'elfo',
    name: 'Elfo',
    cost: 1,
    group: 'Base',
    desc: 'Povo elegante, longevo e místico.',
    traits: ['Impecável', 'Natureza Mística'],
    grantedDisadvantages: ['fragil'],
    choiceGroups: [
      {
        id: 'elfo_impecavel',
        label: 'Impecável',
        kind: 'advantage',
        min: 1,
        max: 1,
        options: [
          { id: 'agil', label: 'Ágil', grantsAdvantages: ['agil'] },
          { id: 'carismatico', label: 'Carismático', grantsAdvantages: ['carismatico'] },
          { id: 'genio', label: 'Gênio', grantsAdvantages: ['genio'] }
        ]
      }
    ],
    notes: ['Escolha uma entre Ágil, Carismático ou Gênio.', 'Em testes de Mística, o atributo correspondente tem +1.'],
  },
  {
    id: 'fada',
    name: 'Fada',
    cost: 1,
    group: 'Base',
    desc: 'Ser feérico ligado à natureza e à magia.',
    traits: ['Magia das Fadas'],
    grantedDisadvantages: ['infame'],
    choiceGroups: [
      {
        id: 'fada_magia',
        label: 'Magia das Fadas',
        kind: 'advantage',
        min: 1,
        max: 1,
        options: [
          { id: 'magia', label: 'Magia', grantsAdvantages: ['magia'] },
          { id: 'ilusao', label: 'Ilusão', grantsAdvantages: ['ilusao'] }
        ]
      },
      {
        id: 'fada_delicada',
        label: 'Delicada',
        kind: 'disadvantage',
        min: 1,
        max: 1,
        options: [
          { id: 'diferente', label: 'Diferente', grantsDisadvantages: ['diferente'] },
          { id: 'fragil', label: 'Frágil', grantsDisadvantages: ['fragil'] }
        ]
      }
    ],
    unsupportedNotes: ['A redução de custo em PM de Magia/Ilusão ainda não é específica por origem do arquétipo.'],
    notes: ['Escolha entre Magia ou Ilusão com custo -1PM.', 'Escolha entre Diferente ou Frágil como delicadeza.'],
  },
  {
    id: 'fantasma',
    name: 'Fantasma',
    cost: 2,
    group: 'Base',
    desc: 'Morto-vivo imaterial e preso ao mundo.',
    traits: ['Espírito', 'Paralisia'],
    grantedAdvantages: ['devoto'],
    unsupportedNotes: ['Incorporeidade persistente do Fantasma não está automatizada no motor atual.', 'Sem Vida e imunidades do Fantasma seguem parcialmente manuais/contextuais.'],
    notes: ['Imune a Abiótico e Doenças.', 'Tem Sem Vida e condição incorpórea especial.'],
  },
  {
    id: 'goblin',
    name: 'Goblin',
    cost: 1,
    group: 'Base',
    desc: 'Pequeno, engenhoso e adaptável às cidades e ao caos.',
    traits: ['Espertalhão', 'Subterrâneo'],
    grantedDisadvantages: ['diferente'],
    notes: ['Recebe Sentido (Infravisão).'],
  },
  {
    id: 'hynne',
    name: 'Hynne',
    cost: 1,
    group: 'Base',
    desc: 'Pequenino hospitaleiro, rápido e surpreendentemente habilidoso.',
    traits: ['Atirador', 'Encantador'],
    grantedDisadvantages: ['diferente'],
  },
  {
    id: 'kallyanach',
    name: 'Kallyanach',
    cost: 2,
    group: 'Base',
    desc: 'Meio-dragão, poderoso e marcado por herança dracônica.',
    traits: ['Baforada'],
    grantedDisadvantages: ['codigo'],
    choiceGroups: [
      {
        id: 'kallyanach_poder',
        label: 'Poder Dracônico',
        kind: 'advantage',
        min: 1,
        max: 1,
        options: [
          { id: 'forte', label: 'Forte', grantsAdvantages: ['forte'] },
          { id: 'carismatico', label: 'Carismático', grantsAdvantages: ['carismatico'] }
        ]
      }
    ],
    unsupportedNotes: ['Baforada com escolha entre variantes e redução específica de custo ainda não está totalmente automatizada.', 'Código dos Dragões permanece manual/narrador-handled.'],
    notes: ['Recebe Ataque Especial (Área, Distante ou Potente) com -1PM.', 'Escolha Forte ou Carismático.', 'Código dos Dragões.'],
  },
  {
    id: 'kemono',
    name: 'Kemono',
    cost: 1,
    group: 'Base',
    desc: 'Humanoide com traços animais ou animal antropomórfico.',
    traits: ['Percepção Apurada', 'Talento', 'Cacoete'],
    choiceGroups: [
      {
        id: 'kemono_talento',
        label: 'Talento Kemono',
        kind: 'advantage',
        min: 1,
        max: 1,
        options: [
          { id: 'agil', label: 'Ágil', grantsAdvantages: ['agil'] },
          { id: 'carismatico', label: 'Carismático', grantsAdvantages: ['carismatico'] },
          { id: 'forte', label: 'Forte', grantsAdvantages: ['forte'] },
          { id: 'genio', label: 'Gênio', grantsAdvantages: ['genio'] },
          { id: 'resoluto', label: 'Resoluto', grantsAdvantages: ['resoluto'] },
          { id: 'vigoroso', label: 'Vigoroso', grantsAdvantages: ['vigoroso'] }
        ]
      },
      {
        id: 'kemono_cacoete',
        label: 'Cacoete Kemono',
        kind: 'disadvantage',
        min: 1,
        max: 1,
        options: [
          { id: 'antipatico', label: 'Antipático', grantsDisadvantages: ['antipatico'] },
          { id: 'atrapalhado', label: 'Atrapalhado', grantsDisadvantages: ['atrapalhado'] },
          { id: 'fracote', label: 'Fracote', grantsDisadvantages: ['fracote'] },
          { id: 'fragil', label: 'Frágil', grantsDisadvantages: ['fragil'] },
          { id: 'indeciso', label: 'Indeciso', grantsDisadvantages: ['indeciso'] },
          { id: 'tapado', label: 'Tapado', grantsDisadvantages: ['tapado'] }
        ]
      }
    ],
    notes: ['Escolha uma entre Ágil, Carismático, Forte, Gênio, Resoluto ou Vigoroso.', 'Escolha uma entre Antipático, Atrapalhado, Fracote, Frágil, Indeciso ou Tapado.'],
  },
  {
    id: 'medusa',
    name: 'Medusa',
    cost: 1,
    group: 'Base',
    desc: 'Ser serpentiforme de grande apelo social e olhar perigoso.',
    traits: ['Olhar Atordoante'],
    grantedAdvantages: ['carismatico'],
    grantedDisadvantages: ['fracote'],
    grantedEffects: [
      { id: 'arch_medusa_olhar', name: 'Olhar Atordoante', desc: 'Gaste 3PM para atordoar um alvo Perto.', attribute: 'poder', bonusType: 'none', extraDice: -1, duration: 'instant', costValue: 3, costResource: 'PM' },
    ],
  },
  {
    id: 'minotauro',
    name: 'Minotauro',
    cost: 1,
    group: 'Base',
    desc: 'Humanoide bovino forte, competitivo e de instintos labirínticos.',
    traits: ['Atlético', 'Sentido Labiríntico'],
    grantedDisadvantages: ['transtorno::fobia'],
    notes: ['Fobia de altura.'],
  },
  {
    id: 'ogro',
    name: 'Ogro',
    cost: 1,
    group: 'Base',
    desc: 'Humanoide imenso, brutal e intimidador.',
    traits: ['Destruidor', 'Intimidador'],
    grantedDisadvantages: ['diferente'],
  },
  {
    id: 'osteon',
    name: 'Osteon',
    cost: 2,
    group: 'Base',
    desc: 'Morto-vivo esquelético consciente e persistente.',
    traits: ['Memória Póstuma'],
    grantedDisadvantages: ['sem_vida'],
    choiceGroups: [
      {
        id: 'osteon_memoria',
        label: 'Memória Póstuma',
        kind: 'skill',
        min: 1,
        max: 1,
        options: [
          { id: 'animais', label: 'Animais', grantsSkills: ['animais'] },
          { id: 'arte', label: 'Arte', grantsSkills: ['arte'] },
          { id: 'esporte', label: 'Esporte', grantsSkills: ['esporte'] },
          { id: 'influencia', label: 'Influência', grantsSkills: ['influencia'] },
          { id: 'luta', label: 'Luta', grantsSkills: ['luta'] },
          { id: 'manha', label: 'Manha', grantsSkills: ['manha'] },
          { id: 'maquinas', label: 'Máquinas', grantsSkills: ['maquinas'] },
          { id: 'medicina', label: 'Medicina', grantsSkills: ['medicina'] },
          { id: 'mistica', label: 'Mística', grantsSkills: ['mistica'] },
          { id: 'percepcao', label: 'Percepção', grantsSkills: ['percepcao'] },
          { id: 'saber', label: 'Saber', grantsSkills: ['saber'] },
          { id: 'sobrevivencia', label: 'Sobrevivência', grantsSkills: ['sobrevivencia'] }
        ]
      }
    ],
    unsupportedNotes: ['Imunidades adicionais de Osteon seguem parcialmente manuais/contextuais.'],
    notes: ['Imune a Abiótico, Doenças e Resiliente.', 'Escolha uma perícia para atributo +1 ao testá-la.'],
  },
  {
    id: 'qareen',
    name: 'Qareen',
    cost: 2,
    group: 'Base',
    desc: 'Meio-gênio, criatura arcana prestativa e poderosa.',
    traits: ['Desejos'],
    grantedAdvantages: ['carismatico', 'magia'],
    grantedDisadvantages: ['codigo'],
    grantedEffects: [
      { id: 'arch_qareen_desejos', name: 'Desejos', desc: 'Magias para atender desejos têm custo reduzido.', attribute: 'any', bonusType: 'none', duration: 'scene', costValue: 0, costResource: 'none' },
    ],
    notes: ['Código da Gratidão.'],
  },
  {
    id: 'sauroide',
    name: 'Sauroide',
    cost: 2,
    group: 'Base',
    desc: 'Humanoide reptiliano robusto, furtivo e resistente.',
    traits: ['Camuflagem'],
    grantedAdvantages: ['resoluto', 'vigoroso'],
    grantedDisadvantages: ['fraqueza::grave'],
    notes: ['Fraqueza (Frio).'],
  },
  {
    id: 'vampiro',
    name: 'Vampiro',
    cost: 1,
    group: 'Base',
    desc: 'Ser noturno imortal, talentoso e amaldiçoado.',
    traits: [],
    grantedAdvantages: ['imortal'],
    choiceGroups: [
      {
        id: 'vampiro_talento',
        label: 'Talento Vampírico',
        kind: 'advantage',
        min: 1,
        max: 1,
        options: [
          { id: 'agil', label: 'Ágil', grantsAdvantages: ['agil'] },
          { id: 'carismatico', label: 'Carismático', grantsAdvantages: ['carismatico'] },
          { id: 'forte', label: 'Forte', grantsAdvantages: ['forte'] },
          { id: 'genio', label: 'Gênio', grantsAdvantages: ['genio'] },
          { id: 'resoluto', label: 'Resoluto', grantsAdvantages: ['resoluto'] },
          { id: 'vigoroso', label: 'Vigoroso', grantsAdvantages: ['vigoroso'] }
        ]
      }
    ],
    unsupportedNotes: ['Fraqueza (luz do dia) permanece descritiva/manual.', 'Dependência do texto é NPC-only e não altera custo de PJ.'],
    notes: ['Escolha uma entre Ágil, Carismático, Forte, Gênio, Resoluto ou Vigoroso.', 'Fraqueza (luz do dia). Dependência não altera o custo total do arquétipo para PJ.'],
  },
];
