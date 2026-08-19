## Why

A UX das abas de edição ainda força navegação e seleção excessivamente manuais em vantagens, desvantagens e técnicas. Além disso, o app já começou a suportar crédito de XP para técnicas, mas ainda falta integrar isso a uma experiência de escolha coerente com as regras, incluindo filtragem por exigências e separação clara dos tipos de opção.

## What Changes

- Separar visual e funcionalmente vantagens e desvantagens na área de seleção.
- Adicionar filtros consistentes em todas as abas de opções relevantes.
- Melhorar a aba de técnicas para filtrar e/ou ocultar técnicas incompatíveis com os requisitos atuais do personagem.
- Distinguir técnicas de uso comum das técnicas que exigem vantagens, perícias ou outras restrições específicas.
- Implementar metadados estruturados de técnicas com exigências e custo em XP, conectados à UX de seleção.
- Integrar o fluxo de crédito de XP (como Grimório) diretamente à escolha de técnicas, evitando configuração manual escondida.

## Capabilities

### New Capabilities
- `technique-selection-ux`: Seleção guiada de técnicas com filtros, gating por exigências, distinção entre técnicas comuns/universais e integração com custo/financiamento em XP.

### Modified Capabilities
- `kits`: Melhorar a UX para escolhas e filtros nas abas relacionadas, mantendo consistência com a nova lógica de técnicas e XP.
- `app-component-modularity`: Ajustar os contratos de UI modulares das abas de edição para suportar separação de listas, filtros persistentes e estados derivados de elegibilidade.

## Impact

- Editor de ficha, especialmente abas de vantagens/desvantagens/técnicas
- Catálogo estruturado de técnicas e metadados de requisitos
- Cálculo e exibição de custo em XP e cobertura por vantagens como Grimório
- Regras de elegibilidade baseadas em vantagens, perícias e outros requisitos do personagem
