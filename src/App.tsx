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

const PoderIcon = () => (
  <svg width="3em" height="3.4em" viewBox="0 0 35 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.1214 4.07208C24.3978 3.47769 26.1245 3.66085 27.0872 4.77362C27.6835 5.46349 28.3695 6.08322 28.9034 6.81597C29.3906 7.48051 29.4277 8.30486 29.1958 9.09413C29.0983 9.42932 29.2114 9.49359 29.4744 9.60857C30.7938 10.1893 31.8539 11.0507 32.4698 12.4012C32.9492 13.4477 32.5925 14.3461 32.0469 15.2367C32.6588 15.7375 33.2863 16.2209 33.8807 16.7431C34.9798 17.7078 35.5274 19.793 34.2276 20.9272C30.9653 23.7744 28.0479 26.9705 24.9259 29.958C23.8229 31.0142 22.4997 31.6943 20.9173 31.8054C19.7597 31.8873 18.567 31.899 17.5302 32.546C17.119 32.8032 16.6981 33.0683 16.3551 33.4054C14.4648 35.2665 12.5959 37.1491 10.7211 39.0238C10.2339 39.511 10.0371 39.511 9.54212 39.016C6.51953 35.9934 3.49499 32.9708 0.474351 29.9463C0.355474 29.8293 0.275576 29.6754 0.158648 29.5546C-0.0693619 29.3188 -0.00310189 29.1394 0.211266 28.929C1.10187 28.0559 1.97493 27.1634 2.86553 26.2884C3.61777 25.5478 4.25502 24.7254 4.36415 23.6458C4.4421 22.8604 4.40703 22.0634 4.40118 21.2722C4.39534 20.67 4.31934 20.0659 4.33882 19.4656C4.36026 18.8381 4.46549 18.2145 4.52006 17.587C4.6974 15.5388 5.21384 13.5997 6.4104 11.8907C6.60528 11.6159 6.83329 11.3586 7.07299 11.1208C10.269 7.91701 13.4709 4.71909 16.6689 1.51916C17.2944 0.891642 18.0525 0.566182 18.9256 0.618799C19.594 0.659724 20.2332 0.848766 20.7497 1.33402C21.3616 1.90696 22.0222 2.43116 22.5971 3.03529C22.8524 3.30423 22.9518 3.72324 23.1214 4.07208ZM25.3118 20.3698C25.8438 20.2003 26.3505 20.0951 26.8104 19.8866C28.7514 19.0077 30.1721 17.4934 31.5499 15.9305C31.6103 15.8623 31.6415 15.7707 31.7039 15.7064C31.9085 15.494 31.9631 15.2543 31.7292 15.0575C31.4992 14.8645 31.2362 14.845 30.9945 15.0984C30.1974 15.9364 29.4218 16.7977 28.5799 17.5909C27.8316 18.2963 26.9878 18.8791 25.9783 19.1909C24.6999 19.5865 23.6651 19.224 23.1759 18.043C22.9265 17.4427 22.8388 16.7529 22.7979 16.0961C22.7706 15.646 22.8816 15.2173 23.3903 14.8996C25.1754 13.7829 26.7091 12.3564 28.1473 10.8247C28.3363 10.6239 28.5078 10.4056 28.6676 10.1815C28.8391 9.93793 28.8333 9.68849 28.5741 9.51115C28.3285 9.33966 28.1161 9.38449 27.9096 9.63004C27.5315 10.0822 27.1456 10.5284 26.7227 10.9357C26.0329 11.5983 25.3235 12.2414 24.5985 12.8689C24.1932 13.2197 23.743 13.5179 23.2344 13.8979C23.3533 12.4032 22.7063 11.4736 21.5292 10.8207C20.8802 10.4622 20.28 10.014 19.748 9.66513C20.5002 8.94797 21.2758 8.30095 21.9404 7.55456C22.5913 6.82181 23.0493 5.95653 23.059 4.92367C23.0629 4.65668 23.0824 4.44038 22.6926 4.43843C22.3223 4.43453 22.1918 4.58653 22.1119 4.92367C22.0066 5.37384 21.8878 5.83378 21.6851 6.24497C21.1433 7.34799 20.2274 8.09439 19.2043 8.7414C18.8691 8.95187 18.6333 8.98109 18.3039 8.74919C17.4796 8.1665 16.6007 7.62861 15.5503 7.74749C14.8409 7.82544 14.1413 8.06123 13.4592 8.29119C12.0483 8.76864 10.6549 9.29677 9.24785 9.78591C8.9146 9.90089 8.83275 10.1367 8.94773 10.39C9.04907 10.6141 9.23421 10.8071 9.57915 10.6804C11.2746 10.0568 12.9818 9.46634 14.6772 8.84077C15.6165 8.49194 16.4623 8.6868 17.2691 9.19934C18.6079 10.049 19.9351 10.9201 21.2856 11.7542C22.1177 12.2687 22.4159 13.0014 22.3068 13.9369C22.2191 14.693 21.7436 15.1588 21.0868 15.4453C20.1416 15.8584 19.1419 15.7941 18.1967 15.5349C17.0957 15.2348 16.0355 14.7749 14.9617 14.3754C14.7025 14.2799 14.4706 14.2058 14.2796 14.5001C14.0965 14.7807 14.268 14.9483 14.4239 15.1646C15.102 16.1 15.8328 17.0102 16.4116 18.006C17.4581 19.8008 18.074 21.7574 18.2844 23.8348C18.3117 24.1018 18.4053 24.3298 18.7697 24.3103C19.1127 24.2908 19.2393 24.1252 19.216 23.8095C19.1906 23.4743 19.1809 23.1333 19.1166 22.8039C18.7463 20.9448 18.1831 19.1518 17.2321 17.4973C16.9631 17.0316 16.6806 16.5716 16.3473 16.0104C18.2084 16.5911 19.9877 16.9946 21.7981 16.217C21.8507 16.5152 21.8975 16.7529 21.9326 16.9945C22.1275 18.3587 22.6361 19.5046 23.9964 20.1009C24.1562 20.1691 24.3082 20.3738 24.3588 20.5472C24.507 21.0519 24.5518 21.5917 24.7272 22.0828C25.4891 24.207 27.2626 24.9008 29.2425 24.2947C29.5251 24.209 29.6908 23.9966 29.5933 23.7023C29.4939 23.4081 29.2776 23.3496 28.9463 23.4061C28.426 23.4938 27.8706 23.5757 27.3619 23.4841C26.0329 23.2502 25.3021 21.621 25.3118 20.3698Z" />
  </svg>
);

const HabilidadeIcon = () => (
  <svg width="3em" height="3.4em" viewBox="0 0 35 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.8146 14.8662H23.2904C25.0699 14.8662 26.8493 14.8571 28.6288 14.8717C29.2031 14.8771 29.6644 15.0868 29.7409 15.6866C29.7974 16.1224 29.5622 16.3959 29.3034 16.6566C28.7655 17.1999 28.1967 17.7122 27.6552 18.2519C21.1518 24.7498 14.6503 31.2513 8.14877 37.751C7.53982 38.36 6.84882 38.2415 6.56258 37.4466C6.49148 37.2442 6.54253 36.9488 6.63733 36.7428C7.39761 35.0709 8.18159 33.41 8.95827 31.7472C10.0577 29.3971 11.1607 27.0488 12.2546 24.6969C12.8508 23.4207 13.4324 22.1371 14.0322 20.8317H6.50424C6.28728 20.8317 6.07032 20.8299 5.85154 20.8281C5.48507 20.8262 5.21888 20.6767 5.03109 20.3467C4.83419 20.004 4.86154 19.705 5.06938 19.3804C6.18883 17.652 7.29915 15.92 8.41131 14.1861C10.3293 11.1961 12.2473 8.20244 14.1653 5.21057C14.7579 4.28803 15.3595 3.36909 15.9375 2.43744C16.1873 2.03268 16.5136 1.85952 16.9913 1.86134C20.9732 1.87046 24.955 1.86861 28.9369 1.86496C29.369 1.86496 29.8029 1.90873 30.0053 2.33901C30.1803 2.71459 30.111 3.08103 29.8704 3.46755C28.1073 6.28804 26.3771 9.12678 24.6305 11.9582C24.0452 12.9081 23.4491 13.8525 22.8146 14.8662Z" />
  </svg>
);

const ResistenciaIcon = () => (
  <svg width="3em" height="3.4em" viewBox="0 0 35 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4914 38.1374H17.4203C15.65 37.1273 13.8978 36.0844 12.3098 34.7954C11.4328 34.0843 10.5558 33.3678 9.73172 32.5947C9.04801 31.9529 8.4117 31.2528 7.81003 30.5326C7.07526 29.652 6.36602 28.7459 5.70601 27.8106C4.86185 26.6145 4.18542 25.3218 3.62204 23.9672C2.81982 22.0345 2.31661 20.0435 2.31478 17.9413C2.31296 14.211 2.30931 10.4825 2.30566 6.75393V6.34553C3.78978 5.89884 5.22832 5.46671 6.66686 5.03096C10.0016 4.01906 13.3363 3.0108 16.6673 1.98796C17.1924 1.82752 17.692 1.81479 18.2207 1.97705C20.9793 2.82668 23.7415 3.65806 26.5019 4.49675C28.5512 5.11848 30.5987 5.74203 32.659 6.3674C32.6644 6.40933 32.6772 6.45491 32.6754 6.50049C32.6061 10.6721 32.8285 14.8455 32.5496 19.0116C32.5076 19.6114 32.4675 20.2204 32.329 20.802C31.9278 22.4812 31.3499 24.093 30.544 25.6336C29.4081 27.7978 27.955 29.7249 26.2886 31.4916C25.5793 32.2428 24.8154 32.9484 24.0241 33.6121C23.0323 34.4435 22.0167 35.2585 20.9519 35.9914C19.8361 36.7608 18.6474 37.4263 17.4914 38.1374ZM17.475 4.18683C17.4294 4.18501 17.4039 4.17585 17.382 4.18132C14.9899 4.9088 12.6015 5.63995 10.2076 6.36378C8.45363 6.89617 6.6942 7.4158 4.93842 7.94454C4.77069 7.99559 4.60112 8.01017 4.5993 8.28912C4.59748 11.5855 4.56466 14.8838 4.57195 18.182C4.57195 18.8147 4.62483 19.4692 4.79257 20.0745C5.12622 21.2797 5.47081 22.494 5.96673 23.6372C6.93122 25.8615 8.34424 27.8123 9.98515 29.5882C10.6324 30.2883 11.3234 30.9575 12.0491 31.5755C13.0427 32.4234 14.0729 33.2347 15.123 34.0132C15.8615 34.5601 16.6582 35.0287 17.475 35.5611V4.18683Z" />
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
              <div className="stat-box" style={{ borderColor: '#ffcc00' }}>
                <div className="stat-title" style={{ color: '#ffcc00' }}>Poder</div>
                <input type="number" className="stat-input" style={{ color: '#ffcc00' }} min="0" max="10" value={poder} onChange={(e) => setPoder(Number(e.target.value))} />
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
                <button className="stat-box roll-btn" style={{ '--btn-color': '#ffcc00', '--btn-text-color': '#000000' } as React.CSSProperties} onClick={() => handleRoll('poder')} disabled={rolling}>
                  <div className="stat-icon-container"><PoderIcon /></div>
                  <div className="stat-value corner">{poder}</div>
                </button>
                <button className="stat-box roll-btn" style={{ '--btn-color': '#4fc3f7', '--btn-text-color': '#000000' } as React.CSSProperties} onClick={() => handleRoll('habilidade')} disabled={rolling}>
                  <div className="stat-icon-container"><HabilidadeIcon /></div>
                  <div className="stat-value corner">{habilidade}</div>
                </button>
                <button className="stat-box roll-btn" style={{ '--btn-color': 'var(--danger-color)', '--btn-text-color': '#ffffff' } as React.CSSProperties} onClick={() => handleRoll('resistencia')} disabled={rolling}>
                  <div className="stat-icon-container"><ResistenciaIcon /></div>
                  <div className="stat-value corner">{resistencia}</div>
                </button>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />
              
              <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Modificadores</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button 
                  className={`toggle-btn ${bonusDice > 0 ? 'active' : ''}`}
                  onClick={() => setBonusDice(prev => (prev >= 2 ? 0 : prev + 1) as 0 | 1 | 2)}
                  title={bonusDice === 0 ? "Rolagem Normal (1D)" : bonusDice === 1 ? "Ganho (+1D)" : "Ganho Duplo (+2D)"}
                >
                  <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center' }}>
                    <CubeIcon />
                    {bonusDice >= 1 && <CubeIcon />}
                    {bonusDice >= 2 && <CubeIcon />}
                  </div>
                </button>

                <button 
                  className={`toggle-btn ${critRange < 6 ? 'active' : ''}`}
                  onClick={() => setCritRange(prev => prev <= 4 ? 6 : prev - 1)}
                  title="Intervalo de Acerto Crítico"
                >
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
                    {critRange === 6 ? '6' : `${critRange}+`}
                  </span>
                </button>
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
                      color: result?.usedAttributeName === 'Poder' ? '#ffcc00' : 
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
