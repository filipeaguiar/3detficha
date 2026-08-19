## Why

`src/App.tsx` concentra cerca de 3.500 linhas com tipos, dados estáticos, ícones, persistência, regras de jogo, integração com dados 3D e toda a interface. Essa concentração dificulta manutenção, revisão e evolução isolada das áreas do app, tornando necessária uma divisão modular sem alterar o comportamento atual.

## What Changes

- Dividir a interface monolítica de `App.tsx` em componentes menores organizados por responsabilidade e domínio.
- Extrair tipos, constantes, ícones e utilitários reutilizáveis para módulos próprios.
- Encapsular estado e efeitos complexos em hooks quando isso reduzir o acoplamento dos componentes.
- Manter `App.tsx` como ponto de composição e coordenação de alto nível.
- Preservar o fluxo visual, persistência local, rolagens, gerenciamento de personagens, formulários e modais existentes.
- Validar a refatoração com lint e build, sem introduzir novas dependências de produção.

## Capabilities

### New Capabilities
- `app-component-modularity`: Define a composição modular da aplicação e a preservação do comportamento durante a separação de `App.tsx`.

### Modified Capabilities

Nenhuma. A mudança é estrutural e não altera requisitos funcionais existentes.

## Impact

- Código principal afetado: `src/App.tsx`.
- Novos módulos esperados em `src/components/`, `src/hooks/`, `src/types/`, `src/constants/` e/ou `src/utils/`, conforme a responsabilidade extraída.
- Importações internas e contratos de props serão reorganizados.
- `src/App.css`, armazenamento em `localStorage`, integração com `@3d-dice/dice-box` e componentes existentes devem continuar compatíveis.
- Não há mudanças previstas em APIs externas, formato de dados persistidos ou dependências de produção.
