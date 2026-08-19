## Why

A técnica Golpes é um caso estrutural especial no livro: ao adquiri-la, o personagem não recebe um efeito único, mas escolhe dois golpes de uma lista. A técnica pode ser adquirida várias vezes para aprender mais golpes. A técnica Combo depende diretamente dessa estrutura, porque só pode usar golpes conhecidos, não pode repetir golpes no mesmo combo e resolve tudo no mesmo turno. O modelo atual do app não representa essa relação corretamente.

## What Changes

- Estruturar Golpes como técnica de aquisição repetível com escolhas internas de golpes.
- Exibir golpes conhecidos como ações/técnicas utilizáveis na interface de jogo.
- Preparar um fluxo de Combo de turno único baseado apenas em golpes conhecidos.
- Distinguir golpes de outras técnicas para impedir modelagem incorreta de combo.
- Tratar efeitos de golpe como misto de automação leve e resolução declarada em mesa, conforme a complexidade.

## Capabilities

### New Capabilities
- `structured-strikes`: aquisição e uso estruturado de golpes escolhidos dentro da técnica Golpes.
- `combo-flow`: fluxo de combo de turno único baseado em golpes conhecidos sem repetição.

### Modified Capabilities
- `technique-selection-ux`: precisa suportar técnicas repetíveis com subescolhas internas.
- `cycling-technique-variants`: deve coexistir com técnicas que não usam variantes, mas escolhas permanentes de subitens.

## Impact

- Catálogo estruturado de técnicas
- Editor de técnicas
- Interface de jogo para técnicas
- Estado transitório de combo no play mode
- Modelagem de técnicas repetíveis com escolhas
