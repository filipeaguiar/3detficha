import type { TechniqueCatalogEntry } from './techniques';

const base = (entry: Partial<TechniqueCatalogEntry> & Pick<TechniqueCatalogEntry, 'catalogId' | 'name' | 'description'>): TechniqueCatalogEntry => ({
  alias: '',
  universal: false,
  requirements: {},
  attribute: 'any',
  bonusType: 'none',
  value: 0,
  duration: 'instant',
  critThresholdMod: 0,
  autoCrit: false,
  extraDice: 0,
  costValue: 0,
  costResource: 'none',
  xpCost: 10,
  xpCategory: 'common',
  gameplayPattern: 'narrative',
  ...entry,
});

export const REMAINING_TECHNIQUES: TechniqueCatalogEntry[] = [
  base({
    catalogId: 'as_indomavel', name: 'Ás Indomável', description: 'Manobras especiais realizadas enquanto comanda um veículo.',
    requirements: { anyOfSkills: ['esporte', 'maquinas'] }, xpCategory: 'trick', gameplayPattern: 'cycling-variant', attribute: 'habilidade',
    variants: [
      { id: 'ate_o_limite', label: 'Até o Limite!', note: 'Usa PV do veículo em vez de PM para ativar uma vantagem, até H. Resolvido em mesa.' },
      { id: 'drifting', label: 'Drifting', costValue: 2, costResource: 'PM', extraDice: 1, note: 'Usa uma ação para obter Ganho em um teste na próxima rodada.' },
      { id: 'nunca_me_diga', label: 'Nunca me Diga as Chances!', costValue: 2, costResource: 'PM', note: 'Anula uma Perda uma vez no teste; seleção e validação ficam em mesa.' },
      { id: 'vai_corredor', label: 'Vai, Corredor, Vai!', costValue: 1, costResource: 'PM', note: 'Concede um movimento extra enquanto pilota.' },
    ], selectedVariantId: 'ate_o_limite', variantSelectionMode: 'cycle', tableNotes: ['Só pode ser usada enquanto comanda um veículo.'],
  }),
  base({
    catalogId: 'gambiarra', name: 'Gambiarra', description: 'Troca a perícia de um teste por Saber quando há tempo e recursos.',
    requirements: { skills: ['saber'], exactAdvantages: ['maestria::saber'] }, costValue: 2, costResource: 'PM', attribute: 'habilidade', gameplayPattern: 'fixed-modifier',
    tableNotes: ['Exige Maestria (Saber). Não funciona em combate, conflito ou teste resistido.'],
  }),
  base({
    catalogId: 'grito_da_selva', name: 'Grito da Selva', description: 'Convoca animais regionais que atuam como um Ajudante escolhido na utilização.',
    requirements: { attributes: { poder: 2 }, skills: ['animais'] }, costValue: 3, costResource: 'PM', duration: 'scene', attribute: 'any', gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Ajudante convocado', note: 'O tipo de Ajudante, seus usos e a possibilidade de surgir no local são decididos em mesa.' },
  }),
  base({
    catalogId: 'inspirar', name: 'Inspirar', description: 'Inspira um aliado ou todos os aliados Perto com bônus duradouro.',
    requirements: { attributes: { poder: 2 }, oneOf: { skills: ['arte', 'influencia'], advantages: ['devoto'] } }, attribute: 'poder', gameplayPattern: 'cycling-variant',
    variants: [
      { id: 'aliado', label: 'Um Aliado', costValue: 3, costResource: 'PM', note: 'Teste de Poder (9); sucesso concede +2 ao aliado até o fim da cena, +1 por crítico.' },
      { id: 'todos', label: 'Todos Perto', costValue: 6, costResource: 'PM', note: 'Teste de Poder (9); afeta todos os aliados Perto. Bônus aplicado pelos jogadores em mesa.' },
    ], selectedVariantId: 'aliado', variantSelectionMode: 'cycle',
  }),
  base({
    catalogId: 'megalon', name: 'Megalon', description: 'Aumenta uma criatura, favorecendo esforço e vigor e prejudicando agilidade.',
    requirements: { attributes: { habilidade: 3 }, advantages: ['magia'] }, costValue: 10, costResource: 'PM', duration: 'scene', attribute: 'any', gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Megalon ativo', note: 'Ganho e Perda dependem da natureza do teste e são aplicados em mesa; alvo involuntário pode resistir.' },
  }),
  base({
    catalogId: 'mikron', name: 'Mikron', description: 'Diminui uma criatura, favorecendo agilidade e prejudicando esforço e vigor.',
    requirements: { attributes: { habilidade: 3 }, advantages: ['magia'] }, costValue: 10, costResource: 'PM', duration: 'scene', attribute: 'any', gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Mikron ativo', note: 'Ganho e Perda dependem da natureza do teste e são aplicados em mesa; alvo involuntário pode resistir.' },
  }),
  base({
    catalogId: 'pisao_do_tita', name: 'Pisão do Titã', description: 'Ataque em onda de choque que atinge todos Perto e pode derrubar.',
    actionScope: 'attack',
    requirements: { attributes: { poder: 3 } }, costValue: 3, costResource: 'PM', attribute: 'poder', gameplayPattern: 'fixed-modifier',
    tableNotes: ['Atinge inimigos e aliados Perto. Queda depende de dano acima da Resistência do alvo.'],
  }),
  base({
    catalogId: 'queimar_o_cosmo', name: 'Queimar o Cosmo', description: 'Aumenta P, H e R em +1 para cada 5PM até o fim da cena.',
    requirements: { attributes: { resistencia: 2 }, skills: ['luta'] }, duration: 'scene', costTiming: 'activation', attribute: 'any', gameplayPattern: 'cycling-variant',
    variants: [1, 2, 3, 4, 5].map((rank) => ({ id: `nivel_${rank}`, label: `+${rank} em P/H/R`, costValue: rank * 5, costResource: 'PM', costTiming: 'activation' as const, note: `Concede +${rank} em P, H e R; recursos não mudam. Respeite o limite da Resistência original ou +5.` })),
    selectedVariantId: 'nivel_1', variantSelectionMode: 'cycle', tableNotes: ['O pacote afeta três atributos; a ficha exibe o nível e a mesa aplica os valores contextuais.'],
  }),
  base({
    catalogId: 'raio_da_furia', name: 'Raio da Fúria', description: 'Enfurece um alvo, fortalecendo ataques e impondo penalidades amplas.',
    requirements: { attributes: { habilidade: 3 }, advantages: ['magia'] }, costValue: 10, costResource: 'PM', duration: 'scene', attribute: 'any', gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Fúria ativa', note: 'O alvo recebe P+2 em ataques e crítico 5+, mas sofre Perda nos demais testes e dobra custos. Resistência e exaustão são resolvidas em mesa.' },
  }),
  base({
    catalogId: 'sabedoria_dos_ermos', name: 'Sabedoria dos Ermos', description: 'Obtém itens adicionais enquanto está em sua Arena.',
    requirements: { advantages: ['arena'], skills: ['sobrevivencia'] }, gameplayPattern: 'narrative',
    variants: [
      { id: 'comum', label: 'Item Comum', costValue: 1, costResource: 'PM', note: 'Obtém um item comum além do Inventário; não pode recuperar o PM gasto nesta técnica.' },
      { id: 'incomum', label: 'Item Incomum', costValue: 3, costResource: 'PM', note: 'Obtém um item incomum além do Inventário; não pode recuperar o PM gasto nesta técnica.' },
    ], selectedVariantId: 'comum', variantSelectionMode: 'cycle',
  }),
  base({
    catalogId: 'role_os_dados', name: 'Role os Dados', description: 'Canção que recupera PA do grupo conforme sucesso e críticos.',
    requirements: { attributes: { habilidade: 3 }, skills: ['arte'] }, attribute: 'habilidade', gameplayPattern: 'cycling-variant',
    variants: [
      { id: 'normal', label: 'Normal', costValue: 5, costResource: 'PM', note: 'Teste de Arte (9); sucesso recupera 1PA para você e aliados Perto, +1PA por crítico.' },
      { id: 'refrão', label: 'Jogador Cantou', costValue: 4, costResource: 'PM', note: 'Mesmo efeito, com desconto de 1PM porque o jogador cantou o refrão.' },
      { id: 'grupo', label: 'Grupo Cantou', costValue: 3, costResource: 'PM', note: 'Mesmo efeito, com desconto de 2PM porque o grupo inteiro cantou.' },
    ], selectedVariantId: 'normal', variantSelectionMode: 'cycle',
  }),
  base({
    catalogId: 'abrir_chakra_poder', name: 'Abrir Chakra — Poder', description: 'Abre o chakra de Poder até o fim da cena.',
    actionScope: 'any',
    requirements: { anyAttributeMin: 4, skills: ['luta'] }, xpCost: 20, xpCategory: 'legendary', costValue: 15, costResource: 'PM', duration: 'scene', costTiming: 'activation', attribute: 'poder', extraDice: 1, autoCrit: true, gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Chakra de Poder', note: 'Ganho e crítico automático em Poder; alvo sofre Perda na defesa. Ao terminar, Poder cai a zero e há exaustão.' },
  }),
  base({
    catalogId: 'abrir_chakra_habilidade', name: 'Abrir Chakra — Habilidade', description: 'Abre o chakra de Habilidade até o fim da cena.',
    actionScope: 'any',
    requirements: { anyAttributeMin: 4, skills: ['luta'] }, xpCost: 20, xpCategory: 'legendary', costValue: 15, costResource: 'PM', duration: 'scene', costTiming: 'activation', attribute: 'habilidade', extraDice: 1, autoCrit: true, gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Chakra de Habilidade', note: 'Ganho e crítico automático em Habilidade; movimentos extras custam 1PM. Ao terminar, Habilidade cai a zero e há exaustão.' },
  }),
  base({
    catalogId: 'abrir_chakra_resistencia', name: 'Abrir Chakra — Resistência', description: 'Abre o chakra de Resistência até o fim da cena.',
    actionScope: 'any',
    requirements: { anyAttributeMin: 4, skills: ['luta'] }, xpCost: 20, xpCategory: 'legendary', costValue: 15, costResource: 'PM', duration: 'scene', costTiming: 'activation', attribute: 'resistencia', extraDice: 1, autoCrit: true, gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Chakra de Resistência', note: 'Ganho e crítico automático em Resistência, +20PV e defesas perfeitas. Ao terminar, Resistência cai a zero.' },
  }),
  base({
    catalogId: 'bomba_vital', name: 'Bomba Vital', description: 'Acumula energia ambiente e doações antes de um ataque em área.',
    actionScope: 'attack',
    requirements: { attributes: { resistencia: 4 }, skills: ['luta'] }, xpCost: 20, xpCategory: 'legendary', attribute: 'resistencia', gameplayPattern: 'persistent-assisted',
    persistentAssisted: { kind: 'stock', stockCount: 0, stockMin: 0, stockMaxAttribute: 'resistencia', stockMaxMultiplierAttribute: 'resistencia', consumeAllOnTrigger: true, statusLabel: 'Energia acumulada', triggerLabel: 'Arremessar bomba', note: 'Acúmulo por teste, rodadas e doações é informado pelo jogador. Ao disparar, bônus de Poder igual ao estoque; 20+ concede Ganho. Depois seus PM caem a zero e há exaustão.' },
  }),
  base({
    catalogId: 'dim_mak', name: 'Dim Mak', description: 'Ataque de pontos de pressão com crítico máximo e redução de atributo.',
    actionScope: 'attack',
    requirements: { attributes: { habilidade: 5 }, skills: ['luta'] }, xpCost: 20, xpCategory: 'legendary', costValue: 5, costResource: 'PM', attribute: 'poder', critThresholdMod: -2, gameplayPattern: 'fixed-modifier',
    tableNotes: ['Não combina com vantagem ou técnica. Ao superar a defesa, reduz atributo em vez de dano: -2, mais -1 por crítico.'],
  }),
  base({
    catalogId: 'mata_kaiju', name: 'Mata-Kaiju', description: 'Magia destrutiva de três rodadas, enorme área e dois críticos automáticos.',
    actionScope: 'attack',
    requirements: { attributes: { habilidade: 5 }, advantages: ['magia'] }, xpCost: 20, xpCategory: 'legendary', costValue: 10, costResource: 'PM', attribute: 'habilidade', automaticCriticals: 2, gameplayPattern: 'fixed-modifier',
    tableNotes: ['Exige três rodadas de conjuração. A área e duas Perdas nas defesas são resolvidas em mesa.'],
  }),
  base({
    catalogId: 'megalon_superior', name: 'Megalon Superior', description: 'Eleva o alvo uma ou duas escalas.',
    requirements: { attributes: { habilidade: 6 }, techniques: ['megalon'] }, xpCost: 20, xpCategory: 'legendary', duration: 'scene', costTiming: 'activation', gameplayPattern: 'cycling-variant',
    variants: [
      { id: 'uma_escala', label: '+1 Escala', costValue: 25, costResource: 'PM', costTiming: 'activation' as const, note: 'Eleva o alvo uma escala; consequências de escala são resolvidas em mesa.' },
      { id: 'duas_escalas', label: '+2 Escalas', costValue: 50, costResource: 'PM', costTiming: 'activation' as const, note: 'Eleva o alvo duas escalas; consequências de escala são resolvidas em mesa.' },
    ], selectedVariantId: 'uma_escala', variantSelectionMode: 'cycle',
  }),
  base({
    catalogId: 'morte_estelar', name: 'Morte Estelar', description: 'Destrói imediatamente um alvo ao consumir a energia de uma estrela.',
    requirements: { attributes: { habilidade: 9 }, advantages: ['magia'] }, xpCost: 20, xpCategory: 'legendary', costValue: 100, costResource: 'PM', attribute: 'habilidade', gameplayPattern: 'narrative',
    tableNotes: ['O alvo é destruído independentemente de sua natureza. Role 1D em mesa para a consequência cósmica em resultado 1.'],
  }),
  base({
    catalogId: 'percepcao_cosmica', name: 'Percepção Cósmica', description: 'Conexão cósmica com Ganho, crítico automático e usos ampliados de Percepção.',
    requirements: { attributes: { habilidade: 5 }, exactAdvantages: ['maestria::percepcao'] }, xpCost: 20, xpCategory: 'legendary', costValue: 5, costResource: 'PM', duration: 'scene', costTiming: 'activation', attribute: 'any', gameplayPattern: 'temporary-package',
    temporaryPackage: { kind: 'temporary-package', statusLabel: 'Percepção Cósmica', maintenanceCostValue: 1, maintenanceCostResource: 'PM', note: 'Ganho e crítico automático só em Percepção. Sentidos temporários e troca de perícia custam 1PM e são declarados em mesa.' },
    tableNotes: ['Exige Maestria (Percepção).'],
  }),
  base({
    catalogId: 'rapsodia_das_arcas', name: 'Rapsódia das Arcas', description: 'Canção de quatro rodadas com benefícios cumulativos para aliados.',
    requirements: { attributes: { poder: 4 }, exactAdvantages: ['maestria::arte'] }, xpCost: 20, xpCategory: 'legendary', duration: 'scene', attribute: 'poder', gameplayPattern: 'persistent-assisted',
    persistentAssisted: { kind: 'stock', initialCostValue: 3, initialCostResource: 'PM', triggerCostValue: 3, triggerCostResource: 'PM', stockCount: 3, statusLabel: 'Rapsódia em curso', triggerLabel: 'Próxima rodada', note: 'A ativação representa a 1ª rodada; há mais três etapas. Testes têm metas 6/9/12/15 e benefícios cumulativos. Falha encerra os efeitos.' },
    tableNotes: ['Exige Maestria (Arte).'],
  }),
  base({
    catalogId: 'sabedoria_selvagem', name: 'Sabedoria Selvagem', description: 'Obtém itens raros ou lendários enquanto está em sua Arena.',
    requirements: { attributes: { habilidade: 4 }, techniques: ['sabedoria_dos_ermos'] }, xpCost: 20, xpCategory: 'legendary', gameplayPattern: 'narrative',
    variants: [
      { id: 'raro', label: 'Item Raro', costValue: 5, costResource: 'PM', note: 'Obtém item raro em sua Arena; não recupera o PM desta técnica.' },
      { id: 'lendario', label: 'Item Lendário', costValue: 10, costResource: 'PM', note: 'Obtém item lendário em sua Arena; não recupera o PM desta técnica.' },
    ], selectedVariantId: 'raro', variantSelectionMode: 'cycle',
  }),
  base({
    catalogId: 'trapacear_o_destino', name: 'Trapacear o Destino', description: 'Troca resultados 1 por 6 mediante custo irredutível.',
    requirements: { attributes: { habilidade: 5 }, exactAdvantages: ['maestria::manha'] }, xpCost: 20, xpCategory: 'legendary', gameplayPattern: 'narrative',
    variants: [1, 2, 3].map((count) => ({ id: `${count}_dado${count > 1 ? 's' : ''}`, label: `${count} dado${count > 1 ? 's' : ''}`, costValue: count * 5, costResource: 'PM', note: `Após a rolagem, troca ${count} resultado(s) 1 por 6. Este custo não pode ser reduzido.` })),
    selectedVariantId: '1_dado', variantSelectionMode: 'cycle', tableNotes: ['Exige Maestria (Manha). A troca pós-rolagem é confirmada pelo jogador.'],
  }),
  base({
    catalogId: 'visao_do_futuro', name: 'Visão do Futuro', description: 'Força alguém testando contra você a rolar duas vezes, permitindo escolher o resultado.',
    requirements: { attributes: { habilidade: 5 } }, xpCost: 20, xpCategory: 'legendary', costValue: 3, costResource: 'PM', attribute: 'habilidade', gameplayPattern: 'narrative',
    tableNotes: ['Usada como reação em teste feito contra você; a segunda rolagem e escolha pertencem à mesa.'],
  }),
];
