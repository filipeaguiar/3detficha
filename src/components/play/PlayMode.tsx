import { useState, useMemo } from 'react';
import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from '../../constants/advantagesData';
import { ADVANTAGE_VARIANT_OPTIONS, DISADVANTAGE_VARIANT_OPTIONS } from '../../constants/app/variants';
import { SKILLS_CATALOG } from '../../constants/skillsData';
import { createStrikeBonus, getActiveBonusVariant, getBonusSubtitle, getKnownStrikes, getKitPowerModifier } from '../../utils/character';
import { resolveActionPlan } from '../../utils/actionResolver';
import type { CharacterForm, CharacterKit, KitPower, RollBonus } from '../../types/character';
import SegmentedBar from '../common/SegmentedBar';
import { CheckIcon, ZapIcon, HourglassIcon, SquareIcon, CheckSquareIcon, CloseIcon, DiceCountIcon, HabilidadeIcon, InfoIcon, LeafIcon, MaskIcon, MenuIcon, PoderIcon, ResistenciaIcon, SkillsIcon, SparklesIcon, TransformIcon, BookIcon, CrownIcon, TriangleDownIcon, SwordsIcon, ShieldIcon } from '../common/Icons';
import PlayAttacksSection from './PlayAttacksSection';
import PlayTechniquesSection from './PlayTechniquesSection';

type PlayModeProps = {
  characterName: string;
  currentKit: CharacterKit | null;
  currentKitNotes?: string[];
  currentKitUnsupportedNotes?: string[];
  currentArchetypeName?: string;
  currentArchetypeNotes?: string[];
  currentArchetypeUnsupportedNotes?: string[];
  currentForm: CharacterForm;
  forms: CharacterForm[];
  activeFormIndex: number;
  selectedKitId: string;
  accentColor: string;
  currentPV: number;
  currentPM: number;
  currentPA: number;
  maxPV: number;
  maxPM: number;
  maxPA: number;
  totalCostPV: number;
  totalCostPM: number;
  totalCostPA: number;
  activeKitActionPowers: KitPower[];
  activeKitBuffs: Set<string>;
  usedKitPowers: Record<string, number>;
  activeBonuses: Set<string>;
  visibleRollBonuses: RollBonus[];
  allowedAttributes: { poder: boolean; habilidade: boolean; resistencia: boolean };
  rolling: boolean;
  poder: number;
  habilidade: number;
  resistencia: number;
  calculatedTotalExtraDice: number;
  manualBonusDice: 0 | 1 | 2;
  setManualBonusDice: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  setIsDrawerOpen: (open: boolean) => void;
  setCurrentPM: React.Dispatch<React.SetStateAction<number>>;
  setActiveFormIndex: (index: number) => void;
  setIsTransformModalOpen: (open: boolean) => void;
  setIsKitInfoModalOpen: (open: boolean) => void;
  setIsEditingStats: (open: boolean) => void;
  handleUseKitPower: (power: KitPower) => void;
  handleRoll: (attrName: 'poder' | 'habilidade' | 'resistencia', options?: { extraDice?: number; label?: string; costPM?: number; actionType?: 'attack' | 'defense' | 'general'; skillId?: string }) => void;
  toggleActiveBonus: (id: string) => void;
  cycleBonusVariant: (id: string) => void;
  activateStrike: (bonus: RollBonus) => void;
  configureAssistedBonus: (id: string, updates: NonNullable<RollBonus['assistedState']>) => void;
  endAssistedBonus: (id: string) => void;
  maintainTemporaryPackage: (id: string) => void;
};

export default function PlayMode(props: PlayModeProps) {
  const [detailModal, setDetailModal] = useState<{ title: string; subtitle?: string; body: string; tone: 'advantage' | 'skill' | 'disadvantage' | 'technique' } | null>(null);
  const [comboUsedStrikeIds, setComboUsedStrikeIds] = useState<string[]>([]);
  const [comboActive, setComboActive] = useState(false);
  const [isCharInfoOpen, setIsCharInfoOpen] = useState(false);
  const [showGeneralRolls, setShowGeneralRolls] = useState(false);
  const {
    characterName,
    currentKit,
    currentKitNotes,
    currentKitUnsupportedNotes,
    currentArchetypeName,
    currentArchetypeNotes,
    currentArchetypeUnsupportedNotes,
    currentForm,
    forms,
    activeFormIndex,
    selectedKitId,
    currentPV,
    currentPM,
    currentPA,
    maxPV,
    maxPM,
    maxPA,
    totalCostPV,
    totalCostPM,
    totalCostPA,
    activeKitActionPowers,
    activeKitBuffs,
    usedKitPowers,
    activeBonuses,
    visibleRollBonuses,
    allowedAttributes,
    rolling,
    poder,
    habilidade,
    resistencia,
    calculatedTotalExtraDice,
    setManualBonusDice,
    setIsDrawerOpen,
    setActiveFormIndex,
    setIsTransformModalOpen,
    setIsKitInfoModalOpen,
    setIsEditingStats,
    handleUseKitPower,
    handleRoll,
    toggleActiveBonus,
    cycleBonusVariant,
    activateStrike,
    configureAssistedBonus,
    endAssistedBonus,
    maintainTemporaryPackage,
  } = props;

  const attackActions = getKnownStrikes(currentForm);
  const hasLuta = (currentForm.skills || []).includes('luta');
  const hasMistica = (currentForm.skills || []).includes('mistica');
  const hasMagia = (currentForm.advantages || []).some((advantageId) => advantageId.split('::')[0] === 'magia');
  const usesMisticaForCombat = !hasLuta && hasMistica && hasMagia;
  const hasCombatSkill = hasLuta || usesMisticaForCombat;
  const attributeColor = (attribute: 'poder' | 'habilidade' | 'resistencia') => attribute === 'poder' ? '#FF9E00' : attribute === 'habilidade' ? '#894EC6' : '#5EB05D';
  const techniqueActions = visibleRollBonuses.filter((bonus) => bonus.sourceCatalogId !== 'golpes');
  const hasCombo = (currentForm.rollBonuses || []).some((bonus) => bonus.name === 'Combo');
  const comboRemaining = Math.max(0, habilidade - comboUsedStrikeIds.length);

  const attackPlan = useMemo(() => {
    return resolveActionPlan(
      {
        actionType: 'attack',
        targetAttribute: 'poder',
        selectedSkill: hasCombatSkill ? (hasLuta ? 'luta' : 'mistica') : undefined,
        activeBonusIds: activeBonuses,
        manualBonusDice: 0,
        manualCritRange: 6,
      },
      {
        currentForm,
        rollBonuses: visibleRollBonuses,
        currentPV,
        currentPM,
        currentPA,
      }
    );
  }, [currentForm, visibleRollBonuses, activeBonuses, currentPV, currentPM, currentPA, hasCombatSkill, hasLuta]);

  const defensePlan = useMemo(() => {
    return resolveActionPlan(
      {
        actionType: 'defense',
        targetAttribute: 'resistencia',
        selectedSkill: hasCombatSkill ? (hasLuta ? 'luta' : 'mistica') : undefined,
        activeBonusIds: activeBonuses,
        manualBonusDice: 0,
        manualCritRange: 6,
      },
      {
        currentForm,
        rollBonuses: visibleRollBonuses,
        currentPV,
        currentPM,
        currentPA,
      }
    );
  }, [currentForm, visibleRollBonuses, activeBonuses, currentPV, currentPM, currentPA, hasCombatSkill, hasLuta]);

  return (
    <div style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg-color)' }}>
        <div className="slide-up" style={{ display: 'flex', gap: '1rem', padding: '0.8rem', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', borderTop: '2px solid var(--accent-color)', position: 'relative', animationDelay: '0.05s', zIndex: 20 }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', zIndex: 50 }}>
            <button onClick={() => setIsDrawerOpen(true)} className="hud-menu-trigger" title="Menu do Personagem (Deslize para a direita ou clique)">
              <MenuIcon />
            </button>
          </div>

          <div
            style={{ width: '90px', height: '110px', backgroundColor: 'var(--surface-hover)', border: '3px solid var(--accent-color)', transform: 'skewX(-10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px var(--accent-transparent)', overflow: 'hidden', position: 'relative', cursor: forms.length > 1 ? 'pointer' : 'default' }}
            onClick={() => {
              if (forms.length > 1) {
                const nextIndex = (activeFormIndex + 1) % forms.length;
                setActiveFormIndex(nextIndex);
                if (['druida', 'gigante_da_luz', 'guerreira_magica', 'alquimista'].includes(selectedKitId) && nextIndex > 0) {
                  setIsTransformModalOpen(true);
                }
              }
            }}
            title={forms.length > 1 ? `Clique para transformar: Próxima forma (${forms[(activeFormIndex + 1) % forms.length].name})` : currentForm.name}
          >
            {currentForm.avatarUrl ? (
              <img src={currentForm.avatarUrl} alt={currentForm.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'skewX(10deg) scale(1.15)' }} />
            ) : (
              <div style={{ transform: 'skewX(10deg)', fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--accent-color)', fontFamily: 'Bebas Neue, sans-serif' }}>
                {characterName ? characterName.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            {forms.length > 1 && (
              <div className="avatar-transform-indicator" title="Clique para transformar">
                <TransformIcon size={12} />
              </div>
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingRight: '2.5rem', transform: 'translateX(6px)' }}>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', margin: '0', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '2px 2px 0px #000' }}>
                {characterName || 'HERÓI DESCONHECIDO'}
              </h1>
              {currentKit && (
                <button className="kit-pill-badge" onClick={() => setIsKitInfoModalOpen(true)} title="Ver detalhes dos poderes do Kit">
                  <span>{currentKit.name}</span>
                  <InfoIcon />
                </button>
              )}
            </div>

            <SegmentedBar current={currentPV} max={maxPV} color="#5EB05D" onClick={() => setIsEditingStats(true)} pulseCount={totalCostPV} offsetX={2} />
            <SegmentedBar current={currentPM} max={maxPM} color="#894EC6" onClick={() => setIsEditingStats(true)} pulseCount={totalCostPM} offsetX={-2} />
            <SegmentedBar current={currentPA} max={maxPA} color="#FF9E00" onClick={() => setIsEditingStats(true)} halfWidth={true} pulseCount={totalCostPA} offsetX={-6} />
          </div>
        </div>

        <div style={{ display: 'flex', width: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', borderBottom: '2px solid var(--accent-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', marginBottom: '1rem' }}>
          {(currentKit || currentArchetypeName || (currentForm.advantages && currentForm.advantages.length > 0) || (currentForm.skills && currentForm.skills.length > 0) || (currentForm.disadvantages && currentForm.disadvantages.length > 0)) && (
            <button
              type="button"
              className="play-header-tab-btn"
              style={{ flex: 1, padding: '0.4rem 0', margin: 0, border: 'none', background: 'transparent', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', outline: 'none' }}
              onClick={() => setIsCharInfoOpen(prev => !prev)}
            >
              <TriangleDownIcon size={9} className={`char-info-triangle ${isCharInfoOpen ? 'rotated' : ''}`} />
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}>PERSONAGEM</span>
            </button>
          )}

          <div style={{ width: '2px', backgroundColor: 'var(--accent-color)', transform: 'skewX(-10deg)' }} />

          <button
            type="button"
            className="play-header-tab-btn"
            style={{ flex: 1, padding: '0.4rem 0', margin: 0, border: 'none', background: 'transparent', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', outline: 'none' }}
            onClick={() => setShowGeneralRolls(open => !open)}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}>OUTROS TESTES</span>
            <TriangleDownIcon size={9} className={`char-info-triangle ${showGeneralRolls ? 'rotated' : ''}`} />
          </button>
        </div>
      </div>

      {activeKitActionPowers.length > 0 && (
        <div className="kit-actions-compact-row slide-up">
          {activeKitActionPowers.map((power) => {
            const isActiveBuff = activeKitBuffs.has(power.id);
            const useCount = usedKitPowers[power.id] || 0;
            const isAvailable = useCount === 0;
            const mod = getKitPowerModifier(power);

            let statusTag: React.ReactNode = null;
            if (isActiveBuff) {
              const attrLetter = mod.attribute === 'poder' ? 'P' : mod.attribute === 'habilidade' ? 'H' : mod.attribute === 'resistencia' ? 'R' : '';
              statusTag = <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}><CheckIcon size={11} /> ATIVO {mod.value ? `(+${mod.value}${attrLetter})` : ''}</span>;
            } else if (mod.bonusType !== 'none') {
              const attrLetter = mod.attribute === 'poder' ? 'P' : mod.attribute === 'habilidade' ? 'H' : mod.attribute === 'resistencia' ? 'R' : '';
              const costDisp = power.costPM !== undefined ? power.costPM : 3;
              // Visual slanted rectangle indicator using SegmentedBar
              const visualCost = <SegmentedBar current={costDisp} max={costDisp} color={isActiveBuff ? "#ffffff" : "#894EC6"} />;
              statusTag = <>
                {mod.value ? `+${mod.value}${attrLetter}` : ''} {visualCost}
              </>;
            } else if (power.type === 'per_scene') {
              const repeatCost = power.repeatCostPM !== undefined ? power.repeatCostPM : 3;
              statusTag = isAvailable ? '1/1 Cena' : (repeatCost === -1 ? 'Var. PM' : `-${repeatCost}PM`);
            } else if (power.type === 'per_session') {
              const sessionCost = power.costPM !== undefined ? power.costPM : 3;
              statusTag = isAvailable ? (sessionCost === -1 ? 'Var. PM' : `-${sessionCost}PM`) : 'Usado';
            } else {
              const normalCost = power.costPM !== undefined ? power.costPM : 2;
              statusTag = normalCost === -1 ? 'Var. PM' : `-${normalCost}PM`;
            }

            return (
              <button key={power.id} className={`kit-compact-power-btn ${isActiveBuff ? 'active-buff' : isAvailable ? 'available' : 'used'}`} onClick={() => handleUseKitPower(power)} title={`${power.name}: ${power.desc}${power.unsupportedNotes?.length ? ` | Manual/Narrador: ${power.unsupportedNotes.join(' • ')}` : ''}`}>
                <span className="power-btn-name">{power.name}</span>
                <span className="power-btn-tag">{statusTag}</span>
              </button>
            );
          })}

          {selectedKitId === 'druida' && activeFormIndex > 0 && (
            <button className="kit-compact-power-btn available" style={{ borderColor: '#5EB05D', color: '#5EB05D', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }} onClick={() => setIsTransformModalOpen(true)} title="Configurar as 2 vantagens extras da Forma Selvagem">
              <LeafIcon size={14} />
              <span className="power-btn-name">Vantagens Fera</span>
              <span className="power-btn-tag">{currentForm.wildShapeAdvantages?.length || 0}/2</span>
            </button>
          )}
        </div>
      )}

      <PlayAttacksSection comboControls={hasCombo ? <div className="play-combo-controls"><div className="play-combo-status">Combo: {comboActive ? `${comboRemaining} extras restantes` : 'pronto para iniciar'}{comboUsedStrikeIds.length > 0 ? ` • usados: ${comboUsedStrikeIds.length}` : ''}</div><div className="play-combo-actions"><button className="control-btn editor-pill-btn" onClick={() => { setComboActive((active) => !active); if (comboActive) setComboUsedStrikeIds([]); }}>{comboActive ? 'Encerrar Combo' : 'Iniciar Combo'}</button><button className="control-btn editor-pill-btn" onClick={() => { setComboActive(false); setComboUsedStrikeIds([]); }}>Resetar</button></div></div> : undefined}>
              <div className="generic-combat-actions-grid">
                <button
                  type="button"
                  className={`bonus-toggle combat-action-button attack ${!attackPlan.canAfford || attackPlan.hasConflicts ? 'disabled-attribute' : ''}`}
                  style={{ '--combat-action-color': attributeColor(attackPlan.effectiveAttributeName) } as React.CSSProperties}
                  disabled={rolling || !attackPlan.canAfford || attackPlan.hasConflicts}
                  onClick={() => handleRoll(attackPlan.effectiveAttributeName, { label: 'Ataque', actionType: 'attack' })}
                  title={attackPlan.conflictMessage || (!attackPlan.canAfford ? 'Recursos insuficientes' : 'Rolar Ataque')}
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

                  <div className="action-corner bottom-right" style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '2px' }}>
                    {attackPlan.totalCostPM > 0 && (
                      <SegmentedBar
                        current={attackPlan.totalCostPM}
                        max={attackPlan.totalCostPM}
                        color="#ffffff"
                        segmentWidth={8}
                      />
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  className={`bonus-toggle combat-action-button defense ${!defensePlan.canAfford || defensePlan.hasConflicts ? 'disabled-attribute' : ''}`}
                  style={{ '--combat-action-color': attributeColor(defensePlan.effectiveAttributeName) } as React.CSSProperties}
                  disabled={rolling || !defensePlan.canAfford || defensePlan.hasConflicts}
                  onClick={() => handleRoll(defensePlan.effectiveAttributeName, { label: 'Defesa', actionType: 'defense' })}
                  title={defensePlan.conflictMessage || (!defensePlan.canAfford ? 'Recursos insuficientes' : 'Rolar Defesa')}
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

                  <div className="action-corner bottom-right" style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '2px' }}>
                    {defensePlan.totalCostPM > 0 && (
                      <SegmentedBar
                        current={defensePlan.totalCostPM}
                        max={defensePlan.totalCostPM}
                        color="#ffffff"
                        segmentWidth={8}
                      />
                    )}
                  </div>
                </button>
              </div>
              {attackActions.map(({ acquisitionId, strike }) => {
                if (!strike) return null;
                const comboLocked = hasCombo && comboActive && comboRemaining <= 0;
                const alreadyUsed = comboUsedStrikeIds.includes(strike.id);
                const subtitle = strike.description;
                const hint = strike.id === 'finta' ? 'Reação' : strike.id === 'derrubar' ? 'Escolha em mesa' : strike.id === 'golpe_atordoante' ? 'Exige dano > R' : strike.id === 'golpe_debilitante' ? 'Escolha atributo em mesa' : strike.id === 'recuperar_folego' ? 'Ação imediata' : undefined;
                const cardSizeClass = hint || subtitle.length > 70 ? 'play-action-card-detailed' : 'play-action-card-compact';
                return (
                  <button key={`${acquisitionId}:${strike.id}`} className={`bonus-toggle ${cardSizeClass} ${alreadyUsed ? 'active' : ''}`} disabled={(comboActive && (comboLocked || alreadyUsed)) || false} onClick={() => { activateStrike(createStrikeBonus(strike, acquisitionId)); if (hasCombo && comboActive) setComboUsedStrikeIds((prev) => prev.includes(strike.id) ? prev : [...prev, strike.id]); }} onContextMenu={(e) => { e.preventDefault(); setDetailModal({ title: strike.name, subtitle, body: strike.note, tone: 'technique' }); }} title={`${strike.name}: ${subtitle}`}>
                    <div className="bonus-toggle-header">
                      <span className="bonus-toggle-label">{strike.name}</span>
                      {hint ? <span className="bonus-attr-micro" style={{ background: '#ff8fab', color: '#000' }}>{hint}</span> : null}
                      {hasCombo && comboActive ? <span className="bonus-attr-micro" style={{ background: alreadyUsed ? '#ffd166' : '#33ccff', color: '#000' }}>{alreadyUsed ? 'USADO' : comboUsedStrikeIds.length === 0 ? 'ABRE' : 'COMBO'}</span> : null}
                    </div>
                    <div className="bt-body" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', width: '100%', padding: '0.25rem 0.75rem 0.75rem' }}>
                      <span className="bt-effect" style={{ flex: 1, textAlign: 'left', fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.3, color: 'var(--text-main)' }}>{subtitle}</span>
                      {strike.costResource === 'PM' && strike.costValue ? (
                        <SegmentedBar current={strike.costValue} max={strike.costValue} color={alreadyUsed ? "#ffffff" : "#894EC6"} segmentWidth={8} />
                      ) : strike.costResource !== 'none' && strike.costValue ? (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>[-{strike.costValue}{strike.costResource}]</span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
          </PlayAttacksSection>

      {/* Character Info Drawer */}
      <div className={`play-drawer-section ${isCharInfoOpen ? 'open' : ''}`}>
        <div className="play-drawer-inner">
          <div className="char-info-card">
            {currentKit && (
              <div className="char-info-row">
                <span className="char-info-row-label">Kit</span>
                <div className="char-info-badge-group">
                  <button
                    type="button"
                    className="char-info-badge kit-badge"
                    onClick={() => setDetailModal({
                      title: `Kit — ${currentKit.name}`,
                      body: [...(currentKitNotes || []), ...(currentKitUnsupportedNotes || []).map(note => `Manual/Narrador: ${note}`)].join('\n\n') || 'Sem detalhes adicionais.',
                      tone: 'technique'
                    })}
                  >
                    <BookIcon size={13} />
                    <span>{currentKit.name}</span>
                  </button>
                </div>
              </div>
            )}

            {currentArchetypeName && (
              <div className="char-info-row">
                <span className="char-info-row-label">Arquétipo</span>
                <div className="char-info-badge-group">
                  <button
                    type="button"
                    className="char-info-badge archetype-badge"
                    onClick={() => setDetailModal({
                      title: `Arquétipo — ${currentArchetypeName}`,
                      body: [...(currentArchetypeNotes || []), ...(currentArchetypeUnsupportedNotes || []).map(note => `Manual/Narrador: ${note}`)].join('\n\n') || 'Sem detalhes adicionais.',
                      tone: 'technique'
                    })}
                  >
                    <CrownIcon size={13} />
                    <span>{currentArchetypeName}</span>
                  </button>
                </div>
              </div>
            )}

            {currentForm.advantages && currentForm.advantages.length > 0 && (
              <div className="char-info-row">
                <span className="char-info-row-label">Vantagens</span>
                <div className="char-info-badge-group">
                  {currentForm.advantages.map(id => {
                    const [baseId, variantKey] = id.split('::');
                    const adv = ADVANTAGES_CATALOG.find(a => a.id === baseId);
                    const variant = variantKey ? ADVANTAGE_VARIANT_OPTIONS[baseId]?.find(v => v.key === variantKey) : undefined;
                    const displayName = adv ? (variant ? `${adv.name} — ${variant.label}` : adv.name) : id;
                    const displayCost = variant?.cost || adv?.cost || '';
                    return adv ? (
                      <button
                        key={id}
                        type="button"
                        className="char-info-badge advantage-badge"
                        onClick={() => setDetailModal({
                          title: displayName,
                          subtitle: displayCost ? `Custo: ${displayCost}` : undefined,
                          body: adv.desc,
                          tone: 'advantage'
                        })}
                      >
                        <SparklesIcon size={12} />
                        <span>{displayName}</span>
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {currentForm.skills && currentForm.skills.length > 0 && (
              <div className="char-info-row">
                <span className="char-info-row-label">Perícias</span>
                <div className="char-info-badge-group">
                  {currentForm.skills.map(id => {
                    const skill = SKILLS_CATALOG.find(a => a.id === id);
                    return skill ? (
                      <button
                        key={id}
                        type="button"
                        className="char-info-badge skill-badge"
                        onClick={() => setDetailModal({
                          title: skill.name,
                          body: skill.desc,
                          tone: 'skill'
                        })}
                      >
                        <SkillsIcon size={12} />
                        <span>{skill.name}</span>
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {currentForm.disadvantages && currentForm.disadvantages.length > 0 && (
              <div className="char-info-row">
                <span className="char-info-row-label">Desvantagens</span>
                <div className="char-info-badge-group">
                  {currentForm.disadvantages.map(id => {
                    const [baseId, variantKey] = id.split('::');
                    const disadv = DISADVANTAGES_CATALOG.find(a => a.id === baseId);
                    const variant = variantKey ? DISADVANTAGE_VARIANT_OPTIONS[baseId]?.find(v => v.key === variantKey) : undefined;
                    const displayName = disadv ? (variant ? `${disadv.name} — ${variant.label}` : disadv.name) : id;
                    const displayCost = variant?.cost || disadv?.cost || '';
                    return disadv ? (
                      <button
                        key={id}
                        type="button"
                        className="char-info-badge disadvantage-badge"
                        onClick={() => setDetailModal({
                          title: displayName,
                          subtitle: displayCost ? `Custo: ${displayCost}` : undefined,
                          body: disadv.desc,
                          tone: 'disadvantage'
                        })}
                      >
                        <MaskIcon size={12} />
                        <span>{displayName}</span>
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* General Rolls Drawer */}
      <div className={`play-drawer-section ${showGeneralRolls ? 'open' : ''}`}>
        <div className="play-drawer-inner">
          <div className="play-general-rolls-content">
            <div className="stats-grid">
              <button className={`stat-box roll-btn ${!allowedAttributes.poder ? 'disabled-attribute' : ''}`} style={{ '--btn-color': '#FF9E00', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('poder', { actionType: 'general', label: 'Poder' })} disabled={rolling || !allowedAttributes.poder} title="Rolar teste de Poder">
                <div className="stat-icon-container"><PoderIcon /></div>
                <div className="stat-value corner">{poder + (currentForm.wildShapeAdvantages?.includes('Forte') ? 1 : 0)}</div>
              </button>
              <button className={`stat-box roll-btn ${!allowedAttributes.habilidade ? 'disabled-attribute' : ''}`} style={{ '--btn-color': '#894EC6', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('habilidade', { actionType: 'general', label: 'Habilidade' })} disabled={rolling || !allowedAttributes.habilidade} title="Rolar teste de Habilidade">
                <div className="stat-icon-container"><HabilidadeIcon /></div>
                <div className="stat-value corner">{habilidade}</div>
              </button>
              <button className={`stat-box roll-btn ${!allowedAttributes.resistencia ? 'disabled-attribute' : ''}`} style={{ '--btn-color': '#5EB05D', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('resistencia', { actionType: 'general', label: 'Resistência' })} disabled={rolling || !allowedAttributes.resistencia} title="Rolar teste de Resistência">
                <div className="stat-icon-container"><ResistenciaIcon /></div>
                <div className="stat-value corner">{resistencia + (currentForm.wildShapeAdvantages?.includes('Vigoroso') ? 2 : 0)}</div>
              </button>
            </div>

            <div className="play-manual-roll-controls">
              <button
                className={`toggle-btn ${calculatedTotalExtraDice !== 0 ? 'active' : ''}`}
                onClick={() => setManualBonusDice(prev => (prev >= 2 ? 0 : (prev + 1) as 0 | 1 | 2))}
                title={`Ajuste manual de dados: ${Math.max(1, Math.min(3, 1 + calculatedTotalExtraDice))}D (Ganho/Perda)`}
              >
                <DiceCountIcon count={Math.max(1, Math.min(3, 1 + calculatedTotalExtraDice)) as 1 | 2 | 3} size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

        {techniqueActions.length > 0 && (
          <PlayTechniquesSection>
              {techniqueActions.map((bonus) => {
                const isActive = activeBonuses.has(bonus.id);
                const activeVariant = getActiveBonusVariant(bonus);
                const isImmediate = !!(activeVariant?.immediateAction || bonus.immediateAction);
                const isPersistentAssisted = !!(activeVariant?.persistentAssisted || bonus.persistentAssisted);
                const isTemporaryPackage = !!(activeVariant?.temporaryPackage || bonus.temporaryPackage);
                const assistedConfig = activeVariant?.persistentAssisted || bonus.persistentAssisted;
                const temporaryConfig = activeVariant?.temporaryPackage || bonus.temporaryPackage;
                return (
                                    <div key={bonus.id} className={`bonus-toggle ${(isPersistentAssisted || isTemporaryPackage || (bonus.variants && bonus.variants.length > 1)) ? 'play-action-card-detailed' : 'play-action-card-compact'} ${isActive ? 'active' : ''}`} onClick={() => toggleActiveBonus(bonus.id)} onContextMenu={(e) => { e.preventDefault(); setDetailModal({ title: bonus.alias || bonus.name, subtitle: getBonusSubtitle(bonus), body: `${bonus.name !== (bonus.alias || bonus.name) ? `Base: ${bonus.name}\n\n` : ''}${activeVariant?.note || bonus.persistentAssisted?.note || bonus.temporaryPackage?.note || 'Técnica configurada nesta forma.'}`, tone: 'technique' }); }} title={`${bonus.alias || bonus.name}: ${getBonusSubtitle(bonus)}`}>
                    <div className="bt-top">
                      <div className="bt-title">
                        <span className="bt-name">{bonus.alias ? bonus.alias : bonus.name}</span>
                        {(() => {
                          const variantLabel = activeVariant?.label;
                          const isBaseVariant = !variantLabel || variantLabel.toLowerCase() === 'base' || variantLabel.toLowerCase() === 'normal' || variantLabel.toLowerCase() === 'padrão';
                          
                          if (!isBaseVariant) {
                            return <span className="bt-raw-name">{variantLabel}</span>;
                          } else if (bonus.alias && (!bonus.variants || bonus.variants.length <= 1)) {
                            return <span className="bt-raw-name">{bonus.name}</span>;
                          }
                          return null;
                        })()}
                      </div>
                      <div className="bt-badges">
                        {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: 'transparent', color: '#33ccff', padding: 0 }} title="Dura até o fim da cena"><HourglassIcon size={14} /></span>}
                        {isImmediate && <span className="bonus-attr-micro" style={{ background: 'transparent', color: '#ffd166', padding: 0 }} title="Ação Imediata"><ZapIcon size={14} /></span>}
                        {isPersistentAssisted && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ff8fab', color: '#000' }}>{bonus.assistedState?.active ? (assistedConfig?.statusLabel || 'ATIVO') : 'ASSISTIDO'}</span>}
                        {isTemporaryPackage && <span className="bonus-attr-micro" style={{ background: bonus.assistedState?.active ? '#7bd389' : '#ffd166', color: '#000' }}>{bonus.assistedState?.active ? (temporaryConfig?.statusLabel || 'PACOTE') : 'PACOTE'}</span>}
                        {bonus.gameplayPattern === 'prepared-magic' && <span className="bonus-attr-micro" style={{ background: 'transparent', color: bonus.assistedState?.prepared ? '#7bd389' : 'var(--text-muted)', padding: 0 }} title={bonus.assistedState?.prepared ? 'Magia Preparada' : 'Magia Despreparada'}>{bonus.assistedState?.prepared ? <CheckSquareIcon size={14} /> : <SquareIcon size={14} />}</span>}
                        {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ background: 'transparent', padding: 0, color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute === 'poder' ? <PoderIcon size={14} /> : bonus.attribute === 'habilidade' ? <HabilidadeIcon size={14} /> : <ResistenciaIcon size={14} />}</span>}
                      </div>
                    </div>
                    
                    {(() => {
                      const subtitleText = getBonusSubtitle(bonus);
                      return (
                        <div className="bt-body" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: subtitleText ? 'space-between' : 'flex-end', gap: '0.5rem' }}>
                          {subtitleText ? <span className="bt-effect">{subtitleText}</span> : null}
                          {(() => {
                            const effectiveCostValue = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : bonus.costValue;
                            const effectiveCostResource = activeVariant?.costResource || bonus.costResource;
                            if (bonus.gameplayPattern !== 'prepared-magic' && effectiveCostResource === 'PM' && effectiveCostValue && effectiveCostValue > 0) {
                              return <SegmentedBar current={effectiveCostValue} max={effectiveCostValue} color={isActive ? "#ffffff" : "#894EC6"} segmentWidth={8} />;
                            }
                            return null;
                          })()}
                        </div>
                      );
                    })()}

                    {(isPersistentAssisted || isTemporaryPackage || (bonus.variants && bonus.variants.length > 1 && bonus.gameplayPattern !== 'cycling-variant')) && (
                      <div className="bt-footer" onClick={(event) => event.stopPropagation()}>
                        {isPersistentAssisted && assistedConfig?.triggerCostValue ? <span>{assistedConfig.triggerLabel || 'Acionar'} [-{assistedConfig.triggerCostValue} {assistedConfig.triggerCostResource || 'PM'}]</span> : null}
                        {isPersistentAssisted && typeof bonus.assistedState?.stockCount === 'number' ? <span>Estoque: {bonus.assistedState.stockCount}</span> : null}
                        {isPersistentAssisted && assistedConfig?.kind === 'stock' && !bonus.assistedState?.active && assistedConfig.stockMaxAttribute ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><button type="button" className="bonus-remove-btn" onClick={() => { const current = bonus.assistedState?.configuredStock ?? assistedConfig.stockMin ?? 0; configureAssistedBonus(bonus.id, { configuredStock: Math.max(assistedConfig.stockMin ?? 0, current - 1) }); }}>−</button><span>Preparar: {bonus.assistedState?.configuredStock ?? assistedConfig.stockCount ?? assistedConfig.stockMin ?? 0}</span><button type="button" className="bonus-remove-btn" onClick={() => { const baseMaximum = assistedConfig.stockMaxAttribute === 'poder' ? poder : assistedConfig.stockMaxAttribute === 'resistencia' ? resistencia : habilidade; const multiplier = assistedConfig.stockMaxMultiplierAttribute === 'poder' ? poder : assistedConfig.stockMaxMultiplierAttribute === 'resistencia' ? resistencia : assistedConfig.stockMaxMultiplierAttribute === 'habilidade' ? habilidade : 1; const maximum = baseMaximum * multiplier; const current = bonus.assistedState?.configuredStock ?? assistedConfig.stockMin ?? 0; configureAssistedBonus(bonus.id, { configuredStock: Math.min(maximum, current + 1) }); }}>+</button></span> : null}
                        {isPersistentAssisted && bonus.assistedState?.active ? <span><button type="button" className="bonus-remove-btn" onClick={() => endAssistedBonus(bonus.id)}>Encerrar sem acionar</button></span> : null}
                        {isTemporaryPackage ? <span>{bonus.assistedState?.active ? `Pacote: ${(bonus.assistedState.packageChoices || []).map((id) => ADVANTAGES_CATALOG.find((advantage) => advantage.id === id)?.name || id).join(', ') || 'escolhas narrativas'}` : 'Ative o pacote assistido'}</span> : null}
                        {isTemporaryPackage && bonus.assistedState?.active && temporaryConfig?.maintenanceCostValue ? <span><button type="button" className="bonus-remove-btn" onClick={() => maintainTemporaryPackage(bonus.id)}>Manter [-{temporaryConfig.maintenanceCostValue} {temporaryConfig.maintenanceCostResource || 'PM'}]</button></span> : null}
                        {bonus.variants && bonus.variants.length > 1 && bonus.gameplayPattern !== 'cycling-variant' ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><button type="button" className="bonus-remove-btn" style={{ minWidth: 'auto' }} onClick={() => cycleBonusVariant(bonus.id)} title="Alternar variante">↻ Alternar Variante</button></span> : null}
                      </div>
                    )}
                  </div>
                );
              })}
          </PlayTechniquesSection>
        )}
      {detailModal && (
        <div className="modal-overlay pop-in" style={{ zIndex: 340, alignItems: 'center' }} onClick={(e) => { if (e.target === e.currentTarget) setDetailModal(null); }}>
          <div className="modal-content detail-modal-content">
            <button className="modal-close" onClick={() => setDetailModal(null)}><CloseIcon size={18} /></button>
            <div className={`detail-modal-badge ${detailModal.tone}`}>{detailModal.tone === 'advantage' ? 'Vantagem' : detailModal.tone === 'disadvantage' ? 'Desvantagem' : detailModal.tone === 'skill' ? 'Perícia' : 'Técnica'}</div>
            <h2 className="detail-modal-title">{detailModal.title}</h2>
            {detailModal.subtitle && <div className="detail-modal-subtitle">{detailModal.subtitle}</div>}
            <p className="detail-modal-body">{detailModal.body}</p>
            <button className="btn-roll" style={{ marginTop: '1rem' }} onClick={() => setDetailModal(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
