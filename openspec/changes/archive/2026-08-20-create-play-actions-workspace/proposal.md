## Why

A interface ainda concentra aquisição de técnicas, golpes conhecidos e configuração de modificadores/bônus na mesma aba “Técnicas”, enquanto o modo de jogo também empilha todas as ações em um único painel. Essa mistura dificulta localizar, configurar e evoluir cada tipo de ação.

## What Changes

- Criar uma área de navegação independente chamada “Ações”, acessível por um item próprio no menu da aplicação e separada de “Editar Ficha”.
- Organizar a área “Ações” em visualizações distintas para ataques, técnicas e modificadores/bônus, sem empilhar todos os grupos em uma única aba.
- Manter a aba “Técnicas” do editor focada na aquisição e remoção de técnicas da ficha, removendo dela a configuração operacional genérica de ações e modificadores.
- Permitir que a área “Ações” configure as ações pertencentes à forma ativa sem alterar as regras de aquisição, custos de XP ou persistência.
- Preservar no modo de jogo a ativação, custos, combos, variantes, estados assistidos, pacotes e detalhes existentes.
- Exibir estados vazios claros quando a forma não possuir itens de uma categoria.

## Capabilities

### New Capabilities
- `action-workspace-navigation`: Define a área independente “Ações”, sua entrada no menu e a navegação separada entre ataques, técnicas e modificadores/bônus.

### Modified Capabilities
- `character-editor-ui-refactor`: Restringe a aba “Técnicas” do editor à aquisição e gestão de técnicas, transferindo a configuração operacional das ações para a área dedicada.
- `play-action-separation`: Reforça que ataques, técnicas e modificadores/bônus possuem destinos visuais independentes, sem uma lista única ou apresentação duplicada.
- `app-component-modularity`: Exige que a nova área “Ações” seja um módulo de alto nível próprio, com contratos tipados e sem devolver JSX detalhado ao `App.tsx`.

## Impact

- Navegação e estado de modo em `src/App.tsx` e no drawer/menu da aplicação.
- `src/components/editor/CharacterEditor.tsx`, especialmente a aba de técnicas e a lista de itens adquiridos.
- Componentes em `src/components/play/` e novos componentes da área dedicada de ações.
- Contratos TypeScript para classificação e edição de ataques, técnicas e modificadores.
- CSS de navegação, abas, estados vazios e grupos de ações em `src/index.css`.
- Nenhuma migração de dados ou nova dependência de produção é esperada.
