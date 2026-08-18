import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from '../../constants/advantagesData';
import { SKILLS_CATALOG } from '../../constants/skillsData';
import { getBonusSubtitle, getKitPowerModifier } from '../../utils/character';
import type { CharacterForm, CharacterKit, KitPower, RollBonus } from '../../types/character';
import SegmentedBar from '../common/SegmentedBar';
import { CheckIcon, DiceCountIcon, HabilidadeIcon, InfoIcon, LeafIcon, MaskIcon, MenuIcon, PoderIcon, ResistenciaIcon, SkillsIcon, SparklesIcon, TransformIcon } from '../common/Icons';

type PlayModeProps = {
  characterName: string;
  currentKit: CharacterKit | null;
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
  calculatedCritRange: number;
  manualBonusDice: 0 | 1 | 2;
  setManualBonusDice: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
  setManualCritRange: React.Dispatch<React.SetStateAction<5 | 6>>;
  setIsDrawerOpen: (open: boolean) => void;
  setCurrentPM: React.Dispatch<React.SetStateAction<number>>;
  setActiveFormIndex: (index: number) => void;
  setIsTransformModalOpen: (open: boolean) => void;
  setIsKitInfoModalOpen: (open: boolean) => void;
  setIsEditingStats: (open: boolean) => void;
  handleUseKitPower: (power: KitPower) => void;
  handleRoll: (attrName: 'poder' | 'habilidade' | 'resistencia') => void;
  toggleActiveBonus: (id: string) => void;
};

export default function PlayMode(props: PlayModeProps) {
  const {
    characterName,
    currentKit,
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
    calculatedCritRange,
    setManualBonusDice,
    setManualCritRange,
    setIsDrawerOpen,
    setCurrentPM,
    setActiveFormIndex,
    setIsTransformModalOpen,
    setIsKitInfoModalOpen,
    setIsEditingStats,
    handleUseKitPower,
    handleRoll,
    toggleActiveBonus,
  } = props;

  return (
    <div style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="slide-up" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '0.8rem', background: 'rgba(0,0,0,0.5)', borderTop: '2px solid var(--accent-color)', borderBottom: '2px solid var(--accent-color)', position: 'relative', animationDelay: '0.05s', zIndex: 20 }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex' }}>
          <button onClick={() => setIsDrawerOpen(true)} className="hud-menu-trigger" title="Menu do Personagem (Deslize para a direita ou clique)">
            <MenuIcon />
          </button>
        </div>

        <div
          style={{ width: '90px', height: '110px', backgroundColor: 'var(--surface-hover)', border: '3px solid var(--accent-color)', transform: 'skewX(-10deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px var(--accent-transparent)', overflow: 'hidden', position: 'relative', cursor: forms.length > 1 ? 'pointer' : 'default' }}
          onClick={() => {
            if (forms.length > 1) {
              if (currentPM >= 1) {
                setCurrentPM(prev => prev - 1);
                const nextIndex = (activeFormIndex + 1) % forms.length;
                setActiveFormIndex(nextIndex);
                if (['druida', 'gigante_da_luz', 'guerreira_magica', 'alquimista'].includes(selectedKitId) && nextIndex > 0) {
                  setIsTransformModalOpen(true);
                }
              } else {
                alert('PM insuficiente para mudar de forma (Custo: 1 PM).');
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingRight: '2.5rem' }}>
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

          <SegmentedBar current={currentPV} max={maxPV} color="#5EB05D" onClick={() => setIsEditingStats(true)} pulseCount={totalCostPV} />
          <SegmentedBar current={currentPM} max={maxPM} color="#894EC6" onClick={() => setIsEditingStats(true)} pulseCount={totalCostPM} />
          <SegmentedBar current={currentPA} max={maxPA} color="#FF9E00" onClick={() => setIsEditingStats(true)} halfWidth={true} pulseCount={totalCostPA} />
        </div>
      </div>

      {activeKitActionPowers.length > 0 && (
        <div className="kit-actions-compact-row slide-up">
          {activeKitActionPowers.map((power) => {
            const isActiveBuff = activeKitBuffs.has(power.id);
            const useCount = usedKitPowers[power.id] || 0;
            const isAvailable = useCount === 0;
            const mod = getKitPowerModifier(power);

            let statusTag: React.ReactNode = '';
            if (isActiveBuff) {
              const attrLetter = mod.attribute === 'poder' ? 'P' : mod.attribute === 'habilidade' ? 'H' : mod.attribute === 'resistencia' ? 'R' : '';
              statusTag = <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}><CheckIcon size={11} /> ATIVO {mod.value ? `(+${mod.value}${attrLetter})` : ''}</span>;
            } else if (mod.bonusType !== 'none') {
              const attrLetter = mod.attribute === 'poder' ? 'P' : mod.attribute === 'habilidade' ? 'H' : mod.attribute === 'resistencia' ? 'R' : '';
              statusTag = `${mod.value ? `+${mod.value}${attrLetter}` : ''} [${power.costPM || 3}PM]`;
            } else if (power.type === 'per_scene') {
              statusTag = isAvailable ? '1/1 Cena' : `-${power.repeatCostPM || 3}PM`;
            } else if (power.type === 'per_session') {
              statusTag = isAvailable ? `-${power.costPM || 3}PM` : 'Usado';
            } else {
              statusTag = `-${power.costPM || 2}PM`;
            }

            return (
              <button key={power.id} className={`kit-compact-power-btn ${isActiveBuff ? 'active-buff' : isAvailable ? 'available' : 'used'}`} onClick={() => handleUseKitPower(power)} title={`${power.name}: ${power.desc}`}>
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

      <div className="panel slide-up" style={{ animationDelay: '0.15s', width: '100%' }}>
        <div className="stats-grid">
          <button className={`stat-box roll-btn ${!allowedAttributes.poder ? 'disabled-attribute' : ''}`} style={{ '--btn-color': '#FF9E00', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('poder')} disabled={rolling || !allowedAttributes.poder} title={!allowedAttributes.poder ? 'Desabilitado pela técnica selecionada' : 'Rolar Poder'}>
            <div className="stat-icon-container"><PoderIcon /></div>
            <div className="stat-value corner">{poder + (currentForm.wildShapeAdvantages?.includes('Forte') ? 1 : 0)}</div>
          </button>
          <button className={`stat-box roll-btn ${!allowedAttributes.habilidade ? 'disabled-attribute' : ''}`} style={{ '--btn-color': '#894EC6', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('habilidade')} disabled={rolling || !allowedAttributes.habilidade} title={!allowedAttributes.habilidade ? 'Desabilitado pela técnica selecionada' : 'Rolar Habilidade'}>
            <div className="stat-icon-container"><HabilidadeIcon /></div>
            <div className="stat-value corner">{habilidade}</div>
          </button>
          <button className={`stat-box roll-btn ${!allowedAttributes.resistencia ? 'disabled-attribute' : ''}`} style={{ '--btn-color': '#5EB05D', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('resistencia')} disabled={rolling || !allowedAttributes.resistencia} title={!allowedAttributes.resistencia ? 'Desabilitado pela técnica selecionada' : 'Rolar Resistência'}>
            <div className="stat-icon-container"><ResistenciaIcon /></div>
            <div className="stat-value corner">{resistencia + (currentForm.wildShapeAdvantages?.includes('Vigoroso') ? 2 : 0)}</div>
          </button>
        </div>

        {((currentForm.advantages && currentForm.advantages.length > 0) || (currentForm.disadvantages && currentForm.disadvantages.length > 0) || (currentForm.skills && currentForm.skills.length > 0)) && (
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
            {currentForm.advantages?.map(id => {
              const adv = ADVANTAGES_CATALOG.find(a => a.id === id);
              return adv ? <button key={id} onClick={() => alert(`${adv.name}\n\nCusto: ${adv.cost}\n\n${adv.desc}`)} style={{ background: 'var(--accent-color)', border: 'none', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><SparklesIcon size={12} />{adv.name}</button> : null;
            })}
            {currentForm.skills?.map(id => {
              const skill = SKILLS_CATALOG.find(a => a.id === id);
              return skill ? <button key={id} onClick={() => alert(`${skill.name}\n\n${skill.desc}`)} style={{ background: '#33ccff', border: 'none', color: '#000', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><SkillsIcon size={12} />{skill.name}</button> : null;
            })}
            {currentForm.disadvantages?.map(id => {
              const disadv = DISADVANTAGES_CATALOG.find(a => a.id === id);
              return disadv ? <button key={id} onClick={() => alert(`${disadv.name}\n\nCusto: ${disadv.cost}\n\n${disadv.desc}`)} style={{ background: '#ff4d4d', border: 'none', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><MaskIcon size={12} />{disadv.name}</button> : null;
            })}
          </div>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />

        <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Modificadores de Rolagem</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className={`toggle-btn ${calculatedTotalExtraDice !== 0 ? 'active' : ''}`} onClick={() => setManualBonusDice(prev => (prev >= 2 ? 0 : (prev + 1) as 0 | 1 | 2))} title={`Rolagem: ${1 + calculatedTotalExtraDice}D (${calculatedTotalExtraDice > 0 ? 'Fica com o Maior' : 'Normal'})`}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: calculatedTotalExtraDice > 0 ? '#5EB05D' : 'inherit' }}>
              <DiceCountIcon count={(1 + calculatedTotalExtraDice) as 1 | 2 | 3} size={16} />
            </div>
          </button>

          <button className={`toggle-btn ${calculatedCritRange < 6 ? 'active' : ''}`} onClick={() => setManualCritRange(prev => (prev === 6 ? 5 : 6))} title={`Intervalo de Acerto Crítico: ${calculatedCritRange === 6 ? '6' : `${calculatedCritRange}+`}`}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
              {calculatedCritRange === 6 ? '6' : `${calculatedCritRange}+`}
            </span>
          </button>
        </div>

        {visibleRollBonuses.length > 0 && (
          <div className="form-group">
            <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Técnicas & Bônus</h2>
            <div className="bonus-toggles-grid">
              {visibleRollBonuses.map((bonus) => {
                const isActive = activeBonuses.has(bonus.id);
                return (
                  <button key={bonus.id} className={`bonus-toggle ${isActive ? 'active' : ''}`} onClick={() => toggleActiveBonus(bonus.id)} title={`${bonus.alias || bonus.name}: ${getBonusSubtitle(bonus)}`}>
                    <div className="bonus-toggle-header">
                      <span className="bonus-toggle-label">{bonus.alias ? bonus.alias : bonus.name}</span>
                      {bonus.duration === 'scene' && <span className="bonus-attr-micro" style={{ background: '#33ccff', color: '#000' }}>CENA</span>}
                      {bonus.attribute !== 'any' && <span className="bonus-attr-micro" style={{ color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>{bonus.attribute.charAt(0).toUpperCase()}</span>}
                    </div>
                    {bonus.alias && <span className="bonus-toggle-raw-name">{bonus.name}</span>}
                    <span className="bonus-toggle-value">{getBonusSubtitle(bonus)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
