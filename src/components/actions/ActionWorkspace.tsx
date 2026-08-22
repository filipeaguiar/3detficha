import { useMemo, useState } from 'react';
import { ADVANTAGES_CATALOG } from '../../constants/advantagesData';
import type { CharacterForm, PreparedMagicDraft, RollBonus } from '../../types/character';
import type { ActionWorkspaceTab, AppMode } from '../../types/navigation';
import { classifyFormActions } from '../../utils/actionClassification';
import { getActiveBonusVariant, getBonusSubtitle } from '../../utils/character';
import { resolveActionPlan } from '../../utils/actionResolver';
import { BookIcon, CheckIcon, CloseIcon, HabilidadeIcon, HourglassIcon, MenuIcon, PencilIcon, PlusIcon, PoderIcon, ResistenciaIcon, SparklesIcon, TabTechniquesIcon, TrashIcon, WandSparklesIcon, ZapIcon, SwordsIcon, ShieldIcon, DiceCountIcon } from '../common/Icons';
import SegmentedBar from '../common/SegmentedBar';
import TabbedNavigation from '../common/TabbedNavigation';
import EditorPillGroup from '../editor/EditorPillGroup';

type ActionWorkspaceProps = {
  characterName: string;
  currentForm: CharacterForm;
  forms: CharacterForm[];
  activeFormIndex: number;
  selectedKitId: string;
  currentPM: number;
  maxPM: number;
  visibleRollBonuses: RollBonus[];
  setActiveFormIndex: (index: number) => void;
  setMode: (mode: AppMode) => void;
  setIsDrawerOpen: (open: boolean) => void;
  setEditingBonusId: (id: string | null) => void;
  removeRollBonus: (id: string) => void;
  updateRollBonus: (id: string, updates: Partial<RollBonus>) => void;
  setIsPresetModalOpen: (open: boolean) => void;
  addCustomBonus: () => void;
  createPreparedMagic: (draft: PreparedMagicDraft) => boolean;
  prepareExistingMagic: (id: string) => boolean;
};

const TAB_LABELS: Record<ActionWorkspaceTab, string> = {
  attacks: 'Combate',
  techniques: 'Técnicas',
  modifiers: 'Modificadores/Bônus',
};

export default function ActionWorkspace({ characterName, currentForm, forms, activeFormIndex, selectedKitId, currentPM, maxPM, visibleRollBonuses, setActiveFormIndex, setMode, setIsDrawerOpen, setEditingBonusId, removeRollBonus, updateRollBonus, setIsPresetModalOpen, addCustomBonus, createPreparedMagic, prepareExistingMagic }: ActionWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<ActionWorkspaceTab>('attacks');
  const [isPrepareMagicOpen, setIsPrepareMagicOpen] = useState(false);
  const [magicName, setMagicName] = useState('');
  const [magicAttribute, setMagicAttribute] = useState<PreparedMagicDraft['attribute']>('any');
  const [magicValue, setMagicValue] = useState(2);
  const actions = useMemo(() => classifyFormActions(currentForm, visibleRollBonuses), [currentForm, visibleRollBonuses]);
  const areaAdvantageOptions = useMemo(() => ADVANTAGES_CATALOG.map((advantage) => ({ ...advantage, pointCost: Number(advantage.cost.match(/^\d+/)?.[0] || 0) })).filter((advantage) => advantage.pointCost === 1 || advantage.pointCost === 2), []);
  const hasLuta = (currentForm.skills || []).includes('luta');
  const hasMistica = (currentForm.skills || []).includes('mistica');
  const hasMagia = (currentForm.advantages || []).some((advantageId) => advantageId.split('::')[0] === 'magia');
  const usesMisticaForCombat = !hasLuta && hasMistica && hasMagia;
  const hasCombatSkill = hasLuta || usesMisticaForCombat;
  const counts: Record<ActionWorkspaceTab, number> = { attacks: 2 + actions.attacks.length, techniques: actions.techniques.length, modifiers: actions.modifiers.length };
  const preparedManaLocked = [...actions.techniques, ...actions.modifiers].filter((bonus) => bonus.gameplayPattern === 'prepared-magic' && bonus.assistedState?.prepared).reduce((total, bonus) => total + (bonus.costValue || 0), 0);
  const canPrepareMagic = currentPM + preparedManaLocked >= maxPM;
  const preparationCost = Math.ceil(Math.max(1, magicValue) / 2);

  const attackPlan = useMemo(() => {
    return resolveActionPlan(
      { actionType: 'attack', targetAttribute: 'poder', selectedSkill: hasCombatSkill ? (hasLuta ? 'luta' : 'mistica') : undefined },
      { currentForm, rollBonuses: visibleRollBonuses, currentPV: currentForm.resistencia * 5, currentPM, currentPA: 1 }
    );
  }, [currentForm, visibleRollBonuses, currentPM, hasCombatSkill, hasLuta]);

  const defensePlan = useMemo(() => {
    return resolveActionPlan(
      { actionType: 'defense', targetAttribute: 'resistencia', selectedSkill: hasCombatSkill ? (hasLuta ? 'luta' : 'mistica') : undefined },
      { currentForm, rollBonuses: visibleRollBonuses, currentPV: currentForm.resistencia * 5, currentPM, currentPA: 1 }
    );
  }, [currentForm, visibleRollBonuses, currentPM, hasCombatSkill, hasLuta]);

  const attributeColor = (attribute: 'poder' | 'habilidade' | 'resistencia') => attribute === 'poder' ? '#FF9E00' : attribute === 'habilidade' ? '#894EC6' : '#5EB05D';

  const renderBonus = (bonus: RollBonus) => {
    const activeVariant = getActiveBonusVariant(bonus);
    const effectiveCostValue = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : bonus.costValue;
    const effectiveCostResource = activeVariant?.costResource || bonus.costResource;
    const isImmediate = !!(activeVariant?.immediateAction || bonus.immediateAction);
    const isAssisted = !!(activeVariant?.persistentAssisted || bonus.persistentAssisted);
    const isPackage = !!(activeVariant?.temporaryPackage || bonus.temporaryPackage);

    return (
      <article key={bonus.id} className={`bonus-toggle action-workspace-preview-card ${(isAssisted || isPackage || bonus.sourceCatalogId === 'setas_infaliveis_de_petrovna' || (bonus.variants && bonus.variants.length > 1)) ? 'play-action-card-detailed' : 'play-action-card-compact'}`}>
        <div className="bt-top">
          <div className="bt-title"><span className="bt-name">{bonus.alias || bonus.name}</span>{bonus.alias && <span className="bt-raw-name">{bonus.name}</span>}</div>
          <div className="bt-badges">
            {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: 'transparent', color: '#33ccff', padding: 0 }} title="Dura até o fim da cena"><HourglassIcon size={14} /></span>}
            {isImmediate && <span className="bonus-attr-micro" style={{ background: 'transparent', color: '#ffd166', padding: 0 }} title="Ação Imediata"><ZapIcon size={14} /></span>}
            {isAssisted && <span className="bonus-attr-micro" style={{ background: '#ff8fab', color: '#000' }}>ASSISTIDO</span>}
            {isPackage && <span className="bonus-attr-micro" style={{ background: '#ffd166', color: '#000' }}>PACOTE</span>}
            {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.prepared ? '#7bd389' : 'var(--surface-hover)', color: bonus.assistedState?.prepared ? '#000' : 'var(--text-muted)' }}>{bonus.assistedState?.prepared ? 'PREPARADA' : 'USADA'}</span>}
            {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ background: 'transparent', padding: 0, color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute === 'poder' ? <PoderIcon size={14} /> : bonus.attribute === 'habilidade' ? <HabilidadeIcon size={14} /> : <ResistenciaIcon size={14} />}</span>}
          </div>
        </div>
        <div className="bt-body" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span className="bt-effect">{getBonusSubtitle(bonus)}</span>
          {bonus.gameplayPattern !== 'prepared-magic' && effectiveCostValue && effectiveCostValue > 0 && effectiveCostResource !== 'none' ? <SegmentedBar current={effectiveCostValue} max={effectiveCostValue} color={effectiveCostResource === 'PV' ? "#5EB05D" : effectiveCostResource === 'PA' ? "#FF9E00" : "#894EC6"} segmentWidth={8} /> : null}
        </div>
        {bonus.sourceCatalogId === 'setas_infaliveis_de_petrovna' && <div className="bt-footer action-workspace-inline-controls"><span>Setas a preparar:</span><button type="button" className="control-btn" onClick={() => { const current = bonus.assistedState?.configuredStock || 1; updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), configuredStock: Math.max(1, current - 1) } }); }}>−</button><strong>{Math.min(currentForm.habilidade, bonus.assistedState?.configuredStock || 1)}</strong><button type="button" className="control-btn" onClick={() => { const current = bonus.assistedState?.configuredStock || 1; updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), configuredStock: Math.min(Math.max(1, currentForm.habilidade), current + 1) } }); }}>+</button></div>}
        {bonus.sourceCatalogId === 'area_de_batalha' && (() => { const selected = bonus.assistedState?.packageChoices || []; const total = selected.reduce((sum, id) => sum + (areaAdvantageOptions.find((option) => option.id === id)?.pointCost || 0), 0); return <div className="bt-footer action-workspace-package"><div className={total === 2 ? 'complete' : ''}>Pacote da Área: {total}/2 pontos</div><EditorPillGroup options={areaAdvantageOptions.map((option) => { const checked = selected.includes(option.id); return { key: option.id, selected: checked, disabled: !checked && (selected.length >= 2 || total + option.pointCost > 2), label: <>{checked && <CheckIcon size={11} />}{option.name} ({option.pointCost})</>, onClick: () => updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), packageChoices: checked ? selected.filter((id) => id !== option.id) : [...selected, option.id] } }) }; })} /></div>; })()}
        <div className="bt-footer action-workspace-preview-actions"><span>{bonus.gameplayPattern === 'prepared-magic' ? `Preparação: ${bonus.costValue || Math.ceil(Math.max(1, bonus.value) / 2)} PM` : 'Prévia no modo de jogo'}</span><span>{bonus.gameplayPattern === 'prepared-magic' && !bonus.assistedState?.prepared && <button type="button" className="control-btn" onClick={() => prepareExistingMagic(bonus.id)} title="Preparar novamente"><WandSparklesIcon size={14} /></button>}<button type="button" className="control-btn" disabled={bonus.gameplayPattern === 'prepared-magic' && !!bonus.assistedState?.prepared} onClick={() => setEditingBonusId(bonus.id)} title={bonus.assistedState?.prepared ? 'Use a magia antes de alterá-la' : 'Editar'}><PencilIcon /></button><button type="button" className="bonus-remove-btn" disabled={bonus.gameplayPattern === 'prepared-magic' && !!bonus.assistedState?.prepared} onClick={() => removeRollBonus(bonus.id)} title={bonus.assistedState?.prepared ? 'Use a magia antes de removê-la' : 'Remover'}><TrashIcon /></button></span></div>
      </article>
    );
  };

  return (
    <main className="panel slide-up action-workspace">
      <header className="action-workspace-header">
        <div><div className="action-workspace-kicker">{characterName || 'Herói'} • {currentForm.name}</div><h1 className="panel-title">Ações</h1></div>
        <button type="button" className="hud-menu-trigger" onClick={() => setIsDrawerOpen(true)} title="Abrir menu"><MenuIcon /></button>
      </header>

      {forms.length > 1 && <div className="form-tabs-container action-workspace-forms">{forms.map((form, index) => <button key={form.id} type="button" className={`form-tab-btn ${index === activeFormIndex ? 'active' : ''}`} onClick={() => setActiveFormIndex(index)}>{form.name}</button>)}</div>}

      <TabbedNavigation
        className="action-workspace-tabs"
        ariaLabel="Categorias de ações"
        activeTab={activeTab}
        onChange={setActiveTab}
        items={(Object.keys(TAB_LABELS) as ActionWorkspaceTab[]).map((tab) => ({
          id: tab,
          label: TAB_LABELS[tab],
          icon: tab === 'attacks' ? <PoderIcon size={15} /> : tab === 'techniques' ? <TabTechniquesIcon size={15} /> : <SparklesIcon size={15} />,
          badge: counts[tab],
        }))}
      />

      <section className={`bonus-toggles-grid action-workspace-content action-workspace-${activeTab}`}>
        {activeTab === 'attacks' && <>
          <article
            className="bonus-toggle combat-action-button attack action-workspace-preview-card play-action-card-compact"
            style={{ '--combat-action-color': attributeColor(attackPlan.effectiveAttributeName) } as React.CSSProperties}
          >
            <div className="action-corner top-left">
              {attackPlan.effectiveAttributeName === 'poder' ? <PoderIcon size={18} /> : attackPlan.effectiveAttributeName === 'habilidade' ? <HabilidadeIcon size={18} /> : <ResistenciaIcon size={18} />}
            </div>
            <div className="action-corner top-right" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {attackPlan.diceCount > 1 && (
                <DiceCountIcon count={Math.max(1, Math.min(3, attackPlan.diceCount)) as 1 | 2 | 3} size={14} />
              )}
            </div>
            {attackPlan.critRange < 6 && (
              <div className="action-corner bottom-left">
                Crítico {attackPlan.critRange}+
              </div>
            )}
            <div className="combat-action-button-icon" style={{ marginTop: '-8px' }}>
              <SwordsIcon size={38} />
            </div>
            <div className="action-corner bottom-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', paddingBottom: '2px' }}>
              {attackPlan.totalCostPV > 0 && <SegmentedBar current={attackPlan.totalCostPV} max={attackPlan.totalCostPV} color="#ffffff" segmentWidth={8} />}
              {attackPlan.totalCostPM > 0 && <SegmentedBar current={attackPlan.totalCostPM} max={attackPlan.totalCostPM} color="#ffffff" segmentWidth={8} />}
              {attackPlan.totalCostPA > 0 && <SegmentedBar current={attackPlan.totalCostPA} max={attackPlan.totalCostPA} color="#ffffff" segmentWidth={8} />}
            </div>
          </article>
          <article
            className="bonus-toggle combat-action-button defense action-workspace-preview-card play-action-card-compact"
            style={{ '--combat-action-color': attributeColor(defensePlan.effectiveAttributeName) } as React.CSSProperties}
          >
            <div className="action-corner top-left">
              {defensePlan.effectiveAttributeName === 'poder' ? <PoderIcon size={18} /> : defensePlan.effectiveAttributeName === 'habilidade' ? <HabilidadeIcon size={18} /> : <ResistenciaIcon size={18} />}
            </div>
            <div className="action-corner top-right" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {defensePlan.diceCount > 1 && (
                <DiceCountIcon count={Math.max(1, Math.min(3, defensePlan.diceCount)) as 1 | 2 | 3} size={14} />
              )}
            </div>
            {defensePlan.critRange < 6 && (
              <div className="action-corner bottom-left">
                Crítico {defensePlan.critRange}+
              </div>
            )}
            <div className="combat-action-button-icon" style={{ marginTop: '-8px' }}>
              <ShieldIcon size={38} />
            </div>
            <div className="action-corner bottom-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', paddingBottom: '2px' }}>
              {defensePlan.totalCostPV > 0 && <SegmentedBar current={defensePlan.totalCostPV} max={defensePlan.totalCostPV} color="#ffffff" segmentWidth={8} />}
              {defensePlan.totalCostPM > 0 && <SegmentedBar current={defensePlan.totalCostPM} max={defensePlan.totalCostPM} color="#ffffff" segmentWidth={8} />}
              {defensePlan.totalCostPA > 0 && <SegmentedBar current={defensePlan.totalCostPA} max={defensePlan.totalCostPA} color="#ffffff" segmentWidth={8} />}
            </div>
          </article>
          {actions.attacks.map(({ acquisitionId, strike }) => strike && <article key={`${acquisitionId}:${strike.id}`} className={`bonus-toggle action-workspace-preview-card ${strike.note.length > 70 ? 'play-action-card-detailed' : 'play-action-card-compact'}`}><div className="bonus-toggle-header"><span className="bonus-toggle-label">{strike.name}</span></div><span className="bonus-toggle-value">{strike.description}{strike.costResource !== 'none' && strike.costValue ? ` [-${strike.costValue} ${strike.costResource}]` : ''}</span><div className="bt-footer"><span>{strike.note}</span><span>Prévia no modo de jogo</span></div></article>)}
        </>}
        {activeTab === 'techniques' && (actions.techniques.length > 0 ? actions.techniques.map(renderBonus) : <EmptyState category="técnicas" guidance="Adquira técnicas em Editar Ficha." />)}
        {activeTab === 'modifiers' && <>{actions.modifiers.length > 0 ? actions.modifiers.map(renderBonus) : <EmptyState category="modificadores ou bônus" guidance="Adicione um preset, prepare uma magia ou crie um bônus customizado." />}<div className="action-workspace-create"><button type="button" className="bonus-add-btn" onClick={() => setIsPresetModalOpen(true)}><BookIcon /> Preset do Livro</button><button type="button" className="bonus-add-btn" onClick={addCustomBonus}><PlusIcon /> Bônus Custom</button>{selectedKitId === 'mago' && <button type="button" className="bonus-add-btn" disabled={!canPrepareMagic} onClick={() => setIsPrepareMagicOpen(true)} title={canPrepareMagic ? 'Criar e pagar uma magia preparada' : 'Recupere todos os PM disponíveis antes de preparar'}><WandSparklesIcon size={16} /> Preparar Magia</button>}</div></>}
      </section>

      <footer className="action-workspace-footer"><button type="button" className="bonus-add-btn" onClick={() => setMode('edit')}>Editar Ficha</button><button type="button" className="btn-roll" onClick={() => setMode('play')}>Jogar</button></footer>

      {isPrepareMagicOpen && <div className="modal-overlay pop-in" style={{ zIndex: 360, alignItems: 'center' }} onClick={(event) => { if (event.target === event.currentTarget) setIsPrepareMagicOpen(false); }}><div className="modal-content prepared-magic-modal"><button type="button" className="modal-close" onClick={() => setIsPrepareMagicOpen(false)}><CloseIcon size={18} /></button><h2 className="panel-title">Preparar Magia</h2><p className="prepared-magic-help">Crie um bônus mágico. O custo é metade do bônus, arredondado para cima, e fica bloqueado até a magia ser usada.</p><div className="prepared-magic-form"><label>Nome da magia<input className="bonus-name-input" value={magicName} onChange={(event) => setMagicName(event.target.value)} placeholder="Ex.: Escudo Arcano" /></label><label>Teste afetado<select className="bonus-type-select" value={magicAttribute} onChange={(event) => setMagicAttribute(event.target.value as PreparedMagicDraft['attribute'])}><option value="any">Qualquer teste</option><option value="poder">Poder / ataque</option><option value="habilidade">Habilidade</option><option value="resistencia">Resistência / defesa</option></select></label><label>Bônus (máximo H+2 = {currentForm.habilidade + 2})<input type="number" className="bonus-value-input" min={1} max={currentForm.habilidade + 2} value={magicValue} onChange={(event) => setMagicValue(Math.max(1, Math.min(currentForm.habilidade + 2, Number(event.target.value) || 1)))} /></label><div className="prepared-magic-cost"><span>Custo da preparação</span><strong>{preparationCost} PM</strong></div><button type="button" className="btn-roll" disabled={!magicName.trim() || !canPrepareMagic || currentPM < preparationCost} onClick={() => { if (createPreparedMagic({ name: magicName, attribute: magicAttribute, value: magicValue })) { setMagicName(''); setMagicAttribute('any'); setMagicValue(2); setIsPrepareMagicOpen(false); } }}>Criar e Preparar</button></div></div></div>}
    </main>
  );
}

function EmptyState({ category, guidance }: { category: string; guidance: string }) {
  return <div className="action-workspace-empty"><strong>Nenhum item em {category}.</strong><span>{guidance}</span></div>;
}
