export type StrikeCatalogEntry = {
  id: string;
  name: string;
  costValue: number;
  costResource: 'none' | 'PV' | 'PM' | 'PA';
  description: string;
  note: string;
  bonusType?: 'attr_mod' | 'flat' | 'full_attr' | 'none';
  value?: number;
  extraDice?: number;
  critThresholdMod?: number;
  autoCrit?: boolean;
  immediateAction?: {
    kind: 'recover_pm';
    rollFormula: '1d6';
    resultLabel?: string;
  };
};

export const STRIKES_CATALOG: StrikeCatalogEntry[] = [
  {
    id: 'derrubar',
    name: 'Derrubar',
    costValue: 0,
    costResource: 'none',
    description: 'Ao vencer a defesa, pode derrubar o alvo em vez de causar dano.',
    note: 'Pode gastar 1PM para causar dano e também derrubar. Alvo derrubado sofre Perda até se levantar.'
  },
  {
    id: 'finta',
    name: 'Finta',
    costValue: 1,
    costResource: 'PM',
    description: 'Usa um movimento e 1PM para causar Perda no próximo ataque recebido.',
    note: 'Se a defesa vencer o ataque, você tem defesa perfeita e pode atacar com Ganho o mesmo alvo no próximo turno.',
    extraDice: -1,
  },
  {
    id: 'golpe_arriscado',
    name: 'Golpe Arriscado',
    costValue: 1,
    costResource: 'PM',
    description: 'Ao atacar, chance de crítico máxima, mas qualquer outro resultado vira 0.',
    note: 'Se não rolar pelo menos um crítico, é falha crítica. Resolução específica declarada em mesa.',
    critThresholdMod: -2,
  },
  {
    id: 'golpe_atordoante',
    name: 'Golpe Atordoante',
    costValue: 2,
    costResource: 'PM',
    description: 'Se causar dano maior que a Resistência do alvo, ele fica atordoado.',
    note: 'O alvo perde a ação do próximo turno e mantém apenas um movimento.'
  },
  {
    id: 'golpe_debilitante',
    name: 'Golpe Debilitante',
    costValue: 2,
    costResource: 'PM',
    description: 'Ao vencer a defesa, em vez de dano, reduz um atributo do alvo.',
    note: 'Reduz -1 até o fim do combate; se houver crítico, reduz -2. Não afeta recursos.'
  },
  {
    id: 'golpe_forte',
    name: 'Golpe Forte',
    costValue: 1,
    costResource: 'PM',
    description: 'Ao vencer a defesa, causa +2 dano extra.',
    note: 'Cada crítico aumenta o dano extra em +1. Mesmo sem vencer perfeitamente, ainda causa 1 dano extra.',
    bonusType: 'flat',
    value: 2,
  },
  {
    id: 'golpe_rapido',
    name: 'Golpe Rápido',
    costValue: 1,
    costResource: 'PM',
    description: 'Permite atacar usando um movimento.',
    note: 'O teste tem Perda e não pode usar vantagens e técnicas.',
    extraDice: -1,
  },
  {
    id: 'recuperar_folego',
    name: 'Recuperar Fôlego',
    costValue: 0,
    costResource: 'none',
    description: 'Usa um movimento para recuperar mana durante combate.',
    note: 'Recupera 1D PM, até um máximo igual à Resistência; apenas durante combates e conflitos.',
    immediateAction: { kind: 'recover_pm', rollFormula: '1d6', resultLabel: 'Recuperar Fôlego (PM)' }
  }
];
