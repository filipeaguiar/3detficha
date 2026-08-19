export const ADVANTAGE_VARIANT_OPTIONS: Record<string, Array<{ key: string; label: string; cost?: string }>> = {
  ataque_especial: [
    { key: 'potente', label: 'Potente' },
    { key: 'potente_ii', label: 'Potente II' },
    { key: 'perigoso', label: 'Perigoso' },
    { key: 'preciso', label: 'Preciso' },
    { key: 'choque', label: 'Choque' },
    { key: 'titanico', label: 'Titânico' },
  ],
  defesa_especial: [
    { key: 'tenaz', label: 'Tenaz' },
    { key: 'tenaz_ii', label: 'Tenaz II' },
    { key: 'blindada', label: 'Blindada' },
    { key: 'esquiva', label: 'Esquiva' },
    { key: 'bloqueio', label: 'Bloqueio' },
    { key: 'titanica', label: 'Titânica' },
  ],
  alcance: [
    { key: 'perto', label: 'Até Perto', cost: '1pt' },
    { key: 'longe', label: 'Até Longe', cost: '2pt' },
  ],
  imune: [
    { key: 'anfibio', label: 'Anfíbio' },
    { key: 'resiliente', label: 'Resiliente' },
  ],
  sentido: [
    { key: 'infravisao', label: 'Infravisão' },
    { key: 'radar', label: 'Radar' },
    { key: 'raio_x', label: 'Raio X' },
  ],
  inimigo: [
    { key: 'comum', label: 'Inimigo comum', cost: '1pt' },
    { key: 'maior', label: 'Inimigo maior', cost: '2pt' },
  ],
  inventario: [
    { key: 'nivel_1', label: 'Nível 1', cost: '1pt' },
    { key: 'nivel_2', label: 'Nível 2', cost: '2pt' },
    { key: 'nivel_3', label: 'Nível 3', cost: '3pt' },
  ],
  maestria: [
    { key: 'pericia', label: 'Definir perícia' },
  ],
  mentor: [
    { key: 'pericia', label: 'Definir perícia' },
  ],
  punicao: [
    { key: 'leve', label: 'Leve', cost: '1pt' },
    { key: 'grave', label: 'Grave', cost: '2pt' },
  ],
  transformacao: [
    { key: 'forma_menor', label: 'Forma menor', cost: '1pt' },
    { key: 'forma_maior', label: 'Forma maior', cost: '2pt' },
  ],
  artefato: [
    { key: 'simples', label: 'Artefato simples', cost: '1pt' },
    { key: 'maior', label: 'Artefato maior', cost: '2pt' },
    { key: 'lendario', label: 'Artefato lendário', cost: '3pt' },
  ],
  grimorio: [
    { key: 'basico', label: 'Grimório básico', cost: '1pt' },
    { key: 'avancado', label: 'Grimório avançado', cost: '2pt' },
    { key: 'supremo', label: 'Grimório supremo', cost: '3pt' },
  ],
  invisivel: [
    { key: 'parcial', label: 'Invisibilidade parcial', cost: '1pt' },
    { key: 'total', label: 'Invisibilidade total', cost: '2pt' },
  ],
  regeneracao: [
    { key: 'leve', label: 'Regeneração leve', cost: '1pt' },
    { key: 'forte', label: 'Regeneração forte', cost: '2pt' },
  ],
  riqueza: [
    { key: 'rica', label: 'Riqueza', cost: '2pt' },
    { key: 'muito_rica', label: 'Muita riqueza', cost: '4pt' },
    { key: 'milionaria', label: 'Riqueza milionária', cost: '6pt' },
  ],
};

export const DISADVANTAGE_VARIANT_OPTIONS: Record<string, Array<{ key: string; label: string; cost?: string }>> = {
  utensilio: [
    { key: 'comum', label: 'Utensílio comum', cost: '-1pt' },
    { key: 'vital', label: 'Utensílio vital', cost: '-2pt' },
  ],
  restricao: [
    { key: 'leve', label: 'Restrição leve', cost: '-1pt' },
    { key: 'grave', label: 'Restrição grave', cost: '-2pt' },
  ],
  fraqueza: [
    { key: 'leve', label: 'Fraqueza leve', cost: '-1pt' },
    { key: 'grave', label: 'Fraqueza grave', cost: '-2pt' },
  ],
  aura: [
    { key: 'leve', label: 'Aura leve', cost: '-1pt' },
    { key: 'grave', label: 'Aura grave', cost: '-2pt' },
  ],
  assombrado: [
    { key: 'leve', label: 'Assombrado leve', cost: '-1pt' },
    { key: 'grave', label: 'Assombrado grave', cost: '-2pt' },
  ],
  maldicao: [
    { key: 'leve', label: 'Maldição leve', cost: '-1pt' },
    { key: 'grave', label: 'Maldição grave', cost: '-2pt' },
  ],
  pacifista: [
    { key: 'parcial', label: 'Pacifista parcial', cost: '-1pt' },
    { key: 'total', label: 'Pacifista total', cost: '-2pt' },
  ],
  codigo: [
    { key: 'honra', label: 'Código de Honra', cost: '-1pt' },
    { key: 'heroico', label: 'Código Heroico', cost: '-1pt' },
    { key: 'cavalheirismo', label: 'Código de Cavalheirismo', cost: '-1pt' },
    { key: 'justica', label: 'Código de Justiça', cost: '-1pt' },
    { key: 'pacifismo', label: 'Código de Pacifismo', cost: '-1pt' },
    { key: 'lealdade', label: 'Código de Lealdade', cost: '-1pt' },
    { key: 'dahllan', label: 'Código Dahllan', cost: '-1pt' },
  ],
  transtorno: [
    { key: 'fobia', label: 'Fobia', cost: '-1pt' },
    { key: 'mitomania', label: 'Mitomania', cost: '-1pt' },
    { key: 'compulsao', label: 'Compulsão', cost: '-1pt' },
  ],
};
