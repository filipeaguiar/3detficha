# Suíte Extensiva de Testes de Personagens — 3DeT Vitória

Este documento contém a suíte completa de testes automatizáveis em formato de **Task List Rigorosa**. Cada teste especifica formalmente a **Pré-condição**, o **Passo a Passo de Ação**, o **Resultado Esperado Exato (Fórmulas, Recursos e DOM)** e os **Critérios de Falha**.

---

## 📊 Matriz de Referência das Fichas

| Personagem | Kit | Arquétipo | Forma | Atributos | Recursos Máximos | Vantagens | Perícias | Desvantagens |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Fran** | Druida | Humano | **Forma Normal** | P1, H3, R2 | PV: 10, PM: 15, PA: 1 | Magia, Ajudante (Especialista), Transformação (1pt) | Animais, Saber | Código Dahllan, Fraqueza leve |
| **Fran** | Druida | Humano | **Forma Planta** | P3, H2, R4 | PV: 20, PM: 10, PA: 3 | Transformação (1pt) *(+ Forma Selvagem: Ágil, Forte)* | Animais, Luta | Código Dahllan, Fraqueza leve |
| **Baku** | Guerreiro | Humano | **Forma Normal** | P3, H2, R2 | PV: 10, PM: 10, PA: 3 | Acumulador, Ataque Especial (Potente) | Luta | Código Heroico, Antipático |

---

## 📋 TASK LIST DE TESTES

---

### 🌿 PARTE 1: Ficha da Fran (Druida / Humano / Múltiplas Formas)

#### 1.1 Forma Normal — Base e Recursos
- [ ] **TEST-FRAN-01: Verificação de Atributos e Cálculos de Recursos Iniciais**
  - **Pré-condição:** Ficha de Fran carregada e ativa na *Forma Normal*.
  - **Ação:** Inspecionar a barra superior de status e os cards de atributos.
  - **Resultado Esperado Exato:**
    - `Poder` = `1`
    - `Habilidade` = `3`
    - `Resistência` = `2`
    - `PV Máximo` = `10` (Fórmula: $R \times 5 = 2 \times 5 = 10$)
    - `PM Máximo` = `15` (Fórmula: $H \times 5 = 3 \times 5 = 15$)
    - `PA Máximo` = `1` (Fórmula: $\max(1, P) = 1$)
    - `Kit` = "Druida"
    - `Arquétipo` = "Humano"
  - **Critério de Falha:** Qualquer atributo divergente de P1, H3, R2 ou cálculo de PV/PM/PA incorreto.

- [ ] **TEST-FRAN-02: Teste Geral de Perícia Fora de Combate (Saber)**
  - **Pré-condição:** Fran na Forma Normal com PM = 15.
  - **Ação:** Clicar no botão "OUTROS TESTES" no cabeçalho fixo e clicar no card de rolagem de Habilidade (H3 + Saber).
  - **Resultado Esperado Exato:**
    - Quantidade de dados rolados: `2D` (1D base + 1D Ganho de Saber).
    - Atributo somado: `+3` (Habilidade).
    - Custo de PM: `0 PM` (PM permanece `15 / 15`).
    - Modal de resultado exibe: `Total = [d1 + d2] + 3(H)`.
    - Se qualquer dado for 6: ativa acerto crítico somando $+3$ extra por 6 obtido.
  - **Critério de Falha:** Cobrança indevida de PM, rolagem de apenas 1D (sem Ganho) ou atributo diferente de Habilidade.

- [ ] **TEST-FRAN-03: Defesa Básica e Dedução de Pontos de Vida (PV)**
  - **Pré-condição:** Fran na Forma Normal com PV = 10.
  - **Ação:**
    1. Clicar no botão "Rolar Defesa".
    2. Clicar na barra verde de PV para simular dano recebido e subtrair 4 PV.
  - **Resultado Esperado Exato:**
    - Rolagem de Defesa: `1D + 2(R)`.
    - Barra de PV atualiza visualmente de `10 / 10` para `6 / 10`.
    - O valor de PV no `localStorage` sob `3det_character_list` é atualizado para `6`.
  - **Critério de Falha:** PV não diminuir, valor não persistir ou animação de pulso falhar.

- [ ] **TEST-FRAN-04: Poder do Kit Druida — "Dádiva da Natureza" (1/Cena)**
  - **Pré-condição:** Poder `Dádiva da natureza` está no estado inicial "Disponível (1/1 Cena)".
  - **Ação:**
    1. Clicar no botão `Dádiva da natureza 1/1 Cena` no topo da tela.
    2. Inspecionar o botão após o clique.
  - **Resultado Esperado Exato:**
    - O botão passa a exibir `ATIVO` com ícone de check (`✓`).
    - Permite usar a perícia Animais em substituição a qualquer outra perícia na cena.
    - Custo inicial: `0 PM`.
    - Ao tentar acionar novamente na mesma cena: exibe custo de `-3 PM`.
  - **Critério de Falha:** Poder não transicionar para estado ativo ou não habilitar a regra de substituição de perícia.

- [ ] **TEST-FRAN-05: Traço de Arquétipo Humano — "Mais Além" (Gasto de 2 PM)**
  - **Pré-condição:** Fran na Forma Normal com PM = 15.
  - **Ação:**
    1. Clicar no card de técnica `Mais Além` (+1D Ganho).
    2. Verificar se o card ficou com a classe `.active`.
    3. Clicar em "Rolar Ataque".
  - **Resultado Esperado Exato:**
    - Custo deduzido da barra de PM: `-2 PM` (PM passa de `15` para `13`).
    - Rolagem de ataque inclui `+1D` (Ganho).
    - Modal de resultado exibe o dado extra e a técnica "Mais Além" na lista de técnicas aplicadas.
  - **Critério de Falha:** PM não deduzir 2 pontos ou o dado extra não ser somado na rolagem.

---

#### 1.2 Mecânica de Transformação (Forma Normal ➔ Forma Planta)
- [ ] **TEST-FRAN-06: Troca de Forma para Forma Planta**
  - **Pré-condição:** Fran ativa na Forma Normal.
  - **Ação:** Abrir o menu do personagem (ou modal de formas) e selecionar "Forma Planta".
  - **Resultado Esperado Exato:**
    - Nome da forma ativa atualiza para "Forma Planta".
    - Atributos recalculados instantaneamente:
      - `Poder` = `3`
      - `Habilidade` = `2`
      - `Resistência` = `4`
    - Limites Máximos recalculados:
      - `PV Máximo` = `20` (Fórmula: $4 \times 5 = 20$)
      - `PM Máximo` = `10` (Fórmula: $2 \times 5 = 10$)
      - `PA Máximo` = `3` (Fórmula: $P = 3$)
    - Lista de Perícias da Forma Planta exibida na gaveta de Personagem: `Animais`, `Luta`.
    - Desvantagens ativas: `Código Dahllan`, `Fraqueza leve`.
  - **Critério de Falha:** Manter atributos de P1/H3/R2 ou não atualizar PV/PM máximo para 20/10.

- [ ] **TEST-FRAN-07: Vantagens Gratuitas da Forma Selvagem do Druida (Ágil e Forte)**
  - **Pré-condição:** Fran ativa na Forma Planta.
  - **Ação:** Inspecionar o botão de status "Vantagens Fera 2/2" no cabeçalho.
  - **Resultado Esperado Exato:**
    - As vantagens `Ágil` (+2 em H para agilidade) e `Forte` (+2 em P para esforço físico / P+1 no combate) estão ativas e vinculadas à Forma Planta.
    - O card de teste de Poder exibe o bônus de `Forte` quando aplicável.
  - **Critério de Falha:** Vantagens Fera não aparecerem ou exigirem pagamento de pontos de personagem extras.

- [ ] **TEST-FRAN-08: Ataque Físico na Forma Planta (Poder 3 + Luta)**
  - **Pré-condição:** Fran ativa na Forma Planta com PM = 10.
  - **Ação:** Clicar no botão "Rolar Ataque".
  - **Resultado Esperado Exato:**
    - Atributo de ataque: `Poder` (Valor base = 3 + 1 de Forte = 4 efetivo).
    - Quantidade de dados: `2D` (1D base + 1D Ganho da Perícia Luta).
    - Custo de PM: `0 PM`.
    - Total gerado no modal: `[d1 + d2] + 4(P) = Total`.
  - **Critério de Falha:** Usar Habilidade em vez de Poder, ou rolar apenas 1D sem a perícia Luta.

- [ ] **TEST-FRAN-09: Defesa Elevada na Forma Planta (Resistência 4)**
  - **Pré-condição:** Fran ativa na Forma Planta.
  - **Ação:** Clicar no botão "Rolar Defesa".
  - **Resultado Esperado Exato:**
    - Rolagem calculada com `Resistência 4`: `1D + 4(R)`.
    - Em caso de dado 6: acerto crítico adiciona $+4$ (Total: $6 + 4 + 4 = 14$).
  - **Critério de Falha:** Defesa somar valor diferente de 4 ou não multiplicar o atributo base no crítico.

- [ ] **TEST-FRAN-10: Reversão para Forma Normal e Isolamento de Estados**
  - **Pré-condição:** Fran na Forma Planta.
  - **Ação:** Alternar de volta para a "Forma Normal".
  - **Resultado Esperado Exato:**
    - Atributos retornam para `P1, H3, R2`.
    - Perícias retornam para `Animais, Saber` (a perícia `Luta` não deve constar na Forma Normal).
    - Vantagens retornam para `Magia, Ajudante, Transformação` (as vantagens de Forma Selvagem `Ágil, Forte` são desativadas).
  - **Critério de Falha:** Vazamento de perícias ou atributos entre as formas.

---

### ⚔️ PARTE 2: Ficha do Baku (Guerreiro / Humano / Especialista em Combate)

#### 2.1 Atributos e Combate Base
- [ ] **TEST-BAKU-01: Verificação de Atributos e Recursos Iniciais**
  - **Pré-condição:** Ficha de Baku selecionada e ativa.
  - **Ação:** Inspecionar os valores no cabeçalho e na gaveta de Personagem.
  - **Resultado Esperado Exato:**
    - `Poder` = `3`
    - `Habilidade` = `2`
    - `Resistência` = `2`
    - `PV Máximo` = `10` ($2 \times 5$)
    - `PM Máximo` = `10` ($2 \times 5$)
    - `PA Máximo` = `3` ($P = 3$)
    - `Kit` = "Guerreiro"
    - `Perícias` = `Luta`
    - `Vantagens` = `Acumulador`, `Ataque Especial (Potente)`
    - `Desvantagens` = `Código Heroico`, `Antipático`
  - **Critério de Falha:** Qualquer valor divergente da matriz de Baku.

- [ ] **TEST-BAKU-02: Ataque Básico com Perícia Luta**
  - **Pré-condição:** Baku com PM = 10, sem técnicas ativadas.
  - **Ação:** Clicar no botão "Rolar Ataque".
  - **Resultado Esperado Exato:**
    - Atributo utilizado: `Poder 3`.
    - Quantidade de dados: `2D` (1D base + 1D Ganho de Luta).
    - Custo: `0 PM` (PM permanece `10 / 10`).
    - Fórmula do resultado: `[d1 + d2] + 3(P)`.
  - **Critério de Falha:** Cobrança de PM ou quantidade de dados diferente de 2D.

---

#### 2.2 Técnicas, Modificadores e Poderes de Kit
- [ ] **TEST-BAKU-03: Ataque Especial Potente (P+2 / Custo: 1 PM)**
  - **Pré-condição:** Baku com PM = 10.
  - **Ação:**
    1. Clicar no card de técnica `Ataque Especial (Potente)`.
    2. Verificar o botão "Rolar Ataque".
    3. Clicar em "Rolar Ataque".
  - **Resultado Esperado Exato:**
    - O botão de Ataque exibe o indicador visual de custo: `1 PM` (com barra segmentada branca no canto inferior direito).
    - Poder Efetivo no Ataque: `5` (Fórmula: $P3 \text{ base} + 2 \text{ Potente} = 5$).
    - Ao rolar: PM atual reduz de `10` para `9`.
    - Modal de resultado exibe: `Poder 3(+2)` e total `[d1 + d2] + 5`.
  - **Critério de Falha:** Poder efetivo diferente de 5 ou PM não deduzir 1 ponto.

- [ ] **TEST-BAKU-04: Combo Ataque Especial Potente + Mais Além (Custo: 3 PM)**
  - **Pré-condição:** Baku com PM = 9.
  - **Ação:**
    1. Ativar `Ataque Especial (Potente)` (+2 P, 1 PM).
    2. Ativar `Mais Além` (+1D Ganho, 2 PM).
    3. Clicar em "Rolar Ataque".
  - **Resultado Esperado Exato:**
    - Custo total combinado exibido no botão: `3 PM` ($1 + 2 = 3$).
    - Quantidade total de dados: `3D` (1D base + 1D Luta + 1D Mais Além).
    - Poder efetivo: `5` ($3 + 2$).
    - Ao rolar: PM atual reduz de `9` para `6`.
    - Modal discrimina as duas técnicas na lista de bônus ativos.
  - **Critério de Falha:** Custo total diferente de 3 PM ou quantidade de dados diferente de 3D.

- [ ] **TEST-BAKU-05: Poder do Kit Guerreiro — "Lutar é tudo!" (Gasto de 2 PM)**
  - **Pré-condição:** Baku com PM = 6.
  - **Ação:**
    1. Clicar no botão `Lutar é tudo! Quando -2PM` no topo.
    2. Rolar teste de Luta em combate ou perícia.
  - **Resultado Esperado Exato:**
    - O poder debita `-2 PM` (PM passa de `6` para `4`).
    - Adiciona `+3` ao total final do resultado após a rolagem.
  - **Critério de Falha:** Não somar +3 ao total ou não debitar os 2 PM.

- [ ] **TEST-BAKU-06: Poder do Kit Guerreiro — "Manobra Especial" (Isenção de PM)**
  - **Pré-condição:** Baku com PM = 4. O poder `Manobra especial` está no estado "1/1 Cena".
  - **Ação:**
    1. Clicar no botão `Manobra especial 1/1 Cena`.
    2. Ativar `Ataque Especial (Potente)`.
    3. Clicar em "Rolar Ataque".
  - **Resultado Esperado Exato:**
    - O Ataque Especial é executado com bônus de $P+2$ (Poder 5).
    - Custo de PM cobrado: `0 PM` (PM permanece `4 / 10`).
    - O botão `Manobra especial` passa para o estado "Usado".
  - **Critério de Falha:** Cobrar 1 PM pelo Ataque Especial após acionar Manobra Especial.

- [ ] **TEST-BAKU-07: Defesa e Absorção de Dano de Baku**
  - **Pré-condição:** Baku com Resistência = 2.
  - **Ação:** Clicar no botão "Rolar Defesa".
  - **Resultado Esperado Exato:**
    - Rolagem: `1D + 2(R)`.
    - Se dado = 6 (Crítico): total = $6 + 2(\text{base}) + 2(\text{crítico}) = 10$.
  - **Critério de Falha:** Fórmulas de defesa ou de crítico incorretas.

- [ ] **TEST-BAKU-08: Rastreamento da Desvantagem "Antipático"**
  - **Pré-condição:** Baku na tela de jogo.
  - **Ação:**
    1. Abrir a gaveta "OUTROS TESTES".
    2. Clicar no teste de Poder para simular interação social.
  - **Resultado Esperado Exato:**
    - A desvantagem Antipático impõe Perda em testes sociais de Poder.
    - Não permite gerar acertos críticos em interações sociais.
  - **Critério de Falha:** Permitir acerto crítico social com a desvantagem ativa.

---

### 🔄 PARTE 3: Descansos, Cenas, Persistência e UI

- [ ] **TEST-GLOBAL-01: Descanso Rápido (Fôlego / Pausa Curta)**
  - **Pré-condição:** Baku com PV = 4/10 e PM = 2/10 (Resistência = 2, Habilidade = 2).
  - **Ação:** Abrir o menu do personagem e clicar em "Descanso Rápido".
  - **Resultado Esperado Exato:**
    - Recupera $+R$ em PV: $+2 \text{ PV} \rightarrow \mathbf{6 / 10}$.
    - Recupera $+H$ em PM: $+2 \text{ PM} \rightarrow \mathbf{4 / 10}$.
  - **Critério de Falha:** Valores recuperados divergentes de $+R$ e $+H$ ou exceder o limite máximo.

- [ ] **TEST-GLOBAL-02: Descanso Completo (Dormir / 8h)**
  - **Pré-condição:** Fran ou Baku com recursos severamente desgastados (ex: PV = 2, PM = 1, PA = 0).
  - **Ação:** Abrir o menu do personagem e clicar em "Realizar Descanso Completo".
  - **Resultado Esperado Exato:**
    - PV restaurado para `100%` do máximo.
    - PM restaurado para `100%` do máximo.
    - PA restaurado para `100%` do máximo.
  - **Critério de Falha:** Qualquer recurso não retornar ao valor máximo.

- [ ] **TEST-GLOBAL-03: Nova Cena (Reset de Poderes de 1/Cena)**
  - **Pré-condição:** Poderes 1/Cena (*Dádiva da natureza*, *Manobra especial*, *Mais Além*) no estado "Usado".
  - **Ação:** Abrir o menu e clicar em "Nova Cena (Resetar)".
  - **Resultado Esperado Exato:**
    - Todos os botões de poderes 1/Cena voltam ao estado "1/1 Cena" (Disponível).
    - Buffs temporários de duração "Cena" são desativados.
    - Os valores atuais de PV e PM **não** são alterados pelo reset de cena.
  - **Critério de Falha:** Poderes permanecerem marcados como usados ou reset indevido de PV/PM.

- [ ] **TEST-GLOBAL-04: Persistência de Dados e Troca Contínua de Fichas**
  - **Pré-condição:** Baku com 6 PV e 4 PM. Fran com 8 PV e 12 PM.
  - **Ação:**
    1. Abrir o modal "Trocar de Personagem".
    2. Alternar entre Fran e Baku.
    3. Pressionar `F5` / recarregar a página.
  - **Resultado Esperado Exato:**
    - Ao recarregar, o personagem ativo permanece o último selecionado.
    - Os valores exatos de PV, PM e PA de ambos os personagens continuam intactos no `localStorage`.
  - **Critério de Falha:** Perda de dados, reset de PV/PM ao recarregar a página ou sobrescrita entre fichas.

- [ ] **TEST-GLOBAL-05: Animação dos Painéis Deslizantes (Accordion CSS Grid)**
  - **Pré-condição:** Tela de jogo aberta.
  - **Ação:** Clicar nos botões "PERSONAGEM" e "OUTROS TESTES".
  - **Resultado Esperado Exato:**
    - Ambos os painéis expandem **abaixo dos botões de combate** (Ataque e Defesa) com transição suave de `grid-template-rows: 0fr` para `1fr`.
    - Toda a seção abaixo (Técnicas & Bônus) desliza para baixo no mesmo movimento.
    - Ao desativar, o painel encolhe suavemente para cima (`1fr` $\rightarrow$ `0fr`) e puxa a UI de volta.
  - **Critério de Falha:** Painel abrir em local incorreto, saltos bruscos sem transição suave ou sobreposição de elementos.

---

## 📊 INSTRUÇÃO OBRIGATÓRIA: GERAÇÃO DO RELATÓRIO DE RESULTADOS

> [!IMPORTANT]
> **ORDEM DIRETA AO AGENTE DE IA / EXECUTOR:**
> Ao finalizar a execução de todos os casos de teste acima, você **DEVE OBRIGATORIAMENTE** gerar e salvar um arquivo de relatório consolidado no caminho:
> `tests/TEST_EXECUTION_REPORT.md`
>
> Este relatório servirá de insumo técnico imediato para a equipe priorizar correções de bugs, ajustes de regras e elaboração de novas especificações.

### Estrutura Obrigatória do Arquivo `tests/TEST_EXECUTION_REPORT.md`:

O relatório gerado deve conter rigorosamente as seguintes seções em formato Markdown:

1. **Sumário Executivo:**
   - Data/Hora da Execução.
   - Total de Casos de Teste Executados.
   - Taxa de Sucesso (`Total Passados` / `Total Falhados` / `Total Bloqueados`).
   - Veredito Geral de Estabilidade e Conformidade com as Regras de 3DeT Vitória.

2. **Tabela de Resultados por Teste:**
   - Tabela listando ID do Teste (`TEST-FRAN-01`, etc.), Nome, Status (`PASS` / `FAIL` / `BLOCKED`), e Observações Relevantes.

3. **Registro Detalhado de Falhas e Inconsistências (Bugs Encontrados):**
   - Para cada teste marcado como `FAIL`:
     - **ID do Teste & Funcionalidade Afetada.**
     - **Comportamento Observado (Actual Result).**
     - **Comportamento Esperado (Expected Result).**
     - **Severidade:** (`Crítica` / `Alta` / `Média` / `Baixa` / `Melhoria de UX`).
     - **Evidência:** Trecho de log de console, JSON de estado ou referência visual.

4. **Insumos para Novas Especificações e Correções:**
   - Lista acionável de melhorias sugeridas na interface, regras ou catálogo (ex: inclusão da variante *Ataque Especial — Área*, refinamentos de UI em múltiplas formas, tooltips, atalhos de descanso).

5. **Auditoria de Console & Performance:**
   - Registro de warnings, erros de JavaScript ou problemas de renderização capturados pelo DevTools durante os testes.

