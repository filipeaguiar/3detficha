# Suíte Extensiva de Testes de Personagens — 3DeT Vitória

Este documento contém o plano detalhado de testes em formato de **Task List** para validação das fichas de **Fran** (Druida / Humano / Múltiplas Formas) e **Baku** (Guerreiro / Humano / Especialista em Combate). 

Projetado para execução automatizada (via agente de IA com MCP `chrome-devtools`) ou execução manual guiada.

---

## Tabela de Referência Rápida das Fichas

| Personagem | Kit | Arquétipo | Formas / Atributos | Vantagens | Perícias | Desvantagens |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Fran** | Druida | Humano | **Normal:** P1, H3, R2 (PV 10, PM 15, PA 1)<br>**Planta:** P3, H2, R4 (PV 20, PM 10, PA 3) | **Normal:** Magia, Ajudante (Especialista), Transformação (1pt)<br>**Planta:** Transformação (1pt), *Forma Selvagem: Ágil, Forte* | **Normal:** Animais, Saber<br>**Planta:** Animais, Luta | **Ambas:** Código Dahllan, Fraqueza leve |
| **Baku** | Guerreiro | Humano | **Normal:** P3, H2, R2 (PV 10, PM 10, PA 3) | Acumulador, Ataque Especial (Potente) | Luta | Código Heroico, Antipático |

---

## 📋 Task List de Execução de Testes

### 🌿 PARTE 1: Testes da Ficha de Fran

#### 1.1 Forma Normal — Validação de Base e Recursos
- [ ] **TEST-FRAN-01: Verificação de Atributos e Cálculos de Recursos Iniciais**
  - **Ação:** Selecionar a ficha da Fran e ativar a *Forma Normal*.
  - **Validação:**
    - Atributos exibidos: Poder = 1, Habilidade = 3, Resistência = 2.
    - Barra de PV Máximo: `10` (R2 × 5).
    - Barra de PM Máximo: `15` (H3 × 5).
    - Pontos de Ação (PA): `1` (P1).
  - **Critério de Aceite:** Todas as barras e badges refletem com exatidão os atributos da Forma Normal.

- [ ] **TEST-FRAN-02: Teste de Perícia Fora de Combate (Saber / Animais)**
  - **Ação:** Abrir a gaveta "OUTROS TESTES" e rolar teste de Habilidade com a perícia Saber ou Animais.
  - **Validação:**
    - Total Efetivo: Habilidade = 3.
    - Rolagem: 2D (1D base + 1D Ganho da Perícia).
    - O modal de resultado exibe o somatório: `[Dado 1, Dado 2] + 3(H) = Total`.
  - **Critério de Aceite:** O dado de ganho da perícia é computado sem cobrar mana.

- [ ] **TEST-FRAN-03: Ataque Mágico Básico com Magia**
  - **Ação:** No painel de Combate, rolar um Ataque usando Mística/Magia.
  - **Validação:**
    - Rolagem utiliza o atributo configurado.
    - O modal de histórico registra o ataque com a tag de Magia.
  - **Critério de Aceite:** Ataque é executado sem conflitos de atributos.

- [ ] **TEST-FRAN-04: Defesa Básica e Dedução de PV**
  - **Ação:** Clicar no botão "Rolar Defesa".
  - **Validação:**
    - Rolagem baseada em Resistência 2 (1D + 2).
    - Clicar na barra de PV para simular dano recebido (-4 PV).
    - A barra de PV atualiza para `6 / 10`.
  - **Critério de Aceite:** Dano deduzido corretamente da barra visual com pulso animado.

- [ ] **TEST-FRAN-05: Poder de Kit Druida — "Dádiva da Natureza"**
  - **Ação:** No topo da tela de jogo, clicar no botão de poder do kit `Dádiva da natureza 1/1 Cena`.
  - **Validação:**
    - O poder é marcado como ATIVO na cena.
    - Permite substituir qualquer perícia por Animais em testes aplicáveis.
    - Repetição na mesma cena indica custo de `3 PM`.
  - **Critério de Aceite:** Estado do poder transiciona para "Usado" ou "Ativo", deduzindo PM caso repetido.

- [ ] **TEST-FRAN-06: Traço de Arquétipo Humano — "Mais Além"**
  - **Ação:** Ativar o card de técnica `Mais Além` (+1D Ganho / custo 2 PM) e realizar um teste ou ataque.
  - **Validação:**
    - Custo de 2 PM é debitado da barra de mana (`15` $\rightarrow$ `13`).
    - Quantidade de dados aumenta em +1D (Ganho).
  - **Critério de Aceite:** O PM é debitado e o dado extra aparece na rolagem 3D.

- [ ] **TEST-FRAN-07: Ajudante Especialista**
  - **Ação:** Ativar bônus de Ajudante em teste aplicável ou inspecionar card de Ajudante.
  - **Validação:** Card exibe o suporte do familiar e detalhes ao clicar com botão direito / clique longo.
  - **Critério de Aceite:** Bônus assistido é exibido e documentado sem travar a interface.

---

#### 1.2 Mecânica de Transformação (Forma Normal ➔ Forma Planta)
- [ ] **TEST-FRAN-08: Transição de Forma via Modal de Transformação**
  - **Ação:** Abrir o menu do personagem e alternar para a *Forma Planta*.
  - **Validação:**
    - Interface atualiza o nome da forma para "Forma Planta".
    - Atributos mudam instantaneamente: Poder = 3, Habilidade = 2, Resistência = 4.
    - Novo PV Máximo: `20` (R4 × 5).
    - Novo PM Máximo: `10` (H2 × 5).
    - Novo PA Máximo: `3` (P3).
  - **Critério de Aceite:** A UI recalcula todos os limites e exibe as perícias e vantagens da Forma Planta (Luta, Animais, Forma Selvagem).

- [ ] **TEST-FRAN-09: Vantagens Fera da Forma Selvagem (Ágil e Forte)**
  - **Ação:** Verificar o botão "Vantagens Fera 2/2" no cabeçalho de combate da Forma Planta.
  - **Validação:**
    - Badges de Ágil (+2 em agilidade) e Forte (+2 em esforço físico / P+1 em combate) estão ativos.
    - O teste de Poder no card de rolagem exibe o modificador aplicado.
  - **Critério de Aceite:** Os bônus gratuitos da Forma Selvagem do Druida afetam os testes pertinentes da forma animal/vegetal.

- [ ] **TEST-FRAN-10: Combate na Forma Planta (P3 + Luta)**
  - **Ação:** Clicar no botão "Rolar Ataque" na Forma Planta.
  - **Validação:**
    - Atributo de ataque: Poder (3).
    - Perícia Luta adiciona +1D Ganho (Total: 2D + 3).
  - **Critério de Aceite:** O ataque corpo a corpo é resolvido com os dados corretos da Forma Planta.

- [ ] **TEST-FRAN-11: Defesa Robusta na Forma Planta (R4)**
  - **Ação:** Clicar no botão "Rolar Defesa" na Forma Planta.
  - **Validação:**
    - Rolagem baseada em Resistência 4 (1D + 4).
    - Capacidade de absorção e cálculo de crítico em 6.
  - **Critério de Aceite:** Defesa computa o valor integral de Resistência 4.

- [ ] **TEST-FRAN-12: Reversão para Forma Normal**
  - **Ação:** Alternar de volta para a Forma Normal.
  - **Validação:**
    - Atributos retornam para P1, H3, R2.
    - Limites máximos voltam para PV 10, PM 15, PA 1.
  - **Critério de Aceite:** Nenhuma contaminação de estado entre as formas (perícias e vantagens de cada forma permanecem isoladas).

---

### ⚔️ PARTE 2: Testes da Ficha de Baku

#### 2.1 Validação de Atributos e Configuração de Combate
- [ ] **TEST-BAKU-01: Verificação de Atributos e Limites Iniciais**
  - **Ação:** Selecionar a ficha de Baku no alternador de fichas.
  - **Validação:**
    - Atributos exibidos: Poder = 3, Habilidade = 2, Resistência = 2.
    - Barra de PV: `10 / 10`.
    - Barra de PM: `10 / 10`.
    - Barra de PA: `3 / 3`.
    - Kit exibido: Guerreiro.
  - **Critério de Aceite:** Dados iniciais carregados em conformidade com o cadastro.

- [ ] **TEST-BAKU-02: Ataque Básico com Perícia Luta**
  - **Ação:** Clicar em "Rolar Ataque" sem técnicas adicionais ativas.
  - **Validação:**
    - Atributo base: Poder 3.
    - Perícia Luta confere Ganho (+1D $\rightarrow$ 2D).
    - Custo de PM: `0 PM`.
    - Resultado: `[Dado 1, Dado 2] + 3(P)`.
  - **Critério de Aceite:** Rolagem de ataque básica precisa e sem cobrança indevida de mana.

- [ ] **TEST-BAKU-03: Ataque Especial Potente (P+2)**
  - **Ação:** Ativar o card de técnica `Ataque Especial (Potente)` e rolar o Ataque.
  - **Validação:**
    - Card de Ataque Especial fica destacado com borda de acento.
    - Custo de Mana exibido no botão de Ataque: `1 PM` (com gomos da barra de mana).
    - Poder Efetivo no Ataque: `Poder 5` (3 base + 2 Potente).
    - Ao rolar: PM atual deduz de `10` para `9`.
    - Modal de resultado discrimina: `Poder 3(+2)`.
  - **Critério de Aceite:** O bônus numérico e a dedução de 1 PM são aplicados perfeitamente.

- [ ] **TEST-BAKU-04: Vantagem Acumulador em Ataques Consecutivos**
  - **Ação:** Realizar múltiplos acertos consecutivos simulando a vantagem Acumulador.
  - **Validação:**
    - A cada acerto registrado, o acúmulo de bônus progressivo é mantido/rastreado.
  - **Critério de Aceite:** A vantagem reflete o estado de acúmulo sem resetar indevidamente no mesmo turno.

- [ ] **TEST-BAKU-05: Combo de Ataque Especial + Mais Além**
  - **Ação:** Ativar simultaneamente `Ataque Especial (Potente)` (+2 P, 1 PM) e `Mais Além` (+1D Ganho, 2 PM).
  - **Validação:**
    - Custo total somado no botão de Ataque: `3 PM`.
    - Quantidade de dados: `3D` (1 base + 1 Luta + 1 Mais Além).
    - Ao rolar: PM deduz de `9` para `6`.
    - Modal de resultado soma: `[3 dados] + 5(P)`.
  - **Critério de Aceite:** Dedução cumulativa de 3 PM e combinação correta de dados extras e bônus fixo.

- [ ] **TEST-BAKU-06: Poder do Kit Guerreiro — "Lutar é tudo!"**
  - **Ação:** No topo, clicar no botão de poder `Lutar é tudo! Quando -2PM`.
  - **Validação:**
    - O poder aplica +3 ao resultado final de um teste de Luta.
    - 2 PM são consumidos.
  - **Critério de Aceite:** O modificador do kit é ativado e refletido no total da rolagem de combate.

- [ ] **TEST-BAKU-07: Poder do Kit Guerreiro — "Manobra Especial" (1/Cena)**
  - **Ação:** Clicar no botão `Manobra especial 1/1 Cena` antes de usar o Ataque Especial.
  - **Validação:**
    - O Ataque Especial ativado passa a custar `0 PM` em vez de `1 PM`.
    - O botão do poder muda para o estado "Usado" (esgotado na cena atual).
  - **Critério de Aceite:** O custo de mana do Ataque Especial é isentado (0 PM) na próxima rolagem.

- [ ] **TEST-BAKU-08: Defesa Básica e Absorção de Dano**
  - **Ação:** Clicar em "Rolar Defesa" de Baku.
  - **Validação:**
    - Rolagem baseada em Resistência 2 (1D + 2).
    - Se a rolagem tirar 6, registra acerto crítico (Crítico 6+).
  - **Critério de Aceite:** Defesa computa Resistência 2 adequadamente.

- [ ] **TEST-BAKU-09: Desvantagem Antipático em Testes Sociais**
  - **Ação:** Na gaveta "OUTROS TESTES", rolar um teste de Poder para interação social.
  - **Validação:**
    - O teste sofre Perda e não pode gerar acerto crítico.
    - O badge da desvantagem Antipático é visível na gaveta de Personagem.
  - **Critério de Aceite:** As restrições da desvantagem são documentadas e conferidas.

---

### 🔄 PARTE 3: Ciclos de Descanso, Gestão de Cenas e Troca de Fichas

- [ ] **TEST-GLOBAL-01: Descanso Rápido (Recuperação Parcial)**
  - **Ação:** Com PV e PM reduzidos em Baku (ex: 4 PV, 3 PM), abrir o menu e clicar em "Descanso Rápido".
  - **Validação:**
    - Recupera +R em PV (+2 PV $\rightarrow$ `6 PV`).
    - Recupera +H em PM (+2 PM $\rightarrow$ `5 PM`).
  - **Critério de Aceite:** Valores parciais incrementados respeitando os limites máximos.

- [ ] **TEST-GLOBAL-02: Descanso Completo (Recuperação Total 100%)**
  - **Ação:** Com recursos desgastados, abrir o menu e clicar em "Realizar Descanso Completo".
  - **Validação:**
    - PV restaurado para 100% (10/10).
    - PM restaurado para 100% (10/10).
    - PA restaurado para 100% (3/3).
  - **Critério de Aceite:** Todos os recursos retornam ao valor máximo instantaneamente.

- [ ] **TEST-GLOBAL-03: Nova Cena (Reset de Usos por Cena e Buffs)**
  - **Ação:** Após gastar os poderes de 1/Cena (*Dádiva da natureza*, *Manobra especial*, *Mais Além*), acionar "Nova Cena (Resetar)" no menu.
  - **Validação:**
    - Todos os poderes de 1/Cena voltam a ficar "Disponíveis (1/1 Cena)".
    - Bônus temporários e buffs da cena anterior são limpos.
  - **Critério de Aceite:** Estado da cena é resetado sem afetar os PV/PM atuais.

- [ ] **TEST-GLOBAL-04: Persistência e Troca Contínua de Fichas**
  - **Ação:**
    1. Alternar de Baku para Fran através do modal "Trocar de Personagem".
    2. Modificar o PM de Fran para `8 / 15`.
    3. Alternar de volta para Baku.
    4. Recarregar a página no navegador (`F5` / reload).
  - **Validação:**
    - A ficha ativa ao recarregar continua sendo Baku com seus valores preservados.
    - Ao trocar para Fran, os `8 PM` permanecem gravados no `localStorage`.
  - **Critério de Aceite:** Zero perda de dados entre trocas de personagens e reloads da página.

- [ ] **TEST-GLOBAL-05: Animação e Responsividade dos Painéis Deslizantes**
  - **Ação:** Na tela de jogo, clicar repetidamente nos botões "PERSONAGEM" e "OUTROS TESTES".
  - **Validação:**
    - Ambos os painéis abrem abaixo dos botões de combate deslizando suavemente para baixo.
    - O conteúdo abaixo (Técnicas & Bônus) desliza junto sem sobreposição ou saltos bruscos.
    - Ao fechar, os painéis deslizam para cima recolhendo o espaço até sumirem.
  - **Critério de Aceite:** Transição de CSS Grid `0fr` $\leftrightarrow$ `1fr` sem travamentos ou quebras visuais.

---

## 🤖 Guia de Execução para Agentes de IA via Chrome DevTools MCP

Para executar esses testes de forma automatizada:
1. Abra a página `http://localhost:5173/3detficha/` usando `navigate_page`.
2. Emule resolução mobile (`resize_page: 412 x 915`).
3. Execute cada caso de teste disparando cliques com `click` ou avaliações no DOM com `evaluate_script`.
4. Capture snapshots (`take_snapshot`) ou screenshots (`take_screenshot`) após cada passo para auditar o estado visual e os dados nos modais.
5. Verifique o console via `list_console_messages` após cada teste para garantir `0 erros`.
