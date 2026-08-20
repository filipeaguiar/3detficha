## Why

Vantagens e técnicas atualmente usam caminhos separados de aquisição, ativação e resolução, fazendo com que vários efeitos oficiais não sejam aplicados, sejam cobrados no momento errado ou contaminem rolagens incompatíveis. A adoção dos botões dedicados de Ataque e Defesa torna necessário consolidar essas regras agora, para que Ganho, Perda, críticos, atributos, custos e durações sejam confiáveis sem depender de modificadores duplicados.

## What Changes

- Vincular vantagens adquiridas às suas ações e efeitos de jogo, eliminando a necessidade de cadastrar novamente um preset equivalente.
- Introduzir metadados tipados de contexto, condição, substituição de atributo, momento de cobrança, duração e nível de automação para vantagens, técnicas e variantes.
- Aplicar Ganho, Perda, bônus de atributo, faixas de crítico e críticos automáticos apenas às rolagens compatíveis.
- Corrigir Ataque, Defesa e testes gerais para escolher automaticamente perícias aplicáveis, preservando controles manuais para condições narrativas.
- Corrigir ciclos, custos e consumo de técnicas instantâneas, de cena, assistidas, mantidas e com variantes.
- Corrigir efeitos determinísticos auditados, incluindo Barreira Mística, Absorver Mana, Queimar o Cosmo, Percepção Cósmica, Abrir Chakra, Bomba Vital e recuperações de recursos.
- Preservar como assistidos ou narrativos os efeitos que dependem de alvo, dano, rodada, posição ou decisão do narrador, identificando-os explicitamente na interface.
- Corrigir opções repetíveis, especializações, variantes ausentes e representações duplicadas de vantagens como +Ação, +Mana e +Vida.
- Adicionar validação tabelada da cobertura e do comportamento das 59 vantagens e 51 técnicas do catálogo.
- Manter compatibilidade com fichas existentes, normalizando bônus legados e evitando cobranças ou ações duplicadas.

## Capabilities

### New Capabilities
- `advantage-gameplay-effects`: Integra aquisição, configuração, ações, efeitos automáticos e resolução assistida das vantagens do personagem.

### Modified Capabilities
- `core-mechanics`: Restringir modificadores ao contexto, atributo, condição e ação corretos, incluindo Ganho, Perda e críticos.
- `complete-technique-catalog`: Corrigir metadados, requisitos, custos, durações, escopos e cobertura verificável das técnicas oficiais.
- `complex-technique-patterns`: Tornar explícito o limite entre automação determinística e resolução assistida ou narrativa.
- `cycling-technique-variants`: Corrigir seleção, execução, cobrança e encerramento de variantes instantâneas e de cena.
- `persistent-assisted-techniques`: Aplicar estoque, disparo, consumo, recursos e efeitos determinísticos de técnicas persistentes.
- `temporary-package-techniques`: Aplicar corretamente efeitos seguros, custos iniciais, manutenção e encerramento de pacotes temporários.
- `technique-selection-ux`: Validar especializações, escolhas permanentes, repetibilidade e metadados copiados na aquisição.
- `play-action-separation`: Classificar e executar Ataque, Defesa, técnicas e modificadores sem vazamento ou consumo entre contextos.
- `character-resources`: Unificar as vantagens de recursos com os campos de níveis e impedir representação ou custo duplicado.

## Impact

- Afeta os tipos de personagem e bônus, catálogos de vantagens/técnicas/variantes, normalização de fichas, cálculo e consumo de rolagens, gerenciamento de recursos, editor, Ações, modo Jogar e modais.
- Exige migração compatível dos presets legados e inferência temporária por nome/identificador para fichas já salvas.
- Não requer novas dependências externas, mas adiciona uma matriz de validação e testes de regras orientados pelos catálogos.
