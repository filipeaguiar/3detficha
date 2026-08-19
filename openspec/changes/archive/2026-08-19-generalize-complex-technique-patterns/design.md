## Context

A evolução recente do app já introduziu três padrões importantes: variantes cicláveis, ações imediatas e escolhas permanentes em técnicas repetíveis (Golpes). No entanto, a leitura do restante do livro mostra outras famílias recorrentes: técnicas que ficam armadas para uso posterior (como reações, estoques ou penalidades acionáveis), e técnicas que concedem um pacote temporário de regras ou vantagens parciais com automação incompleta. Em vez de continuar criando exceções, o modelo deve se organizar por padrões.

## Goals / Non-Goals

**Goals:**
- Formalizar uma taxonomia de padrões de técnica complexa reutilizáveis
- Permitir automação parcial sem esconder dependências narrativas
- Expandir a infraestrutura para efeitos persistentes assistidos
- Expandir a infraestrutura para pacotes temporários assistidos
- Criar base estável para novas técnicas sem reescrever a arquitetura a cada caso

**Non-Goals:**
- Automatizar todas as consequências narrativas do livro
- Implementar um simulador de turnos, alvos e estados completos de combate
- Resolver imediatamente todas as técnicas complexas existentes antes de validar os padrões com casos representativos

## Decisions

1. **Técnicas serão classificadas por padrão de comportamento**
   - instant-roll-mod
   - variant-technique
   - immediate-action
   - persistent-assisted-effect
   - temporary-package-effect

2. **Automação segura, resolução declarada quando necessário**
   - O app automatiza custo, rolagem, estoque, contador e ativação quando seguro.
   - Condições dependentes de alvo, dano real, resistência externa, quebra narrativa ou decisões táticas permanecem explicitamente assistidas em mesa.

3. **Persistent-assisted-effect como novo bloco reutilizável**
   - Técnicas como Desprezo e Setas Infalíveis de Petrovna exigem estado persistente próprio, consumo parcial ou gatilho posterior.

4. **Temporary-package-effect como novo bloco reutilizável**
   - Técnicas como Área de Batalha e efeitos equivalentes exigem um pacote temporário de regras com partes automáveis e disclosure do restante.

5. **A UI deve distinguir claramente o que é automático do que é narrativo**
   - Badges, notas e descrições assistidas devem evitar falsa impressão de automação total.

## Risks / Trade-offs

- **Modelo genérico demais e abstrato** → mitigação: validar com técnicas reais representativas.
- **Explosão de estados transitórios no play mode** → mitigação: cada padrão precisa de estado simples e bem delimitado.
- **Usuário achar que faltou automação** → mitigação: disclosure explícito e UX guiada.

## Migration Plan

1. Introduzir tipos base dos novos padrões.
2. Adaptar a UI do play mode para persistent-assisted-effect.
3. Adaptar a UI para temporary-package-effect com disclosure parcial.
4. Validar com casos representativos em ordem incremental:
   - Desprezo
   - Setas Infalíveis de Petrovna
   - Rajada de Golpes
   - depois técnicas mais estruturais como Área de Batalha
