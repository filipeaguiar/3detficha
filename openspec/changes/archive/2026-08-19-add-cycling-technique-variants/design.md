## Context

Raio Místico e Barreira Mística têm uma propriedade importante: são adquiridas uma única vez, mas no uso podem assumir um modo base ou um entre vários aprimoramentos opcionais com custo adicional. O efeito exato usado em cada ativação é muitas vezes um acordo de mesa, comunicado ao mestre em âmbito de metagame, e não precisa ser completamente simulado pelo app. Ainda assim, a interface de jogo deve dar suporte explícito a esse padrão, inclusive ajustando o custo atual da técnica de acordo com a variante escolhida.

## Goals / Non-Goals

**Goals:**
- Permitir variantes internas de uso em técnicas adquiridas uma única vez
- Dar suporte de UI no modo de jogo para ciclar variantes
- Refletir corretamente o custo em PM da variante atual
- Aplicar o padrão primeiro a Raio Místico e Barreira Mística
- Mostrar claramente que o efeito específico é declarado na mesa quando apropriado

**Non-Goals:**
- Automatizar integralmente os efeitos narrativos de cada variante
- Resolver de uma vez todos os tipos de técnica de múltiplos modos do livro
- Reestruturar todas as técnicas já catalogadas antes de validar o padrão com os dois primeiros casos

## Decisions

1. **Aquisição única, uso variável**
   - A técnica continua sendo uma única entrada adquirida na ficha.
   - As variantes são modos de uso temporários, não novas técnicas compradas.

2. **Estado da variante no bônus/técnica da ficha**
   - A variante ativa precisa ficar representada de forma serializável na própria técnica da forma, para que a UI de jogo saiba qual modo está selecionado.

3. **Ciclo simples no modo de jogo**
   - A UI inicial usará um botão/controle de ciclo entre variantes disponíveis, em vez de um modal complexo.

4. **Metagame declarado, não totalmente automatizado**
   - O app exibirá o modo selecionado e custo correspondente, mas não tentará resolver sozinho todos os impactos narrativos ou táticos da variante.

## Risks / Trade-offs

- **[Risco] O modelo inicial ficar específico demais para Raio Místico/Barreira Mística** → Mitigação: nomear os campos como variantes internas genéricas de técnica.
- **[Risco] Confusão entre técnica adquirida e modo ativo** → Mitigação: exibir claramente técnica base e variante atual.
- **[Risco] Futuras técnicas com múltiplos modos exigirem UI diferente** → Mitigação: começar com ciclo simples, mas manter o modelo extensível.

## Migration Plan

1. Estender o modelo de técnica para variantes internas.
2. Atualizar catálogo de Raio Místico e Barreira Mística.
3. Adaptar play mode para ciclo de variantes e custo dinâmico.
4. Validar persistência, custo e comportamento de ativação.
