## Context

Golpes não funciona como uma técnica linear. Cada compra concede dois golpes escolhidos de uma lista fixa, e compras adicionais ampliam o repertório. Combo, por sua vez, consome essa estrutura: só usa golpes, nunca outras técnicas ou vantagens, não pode repetir um golpe no mesmo combo e acontece por completo no mesmo turno. Isso exige distinguir aquisição da técnica-base, golpes conhecidos e fluxo temporário de combo.

## Goals / Non-Goals

**Goals:**
- Representar Golpes como técnica repetível com escolhas permanentes de golpes
- Exibir golpes conhecidos individualmente no modo de jogo
- Permitir que Combo opere apenas sobre golpes conhecidos
- Tratar Combo como fluxo transitório de turno único
- Automatizar somente o que cabe no motor atual, deixando o restante explícito em mesa

**Non-Goals:**
- Simular completamente a defesa do alvo dentro do fluxo de combo
- Implementar um sistema global de turnos
- Resolver toda técnica baseada em golpe do livro de uma vez
- Criar um subsistema universal de manobras marciais além do necessário para Golpes e Combo

## Decisions

1. **Golpes como técnica-base + subitens permanentes**
   - A aquisição registrada continua sendo a técnica Golpes.
   - Os golpes escolhidos são persistidos como subitens estruturados associados à técnica.

2. **Compras repetidas de Golpes devem ser suportadas**
   - O personagem pode ter múltiplas instâncias de Golpes ou uma estrutura equivalente que preserve quantas escolhas permanentes já ganhou.

3. **Golpes conhecidos aparecem como ações próprias no play mode**
   - O jogador não deve precisar abrir edição manual para lembrar ou reconstruir quais golpes possui.

4. **Combo é um fluxo transitório de turno único**
   - O app registra combo ativo, golpes já usados e extras restantes.
   - A resolução é encerrada dentro da mesma sequência de uso, sem persistência de longa duração.

5. **Automação parcial com disclosure**
   - Golpes com custo simples e efeito claro podem ajustar custo/indicador.
   - Efeitos mais dependentes de acerto, dano ou defesa perfeita podem permanecer com nota de resolução em mesa.

## Risks / Trade-offs

- **Repetição da técnica Golpes no modelo atual** pode conflitar com deduplicação implícita de técnicas → mitigação: permitir instâncias múltiplas por id de catálogo/base comum e ids únicos por aquisição.
- **Combo pode parecer mais automatizado do que realmente é** → mitigação: UI deve deixar claro o que é organizador de sequência vs. resolução pelo narrador.
- **Muitos golpes na interface de jogo** → mitigação: agrupar por técnica-base ou mostrar seção própria de golpes.

## Migration Plan

1. Introduzir catálogo estruturado de golpes.
2. Reestruturar técnica Golpes para registrar escolhas permanentes.
3. Exibir golpes conhecidos no play mode.
4. Implementar fluxo básico de Combo baseado na lista de golpes conhecidos.
5. Validar custos, limites e não repetição.
