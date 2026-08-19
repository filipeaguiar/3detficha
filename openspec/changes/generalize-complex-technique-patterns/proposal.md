## Why

O catálogo de técnicas do sistema já mostrou vários padrões recorrentes que não cabem bem em um único modelo de “técnica = bônus fixo”. Algumas técnicas são ações imediatas, outras são modos internos de uso, outras deixam um efeito assistido persistente para ser acionado depois, e outras concedem pacotes temporários de regras com partes automáveis e partes narrativas. Tratar cada técnica complexa como exceção isolada aumenta a fragmentação e dificulta expansão futura do catálogo.

## What Changes

- Formalizar um conjunto de padrões reutilizáveis para técnicas complexas.
- Expandir o modelo para suportar efeitos persistentes assistidos e pacotes temporários assistidos, além dos padrões já existentes.
- Permitir que técnicas complexas exponham apenas a automação segura no app, deixando decisões e resoluções narrativas explicitamente na mesa.
- Definir a ordem inicial de aplicação dos novos padrões em técnicas representativas como Desprezo, Setas Infalíveis de Petrovna, Rajada de Golpes e outras similares.

## Capabilities

### New Capabilities
- `complex-technique-patterns`: modelagem reutilizável para padrões de técnicas complexas.
- `persistent-assisted-techniques`: técnicas com ativação inicial e gatilhos/consumos assistidos posteriores.
- `temporary-package-techniques`: técnicas que concedem pacotes temporários de efeitos/regras, com automação parcial.

### Modified Capabilities
- `technique-selection-ux`: o catálogo guiado precisa conviver com técnicas que representam padrões estruturais distintos.
- `cycling-technique-variants`: deve coexistir com técnicas que não são meras variantes, mas efeitos persistentes ou pacotes temporários.

## Impact

- Tipos e utilitários de técnicas
- Catálogo estruturado de técnicas
- Interface de jogo para técnicas
- UX de disclosure entre automação e decisão em mesa
