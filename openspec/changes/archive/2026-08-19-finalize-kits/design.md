## Context

Hoje os kits são carregados principalmente de `src/kitsData.ts` e tratados como um catálogo relativamente direto de poderes. Há suporte funcional para custo base do kit, uso de poderes, buffs temporários e alguns efeitos derivados por parsing do texto, mas o modelo ainda é mais implícito do que o de arquétipos. Após a finalização dos arquétipos, o próximo passo natural é aplicar a mesma disciplina aos kits: explicitar escolhas, grants, automações possíveis, limitações do motor e disclosure manual.

Restrições importantes:
- preservar saves existentes e personagens sem kit
- não adicionar dependências de produção
- reaproveitar o motor atual de `RollBonus`, efeitos ativos, uso por cena/sessão e UI de detalhe
- evitar prometer automação para efeitos que dependem de alvo, cena, estado narrativo ou subsistemas ausentes

## Goals / Non-Goals

**Goals:**
- Tornar kits uma camada estruturada e auditável no mesmo padrão dos arquétipos
- Reduzir parsing implícito de texto para efeitos de kit quando possível
- Representar claramente o que é automático, delimitado e manual
- Permitir escolhas internas de kit quando existirem no material implementado
- Mostrar pacote passivo e poderes do kit de forma consistente na UI
- Garantir convivência estável entre custo, buffs e efeitos de arquétipo + kit

**Non-Goals:**
- Reescrever completamente o catálogo de kits se a estrutura atual puder ser estendida incrementalmente
- Criar um subsistema novo para todos os estados de combate, alvo, distância ou controle de condições
- Automatizar efeitos que dependam fortemente de narrador, contexto ou regras ainda não modeladas

## Decisions

1. **Evolução incremental do modelo de kit**
   - Em vez de substituir `src/kitsData.ts` por completo, vamos estender `CharacterKit` e `KitPower` com metadados opcionais no estilo dos arquétipos.
   - Isso preserva compatibilidade e reduz risco de quebra.

2. **Escolhas internas persistidas separadamente**
   - Se kits tiverem escolhas internas, elas serão persistidas separadamente no form atual, de forma análoga a `archetypeSelections`, para não confundir picks livres com grants/seleções do kit.
   - Alternativa rejeitada: inferir escolhas por presença de bônus/poderes na ficha, pois isso mistura origem e fragiliza migração/edição.

3. **Efeitos bounded no motor atual**
   - Efeitos de kit automatizáveis continuarão integrados ao motor atual de bônus, uso por cena/sessão e buffs ativos.
   - Efeitos que exigem alvo externo, múltiplos estados ou semântica fora do motor serão explicitamente marcados como manual/narrador-handled.

4. **Disclosure explícito na UI**
   - Editor e play mode devem indicar poderes passivos, ativáveis, escolhidos e efeitos manuais do kit.
   - Alternativa rejeitada: deixar notas apenas no catálogo textual, pois isso esconde o limite de automação no fluxo real de uso.

5. **Interoperabilidade explícita com arquétipos**
   - Kits e arquétipos devem coexistir como camadas paralelas, cada uma com custo, grants e efeitos próprios.
   - Sempre que houver ambiguidade, custo e grants devem continuar separados para evitar dupla cobrança ou mistura de origem.

## Risks / Trade-offs

- **[Risco] Alguns kits podem depender de texto livre difícil de estruturar** → Mitigação: modelar primeiro o que é inequívoco e marcar o restante como manual.
- **[Risco] A UI de jogo ficar poluída com muitos poderes/estados** → Mitigação: reutilizar badges, modais de detalhe e agrupamento compacto.
- **[Risco] Migração conflitar com saves antigos** → Mitigação: usar campos opcionais e defaults seguros.
- **[Risco] Parsing implícito continuar convivendo com metadados novos** → Mitigação: dar precedência aos metadados explícitos quando existirem.

## Migration Plan

1. Estender tipos de kit com campos opcionais e defaults compatíveis.
2. Adaptar migração/carregamento sem invalidar saves existentes.
3. Aplicar UI incremental para escolhas, grants e disclosure manual.
4. Validar custo, buffs, usos e integração com arquétipos.
5. Sincronizar a spec principal de kits e arquivar a change após implementação.

## Open Questions

- Quais kits do catálogo atual realmente exigem escolhas internas formais?
- Há poderes de kit que devem virar grants passivos distintos de `powers`?
- Vale criar uma camada `unsupportedNotes` também em `CharacterKit`/`KitPower`, ou basta manter no nível do kit?
