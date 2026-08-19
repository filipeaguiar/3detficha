## Context

O app já possui infraestrutura para variantes cicláveis, ações imediatas, golpes estruturados, efeitos persistentes assistidos e pacotes temporários. O capítulo de Técnicas contém 45 entradas identificadas na referência; 27 já existem no catálogo, algumas apenas de forma aproximada, e 18 ainda precisam ser adicionadas. A implementação deve completar a cobertura sem criar sistema global de turnos, alvos ou combate e sem converter decisões narrativas em regras rígidas do app.

## Goals / Non-Goals

**Goals:**
- Cobrir todas as técnicas do capítulo no catálogo guiado
- Corrigir requisitos, custos e categorias das entradas existentes
- Finalizar controles de Área de Batalha, Setas e Desprezo
- Reutilizar os padrões estruturais atuais e estendê-los apenas quando necessário
- Expor claramente efeitos automáticos e resoluções de mesa

**Non-Goals:**
- Simular inimigos, mapas, obstáculos, turnos ou testes resistidos externos
- Aplicar efeitos diretamente à ficha de outros jogadores
- Automatizar escolhas narrativas, tipos de Ajudante, alvos ou consequências decididas pelo narrador

## Decisions

1. **Cobertura integral por catálogo declarativo**
   - Todas as técnicas do capítulo terão entrada com categoria, XP, exigências, custo, duração e texto assistido.
   - Técnicas já existentes serão corrigidas em vez de duplicadas.

2. **Requisitos estruturados ampliados**
   - O modelo aceitará mínimos de atributo e técnicas prévias, além de vantagens e perícias.
   - Alternativas serão representadas explicitamente quando a regra usar “ou”.

3. **Configuração persistente por instância**
   - Técnicas repetíveis ou configuráveis guardarão seleção própria por aquisição.
   - Área de Batalha poderá coexistir em múltiplas instâncias sem sobrescrever escolhas.

4. **Estado de jogo permanece transitório quando apropriado**
   - Estoque preparado, ativação e manutenção ficam no bônus adquirido, preservados pela ficha quando já fazem parte da configuração assistida.
   - Não haverá relógio de turnos; o usuário confirma manutenção, consumo e encerramento.

5. **Automação limitada ao conhecimento local**
   - Bônus, críticos, custos, dados, estoque e recursos próprios podem ser automatizados.
   - Resistência de alvo, dano sofrido, cenário, alcance narrativo, tipos de Ajudante e consequências externas recebem disclosure de mesa.

6. **Implementação em lotes de risco crescente**
   - Primeiro fidelidade das técnicas existentes e comuns simples.
   - Depois comuns persistentes/pacotes.
   - Por fim lendárias, em maioria assistidas devido aos efeitos amplos.

## Risks / Trade-offs

- **[Risco] Catálogo extenso aumentar a densidade da UI** → Mitigação: busca, categoria e disclosure compacto.
- **[Risco] Aproximações parecerem regras exatas** → Mitigação: badges automáticas/assistidas e notas completas.
- **[Risco] Estado antigo não possuir novos campos** → Mitigação: todos os campos são opcionais e têm defaults derivados.
- **[Risco] Técnicas repetíveis serem deduplicadas** → Mitigação: ids únicos por aquisição e configuração ligada à instância.

## Migration Plan

1. Ampliar tipos e helpers mantendo campos opcionais.
2. Corrigir e completar catálogo.
3. Adicionar configuração guiada e controles no play mode.
4. Validar lint/build e cenários de compatibilidade com fichas existentes.
5. Publicar incrementalmente; rollback por commit sem migração destrutiva.

## Open Questions

- Nenhuma bloqueante. Escolhas cujo texto da regra é aberto permanecem declaradas em mesa por design.
