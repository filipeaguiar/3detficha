const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace [...rollBonuses, newBonus] with [...(currentForm.rollBonuses || []), newBonus]
content = content.replace(/rollBonuses: \[\.\.\.rollBonuses, newBonus\]/g, 'rollBonuses: [...(currentForm.rollBonuses || []), newBonus]');

// removeRollBonus
content = content.replace(/rollBonuses\.filter\(b => b\.id !== id\)/g, '(currentForm.rollBonuses || []).filter(b => b.id !== id)');

// updateRollBonus
content = content.replace(/rollBonuses\.map\(b => b\.id === id \? { \.\.\.b, \.\.\.updates } : b\)/g, '(currentForm.rollBonuses || []).map(b => b.id === id ? { ...b, ...updates } : b)');

// cycleBonusVariant
content = content.replace(/rollBonuses\.map\(b => {/g, '(currentForm.rollBonuses || []).map(b => {');

// line 1101
content = content.replace(/\[\.\.\.rollBonuses\.filter/g, '[...(currentForm.rollBonuses || []).filter');

fs.writeFileSync(file, content);
