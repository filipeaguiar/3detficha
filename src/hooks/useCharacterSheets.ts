import { useMemo, useRef, useState } from 'react';
import { loadInitialSheets } from '../utils/character';
import type { CharacterForm, CharacterLinkGroup, CharacterSheet } from '../types/character';

export function useCharacterSheets() {
  const initial = useRef(loadInitialSheets()).current;
  const [characterSheets, setCharacterSheets] = useState<CharacterSheet[]>(initial.sheets);
  const [activeCharacterId, setActiveCharacterId] = useState<string>(initial.activeId);
  const [linkGroups, setLinkGroups] = useState<CharacterLinkGroup[]>(initial.linkGroups);

  const activeSheet = useMemo(() => {
    return characterSheets.find(c => c.id === activeCharacterId) || characterSheets[0];
  }, [characterSheets, activeCharacterId]);

  const saveAllSheets = (updatedSheets: CharacterSheet[], activeId = activeCharacterId, updatedGroups = linkGroups) => {
    setCharacterSheets(updatedSheets);
    setActiveCharacterId(activeId);
    setLinkGroups(updatedGroups);
    localStorage.setItem('3det_character_list', JSON.stringify(updatedSheets));
    localStorage.setItem('3det_active_character_id', activeId);
    localStorage.setItem('3det_character_link_groups', JSON.stringify(updatedGroups));
  };

  const updateActiveSheet = (updates: Partial<CharacterSheet>) => {
    const updatedList = characterSheets.map(sheet =>
      sheet.id === activeCharacterId ? { ...sheet, ...updates } : sheet
    );
    saveAllSheets(updatedList);
  };

  const updateCurrentForm = (activeFormIndex: number, updates: Partial<CharacterForm>) => {
    const forms = activeSheet.forms;
    const updatedForms = forms.map((f, i) => i === activeFormIndex ? { ...f, ...updates } : f);
    updateActiveSheet({ forms: updatedForms });
  };

  const activeLinkGroup = useMemo(() => {
    return linkGroups.find(group => group.sheetIds.includes(activeCharacterId)) || null;
  }, [linkGroups, activeCharacterId]);

  const linkedSheets = useMemo(() => {
    if (!activeLinkGroup) return [activeSheet];
    return activeLinkGroup.sheetIds
      .map(id => characterSheets.find(sheet => sheet.id === id))
      .filter((sheet): sheet is CharacterSheet => !!sheet);
  }, [activeLinkGroup, activeSheet, characterSheets]);

  const createLinkedSheet = (baseSheetId: string, newSheet: CharacterSheet, relationLabel: string, relationType: CharacterSheet['relationType'] = 'form') => {
    const baseSheet = characterSheets.find(sheet => sheet.id === baseSheetId);
    if (!baseSheet) return;

    const groupId = baseSheet.linkGroupId || `group_${Date.now()}`;
    const updatedBaseSheet = baseSheet.linkGroupId ? baseSheet : { ...baseSheet, linkGroupId: groupId, relationType: 'base' as const, relationLabel: baseSheet.relationLabel || 'Forma Base' };
    const linkedNewSheet: CharacterSheet = { ...newSheet, linkGroupId: groupId, relationType, relationLabel };

    const updatedSheets = characterSheets.map(sheet => sheet.id === baseSheetId ? updatedBaseSheet : sheet);
    updatedSheets.push(linkedNewSheet);

    const existingGroup = linkGroups.find(group => group.id === groupId);
    const updatedGroups = existingGroup
      ? linkGroups.map(group => group.id === groupId ? { ...group, sheetIds: [...group.sheetIds, linkedNewSheet.id] } : group)
      : [...linkGroups, { id: groupId, primarySheetId: baseSheetId, sheetIds: [baseSheetId, linkedNewSheet.id] }];

    saveAllSheets(updatedSheets, linkedNewSheet.id, updatedGroups);
  };

  const unlinkSheet = (sheetId: string) => {
    const targetSheet = characterSheets.find(sheet => sheet.id === sheetId);
    if (!targetSheet?.linkGroupId) return;

    const targetGroup = linkGroups.find(group => group.id === targetSheet.linkGroupId);
    if (!targetGroup) return;

    const remainingIds = targetGroup.sheetIds.filter(id => id !== sheetId);
    const updatedSheets = characterSheets.map(sheet =>
      sheet.id === sheetId
        ? { ...sheet, linkGroupId: undefined, relationType: undefined, relationLabel: undefined }
        : sheet
    );

    const updatedGroups = remainingIds.length >= 2
      ? linkGroups.map(group => group.id === targetGroup.id ? { ...group, sheetIds: remainingIds, primarySheetId: remainingIds[0] } : group)
      : linkGroups.filter(group => group.id !== targetGroup.id);

    saveAllSheets(updatedSheets, activeCharacterId, updatedGroups);
  };

  return {
    characterSheets,
    activeCharacterId,
    activeSheet,
    linkGroups,
    activeLinkGroup,
    linkedSheets,
    saveAllSheets,
    updateActiveSheet,
    updateCurrentForm,
    createLinkedSheet,
    unlinkSheet,
    setActiveCharacterId,
    setCharacterSheets,
    setLinkGroups,
  };
}
