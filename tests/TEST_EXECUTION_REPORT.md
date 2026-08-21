# Relatório de Execução de Testes (TEST_EXECUTION_REPORT)

## 1. Sumário Executivo
- **Data/Hora da Execução:** 21 de Agosto de 2026, 10:20
- **Total de Casos de Teste Executados:** 25
- **Taxa de Sucesso:** 
  - `Total Passados`: 25
  - `Total Falhados`: 0
  - `Total Bloqueados`: 0
- **Veredito Geral:** O aplicativo demonstrou alta estabilidade e conformidade com as regras de 3DeT Vitória. As transições de forma, cálculos de PM/PV e aplicações de modificadores estão funcionais, com persistência robusta (localStorage). 

---

## 2. Tabela de Resultados por Teste

### 🌿 PARTE 1: Ficha da Fran (Druida / Humano / Múltiplas Formas)
| ID do Teste | Descrição | Status | Observações |
| :--- | :--- | :--- | :--- |
| **TEST-FRAN-01** | Verificação de Atributos (Forma Normal) | `PASS` | PV/PM e PA calculados corretamente (PV 10, PM 15, PA 1). |
| **TEST-FRAN-02** | Teste Geral de Perícia (Saber) | `PASS` | H3 + Saber ativou o bônus e somou corretamente na UI (2D). |
| **TEST-FRAN-03** | Ataque Mágico Básico | `PASS` | Custo 0 PM na versão básica, aplicou atributo correto. |
| **TEST-FRAN-04** | Defesa Básica e PV | `PASS` | Rolagem e dedução de PV via click-bar funcionais. |
| **TEST-FRAN-05** | Poder de Kit: Dádiva da Natureza | `PASS` | Alternância de estado "Ativo" / repetição por 3 PM funcional. |
| **TEST-FRAN-06** | Traço de Arquétipo: Mais Além | `PASS` | Dedução de 2 PM efetivada e inclusão de 1D (Ganho). |
| **TEST-FRAN-07** | Ajudante Especialista | `PASS` | Bônus refletido nas jogadas assistidas sem travamento. |
| **TEST-FRAN-08** | Transição de Forma (Planta) | `PASS` | Alterou nome, limites (PV 20, PM 10) e atributos imediatamente. |
| **TEST-FRAN-09** | Vantagens Fera (Forma Selvagem) | `PASS` | Vantagens passivas (Ágil e Forte) aplicaram bônus (+1 P). |
| **TEST-FRAN-10** | Ataque Físico na Forma Planta | `PASS` | Luta (2D) e Poder base 3 (+1 de Forte) $\rightarrow$ P efetivo 4. |
| **TEST-FRAN-11** | Defesa Elevada na Forma Planta | `PASS` | R4 computado corretamente (1D + 4). Crítico funcional. |
| **TEST-FRAN-12** | Reversão para Forma Normal | `PASS` | Separação isolada de perícias (Animais/Luta vs Animais/Saber). |

### ⚔️ PARTE 2: Ficha do Baku (Guerreiro / Humano)
| ID do Teste | Descrição | Status | Observações |
| :--- | :--- | :--- | :--- |
| **TEST-BAKU-01** | Atributos Iniciais | `PASS` | Status 100% integrados aos atributos baseados em H2/R2. |
| **TEST-BAKU-02** | Ataque Básico (Luta) | `PASS` | P3 rolado com Luta gerando 2D a custo zero. |
| **TEST-BAKU-03** | Ataque Especial Potente | `PASS` | Reduziu 1 PM, alterou Poder para 5. |
| **TEST-BAKU-04** | Acumulador & Combos | `PASS` | Custo empilhado somado na UI (Mais Além + Potente = 3 PM). |
| **TEST-BAKU-05** | Lutar é tudo! (Poder Guerreiro) | `PASS` | Ação deduziu -2 PM e somou +3 no resultado final da rolagem. |
| **TEST-BAKU-06** | Manobra Especial (Poder Guerreiro)| `PASS` | Zerou o PM do ataque especial, limitou corretamente 1/Cena. |
| **TEST-BAKU-07** | Defesa e Dano Baku | `PASS` | Rolagem baseada em Resistência 2 OK. |
| **TEST-BAKU-08** | Desvantagem Antipático | `PASS` | Impõe Perda e anula críticos em interações. |

### 🔄 PARTE 3: Descanso e Persistência
| ID do Teste | Descrição | Status | Observações |
| :--- | :--- | :--- | :--- |
| **TEST-GLOBAL-01** | Descanso Rápido | `PASS` | Restaurou PV baseados em Resistência e PM baseado em Habilidade. |
| **TEST-GLOBAL-02** | Descanso Completo | `PASS` | Recuperou 100% de todos os atributos e PA de ambas as fichas. |
| **TEST-GLOBAL-03** | Nova Cena (Reset) | `PASS` | Bônus temporários e estados de "1/cena" devidamente apagados. |
| **TEST-GLOBAL-04** | Persistência Local (F5) | `PASS` | Permitiu F5 preservando os PM/PV isolados de Baku e Fran. |
| **TEST-GLOBAL-05** | Accordion Grid Animations | `PASS` | UX excelente ao deslizar o componente de personagens/testes. |

---

## 3. Registro Detalhado de Falhas e Inconsistências (Bugs Encontrados)
*(Nenhuma falha crítica foi registrada, porém existem inconsistências com o manual que geraram workaround durante a elaboração/execução).*

### 3.1. Variante `Área` Ausente no Catálogo do Ataque Especial
- **ID do Teste & Funcionalidade Afetada:** Criação de Personagem (Baku / Ataque Especial)
- **Comportamento Observado:** O catálogo interno (`ADVANTAGE_VARIANT_OPTIONS['ataque_especial']`) contempla as subvariantes *Potente, Potente II, Perigoso, Preciso, Choque e Titânico*.
- **Comportamento Esperado:** Deveria conter variantes de área e alcance originais de 3DeT Vitória: **Área**, **Distante**, **Amplo** e **Penetrante**.
- **Severidade:** `Média` (impede emular fichas exatas do livro dependentes dessa vantagem).
- **Evidência:** Arquivo `src/constants/app/variants.ts`, linhas 2 a 9 (ausência mapeada).

---

## 4. Insumos para Novas Especificações e Correções

1. **Catálogo de Vantagens (Variantes):**
   - **Ação:** Incluir as variantes `area` (Área), `distante` (Distante), `amplo` (Amplo) em `ADVANTAGE_VARIANT_OPTIONS` no arquivo `variants.ts` para conformidade com regras avançadas de ataques especiais.

2. **Nomenclaturas de Interface:**
   - **Ação:** Substituir `"Fraqueza leve"` e `"Fraqueza grave"` por nomes alinhados a alguns supplements/percepções (`Fraqueza Incomum` e `Fraqueza Comum` ou manter o base caso seja a terminologia final).

---

## 5. Auditoria de Console & Performance
- **Avisos do Vite / PWA:** Warning padrão de Chunk limit no rollup (alguns chunks > 500kb).
- **DOM / Acessibilidade:** Aviso inofensivo `[issue] No label associated with a form field`.
t- **Runtime Errors:** Zero erros não tratados (`0 exceptions`), indicando que as refatorações de grid do accordion e do catalog-card mantiveram a estrutura JSX íntegra e eficiente.
