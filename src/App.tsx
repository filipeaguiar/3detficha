import { useEffect, useState, useRef, useMemo } from 'react';
import { useDiceSound } from './useDiceSound';
import { ALL_KITS } from './kitsData';
// @ts-ignore
import DiceBox from '@3d-dice/dice-box';
import { HexColorPicker } from "react-colorful";

export type RollBonus = {
  id: string;
  name: string;
  alias?: string;
  attribute: 'any' | 'poder' | 'habilidade' | 'resistencia';
  bonusType: 'attr_mod' | 'flat' | 'full_attr' | 'none';
  value: number; // For attr_mod (+2, +4) or flat (+1, +2)
  duration: 'instant' | 'scene'; // Instant (1 roll) or Scene (lasts all scene)
  attrSource?: 'poder' | 'habilidade' | 'resistencia'; // For full_attr
  critThresholdMod?: number; // 0, -1, -2 (e.g. -1 reduces 6 to 5+)
  autoCrit?: boolean; // For Titânico (guarantees critical hit)
  extraDice?: number; // 0, 1 (+1D Ganho), -1 (-1D Perda)
  costValue?: number;
  costResource?: 'none' | 'PV' | 'PM' | 'PA';
};

export type CharacterForm = {
  id: string;
  name: string;
  avatarUrl?: string; // Image for this specific form
  poder: number;
  habilidade: number;
  resistencia: number;
  maisVida: number;
  maisMana: number;
  rollBonuses: RollBonus[];
  wildShapeAdvantages?: string[]; // Druid chosen advantages
};

export type CharacterSheet = {
  id: string;
  characterName: string;
  selectedKitId: string;
  accentColor: string;
  soundOn: boolean;
  forms: CharacterForm[];
};

export type KitPower = {
  id: string;
  name: string;
  desc: string;
  type: 'per_scene' | 'per_session' | 'passive' | 'transformation' | 'buff';
  maxUsesPerScene?: number;
  costPM?: number;
  repeatCostPM?: number;
  bonusType?: 'attr_mod' | 'flat' | 'none';
  attribute?: 'any' | 'poder' | 'habilidade' | 'resistencia';
  value?: number;
  extraDice?: number;
  critThresholdMod?: number;
  autoCrit?: boolean;
};

export type CharacterKit = {
  id: string;
  name: string;
  exigencias: string;
  nucleos: string;
  powers: KitPower[];
};

export const KITS_CATALOG: CharacterKit[] = ALL_KITS as CharacterKit[];

export const DRUID_WILD_SHAPE_OPTIONS = [
  { name: 'Aceleração', desc: 'Movimento extra por 1PM / Ganho em fugas' },
  { name: 'Ágil', desc: 'Ganho em iniciativa e testes de agilidade/acrobacia (+1D)' },
  { name: 'Alcance 1', desc: 'Ataques alcançam até Perto' },
  { name: 'Forte', desc: 'P+1 no atributo de Poder para esforço e dano' },
  { name: 'Imune (Anfíbio)', desc: 'Respira e age na água sem penalidades' },
  { name: 'Imune (Resiliente)', desc: 'Imunidade a venenos e doenças naturais' },
  { name: '+Membros', desc: 'Membros extras para ataques ou manobras' },
  { name: 'Paralisia', desc: 'Pode paralisar oponentes gastando PM' },
  { name: 'Regeneração', desc: 'Recupera PV a cada rodada ou descanso' },
  { name: 'Sentido Aguçado', desc: 'Ganho em testes de percepção (olfato/audição)' },
  { name: 'Sentido (Infravisão/Radar)', desc: 'Enxerga no escuro ou detecta por vibração' },
  { name: 'Vigoroso', desc: 'R+2 no atributo de Resistência' },
  { name: 'Voo', desc: 'Capaz de voar em velocidade normal' }
];

export const BONUS_PRESETS: Array<Omit<RollBonus, 'id'>> = [
  {
    name: 'Ataque Especial (Potente)',
    alias: '',
    attribute: 'poder',
    bonusType: 'attr_mod',
    value: 2,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Ataque Especial (Potente II)',
    alias: '',
    attribute: 'poder',
    bonusType: 'attr_mod',
    value: 4,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 2,
    costResource: 'PM',
  },
  {
    name: 'Ataque Especial (Perigoso)',
    alias: '',
    attribute: 'poder',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: -1,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Ataque Especial (Preciso)',
    alias: '',
    attribute: 'habilidade',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Ataque Especial (Choque)',
    alias: '',
    attribute: 'resistencia',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Ataque Especial (Titânico)',
    alias: '',
    attribute: 'poder',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: true,
    extraDice: 0,
    costValue: 3,
    costResource: 'PM',
  },
  {
    name: 'Defesa Especial (Tenaz)',
    alias: '',
    attribute: 'resistencia',
    bonusType: 'attr_mod',
    value: 2,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Defesa Especial (Tenaz II)',
    alias: '',
    attribute: 'resistencia',
    bonusType: 'attr_mod',
    value: 4,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 2,
    costResource: 'PM',
  },
  {
    name: 'Defesa Especial (Blindada)',
    alias: '',
    attribute: 'resistencia',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: -1,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Defesa Especial (Esquiva)',
    alias: '',
    attribute: 'habilidade',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Defesa Especial (Bloqueio)',
    alias: '',
    attribute: 'poder',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 1,
    costResource: 'PM',
  },
  {
    name: 'Defesa Especial (Titânica)',
    alias: '',
    attribute: 'resistencia',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: true,
    extraDice: 0,
    costValue: 3,
    costResource: 'PM',
  },
  {
    name: 'Inspirar (Buff de Cena)',
    alias: '',
    attribute: 'any',
    bonusType: 'flat',
    value: 2,
    duration: 'scene',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 3,
    costResource: 'PM',
  },
  {
    name: 'Plano de Ação (Agente)',
    alias: '',
    attribute: 'habilidade',
    bonusType: 'attr_mod',
    value: 2,
    duration: 'scene',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 2,
    costResource: 'PM',
  },
  {
    name: 'Frenesi de Combate (Bárbaro)',
    alias: '',
    attribute: 'poder',
    bonusType: 'attr_mod',
    value: 3,
    duration: 'scene',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 3,
    costResource: 'PM',
  },
  {
    name: 'Ajudante (Ganho)',
    alias: '',
    attribute: 'any',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 1,
    costValue: 2,
    costResource: 'PM',
  },
  {
    name: 'Carismático (Social)',
    alias: '',
    attribute: 'poder',
    bonusType: 'attr_mod',
    value: 2,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 0,
    costResource: 'none',
  },
  {
    name: 'Arena (+2 na sua Arena)',
    alias: '',
    attribute: 'any',
    bonusType: 'flat',
    value: 2,
    duration: 'scene',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 0,
    costResource: 'none',
  },
  {
    name: 'Inimigo (+2 contra Inimigo)',
    alias: '',
    attribute: 'any',
    bonusType: 'flat',
    value: 2,
    duration: 'scene',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 0,
    costResource: 'none',
  },
  {
    name: 'Ataque Múltiplo (1 Ataque Extra)',
    alias: '',
    attribute: 'poder',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 2,
    costResource: 'PM',
  },
  {
    name: 'Tiro Múltiplo (1 Alvo Extra)',
    alias: '',
    attribute: 'habilidade',
    bonusType: 'none',
    value: 0,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 2,
    costResource: 'PM',
  },
  {
    name: 'Uso de Perícia',
    alias: '',
    attribute: 'any',
    bonusType: 'attr_mod',
    value: 2,
    duration: 'instant',
    critThresholdMod: 0,
    autoCrit: false,
    extraDice: 0,
    costValue: 0,
    costResource: 'none',
  }
];

function normalizeRollBonus(raw: any): RollBonus {
  const name = raw.name || raw.label || 'Bônus';
  let bonusType: RollBonus['bonusType'] = raw.bonusType || 'flat';
  let attrSource: RollBonus['attrSource'] = raw.attrSource;
  
  if (!raw.bonusType && raw.type) {
    if (raw.type === 'fixed') bonusType = 'flat';
    else if (['poder', 'habilidade', 'resistencia'].includes(raw.type)) {
      bonusType = 'full_attr';
      attrSource = raw.type;
    }
  }

  return {
    id: raw.id || Date.now().toString() + Math.random().toString().slice(2, 6),
    name: name,
    alias: raw.alias || '',
    attribute: raw.attribute || 'any',
    bonusType: bonusType,
    value: typeof raw.value === 'number' ? raw.value : 0,
    duration: raw.duration === 'scene' ? 'scene' : 'instant',
    attrSource: attrSource || 'poder',
    critThresholdMod: typeof raw.critThresholdMod === 'number' ? raw.critThresholdMod : 0,
    autoCrit: !!raw.autoCrit,
    extraDice: typeof raw.extraDice === 'number' ? raw.extraDice : 0,
    costValue: typeof raw.costValue === 'number' ? raw.costValue : 1,
    costResource: raw.costResource || 'none',
  };
}

// Compress and resize uploaded image to keep localStorage healthy
function processImageUpload(file: File, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 320;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        callback(dataUrl);
      }
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

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

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const VolumeXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16"/>
    <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
    <path d="M2 17h20"/>
    <path d="M6 8v9"/>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const TransformIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
  </svg>
);

const LeafIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 7-7c4 0 9 2 9 7a7 7 0 0 1-7 7z"/>
    <path d="M11 20v-7"/>
  </svg>
);

const ArrowLeftIcon = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const SegmentedBar = ({ current, max, color, onClick, halfWidth, pulseCount = 0 }: { current: number, max: number, color: string, onClick: () => void, halfWidth?: boolean, pulseCount?: number }) => {
  const segments = [];
  const maxSafe = Math.max(1, max);
  const isHighVolume = maxSafe > 20;

  for (let i = 0; i < maxSafe; i++) {
    const isFilled = i < current;
    const isPulsing = isFilled && i >= current - pulseCount;
    segments.push(
      <div 
        key={i} 
        className={isPulsing ? 'segment-pulse' : ''}
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
          marginRight: '1px'
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

// Initial Data & Multi-Sheet Storage Loader
const loadInitialSheets = (): { sheets: CharacterSheet[]; activeId: string } => {
  const defaultSheet: CharacterSheet = {
    id: 'char_default',
    characterName: 'Dahllan Druida',
    selectedKitId: 'druida',
    accentColor: '#5EB05D',
    soundOn: true,
    forms: [
      {
        id: 'base',
        name: 'Forma Humana',
        poder: 1,
        habilidade: 2,
        resistencia: 2,
        maisVida: 0,
        maisMana: 0,
        rollBonuses: [],
        wildShapeAdvantages: []
      }
    ]
  };

  try {
    const savedList = localStorage.getItem('3det_character_list');
    const savedActiveId = localStorage.getItem('3det_active_character_id');

    if (savedList) {
      const parsedList = JSON.parse(savedList);
      if (Array.isArray(parsedList) && parsedList.length > 0) {
        const normalized = parsedList.map((sheet: any) => ({
          ...sheet,
          forms: (sheet.forms || []).map((f: any) => ({
            ...f,
            rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus)
          }))
        }));
        const activeId = savedActiveId || normalized[0].id;
        return { sheets: normalized, activeId };
      }
    }

    // Migrate from legacy single-sheet storage '3det_ficha'
    const legacySaved = localStorage.getItem('3det_ficha');
    if (legacySaved) {
      const parsed = JSON.parse(legacySaved);
      const migratedSheet: CharacterSheet = {
        id: 'char_' + Date.now(),
        characterName: parsed.characterName || 'Personagem',
        selectedKitId: parsed.selectedKitId || 'druida',
        accentColor: parsed.accentColor || '#ff0066',
        soundOn: parsed.soundOn ?? true,
        forms: Array.isArray(parsed.forms) && parsed.forms.length > 0 ? parsed.forms.map((f: any) => ({
          ...f,
          rollBonuses: (f.rollBonuses || []).map(normalizeRollBonus)
        })) : [
          {
            id: 'base',
            name: 'Forma Normal',
            poder: parsed.poder ?? 1,
            habilidade: parsed.habilidade ?? 1,
            resistencia: parsed.resistencia ?? 1,
            maisVida: parsed.maisVida ?? 0,
            maisMana: parsed.maisMana ?? 0,
            rollBonuses: (parsed.rollBonuses || []).map(normalizeRollBonus),
            wildShapeAdvantages: []
          }
        ]
      };
      return { sheets: [migratedSheet], activeId: migratedSheet.id };
    }
  } catch (e) {
    console.error('Error loading characters from storage:', e);
  }

  return { sheets: [defaultSheet], activeId: defaultSheet.id };
};

export default function App() {
  const initial = useRef(loadInitialSheets()).current;
  const [characterSheets, setCharacterSheets] = useState<CharacterSheet[]>(initial.sheets);
  const [activeCharacterId, setActiveCharacterId] = useState<string>(initial.activeId);

  // Get Active Character Sheet
  const activeSheet = useMemo(() => {
    return characterSheets.find(c => c.id === activeCharacterId) || characterSheets[0];
  }, [characterSheets, activeCharacterId]);

  const [mode, setMode] = useState<'edit' | 'play'>('play');
  const [activeFormIndex, setActiveFormIndex] = useState<number>(0);
  
  // Hidden Drawer Menu state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals state
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [isKitSelectModalOpen, setIsKitSelectModalOpen] = useState(false);
  const [isKitInfoModalOpen, setIsKitInfoModalOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isTransformModalOpen, setIsTransformModalOpen] = useState(false);
  const [isEditingStats, setIsEditingStats] = useState(false);
  const [editingBonusId, setEditingBonusId] = useState<string | null>(null);

  // Search & Filter in Kit Modal
  const [kitSearchQuery, setKitSearchQuery] = useState('');
  const [selectedNucleoFilter, setSelectedNucleoFilter] = useState('all');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const playDiceSound = useDiceSound();

  // Gesture detection for Swipe Right to open Drawer & Swipe Left to close
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;

    // Horizontal swipe threshold
    if (Math.abs(deltaY) < 80) {
      if (deltaX > 60 && !isDrawerOpen) {
        // Swiped Right -> Open Drawer
        setIsDrawerOpen(true);
      } else if (deltaX < -50 && isDrawerOpen) {
        // Swiped Left -> Close Drawer
        setIsDrawerOpen(false);
      }
    }
  };

  // Active Sheet properties
  const characterName = activeSheet.characterName;
  const selectedKitId = activeSheet.selectedKitId;
  const accentColor = activeSheet.accentColor;
  const soundOn = activeSheet.soundOn;
  const forms = activeSheet.forms;

  const currentForm = forms[activeFormIndex] || forms[0];

  // Selected Kit Info
  const currentKit = useMemo(() => {
    return KITS_CATALOG.find(k => k.id === selectedKitId) || KITS_CATALOG[0] || null;
  }, [selectedKitId]);

  // Filtered kits for modal
  const filteredKits = useMemo(() => {
    return KITS_CATALOG.filter(kit => {
      const matchesSearch = kitSearchQuery === '' || 
        kit.name.toLowerCase().includes(kitSearchQuery.toLowerCase()) ||
        kit.exigencias.toLowerCase().includes(kitSearchQuery.toLowerCase()) ||
        kit.powers.some(p => p.name.toLowerCase().includes(kitSearchQuery.toLowerCase()));
      
      const matchesNucleo = selectedNucleoFilter === 'all' || 
        kit.nucleos.toLowerCase().includes(selectedNucleoFilter.toLowerCase());

      return matchesSearch && matchesNucleo;
    });
  }, [kitSearchQuery, selectedNucleoFilter]);

  // Kit Power Uses in Current Scene
  const [usedKitPowers, setUsedKitPowers] = useState<Record<string, number>>({});

  // Current Form Attributes & Derived values
  const poder = currentForm.poder;
  const habilidade = currentForm.habilidade;
  const resistencia = currentForm.resistencia;
  const maisVida = currentForm.maisVida;
  const maisMana = currentForm.maisMana;
  const rollBonuses = currentForm.rollBonuses;

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
  }, [activeFormIndex, activeCharacterId, maxPV, maxPM, maxPA]);

  // Modificadores manuais de rolagem
  const [manualBonusDice, setManualBonusDice] = useState<0 | 1 | 2>(0);
  const [manualCritRange, setManualCritRange] = useState(6);

  // Bônus e Técnicas Ativas
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
    baseAttributeValue: number;
    attrBonusValue: number;
    totalEffectiveAttribute: number;
    flatBonusTotal: number;
    critRangeUsed: number;
    appliedBonuses: { name: string; alias?: string; desc: string; cost?: string }[];
  } | null>(null);

  const diceBoxRef = useRef<any>(null);
  const clearDiceTimeoutRef = useRef<any>(null);

  // Active bonuses list
  const activeBonusesList = useMemo(() => {
    return rollBonuses.filter(b => activeBonuses.has(b.id));
  }, [rollBonuses, activeBonuses]);

  // Kit Power Active Buffs (e.g. Frenesi de Combate P+3)
  const [activeKitBuffs, setActiveKitBuffs] = useState<Set<string>>(new Set());

  // Helper to extract or parse modifiers from Kit Power
  const getKitPowerModifier = (power: KitPower): {
    bonusType: 'attr_mod' | 'flat' | 'none';
    attribute: 'poder' | 'habilidade' | 'resistencia' | 'any';
    value: number;
    extraDice: number;
    critThresholdMod: number;
    autoCrit: boolean;
    duration: 'instant' | 'scene';
  } => {
    if (power.bonusType || power.value || power.extraDice || power.critThresholdMod) {
      return {
        bonusType: power.bonusType || 'attr_mod',
        attribute: power.attribute || 'any',
        value: power.value || 0,
        extraDice: power.extraDice || 0,
        critThresholdMod: power.critThresholdMod || 0,
        autoCrit: !!power.autoCrit,
        duration: power.type === 'buff' || power.type === 'per_scene' ? 'scene' : 'instant'
      };
    }

    const desc = power.desc || '';
    let attr: 'poder' | 'habilidade' | 'resistencia' | 'any' = 'any';
    let val = 0;
    let bType: 'attr_mod' | 'flat' | 'none' = 'none';
    let extraDice = 0;
    let critMod = 0;
    let autoCrit = false;

    if (/P\+(\d+)/i.test(desc)) {
      attr = 'poder';
      val = parseInt(desc.match(/P\+(\d+)/i)![1]);
      bType = 'attr_mod';
    } else if (/H\+(\d+)/i.test(desc)) {
      attr = 'habilidade';
      val = parseInt(desc.match(/H\+(\d+)/i)![1]);
      bType = 'attr_mod';
    } else if (/R\+(\d+)/i.test(desc)) {
      attr = 'resistencia';
      val = parseInt(desc.match(/R\+(\d+)/i)![1]);
      bType = 'attr_mod';
    }

    if (/Ganho/i.test(desc) || /\+1D/i.test(desc)) {
      extraDice = 1;
    }
    if (/Crítico 5\+/i.test(desc)) {
      critMod = -1;
    }

    return {
      bonusType: bType,
      attribute: attr,
      value: val,
      extraDice,
      critThresholdMod: critMod,
      autoCrit,
      duration: power.type === 'buff' || power.type === 'per_scene' ? 'scene' : 'instant'
    };
  };

  const activeKitBuffsList = useMemo(() => {
    if (!currentKit) return [];
    return currentKit.powers
      .filter(p => activeKitBuffs.has(p.id))
      .map(p => ({
        power: p,
        mod: getKitPowerModifier(p)
      }));
  }, [currentKit, activeKitBuffs]);

  // Derived Critical Threshold from active bonuses & active kit buffs
  const calculatedCritRange = useMemo(() => {
    let totalCritMod = 0;
    activeBonusesList.forEach(b => {
      if (b.critThresholdMod) totalCritMod += b.critThresholdMod;
    });
    activeKitBuffsList.forEach(k => {
      if (k.mod.critThresholdMod) totalCritMod += k.mod.critThresholdMod;
    });
    const range = manualCritRange + totalCritMod;
    return Math.max(4, Math.min(6, range));
  }, [activeBonusesList, activeKitBuffsList, manualCritRange]);

  // Derived Extra Dice from active bonuses + active kit buffs + Druid Wild Shape Ágil
  const calculatedTotalExtraDice = useMemo(() => {
    let extra = manualBonusDice;
    activeBonusesList.forEach(b => {
      if (b.extraDice) extra += b.extraDice;
    });
    activeKitBuffsList.forEach(k => {
      if (k.mod.extraDice) extra += k.mod.extraDice;
    });
    if (currentForm.wildShapeAdvantages?.includes('Ágil')) {
      extra += 1;
    }
    return Math.max(0, Math.min(2, extra));
  }, [activeBonusesList, activeKitBuffsList, manualBonusDice, currentForm.wildShapeAdvantages]);

  // Restricted Attribute
  const allowedAttributes = useMemo(() => {
    const required = new Set<'poder' | 'habilidade' | 'resistencia'>();
    activeBonusesList.forEach(b => {
      if (b.attribute && b.attribute !== 'any') {
        required.add(b.attribute);
      }
    });

    if (required.size === 0) {
      return { poder: true, habilidade: true, resistencia: true };
    }
    return {
      poder: required.has('poder'),
      habilidade: required.has('habilidade'),
      resistencia: required.has('resistencia')
    };
  }, [activeBonusesList]);

  // Apply accent color to CSS variables and DiceBox
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
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

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
    document.documentElement.style.setProperty('--accent-text-color', textColor);

    if (diceBoxRef.current) {
      diceBoxRef.current.updateConfig({ themeColor: accentColor });
    }
  }, [accentColor]);

  // Save changes to localStorage
  const saveAllSheets = (updatedSheets: CharacterSheet[], activeId = activeCharacterId) => {
    setCharacterSheets(updatedSheets);
    setActiveCharacterId(activeId);
    localStorage.setItem('3det_character_list', JSON.stringify(updatedSheets));
    localStorage.setItem('3det_active_character_id', activeId);
  };

  const updateActiveSheet = (updates: Partial<CharacterSheet>) => {
    const updatedList = characterSheets.map(sheet =>
      sheet.id === activeCharacterId ? { ...sheet, ...updates } : sheet
    );
    saveAllSheets(updatedList);
  };

  const handleEdit = () => {
    setIsDrawerOpen(false);
    setMode('edit');
    if (diceBoxRef.current) diceBoxRef.current.clear();
    if (clearDiceTimeoutRef.current) clearTimeout(clearDiceTimeoutRef.current);
    setIsModalOpen(false);
    setIsClosing(false);
  };

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

  // Form management for active sheet
  const updateCurrentForm = (updates: Partial<CharacterForm>) => {
    const updatedForms = forms.map((f, i) => i === activeFormIndex ? { ...f, ...updates } : f);
    updateActiveSheet({ forms: updatedForms });
  };

  const addTransformationForm = () => {
    const isDruid = selectedKitId === 'druida';
    const newForm: CharacterForm = {
      id: Date.now().toString(),
      name: isDruid ? 'Forma Selvagem (Fera)' : `Forma Alternativa ${forms.length + 1}`,
      poder: Math.max(1, poder + (isDruid ? 1 : 0)),
      habilidade: habilidade,
      resistencia: Math.max(1, resistencia + (isDruid ? 1 : 0)),
      maisVida: maisVida,
      maisMana: maisMana,
      rollBonuses: [],
      wildShapeAdvantages: isDruid ? ['Ágil', 'Forte'] : []
    };
    const updatedForms = [...forms, newForm];
    updateActiveSheet({ forms: updatedForms });
    setActiveFormIndex(forms.length);
  };

  const removeCurrentForm = (index: number) => {
    if (forms.length <= 1) return;
    const updatedForms = forms.filter((_, i) => i !== index);
    updateActiveSheet({ forms: updatedForms });
    setActiveFormIndex(0);
  };

  // Avatar Upload Handler
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImageUpload(file, (base64Url) => {
      updateCurrentForm({ avatarUrl: base64Url });
    });
  };

  const removeAvatar = () => {
    updateCurrentForm({ avatarUrl: undefined });
  };

  // Character Sheet Switcher Actions
  const createNewCharacter = () => {
    const newSheet: CharacterSheet = {
      id: 'char_' + Date.now(),
      characterName: 'Novo Herói',
      selectedKitId: 'guerreiro',
      accentColor: '#FF9E00',
      soundOn: true,
      forms: [
        {
          id: 'base',
          name: 'Forma Normal',
          poder: 1,
          habilidade: 1,
          resistencia: 1,
          maisVida: 0,
          maisMana: 0,
          rollBonuses: [],
          wildShapeAdvantages: []
        }
      ]
    };
    saveAllSheets([...characterSheets, newSheet], newSheet.id);
    setActiveFormIndex(0);
    setIsSheetsModalOpen(false);
    setIsDrawerOpen(false);
    setMode('edit');
  };

  const duplicateCurrentCharacter = () => {
    const duplicatedSheet: CharacterSheet = {
      ...activeSheet,
      id: 'char_' + Date.now(),
      characterName: `${activeSheet.characterName} (Cópia)`,
      forms: activeSheet.forms.map(f => ({ ...f, id: 'form_' + Date.now() + Math.random().toString().slice(2, 6) }))
    };
    saveAllSheets([...characterSheets, duplicatedSheet], duplicatedSheet.id);
    setActiveFormIndex(0);
  };

  const deleteCharacter = (sheetId: string) => {
    if (characterSheets.length <= 1) {
      alert("Você não pode excluir o único personagem.");
      return;
    }
    const updatedList = characterSheets.filter(s => s.id !== sheetId);
    const nextActive = updatedList[0].id;
    saveAllSheets(updatedList, nextActive);
    setActiveFormIndex(0);
  };

  // Bonus management for current form
  const addCustomBonus = () => {
    const newId = Date.now().toString();
    const newBonus: RollBonus = {
      id: newId,
      name: 'Técnica / Bônus Custom',
      alias: '',
      attribute: 'any',
      bonusType: 'attr_mod',
      value: 2,
      duration: 'instant',
      critThresholdMod: 0,
      autoCrit: false,
      extraDice: 0,
      costValue: 1,
      costResource: 'PM'
    };
    updateCurrentForm({ rollBonuses: [...rollBonuses, newBonus] });
    setEditingBonusId(newId);
  };

  const addPresetBonus = (preset: Omit<RollBonus, 'id'>) => {
    const newId = Date.now().toString();
    const newBonus: RollBonus = {
      ...preset,
      id: newId
    };
    updateCurrentForm({ rollBonuses: [...rollBonuses, newBonus] });
    setIsPresetModalOpen(false);
    setEditingBonusId(newId);
  };

  const removeRollBonus = (id: string) => {
    updateCurrentForm({ rollBonuses: rollBonuses.filter(b => b.id !== id) });
    setActiveBonuses(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateRollBonus = (id: string, updates: Partial<RollBonus>) => {
    updateCurrentForm({
      rollBonuses: rollBonuses.map(b => b.id === id ? { ...b, ...updates } : b)
    });
  };

  const toggleActiveBonus = async (id: string) => {
    const bonus = rollBonuses.find(b => b.id === id);
    if (!bonus) return;

    if (id === 'kit_mago_bateria_de_mana') {
      if (!diceBoxRef.current || rolling) return;
      setRolling(true);
      setResult(null);

      try {
        if (soundOn) {
          const snd = new Audio('/sounds/dice-roll.mp3');
          snd.play().catch(e => console.log('Audio play failed', e));
        }

        diceBoxRef.current.updateConfig({
          themeColor: accentColor,
        });

        diceBoxRef.current.clear();
        
        const diceResults = await diceBoxRef.current.roll('1d6');
        const dResult = diceResults[0];
        
        const rollTotal = dResult.value;
        const total = rollTotal + habilidade;

        setTimeout(() => {
          if (diceBoxRef.current) diceBoxRef.current.clear();
          
          setCurrentPM(prev => Math.min(maxPM, prev + total));

          setResult({
            rolls: [rollTotal],
            diceSum: rollTotal,
            criticals: 0,
            isCriticalFail: false,
            finalTotal: total,
            usedAttributeName: 'Bateria de Mana (PM)',
            baseAttributeValue: habilidade,
            attrBonusValue: 0,
            totalEffectiveAttribute: habilidade,
            flatBonusTotal: 0,
            critRangeUsed: 6,
            appliedBonuses: [{ name: 'Bateria de Mana', desc: `Recuperou ${total} PM.` }]
          });
          setIsModalOpen(true);
          setRolling(false);
        }, 1500);
      } catch(e) {
        console.error(e);
        setRolling(false);
      }
      return;
    }

    setActiveBonuses(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // If scene duration, deduct cost once upon activation
        if (bonus.duration === 'scene' && bonus.costResource && bonus.costResource !== 'none' && bonus.costValue) {
          if (bonus.costResource === 'PM') setCurrentPM(p => Math.max(0, p - (bonus.costValue || 0)));
          if (bonus.costResource === 'PV') setCurrentPV(p => Math.max(0, p - (bonus.costValue || 0)));
          if (bonus.costResource === 'PA') setCurrentPA(p => Math.max(0, p - (bonus.costValue || 0)));
        }
      }
      return next;
    });
  };

  // Kit power usage
  const handleUseKitPower = (power: KitPower) => {
    const mod = getKitPowerModifier(power);
    const isBuff = power.type === 'buff' || mod.bonusType !== 'none' || mod.extraDice !== 0 || mod.critThresholdMod !== 0;

    if (isBuff) {
      setActiveKitBuffs(prev => {
        const next = new Set(prev);
        if (next.has(power.id)) {
          next.delete(power.id);
        } else {
          next.add(power.id);
          const cost = power.costPM || 0;
          if (cost > 0) {
            setCurrentPM(p => Math.max(0, p - cost));
          }
          setUsedKitPowers(u => ({ ...u, [power.id]: (u[power.id] || 0) + 1 }));
        }
        return next;
      });
      return;
    }

    const count = usedKitPowers[power.id] || 0;
    const isFirstUse = count === 0;
    const cost = isFirstUse ? (power.costPM || 0) : (power.repeatCostPM || power.costPM || 0);

    if (cost > 0) {
      setCurrentPM(p => Math.max(0, p - cost));
    }

    setUsedKitPowers(prev => ({
      ...prev,
      [power.id]: count + 1
    }));
  };

  const handleResetScene = () => {
    setUsedKitPowers({});
    setActiveKitBuffs(new Set());
    setActiveBonuses(prev => {
      const next = new Set<string>();
      rollBonuses.forEach(b => {
        if (b.duration !== 'scene' && prev.has(b.id)) {
          next.add(b.id);
        }
      });
      return next;
    });
  };

  // Descanso Completo (Recupera 100% de PV, PM e PA)
  const handleFullRest = () => {
    setCurrentPV(maxPV);
    setCurrentPM(maxPM);
    setCurrentPA(maxPA);
    handleResetScene();
    setIsDrawerOpen(false);
  };

  // Descanso Rápido (Recupera 50% de PV e PM, reseta usos de cena)
  const handleQuickRest = () => {
    const recoverPV = Math.max(1, Math.ceil(maxPV / 2));
    const recoverPM = Math.max(1, Math.ceil(maxPM / 2));
    setCurrentPV(p => Math.min(maxPV, p + recoverPV));
    setCurrentPM(p => Math.min(maxPM, p + recoverPM));
    handleResetScene();
    setIsDrawerOpen(false);
  };

  const getBonusSubtitle = (bonus: RollBonus): string => {
    const parts: string[] = [];
    
    if (bonus.bonusType === 'attr_mod' && bonus.value) {
      const attrLetter = bonus.attribute === 'poder' ? 'P' : bonus.attribute === 'habilidade' ? 'H' : bonus.attribute === 'resistencia' ? 'R' : 'Atributo';
      parts.push(`+${bonus.value} ${attrLetter}`);
    } else if (bonus.bonusType === 'flat' && bonus.value) {
      parts.push(`+${bonus.value} Fixo`);
    } else if (bonus.bonusType === 'full_attr') {
      const srcLetter = bonus.attrSource === 'poder' ? 'P' : bonus.attrSource === 'habilidade' ? 'H' : 'R';
      parts.push(`+${srcLetter}`);
    }

    if (bonus.critThresholdMod && bonus.critThresholdMod < 0) {
      parts.push('Crítico 5+');
    }
    if (bonus.autoCrit) {
      parts.push('Crítico Auto');
    }
    if (bonus.extraDice && bonus.extraDice > 0) {
      parts.push(`+${bonus.extraDice}D Ganho`);
    } else if (bonus.extraDice && bonus.extraDice < 0) {
      parts.push(`${bonus.extraDice}D Perda`);
    }
    if (bonus.duration === 'scene') {
      parts.push('Cena');
    }

    let text = parts.join(' • ');
    if (!text && bonus.name) text = bonus.name;

    if (bonus.costResource && bonus.costResource !== 'none' && bonus.costValue) {
      text += ` [-${bonus.costValue} ${bonus.costResource}]`;
    }
    return text || 'Sem bônus direto';
  };

  const handleStatChange = (stat: 'PA' | 'PM' | 'PV', delta: number) => {
    if (stat === 'PA') setCurrentPA(p => Math.max(0, p + delta));
    else if (stat === 'PM') setCurrentPM(p => Math.max(0, p + delta));
    else if (stat === 'PV') setCurrentPV(p => Math.max(0, p + delta));
  };

  const handleRoll = async (attrName: 'poder' | 'habilidade' | 'resistencia') => {
    if (!diceBoxRef.current || rolling) return;
    if (!allowedAttributes[attrName]) return;

    setRolling(true);
    setIsModalOpen(false);
    setIsClosing(false);
    
    if (clearDiceTimeoutRef.current) {
      clearTimeout(clearDiceTimeoutRef.current);
      clearDiceTimeoutRef.current = null;
    }

    let baseAttrValue = 0;
    let label = '';
    if (attrName === 'poder') {
      baseAttrValue = poder + (currentForm.wildShapeAdvantages?.includes('Forte') ? 1 : 0);
      label = 'Poder';
    } else if (attrName === 'habilidade') {
      baseAttrValue = habilidade;
      label = 'Habilidade';
    } else if (attrName === 'resistencia') {
      baseAttrValue = resistencia + (currentForm.wildShapeAdvantages?.includes('Vigoroso') ? 2 : 0);
      label = 'Resistência';
    }

    let attrModValue = 0;
    let flatBonusTotal = 0;
    let hasAutoCrit = false;
    const appliedBonuses: { name: string; alias?: string; desc: string; cost?: string }[] = [];

    activeBonusesList.forEach(bonus => {
      let desc = '';
      if (bonus.bonusType === 'attr_mod') {
        attrModValue += bonus.value;
        desc = `+${bonus.value} no Atributo`;
      } else if (bonus.bonusType === 'flat') {
        flatBonusTotal += bonus.value;
        desc = `+${bonus.value} Total`;
      } else if (bonus.bonusType === 'full_attr') {
        const val = bonus.attrSource === 'poder' ? poder : bonus.attrSource === 'habilidade' ? habilidade : resistencia;
        flatBonusTotal += val;
        desc = `+${val} (${bonus.attrSource})`;
      }

      if (bonus.critThresholdMod) desc += desc ? ' | Crítico 5+' : 'Crítico 5+';
      if (bonus.autoCrit) {
        hasAutoCrit = true;
        desc += desc ? ' | Crítico Automático' : 'Crítico Automático';
      }
      if (bonus.extraDice) {
        desc += desc ? ` | ${bonus.extraDice > 0 ? '+' : ''}${bonus.extraDice}D` : `${bonus.extraDice > 0 ? '+' : ''}${bonus.extraDice}D`;
      }

      let costStr = '';
      if (bonus.duration === 'instant' && bonus.costResource && bonus.costResource !== 'none' && bonus.costValue) {
        costStr = `-${bonus.costValue} ${bonus.costResource}`;
      } else if (bonus.duration === 'scene') {
        costStr = 'Buff de Cena';
      }

      appliedBonuses.push({
        name: bonus.name,
        alias: bonus.alias,
        desc,
        cost: costStr
      });
    });

    // Apply Active Kit Buffs (e.g. Frenesi de Combate P+3)
    activeKitBuffsList.forEach(k => {
      const mod = k.mod;
      let desc = '';
      if (mod.bonusType === 'attr_mod' && (mod.attribute === attrName || mod.attribute === 'any')) {
        attrModValue += mod.value;
        desc = `+${mod.value} no Atributo`;
      } else if (mod.bonusType === 'flat') {
        flatBonusTotal += mod.value;
        desc = `+${mod.value} Total`;
      }

      if (mod.critThresholdMod) desc += desc ? ' | Crítico 5+' : 'Crítico 5+';
      if (mod.autoCrit) {
        hasAutoCrit = true;
        desc += desc ? ' | Crítico Automático' : 'Crítico Automático';
      }
      if (mod.extraDice) {
        desc += desc ? ` | ${mod.extraDice > 0 ? '+' : ''}${mod.extraDice}D` : `${mod.extraDice > 0 ? '+' : ''}${mod.extraDice}D`;
      }

      appliedBonuses.push({
        name: k.power.name,
        desc: desc || 'Poder de Kit Ativo',
        cost: 'Buff de Cena'
      });
    });

    const totalEffectiveAttribute = Math.max(0, baseAttrValue + attrModValue);
    const diceCount = Math.max(1, Math.min(3, 1 + calculatedTotalExtraDice));
    const effectiveCritRange = calculatedCritRange;

    try {
      if (soundOn) {
        playDiceSound(diceCount);
      }

      const randomSpin = 4 + (Math.random() * 3);
      const randomThrow = 4 + (Math.random() * 3);
      const randomHeight = 7 + (Math.random() * 3);
      
      diceBoxRef.current.updateConfig({
        spinForce: randomSpin,
        throwForce: randomThrow,
        startingHeight: randomHeight
      });

      diceBoxRef.current.clear();
      window.dispatchEvent(new Event('resize'));
      
      const diceResults = await diceBoxRef.current.roll(`${diceCount}d6`);
      
      clearDiceTimeoutRef.current = setTimeout(() => {
        if (diceBoxRef.current) diceBoxRef.current.clear();
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
      
      let rolledCrits = rolls.filter((r) => r >= effectiveCritRange).length;
      if (hasAutoCrit && rolledCrits === 0) {
        rolledCrits = 1;
      }
      const criticals = rolledCrits;

      const finalTotal = diceSum + totalEffectiveAttribute + (totalEffectiveAttribute * criticals) + flatBonusTotal;

      // Deduct resource costs for instant bonuses
      const instantBonuses = activeBonusesList.filter(b => b.duration === 'instant');
      const costPV = instantBonuses.filter(b => b.costResource === 'PV').reduce((sum, b) => sum + (b.costValue || 0), 0);
      const costPM = instantBonuses.filter(b => b.costResource === 'PM').reduce((sum, b) => sum + (b.costValue || 0), 0);
      const costPA = instantBonuses.filter(b => b.costResource === 'PA').reduce((sum, b) => sum + (b.costValue || 0), 0);
      
      if (costPV > 0) setCurrentPV(prev => Math.max(0, prev - costPV));
      if (costPM > 0) setCurrentPM(prev => Math.max(0, prev - costPM));
      if (costPA > 0) setCurrentPA(prev => Math.max(0, prev - costPA));

      // Auto-deactivate instant bonuses
      setActiveBonuses(prev => {
        const next = new Set<string>();
        rollBonuses.forEach(b => {
          if (b.duration === 'scene' && prev.has(b.id)) {
            next.add(b.id);
          }
        });
        return next;
      });

      setResult({
        rolls,
        diceSum,
        criticals,
        isCriticalFail,
        finalTotal,
        usedAttributeName: label,
        baseAttributeValue: baseAttrValue,
        attrBonusValue: attrModValue,
        totalEffectiveAttribute,
        flatBonusTotal,
        critRangeUsed: effectiveCritRange,
        appliedBonuses
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
    }, 400);
  };

  const instantActiveBonuses = activeBonusesList.filter(b => b.duration === 'instant');
  const totalCostPV = instantActiveBonuses.filter(b => b.costResource === 'PV').reduce((sum, b) => sum + (b.costValue || 0), 0);
  const totalCostPM = instantActiveBonuses.filter(b => b.costResource === 'PM').reduce((sum, b) => sum + (b.costValue || 0), 0);
  const totalCostPA = instantActiveBonuses.filter(b => b.costResource === 'PA').reduce((sum, b) => sum + (b.costValue || 0), 0);

  // Active actionable kit powers (powers that can be tapped in gameplay)
  const activeKitActionPowers = useMemo(() => {
    if (!currentKit) return [];
    return currentKit.powers.filter(p => p.type === 'per_scene' || p.type === 'per_session' || p.type === 'buff');
  }, [currentKit]);

  return (
    <>
      <div id="dice-box" style={{ visibility: mode === 'play' ? 'visible' : 'hidden' }}></div>
      
      {/* Hidden File Input for Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div 
        className="app-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {mode === 'edit' && (
          <div className="panel slide-up" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', maxWidth: '650px', margin: '0 auto', width: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h1 className="panel-title" style={{ margin: 0 }}>Cadastro da Ficha</h1>
              <button
                className="control-btn"
                style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                onClick={() => setIsSheetsModalOpen(true)}
              >
                <UsersIcon /> Trocar Ficha
              </button>
            </div>
            
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

            {/* Seleção do Kit de Personagem (Card Otimizado para Mobile / Android) */}
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
                <div 
                  className="kit-selected-preview"
                  onClick={() => setIsKitSelectModalOpen(true)}
                  title="Clique para trocar de kit"
                >
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
                <button 
                  className="control-btn" 
                  style={{ width: '100%', padding: '0.6rem' }}
                  onClick={() => setIsKitSelectModalOpen(true)}
                >
                  Selecionar Kit
                </button>
              )}
            </div>

            {/* Cor do Personagem */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <div className="stat-label" style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>COR DO PERSONAGEM (DADOS)</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <HexColorPicker color={accentColor} onChange={(c) => updateActiveSheet({ accentColor: c })} />
                <div style={{ marginTop: '0.5rem', color: accentColor, fontWeight: 'bold' }}>{accentColor.toUpperCase()}</div>
              </div>
            </div>

            {/* Gerenciamento de Formas / Transformação */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h2 className="panel-title" style={{ margin: 0, fontSize: '1.4rem' }}>Formas & Transformações</h2>
              <button 
                className="control-btn" 
                style={{ width: 'auto', padding: '0.3rem 0.8rem', fontSize: '0.85rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}
                onClick={addTransformationForm}
              >
                <PlusIcon /> Nova Forma
              </button>
            </div>

            {/* Abas de Formas */}
            <div className="form-tabs-container" style={{ marginBottom: '1.5rem' }}>
              {forms.map((form, idx) => (
                <button
                  key={form.id}
                  className={`form-tab-btn ${activeFormIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveFormIndex(idx)}
                >
                  <span>{form.name}</span>
                  {forms.length > 1 && idx !== 0 && (
                    <span 
                      className="form-tab-close" 
                      onClick={(e) => { e.stopPropagation(); removeCurrentForm(idx); }}
                      title="Remover esta forma"
                    >
                      <CloseIcon size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Avatar & Nome da Forma Ativa */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem', background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
              
              {/* Avatar Box with Upload trigger */}
              <div 
                className="avatar-preview-box"
                onClick={() => fileInputRef.current?.click()}
                title="Clique para alterar a imagem desta forma"
                style={{ borderColor: accentColor }}
              >
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
                <input
                  type="text"
                  className="input-number"
                  value={currentForm.name}
                  onChange={(e) => updateCurrentForm({ name: e.target.value })}
                  placeholder="Ex: Humano, Lobo, Urso..."
                  style={{ marginBottom: '0.5rem' }}
                />

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="control-btn"
                    style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CameraIcon /> Upload Imagem
                  </button>
                  {currentForm.avatarUrl && (
                    <button
                      className="control-btn"
                      style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}
                      onClick={removeAvatar}
                    >
                      Remover Imagem
                    </button>
                  )}
                </div>
              </div>
            </div>

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

            {/* Vantagens da Forma Selvagem (Druida) */}
            {selectedKitId === 'druida' && activeFormIndex > 0 && (
              <div style={{ background: 'rgba(94,176,93,0.15)', border: '1px solid #5EB05D', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: '#5EB05D', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <LeafIcon size={16} /> Vantagens da Forma Selvagem (2 Gratuitas)
                  </span>
                  <button
                    className="control-btn"
                    style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.75rem', borderColor: '#5EB05D', color: '#5EB05D' }}
                    onClick={() => setIsTransformModalOpen(true)}
                  >
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

            <h2 className="panel-title" style={{ marginTop: '2rem' }}>Técnicas & Bônus desta Forma</h2>
            <div className="bonus-editor-list">
              {rollBonuses.map((bonus) => (
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
                        <span className="bonus-attr-badge" style={{ color: '#33ccff', borderColor: '#33ccff' }}>
                          CENA
                        </span>
                      )}
                      {bonus.attribute !== 'any' && (
                        <span className="bonus-attr-badge" style={{ 
                          color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D',
                          borderColor: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D'
                        }}>
                          {bonus.attribute.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', marginTop: '2px' }}>
                      {getBonusSubtitle(bonus)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      className="bonus-remove-btn"
                      style={{ color: 'var(--text-muted)' }}
                      onClick={() => setEditingBonusId(bonus.id)}
                      title="Editar técnica"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      className="bonus-remove-btn"
                      onClick={() => removeRollBonus(bonus.id)}
                      title="Remover técnica"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <button className="bonus-add-btn" onClick={() => setIsPresetModalOpen(true)} style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                <BookIcon /> Preset do Livro
              </button>
              <button className="bonus-add-btn" onClick={addCustomBonus}>
                <PlusIcon /> Técnica Custom
              </button>
            </div>

            <button className="btn-roll" onClick={() => setMode('play')} style={{ marginTop: '2rem' }}>
              Salvar e Jogar
            </button>
          </div>
        )}

        {mode === 'play' && (
          <div style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* FIGHTING GAME HUD (Cleaned of extra buttons, single toggle trigger + swipe right) */}
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
              {/* Menu trigger button (hamburger) */}
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex' }}>
                <button 
                  onClick={() => setIsDrawerOpen(true)} 
                  className="hud-menu-trigger"
                  title="Menu do Personagem (Deslize para a direita ou clique)"
                >
                  <MenuIcon />
                </button>
              </div>

              {/* Portrait Area - Click to switch form */}
              <div 
                style={{ 
                  width: '90px', 
                  height: '110px', 
                  backgroundColor: 'var(--surface-hover)', 
                  border: '3px solid var(--accent-color)', 
                  transform: 'skewX(-10deg)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 0 15px var(--accent-transparent)',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: forms.length > 1 ? 'pointer' : 'default'
                }}
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
                      alert("PM insuficiente para mudar de forma (Custo: 1 PM).");
                    }
                  }
                }}
                title={forms.length > 1 ? `Clique para transformar: Próxima forma (${forms[(activeFormIndex + 1) % forms.length].name})` : currentForm.name}
              >
                {currentForm.avatarUrl ? (
                  <img 
                    src={currentForm.avatarUrl} 
                    alt={currentForm.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      transform: 'skewX(10deg) scale(1.15)' 
                    }} 
                  />
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

              {/* Bars Area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingRight: '2.5rem' }}>
                  <h1 style={{ 
                    fontFamily: 'Bebas Neue, sans-serif', 
                    fontSize: '1.8rem', 
                    margin: '0', 
                    color: '#fff', 
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textShadow: '2px 2px 0px #000'
                  }}>
                    {characterName || 'HERÓI DESCONHECIDO'}
                  </h1>
                  
                  {/* Clean Kit Badge with Info Trigger */}
                  {currentKit && (
                    <button
                      className="kit-pill-badge"
                      onClick={() => setIsKitInfoModalOpen(true)}
                      title="Ver detalhes dos poderes do Kit"
                    >
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

            {/* Compact Actionable Kit Powers Row */}
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
                    statusTag = (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        <CheckIcon size={11} /> ATIVO {mod.value ? `(+${mod.value}${attrLetter})` : ''}
                      </span>
                    );
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
                    <button
                      key={power.id}
                      className={`kit-compact-power-btn ${isActiveBuff ? 'active-buff' : isAvailable ? 'available' : 'used'}`}
                      onClick={() => handleUseKitPower(power)}
                      title={`${power.name}: ${power.desc}`}
                    >
                      <span className="power-btn-name">{power.name}</span>
                      <span className="power-btn-tag">{statusTag}</span>
                    </button>
                  );
                })}

                {selectedKitId === 'druida' && activeFormIndex > 0 && (
                  <button
                    className="kit-compact-power-btn available"
                    style={{ borderColor: '#5EB05D', color: '#5EB05D', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    onClick={() => setIsTransformModalOpen(true)}
                    title="Configurar as 2 vantagens extras da Forma Selvagem"
                  >
                    <LeafIcon size={14} />
                    <span className="power-btn-name">Vantagens Fera</span>
                    <span className="power-btn-tag">{currentForm.wildShapeAdvantages?.length || 0}/2</span>
                  </button>
                )}
              </div>
            )}
            
            <div className="panel slide-up" style={{ animationDelay: '0.15s', width: '100%' }}>
              <div className="stats-grid">
                <button 
                  className={`stat-box roll-btn ${!allowedAttributes.poder ? 'disabled-attribute' : ''}`}
                  style={{ '--btn-color': '#FF9E00', '--btn-text-color': '#ffffff' } as React.CSSProperties} 
                  onClick={() => handleRoll('poder')} 
                  disabled={rolling || !allowedAttributes.poder}
                  title={!allowedAttributes.poder ? "Desabilitado pela técnica selecionada" : "Rolar Poder"}
                >
                  <div className="stat-icon-container"><PoderIcon /></div>
                  <div className="stat-value corner">
                    {poder + (currentForm.wildShapeAdvantages?.includes('Forte') ? 1 : 0)}
                  </div>
                </button>
                <button 
                  className={`stat-box roll-btn ${!allowedAttributes.habilidade ? 'disabled-attribute' : ''}`}
                  style={{ '--btn-color': '#894EC6', '--btn-text-color': '#ffffff' } as React.CSSProperties} 
                  onClick={() => handleRoll('habilidade')} 
                  disabled={rolling || !allowedAttributes.habilidade}
                  title={!allowedAttributes.habilidade ? "Desabilitado pela técnica selecionada" : "Rolar Habilidade"}
                >
                  <div className="stat-icon-container"><HabilidadeIcon /></div>
                  <div className="stat-value corner">{habilidade}</div>
                </button>
                <button 
                  className={`stat-box roll-btn ${!allowedAttributes.resistencia ? 'disabled-attribute' : ''}`}
                  style={{ '--btn-color': '#5EB05D', '--btn-text-color': '#ffffff' } as React.CSSProperties} 
                  onClick={() => handleRoll('resistencia')} 
                  disabled={rolling || !allowedAttributes.resistencia}
                  title={!allowedAttributes.resistencia ? "Desabilitado pela técnica selecionada" : "Rolar Resistência"}
                >
                  <div className="stat-icon-container"><ResistenciaIcon /></div>
                  <div className="stat-value corner">
                    {resistencia + (currentForm.wildShapeAdvantages?.includes('Vigoroso') ? 2 : 0)}
                  </div>
                </button>
              </div>
            
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />
            
              <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Modificadores de Rolagem</h2>
            
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button 
                  className={`toggle-btn ${calculatedTotalExtraDice > 0 ? 'active' : ''}`}
                  onClick={() => setManualBonusDice(prev => (prev >= 2 ? 0 : prev + 1) as 0 | 1 | 2)}
                  title={`Dados na rolagem: ${1 + calculatedTotalExtraDice}D (Base: 1D + Modificadores: ${calculatedTotalExtraDice}D)`}
                >
                  <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center' }}>
                    <CubeIcon />
                    {calculatedTotalExtraDice >= 1 && <CubeIcon />}
                    {calculatedTotalExtraDice >= 2 && <CubeIcon />}
                  </div>
                </button>

                <button 
                  className={`toggle-btn ${calculatedCritRange < 6 ? 'active' : ''}`}
                  onClick={() => setManualCritRange(prev => prev <= 4 ? 6 : prev - 1)}
                  title={`Intervalo de Acerto Crítico: ${calculatedCritRange === 6 ? '6' : `${calculatedCritRange}+`}`}
                >
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px' }}>
                    {calculatedCritRange === 6 ? '6' : `${calculatedCritRange}+`}
                  </span>
                </button>
              </div>

              {rollBonuses.length > 0 && (
                <div className="form-group">
                  <h2 className="panel-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Técnicas & Bônus</h2>
                  <div className="bonus-toggles-grid">
                    {rollBonuses.map((bonus) => {
                      const isActive = activeBonuses.has(bonus.id);
                      return (
                        <button
                          key={bonus.id}
                          className={`bonus-toggle ${isActive ? 'active' : ''}`}
                          onClick={() => toggleActiveBonus(bonus.id)}
                          title={`${bonus.alias || bonus.name}: ${getBonusSubtitle(bonus)}`}
                        >
                          <div className="bonus-toggle-header">
                            <span className="bonus-toggle-label">
                              {bonus.alias ? bonus.alias : bonus.name}
                            </span>
                            {bonus.duration === 'scene' && (
                              <span className="bonus-attr-micro" style={{ background: '#33ccff', color: '#000' }}>
                                CENA
                              </span>
                            )}
                            {bonus.attribute !== 'any' && (
                              <span className="bonus-attr-micro" style={{
                                color: bonus.attribute === 'poder' ? '#FF9E00' : bonus.attribute === 'habilidade' ? '#894EC6' : '#5EB05D'
                              }}>
                                {bonus.attribute.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          {bonus.alias && (
                            <span className="bonus-toggle-raw-name">{bonus.name}</span>
                          )}
                          <span className="bonus-toggle-value">{getBonusSubtitle(bonus)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MENU OCULTO LATERAL (DRAWER - DESLIZE PARA A DIREITA)     */}
      {/* ======================================================== */}
      {isDrawerOpen && (
        <div 
          className="drawer-backdrop fade-in"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div 
            className="drawer-panel slide-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className="drawer-avatar-thumb" style={{ borderColor: accentColor }}>
                  {currentForm.avatarUrl ? (
                    <img src={currentForm.avatarUrl} alt={currentForm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: accentColor, fontWeight: 'bold', fontSize: '1.4rem', fontFamily: 'Bebas Neue, sans-serif' }}>
                      {characterName ? characterName.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#fff', letterSpacing: '1px' }}>
                    {characterName || 'HERÓI'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)' }}>
                    {currentKit ? currentKit.name : 'Sem Kit'}
                  </div>
                </div>
              </div>

              <button className="modal-close" onClick={() => setIsDrawerOpen(false)}><CloseIcon size={18} /></button>
            </div>

            {/* Drawer Menu Items */}
            <div className="drawer-items-list">
              <button 
                className="drawer-menu-item"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsSheetsModalOpen(true);
                }}
              >
                <div className="drawer-item-icon"><UsersIcon /></div>
                <div className="drawer-item-content">
                  <div className="drawer-item-title">Trocar de Personagem</div>
                  <div className="drawer-item-subtitle">Alternar entre suas fichas salvas</div>
                </div>
              </button>

              <button 
                className="drawer-menu-item"
                onClick={handleFullRest}
              >
                <div className="drawer-item-icon" style={{ color: '#5EB05D' }}><BedIcon /></div>
                <div className="drawer-item-content">
                  <div className="drawer-item-title" style={{ color: '#5EB05D' }}>Realizar Descanso Completo</div>
                  <div className="drawer-item-subtitle">Recupera 100% dos PV, PM e PA (Dormir / 8h)</div>
                </div>
              </button>

              <button 
                className="drawer-menu-item"
                onClick={handleQuickRest}
              >
                <div className="drawer-item-icon" style={{ color: '#FF9E00' }}><ZapIcon /></div>
                <div className="drawer-item-content">
                  <div className="drawer-item-title" style={{ color: '#FF9E00' }}>Descanso Rápido</div>
                  <div className="drawer-item-subtitle">Recupera +50% dos PV e PM (Fôlego / Pausa Curta)</div>
                </div>
              </button>

              <button 
                className="drawer-menu-item"
                onClick={() => {
                  handleResetScene();
                  setIsDrawerOpen(false);
                }}
              >
                <div className="drawer-item-icon" style={{ color: 'var(--accent-color)' }}><ResetIcon /></div>
                <div className="drawer-item-content">
                  <div className="drawer-item-title">Nova Cena (Resetar)</div>
                  <div className="drawer-item-subtitle">Restaura usos de poderes e buffs de cena</div>
                </div>
              </button>

              <button 
                className="drawer-menu-item"
                onClick={() => {
                  updateActiveSheet({ soundOn: !soundOn });
                }}
              >
                <div className="drawer-item-icon" style={{ color: soundOn ? 'var(--accent-color)' : 'var(--text-muted)' }}>
                  {soundOn ? <VolumeIcon /> : <VolumeXIcon />}
                </div>
                <div className="drawer-item-content">
                  <div className="drawer-item-title">Som dos Dados 3D</div>
                  <div className="drawer-item-subtitle">{soundOn ? 'Ativado (Clique para desativar)' : 'Desativado (Clique para ativar)'}</div>
                </div>
              </button>

              <button 
                className="drawer-menu-item"
                onClick={handleEdit}
              >
                <div className="drawer-item-icon"><PencilIcon /></div>
                <div className="drawer-item-content">
                  <div className="drawer-item-title">Editar Ficha</div>
                  <div className="drawer-item-subtitle">Modificar atributos, técnicas, avatar e kits</div>
                </div>
              </button>
            </div>

            <div className="drawer-footer-hint" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ArrowLeftIcon size={14} />
              <span>Deslize para a esquerda para fechar</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Seleção de Kits com Busca (Otimizado para Mobile / Android) */}
      {isKitSelectModalOpen && (
        <div className="modal-overlay pop-in" style={{ zIndex: 390, alignItems: 'center' }} onClick={(e) => {
          if (e.target === e.currentTarget) setIsKitSelectModalOpen(false);
        }}>
          <div className="modal-content" style={{ 
            borderRadius: '4px',
            borderTop: '2px solid var(--accent-color)',
            borderBottom: '2px solid var(--accent-color)',
            background: 'rgba(15, 18, 26, 0.96)',
            boxShadow: '0 0 25px var(--accent-transparent)',
            maxWidth: '550px',
            width: '92%',
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <button className="modal-close" onClick={() => setIsKitSelectModalOpen(false)}><CloseIcon size={18} /></button>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.2rem', color: '#fff', letterSpacing: '1px' }}>
              SELECIONAR KIT ({filteredKits.length})
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
              Manual do Arcanauta — Escolha o caminho do seu herói:
            </p>

            {/* Search Input */}
            <div className="kit-search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Buscar por nome, perícia ou poder..."
                value={kitSearchQuery}
                onChange={(e) => setKitSearchQuery(e.target.value)}
                className="kit-search-input"
              />
              {kitSearchQuery && (
                <button className="kit-search-clear" onClick={() => setKitSearchQuery('')}><CloseIcon size={14} /></button>
              )}
            </div>

            {/* Núcleo Filter Chips */}
            <div className="kit-nucleo-chips">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'Arcas', label: 'Era das Arcas' },
                { id: 'Galáxia', label: 'Guerra da Galáxia' },
                { id: 'ALPHA', label: 'Tormenta ALPHA' },
                { id: 'UniPotência', label: 'UniPotência' },
                { id: 'ARSENAL', label: 'Operação ARSENAL' }
              ].map(chip => (
                <button
                  key={chip.id}
                  className={`kit-chip-btn ${selectedNucleoFilter === chip.id ? 'active' : ''}`}
                  onClick={() => setSelectedNucleoFilter(chip.id)}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Kits List */}
            <div className="kit-cards-scroll-list">
              {filteredKits.map((kit) => {
                const isSelected = kit.id === selectedKitId;
                return (
                  <div
                    key={kit.id}
                    className={`kit-card-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      const newBonuses: RollBonus[] = kit.powers.map(p => ({
                        id: 'kit_' + p.id,
                        name: p.name,
                        alias: '',
                        attribute: p.attribute || 'any',
                        bonusType: p.bonusType || 'none',
                        value: p.value || 0,
                        duration: p.type === 'per_scene' ? 'scene' : 'instant',
                        critThresholdMod: p.critThresholdMod || 0,
                        autoCrit: p.autoCrit || false,
                        extraDice: p.extraDice || 0,
                        costValue: p.costPM || 0,
                        costResource: (p.costPM && p.costPM > 0) ? 'PM' : 'none'
                      }));
                      
                      const updatedForms = [...forms];
                      // Remove old kit powers to prevent duplicates
                      const cleanedBonuses = updatedForms[activeFormIndex].rollBonuses.filter(b => !b.id.startsWith('kit_'));
                      updatedForms[activeFormIndex] = {
                        ...updatedForms[activeFormIndex],
                        rollBonuses: [...cleanedBonuses, ...newBonuses]
                      };

                      updateActiveSheet({ selectedKitId: kit.id, forms: updatedForms });
                      setIsKitSelectModalOpen(false);
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.25rem', color: isSelected ? 'var(--accent-color)' : '#fff', letterSpacing: '0.5px' }}>
                        {kit.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--bg-color)', padding: '2px 6px', borderRadius: '3px' }}>
                        {kit.nucleos}
                      </span>
                    </div>

                    {kit.exigencias && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        <strong style={{ color: 'var(--text-main)' }}>Exigências:</strong> {kit.exigencias}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '6px', flexWrap: 'wrap' }}>
                      {kit.powers.map(p => (
                        <span key={p.id} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '3px', color: 'var(--text-main)' }}>
                          • {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {filteredKits.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  Nenhum kit encontrado com os filtros atuais.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes dos Poderes do Kit (Acessível pelo badge na gameplay) */}
      {isKitInfoModalOpen && currentKit && (
        <div className="modal-overlay pop-in" style={{ zIndex: 390, alignItems: 'center' }} onClick={(e) => {
          if (e.target === e.currentTarget) setIsKitInfoModalOpen(false);
        }}>
          <div className="modal-content" style={{ 
            borderRadius: '4px',
            borderTop: '2px solid var(--accent-color)',
            borderBottom: '2px solid var(--accent-color)',
            background: 'rgba(15, 18, 26, 0.96)',
            boxShadow: '0 0 25px var(--accent-transparent)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <button className="modal-close" onClick={() => setIsKitInfoModalOpen(false)}><CloseIcon size={18} /></button>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.2rem', color: 'var(--accent-color)', letterSpacing: '1px' }}>
              KIT: {currentKit.name.toUpperCase()}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <div><strong style={{ color: '#fff' }}>Exigências:</strong> {currentKit.exigencias || 'Nenhuma'}</div>
              <div><strong style={{ color: '#fff' }}>Núcleos:</strong> {currentKit.nucleos}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {currentKit.powers.map((power, idx) => (
                <div key={power.id || idx} style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.05rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.5px' }}>
                      {power.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', textTransform: 'uppercase', border: '1px solid var(--accent-color)', padding: '1px 5px', borderRadius: '3px' }}>
                      {power.type === 'per_scene' ? '1x Cena' : power.type === 'per_session' ? '1x Sessão' : power.type === 'buff' ? 'Buff' : 'Passivo'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.4', opacity: 0.9 }}>
                    {power.desc}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-roll"
              style={{ marginTop: '1.2rem' }}
              onClick={() => setIsKitInfoModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Gerenciamento de Múltiplas Fichas */}
      {isSheetsModalOpen && (
        <div className="modal-overlay pop-in" style={{ zIndex: 380, alignItems: 'center' }} onClick={(e) => {
          if (e.target === e.currentTarget) setIsSheetsModalOpen(false);
        }}>
          <div className="modal-content" style={{ 
            borderRadius: '4px',
            borderTop: '2px solid var(--accent-color)',
            borderBottom: '2px solid var(--accent-color)',
            background: 'rgba(15, 18, 26, 0.95)',
            boxShadow: '0 0 25px var(--accent-transparent)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <button className="modal-close" onClick={() => setIsSheetsModalOpen(false)}><CloseIcon size={18} /></button>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.3rem', color: '#fff', letterSpacing: '1px' }}>
              MEUS PERSONAGENS (FICHAS)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
              Selecione uma ficha salva para jogar, crie novas ou duplique:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {characterSheets.map((sheet) => {
                const isActive = sheet.id === activeCharacterId;
                const mainForm = sheet.forms[0] || {};
                const kit = KITS_CATALOG.find(k => k.id === sheet.selectedKitId);

                return (
                  <div 
                    key={sheet.id}
                    className={`character-sheet-card ${isActive ? 'active-sheet' : ''}`}
                    onClick={() => {
                      saveAllSheets(characterSheets, sheet.id);
                      setActiveFormIndex(0);
                      setIsSheetsModalOpen(false);
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="sheet-card-avatar" style={{ borderColor: sheet.accentColor }}>
                      {mainForm.avatarUrl ? (
                        <img src={mainForm.avatarUrl} alt={sheet.characterName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: sheet.accentColor, fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'Bebas Neue, sans-serif' }}>
                          {sheet.characterName ? sheet.characterName.charAt(0).toUpperCase() : '?'}
                        </span>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.5px' }}>
                          {sheet.characterName || 'Sem nome'}
                        </span>
                        {isActive && (
                          <span style={{ fontSize: '0.65rem', background: 'var(--accent-color)', color: '#fff', padding: '1px 5px', borderRadius: '3px' }}>
                            ATIVA
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Kit: <strong style={{ color: '#fff' }}>{kit ? kit.name : 'Personalizado'}</strong> • {sheet.forms.length} {sheet.forms.length === 1 ? 'forma' : 'formas'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        className="bonus-remove-btn"
                        onClick={() => duplicateCurrentCharacter()}
                        title="Duplicar ficha"
                      >
                        <CopyIcon />
                      </button>
                      {characterSheets.length > 1 && (
                        <button
                          className="bonus-remove-btn"
                          onClick={() => deleteCharacter(sheet.id)}
                          title="Excluir ficha"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="btn-roll"
              style={{ marginTop: '1.2rem' }}
              onClick={createNewCharacter}
            >
              <PlusIcon /> Criar Nova Ficha
            </button>
          </div>
        </div>
      )}

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
              <div className="total-label">
                Resultado ({result?.usedAttributeName}) {result?.critRangeUsed < 6 && `[Crítico ${result.critRangeUsed}+]`}
              </div>
              <div className="total-score">{result?.finalTotal}</div>
            </div>

            {/* Visual breakdown formula */}
            <div className="result-summary">
              <div className="sum-line">
                <div className="sum-parts">
                  {result?.rolls.map((roll, i) => (
                    <span key={i} className="sum-bonus-part">
                      <div className={`sum-dice-face ${roll >= (result?.critRangeUsed ?? 6) ? 'crit' : ''} ${roll === 1 ? 'fail' : ''}`}>
                        {roll}
                      </div>
                      <span className="sum-operator">+</span>
                    </span>
                  ))}

                  <span className="sum-attr">
                    {result?.totalEffectiveAttribute}
                    <span className="sum-attr-label" style={{ 
                      color: result?.usedAttributeName === 'Poder' ? '#FF9E00' : 
                             result?.usedAttributeName === 'Habilidade' ? '#894EC6' : 
                             result?.usedAttributeName === 'Resistência' ? '#5EB05D' : 'var(--accent-color)' 
                    }}>
                      {result?.usedAttributeName?.charAt(0)}{result?.attrBonusValue ? `(+${result.attrBonusValue})` : ''}
                    </span>
                  </span>
                  
                  {result && result.criticals > 0 && (
                    <span className="sum-bonus-part">
                      <span className="sum-operator">+</span>
                      <span className="sum-crit">
                        {result.criticals * result.totalEffectiveAttribute}
                        <span className="sum-attr-label">{result.criticals}x crit</span>
                      </span>
                    </span>
                  )}

                  {result && result.flatBonusTotal > 0 && (
                    <span className="sum-bonus-part">
                      <span className="sum-operator">+</span>
                      <span className="sum-bonus-val">
                        {result.flatBonusTotal}
                        <span className="sum-attr-label">fixo</span>
                      </span>
                    </span>
                  )}
                </div>
                <span className="sum-equals">= {result?.finalTotal}</span>
              </div>

              {/* Applied Techniques / Bonuses Breakdown */}
              {result?.appliedBonuses && result.appliedBonuses.length > 0 && (
                <div style={{ width: '100%', marginTop: '0.5rem', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Técnicas Ativadas:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {result.appliedBonuses.map((b, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', background: 'var(--bg-color)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                        <span>
                          <strong style={{ color: 'var(--accent-color)' }}>{b.alias ? `${b.alias} (${b.name})` : b.name}</strong>
                          <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{b.desc}</span>
                        </span>
                        {b.cost && <span style={{ color: '#ff3366', fontWeight: 'bold' }}>{b.cost}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botão de Histórico */}
      {!isModalOpen && !isClosing && result && !rolling && mode === 'play' && (
        <button className="history-btn slide-up-center" onClick={() => setIsModalOpen(true)} title="Ver último resultado">
          <ChevronUpIcon />
        </button>
      )}

      {/* Modal de Seleção de Vantagens da Forma Selvagem (Druida) */}
      {/* Modal de Interação de Transformação (Dependente de Kit) */}
      {isTransformModalOpen && (
        <div className="modal-overlay pop-in" style={{ zIndex: 370, alignItems: 'center' }} onClick={(e) => {
          if (e.target === e.currentTarget) setIsTransformModalOpen(false);
        }}>
          <div className="modal-content" style={{ 
            borderRadius: '4px',
            borderTop: '2px solid var(--accent-color)',
            borderBottom: '2px solid var(--accent-color)',
            background: 'rgba(15, 26, 18, 0.95)',
            boxShadow: '0 0 25px var(--accent-transparent)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <button className="modal-close" onClick={() => setIsTransformModalOpen(false)}><CloseIcon size={18} /></button>
            
            {selectedKitId === 'druida' && (
              <>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.3rem', color: '#5EB05D', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LeafIcon size={22} /> FORMA SELVAGEM: ESCOLHA 2 VANTAGENS
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
                  Pelo poder do Kit Druida, cada vez que entra em Forma Selvagem você adquire 2 vantagens gratuitas:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {DRUID_WILD_SHAPE_OPTIONS.map((opt) => {
                    const currentSelected = currentForm.wildShapeAdvantages || [];
                    const isChecked = currentSelected.includes(opt.name);

                    return (
                      <div
                        key={opt.name}
                        className={`wild-shape-card-item ${isChecked ? 'selected' : ''}`}
                        onClick={() => {
                          if (isChecked) {
                            updateCurrentForm({ wildShapeAdvantages: currentSelected.filter(n => n !== opt.name) });
                          } else {
                            if (currentSelected.length >= 2) {
                              updateCurrentForm({ wildShapeAdvantages: [currentSelected[1], opt.name] });
                            } else {
                              updateCurrentForm({ wildShapeAdvantages: [...currentSelected, opt.name] });
                            }
                          }
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold', color: isChecked ? '#5EB05D' : '#fff', fontSize: '1.1rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.5px' }}>
                            {opt.name}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: isChecked ? '#5EB05D' : 'var(--text-muted)' }}>
                            {isChecked ? (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <CheckIcon size={12} /> SELECIONADO
                              </span>
                            ) : 'Clique p/ escolher'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {opt.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="btn-roll" style={{ marginTop: '1.5rem', backgroundColor: '#5EB05D', color: '#000' }} onClick={() => setIsTransformModalOpen(false)}>
                  Confirmar Forma Selvagem
                </button>
              </>
            )}

            {selectedKitId === 'gigante_da_luz' && (
              <>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.3rem', color: '#FFD700', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ZapIcon /> TRANSFORMAÇÃO GIGANTE
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  Você entrou em Escala Kiodai! Sua forma recebe automaticamente as vantagens: <strong>Alcance</strong>, <strong>Golpe Final</strong> e <strong>Voo</strong>.
                </p>
                <button className="btn-roll" style={{ marginTop: '1rem', backgroundColor: '#FFD700', color: '#000' }} onClick={() => {
                  updateCurrentForm({ wildShapeAdvantages: ['Alcance', 'Golpe Final', 'Voo'] });
                  setIsTransformModalOpen(false);
                }}>
                  Entendido!
                </button>
              </>
            )}

            {selectedKitId === 'guerreira_magica' && (
              <>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.3rem', color: '#FF69B4', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TransformIcon size={22} /> TRANSFORMAÇÃO RADIANTE
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  Você vestiu seu traje mágico de combate! Nesta forma, você pode pagar <strong>2 PM</strong> para ter Ganho em um teste de Mística. Deseja investir PMs agora para garantir este Ganho na próxima rolagem?
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button className="btn-roll" style={{ flex: 1, backgroundColor: '#FF69B4', color: '#000' }} onClick={() => {
                    if (currentPM >= 2) {
                      setCurrentPM(prev => prev - 2);
                      setManualBonusDice(1);
                      setIsTransformModalOpen(false);
                    } else {
                      alert('PM insuficiente para ativar o bônus!');
                    }
                  }}>
                    Ativar Ganho (-2 PM)
                  </button>
                  <button className="btn-roll" style={{ flex: 1, backgroundColor: 'transparent', border: '1px solid #FF69B4', color: '#FF69B4' }} onClick={() => setIsTransformModalOpen(false)}>
                    Não, apenas transformar
                  </button>
                </div>
              </>
            )}

            {selectedKitId === 'alquimista' && (
              <>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.3rem', color: '#9B59B6', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TransformIcon size={22} /> DIAGRAMA PESSOAL
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  Redistribua seus atributos base como quiser para esta forma (Limite total: {forms[0].poder + forms[0].habilidade + forms[0].resistencia}):
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Poder</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button className="btn-square" onClick={() => updateCurrentForm({ poder: Math.max(0, currentForm.poder - 1) })} style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                      <span style={{ width: '20px', textAlign: 'center' }}>{currentForm.poder}</span>
                      <button className="btn-square" onClick={() => updateCurrentForm({ poder: currentForm.poder + 1 })} style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Habilidade</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button className="btn-square" onClick={() => updateCurrentForm({ habilidade: Math.max(0, currentForm.habilidade - 1) })} style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                      <span style={{ width: '20px', textAlign: 'center' }}>{currentForm.habilidade}</span>
                      <button className="btn-square" onClick={() => updateCurrentForm({ habilidade: currentForm.habilidade + 1 })} style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Resistência</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button className="btn-square" onClick={() => updateCurrentForm({ resistencia: Math.max(0, currentForm.resistencia - 1) })} style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                      <span style={{ width: '20px', textAlign: 'center' }}>{currentForm.resistencia}</span>
                      <button className="btn-square" onClick={() => updateCurrentForm({ resistencia: currentForm.resistencia + 1 })} style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '0.8rem', textAlign: 'center', fontSize: '0.85rem', color: (currentForm.poder + currentForm.habilidade + currentForm.resistencia) > (forms[0].poder + forms[0].habilidade + forms[0].resistencia) ? '#ff4d4d' : 'var(--text-muted)' }}>
                  Total usado: {currentForm.poder + currentForm.habilidade + currentForm.resistencia} / {forms[0].poder + forms[0].habilidade + forms[0].resistencia}
                </div>

                <button className="btn-roll" style={{ marginTop: '1.5rem', backgroundColor: '#9B59B6', color: '#000' }} onClick={() => setIsTransformModalOpen(false)}>
                  Confirmar Diagrama
                </button>
              </>
            )}

          </div>
        </div>
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
            <button className="modal-close" onClick={() => setIsEditingStats(false)}><CloseIcon size={18} /></button>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '1.5rem', color: '#fff', textShadow: '2px 2px 0px #000', letterSpacing: '2px' }}>STATUS</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
              {/* PV */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(94,176,93,0.1)', borderLeft: '4px solid #5EB05D' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#5EB05D', width: '50px', textAlign: 'left', textShadow: '0 0 5px rgba(94,176,93,0.5)' }}>PV</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#5EB05D', color: '#5EB05D', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PV', -1)}>-</button>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Bebas Neue, sans-serif', width: '50px', textShadow: '0 0 10px #5EB05D' }}>{currentPV}</span>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#5EB05D', color: '#5EB05D', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PV', 1)}>+</button>
                </div>
              </div>
              
              {/* PM */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(137,78,198,0.1)', borderLeft: '4px solid #894EC6' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#894EC6', width: '50px', textAlign: 'left', textShadow: '0 0 5px rgba(137,78,198,0.5)' }}>PM</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#894EC6', color: '#894EC6', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PM', -1)}>-</button>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Bebas Neue, sans-serif', width: '50px', textShadow: '0 0 10px #894EC6' }}>{currentPM}</span>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#894EC6', color: '#894EC6', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PM', 1)}>+</button>
                </div>
              </div>

              {/* PA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,158,0,0.1)', borderLeft: '4px solid #FF9E00' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#FF9E00', width: '50px', textAlign: 'left', textShadow: '0 0 5px rgba(255,158,0,0.5)' }}>PA</span>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#FF9E00', color: '#FF9E00', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PA', -1)}>-</button>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', fontFamily: 'Bebas Neue, sans-serif', width: '50px', textShadow: '0 0 10px #FF9E00' }}>{currentPA}</span>
                  <button className="control-btn" style={{ width: '45px', height: '45px', fontSize: '1.8rem', borderColor: '#FF9E00', color: '#FF9E00', background: 'rgba(0,0,0,0.5)' }} onClick={() => handleStatChange('PA', 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Presets do Livro */}
      {isPresetModalOpen && (
        <div className="modal-overlay pop-in" style={{ zIndex: 360, alignItems: 'center' }} onClick={(e) => {
          if (e.target === e.currentTarget) setIsPresetModalOpen(false);
        }}>
          <div className="modal-content" style={{ 
            borderRadius: '4px',
            borderTop: '2px solid var(--accent-color)',
            borderBottom: '2px solid var(--accent-color)',
            background: 'rgba(15, 18, 26, 0.95)',
            boxShadow: '0 0 25px var(--accent-transparent)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <button className="modal-close" onClick={() => setIsPresetModalOpen(false)}><CloseIcon size={18} /></button>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '0.5rem', color: '#fff', textShadow: '2px 2px 0px #000', letterSpacing: '1px' }}>VANTAGENS DO LIVRO BÁSICO</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Selecione uma vantagem ou técnica oficial para adicionar à sua ficha:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {BONUS_PRESETS.map((preset, i) => (
                <div 
                  key={i} 
                  className="preset-card-item"
                  onClick={() => addPresetBonus(preset)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--text-main)', fontSize: '1.1rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.5px' }}>
                      {preset.name}
                    </span>
                    {preset.costResource !== 'none' && (
                      <span style={{ fontSize: '0.75rem', color: '#ff3366', fontWeight: 'bold' }}>
                        -{preset.costValue} {preset.costResource}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', marginTop: '2px', flexWrap: 'wrap' }}>
                    <span>Atributo: <strong style={{ textTransform: 'uppercase', color: preset.attribute === 'poder' ? '#FF9E00' : preset.attribute === 'habilidade' ? '#894EC6' : preset.attribute === 'resistencia' ? '#5EB05D' : 'var(--text-main)' }}>{preset.attribute}</strong></span>
                    {preset.duration === 'scene' && <span>• <strong style={{ color: '#33ccff' }}>Cena</strong></span>}
                    {preset.bonusType === 'attr_mod' && <span>• <strong>+{preset.value} Atributo</strong></span>}
                    {preset.critThresholdMod ? <span>• <strong>Crítico 5+</strong></span> : null}
                    {preset.autoCrit ? <span>• <strong>Crítico Automático</strong></span> : null}
                    {preset.extraDice ? <span>• <strong>+{preset.extraDice}D Ganho</strong></span> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Bônus */}
      {editingBonusId && (() => {
        const bonus = rollBonuses.find(b => b.id === editingBonusId);
        if (!bonus) return null;
        return (
          <div className="modal-overlay pop-in" style={{ zIndex: 350, alignItems: 'center' }} onClick={(e) => {
            if (e.target === e.currentTarget) setEditingBonusId(null);
          }}>
            <div className="modal-content" style={{ 
              borderRadius: '4px',
              borderTop: '2px solid var(--accent-color)',
              borderBottom: '2px solid var(--accent-color)',
              background: 'rgba(15, 18, 26, 0.95)',
              boxShadow: '0 0 20px var(--accent-transparent)',
              maxWidth: '450px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <button className="modal-close" onClick={() => setEditingBonusId(null)}><CloseIcon size={18} /></button>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', marginBottom: '1.5rem', color: '#fff', textShadow: '2px 2px 0px #000', letterSpacing: '1px' }}>CONFIGURAR TÉCNICA</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>NOME DA TÉCNICA / VANTAGEM</label>
                  <input
                    type="text"
                    className="bonus-name-input"
                    style={{ width: '100%', fontSize: '1.1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    placeholder="Ex: Ataque Especial (Potente)"
                    value={bonus.name}
                    onChange={(e) => updateRollBonus(bonus.id, { name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                    ALIAS / NOME DO GOLPE (OPCIONAL)
                  </label>
                  <input
                    type="text"
                    className="bonus-name-input"
                    style={{ width: '100%', fontSize: '1.1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--accent-color)', color: '#fff' }}
                    placeholder="Ex: Meteoro de Pégaso, Kamehameha..."
                    value={bonus.alias || ''}
                    onChange={(e) => updateRollBonus(bonus.id, { alias: e.target.value })}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                    Se definido, o golpe aparecerá com este nome personalizado na ficha e no resultado.
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>ATRIBUTO EXIGIDO</label>
                    <select
                      className="bonus-type-select"
                      style={{ width: '100%', fontSize: '1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      value={bonus.attribute}
                      onChange={(e) => updateRollBonus(bonus.id, { attribute: e.target.value as any })}
                    >
                      <option value="any">Qualquer Atributo</option>
                      <option value="poder">Apenas Poder</option>
                      <option value="habilidade">Apenas Habilidade</option>
                      <option value="resistencia">Apenas Resistência</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>DURAÇÃO</label>
                    <select
                      className="bonus-type-select"
                      style={{ width: '100%', fontSize: '1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      value={bonus.duration || 'instant'}
                      onChange={(e) => updateRollBonus(bonus.id, { duration: e.target.value as any })}
                    >
                      <option value="instant">Instantânea (1 Rolagem)</option>
                      <option value="scene">Cena (Buff Contínuo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>TIPO DE BÔNUS</label>
                  <select
                    className="bonus-type-select"
                    style={{ width: '100%', fontSize: '1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    value={bonus.bonusType}
                    onChange={(e) => updateRollBonus(bonus.id, { bonusType: e.target.value as any })}
                  >
                    <option value="attr_mod">Bônus no Atributo (+2 P, etc - Multiplica no Crítico)</option>
                    <option value="flat">Bônus Fixo no Total (+1, +2)</option>
                    <option value="full_attr">Soma Outro Atributo (+P, +H, +R)</option>
                    <option value="none">Nenhum Bônus Numérico</option>
                  </select>
                </div>

                {(bonus.bonusType === 'attr_mod' || bonus.bonusType === 'flat') && (
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                      VALOR DO BÔNUS {bonus.bonusType === 'attr_mod' && '(Multiplica em Críticos!)'}
                    </label>
                    <input
                      type="number"
                      className="bonus-value-input"
                      style={{ width: '100%', fontSize: '1.2rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--accent-color)', textAlign: 'center' }}
                      min={-10}
                      max={20}
                      value={bonus.value}
                      onChange={(e) => updateRollBonus(bonus.id, { value: Number(e.target.value) })}
                    />
                  </div>
                )}

                {bonus.bonusType === 'full_attr' && (
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>QUAL ATRIBUTO SOMAR</label>
                    <select
                      className="bonus-type-select"
                      style={{ width: '100%', fontSize: '1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      value={bonus.attrSource || 'poder'}
                      onChange={(e) => updateRollBonus(bonus.id, { attrSource: e.target.value as any })}
                    >
                      <option value="poder">+Poder ({poder})</option>
                      <option value="habilidade">+Habilidade ({habilidade})</option>
                      <option value="resistencia">+Resistência ({resistencia})</option>
                    </select>
                  </div>
                )}

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem', marginTop: '0.2rem' }}>
                  <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>EFEITOS ESPECIAIS</label>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>MARGEM DE CRÍTICO</label>
                      <select
                        className="bonus-type-select"
                        style={{ width: '100%', fontSize: '0.9rem', background: 'var(--surface-hover)', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                        value={bonus.critThresholdMod || 0}
                        onChange={(e) => updateRollBonus(bonus.id, { critThresholdMod: Number(e.target.value) })}
                      >
                        <option value={0}>Padrão (6)</option>
                        <option value={-1}>Perigoso/Blindada (Crítico 5+)</option>
                        <option value={-2}>Extremo (Crítico 4+)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.2rem' }}>DADOS EXTRAS</label>
                      <select
                        className="bonus-type-select"
                        style={{ width: '100%', fontSize: '0.9rem', background: 'var(--surface-hover)', padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                        value={bonus.extraDice || 0}
                        onChange={(e) => updateRollBonus(bonus.id, { extraDice: Number(e.target.value) })}
                      >
                        <option value={0}>Nenhum</option>
                        <option value={1}>+1D (Ganho)</option>
                        <option value={-1}>-1D (Perda)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '0.8rem' }}>
                    <label className="checkbox-label" style={{ padding: '0.5rem 0.8rem' }}>
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={!!bonus.autoCrit}
                        onChange={(e) => updateRollBonus(bonus.id, { autoCrit: e.target.checked })}
                      />
                      <span style={{ fontSize: '0.85rem' }}>Crítico Automático (Titânico)</span>
                    </label>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem', marginTop: '0.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>CUSTO (QUANTIDADE)</label>
                    <input
                      type="number"
                      className="bonus-value-input"
                      style={{ width: '100%', fontSize: '1.2rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', textAlign: 'center' }}
                      min={0}
                      max={20}
                      value={bonus.costValue || 0}
                      onChange={(e) => updateRollBonus(bonus.id, { costValue: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>RECURSO</label>
                    <select
                      className="bonus-type-select"
                      style={{ width: '100%', fontSize: '1rem', background: 'var(--surface-hover)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      value={bonus.costResource || 'none'}
                      onChange={(e) => updateRollBonus(bonus.id, { costResource: e.target.value as any })}
                    >
                      <option value="none">Nenhum</option>
                      <option value="PM">PM (Pontos de Mana)</option>
                      <option value="PV">PV (Pontos de Vida)</option>
                      <option value="PA">PA (Pontos de Ação)</option>
                    </select>
                  </div>
                </div>

                <button 
                  className="btn-roll" 
                  style={{ marginTop: '1rem', padding: '0.8rem' }}
                  onClick={() => setEditingBonusId(null)}
                >
                  Concluir
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
