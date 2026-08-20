## Context

A ficha possui três fontes de regras que hoje convergem apenas parcialmente: vantagens armazenadas como identificadores, técnicas armazenadas como `RollBonus` e presets legados também armazenados como `RollBonus`. O cálculo em `App.tsx` recebe uma lista plana de bônus ativos; embora Ganho, Perda e críticos sejam calculados corretamente quando os dados chegam corretos, faltam contexto, condição, atributo, momento de cobrança e origem canônica.

A auditoria encontrou ainda quatro classes de ciclo de vida: ação instantânea resolvida em rolagem, ativação de cena, estado persistente com disparo posterior e pacote temporário com manutenção. Variantes podem mudar não apenas custo e valor, mas também contexto, atributo, ação e nível de automação. Fichas existentes precisam continuar carregando sem duplicar custos ou efeitos.

## Goals / Non-Goals

**Goals:**

- Tornar aquisição de vantagem ou técnica a fonte canônica dos efeitos oficiais correspondentes.
- Resolver uma ação por um plano tipado e testável antes de rolar dados ou gastar recursos.
- Aplicar somente efeitos compatíveis com o contexto, atributo, condição e variante da ação.
- Separar escolha de variante, ativação, resolução, manutenção e encerramento.
- Automatizar integralmente efeitos determinísticos e representar explicitamente efeitos assistidos ou narrativos.
- Corrigir os casos encontrados na auditoria e validar as 59 vantagens e 51 técnicas.
- Migrar dados legados sem perda de modificadores personalizados.

**Non-Goals:**

- Criar um sistema tático de alvos, distâncias, mapa, iniciativa ou rodadas completas.
- Decidir automaticamente condições que dependem de ficção, posicionamento, tipo do alvo ou julgamento do narrador.
- Automatizar dano, resistência ou estados de personagens externos sem dados desses personagens.
- Alterar as regras oficiais para simplificar efeitos, salvo decisões de produto já explícitas para os botões de combate.

## Decisions

### 1. Resolver ações por um plano puro antes de executar efeitos

Será introduzido um resolvedor que recebe um `ActionRequest` (Ataque, Defesa, teste geral, ativação, disparo ou manutenção), a forma atual, fontes ativas e recursos disponíveis. Ele produz um `ResolvedActionPlan` com atributo efetivo, perícia, dados, crítico, bônus, custos discriminados, efeitos consumidos, efeitos preservados e pendências assistidas.

A UI e o DiceBox executarão o plano, em vez de recalcular partes das regras em callbacks diferentes. Isso permite validar a mesma regra sem renderizar React.

**Alternativa considerada:** continuar adicionando exceções em `handleRoll`. Rejeitada porque variantes mistas, efeitos persistentes e custos de cena já ultrapassaram o modelo de uma lista plana.

### 2. Usar metadados de efeito no nível da fonte e da variante

Vantagens, técnicas e variantes poderão declarar:

- `actionContext`: ataque, defesa, teste geral, ativação, disparo ou manutenção;
- `attributeFilter` e `replacementAttribute`;
- `skillMode`: perícia fixa, escolha assistida ou perícia de combate;
- `trigger` e `costTiming`;
- `automationLevel`: automático, assistido ou narrativo;
- efeitos determinísticos de dados, atributo, crítico e recursos;
- chave estável de efeito para deduplicação.

Metadados de variante sobrescrevem os da fonte. Isso é necessário para Monasticismo, Ninjutsu, Super-Movimento e outras técnicas cujos modos pertencem a contextos diferentes.

### 3. Derivar efeitos oficiais das aquisições

Vantagens oficiais serão resolvidas diretamente de `currentForm.advantages`, incluindo a variante e sua configuração permanente. Técnicas continuarão com uma instância persistida por aquisição porque possuem XP, escolhas, estoque e estado assistido.

Presets oficiais deixam de ser uma segunda aquisição manual. Modificadores personalizados continuam persistidos e disponíveis. Um preset legado reconhecido recebe origem e chave de efeito durante a normalização, para que o resolvedor elimine a duplicação com a vantagem adquirida.

### 4. Filtrar primeiro, acumular depois

O resolvedor seguirá a ordem:

1. coletar fontes candidatas;
2. resolver variante e contexto;
3. eliminar fontes incompatíveis;
4. resolver substituição de atributo e conflitos;
5. escolher perícia aplicável;
6. acumular Ganho/Perda, atributo e crítico;
7. consolidar custos sem duplicar componentes equivalentes;
8. validar recursos;
9. produzir consumo, persistência e pendências assistidas.

Substituições incompatíveis, como Preciso e Choque no mesmo ataque, bloqueiam a execução até o jogador escolher uma.

### 5. Tratar custo como componente identificado e temporal

Cada custo terá recurso, valor, momento e uma chave opcional. Custos com a mesma chave obrigatória não serão somados duas vezes. Isso corrige a defesa mágica base combinada com Barreira Mística.

Ativações e manutenções validarão recursos antes de alterar estado. Custos instantâneos serão pagos somente na resolução da ação correspondente; custos de cena serão pagos na ativação; custos persistentes serão separados entre preparo e disparo.

### 6. Separar seleção de variante de execução

A variante será escolhida por controle próprio. Clicar na ação executa ou ativa a variante já escolhida. Técnicas de cena não dependerão de uma rolagem posterior para pagar o custo, e ações imediatas como Absorver Mana poderão escolher qualquer variante antes da execução.

### 7. Modelar perícias de modo explícito

Ataque usa Luta quando aplicável. A opção de combate mágico usa Mística quando a fonte da ação permite magia. Testes de técnica usam a perícia declarada pela técnica, e testes gerais oferecem escolha assistida de perícia quando o app não puder inferi-la.

O benefício de perícia será sempre Ganho (`+1D`), nunca bônus fixo. Especializações como Maestria armazenarão a perícia escolhida e só modificarão testes compatíveis.

### 8. Automatizar o determinístico e registrar o restante

Efeitos como dados, faixa de crítico, atributo, recuperação própria e mudança de recurso serão automáticos quando todas as entradas forem locais. Efeitos sobre alvos, dano causado, posição, resistência externa ou passagem de rodada serão apresentados como passos assistidos, sem bônus aproximado.

Técnicas como Bomba Vital podem automatizar estoque, bônus do disparo, limiar de Ganho e zeragem de PM, mas continuam assistidas quanto a acumulação por rodada, doações e distribuição em área.

### 9. Validar catálogos com uma matriz de regras

Será mantida uma matriz auditável com uma linha por vantagem e técnica, incluindo suporte automático/assistido/narrativo, requisito, repetibilidade, contexto, custo, duração e casos de teste. Uma validação executável verificará identificadores, cobertura, variantes, especializações, efeitos obrigatórios e combinações críticas sem adicionar dependências externas.

## Risks / Trade-offs

- **[Risco] Migração pode duplicar efeitos em fichas com vantagem e preset oficial.** → Normalizar por chave estável de efeito, preservar o registro legado e suprimir apenas a duplicação mecânica/visual comprovada.
- **[Risco] Metadados muito genéricos podem virar uma linguagem de regras difícil de manter.** → Limitar o esquema a padrões observados no catálogo e manter resoluções excepcionais pequenas e tipadas.
- **[Risco] Automatizar contexto narrativo de forma indevida.** → Exigir `automationLevel` e usar assistido como padrão quando faltar informação local.
- **[Risco] Mudanças no custo alteram partidas em andamento.** → Não cobrar retroativamente; aplicar o novo ciclo somente na próxima ativação/resolução.
- **[Risco] Grande superfície de 110 entradas catalogadas.** → Implementar em lotes e bloquear conclusão com matriz de cobertura e cenários de regressão.
- **[Trade-off] O usuário ainda confirma efeitos sobre terceiros.** → Mantém o app sem estado global de combate e evita resultados falsos.

## Migration Plan

1. Adicionar os novos campos opcionais e o resolvedor sem remover o caminho legado.
2. Normalizar fontes oficiais e inferir chaves de efeitos conhecidos em fichas existentes.
3. Migrar Ataque/Defesa e testes gerais para o resolvedor, mantendo fallback para modificadores personalizados.
4. Migrar vantagens e técnicas em lotes, começando por custos, contextos e efeitos críticos auditados.
5. Remover o uso mecânico duplicado dos presets oficiais depois que a matriz de compatibilidade estiver completa.
6. Validar build, lint, dados salvos de versões anteriores e cenários tabelados antes do deploy.

Rollback: manter os campos novos opcionais e preservar os dados originais permite retornar temporariamente ao cálculo legado sem tornar fichas ilegíveis.

## Open Questions

- A defesa mágica simplificada continuará disponível para todo personagem com Magia e Mística, ou deverá exigir Barreira Mística? A implementação deve preservar inicialmente a decisão atual e deduplicar seu custo com Barreira.
- Efeitos de turno como Regeneração e Torcida usarão confirmação manual por rodada ou um contador leve de rodada futura?
- Presets oficiais legados devem permanecer visíveis como atalhos de compatibilidade durante uma versão ou ser ocultados imediatamente quando houver aquisição equivalente?
