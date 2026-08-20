import { ADVANTAGES_CATALOG } from '../constants/advantagesData';
import { ALL_TECHNIQUES } from '../constants/app/techniques';
import type { AutomationLevel, CharacterForm } from '../types/character';

export type CatalogItemRuleDefinition = {
  id: string;
  name: string;
  category: 'advantage' | 'technique';
  automationLevel: AutomationLevel;
  actionScope?: 'attack' | 'defense' | 'general' | 'activation' | 'trigger' | 'maintenance' | 'any';
  costResource?: 'PM' | 'PV' | 'PA' | 'none';
  costTiming?: 'instant' | 'scene' | 'turn' | 'activation' | 'trigger' | 'maintenance';
  requiredSkills?: string[];
  requiredAdvantages?: string[];
  variantsSupported?: string[];
  repeatable?: boolean;
  notes?: string;
};

export const ADVANTAGE_RULE_ENTRIES: CatalogItemRuleDefinition[] = [
  { id: 'aceleracao', name: 'Aceleração', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'mais_acao', name: '+Ação', category: 'advantage', automationLevel: 'automatic' },
  { id: 'acumulador', name: 'Acumulador', category: 'advantage', automationLevel: 'assisted' },
  { id: 'agil', name: 'Ágil', category: 'advantage', automationLevel: 'automatic', costResource: 'PM', costTiming: 'instant' },
  { id: 'ajudante', name: 'Ajudante', category: 'advantage', automationLevel: 'assisted', repeatable: true, variantsSupported: ['combatente', 'especialista', 'defensor', 'curandeiro', 'conjurador'] },
  { id: 'alcance', name: 'Alcance', category: 'advantage', automationLevel: 'assisted', variantsSupported: ['curto', 'medio', 'longo'] },
  { id: 'anulacao', name: 'Anulação', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'arena', name: 'Arena', category: 'advantage', automationLevel: 'assisted', repeatable: true, variantsSupported: ['urbana', 'floresta', 'montanha', 'aquatico', 'deserto', 'cavernas'] },
  { id: 'artefato', name: 'Artefato', category: 'advantage', automationLevel: 'narrative' },
  { id: 'ataque_especial', name: 'Ataque Especial', category: 'advantage', automationLevel: 'automatic', actionScope: 'attack', costResource: 'PM', costTiming: 'instant', repeatable: true },
  { id: 'base', name: 'Base', category: 'advantage', automationLevel: 'narrative' },
  { id: 'brutal', name: 'Brutal', category: 'advantage', automationLevel: 'assisted' },
  { id: 'carismatico', name: 'Carismático', category: 'advantage', automationLevel: 'automatic', costResource: 'PM', costTiming: 'instant' },
  { id: 'clone', name: 'Clone', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'confusao', name: 'Confusão', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'cura', name: 'Cura', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'defesa_especial', name: 'Defesa Especial', category: 'advantage', automationLevel: 'automatic', actionScope: 'defense', costResource: 'PM', costTiming: 'instant', repeatable: true },
  { id: 'desgaste', name: 'Desgaste', category: 'advantage', automationLevel: 'assisted' },
  { id: 'devoto', name: 'Devoto', category: 'advantage', automationLevel: 'assisted' },
  { id: 'elo_mental', name: 'Elo Mental', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'estender', name: 'Estender', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'famoso', name: 'Famoso', category: 'advantage', automationLevel: 'assisted' },
  { id: 'foco', name: 'Foco', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'forte', name: 'Forte', category: 'advantage', automationLevel: 'automatic', costResource: 'PM', costTiming: 'instant' },
  { id: 'genio', name: 'Gênio', category: 'advantage', automationLevel: 'automatic', costResource: 'PM', costTiming: 'instant' },
  { id: 'golpe_final', name: 'Golpe Final', category: 'advantage', automationLevel: 'automatic', actionScope: 'attack', costResource: 'PA', costTiming: 'instant' },
  { id: 'grimorio', name: 'Grimório', category: 'advantage', automationLevel: 'assisted' },
  { id: 'ilusao', name: 'Ilusão', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'imitar', name: 'Imitar', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'imortal', name: 'Imortal', category: 'advantage', automationLevel: 'assisted' },
  { id: 'improviso', name: 'Improviso', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'imune', name: 'Imune', category: 'advantage', automationLevel: 'assisted', repeatable: true },
  { id: 'incorporeo', name: 'Incorpóreo', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'inimigo', name: 'Inimigo', category: 'advantage', automationLevel: 'assisted', repeatable: true },
  { id: 'inofensivo', name: 'Inofensivo', category: 'advantage', automationLevel: 'assisted' },
  { id: 'instrutor', name: 'Instrutor', category: 'advantage', automationLevel: 'assisted' },
  { id: 'inventario', name: 'Inventário', category: 'advantage', automationLevel: 'narrative' },
  { id: 'invisivel', name: 'Invisível', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'irresistivel', name: 'Irresistível', category: 'advantage', automationLevel: 'assisted' },
  { id: 'maestria', name: 'Maestria', category: 'advantage', automationLevel: 'automatic', repeatable: true, variantsSupported: ['animais', 'arte', 'esporte', 'influencia', 'luta', 'sustento', 'manha', 'maquinas', 'medicina', 'mistica', 'percepcao', 'saber'] },
  { id: 'magia', name: 'Magia', category: 'advantage', automationLevel: 'automatic', requiredSkills: ['mistica'] },
  { id: 'mais_mana', name: '+Mana', category: 'advantage', automationLevel: 'automatic' },
  { id: 'mais_membros', name: '+Membros', category: 'advantage', automationLevel: 'assisted' },
  { id: 'mentor', name: 'Mentor', category: 'advantage', automationLevel: 'assisted', repeatable: true, variantsSupported: ['animais', 'arte', 'esporte', 'influencia', 'luta', 'sustento', 'manha', 'maquinas', 'medicina', 'mistica', 'percepcao', 'saber'] },
  { id: 'obstinado', name: 'Obstinado', category: 'advantage', automationLevel: 'assisted' },
  { id: 'paralisia', name: 'Paralisia', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'patrono', name: 'Patrono', category: 'advantage', automationLevel: 'assisted', costResource: 'PA', costTiming: 'instant' },
  { id: 'punicao', name: 'Punição', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'regeneracao', name: 'Regeneração', category: 'advantage', automationLevel: 'assisted', variantsSupported: ['1', '2', '3'] },
  { id: 'resoluto', name: 'Resoluto', category: 'advantage', automationLevel: 'automatic', costResource: 'PM', costTiming: 'instant' },
  { id: 'riqueza', name: 'Riqueza', category: 'advantage', automationLevel: 'narrative' },
  { id: 'sentido', name: 'Sentido', category: 'advantage', automationLevel: 'assisted', repeatable: true, variantsSupported: ['agucado', 'infravisao', 'invisibilidade', 'radar', 'raio_x'] },
  { id: 'telepata', name: 'Telepata', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'teleporte', name: 'Teleporte', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'torcida', name: 'Torcida', category: 'advantage', automationLevel: 'assisted' },
  { id: 'transformacao', name: 'Transformação', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' },
  { id: 'mais_vida', name: '+Vida', category: 'advantage', automationLevel: 'automatic' },
  { id: 'vigoroso', name: 'Vigoroso', category: 'advantage', automationLevel: 'automatic', costResource: 'PM', costTiming: 'instant' },
  { id: 'voo', name: 'Voo', category: 'advantage', automationLevel: 'assisted', costResource: 'PM', costTiming: 'instant' }
];

export function validateRequirements(
  techniqueId: string,
  form: CharacterForm
): { satisfied: boolean; missing: string[] } {
  const technique = ALL_TECHNIQUES.find((t) => t.catalogId === techniqueId || (t as any).id === techniqueId);
  if (!technique) return { satisfied: false, missing: [`Técnica "${techniqueId}" não encontrada no catálogo.`] };

  const missing: string[] = [];
  const formSkills = new Set(form.skills || []);
  const formAdvantages = new Set(form.advantages || []);

  const hasAdvantageWithPrefix = (prefix: string) => {
    return Array.from(formAdvantages).some((adv) => adv === prefix || adv.startsWith(`${prefix}::`));
  };

  const req = technique.requirements;
  if (req?.skills) {
    req.skills.forEach((skill) => {
      if (!formSkills.has(skill)) missing.push(`Perícia ${skill}`);
    });
  }
  if (req?.advantages) {
    req.advantages.forEach((adv) => {
      if (!hasAdvantageWithPrefix(adv)) missing.push(`Vantagem ${adv}`);
    });
  }
  if (req?.exactAdvantages) {
    req.exactAdvantages.forEach((exact) => {
      if (!formAdvantages.has(exact)) missing.push(`Vantagem ${exact}`);
    });
  }

  return { satisfied: missing.length === 0, missing };
}

export function auditCatalogCoverage(): {
  advantagesCount: number;
  techniquesCount: number;
  unmappedAdvantages: string[];
  unmappedTechniques: string[];
  isComplete: boolean;
} {
  const ruleAdvantageIds = new Set(ADVANTAGE_RULE_ENTRIES.map((r) => r.id));
  const unmappedAdvantages = ADVANTAGES_CATALOG.filter((a) => !ruleAdvantageIds.has(a.id)).map((a) => a.id);
  const unmappedTechniques = ALL_TECHNIQUES.filter((t) => !t.catalogId || !t.name).map((t) => t.catalogId);

  return {
    advantagesCount: ADVANTAGES_CATALOG.length,
    techniquesCount: ALL_TECHNIQUES.length,
    unmappedAdvantages,
    unmappedTechniques,
    isComplete: unmappedAdvantages.length === 0 && unmappedTechniques.length === 0 && ADVANTAGES_CATALOG.length >= 59 && ALL_TECHNIQUES.length >= 51,
  };
}
