## Context

Hoje a edição de vantagens e desvantagens já possui algum nível de busca, mas a experiência ainda mistura conjuntos diferentes e não trata técnicas como um catálogo estruturado com requisitos verificáveis. O app também já suporta parcialmente créditos de XP para técnicas, porém esse suporte ainda depende de preenchimento manual de metadados na técnica editada. A mudança desejada é tratar a escolha nas abas como parte da própria regra: se a técnica exige Magia e Mística, a UX deve refletir isso imediatamente; se uma vantagem como Grimório financia a técnica, isso deve ser selecionável e visível no fluxo natural.

## Goals / Non-Goals

**Goals:**
- Separar vantagens de desvantagens com UX clara e consistente
- Ter filtros em todas as listas relevantes de escolha
- Estruturar um catálogo de técnicas com requisitos e custo em XP
- Filtrar técnicas por elegibilidade do personagem
- Destacar técnicas de uso comum/universal
- Integrar crédito de XP ao fluxo de seleção de técnicas sem configuração manual escondida

**Non-Goals:**
- Implementar toda a biblioteca completa de técnicas do livro de uma vez, se o catálogo puder crescer incrementalmente
- Automatizar narrativa de mestre para aprender técnica; o foco é gating estrutural e custo
- Reescrever o editor inteiro fora do escopo das abas afetadas

## Decisions

1. **Catálogo estruturado de técnicas**
   - Criar uma fonte estruturada para técnicas selecionáveis, com campos como nome, categoria XP, custo XP, requisitos e marcação de técnica universal.
   - Alternativa rejeitada: continuar tratando técnicas apenas como bônus livres editáveis, pois isso impede gating consistente.

2. **Elegibilidade derivada do personagem atual**
   - A filtragem de técnicas será derivada do estado atual da forma/personagem, considerando vantagens, perícias e outros requisitos modelados.
   - Técnicas incompatíveis podem ser ocultadas ou marcadas como indisponíveis, mas a experiência deve privilegiar mostrar primeiro o que é elegível.

3. **Integração explícita com créditos de XP**
   - Quando a técnica tiver custo em XP, a UI oferecerá fontes de crédito compatíveis já presentes no personagem.
   - Alternativa rejeitada: continuar pedindo IDs manuais de funding.

4. **Filtros consistentes por aba**
   - Cada aba relevante terá busca/filtro local coerente com seu domínio, em vez de depender de um único campo reaproveitado de modo inconsistente.

## Risks / Trade-offs

- **[Risco] Catálogo inicial de técnicas incompleto gerar percepção inconsistente** → Mitigação: marcar claramente técnicas universais e crescer o catálogo por lotes bem definidos.
- **[Risco] Requisitos de técnicas serem mais complexos do que as regras hoje modeladas** → Mitigação: suportar primeiro requisitos simples e frequentes (vantagens, perícias, categorias), com notas para casos manuais.
- **[Risco] UX ficar carregada demais** → Mitigação: filtros compactos, badges de elegibilidade e seções separadas.

## Migration Plan

1. Criar modelo estruturado de técnica.
2. Integrar o catálogo ao editor sem remover imediatamente a técnica custom.
3. Adicionar filtro/gating e estados visuais de elegibilidade.
4. Conectar seleção de crédito XP ao fluxo da técnica.
5. Validar cálculo de pontos/XP e publicar.
