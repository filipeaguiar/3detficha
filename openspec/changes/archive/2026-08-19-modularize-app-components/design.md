## Context

A aplicação React está funcional, porém `src/App.tsx` reúne aproximadamente 3.500 linhas. O arquivo declara modelos, presets, ícones SVG, carregamento e migração de `localStorage`, regras de cálculo e rolagem, integração com DiceBox, handlers e toda a árvore JSX dos modos de edição e jogo e de seus modais. Já existem módulos separados para catálogos, som e recorte de imagem, mas o restante não possui fronteiras explícitas.

A refatoração deve preservar o formato dos dados salvos e o comportamento visual e funcional. O projeto utiliza React 19, TypeScript e Vite, sem biblioteca de estado global ou suíte de testes automatizada; portanto, `npm run lint` e `npm run build` são os controles automáticos disponíveis, complementados por verificação manual dos fluxos principais.

## Goals / Non-Goals

**Goals:**

- Transformar `App.tsx` em um compositor de alto nível, removendo detalhes de apresentação e dados estáticos.
- Organizar componentes por domínio: edição da ficha, modo de jogo, navegação/drawer, modais e elementos compartilhados.
- Centralizar tipos, presets, ícones e funções puras em módulos com responsabilidade única.
- Extrair hooks para persistência/gerenciamento de fichas e para lógica com efeitos quando houver uma interface coesa.
- Manter contratos de props tipados e fluxo de dados explícito.
- Preservar layout, regras de jogo, integração com DiceBox e armazenamento existente.

**Non-Goals:**

- Redesenhar a interface ou alterar estilos visuais.
- Alterar cálculos, catálogos, regras de bônus, custos ou rolagens.
- Alterar chaves ou schema persistido no `localStorage`.
- Adotar gerenciador de estado externo, roteador, biblioteca de componentes ou nova dependência.
- Implementar novas funcionalidades ou uma reescrita completa do app.

## Decisions

### 1. Organização por domínio com uma camada compartilhada

Os novos componentes serão agrupados em diretórios como `components/editor`, `components/play`, `components/modals` e `components/common`. Tipos, constantes e funções puras ficarão em `types`, `constants` e `utils`; hooks coesos ficarão em `hooks`.

Essa organização aproxima arquivos que mudam pelo mesmo motivo e evita um diretório plano com dezenas de componentes. A alternativa de separar apenas por tipo técnico (`buttons`, `cards`, `panels`) foi descartada porque não representa as áreas funcionais da aplicação.

### 2. Extração incremental, começando por código sem estado

A implementação extrairá primeiro tipos, presets, ícones, utilitários e componentes puramente apresentacionais; depois, painéis e modais; por último, hooks e coordenação de estado. A cada grupo será executado lint/build.

Essa sequência reduz o risco de uma grande alteração simultânea. Uma reescrita integral foi descartada por dificultar a comparação comportamental e o rollback.

### 3. Estado elevado somente até o ancestral comum necessário

`App` manterá a seleção do modo e a composição geral. Estado e efeitos compartilhados entre várias áreas poderão permanecer em um hook controlador, enquanto estados exclusivos de um modal ou painel serão mantidos próximos desse componente. Componentes filhos receberão valores e callbacks por props tipadas; não será introduzido Context ou store global sem necessidade demonstrada.

Isso mantém dependências visíveis e evita uma mudança arquitetural adicional. A alternativa de criar um único contexto global apenas deslocaria o monólito para um provider e aumentaria o acoplamento implícito.

### 4. Regras puras separadas da apresentação e efeitos encapsulados

Normalização, cálculos derivados, interpretação de modificadores e formatação serão funções puras quando possível. Persistência de fichas, inicialização do DiceBox e execução de rolagens permanecerão atrás de hooks ou interfaces específicas, sem modificar suas regras observáveis.

A separação permite revisão e futura cobertura unitária sem misturar JSX com integração externa. Não será forçada a extração de funções que dependam intensamente de estado caso isso produza uma API maior e menos clara que o código original.

### 5. Compatibilidade antes de otimizações

As classes CSS, IDs necessários ao DiceBox, ordem dos efeitos, textos, handlers e chaves de armazenamento serão preservados. Os componentes continuarão usando `src/App.css` nesta mudança; modularização de CSS fica fora do escopo.

Mover simultaneamente JSX e estilos elevaria o risco de regressão visual e ampliaria o escopo sem ser necessário para reduzir `App.tsx`.

## Risks / Trade-offs

- **[Muitas props entre componentes]** → Agrupar props por interfaces de domínio somente quando isso melhorar legibilidade; manter callbacks explícitos e evitar objetos genéricos de estado.
- **[Regressões causadas ao mover closures e efeitos]** → Extrair incrementalmente, preservar dependências de hooks e validar build/lint e fluxos manuais após cada etapa.
- **[Dependências circulares entre tipos, hooks e componentes]** → Manter tipos e utilitários em módulos de baixo nível que não importam componentes; domínios podem importar apenas essas camadas compartilhadas.
- **[Fragmentação excessiva]** → Extrair unidades com responsabilidade nomeável e reutilização ou complexidade próprias, evitando componentes que apenas encapsulam poucas linhas sem significado.
- **[Ausência de testes automatizados]** → Usar funções puras para regras extraídas, executar verificações existentes e aplicar um checklist manual de edição, persistência, troca de ficha, recursos, bônus, rolagem, transformações e modais.
- **[Refatoração parcial ainda deixa App grande]** → Definir como critério que o JSX detalhado e os grandes blocos estáticos não permaneçam em `App.tsx`, aceitando que alguma orquestração compartilhada continue no componente raiz.

## Migration Plan

1. Registrar o comportamento atual com lint/build e identificar eventuais falhas preexistentes.
2. Extrair modelos, constantes, ícones e utilitários puros, atualizando imports sem mudar chamadas.
3. Extrair componentes compartilhados e seções de edição/jogo com props tipadas.
4. Extrair drawer e modais, mantendo sua montagem e transições atuais.
5. Encapsular persistência e lógica complexa em hooks onde houver fronteira coesa.
6. Reduzir `App.tsx` à composição dos módulos e executar lint/build e checklist funcional.

O rollback pode ser realizado por etapa, pois não há migração de dados nem mudança de dependências. Dados salvos permanecem compatíveis com a versão anterior.

## Open Questions

Nenhuma questão bloqueante. A granularidade final dos componentes será ajustada durante a extração para evitar tanto componentes excessivamente grandes quanto fragmentação artificial.
