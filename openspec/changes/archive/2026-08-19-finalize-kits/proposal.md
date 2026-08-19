## Why

Os kits já existem e funcionam parcialmente, mas ainda não receberam o mesmo tratamento de modelagem explícita, escolhas internas, efeitos automatizáveis delimitados e disclosure manual que demos aos arquétipos. Isso dificulta manter fidelidade às regras, clareza de UI e evolução segura do motor de jogo.

## What Changes

- Formalizar kits como uma camada de regras estruturada e auditável, separando conteúdo concedido, escolhas internas e efeitos ativáveis.
- Modelar explicitamente poderes de kit automatizáveis, parcialmente automatizáveis e manuais, com disclosure claro na UI.
- Suportar escolhas internas de kit quando houver pacotes alternativos, especializações ou variações por kit.
- Revisar custo, uso por cena/sessão, buffs ativos e integração dos poderes de kit com o motor de bônus/rolagem.
- Melhorar a visualização do pacote passivo e dos poderes do kit em edição e jogo.
- Preservar compatibilidade com os dados já salvos e com personagens sem kit.

## Capabilities

### New Capabilities
- `kits`: Modelagem completa dos kits como camada estruturada com catálogo, escolhas, efeitos automatizados delimitados, disclosure manual e integração de UI/jogabilidade.

### Modified Capabilities
- `archetypes`: Garantir convivência estável entre arquétipos e kits como camadas distintas, sem conflito de custo, grants, disclosure e efeitos ativos.

## Impact

- Arquivos de catálogo e tipos de kit
- UI do editor e do modo de jogo para detalhes e poderes de kit
- Cálculo de custo e integração com o motor de bônus
- Persistência/migração de personagens salvos
- OpenSpec principal de kits e ajuste da spec de arquétipos se necessário
