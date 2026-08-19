import { useMemo, useRef, useState } from 'react';
import { loadInitialSheets } from '../utils/character';
import type { CharacterForm, CharacterSheet } from '../types/character';

export function useCharacterSheets() {
  const initial = useRef(loadInitialSheets()).current;
  const [characterSheets, setCharacterSheets] = useState<CharacterSheet[]>(initial.sheets);
  const [activeCharacterId, setActiveCharacterId] = useState<string>(initial.activeId);

  const activeSheet = useMemo(() => {
    return characterSheets.find(c => c.id === activeCharacterId) || characterSheets[0];
  }, [characterSheets, activeCharacterId]);

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

  const updateCurrentForm = (activeFormIndex: number, updates: Partial<CharacterForm>) => {
    const forms = activeSheet.forms || [];
    const updatedForms = forms.map((f, i) => i === activeFormIndex ? { ...f, ...updates } : f);
    updateActiveSheet({ forms: updatedForms });
  };

  return {
    characterSheets,
    activeCharacterId,
    activeSheet,
    saveAllSheets,
    updateActiveSheet,
    updateCurrentForm,
    setActiveCharacterId,
    setCharacterSheets,
  };
}
