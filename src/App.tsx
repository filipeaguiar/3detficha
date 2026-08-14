import { useEffect, useState, useRef } from 'react';
import { useDiceSound } from './useDiceSound';
// @ts-ignore
import DiceBox from '@3d-dice/dice-box';
import { HexColorPicker } from "react-colorful";

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

  const [editStat, setEditStat] = useState<'PA' | 'PM' | 'PV' | null>(null);

  // Modificadores de rolagem
  const [bonusDice, setBonusDice] = useState<0 | 1 | 2>(0);
  const [critRange, setCritRange] = useState(6);

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
      poder, habilidade, resistencia, maisVida, maisMana, characterName, accentColor, soundOn
    };
    localStorage.setItem('3det_ficha', JSON.stringify(dataToSave));
    setMode('play');
  };

  // Auto-save core attributes when changing mode
  useEffect(() => {
    if (mode === 'play') {
      localStorage.setItem('3det_ficha', JSON.stringify({
        poder, habilidade, resistencia, maisVida, maisMana, characterName, accentColor, soundOn
      }));
    }
  }, [mode, poder, habilidade, resistencia, maisVida, maisMana, characterName, accentColor, soundOn]);

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
        spinForce: 5,
        throwForce: 5,
        startingHeight: 8,
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

  const handleEditStatChange = (delta: number) => {
    if (editStat === 'PA') setCurrentPA(p => p + delta);
    else if (editStat === 'PM') setCurrentPM(p => p + delta);
    else if (editStat === 'PV') setCurrentPV(p => p + delta);
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
    
    if (soundOn) {
      playDiceSound(diceCount);
    }

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
    
    const finalTotal = diceSum + attrValue + (attrValue * criticals);

    setResult({
      rolls,
      diceSum,
      criticals,
      isCriticalFail,
      finalTotal,
      usedAttributeName: label,
      usedAttributeValue: attrValue
    });
    setRolling(false);
    setIsModalOpen(true);
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
              <div className="stat-box">
                <div className="stat-title">Poder</div>
                <input type="number" className="stat-input" min="0" max="10" value={poder} onChange={(e) => setPoder(Number(e.target.value))} />
              </div>
              <div className="stat-box">
                <div className="stat-title">Habilidade</div>
                <input type="number" className="stat-input" min="0" max="10" value={habilidade} onChange={(e) => setHabilidade(Number(e.target.value))} />
              </div>
              <div className="stat-box">
                <div className="stat-title">Resistência</div>
                <input type="number" className="stat-input" min="0" max="10" value={resistencia} onChange={(e) => setResistencia(Number(e.target.value))} />
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

            <button className="btn-roll" onClick={handleSave} style={{ marginTop: '2rem' }}>
              Salvar Ficha e Jogar
            </button>
          </div>
        )}

        {mode === 'play' && (
          <div className="panel slide-up" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="panel-title" style={{ borderBottom: 'none', margin: 0, padding: 0 }}>{characterName || 'HERÓI DESCONHECIDO'}</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setSoundOn(!soundOn)} 
                    style={{ background: 'transparent', border: '1px solid var(--border-color)', color: soundOn ? 'var(--accent-color)' : 'var(--text-muted)', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer' }}
                    title={soundOn ? "Desativar Som" : "Ativar Som"}
                  >
                    {soundOn ? <VolumeIcon /> : <VolumeXIcon />}
                  </button>
                  <button 
                    onClick={handleEdit} 
                    style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer' }}
                    title="Editar Ficha"
                  >
                    <PencilIcon />
                  </button>
                </div>
              </div>
              
              <div className="derived-stats">
                <div className="derived-stat" onClick={() => setEditStat('PA')} style={{ cursor: 'pointer', position: 'relative', color: 'var(--success-color)' }}>
                  <div className="derived-title" style={{ color: 'inherit' }}>PA</div>
                  <div className="derived-value" style={{ color: 'inherit' }}>{currentPA}</div>
                  <div style={{ position: 'absolute', bottom: '0.2rem', right: '0.4rem', fontSize: '0.8rem', opacity: 0.7, fontWeight: 'bold' }}>{maxPA}</div>
                </div>
                <div className="derived-stat" onClick={() => setEditStat('PM')} style={{ cursor: 'pointer', position: 'relative', color: '#4fc3f7' }}>
                  <div className="derived-title" style={{ color: 'inherit' }}>PM</div>
                  <div className="derived-value" style={{ color: 'inherit' }}>{currentPM}</div>
                  <div style={{ position: 'absolute', bottom: '0.2rem', right: '0.4rem', fontSize: '0.8rem', opacity: 0.7, fontWeight: 'bold' }}>{maxPM}</div>
                </div>
                <div className="derived-stat" onClick={() => setEditStat('PV')} style={{ cursor: 'pointer', position: 'relative', color: 'var(--danger-color)' }}>
                  <div className="derived-title" style={{ color: 'inherit' }}>PV</div>
                  <div className="derived-value" style={{ color: 'inherit' }}>{currentPV}</div>
                  <div style={{ position: 'absolute', bottom: '0.2rem', right: '0.4rem', fontSize: '0.8rem', opacity: 0.7, fontWeight: 'bold' }}>{maxPV}</div>
                </div>
              </div>
              
              <div className="stats-grid">
                <button className="stat-box roll-btn" onClick={() => handleRoll('poder')} disabled={rolling}>
                  <div className="stat-title">Poder</div>
                  <div className="stat-value">{poder}</div>
                  <div className="roll-hint">Rolar</div>
                </button>
                <button className="stat-box roll-btn" onClick={() => handleRoll('habilidade')} disabled={rolling}>
                  <div className="stat-title">Habilidade</div>
                  <div className="stat-value">{habilidade}</div>
                  <div className="roll-hint">Rolar</div>
                </button>
                <button className="stat-box roll-btn" onClick={() => handleRoll('resistencia')} disabled={rolling}>
                  <div className="stat-title">Resistência</div>
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
            
            <div className="total-score-container">
              <div className="total-label">Resultado ({result?.usedAttributeName})</div>
              <div className="total-score">{result?.finalTotal}</div>
            </div>

            {result?.isCriticalFail && (
              <div className="critical-fail-msg">FALHA CRÍTICA! (Todos os dados rolaram 1)</div>
            )}

            {result && result.criticals > 0 && !result.isCriticalFail && (
              <div className="critical-msg">{result.criticals}x ACERTO CRÍTICO!</div>
            )}

            <div className="breakdown" style={{ marginTop: '2rem' }}>
              <div className="breakdown-item">
                <span>Dados [{result?.rolls.join(', ')}]</span>
                <span className="value">{result?.diceSum}</span>
              </div>
              <div className="breakdown-item">
                <span>Atributo ({result?.usedAttributeName})</span>
                <span className="value">+{result?.usedAttributeValue}</span>
              </div>
              {result && result.criticals > 0 && (
                <div className="breakdown-item">
                  <span>Bônus Crítico ({result.criticals}x)</span>
                  <span className="value">+{result.criticals * result.usedAttributeValue}</span>
                </div>
              )}
              <div className="breakdown-item">
                <span>Total Final</span>
                <span className="value">{result?.finalTotal}</span>
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
      {editStat && (
        <div className="modal-overlay" style={{ zIndex: 350, alignItems: 'center' }}>
          <div className="modal-content pop-in" style={{ textAlign: 'center', borderRadius: 'var(--radius)' }}>
            <button className="modal-close" onClick={() => setEditStat(null)}>✕</button>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', margin: '2rem 0' }}>
              <button 
                className="control-btn" 
                style={{ width: '40px', height: '40px', fontSize: '1.5rem', borderColor: editStat === 'PM' ? '#4fc3f7' : editStat === 'PA' ? 'var(--success-color)' : 'var(--danger-color)', color: editStat === 'PM' ? '#4fc3f7' : editStat === 'PA' ? 'var(--success-color)' : 'var(--danger-color)' }} 
                onClick={() => handleEditStatChange(-1)}
              >
                -
              </button>
              <span style={{ fontSize: '4rem', fontWeight: 'bold', color: editStat === 'PM' ? '#4fc3f7' : editStat === 'PA' ? 'var(--success-color)' : 'var(--danger-color)', fontFamily: 'Bebas Neue, sans-serif' }}>
                {editStat === 'PA' ? currentPA : editStat === 'PM' ? currentPM : currentPV}
              </span>
              <button 
                className="control-btn" 
                style={{ width: '40px', height: '40px', fontSize: '1.5rem', borderColor: editStat === 'PM' ? '#4fc3f7' : editStat === 'PA' ? 'var(--success-color)' : 'var(--danger-color)', color: editStat === 'PM' ? '#4fc3f7' : editStat === 'PA' ? 'var(--success-color)' : 'var(--danger-color)' }} 
                onClick={() => handleEditStatChange(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
