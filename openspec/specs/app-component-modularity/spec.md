# app-component-modularity Specification

## Purpose
Preservar a composição modular da aplicação, separando responsabilidades entre componentes, hooks, tipos, constantes e utilitários sem alterar o comportamento observável da ficha e do modo de jogo.
## Requirements
### Requirement: Composição modular da aplicação
A aplicação SHALL manter cada área principal da interface em um módulo React com responsabilidade nomeada, incluindo edição da ficha, experiência de jogo, navegação ou drawer e modais. `App.tsx` SHALL atuar como ponto de composição de alto nível e não SHALL conter a implementação JSX detalhada dessas áreas.

#### Scenario: Composição do componente raiz
- **WHEN** um desenvolvedor inspeciona a árvore renderizada por `App.tsx`
- **THEN** as áreas principais são importadas de módulos de componentes próprios e o arquivo raiz coordena sua composição e dados compartilhados

#### Scenario: Alteração isolada de uma área
- **WHEN** um desenvolvedor precisa alterar a apresentação de um modal ou de uma seção da ficha
- **THEN** a implementação correspondente pode ser localizada em seu módulo de domínio sem editar o JSX detalhado de outras áreas

### Requirement: Separação de responsabilidades compartilhadas
O sistema SHALL declarar tipos de domínio, constantes volumosas, ícones reutilizáveis e funções puras fora de `App.tsx`. Módulos compartilhados de baixo nível MUST NOT depender de componentes de interface de nível superior.

#### Scenario: Uso de modelos e constantes
- **WHEN** um componente ou hook precisa dos modelos de personagem, presets ou utilitários de cálculo e formatação
- **THEN** ele os importa de módulos compartilhados dedicados em vez de redefini-los no componente raiz

#### Scenario: Direção das dependências
- **WHEN** a árvore de importações dos novos módulos é verificada
- **THEN** tipos, constantes e utilitários podem ser consumidos pelos componentes, sem importar esses componentes de volta

### Requirement: Contratos tipados entre módulos
Os componentes e hooks extraídos SHALL expor interfaces TypeScript explícitas para seus dados e callbacks, preservando fluxo de dados previsível e compatibilidade com a verificação de tipos do projeto.

#### Scenario: Validação de contratos
- **WHEN** o projeto é compilado com o comando de build configurado
- **THEN** os contratos entre `App`, componentes e hooks são verificados sem erros de TypeScript

### Requirement: Preservação funcional
A modularização SHALL preservar o comportamento observável existente, incluindo edição e troca de fichas, formulários e transformações, seleção de kits, vantagens e perícias, bônus, recursos, descansos, rolagens 3D, resultado das rolagens, som, avatar e abertura ou fechamento de drawers e modais.

#### Scenario: Uso no modo de edição
- **WHEN** o usuário edita os dados de uma ficha e alterna entre fichas ou formas
- **THEN** os dados e controles se comportam como antes da modularização

#### Scenario: Uso no modo de jogo
- **WHEN** o usuário gerencia recursos e bônus e executa uma rolagem permitida
- **THEN** custos, dados, cálculos, animações e resultado seguem as regras existentes

#### Scenario: Navegação e sobreposições
- **WHEN** o usuário abre ou fecha o drawer, seletores, editores e modais de resultado
- **THEN** as mesmas ações, conteúdos e transições continuam disponíveis

### Requirement: Compatibilidade de persistência e integrações
A refatoração MUST preservar as chaves e o formato aceito do armazenamento local, inclusive a migração legada, e SHALL manter a integração atual com DiceBox, áudio e recorte de imagem sem exigir novas dependências de produção.

#### Scenario: Carregamento de dados existentes
- **WHEN** a aplicação inicia com dados válidos nas chaves atuais de `localStorage` ou com uma ficha no formato legado
- **THEN** as fichas são carregadas ou migradas sem perda decorrente da modularização

#### Scenario: Persistência após edição
- **WHEN** uma ficha é criada, editada, duplicada, selecionada ou removida
- **THEN** a lista e o identificador ativo continuam sendo salvos nas mesmas chaves e em formato compatível

#### Scenario: Build de produção
- **WHEN** lint e build são executados após a modularização
- **THEN** o projeto passa pelas verificações sem adicionar dependências de produção para suportar a nova organização

### Requirement: App subcomponents isolate visual sections and repeated UI patterns
The system SHALL keep `App.tsx` focused on orchestration and SHALL organize repeated or visually distinct interface regions into dedicated subcomponents or reusable rendering units, especially for editor tabs, play mode groups, modal content, and shared card patterns.

#### Scenario: Editor UI renders through modular visual sections
- **WHEN** the character editor displays tab-specific content
- **THEN** repeated visual structures and larger tab bodies SHALL be implemented through modular rendering units instead of remaining as one large monolithic JSX block.

#### Scenario: Editor tab manages its own filtering and gating
- **WHEN** the user switches between editor tabs or changes search and eligibility filters
- **THEN** the tab content SHALL keep its current behavior while being organized into maintainable rendering sections that isolate tab-specific concerns.

### Requirement: Modular editor contracts must support per-tab filters and derived eligibility state
The editor modules SHALL support separate filter state and derived eligibility state for each option-selection area.

#### Scenario: Editor tab manages its own filtering and gating
- **WHEN** a selectable tab is rendered
- **THEN** it can receive or derive its own filter state and eligibility data without collapsing unrelated tab behavior into the root component

### Requirement: Actions workspace SHALL be a dedicated high-level module
The system SHALL implement the independent Ações destination as a dedicated high-level component with explicit TypeScript contracts for active-form data, classified action collections, navigation state, and update callbacks. `App.tsx` SHALL coordinate the destination without containing its detailed category JSX.

#### Scenario: Compose actions mode
- **WHEN** `App.tsx` renders the Ações destination
- **THEN** it SHALL delegate the workspace and category presentation to dedicated action-domain components
- **AND** shared low-level types and classification helpers SHALL not depend on high-level UI modules

#### Scenario: Build validates workspace contracts
- **WHEN** the configured production build is executed
- **THEN** data and callback contracts among `App`, the actions workspace, editor, and play components SHALL pass TypeScript validation
