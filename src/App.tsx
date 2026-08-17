import { useEffect, useState, useRef } from 'react';
import { useDiceSound } from './useDiceSound';
// @ts-ignore
import DiceBox from '@3d-dice/dice-box';
import { HexColorPicker } from "react-colorful";

type RollBonus = {
  id: string;
  label: string;
  type: 'fixed' | 'poder' | 'habilidade' | 'resistencia';
  value: number; // used only when type === 'fixed'
};

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const VolumeXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const SegmentedBar = ({ current, max, color, onClick, halfWidth }: { current: number, max: number, color: string, onClick: () => void, halfWidth?: boolean }) => {
  const segments = [];
  const maxSafe = Math.max(1, max); // Evita barra vazia se max for 0
  
  // Para quantidades muito grandes, reduzimos as bordas e sombras pra evitar poluição
  const isHighVolume = maxSafe > 20;

  for (let i = 0; i < maxSafe; i++) {
    const isFilled = i < current;
    segments.push(
      <div 
        key={i} 
        style={{
          flex: 1,
          height: '16px',
          minWidth: '2px',
          backgroundColor: isFilled ? color : 'transparent',
          border: isHighVolume ? 'none' : `1px solid ${isFilled ? color : 'var(--border-color)'}`,
          transform: 'skewX(-20deg)',
          boxShadow: isFilled && !isHighVolume ? `0 0 5px ${color}80` : 'none',
          transition: 'all 0.2s ease',
          opacity: isFilled ? 1 : 0.2,
          marginRight: '1px' // Em vez de gap fixo, usamos margem para acomodar até as barras adjacentes
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px', cursor: 'pointer', width: halfWidth ? '50%' : '100%' }} onClick={onClick}>
      <div style={{ display: 'flex', flexWrap: 'nowrap', flex: 1 }}>
        {segments}
      </div>
    </div>
  );
};

const loadInitialData = () => {
  const saved = localStorage.getItem('3det_ficha');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved data', e);
    }
  }
  return {};
};

export default function App() {
  const initData = useRef(loadInitialData()).current;
  const hasSavedData = initData.poder !== undefined;

  const [mode, setMode] = useState<'edit' | 'play'>(hasSavedData ? 'play' : 'edit');
  const [characterName, setCharacterName] = useState(initData.characterName ?? '');
  const [accentColor, setAccentColor] = useState(initData.accentColor ?? '#ff0066');
  const [soundOn, setSoundOn] = useState(initData.soundOn ?? true);
  
  const playDiceSound = useDiceSound();

  // Atributos base
  const [poder, setPoder] = useState(initData.poder ?? 1);
  const [habilidade, setHabilidade] = useState(initData.habilidade ?? 1);
  const [resistencia, setResistencia] = useState(initData.resistencia ?? 1);
  
  // Vantagens
  const [maisVida, setMaisVida] = useState(initData.maisVida ?? 0);
  const [maisMana, setMaisMana] = useState(initData.maisMana ?? 0);

  // Cálculos Derivados (Máximos)
  const maxPV = (resistencia * 5) + (maisVida * 10);
  const maxPM = (habilidade * 5) + (maisMana * 10);
  const maxPA = poder * 1;

  // Valores Atuais (Controláveis)
  const [currentPV, setCurrentPV] = useState(maxPV);
  const [currentPM, setCurrentPM] = useState(maxPM);
  const [currentPA, setCurrentPA] = useState(maxPA);

  useEffect(() => {
    setCurrentPV(maxPV);
    setCurrentPM(maxPM);
    setCurrentPA(maxPA);
  }, [maxPV, maxPM, maxPA]);

  const [isEditingStats, setIsEditingStats] = useState(false);

  // Modificadores de rolagem
  const [bonusDice, setBonusDice] = useState<0 | 1 | 2>(0);
  const [critRange, setCritRange] = useState(6);

  // Bônus customizados de rolagem
  const [rollBonuses, setRollBonuses] = useState<RollBonus[]>(initData.rollBonuses ?? []);
  const [activeBonuses, setActiveBonuses] = useState<Set<string>>(new Set());

  const [rolling, setRolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [result, setResult] = useState<{
    rolls: number[];
    diceSum: number;
    criticals: number;
    isCriticalFail: boolean;
    finalTotal: number;
    usedAttributeName: string;
    usedAttributeValue: number;
    bonusTotal: number;
    bonusDetails: { label: string; value: number }[];
  } | null>(null);

  const diceBoxRef = useRef<any>(null);
  const clearDiceTimeoutRef = useRef<any>(null);

  // Apply accent color to CSS variables and DiceBox
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    // Parse hex to RGB to generate derived colors
    const hex = accentColor.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substring(0, 2), 16) || 255;
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substring(4, 6), 16) || 102;
    
    document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.3)`);
    document.documentElement.style.setProperty('--accent-transparent', `rgba(${r}, ${g}, ${b}, 0.1)`);
    
    const lr = Math.min(255, r + 50);
    const lg = Math.min(255, g + 50);
    const lb = Math.min(255, b + 50);
    document.documentElement.style.setProperty('--accent-hover', `rgb(${lr}, ${lg}, ${lb})`);

    // Calculate luminance for text color adjustment
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
    document.documentElement.style.setProperty('--accent-text-color', textColor);

    if (diceBoxRef.current) {
      diceBoxRef.current.updateConfig({ themeColor: accentColor });
    }
  }, [accentColor]);

  const handleSave = () => {
    const dataToSave = {
      poder, habilidade, resistencia, maisVida, maisMana, characterName, accentColor, soundOn, rollBonuses
    };
    localStorage.setItem('3det_ficha', JSON.stringify(dataToSave));
    setMode('play');
  };

  // Auto-save core attributes when changing mode
  useEffect(() => {
    if (mode === 'play') {
      localStorage.setItem('3det_ficha', JSON.stringify({
        poder, habilidade, resistencia, maisVida, maisMana, characterName, accentColor, soundOn, rollBonuses
      }));
    }
  }, [mode, poder, habilidade, resistencia, maisVida, maisMana, characterName, accentColor, soundOn, rollBonuses]);

  const handleEdit = () => {
    setMode('edit');
    if (diceBoxRef.current) {
      diceBoxRef.current.clear();
    }
    if (clearDiceTimeoutRef.current) {
      clearTimeout(clearDiceTimeoutRef.current);
    }
    setIsModalOpen(false);
    setIsClosing(false);
  };

  // Inicializar o DiceBox apenas no modo 'play'
  useEffect(() => {
    if (mode === 'play' && !diceBoxRef.current) {
      const diceBox = new DiceBox("#dice-box", {
        assetPath: `${import.meta.env.BASE_URL}assets/`,
        theme: "default",
        themeColor: accentColor,
        scale: 6,
        enableShadows: true,
        lightIntensity: 1
      });
      
      diceBox.init().then(() => {
        diceBoxRef.current = diceBox;
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      });
    }
  }, [mode]);

  const toggleBonus = (val: 1 | 2) => {
    setBonusDice(prev => prev === val ? 0 : val);
  };

  const addRollBonus = () => {
    const newBonus: RollBonus = {
      id: Date.now().toString(),
      label: '',
      type: 'fixed',
      value: 1,
    };
    setRollBonuses(prev => [...prev, newBonus]);
  };

  const removeRollBonus = (id: string) => {
    setRollBonuses(prev => prev.filter(b => b.id !== id));
    setActiveBonuses(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateRollBonus = (id: string, updates: Partial<RollBonus>) => {
    setRollBonuses(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const toggleActiveBonus = (id: string) => {
    setActiveBonuses(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resolveBonusValue = (bonus: RollBonus): number => {
    switch (bonus.type) {
      case 'poder': return poder;
      case 'habilidade': return habilidade;
      case 'resistencia': return resistencia;
      default: return bonus.value;
    }
  };

  const getBonusDisplayValue = (bonus: RollBonus): string => {
    switch (bonus.type) {
      case 'poder': return `+P (${poder})`;
      case 'habilidade': return `+H (${habilidade})`;
      case 'resistencia': return `+R (${resistencia})`;
      default: return `+${bonus.value}`;
    }
  };

  const handleStatChange = (stat: 'PA' | 'PM' | 'PV', delta: number) => {
    if (stat === 'PA') setCurrentPA(p => Math.max(0, p + delta));
    else if (stat === 'PM') setCurrentPM(p => Math.max(0, p + delta));
    else if (stat === 'PV') setCurrentPV(p => Math.max(0, p + delta));
  };

  const handleRoll = async (attrName: 'poder' | 'habilidade' | 'resistencia') => {
    if (!diceBoxRef.current || rolling) return;
    setRolling(true);
    setIsModalOpen(false);
    setIsClosing(false);
    
    if (clearDiceTimeoutRef.current) {
      clearTimeout(clearDiceTimeoutRef.current);
      clearDiceTimeoutRef.current = null;
    }

    let attrValue = 0;
    let label = '';
    if (attrName === 'poder') { attrValue = poder; label = 'Poder'; }
    else if (attrName === 'habilidade') { attrValue = habilidade; label = 'Habilidade'; }
    else if (attrName === 'resistencia') { attrValue = resistencia; label = 'Resistência'; }

    const base = 1;
    const calculatedDice = base + bonusDice;
    const diceCount = Math.max(1, Math.min(3, calculatedDice));
    
    try {
      if (soundOn) {
        playDiceSound(diceCount);
      }

      // Microajustes de força: cria entropia extra na simulação 3D a cada rolagem
      const randomSpin = 4 + (Math.random() * 3); // 4 a 7
      const randomThrow = 4 + (Math.random() * 3); // 4 a 7
      const randomHeight = 7 + (Math.random() * 3); // 7 a 10
      
      diceBoxRef.current.updateConfig({
        spinForce: randomSpin,
        throwForce: randomThrow,
        startingHeight: randomHeight
      });

      diceBoxRef.current.clear();
      const diceResults = await diceBoxRef.current.roll(`${diceCount}d6`);
      
      // Sumir com os dados 3 segundos após pararem de rolar
      clearDiceTimeoutRef.current = setTimeout(() => {
        if (diceBoxRef.current) {
          diceBoxRef.current.clear();
        }
      }, 3000);
      
      let rolls: number[] = [];
      if (diceResults && diceResults.length > 0) {
        if (diceResults[0].rolls) {
          rolls = diceResults[0].rolls.map((r: any) => r.value);
        } else if (diceResults[0].value) {
          rolls = diceResults.map((r: any) => r.value);
        }
      }

      const diceSum = rolls.reduce((a, b) => a + b, 0);
      const isCriticalFail = rolls.length > 0 && rolls.every((r) => r === 1);
      const criticals = rolls.filter((r) => r >= critRange).length;
      
      // Calculate active bonuses
      const bonusDetails: { label: string; value: number }[] = [];
      rollBonuses.filter(b => activeBonuses.has(b.id)).forEach(b => {
        const val = resolveBonusValue(b);
        bonusDetails.push({ label: b.label || getBonusDisplayValue(b), value: val });
      });
      const bonusTotal = bonusDetails.reduce((sum, d) => sum + d.value, 0);

      const finalTotal = diceSum + attrValue + (attrValue * criticals) + bonusTotal;

      setResult({
        rolls,
        diceSum,
        criticals,
        isCriticalFail,
        finalTotal,
        usedAttributeName: label,
        usedAttributeValue: attrValue,
        bonusTotal,
        bonusDetails
      });
      setRolling(false);
      setIsModalOpen(true);
    } catch (e) {
      console.error("Erro ao rolar os dados 3D:", e);
      setRolling(false);
      alert("Houve um erro com os dados 3D. Tente recarregar a página.");
    }
  };

  const closeResult = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 400); // 400ms is the CSS animation duration
  };

  return (
    <>
      <div id="dice-box" style={{ display: mode === 'play' ? 'block' : 'none' }}></div>
      
      <div className="app-container">
        
        {mode === 'edit' && (
          <div className="panel slide-up" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <h1 className="panel-title">Cadastro da Ficha</h1>
              
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>NOME DO PERSONAGEM</div>
                <input 
                  type="text" 
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
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
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>COR DO PERSONAGEM (DADOS)</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <HexColorPicker color={accentColor} onChange={setAccentColor} />
                  <div style={{ marginTop: '1rem', color: accentColor, fontWeight: 'bold' }}>{accentColor.toUpperCase()}</div>
                </div>
              </div>

              <h2 className="panel-title">Atributos</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Defina seus atributos e vantagens. Os dados ficarão salvos automaticamente.
            </p>

            <div className="stats-grid">
              <div className="stat-box" style={{ borderColor: 'var(--success-color)' }}>
                <div className="stat-title" style={{ color: 'var(--success-color)' }}>Poder</div>
                <input type="number" className="stat-input" style={{ color: 'var(--success-color)' }} min="0" max="10" value={poder} onChange={(e) => setPoder(Number(e.target.value))} />
              </div>
              <div className="stat-box" style={{ borderColor: '#4fc3f7' }}>
                <div className="stat-title" style={{ color: '#4fc3f7' }}>Habilidade</div>
                <input type="number" className="stat-input" style={{ color: '#4fc3f7' }} min="0" max="10" value={habilidade} onChange={(e) => setHabilidade(Number(e.target.value))} />
              </div>
              <div className="stat-box" style={{ borderColor: 'var(--danger-color)' }}>
                <div className="stat-title" style={{ color: 'var(--danger-color)' }}>Resistência</div>
                <input type="number" className="stat-input" style={{ color: 'var(--danger-color)' }} min="0" max="10" value={resistencia} onChange={(e) => setResistencia(Number(e.target.value))} />
              </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="stat-box">
                <div className="stat-title">+Vida (Níveis)</div>
                <input type="number" className="stat-input" min="0" max="10" value={maisVida} onChange={(e) => setMaisVida(Number(e.target.value))} />
              </div>
              <div className="stat-box">
                <div className="stat-title">+Mana (Níveis)</div>
                <input type="number" className="stat-input" min="0" max="10" value={maisMana} onChange={(e) => setMaisMana(Number(e.target.value))} />
              </div>
            </div>

            <h2 className="panel-title" style={{ marginTop: '2rem' }}>Bônus de Rolagem</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Cadastre bônus que podem ser ativados antes de rolar. Use valores fixos (+2, +3) ou baseados em atributos (+P, +H, +R).
            </p>

            <div className="bonus-editor-list">
              {rollBonuses.map((bonus) => (
                <div key={bonus.id} className="bonus-editor-row">
                  <input
                    type="text"
                    className="bonus-name-input"
                    placeholder="Nome (ex: Ataque Especial)"
                    value={bonus.label}
                    onChange={(e) => updateRollBonus(bonus.id, { label: e.target.value })}
                  />
                  <select
                    className="bonus-type-select"
                    value={bonus.type}
                    onChange={(e) => updateRollBonus(bonus.id, { type: e.target.value as RollBonus['type'] })}
                  >
                    <option value="fixed">Fixo</option>
                    <option value="poder">+Poder</option>
                    <option value="habilidade">+Habilidade</option>
                    <option value="resistencia">+Resistência</option>
                  </select>
                  {bonus.type === 'fixed' && (
                    <input
                      type="number"
                      className="bonus-value-input"
                      min={-10}
                      max={20}
                      value={bonus.value}
                      onChange={(e) => updateRollBonus(bonus.id, { value: Number(e.target.value) })}
                    />
                  )}
                  <button
                    className="bonus-remove-btn"
                    onClick={() => removeRollBonus(bonus.id)}
                    title="Remover bônus"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>

            <button className="bonus-add-btn" onClick={addRollBonus}>
              <PlusIcon /> Adicionar Bônus
            </button>

            <button className="btn-roll" onClick={handleSave} style={{ marginTop: '2rem' }}>
              Salvar Ficha e Jogar
            </button>
          </div>
        )}

        {mode === 'play' && (
          <div style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* FIGHTING GAME HUD */}
              <div className="slide-up" style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '1rem', 
                padding: '0.8rem', 
                background: 'rgba(0,0,0,0.5)', 
                borderTop: '2px solid var(--accent-color)', 
                borderBottom: '2px solid var(--accent-color)',
                position: 'relative',
                animationDelay: '0.05s',
                zIndex: 20
              }}>
                {/* Botoes Flutuantes no Canto Superior Direito do HUD */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setSoundOn(!soundOn)} 
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: soundOn ? 'var(--accent-color)' : 'var(--text-muted)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer', zIndex: 10 }}
                    title={soundOn ? "Desativar Som" : "Ativar Som"}
                  >
                    {soundOn ? <VolumeIcon /> : <VolumeXIcon />}
                  </button>
                  <button 
                    onClick={handleEdit} 
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer', zIndex: 10 }}
                    title="Editar Ficha"
                  >
                    <PencilIcon />
                  </button>
                </div>

                {/* Portrait Area */}
                <div style={{ 
                  width: '90px', 
                  height: '110px', 
                  backgroundColor: 'var(--surface-hover)', 
                  border: '3px solid var(--accent-color)', 
                  transform: 'skewX(-10deg)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 0 15px var(--accent-transparent)'
                }}>
                  <div style={{ transform: 'skewX(10deg)', fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--accent-color)', fontFamily: 'Bebas Neue, sans-serif' }}>
                    {characterName ? characterName.charAt(0).toUpperCase() : '?'}
                  </div>
                </div>

                {/* Bars Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h1 style={{ 
                    fontFamily: 'Bebas Neue, sans-serif', 
                    fontSize: '1.8rem', 
                    margin: '0 0 0.5rem 0', 
                    color: '#fff', 
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textShadow: '2px 2px 0px #000'
                  }}>
                    {characterName || 'HERÓI DESCONHECIDO'}
                  </h1>
                  
                  <SegmentedBar current={currentPV} max={maxPV} color="#ff3366" onClick={() => setIsEditingStats(true)} />
                  <SegmentedBar current={currentPM} max={maxPM} color="#33ccff" onClick={() => setIsEditingStats(true)} />
                  <SegmentedBar current={currentPA} max={maxPA} color="#ffcc00" onClick={() => setIsEditingStats(true)} halfWidth={true} />
                </div>
              </div>
              
              <div className="panel slide-up" style={{ animationDelay: '0.15s', width: '100%' }}>
                <div className="stats-grid">
                <button className="stat-box roll-btn" style={{ '--btn-color': 'var(--success-color)' } as React.CSSProperties} onClick={() => handleRoll('poder')} disabled={rolling}>
                  <div className="stat-title" style={{ color: 'var(--success-color)' }}>Poder</div>
                  <div className="stat-value">{poder}</div>
                  <div className="roll-hint">Rolar</div>
                </button>
                <button className="stat-box roll-btn" style={{ '--btn-color': '#4fc3f7' } as React.CSSProperties} onClick={() => handleRoll('habilidade')} disabled={rolling}>
                  <div className="stat-title" style={{ color: '#4fc3f7' }}>Habilidade</div>
                  <div className="stat-value">{habilidade}</div>
                  <div className="roll-hint">Rolar</div>
                </button>
                <button className="stat-box roll-btn" style={{ '--btn-color': 'var(--danger-color)' } as React.CSSProperties} onClick={() => handleRoll('resistencia')} disabled={rolling}>
                  <div className="stat-title" style={{ color: 'var(--danger-color)' }}>Resistência</div>
                  <div className="stat-value">{resistencia}</div>
                  <div className="roll-hint">Rolar</div>
                </button>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />
              
              <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Vantagens & Perícias Extras</h2>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button 
                  className={`toggle-btn ${bonusDice === 1 ? 'active' : ''}`}
                  onClick={() => toggleBonus(1)}
                  title="Ganho (+1D)"
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</span>
                  <CubeIcon />
                </button>
                <button 
                  className={`toggle-btn ${bonusDice === 2 ? 'active' : ''}`}
                  onClick={() => toggleBonus(2)}
                  title="Ganho Duplo (+2D)"
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+</span>
                  <CubeIcon />
                  <CubeIcon />
                </button>
              </div>

              <div className="form-group">
                <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Acerto Crítico</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    className={`toggle-btn ${critRange === 6 ? 'active' : ''}`}
                    onClick={() => setCritRange(6)}
                    title="Crítico apenas no 6 (Normal)"
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>6</span>
                  </button>
                  <button 
                    className={`toggle-btn ${critRange === 5 ? 'active' : ''}`}
                    onClick={() => setCritRange(5)}
                    title="Crítico no 5 e 6 (Aprimorado)"
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>5+</span>
                  </button>
                  <button 
                    className={`toggle-btn ${critRange === 4 ? 'active' : ''}`}
                    onClick={() => setCritRange(4)}
                    title="Crítico no 4, 5 e 6 (Maestria)"
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>4+</span>
                  </button>
                </div>
              </div>

              {rollBonuses.length > 0 && (
                <div className="form-group">
                  <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Bônus de Rolagem</h2>
                  <div className="bonus-toggles-grid">
                    {rollBonuses.map((bonus) => (
                      <button
                        key={bonus.id}
                        className={`bonus-toggle ${activeBonuses.has(bonus.id) ? 'active' : ''}`}
                        onClick={() => toggleActiveBonus(bonus.id)}
                        title={`${bonus.label || 'Bônus'}: ${getBonusDisplayValue(bonus)}`}
                      >
                        <span className="bonus-toggle-label">{bonus.label || 'Bônus'}</span>
                        <span className="bonus-toggle-value">{getBonusDisplayValue(bonus)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Resultado */}
      {(isModalOpen || isClosing) && result && !rolling && (
        <div className={`modal-overlay ${isClosing ? 'overlay-out' : 'overlay-in'}`}>
          <div className={`modal-content ${isClosing ? 'slide-down' : 'slide-up'}`}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <button 
                onClick={closeResult} 
                title="Fechar Resultado"
                style={{ 
                  background: 'var(--surface-hover)', 
                  border: 'none', 
                  color: 'var(--text-muted)', 
                  cursor: 'pointer', 
                  padding: '0.5rem 2rem',
                  borderRadius: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronDownIcon />
              </button>
            </div>
            
            <div className={`total-score-container ${result?.isCriticalFail ? 'critical-fail' : ''}`}>
              <div className="total-label">Resultado ({result?.usedAttributeName})</div>
              <div className="total-score">{result?.finalTotal}</div>
            </div>

            {/* Visual breakdown formula */}
            <div className="result-summary">
              <div className="sum-line">
                <div className="sum-parts">
                  {result?.rolls.map((roll, i) => (
                    <span key={i} className="sum-bonus-part">
                      <div className={`sum-dice-face ${roll >= critRange ? 'crit' : ''} ${roll === 1 ? 'fail' : ''}`}>
                        {roll}
                      </div>
                      <span className="sum-operator">+</span>
                    </span>
                  ))}
                  <span className="sum-attr">
                    {result?.usedAttributeValue}
                    <span className="sum-attr-label" style={{ 
                      color: result?.usedAttributeName === 'Poder' ? 'var(--success-color)' : 
                             result?.usedAttributeName === 'Habilidade' ? '#4fc3f7' : 
                             result?.usedAttributeName === 'Resistência' ? 'var(--danger-color)' : 'var(--accent-color)' 
                    }}>
                      {result?.usedAttributeName?.charAt(0)}
                    </span>
                  </span>
                  
                  {result && result.criticals > 0 && (
                    <span className="sum-bonus-part">
                      <span className="sum-operator">+</span>
                      <span className="sum-crit">{result.criticals * result.usedAttributeValue}<span className="sum-attr-label">crit</span></span>
                    </span>
                  )}
                  {result && result.bonusDetails.map((bd, i) => (
                    <span key={`bonus-${i}`} className="sum-bonus-part">
                      <span className="sum-operator">+</span>
                      <span className="sum-bonus-val">{bd.value}<span className="sum-attr-label">{bd.label}</span></span>
                    </span>
                  ))}
                </div>
                <span className="sum-equals">= {result?.finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Histórico (último resultado) */}
      {!isModalOpen && !isClosing && result && !rolling && mode === 'play' && (
        <button className="history-btn slide-up-center" onClick={() => setIsModalOpen(true)} title="Ver último resultado">
          <ChevronUpIcon />
        </button>
      )}

      {/* Modal para Editar Pontos Derivados */}
      {isEditingStats && (
        <div className="modal-overlay pop-in" style={{ zIndex: 350, alignItems: 'center' }} onClick={(e) => {
          if (e.target === e.currentTarget) setIsEditingStats(false);
        }}>
          <div className="modal-content" style={{ 
            textAlign: 'center', 
            borderRadius: '4px',
            borderTop: '2px solid var(--accent-color)',
            borderBottom: '2px solid var(--accent-color)',
            background: 'rgba(0,0,0,0.85)',
            boxShadow: '0 0 20px var(--accent-transparent)',
            maxWidth: '400px'
          }}>
            <button className="modal-close" onClick={() => setIsEditingStats(false)}>✕</button>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '1.5rem', color: '#fff', textShadow: '2px 2px 0px #000', letterSpacing: '2px' }}>STATUS</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
              {/* PV */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,51,102,0.1)', borderLeft: '4px solid #ff3366' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#ff3366', width: '50px', textAlign: 'left', textShadow: '0 0 5px rgba(255,51,102,0.5)' }}>PV</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#ff3366', color: '#ff3366', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PV', -1)}>-</button>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Bebas Neue, sans-serif', width: '50px', textShadow: '0 0 10px #ff3366' }}>{currentPV}</span>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#ff3366', color: '#ff3366', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PV', 1)}>+</button>
                </div>
              </div>
              
              {/* PM */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(51,204,255,0.1)', borderLeft: '4px solid #33ccff' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#33ccff', width: '50px', textAlign: 'left', textShadow: '0 0 5px rgba(51,204,255,0.5)' }}>PM</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#33ccff', color: '#33ccff', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PM', -1)}>-</button>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Bebas Neue, sans-serif', width: '50px', textShadow: '0 0 10px #33ccff' }}>{currentPM}</span>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#33ccff', color: '#33ccff', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PM', 1)}>+</button>
                </div>
              </div>

              {/* PA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,204,0,0.1)', borderLeft: '4px solid #ffcc00' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#ffcc00', width: '50px', textAlign: 'left', textShadow: '0 0 5px rgba(255,204,0,0.5)' }}>PA</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#ffcc00', color: '#ffcc00', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PA', -1)}>-</button>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Bebas Neue, sans-serif', width: '50px', textShadow: '0 0 10px #ffcc00' }}>{currentPA}</span>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#ffcc00', color: '#ffcc00', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PA', 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
