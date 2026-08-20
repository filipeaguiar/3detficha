import { useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from '../../constants/advantagesData';
import { ARCHETYPES_CATALOG } from '../../constants/app/archetypes';
import { SKILLS_CATALOG } from '../../constants/skillsData';
import { TECHNIQUES_CATALOG } from '../../constants/app/techniques';
import { STRIKES_CATALOG } from '../../constants/app/strikes';
import { createTechniqueBonusFromCatalog, getBonusSubtitle, getKnownStrikes, getXPCreditSummary, isTechniqueEligible } from '../../utils/character';
import { ADVANTAGE_VARIANT_OPTIONS, DISADVANTAGE_VARIANT_OPTIONS } from '../../constants/app/variants';
import type { CharacterArchetype, CharacterForm, CharacterKit, CharacterSheet, RollBonus } from '../../types/character';
import { BookIcon, CameraIcon, CheckIcon, CloseIcon, LeafIcon, PencilIcon, PlusIcon, TabAdvantagesIcon, TabAttributesIcon, TabConceptIcon, TabDisadvantagesIcon, TabSkillsIcon, TabTechniquesIcon, TrashIcon, UsersIcon, WandSparklesIcon } from '../common/Icons';

export type EditorTab = 'concept' | 'attributes' | 'advantages' | 'disadvantages' | 'skills' | 'techniques';

type CharacterEditorProps = {
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
  totalPoints: number;
  setIsSheetsModalOpen: (open: boolean) => void;
  characterName: string;
  updateActiveSheet: (updates: Partial<CharacterSheet>) => void;
  currentKit: CharacterKit | null;
  currentArchetype: CharacterArchetype | null;
  setIsKitSelectModalOpen: (open: boolean) => void;
  accentColor: string;
  forms: CharacterForm[];
  activeFormIndex: number;
  setActiveFormIndex: (index: number) => void;
  addTransformationForm: () => void;
  removeCurrentForm: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  currentForm: CharacterForm;
  updateCurrentForm: (updates: Partial<CharacterForm>) => void;
  removeAvatar: () => void;
  selectedKitId: string;
  selectedArchetypeId: string;
  setIsTransformModalOpen: (open: boolean) => void;
  poder: number;
  habilidade: number;
  resistencia: number;
  maisVida: number;
  maisMana: number;
  maisAcao: number;
  visibleRollBonuses: RollBonus[];
  setEditingBonusId: (id: string | null) => void;
  removeRollBonus: (id: string) => void;
  setIsPresetModalOpen: (open: boolean) => void;
  addCustomBonus: () => void;
  setIsPrepMagicModalOpen: (open: boolean) => void;
  setMode: (mode: 'edit' | 'play') => void;
};

const EDITOR_TABS: Array<{ id: EditorTab; label: string; icon: React.ReactNode }> = [
  { id: 'concept', label: 'Conceito', icon: <TabConceptIcon size={15} /> },
  { id: 'attributes', label: 'Atributos', icon: <TabAttributesIcon size={15} /> },
  { id: 'advantages', label: 'Vantagens', icon: <TabAdvantagesIcon size={15} /> },
  { id: 'disadvantages', label: 'Desvantagens', icon: <TabDisadvantagesIcon size={15} /> },
  { id: 'skills', label: 'Perícias', icon: <TabSkillsIcon size={15} /> },
  { id: 'techniques', label: 'Técnicas', icon: <TabTechniquesIcon size={15} /> }
];

export default function CharacterEditor(props: CharacterEditorProps) {
  const [advantageSearch, setAdvantageSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [techniqueSearch, setTechniqueSearch] = useState('');
  const [showUnavailableTechniques, setShowUnavailableTechniques] = useState(false);
  const [pendingStrikeSelections, setPendingStrikeSelections] = useState<string[]>([]);

  const {
    activeTab,
    setActiveTab,
    totalPoints,
    setIsSheetsModalOpen,
    characterName,
    updateActiveSheet,
    currentKit,
    currentArchetype,
    setIsKitSelectModalOpen,
    accentColor,
    forms,
    activeFormIndex,
    setActiveFormIndex,
    addTransformationForm,
    removeCurrentForm,
    fileInputRef,
    currentForm,
    updateCurrentForm,
    removeAvatar,
    selectedKitId,
    selectedArchetypeId,
    setIsTransformModalOpen,
    poder,
    habilidade,
    resistencia,
    maisVida,
    maisMana,
    maisAcao,
    visibleRollBonuses,
    setEditingBonusId,
    removeRollBonus,
    setIsPresetModalOpen,
    addCustomBonus,
    setIsPrepMagicModalOpen,
    setMode,
  } = props;

  const expandedAdvantages = useMemo(() => {
    return ADVANTAGES_CATALOG.flatMap((adv) => {
      const variants = ADVANTAGE_VARIANT_OPTIONS[adv.id];
      if (!variants || variants.length === 0) return [{ ...adv, variantId: adv.id, displayName: adv.name, displayCost: adv.cost }];
      return variants.map((variant) => ({
        ...adv,
        variantId: `${adv.id}::${variant.key}`,
        displayName: `${adv.name} — ${variant.label}`,
        displayCost: variant.cost || adv.cost,
      }));
    });
  }, []);

  const expandedDisadvantages = useMemo(() => {
    return DISADVANTAGES_CATALOG.flatMap((disadv) => {
      const variants = DISADVANTAGE_VARIANT_OPTIONS[disadv.id];
      if (!variants || variants.length === 0) return [{ ...disadv, variantId: disadv.id, displayName: disadv.name, displayCost: disadv.cost }];
      return variants.map((variant) => ({
        ...disadv,
        variantId: `${disadv.id}::${variant.key}`,
        displayName: `${disadv.name} — ${variant.label}`,
        displayCost: variant.cost || disadv.cost,
      }));
    });
  }, []);

  const normalizedAdvSearch = advantageSearch.trim().toLowerCase();
  const normalizedSkillSearch = skillSearch.trim().toLowerCase();
  const normalizedTechniqueSearch = techniqueSearch.trim().toLowerCase();
  const xpCredits = getXPCreditSummary(currentForm);
  const knownStrikes = getKnownStrikes(currentForm);
  const areaAdvantageOptions = useMemo(() => ADVANTAGES_CATALOG.map((advantage) => ({ ...advantage, pointCost: Number(advantage.cost.match(/^\d+/)?.[0] || 0) })).filter((advantage) => advantage.pointCost === 1 || advantage.pointCost === 2), []);
  const updateOwnedBonus = (id: string, updates: Partial<RollBonus>) => updateCurrentForm({ rollBonuses: (currentForm.rollBonuses || []).map((bonus) => bonus.id === id ? { ...bonus, ...updates } : bonus) });
  const filteredAdvantages = expandedAdvantages.filter((adv) => normalizedAdvSearch === '' || adv.displayName.toLowerCase().includes(normalizedAdvSearch) || adv.desc.toLowerCase().includes(normalizedAdvSearch));
  const filteredDisadvantages = expandedDisadvantages.filter((disadv) => normalizedAdvSearch === '' || disadv.displayName.toLowerCase().includes(normalizedAdvSearch) || disadv.desc.toLowerCase().includes(normalizedAdvSearch));
  const filteredSkills = SKILLS_CATALOG.filter((skill) => normalizedSkillSearch === '' || skill.name.toLowerCase().includes(normalizedSkillSearch) || skill.desc.toLowerCase().includes(normalizedSkillSearch));
  const filteredTechniques = TECHNIQUES_CATALOG.filter((technique) => {
    const eligibility = isTechniqueEligible(currentForm, technique);
    const matchesSearch = normalizedTechniqueSearch === '' || technique.name.toLowerCase().includes(normalizedTechniqueSearch) || technique.description.toLowerCase().includes(normalizedTechniqueSearch);
    return matchesSearch && (showUnavailableTechniques || eligibility.eligible);
  });

  return (
    <div className="panel slide-up editor-panel" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', maxWidth: '650px', margin: '0 auto', width: '100%' }}>
      <div className="editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className="panel-title" style={{ margin: 0 }}>Cadastro da Ficha</h1>

        <div className="editor-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--surface-color)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius)', border: `1px solid ${totalPoints > 10 ? 'var(--danger-color)' : 'var(--border-color)'}` }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>PONTOS:</span>
            <strong style={{ fontSize: '1.2rem', color: totalPoints > 10 ? 'var(--danger-color)' : 'var(--accent-color)', fontFamily: 'Bebas Neue, sans-serif' }}>
              {totalPoints} / 10
            </strong>
          </div>
          <button
            className="control-btn"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
            onClick={() => setIsSheetsModalOpen(true)}
          >
            <UsersIcon /> Trocar Ficha
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', marginBottom: '1.5rem', overflowX: 'auto', whiteSpace: 'nowrap', gap: '0.5rem', paddingBottom: '0.5rem' }}>
        {EDITOR_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.6rem 1rem',
              background: activeTab === tab.id ? 'var(--surface-hover)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--accent-color)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-muted)',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
              borderRadius: '4px 4px 0 0'
            }}
          >
            <span className="editor-tab-icon" aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: activeTab === 'concept' ? 'block' : 'none' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>NOME DO PERSONAGEM</div>
          <input
            type="text"
            value={characterName}
            onChange={(e) => updateActiveSheet({ characterName: e.target.value })}
            placeholder="Seu Nome Aqui"
            style={{
              width: '100%',
              background: 'var(--surface-hover)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              color: 'var(--accent-color)',
              fontSize: '2rem',
              fontFamily: 'Bebas Neue, sans-serif',
              textAlign: 'center',
              outline: 'none',
              padding: '0.5rem',
              transition: 'var(--transition)'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem', background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="stat-label" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>ARQUÉTIPO</span>
          </div>
          <select
            className="bonus-type-select"
            style={{ width: '100%', fontSize: '1rem', background: 'var(--surface-hover)', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            value={selectedArchetypeId}
            onChange={(e) => updateActiveSheet({ selectedArchetypeId: e.target.value })}
          >
            {ARCHETYPES_CATALOG.map((archetype) => (
              <option key={archetype.id} value={archetype.id}>{archetype.name} ({archetype.cost}pt)</option>
            ))}
          </select>
          {currentArchetype && (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
              <strong style={{ color: '#fff' }}>{currentArchetype.name}</strong> • {currentArchetype.group} • {currentArchetype.cost}pt
              <div style={{ marginTop: '0.25rem' }}>{currentArchetype.desc}</div>
              {currentArchetype.traits.length > 0 && <div style={{ marginTop: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Traços:</strong> {currentArchetype.traits.join(', ')}</div>}
              {currentArchetype.grantedAdvantages && currentArchetype.grantedAdvantages.length > 0 && <div style={{ marginTop: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Vantagens base:</strong> {currentArchetype.grantedAdvantages.join(', ')}</div>}
              {currentArchetype.grantedDisadvantages && currentArchetype.grantedDisadvantages.length > 0 && <div style={{ marginTop: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Desvantagens base:</strong> {currentArchetype.grantedDisadvantages.join(', ')}</div>}
              {currentArchetype.notes && currentArchetype.notes.length > 0 && <div style={{ marginTop: '0.25rem' }}><strong style={{ color: 'var(--text-main)' }}>Notas:</strong> {currentArchetype.notes.join(' • ')}</div>}
              {currentArchetype.unsupportedNotes && currentArchetype.unsupportedNotes.length > 0 && <div style={{ marginTop: '0.25rem', color: '#ffd166' }}><strong style={{ color: '#ffd166' }}>Manual/Narrador:</strong> {currentArchetype.unsupportedNotes.join(' • ')}</div>}
             {currentArchetype.choiceGroups && currentArchetype.choiceGroups.length > 0 && <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.75rem' }}>{currentArchetype.choiceGroups.map((group) => { const selected = currentForm.archetypeSelections?.[group.id] || []; return <div key={group.id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem', background: 'rgba(255,255,255,0.03)' }}><div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>{group.label}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>{group.options.map((option) => { const isSelected = selected.includes(option.id); return <button key={option.id} className="control-btn" style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem', borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)', color: isSelected ? 'var(--accent-color)' : 'var(--text-main)' }} onClick={() => updateCurrentForm({ archetypeSelections: { ...(currentForm.archetypeSelections || {}), [group.id]: [option.id] } })}>{isSelected ? <CheckIcon size={12} /> : null} {option.label}</button>; })}</div></div>; })}</div>}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem', background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="stat-label" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>KIT DE PERSONAGEM</span>
            <button
              className="control-btn"
              style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              onClick={() => setIsKitSelectModalOpen(true)}
            >
              Alterar Kit
            </button>
          </div>

          {currentKit ? (
            <div className="kit-selected-preview" onClick={() => setIsKitSelectModalOpen(true)} title="Clique para trocar de kit">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontFamily: 'Bebas Neue, sans-serif', color: '#fff', letterSpacing: '1px' }}>
                  {currentKit.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', background: 'var(--bg-color)', padding: '2px 8px', borderRadius: '3px' }}>
                  {currentKit.nucleos}
                </span>
              </div>
              {currentKit.exigencias && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Exigências:</strong> {currentKit.exigencias}
                </div>
              )}
              {currentKit.notes && currentKit.notes.length > 0 && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}><strong style={{ color: 'var(--text-main)' }}>Notas:</strong> {currentKit.notes.join(' • ')}</div>}
              {currentKit.unsupportedNotes && currentKit.unsupportedNotes.length > 0 && <div style={{ fontSize: '0.8rem', color: '#ffd166', marginTop: '4px' }}><strong style={{ color: '#ffd166' }}>Manual/Narrador:</strong> {currentKit.unsupportedNotes.join(' • ')}</div>}
              {currentKit.choiceGroups && currentKit.choiceGroups.length > 0 && <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.75rem' }}>{currentKit.choiceGroups.map((group) => { const selected = currentForm.kitSelections?.[group.id] || []; return <div key={group.id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem', background: 'rgba(255,255,255,0.03)' }}><div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>{group.label}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>{group.options.map((option) => { const isSelected = selected.includes(option.id); const max = group.max || 1; return <button key={option.id} className="control-btn" style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem', borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)', color: isSelected ? 'var(--accent-color)' : 'var(--text-main)' }} onClick={(e) => { e.stopPropagation(); const current = currentForm.kitSelections?.[group.id] || []; let next = current; if (isSelected) next = current.filter(id => id !== option.id); else next = max <= 1 ? [option.id] : [...current.slice(-(max - 1)), option.id]; updateCurrentForm({ kitSelections: { ...(currentForm.kitSelections || {}), [group.id]: next } }); }}>{isSelected ? <CheckIcon size={12} /> : null} {option.label}</button>; })}</div></div>; })}</div>}
            </div>
          ) : (
            <button className="control-btn" style={{ width: '100%', padding: '0.6rem' }} onClick={() => setIsKitSelectModalOpen(true)}>
              Selecionar Kit (Opcional)
            </button>
          )}
        </div>

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>COR DO PERSONAGEM (DADOS)</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <HexColorPicker color={accentColor} onChange={(c) => updateActiveSheet({ accentColor: c })} />
            <div style={{ marginTop: '0.5rem', color: accentColor, fontWeight: 'bold' }}>{accentColor.toUpperCase()}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div>
            <h2 className="panel-title" style={{ margin: 0, fontSize: '1.4rem' }}>Formas & Transformações</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Formas e transformações do personagem.
            </div>
          </div>
          <button className="control-btn" style={{ width: 'auto', padding: '0.3rem 0.8rem', fontSize: '0.85rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} onClick={addTransformationForm}>
            <PlusIcon /> Nova Forma
          </button>
        </div>

        <div className="form-tabs-container" style={{ marginBottom: '1.5rem' }}>
          {forms.map((form, idx) => (
            <button key={form.id} className={`form-tab-btn ${activeFormIndex === idx ? 'active' : ''}`} onClick={() => setActiveFormIndex(idx)}>
              <span>{form.name}</span>
              {forms.length > 1 && idx !== 0 && (
                <span className="form-tab-close" onClick={(e) => { e.stopPropagation(); removeCurrentForm(idx); }} title="Remover esta forma">
                  <CloseIcon size={12} />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="editor-form-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
          <div className="avatar-preview-box" onClick={() => fileInputRef.current?.click()} title="Clique para alterar a imagem desta forma" style={{ borderColor: accentColor }}>
            {currentForm.avatarUrl ? (
              <img src={currentForm.avatarUrl} alt={currentForm.name} className="avatar-img" />
            ) : (
              <div className="avatar-placeholder" style={{ color: accentColor }}>
                {characterName ? characterName.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <div className="avatar-overlay-badge">
              <CameraIcon />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>NOME DESTA FORMA</label>
            <input type="text" className="input-number" value={currentForm.name} onChange={(e) => updateCurrentForm({ name: e.target.value })} placeholder="Ex: Humano, Lobo, Urso..." style={{ marginBottom: '0.5rem' }} />

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="control-btn" style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--border-color)', color: 'var(--text-main)' }} onClick={() => fileInputRef.current?.click()}>
                <CameraIcon /> Upload Imagem
              </button>
              {currentForm.avatarUrl && (
                <button className="control-btn" style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={removeAvatar}>
                  Remover Imagem
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: activeTab === 'attributes' ? 'block' : 'none' }}>
        <div className="stats-grid">
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#FF9E00', borderColor: '#FF9E00' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#FF9E00' }}>Poder</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#FF9E00' }} min="0" max="10" value={poder} onChange={(e) => updateCurrentForm({ poder: Number(e.target.value) })} />
          </div>
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#894EC6', borderColor: '#894EC6' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#894EC6' }}>Habilidade</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#894EC6' }} min="0" max="10" value={habilidade} onChange={(e) => updateCurrentForm({ habilidade: Number(e.target.value) })} />
          </div>
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#5EB05D', borderColor: '#5EB05D' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#5EB05D' }}>Resistência</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#5EB05D' }} min="0" max="10" value={resistencia} onChange={(e) => updateCurrentForm({ resistencia: Number(e.target.value) })} />
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#FF9E00', borderColor: '#FF9E00' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#FF9E00' }}>+Ação (Níveis)</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#FF9E00' }} min="0" max="10" value={maisAcao} onChange={(e) => updateCurrentForm({ maisAcao: Number(e.target.value) })} />
          </div>
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#894EC6', borderColor: '#894EC6' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#894EC6' }}>+Mana (Níveis)</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#894EC6' }} min="0" max="10" value={maisMana} onChange={(e) => updateCurrentForm({ maisMana: Number(e.target.value) })} />
          </div>
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#5EB05D', borderColor: '#5EB05D' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#5EB05D' }}>+Vida (Níveis)</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#5EB05D' }} min="0" max="10" value={maisVida} onChange={(e) => updateCurrentForm({ maisVida: Number(e.target.value) })} />
          </div>
        </div>
</div>
        {selectedKitId === 'druida' && activeFormIndex > 0 && (
          <div style={{ background: 'rgba(94,176,93,0.15)', border: '1px solid #5EB05D', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#5EB05D', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LeafIcon size={16} /> Vantagens da Forma Selvagem (2 Gratuitas)
              </span>
              <button className="control-btn" style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: '#5EB05D', color: '#5EB05D' }} onClick={() => setIsTransformModalOpen(true)}>
                Escolher Vantagens
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {currentForm.wildShapeAdvantages && currentForm.wildShapeAdvantages.length > 0 ? (
                currentForm.wildShapeAdvantages.map(adv => (
                  <span key={adv} className="bonus-attr-badge" style={{ color: '#5EB05D', borderColor: '#5EB05D', fontSize: '0.8rem', padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckIcon size={11} /> {adv}
                  </span>
                 ))
               ) : null}
            </div>
          </div>
        )}

<div style={{ display: activeTab === 'advantages' ? 'block' : 'none', minHeight: '300px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    <h2 className="panel-title" style={{ margin: 0 }}>Vantagens</h2>
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <input
      type="text"
      className="input-number"
      value={advantageSearch}
      onChange={(e) => setAdvantageSearch(e.target.value)}
      placeholder="Buscar vantagens..."
    />
  </div>
  <div style={{ display: 'grid', gap: '1.5rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
    <div>
      <h3 style={{ color: 'var(--accent-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Vantagens</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
        {filteredAdvantages.map(adv => {
          const isSelected = currentForm.advantages?.includes(adv.variantId);
          const isGranted = currentForm.archetypeAdvantages?.includes(adv.variantId);
          return (
            <div
              key={adv.variantId}
              onClick={() => {
                if (isGranted) return;
                const current = currentForm.advantages?.filter((id: string) => !currentForm.archetypeAdvantages?.includes(id)) || [];
                if (isSelected) updateCurrentForm({ advantages: current.filter((id: string) => id !== adv.variantId) });
                else updateCurrentForm({ advantages: [...current, adv.variantId] });
              }}
              style={{
                background: isGranted ? 'rgba(51, 204, 255, 0.12)' : isSelected ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-hover)',
                padding: '1rem',
                borderRadius: '4px',
                border: `1px solid ${isGranted ? '#33ccff' : isSelected ? 'var(--accent-color)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--accent-color)' : '#fff' }}>
                  {(isSelected || isGranted) && <CheckIcon size={14} />} {adv.displayName} {isGranted ? '• Arquétipo' : ''}
                </strong>
                <span style={{ fontSize: '0.8rem', background: isSelected ? 'var(--accent-color)' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{adv.displayCost}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{adv.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>

<div style={{ display: activeTab === 'disadvantages' ? 'block' : 'none', minHeight: '300px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    <h2 className="panel-title" style={{ margin: 0 }}>Desvantagens</h2>
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <input
      type="text"
      className="input-number"
      value={advantageSearch}
      onChange={(e) => setAdvantageSearch(e.target.value)}
      placeholder="Buscar desvantagens..."
    />
  </div>
  <div style={{ display: 'grid', gap: '1.5rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
    <div>
      <h3 style={{ color: '#ff4d4d', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Desvantagens</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
        {filteredDisadvantages.map(disadv => {
          const isSelected = currentForm.disadvantages?.includes(disadv.variantId);
          const isGranted = currentForm.archetypeDisadvantages?.includes(disadv.variantId);
          return (
            <div
              key={disadv.variantId}
              onClick={() => {
                if (isGranted) return;
                const current = currentForm.disadvantages?.filter((id: string) => !currentForm.archetypeDisadvantages?.includes(id)) || [];
                if (isSelected) updateCurrentForm({ disadvantages: current.filter((id: string) => id !== disadv.variantId) });
                else updateCurrentForm({ disadvantages: [...current, disadv.variantId] });
              }}
              style={{
                background: isGranted ? 'rgba(51, 204, 255, 0.12)' : isSelected ? 'rgba(255, 77, 77, 0.1)' : 'var(--surface-hover)',
                padding: '1rem',
                borderRadius: '4px',
                border: `1px solid ${isGranted ? '#33ccff' : isSelected ? '#ff4d4d' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '1.1rem', color: isSelected ? '#ff4d4d' : '#fff' }}>
                  {(isSelected || isGranted) && <CheckIcon size={14} />} {disadv.displayName} {isGranted ? '• Arquétipo' : ''}
                </strong>
                <span style={{ fontSize: '0.8rem', background: isSelected ? '#ff4d4d' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{disadv.displayCost}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{disadv.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>
      <div style={{ display: activeTab === 'skills' ? 'block' : 'none', minHeight: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="panel-title" style={{ margin: 0 }}>Perícias</h2>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input type="text" className="input-number" value={skillSearch} onChange={(e) => setSkillSearch(e.target.value)} placeholder="Buscar perícias..." />
        </div>
        <div className="editor-skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', maxHeight: '500px', overflowY: 'auto' }}>
          {filteredSkills.map(skill => {
            const isSelected = currentForm.skills?.includes(skill.id);
            return (
              <div
                key={skill.id}
                onClick={() => {
                  const current = currentForm.skills || [];
                  if (isSelected) updateCurrentForm({ skills: current.filter((id: string) => id !== skill.id) });
                  else updateCurrentForm({ skills: [...current, skill.id] });
                }}
                style={{
                  background: isSelected ? 'rgba(0, 255, 0, 0.1)' : 'var(--surface-hover)',
                  padding: '1rem',
                  borderRadius: '4px',
                  border: `1px solid ${isSelected ? 'var(--accent-color)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--accent-color)' : '#fff' }}>
                    {isSelected && <CheckIcon size={14} />} {skill.name}
                  </strong>
                  <span style={{ fontSize: '0.7rem', background: isSelected ? 'var(--accent-color)' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold' }}>1pt</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{skill.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: activeTab === 'techniques' ? 'block' : 'none' }}>
        <h2 className="panel-title" style={{ marginTop: '2rem' }}>Técnicas & Bônus desta Forma</h2>
        {xpCredits.length > 0 && <div style={{ marginBottom: '1rem', display: 'grid', gap: '0.5rem' }}>{xpCredits.map((credit) => <div key={credit.sourceId} style={{ background: 'rgba(123,223,242,0.08)', border: '1px solid rgba(123,223,242,0.35)', borderRadius: '6px', padding: '0.65rem 0.8rem', fontSize: '0.82rem', color: 'var(--text-main)' }}><strong style={{ color: '#7bdff2' }}>{credit.label}</strong> • {credit.spentXP}/{credit.xpPerRank} XP usados • {credit.remainingXP} XP restantes</div>)}</div>}
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
          <input type="text" className="input-number" value={techniqueSearch} onChange={(e) => setTechniqueSearch(e.target.value)} placeholder="Buscar técnicas..." />
          <label className="checkbox-label" style={{ padding: '0.5rem 0.8rem' }}><input type="checkbox" className="checkbox-input" checked={showUnavailableTechniques} onChange={(e) => setShowUnavailableTechniques(e.target.checked)} /><span style={{ fontSize: '0.85rem' }}>Mostrar técnicas indisponíveis</span></label>
          <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '280px', overflowY: 'auto' }}>
            {filteredTechniques.map((technique) => { const eligibility = isTechniqueEligible(currentForm, technique); const isGolpes = technique.catalogId === 'golpes'; const alreadyOwned = !isGolpes && (currentForm.rollBonuses || []).some(b => b.sourceCatalogId === technique.catalogId); const pattern = technique.gameplayPattern || (technique.temporaryPackage ? 'temporary-package' : technique.persistentAssisted ? 'persistent-assisted' : technique.immediateAction ? 'immediate-action' : technique.variants?.length ? 'cycling-variant' : 'fixed-modifier'); return <div key={technique.catalogId} style={{ background: eligibility.eligible ? 'rgba(123,223,242,0.08)' : 'rgba(255,77,77,0.08)', border: `1px solid ${eligibility.eligible ? 'rgba(123,223,242,0.35)' : 'rgba(255,77,77,0.35)'}`, borderRadius: '6px', padding: '0.75rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}><div><div style={{ fontWeight: 'bold', color: '#fff' }}>{technique.name} {technique.universal ? '• Universal' : ''}</div><div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{technique.description}</div><div style={{ fontSize: '0.76rem', color: '#7bdff2', marginTop: '0.25rem' }}>XP {technique.xpCost || 0} • {technique.xpCategory || 'common'} • {pattern}</div>{technique.tableNotes?.length ? <div style={{ fontSize: '0.74rem', color: '#ffd166', marginTop: '0.2rem' }}>Mesa: {technique.tableNotes.join(' • ')}</div> : null}{!eligibility.eligible && <div style={{ fontSize: '0.76rem', color: '#ff8fab', marginTop: '0.25rem' }}>Faltando: {eligibility.unmet.join(' • ')}</div>}</div><button className="control-btn" disabled={!eligibility.eligible || alreadyOwned || (isGolpes && pendingStrikeSelections.length !== 2)} style={{ width: 'auto', padding: '0.35rem 0.7rem', fontSize: '0.8rem', opacity: (eligibility.eligible && !alreadyOwned && (!isGolpes || pendingStrikeSelections.length === 2)) ? 1 : 0.5, color: '#fff' }} onClick={() => { const newBonus = createTechniqueBonusFromCatalog(technique, currentForm); if (isGolpes) { const acquisitionId = newBonus.id; updateCurrentForm({ rollBonuses: [...(currentForm.rollBonuses || []), newBonus], strikeSelections: [...(currentForm.strikeSelections || []), { acquisitionId, strikeIds: pendingStrikeSelections }] }); setPendingStrikeSelections([]); } else { updateCurrentForm({ rollBonuses: [...(currentForm.rollBonuses || []), newBonus] }); } }}>{alreadyOwned ? 'Adquirida' : 'Adicionar'}</button></div>{isGolpes && <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.45rem' }}><div style={{ fontSize: '0.78rem', color: '#ffd166' }}>Escolha exatamente 2 golpes para esta aquisição.</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>{STRIKES_CATALOG.map((strike) => { const selected = pendingStrikeSelections.includes(strike.id); const disabled = !selected && pendingStrikeSelections.length >= 2; return <button key={strike.id} className="control-btn" disabled={disabled} style={{ width: 'auto', padding: '0.3rem 0.6rem', fontSize: '0.78rem', borderColor: selected ? 'var(--accent-color)' : 'var(--border-color)', color: selected ? 'var(--accent-color)' : '#fff', opacity: disabled ? 0.45 : 1 }} onClick={() => setPendingStrikeSelections((current) => selected ? current.filter((id) => id !== strike.id) : [...current, strike.id])}>{selected ? <CheckIcon size={12} /> : null} {strike.name}</button>; })}</div></div>}</div>; })}
          </div>
        </div>
        {knownStrikes.length > 0 && <div style={{ marginBottom: '1rem', background: 'rgba(255, 209, 102, 0.08)', border: '1px solid rgba(255, 209, 102, 0.35)', borderRadius: '6px', padding: '0.75rem' }}><div style={{ fontWeight: 'bold', color: '#ffd166', marginBottom: '0.45rem' }}>Golpes Conhecidos</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>{knownStrikes.map(({ acquisitionId, strike }) => strike ? <span key={`${acquisitionId}:${strike.id}`} style={{ border: '1px solid rgba(255, 209, 102, 0.35)', borderRadius: '999px', padding: '0.25rem 0.55rem', fontSize: '0.78rem', color: '#fff', background: 'rgba(255,255,255,0.04)' }}>{strike.name}</span> : null)}</div></div>}
        <div className="bonus-editor-list">
          {visibleRollBonuses.map((bonus) => (
            <div key={bonus.id} className="bonus-editor-row" style={{ justifyContent: 'space-between', padding: '0.8rem 1rem', cursor: 'pointer' }} onClick={(e) => {
              if ((e.target as HTMLElement).closest('button')) return;
              setEditingBonusId(bonus.id);
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}>
                    {bonus.alias ? bonus.alias.toUpperCase() : bonus.name || 'Técnica sem nome'}
                  </span>
                  {bonus.alias && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--surface-hover)', padding: '2px 6px', borderRadius: '4px' }}>
                      {bonus.name}
                    </span>
                  )}
                  {bonus.duration === 'scene' && (
                    <span className="bonus-attr-badge" style={{ color: '#33ccff', borderColor: '#33ccff' }}>CENA</span>
                  )}
                  {bonus.attribute !== 'any' && (
                    <span className="bonus-attr-badge" style={{ color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D', borderColor: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D' }}>
                      {bonus.attribute.toUpperCase()}
                    </span>
                  )}
                </div>
                <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', marginTop: '2px' }}>
                  {getBonusSubtitle(bonus)}
                </div>
                {(bonus.xpCost || bonus.fundedBySourceIds?.length) ? <div style={{ color: '#7bdff2', fontSize: '0.75rem', marginTop: '2px' }}>XP: {bonus.xpCost || 0}{bonus.fundedBySourceIds?.length ? ` • Coberta por: ${bonus.fundedBySourceIds.join(', ')}` : ''}</div> : null}
                {bonus.sourceCatalogId === 'setas_infaliveis_de_petrovna' ? <div style={{ marginTop: '0.55rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }} onClick={(event) => event.stopPropagation()}><span style={{ fontSize: '0.78rem', color: '#ffd166' }}>Setas a preparar:</span><button className="control-btn" style={{ width: '32px', height: '28px' }} onClick={() => { const current = bonus.assistedState?.configuredStock || 1; updateOwnedBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), configuredStock: Math.max(1, current - 1) } }); }}>−</button><strong>{Math.min(habilidade, bonus.assistedState?.configuredStock || 1)}</strong><button className="control-btn" style={{ width: '32px', height: '28px' }} onClick={() => { const current = bonus.assistedState?.configuredStock || 1; updateOwnedBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), configuredStock: Math.min(Math.max(1, habilidade), current + 1) } }); }}>+</button><span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>custo igual ao estoque em PM</span></div> : null}
                {bonus.sourceCatalogId === 'area_de_batalha' ? (() => { const selected = bonus.assistedState?.packageChoices || []; const total = selected.reduce((sum, id) => sum + (areaAdvantageOptions.find((option) => option.id === id)?.pointCost || 0), 0); return <div style={{ marginTop: '0.55rem' }} onClick={(event) => event.stopPropagation()}><div style={{ fontSize: '0.78rem', color: total === 2 ? '#7bd389' : '#ffd166', marginBottom: '0.35rem' }}>Pacote da Área: {total}/2 pontos</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxHeight: '120px', overflowY: 'auto' }}>{areaAdvantageOptions.map((option) => { const checked = selected.includes(option.id); const disabled = !checked && (selected.length >= 2 || total + option.pointCost > 2); return <button key={option.id} className="control-btn" disabled={disabled} style={{ width: 'auto', padding: '0.25rem 0.45rem', fontSize: '0.72rem', opacity: disabled ? 0.45 : 1, borderColor: checked ? '#7bd389' : 'var(--border-color)' }} onClick={() => updateOwnedBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), packageChoices: checked ? selected.filter((id) => id !== option.id) : [...selected, option.id] } })}>{checked ? <CheckIcon size={11} /> : null}{option.name} ({option.pointCost})</button>; })}</div></div>; })() : null}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button className="bonus-remove-btn" style={{ color: 'var(--text-muted)' }} onClick={() => setEditingBonusId(bonus.id)} title="Editar técnica">
                  <PencilIcon />
                </button>
                <button className="bonus-remove-btn" onClick={() => removeRollBonus(bonus.id)} title="Remover técnica">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="editor-technique-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <button className="bonus-add-btn" onClick={() => setIsPresetModalOpen(true)} style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
            <BookIcon /> Preset do Livro
          </button>
          <button className="bonus-add-btn" onClick={addCustomBonus}>
            <PlusIcon /> Técnica Custom
          </button>
        </div>
        {selectedKitId === 'mago' && (
          <button className="bonus-add-btn" onClick={() => setIsPrepMagicModalOpen(true)} style={{ marginTop: '1rem', borderColor: '#33ccff', color: '#33ccff', width: '100%' }}>
            <WandSparklesIcon size={16} /> Preparar Magia (Mago)
          </button>
        )}
      </div>

      <button className="btn-roll" onClick={() => setMode('play')} style={{ marginTop: '2rem' }}>
        Salvar e Jogar
      </button>
    </div>
  );
}
