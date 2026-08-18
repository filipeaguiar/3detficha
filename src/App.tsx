import { useEffect, useState, useRef, useMemo } from 'react';
import { useDiceSound } from './useDiceSound';

import { KITS_CATALOG } from './constants/app/kits';
import { calculatePoints, getKitPowerModifier } from './utils/character';
import type { CharacterForm, CharacterSheet, KitPower, RollBonus, RollResult } from './types/character';
import { useCharacterSheets } from './hooks/useCharacterSheets';
import { useDiceBox } from './hooks/useDiceBox';
import CharacterEditor from './components/editor/CharacterEditor';
import PlayMode from './components/play/PlayMode';
import AppModals from './components/modals/AppModals';

export default function App() {
  const { characterSheets, activeCharacterId, activeSheet, saveAllSheets, updateActiveSheet, updateCurrentForm } = useCharacterSheets();

  const [mode, setMode] = useState<'edit' | 'play'>('play');
  const [activeTab, setActiveTab] = useState<'concept' | 'attributes' | 'advantages' | 'skills' | 'techniques'>('concept');
  const [activeFormIndex, setActiveFormIndex] = useState<number>(0);
  
  // Hidden Drawer Menu state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerClosingFast, setIsDrawerClosingFast] = useState(false);

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
  const [croppingImage, setCroppingImage] = useState<string | null>(null);

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
  const visibleRollBonuses = rollBonuses.filter(b => b.bonusType !== 'none' || b.critThresholdMod || b.extraDice || b.autoCrit || !b.id.startsWith('kit_'));

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
  const [manualBonusDice, setManualBonusDice] = useState<-2 | -1 | 0 | 1 | 2>(0);
  const [manualCritRange, setManualCritRange] = useState(6);

  // Bônus e Técnicas Ativas
  const [activeBonuses, setActiveBonuses] = useState<Set<string>>(new Set());

  const [rolling, setRolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [result, setResult] = useState<RollResult | null>(null);

  // Active bonuses list
  const activeBonusesList = useMemo(() => {
    return rollBonuses.filter(b => activeBonuses.has(b.id));
  }, [rollBonuses, activeBonuses]);

  // Kit Power Active Buffs (e.g. Frenesi de Combate P+3)
  const [activeKitBuffs, setActiveKitBuffs] = useState<Set<string>>(new Set());

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

  const { diceBoxRef, clearDiceTimeoutRef, clearDice } = useDiceBox(mode, accentColor);

  const handleEdit = () => {
    setIsDrawerClosingFast(true);
    setIsDrawerOpen(false);
    requestAnimationFrame(() => {
      setMode('edit');
      clearDice();
      setIsModalOpen(false);
      setIsClosing(false);
      requestAnimationFrame(() => {
        setIsDrawerClosingFast(false);
      });
    });
  };

  // Form management for active sheet
  const updateCurrentFormForActiveIndex = (updates: Partial<CharacterForm>) => {
    updateCurrentForm(activeFormIndex, updates);
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
    
    // Read the original file into base64 to allow high-res cropping
    const reader = new FileReader();
    reader.onload = (event) => {
      setCroppingImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageBase64: string) => {
    updateCurrentFormForActiveIndex({ avatarUrl: croppedImageBase64 });
    setCroppingImage(null);
  };

  const handleCropCancel = () => {
    setCroppingImage(null);
  };

  const removeAvatar = () => {
    updateCurrentFormForActiveIndex({ avatarUrl: undefined });
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
    updateCurrentFormForActiveIndex({ rollBonuses: [...rollBonuses, newBonus] });
    setEditingBonusId(newId);
  };

  const addPresetBonus = (preset: Omit<RollBonus, 'id'>) => {
    const newId = Date.now().toString();
    const newBonus: RollBonus = {
      ...preset,
      id: newId
    };
    updateCurrentFormForActiveIndex({ rollBonuses: [...rollBonuses, newBonus] });
    setIsPresetModalOpen(false);
    setEditingBonusId(newId);
  };

  const removeRollBonus = (id: string) => {
    updateCurrentFormForActiveIndex({ rollBonuses: rollBonuses.filter(b => b.id !== id) });
    setActiveBonuses(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateRollBonus = (id: string, updates: Partial<RollBonus>) => {
    updateCurrentFormForActiveIndex({
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
    const totalExtraDice = calculatedTotalExtraDice;
    const diceCount = Math.max(1, Math.min(3, 1 + Math.abs(totalExtraDice)));
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

      let diceSum = 0;
      if (totalExtraDice > 0) {
        diceSum = Math.max(...rolls);
      } else if (totalExtraDice < 0) {
        diceSum = Math.min(...rolls);
      } else {
        diceSum = rolls[0];
      }
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


  const totalPoints = calculatePoints(currentForm);
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
          <CharacterEditor
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            totalPoints={totalPoints}
            setIsSheetsModalOpen={setIsSheetsModalOpen}
            characterName={characterName}
            updateActiveSheet={updateActiveSheet}
            currentKit={currentKit}
            setIsKitSelectModalOpen={setIsKitSelectModalOpen}
            accentColor={accentColor}
            forms={forms}
            activeFormIndex={activeFormIndex}
            setActiveFormIndex={setActiveFormIndex}
            addTransformationForm={addTransformationForm}
            removeCurrentForm={removeCurrentForm}
            fileInputRef={fileInputRef}
            currentForm={currentForm}
            updateCurrentForm={updateCurrentFormForActiveIndex}
            removeAvatar={removeAvatar}
            selectedKitId={selectedKitId}
            setIsTransformModalOpen={setIsTransformModalOpen}
            poder={poder}
            habilidade={habilidade}
            resistencia={resistencia}
            maisVida={maisVida}
            maisMana={maisMana}
            visibleRollBonuses={visibleRollBonuses}
            setEditingBonusId={setEditingBonusId}
            removeRollBonus={removeRollBonus}
            setIsPresetModalOpen={setIsPresetModalOpen}
            addCustomBonus={addCustomBonus}
            setIsPrepMagicModalOpen={() => {}}
            setMode={setMode}
          />
        )}

        {mode === 'play' && (
          <PlayMode
            characterName={characterName}
            currentKit={currentKit}
            currentForm={currentForm}
            forms={forms}
            activeFormIndex={activeFormIndex}
            selectedKitId={selectedKitId}
            accentColor={accentColor}
            currentPV={currentPV}
            currentPM={currentPM}
            currentPA={currentPA}
            maxPV={maxPV}
            maxPM={maxPM}
            maxPA={maxPA}
            totalCostPV={totalCostPV}
            totalCostPM={totalCostPM}
            totalCostPA={totalCostPA}
            activeKitActionPowers={activeKitActionPowers}
            activeKitBuffs={activeKitBuffs}
            usedKitPowers={usedKitPowers}
            activeBonuses={activeBonuses}
            visibleRollBonuses={visibleRollBonuses}
            allowedAttributes={allowedAttributes}
            rolling={rolling}
            poder={poder}
            habilidade={habilidade}
            resistencia={resistencia}
            calculatedTotalExtraDice={calculatedTotalExtraDice}
            calculatedCritRange={calculatedCritRange}
            manualBonusDice={manualBonusDice}
            setManualBonusDice={setManualBonusDice}
            setManualCritRange={setManualCritRange}
            setIsDrawerOpen={setIsDrawerOpen}
            setCurrentPM={setCurrentPM}
            setActiveFormIndex={setActiveFormIndex}
            setIsTransformModalOpen={setIsTransformModalOpen}
            setIsKitInfoModalOpen={setIsKitInfoModalOpen}
            setIsEditingStats={setIsEditingStats}
            handleUseKitPower={handleUseKitPower}
            handleRoll={handleRoll}
            toggleActiveBonus={toggleActiveBonus}
          />
        )}
      </div>

      {/* ======================================================== */}
      {/* MENU OCULTO LATERAL (DRAWER - DESLIZE PARA A DIREITA)     */}
      {/* ======================================================== */}
      <AppModals
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerClosingFast={isDrawerClosingFast}
        accentColor={accentColor}
        currentForm={currentForm}
        characterName={characterName}
        currentKit={currentKit}
        setIsSheetsModalOpen={setIsSheetsModalOpen}
        handleFullRest={handleFullRest}
        handleQuickRest={handleQuickRest}
        handleResetScene={handleResetScene}
        updateActiveSheet={updateActiveSheet}
        soundOn={soundOn}
        handleEdit={handleEdit}
        isKitSelectModalOpen={isKitSelectModalOpen}
        setIsKitSelectModalOpen={setIsKitSelectModalOpen}
        filteredKits={filteredKits}
        kitSearchQuery={kitSearchQuery}
        setKitSearchQuery={setKitSearchQuery}
        selectedNucleoFilter={selectedNucleoFilter}
        setSelectedNucleoFilter={setSelectedNucleoFilter}
        selectedKitId={selectedKitId}
        forms={forms}
        activeFormIndex={activeFormIndex}
        updateActiveSheetForms={(kitId, updatedForms) => updateActiveSheet({ selectedKitId: kitId, forms: updatedForms })}
        isKitInfoModalOpen={isKitInfoModalOpen}
        setIsKitInfoModalOpen={setIsKitInfoModalOpen}
        isSheetsModalOpen={isSheetsModalOpen}
        setIsSheetsModalOpenDirect={setIsSheetsModalOpen}
        characterSheets={characterSheets}
        activeCharacterId={activeCharacterId}
        saveAllSheets={saveAllSheets}
        setActiveFormIndex={setActiveFormIndex}
        duplicateCurrentCharacter={duplicateCurrentCharacter}
        deleteCharacter={deleteCharacter}
        createNewCharacter={createNewCharacter}
        isModalOpen={isModalOpen}
        isClosing={isClosing}
        result={result}
        rolling={rolling}
        closeResult={closeResult}
        setIsModalOpen={setIsModalOpen}
        mode={mode}
        isTransformModalOpen={isTransformModalOpen}
        setIsTransformModalOpen={setIsTransformModalOpen}
        updateCurrentForm={updateCurrentFormForActiveIndex}
        setCurrentPM={setCurrentPM}
        setManualBonusDice={setManualBonusDice}
        currentPM={currentPM}
        isEditingStats={isEditingStats}
        setIsEditingStats={setIsEditingStats}
        handleStatChange={handleStatChange}
        currentPV={currentPV}
        currentPA={currentPA}
        isPresetModalOpen={isPresetModalOpen}
        setIsPresetModalOpen={setIsPresetModalOpen}
        addPresetBonus={addPresetBonus}
        editingBonusId={editingBonusId}
        setEditingBonusId={setEditingBonusId}
        rollBonuses={rollBonuses}
        updateRollBonus={updateRollBonus}
        poder={poder}
        habilidade={habilidade}
        resistencia={resistencia}
        croppingImage={croppingImage}
        handleCropComplete={handleCropComplete}
        handleCropCancel={handleCropCancel}
      />

    </>
  );
}
