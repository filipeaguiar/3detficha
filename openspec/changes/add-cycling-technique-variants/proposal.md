## Why

Algumas técnicas do jogo não são adquiridas como entradas separadas por variante; em vez disso, o personagem compra uma única técnica e, no momento do uso, escolhe entre o modo base e modos aprimorados com custos adicionais. O app ainda não modela bem esse padrão na interface de jogo, o que impede representar corretamente Raio Místico e Barreira Mística sem quebrar a lógica de aquisição única.

## What Changes

- Introduzir suporte a técnicas adquiridas uma única vez, mas com variantes de uso cicláveis na interface de jogo.
- Permitir que o modo de jogo alterne entre modo base e modos opcionais da técnica, com custo de PM derivado da variante atual.
- Modelar explicitamente variantes internas para Raio Místico e Barreira Mística como implementação inicial do padrão.
- Exibir na UI que o efeito específico da variante é declarado em mesa/metagame, sem exigir automação total do efeito narrativo.
- Preservar o custo de aquisição único da técnica no catálogo e no cálculo de XP/pontos.

## Capabilities

### New Capabilities
- `cycling-technique-variants`: Técnicas com aquisição única e variantes internas de uso cicláveis no modo de jogo.

### Modified Capabilities
- `technique-selection-ux`: A seleção guiada de técnicas precisa conviver com técnicas que possuem múltiplos modos internos sem multiplicar artificialmente suas entradas de aquisição.

## Impact

- Modelo de técnicas e bônus na interface de jogo
- Componente de técnica/bônus no play mode
- Catálogo estruturado de técnicas
- UX de custo em PM e descrição de técnica ativa
