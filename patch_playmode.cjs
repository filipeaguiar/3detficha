const fs = require('fs');
const file = 'src/components/play/PlayMode.tsx';
let content = fs.readFileSync(file, 'utf8');

const formatStatusTagStr = `const formatCost = (cost) => { if (cost === -1) return 'Var. PM'; return \\\`-\\\${cost}PM\\\`; };`;

const target = `            } else if (mod.bonusType !== 'none') {
              const attrLetter = mod.attribute === 'poder' ? 'P' : mod.attribute === 'habilidade' ? 'H' : mod.attribute === 'resistencia' ? 'R' : '';
              statusTag = \`\${mod.value ? \`+\${mod.value}\${attrLetter}\` : ''} [\${power.costPM || 3}PM]\`;
            } else if (power.type === 'per_scene') {
              statusTag = isAvailable ? '1/1 Cena' : \`-\${power.repeatCostPM || 3}PM\`;
            } else if (power.type === 'per_session') {
              statusTag = isAvailable ? \`-\${power.costPM || 3}PM\` : 'Usado';
            } else {
              statusTag = \`-\${power.costPM || 2}PM\`;
            }`;

const replacement = `            } else if (mod.bonusType !== 'none') {
              const attrLetter = mod.attribute === 'poder' ? 'P' : mod.attribute === 'habilidade' ? 'H' : mod.attribute === 'resistencia' ? 'R' : '';
              const costDisp = power.costPM !== undefined ? power.costPM : 3;
              statusTag = \`\${mod.value ? \`+\${mod.value}\${attrLetter}\` : ''} [\${costDisp === -1 ? 'Var.' : costDisp}PM]\`;
            } else if (power.type === 'per_scene') {
              const repeatCost = power.repeatCostPM !== undefined ? power.repeatCostPM : 3;
              statusTag = isAvailable ? '1/1 Cena' : (repeatCost === -1 ? 'Var. PM' : \`-\${repeatCost}PM\`);
            } else if (power.type === 'per_session') {
              const sessionCost = power.costPM !== undefined ? power.costPM : 3;
              statusTag = isAvailable ? (sessionCost === -1 ? 'Var. PM' : \`-\${sessionCost}PM\`) : 'Usado';
            } else {
              const normalCost = power.costPM !== undefined ? power.costPM : 2;
              statusTag = normalCost === -1 ? 'Var. PM' : \`-\${normalCost}PM\`;
            }`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
