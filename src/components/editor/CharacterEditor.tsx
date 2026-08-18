import { HexColorPicker } from 'react-colorful';
import { ADVANTAGES_CATALOG, DISADVANTAGES_CATALOG } from '../../constants/advantagesData';
import { SKILLS_CATALOG } from '../../constants/skillsData';
import { getBonusSubtitle } from '../../utils/character';
import type { CharacterForm, CharacterKit, CharacterSheet, RollBonus } from '../../types/character';
import { BookIcon, CameraIcon, CheckIcon, CloseIcon, LeafIcon, PencilIcon, PlusIcon, TrashIcon, UsersIcon } from '../common/Icons';

export type EditorTab = 'concept' | 'attributes' | 'advantages' | 'skills' | 'techniques';

type CharacterEditorProps = {
  activeTab: EditorTab;
  setActiveTab: (tab: EditorTab) => void;
  totalPoints: number;
  setIsSheetsModalOpen: (open: boolean) => void;
  characterName: string;
  updateActiveSheet: (updates: Partial<CharacterSheet>) => void;
  currentKit: CharacterKit | null;
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
  setIsTransformModalOpen: (open: boolean) => void;
  poder: number;
  habilidade: number;
  resistencia: number;
  maisVida: number;
  maisMana: number;
  visibleRollBonuses: RollBonus[];
  setEditingBonusId: (id: string | null) => void;
  removeRollBonus: (id: string) => void;
  setIsPresetModalOpen: (open: boolean) => void;
  addCustomBonus: () => void;
  setIsPrepMagicModalOpen: (open: boolean) => void;
  setMode: (mode: 'edit' | 'play') => void;
};

const EDITOR_TABS: Array<{ id: EditorTab; label: string; icon: string }> = [
  { id: 'concept', label: 'Conceito', icon: '👤' },
  { id: 'attributes', label: 'Atributos', icon: '📊' },
  { id: 'advantages', label: 'Vantagens', icon: '🎭' },
  { id: 'skills', label: 'Perícias', icon: '🤹' },
  { id: 'techniques', label: 'Técnicas', icon: '⚔️' }
];

export default function CharacterEditor(props: CharacterEditorProps) {
  const {
    activeTab,
    setActiveTab,
    totalPoints,
    setIsSheetsModalOpen,
    characterName,
    updateActiveSheet,
    currentKit,
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
    setIsTransformModalOpen,
    poder,
    habilidade,
    resistencia,
    maisVida,
    maisMana,
    visibleRollBonuses,
    setEditingBonusId,
    removeRollBonus,
    setIsPresetModalOpen,
    addCustomBonus,
    setIsPrepMagicModalOpen,
    setMode,
  } = props;

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
            <span>{tab.icon}</span>
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
            <span className="stat-label" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>KIT DE PERSONAGEM</span>
            <button
              className="control-btn"
              style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
              onClick={() => setIsKitSelectModalOpen(true)}
            >
              Alterar Kit (60 Opções)
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
            </div>
          ) : (
            <button className="control-btn" style={{ width: '100%', padding: '0.6rem' }} onClick={() => setIsKitSelectModalOpen(true)}>
              Selecionar Kit
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
          <h2 className="panel-title" style={{ margin: 0, fontSize: '1.4rem' }}>Formas & Transformações</h2>
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
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#5EB05D', borderColor: '#5EB05D' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#5EB05D' }}>+Vida (Níveis)</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#5EB05D' }} min="0" max="10" value={maisVida} onChange={(e) => updateCurrentForm({ maisVida: Number(e.target.value) })} />
          </div>
          <div className="stat-box edit-stat-box" style={{ '--btn-color': '#894EC6', borderColor: '#894EC6' } as React.CSSProperties}>
            <div className="stat-title" style={{ color: '#894EC6' }}>+Mana (Níveis)</div>
            <input type="number" className="stat-input stat-value" style={{ color: '#894EC6' }} min="0" max="10" value={maisMana} onChange={(e) => updateCurrentForm({ maisMana: Number(e.target.value) })} />
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
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhuma vantagem escolhida ainda.</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: activeTab === 'advantages' ? 'block' : 'none', minHeight: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="panel-title" style={{ margin: 0 }}>Vantagens & Desvantagens</h2>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <div>
            <h3 style={{ color: 'var(--accent-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Vantagens</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              {ADVANTAGES_CATALOG.map(adv => {
                const isSelected = currentForm.advantages?.includes(adv.id);
                return (
                  <div
                    key={adv.id}
                    onClick={() => {
                      const current = currentForm.advantages || [];
                      if (isSelected) updateCurrentForm({ advantages: current.filter((id: string) => id !== adv.id) });
                      else updateCurrentForm({ advantages: [...current, adv.id] });
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: isSelected ? 'var(--accent-color)' : '#fff' }}>
                        {isSelected && '✓ '} {adv.name}
                      </strong>
                      <span style={{ fontSize: '0.8rem', background: isSelected ? 'var(--accent-color)' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{adv.cost}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>{adv.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 style={{ color: '#ff4d4d', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Desvantagens</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              {DISADVANTAGES_CATALOG.map(disadv => {
                const isSelected = currentForm.disadvantages?.includes(disadv.id);
                return (
                  <div
                    key={disadv.id}
                    onClick={() => {
                      const current = currentForm.disadvantages || [];
                      if (isSelected) updateCurrentForm({ disadvantages: current.filter((id: string) => id !== disadv.id) });
                      else updateCurrentForm({ disadvantages: [...current, disadv.id] });
                    }}
                    style={{
                      background: isSelected ? 'rgba(255, 77, 77, 0.1)' : 'var(--surface-hover)',
                      padding: '1rem',
                      borderRadius: '4px',
                      border: `1px solid ${isSelected ? '#ff4d4d' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem', color: isSelected ? '#ff4d4d' : '#fff' }}>
                        {isSelected && '✓ '} {disadv.name}
                      </strong>
                      <span style={{ fontSize: '0.8rem', background: isSelected ? '#ff4d4d' : 'var(--surface-hover)', color: isSelected ? '#000' : 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{disadv.cost}</span>
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
        <div className="editor-skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', maxHeight: '500px', overflowY: 'auto' }}>
          {SKILLS_CATALOG.map(skill => {
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
                    {isSelected && '✓ '} {skill.name}
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
            🪄 Preparar Magia (Mago)
          </button>
        )}
      </div>

      <button className="btn-roll" onClick={() => setMode('play')} style={{ marginTop: '2rem' }}>
        Salvar e Jogar
      </button>
    </div>
  );
}
