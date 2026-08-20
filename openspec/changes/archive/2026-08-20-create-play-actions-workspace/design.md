## Context

Hoje existem dois contextos que se sobrepõem. A aba “Técnicas” do `CharacterEditor` contém catálogo, aquisição de Golpes, golpes conhecidos, lista de bônus adquiridos e controles especiais; no `PlayMode`, modificadores manuais, ataques e técnicas aparecem em sequência no mesmo painel. O drawer oferece “Editar Ficha”, mas não oferece um destino próprio para organizar as ações da forma ativa.

A implementação deve preservar `CharacterForm.rollBonuses`, `strikeSelections`, estados assistidos, variantes e handlers existentes. Não deve introduzir uma nova representação persistida para as mesmas ações.

## Goals / Non-Goals

**Goals:**
- Criar “Ações” como área de alto nível acessível pelo menu, paralela ao modo de edição e ao modo de jogo.
- Separar a navegação interna em Ataques, Técnicas e Modificadores/Bônus.
- Reduzir a aba “Técnicas” do editor ao catálogo, elegibilidade, aquisição e remoção.
- Reutilizar classificação e componentes existentes sem duplicar estado ou regras.
- Manter o modo de jogo voltado à ativação e rolagem, não à configuração estrutural da ficha.

**Non-Goals:**
- Alterar custos de XP, regras de Golpes ou regras de ativação.
- Migrar ou renomear campos persistidos.
- Criar roteamento por URL ou instalar biblioteca de rotas.
- Redesenhar todo o drawer ou o HUD de jogo.

## Decisions

### 1. Introduzir um terceiro modo de alto nível `actions`
O estado de navegação coordenado por `App` passará de `edit | play` para `edit | play | actions`. O drawer terá um item “Ações” que fecha o menu e abre esse modo para a ficha e forma ativas.

**Racional:** torna o destino realmente independente da edição, conforme solicitado, sem exigir uma nova dependência de roteamento.

**Alternativa considerada:** adicionar apenas mais uma aba ao `CharacterEditor`. Rejeitada porque continuaria subordinando ataques e modificadores ao fluxo de edição da ficha.

### 2. A área Ações terá três destinos internos exclusivos
Um componente de alto nível `ActionWorkspace` controlará uma aba ativa entre `attacks`, `techniques` e `modifiers`. Apenas o conteúdo da aba selecionada será renderizado; categorias não serão empilhadas verticalmente.

- **Ataques:** golpes conhecidos, agrupados por aquisição quando útil, com custo e nota.
- **Técnicas:** técnicas adquiridas que representam ações e suas configurações especiais.
- **Modificadores/Bônus:** modificadores customizados, presets e configuração de bônus que não representam golpes.

**Alternativa considerada:** manter um único scroll com âncoras. Rejeitada porque não resolve a percepção de “uma aba só”.

### 3. Classificação centralizada por origem e semântica
Funções tipadas derivarão as três coleções a partir de `getKnownStrikes(currentForm)` e `rollBonuses`. `sourceCatalogId === 'golpes'` não será mostrado como técnica/modificador acionável quando os golpes já o representam. Técnicas de catálogo serão diferenciadas de modificadores customizados/presets por identificadores e metadados existentes; qualquer lacuna será resolvida por helper explícito, sem inferência visual no JSX.

### 4. Editor mantém aquisição; workspace mantém configuração operacional
A aba “Técnicas” continuará apresentando busca, elegibilidade, custos de XP, aquisição repetível de Golpes e remoção de técnicas. Listas detalhadas de golpes conhecidos e controles de estoque, pacote, variante, preset e bônus customizado irão para “Ações”. Remover uma técnica continuará disponível no editor para preservar gestão da ficha.

### 5. Handlers e persistência continuam sob a composição atual
O workspace receberá contratos tipados de dados e callbacks. O estado persistido continuará sendo atualizado pelos handlers existentes em `App`; estados temporários de jogo não serão copiados para o workspace.

## Risks / Trade-offs

- [Risk] A fronteira entre técnica adquirida e modificador customizado pode não estar expressa em dados antigos. → Criar classificação conservadora, manter fallback visível em Modificadores/Bônus e cobrir entradas legadas.
- [Risk] Mover controles especiais pode dificultar sua descoberta. → Mostrar contagens nas abas e chamada “Gerenciar em Ações” após aquisição.
- [Risk] Um terceiro modo aumenta o estado de navegação. → Centralizar o tipo do modo e disponibilizar retornos claros para Jogar e Editar.
- [Risk] Remover conteúdo do editor pode quebrar handlers. → Extrair os controles antes de removê-los, reutilizando os mesmos callbacks e validando persistência.

## Migration Plan

1. Introduzir tipos, helpers e `ActionWorkspace` sem remover o conteúdo legado.
2. Adicionar navegação e validar as três coleções com dados existentes.
3. Transferir controles do editor para o workspace e manter aquisição/remoção no editor.
4. Validar build, fichas antigas e fluxos especiais.
5. Em rollback, remover o modo `actions` e restaurar os controles no editor; nenhum dado precisa ser migrado.
