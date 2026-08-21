import { useEffect, useState, useRef, useMemo } from 'react';
import { useDiceSound } from './useDiceSound';

import { ARCHETYPES_CATALOG } from './constants/app/archetypes';
import { ADVANTAGES_CATALOG } from './constants/advantagesData';
import { KITS_CATALOG } from './constants/app/kits';
import { calculatePoints, getActiveBonusVariant, getArchetypeCost, getKitPowerModifier } from './utils/character';
import { getDerivedAdvantageEffects } from './utils/advantageEffects';
import { resolveActionPlan } from './utils/actionResolver';
import type { CharacterForm, CharacterSheet, ImmediateActionConfig, KitPower, PreparedMagicDraft, RollBonus, RollResult } from './types/character';
import { useCharacterSheets } from './hooks/useCharacterSheets';
import { useDiceBox } from './hooks/useDiceBox';
import CharacterEditor from './components/editor/CharacterEditor';
import PlayMode from './components/play/PlayMode';
import AppModals from './components/modals/AppModals';
import ActionWorkspace from './components/actions/ActionWorkspace';
import type { AppMode } from './types/navigation';

export default function App() {
  const { characterSheets, activeCharacterId, activeSheet, saveAllSheets, updateActiveSheet, updateCurrentForm } = useCharacterSheets();

  const [mode, setMode] = useState<AppMode>('play');
  const [activeTab, setActiveTab] = useState<'concept' | 'attributes' | 'advantages' | 'disadvantages' | 'skills' | 'techniques'>('concept');
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

  // Active Sheet properties
  const characterName = activeSheet.characterName;
  const selectedKitId = activeSheet.selectedKitId;
  const selectedArchetypeId = activeSheet.selectedArchetypeId || 'humano';
  const accentColor = activeSheet.accentColor;
  const soundOn = activeSheet.soundOn;
  const forms = activeSheet.forms || [];

  const currentFormBase = forms[activeFormIndex] || forms[0] || {
    id: 'base',
    name: 'Forma Normal',
    poder: 1,
    habilidade: 1,
    resistencia: 1,
    maisVida: 0,
    maisMana: 0,
    maisAcao: 0,
    rollBonuses: [],
    wildShapeAdvantages: []
  };

  // Selected Kit Info
  const currentKit = useMemo(() => {
    return KITS_CATALOG.find(k => k.id === selectedKitId) || null;
  }, [selectedKitId]);

  const currentArchetype = useMemo(() => {
    return ARCHETYPES_CATALOG.find(a => a.id === selectedArchetypeId) || ARCHETYPES_CATALOG[0] || null;
  }, [selectedArchetypeId]);

  const currentForm = useMemo(() => {
    const unique = (values?: string[]) => Array.from(new Set(values || []));
    const archetypeSelections = currentFormBase.archetypeSelections || {};
    const selectedArchetypeOptions = (currentArchetype?.choiceGroups || []).flatMap(group => {
      const chosen = archetypeSelections[group.id] || [];
      return group.options.filter(option => chosen.includes(option.id));
    });
    const selectedArchetypeAdvantages = selectedArchetypeOptions.flatMap(option => option.grantsAdvantages || []);
    const selectedArchetypeDisadvantages = selectedArchetypeOptions.flatMap(option => option.grantsDisadvantages || []);
    const selectedArchetypeSkills = selectedArchetypeOptions.flatMap(option => option.grantsSkills || []);
    const selectedArchetypeEffects = selectedArchetypeOptions.flatMap(option => option.grantsEffects || []);

    const kitSelections = currentFormBase.kitSelections || {};
    const selectedKitOptions = (currentKit?.choiceGroups || []).flatMap(group => {
      const chosen = kitSelections[group.id] || [];
      return group.options.filter(option => chosen.includes(option.id));
    });
    const selectedKitAdvantages = selectedKitOptions.flatMap(option => option.grantsAdvantages || []);
    const selectedKitDisadvantages = selectedKitOptions.flatMap(option => option.grantsDisadvantages || []);
    const selectedKitSkills = selectedKitOptions.flatMap(option => option.grantsSkills || []);
    const selectedKitEffects = selectedKitOptions.flatMap(option => option.grantsEffects || []);

    return {
      ...currentFormBase,
      advantages: unique([...(currentFormBase.advantages || []), ...(currentArchetype?.grantedAdvantages || []), ...selectedArchetypeAdvantages, ...(currentKit?.grantedAdvantages || []), ...selectedKitAdvantages]),
      disadvantages: unique([...(currentFormBase.disadvantages || []), ...(currentArchetype?.grantedDisadvantages || []), ...selectedArchetypeDisadvantages, ...(currentKit?.grantedDisadvantages || []), ...selectedKitDisadvantages]),
      skills: unique([...(currentFormBase.skills || []), ...(currentArchetype?.grantedSkills || []), ...selectedArchetypeSkills, ...(currentKit?.grantedSkills || []), ...selectedKitSkills]),
      archetypeAdvantages: unique([...(currentArchetype?.grantedAdvantages || []), ...selectedArchetypeAdvantages]),
      archetypeDisadvantages: unique([...(currentArchetype?.grantedDisadvantages || []), ...selectedArchetypeDisadvantages]),
      archetypeSkills: unique([...(currentArchetype?.grantedSkills || []), ...selectedArchetypeSkills]),
      archetypeSelections,
      kitSelections,
      _archetypeSelectedEffects: selectedArchetypeEffects,
      _kitSelectedEffects: selectedKitEffects,
    } as typeof currentFormBase & { _archetypeSelectedEffects?: any[]; _kitSelectedEffects?: any[] };
  }, [currentFormBase, currentArchetype, currentKit]);

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
  const [usedArchetypeEffects, setUsedArchetypeEffects] = useState<Record<string, number>>({});

  // Current Form Attributes & Derived values
  const poder = currentForm.poder;
  const habilidade = currentForm.habilidade;
  const resistencia = currentForm.resistencia;
  const maisVida = currentForm.maisVida;
  const maisMana = currentForm.maisMana;
  const maisAcao = currentForm.maisAcao || 0;
  const rollBonuses = useMemo(() => [
    ...(currentForm.rollBonuses || []),
    ...getDerivedAdvantageEffects(currentForm),
    ...([...(currentArchetype?.grantedEffects || []), ...(((currentForm as any)._archetypeSelectedEffects) || [])].map((effect): RollBonus => ({
      id: effect.id,
      name: effect.name,
      alias: '',
      attribute: effect.attribute || 'any',
      bonusType: effect.bonusType || 'none',
      value: effect.value || 0,
      duration: effect.duration || 'instant',
      attrSource: 'poder' as const,
      critThresholdMod: effect.critThresholdMod || 0,
      autoCrit: effect.autoCrit || false,
      extraDice: effect.extraDice || 0,
      costValue: effect.costValue || 0,
      costResource: effect.costResource || 'none',
      costTiming: effect.costTiming || 'instant',
      variants: undefined,
      selectedVariantId: undefined,
      variantSelectionMode: undefined,
      immediateAction: (effect as any).immediateAction,
    }))),
    ...([...(currentKit?.grantedEffects || []), ...(((currentForm as any)._kitSelectedEffects) || [])].map((effect): RollBonus => ({
      id: effect.id,
      name: effect.name,
      alias: '',
      attribute: effect.attribute || 'any',
      bonusType: effect.bonusType || 'none',
      value: effect.value || 0,
      duration: effect.duration || 'instant',
      attrSource: 'poder' as const,
      critThresholdMod: effect.critThresholdMod || 0,
      autoCrit: effect.autoCrit || false,
      extraDice: effect.extraDice || 0,
      costValue: effect.costValue || 0,
      costResource: effect.costResource || 'none',
      costTiming: effect.costTiming || 'instant',
      variants: undefined,
      selectedVariantId: undefined,
      variantSelectionMode: undefined,
      immediateAction: (effect as any).immediateAction,
    })))
  ], [currentForm, currentArchetype, currentKit]);
  const visibleRollBonuses = rollBonuses.filter(b => b.bonusType !== 'none' || b.critThresholdMod || b.extraDice || b.autoCrit || b.automaticCriticals || !b.id.startsWith('kit_'));

  // Cálculos Derivados (Máximos)
  const maxPV = Math.max(1, (resistencia * 5) + (maisVida * 10));
  const maxPM = Math.max(1, (habilidade * 5) + (maisMana * 10));
  const maxPA = Math.max(1, (poder * 1) + (maisAcao * 2));
  const preparedManaLocked = (currentForm.rollBonuses || [])
    .filter((bonus) => bonus.gameplayPattern === 'prepared-magic' && bonus.assistedState?.prepared)
    .reduce((total, bonus) => total + (bonus.costValue || 0), 0);
  const recoverableMaxPM = Math.max(0, maxPM - preparedManaLocked);

  // Valores Atuais (Controláveis)
  const [currentPV, setCurrentPV] = useState(maxPV);
  const [currentPM, setCurrentPM] = useState(recoverableMaxPM);
  const [currentPA, setCurrentPA] = useState(maxPA);
  const [temporaryPM, setTemporaryPM] = useState(0);

  // Reset to full only when active character changes
  useEffect(() => {
    setCurrentPV(maxPV);
    setCurrentPM(recoverableMaxPM);
    setCurrentPA(maxPA);
    setTemporaryPM(0);
    setActiveFormIndex(0);
  }, [activeCharacterId]);

  // Clamp resources to new maximum when switching forms or modifying stats
  useEffect(() => {
    setCurrentPV(prev => Math.min(maxPV, prev));
    setCurrentPM(prev => Math.min(recoverableMaxPM, prev));
    setCurrentPA(prev => Math.min(maxPA, prev));
  }, [maxPV, recoverableMaxPM, maxPA]);

  // Modificadores manuais de rolagem
  const [manualBonusDice, setManualBonusDice] = useState<0 | 1 | 2>(0);

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

  // Derived Extra Dice from active bonuses + active kit buffs + Druid Wild Shape Ágil
  const calculatedTotalExtraDice = useMemo(() => {
    let extra = manualBonusDice;
    activeBonusesList.forEach(b => {
      const variant = getActiveBonusVariant(b);
      const extraDice = typeof variant?.extraDice === 'number' ? variant.extraDice : b.extraDice;
      if (extraDice) extra += extraDice;
    });
    activeKitBuffsList.forEach(k => {
      if (k.mod.extraDice) extra += k.mod.extraDice;
    });
    if (currentForm.wildShapeAdvantages?.includes('Ágil')) {
      extra += 1;
    }
    return Math.max(-2, Math.min(2, extra));
  }, [activeBonusesList, activeKitBuffsList, manualBonusDice, currentForm.wildShapeAdvantages]);

  // Modificadores podem ser combinados; substituições de atributo são resolvidas
  // pelo contexto da ação em handleRoll, sem bloquear as rolagens manuais.
  const allowedAttributes = { poder: true, habilidade: true, resistencia: true };

  const { diceBoxRef, clearDiceTimeoutRef, clearDice } = useDiceBox(mode, accentColor);

  const navigateFromDrawer = (nextMode: AppMode) => {
    setIsDrawerClosingFast(true);
    setIsDrawerOpen(false);
    requestAnimationFrame(() => {
      setMode(nextMode);
      if (nextMode !== 'play') clearDice();
      setIsModalOpen(false);
      setIsClosing(false);
      requestAnimationFrame(() => setIsDrawerClosingFast(false));
    });
  };

  const handleEdit = () => navigateFromDrawer('edit');
  const handleActions = () => navigateFromDrawer('actions');
  const handlePlayMode = () => navigateFromDrawer('play');

  // Form management for active sheet
  const updateCurrentFormForActiveIndex = (updates: Partial<CharacterForm>) => {
    updateCurrentForm(activeFormIndex, updates);
  };

  const addTransformationForm = () => {
    const isDruid = selectedKitId === 'druida';
    const currentForms = activeSheet.forms || [];
    const newForm: CharacterForm = {
      id: 'form_' + Date.now(),
      name: isDruid ? 'Forma Selvagem (Fera)' : `Forma Alternativa ${currentForms.length + 1}`,
      poder: Math.max(1, poder + (isDruid ? 1 : 0)),
      habilidade: habilidade,
      resistencia: Math.max(1, resistencia + (isDruid ? 1 : 0)),
      maisVida: maisVida,
      maisMana: maisMana,
      maisAcao: maisAcao,
      rollBonuses: [],
      wildShapeAdvantages: isDruid ? ['Ágil', 'Forte'] : [],
      advantages: [],
      disadvantages: [],
      skills: []
    };

    updateActiveSheet({ forms: [...currentForms, newForm] });
    setActiveFormIndex(currentForms.length);
  };

  const removeCurrentForm = (index: number) => {
    const currentForms = activeSheet.forms || [];
    if (currentForms.length <= 1 || index === 0) return;
    const updatedForms = currentForms.filter((_, i) => i !== index);
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
      selectedKitId: '',
      selectedArchetypeId: 'humano',
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
    updateCurrentFormForActiveIndex({ rollBonuses: [...(currentForm.rollBonuses || []), newBonus] });
    setEditingBonusId(newId);
  };

  const createPreparedMagic = (draft: PreparedMagicDraft) => {
    if (selectedKitId !== 'mago') return false;
    const value = Math.max(1, Math.min(habilidade + 2, Math.floor(draft.value)));
    const preparationCost = Math.ceil(value / 2);
    if (currentPM + preparedManaLocked < maxPM) {
      alert('Preparar magias exige estar com todos os PM disponíveis, sem gastos além das magias já preparadas.');
      return false;
    }
    if (currentPM < preparationCost) {
      alert('PM insuficientes para preparar esta magia.');
      return false;
    }
    const newBonus: RollBonus = {
      id: `prepared_magic_${Date.now()}`,
      name: draft.name.trim() || 'Magia Preparada',
      alias: '',
      attribute: draft.attribute,
      bonusType: 'flat',
      value,
      duration: 'instant',
      costValue: preparationCost,
      costResource: 'PM',
      gameplayPattern: 'prepared-magic',
      assistedState: { prepared: true },
    };
    setCurrentPM((pm) => Math.max(0, pm - preparationCost));
    updateCurrentFormForActiveIndex({ rollBonuses: [...(currentForm.rollBonuses || []), newBonus] });
    return true;
  };

  const prepareExistingMagic = (id: string) => {
    const bonus = (currentForm.rollBonuses || []).find((entry) => entry.id === id && entry.gameplayPattern === 'prepared-magic');
    if (!bonus) return false;
    const preparationCost = Math.ceil(Math.max(1, bonus.value) / 2);
    if (currentPM + preparedManaLocked < maxPM) {
      alert('Recupere todos os PM disponíveis antes de preparar magias.');
      return false;
    }
    if (currentPM < preparationCost) {
      alert('PM insuficientes para preparar esta magia.');
      return false;
    }
    setCurrentPM((pm) => Math.max(0, pm - preparationCost));
    updateRollBonus(id, { costValue: preparationCost, costResource: 'PM', assistedState: { ...(bonus.assistedState || {}), prepared: true } });
    return true;
  };

  const addPresetBonus = (preset: Omit<RollBonus, 'id'>) => {
    if (rollBonuses.some(b => b.name === preset.name)) {
      alert('Você já possui esta técnica/vantagem!');
      return;
    }
    const newId = Date.now().toString();
    const newBonus: RollBonus = {
      ...preset,
      id: newId
    };
    updateCurrentFormForActiveIndex({ rollBonuses: [...(currentForm.rollBonuses || []), newBonus] });
    setIsPresetModalOpen(false);
    setEditingBonusId(newId);
  };

  const removeRollBonus = (id: string) => {
    updateCurrentFormForActiveIndex({
      rollBonuses: (currentForm.rollBonuses || []).filter(b => b.id !== id),
      strikeSelections: (currentForm.strikeSelections || []).filter((selection) => selection.acquisitionId !== id),
    });
    setActiveBonuses(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateRollBonus = (id: string, updates: Partial<RollBonus>) => {
    updateCurrentFormForActiveIndex({
      rollBonuses: (currentForm.rollBonuses || []).map(b => b.id === id ? { ...b, ...updates } : b)
    });
  };

  const cycleBonusVariant = (id: string) => {
    updateCurrentFormForActiveIndex({
      rollBonuses: (currentForm.rollBonuses || []).map(b => {
        if (b.id !== id || !b.variants || b.variants.length <= 1) return b;
        const currentIndex = b.variants.findIndex(variant => variant.id === b.selectedVariantId);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % b.variants.length : 0;
        return { ...b, selectedVariantId: b.variants[nextIndex]?.id || b.selectedVariantId };
      })
    });
  };

  const executeImmediateAction = async (sourceName: string, action: ImmediateActionConfig) => {
    if (!diceBoxRef.current || diceBoxRef.current === 'initializing' || rolling) return;
    setRolling(true);
    setResult(null);

    try {
      if (soundOn) {
        const snd = new Audio('/sounds/dice-roll.mp3');
        snd.play().catch(e => console.log('Audio play failed', e));
      }

      diceBoxRef.current.updateConfig({ themeColor: accentColor });
      diceBoxRef.current.clear();

      const diceResults = await diceBoxRef.current.roll('1d6');
      const dResult = diceResults[0];
      const rollTotal = dResult.value;
      const rawTotal = action.rollFormula === '1d6+h' ? rollTotal + habilidade : rollTotal;
      const capValue = action.capAttribute === 'resistencia' ? resistencia : action.capAttribute === 'habilidade' ? habilidade : action.capAttribute === 'poder' ? poder : undefined;
      const total = typeof capValue === 'number' ? Math.min(rawTotal, Math.max(0, capValue)) : rawTotal;

      setTimeout(() => {
        if (diceBoxRef.current && diceBoxRef.current !== 'initializing') diceBoxRef.current.clear();

        if (action.kind === 'recover_pm') {
          setCurrentPM(prev => Math.min(maxPM, prev + total));
        } else if (action.kind === 'grant_temporary_pm') {
          setTemporaryPM(total);
        }

        setResult({
          rolls: [rollTotal],
          diceSum: rollTotal,
          criticals: 0,
          isCriticalFail: false,
          finalTotal: total,
          usedAttributeName: action.resultLabel || sourceName,
          baseAttributeValue: action.rollFormula === '1d6+h' ? habilidade : 0,
          attrBonusValue: 0,
          totalEffectiveAttribute: action.rollFormula === '1d6+h' ? habilidade : 0,
          flatBonusTotal: 0,
          critRangeUsed: 6,
          appliedBonuses: [{ name: sourceName, desc: action.kind === 'recover_pm' ? `Recuperou ${total} PM.${typeof capValue === 'number' ? ` (limite ${capValue})` : ''}` : `Armazenou ${total} PM temporário até a próxima rolagem.` }]
        });
        setIsModalOpen(true);
        setRolling(false);
      }, 1500);
    } catch (e) {
      console.error(e);
      setRolling(false);
    }
  };

  const spendResource = (resource: 'none' | 'PV' | 'PM' | 'PA' | undefined, value: number) => {
    if (!resource || resource === 'none' || value <= 0) return;
    if (resource === 'PM') setCurrentPM((current) => Math.max(0, current - value));
    if (resource === 'PV') setCurrentPV((current) => Math.max(0, current - value));
    if (resource === 'PA') setCurrentPA((current) => Math.max(0, current - value));
  };

  const endAssistedBonus = (id: string) => {
    const bonus = rollBonuses.find((entry) => entry.id === id);
    if (!bonus) return;
    updateRollBonus(id, { assistedState: { ...(bonus.assistedState || {}), active: false, stockCount: bonus.persistentAssisted?.kind === 'stock' ? 0 : bonus.assistedState?.stockCount } });
    setActiveBonuses((current) => { const next = new Set(current); next.delete(id); return next; });
  };

  const configureAssistedBonus = (id: string, updates: NonNullable<RollBonus['assistedState']>) => {
    const bonus = rollBonuses.find((entry) => entry.id === id);
    if (!bonus) return;
    updateRollBonus(id, { assistedState: { ...(bonus.assistedState || {}), ...updates } });
  };

  const maintainTemporaryPackage = (id: string) => {
    const bonus = rollBonuses.find((entry) => entry.id === id);
    if (!bonus?.temporaryPackage || !bonus.assistedState?.active) return;
    spendResource(bonus.temporaryPackage.maintenanceCostResource, bonus.temporaryPackage.maintenanceCostValue || 0);
  };

  const toggleActiveBonus = async (id: string) => {
    const bonus = rollBonuses.find(b => b.id === id);
    if (!bonus) return;
    const activeVariant = getActiveBonusVariant(bonus);

    if (id.startsWith('arch_')) {
      if (activeBonuses.has(id)) {
        setUsedArchetypeEffects(prev => { const next = { ...prev }; delete next[id]; return next; });
      } else {
        if (usedArchetypeEffects[id]) return;
        setUsedArchetypeEffects(prev => ({ ...prev, [id]: 1 }));
      }
    }

    const immediateAction = activeVariant?.immediateAction || bonus.immediateAction;
    if (immediateAction) {
      if (immediateAction.kind === 'grant_temporary_pm' && temporaryPM > 0) {
        alert('Você ainda possui mana temporária pendente para a próxima rolagem.');
        return;
      }
      await executeImmediateAction(bonus.alias || bonus.name, immediateAction);
      return;
    }

    if (bonus.persistentAssisted) {
      const config = bonus.persistentAssisted;
      if (bonus.assistedState?.active) {
        spendResource(config.triggerCostResource, config.triggerCostValue || 0);
        if (config.kind === 'stock') {
          const currentStock = bonus.assistedState.stockCount || 0;
          const nextStock = config.consumeAllOnTrigger ? 0 : Math.max(0, currentStock - 1);
          updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), active: nextStock > 0, stockCount: nextStock } });
        }
        return;
      }
      const configuredStock = bonus.assistedState?.configuredStock ?? config.stockCount ?? config.stockMin ?? 0;
      if (config.kind === 'stock' && configuredStock <= 0) {
        alert('Configure um estoque válido antes de ativar esta técnica.');
        return;
      }
      const initialCost = config.costPerStock ? configuredStock * config.costPerStock : (config.initialCostValue || 0);
      spendResource(config.initialCostResource, initialCost);
      if (bonus.sourceCatalogId === 'setas_infaliveis_de_petrovna') {
        (currentForm.rollBonuses || []).filter((entry) => entry.sourceCatalogId === 'setas_infaliveis_de_petrovna' && entry.id !== bonus.id && entry.assistedState?.active).forEach((entry) => updateRollBonus(entry.id, { assistedState: { ...(entry.assistedState || {}), active: false, stockCount: 0 } }));
      }
      updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), active: true, stockCount: configuredStock, configuredStock } });
      return;
    }


    if (bonus.gameplayPattern === 'prepared-magic') {
      if (!bonus.assistedState?.prepared) {
        alert('Prepare esta magia na área Ações antes de usá-la.');
        return;
      }
      setActiveBonuses((current) => {
        const next = new Set(current);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      return;
    }

    if (bonus.temporaryPackage) {

      const becomingActive = !bonus.assistedState?.active;
      if (becomingActive && bonus.sourceCatalogId === 'area_de_batalha') {
        const packageCost = (bonus.assistedState?.packageChoices || []).reduce((sum, advantageId) => sum + Number(ADVANTAGES_CATALOG.find((advantage) => advantage.id === advantageId)?.cost.match(/^\d+/)?.[0] || 0), 0);
        if (packageCost !== 2) {
          alert('Configure um pacote de exatamente 2 pontos para esta Área de Batalha.');
          return;
        }
      }
      if (becomingActive) spendResource(activeVariant?.costResource || bonus.costResource, typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : (bonus.costValue || 0));
      updateRollBonus(bonus.id, { assistedState: { ...(bonus.assistedState || {}), active: becomingActive } });
      setActiveBonuses((current) => { const next = new Set(current); if (becomingActive) next.add(id); else next.delete(id); return next; });
      return;
    }

    if (bonus.gameplayPattern === 'cycling-variant') {
      const isCurrentlyActive = activeBonuses.has(id);
      
      if (!isCurrentlyActive) {
        if (bonus.duration === 'scene') {
          const effectiveCostResource = activeVariant?.costResource || bonus.costResource;
          const effectiveCostValue = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : bonus.costValue;
          if (effectiveCostResource && effectiveCostResource !== 'none' && effectiveCostValue) {
            spendResource(effectiveCostResource, effectiveCostValue);
          }
        }
        setActiveBonuses((current) => {
          const next = new Set(current);
          next.add(id);
          return next;
        });
      } else {
        if (bonus.variants && bonus.variants.length > 1) {
          const currentIndex = bonus.variants.findIndex(v => v.id === bonus.selectedVariantId);
          const isLastVariant = currentIndex === bonus.variants.length - 1;
          
          if (isLastVariant) {
            setActiveBonuses((current) => {
              const next = new Set(current);
              next.delete(id);
              return next;
            });
          } else if (bonus.duration === 'scene') {
            const nextVariant = bonus.variants[currentIndex + 1];
            const currentCost = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : (bonus.costValue || 0);
            const nextCost = typeof nextVariant.costValue === 'number' ? nextVariant.costValue : (bonus.costValue || 0);
            if (nextCost > currentCost) {
              const resource = nextVariant.costResource || bonus.costResource;
              if (resource && resource !== 'none') {
                spendResource(resource, nextCost - currentCost);
              }
            }
          }
          cycleBonusVariant(id);
        } else {
          setActiveBonuses((current) => {
            const next = new Set(current);
            next.delete(id);
            return next;
          });
        }
      }
      return;
    }

    if (bonus.gameplayPattern === 'narrative') {
      spendResource(activeVariant?.costResource || bonus.costResource, typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : (bonus.costValue || 0));
      return;
    }

    setActiveBonuses(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // If scene duration, deduct cost once upon activation
        const effectiveCostResource = activeVariant?.costResource || bonus.costResource;
        const effectiveCostValue = typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : bonus.costValue;
        if (bonus.duration === 'scene' && effectiveCostResource && effectiveCostResource !== 'none' && effectiveCostValue) {
          if (effectiveCostResource === 'PM') setCurrentPM(p => Math.max(0, p - (effectiveCostValue || 0)));
          if (effectiveCostResource === 'PV') setCurrentPV(p => Math.max(0, p - (effectiveCostValue || 0)));
          if (effectiveCostResource === 'PA') setCurrentPA(p => Math.max(0, p - (effectiveCostValue || 0)));
        }
      }
      return next;
    });
  };

  // Kit power usage
  const handleUseKitPower = async (power: KitPower) => {
    if (selectedKitId === 'mago' && power.id === 'mago_bateria_de_mana') {
      await executeImmediateAction(power.name, { kind: 'recover_pm', rollFormula: '1d6+h', resultLabel: 'Bateria de Mana (PM)' });
      setUsedKitPowers(prev => ({ ...prev, [power.id]: (prev[power.id] || 0) + 1 }));
      return;
    }

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
    setUsedArchetypeEffects({});
    setActiveKitBuffs(new Set());
    updateCurrentFormForActiveIndex({
      rollBonuses: (currentForm.rollBonuses || []).map((bonus) => bonus.assistedState ? { ...bonus, assistedState: { ...bonus.assistedState, active: false, stockCount: bonus.persistentAssisted?.kind === 'stock' ? 0 : bonus.assistedState.stockCount } } : bonus)
    });
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
    setCurrentPM(recoverableMaxPM);
    setCurrentPA(maxPA);
    handleResetScene();
    setIsDrawerOpen(false);
  };

  // Descanso Rápido (Recupera R em PV e H em PM, reseta usos de cena)
  const handleQuickRest = () => {
    const recoverPV = Math.max(1, resistencia);
    const recoverPM = Math.max(1, habilidade);
    setCurrentPV(p => Math.min(maxPV, p + recoverPV));
    setCurrentPM(p => Math.min(recoverableMaxPM, p + recoverPM));
    handleResetScene();
    setIsDrawerOpen(false);
  };

  const handleStatChange = (stat: 'PA' | 'PM' | 'PV', delta: number) => {
    if (stat === 'PA') setCurrentPA(p => Math.max(0, p + delta));
    else if (stat === 'PM') setCurrentPM(p => Math.max(0, p + delta));
    else if (stat === 'PV') setCurrentPV(p => Math.max(0, p + delta));
  };

  (window as any).debugState = { rolling, diceBox: diceBoxRef.current };
  const handleRoll = async (attrName: 'poder' | 'habilidade' | 'resistencia', options?: { extraDice?: number; label?: string; costPM?: number; actionType?: 'attack' | 'defense' | 'general'; skillId?: string }) => {
    if (!diceBoxRef.current || diceBoxRef.current === 'initializing' || rolling) return;

    const actionType = options?.actionType || 'general';
    const activeBonusesList = rollBonuses.filter(b => activeBonuses.has(b.id));
    const hasLuta = (currentForm.skills || []).includes('luta');
    const hasMistica = (currentForm.skills || []).includes('mistica');
    const hasMagia = (currentForm.advantages || []).some((advantageId) => advantageId.split('::')[0] === 'magia');
    const usesMisticaForCombat = !hasLuta && hasMistica && hasMagia;

    const plan = resolveActionPlan(
      {
        actionType,
        targetAttribute: attrName,
        selectedSkill: options?.skillId || ((actionType === 'attack' || actionType === 'defense') ? (hasLuta ? 'luta' : (usesMisticaForCombat ? 'mistica' : undefined)) : undefined),
        activeBonusIds: activeBonuses,
        manualBonusDice,
      },
      {
        currentForm,
        rollBonuses,
        currentPV,
        currentPM,
        currentPA,
        temporaryPM,
        activeKitBuffsList,
      }
    );

    if (plan.hasConflicts) {
      alert(plan.conflictMessage || 'Conflito de bônus detectado.');
      return;
    }

    if (!plan.canAfford) {
      alert('Recursos insuficientes para esta ação.');
      return;
    }

    const effectiveAttrName = plan.effectiveAttributeName;
    if (!allowedAttributes[effectiveAttrName]) return;

    setRolling(true);
    setIsModalOpen(false);
    setIsClosing(false);
    
    if (clearDiceTimeoutRef.current) {
      clearTimeout(clearDiceTimeoutRef.current);
      clearDiceTimeoutRef.current = null;
    }

    const diceCount = Math.max(1, Math.min(3, plan.diceCount));

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
        if (diceBoxRef.current && diceBoxRef.current !== 'initializing') diceBoxRef.current.clear();
      }, 3000);
      
      let rolls: number[] = [];
      if (diceResults && diceResults.length > 0) {
        if (diceResults[0].rolls) {
          rolls = diceResults[0].rolls.map((r: any) => r.value);
        } else if (diceResults[0].value) {
          rolls = diceResults.map((r: any) => r.value);
        }
      }

      const diceSum = rolls.reduce((sum, r) => sum + r, 0);
      const isCriticalFail = rolls.length > 0 && rolls.every((r) => r === 1);
      
      const rolledCrits = isCriticalFail ? 0 : rolls.filter((r) => r >= plan.critRange).length;
      const autoCrits = !isCriticalFail ? plan.automaticCriticals : 0;
      const criticals = rolledCrits + autoCrits;

      const totalEffectiveAttribute = plan.totalEffectiveAttribute;
      const flatBonusTotal = plan.flatBonusTotal;
      const finalTotal = isCriticalFail ? 0 : diceSum + totalEffectiveAttribute + (totalEffectiveAttribute * criticals) + flatBonusTotal;

      // Deduct itemized resolved costs
      if (plan.totalCostPV > 0) setCurrentPV(prev => Math.max(0, prev - plan.totalCostPV));
      if (plan.totalCostPM > 0) {
        const tempSpent = Math.min(temporaryPM, plan.totalCostPM);
        const remainingPMCost = Math.max(0, plan.totalCostPM - tempSpent);
        if (remainingPMCost > 0) setCurrentPM(prev => Math.max(0, prev - remainingPMCost));
      }
      if (plan.totalCostPA > 0) setCurrentPA(prev => Math.max(0, prev - plan.totalCostPA));
      if (temporaryPM > 0) setTemporaryPM(0);

      // Auto-deactivate instant bonuses and reset prepared magic
      const consumedBonusIds = new Set(
        activeBonusesList
          .filter((bonus) => bonus.duration === 'instant' && bonus.costTiming !== 'trigger' && bonus.costTiming !== 'maintenance')
          .map((bonus) => bonus.id)
      );

      setActiveBonuses(prev => {
        const next = new Set<string>();
        rollBonuses.forEach(b => {
          if (prev.has(b.id) && (b.duration === 'scene' || !consumedBonusIds.has(b.id))) {
            next.add(b.id);
          }
        });
        return next;
      });

      // Reset prepared state only for prepared magic consumed by this action.
      activeBonusesList.forEach(b => {
        if (b.gameplayPattern === 'prepared-magic' && b.assistedState?.prepared) {
          updateRollBonus(b.id, { assistedState: { ...(b.assistedState || {}), prepared: false } });
        }
      });

      const label = effectiveAttrName === 'poder' ? 'Poder' : effectiveAttrName === 'habilidade' ? 'Habilidade' : 'Resistência';

      setResult({
        rolls,
        diceSum,
        criticals,
        isCriticalFail,
        finalTotal,
        usedAttributeName: options?.label || label,
        baseAttributeValue: plan.baseAttributeValue,
        attrBonusValue: plan.attrBonusValue,
        totalEffectiveAttribute,
        flatBonusTotal,
        critRangeUsed: plan.critRange,
        appliedBonuses: plan.appliedBonuses.map(b => ({
          name: b.name,
          alias: b.alias,
          desc: b.desc,
          cost: b.cost,
        }))
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

  const instantActiveBonuses = activeBonusesList.filter(b => b.duration === 'instant' && b.gameplayPattern !== 'prepared-magic');
  const instantActiveBonusCosts = instantActiveBonuses.map((b) => {
    const activeVariant = getActiveBonusVariant(b);
    return {
      resource: activeVariant?.costResource || b.costResource,
      value: typeof activeVariant?.costValue === 'number' ? activeVariant.costValue : (b.costValue || 0),
    };
  });
  const totalCostPV = instantActiveBonusCosts.filter(b => b.resource === 'PV').reduce((sum, b) => sum + (b.value || 0), 0);
  const totalCostPM = Math.max(0, instantActiveBonusCosts.filter(b => b.resource === 'PM').reduce((sum, b) => sum + (b.value || 0), 0) - temporaryPM);
  const totalCostPA = instantActiveBonusCosts.filter(b => b.resource === 'PA').reduce((sum, b) => sum + (b.value || 0), 0);

  // Active actionable kit powers (powers that can be tapped in gameplay)
  const activeKitActionPowers = useMemo(() => {
    if (!currentKit) return [];
    return currentKit.powers.filter(p => p.type === 'per_scene' || p.type === 'per_session' || p.type === 'buff');
  }, [currentKit]);


  const totalPoints = calculatePoints(currentFormBase, currentKit ? (currentKit.cost || 1) : 0, getArchetypeCost(selectedArchetypeId));
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

      <div className="app-container">
        
        {mode === 'edit' && (
          <CharacterEditor
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            totalPoints={totalPoints}
            setIsSheetsModalOpen={setIsSheetsModalOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            characterName={characterName}
            updateActiveSheet={updateActiveSheet}
            currentKit={currentKit}
            currentArchetype={currentArchetype}
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
            selectedArchetypeId={selectedArchetypeId}
            setIsTransformModalOpen={setIsTransformModalOpen}
            poder={poder}
            habilidade={habilidade}
            resistencia={resistencia}
            maisVida={maisVida}
            maisMana={maisMana}
            maisAcao={maisAcao}
            removeRollBonus={removeRollBonus}
            setMode={setMode}
          />
        )}

        {mode === 'actions' && (
          <ActionWorkspace
            characterName={characterName}
            currentForm={currentForm}
            forms={forms}
            activeFormIndex={activeFormIndex}
            selectedKitId={selectedKitId}
            currentPM={currentPM}
            maxPM={maxPM}
            visibleRollBonuses={visibleRollBonuses}
            setActiveFormIndex={setActiveFormIndex}
            setMode={setMode}
            setIsDrawerOpen={setIsDrawerOpen}
            setEditingBonusId={setEditingBonusId}
            removeRollBonus={removeRollBonus}
            updateRollBonus={updateRollBonus}
            setIsPresetModalOpen={setIsPresetModalOpen}
            addCustomBonus={addCustomBonus}
            createPreparedMagic={createPreparedMagic}
            prepareExistingMagic={prepareExistingMagic}
          />
        )}

        {mode === 'play' && (
          <PlayMode
            characterName={characterName}
            currentKit={currentKit}
            currentKitNotes={currentKit?.notes}
            currentKitUnsupportedNotes={currentKit?.unsupportedNotes}
            currentArchetypeName={currentArchetype?.name}
            currentArchetypeNotes={currentArchetype?.notes}
            currentArchetypeUnsupportedNotes={currentArchetype?.unsupportedNotes}
            currentForm={currentForm}
            forms={forms}
            activeFormIndex={activeFormIndex}
            selectedKitId={selectedKitId}
            accentColor={accentColor}
            currentPV={currentPV}
            currentPM={currentPM + temporaryPM}
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
            manualBonusDice={manualBonusDice}
            setManualBonusDice={setManualBonusDice}
            setIsDrawerOpen={setIsDrawerOpen}
            setCurrentPM={setCurrentPM}
            setActiveFormIndex={setActiveFormIndex}
            setIsTransformModalOpen={setIsTransformModalOpen}
            setIsKitInfoModalOpen={setIsKitInfoModalOpen}
            setIsEditingStats={setIsEditingStats}
            handleUseKitPower={handleUseKitPower}
            handleRoll={handleRoll}
            toggleActiveBonus={toggleActiveBonus}
            cycleBonusVariant={cycleBonusVariant}
            activateStrike={(bonus) => {
              updateCurrentFormForActiveIndex({ rollBonuses: [...(currentForm.rollBonuses || []).filter((b) => b.id !== bonus.id), bonus] });
              void toggleActiveBonus(bonus.id);
            }}
            configureAssistedBonus={configureAssistedBonus}
            endAssistedBonus={endAssistedBonus}
            maintainTemporaryPackage={maintainTemporaryPackage}
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
        handleActions={handleActions}
        handlePlayMode={handlePlayMode}
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
