## Why

O catálogo estruturado ainda cobre apenas parte das técnicas do capítulo e alguns casos já cadastrados, como Área de Batalha, Setas Infalíveis e Desprezo, têm suporte assistido inicial sem todos os controles previstos na regra. Completar o catálogo agora permite consolidar os padrões reutilizáveis já criados e oferecer uma experiência coerente sem substituir decisões narrativas de jogador e narrador.

## What Changes

- Completar o catálogo com as técnicas restantes do capítulo de Técnicas, incluindo truques, comuns e lendárias.
- Finalizar Área de Batalha com escolhas temporárias persistidas, manutenção assistida e múltiplas aquisições.
- Finalizar Setas Infalíveis de Petrovna com preparo de 1 até H setas, custo por seta, estoque e disparo posterior.
- Finalizar Desprezo com ativação, gatilho posterior e encerramento assistido separados.
- Classificar cada técnica pelo padrão reutilizável apropriado: modificador instantâneo, variante, ação imediata, efeito persistente assistido ou pacote temporário.
- Automatizar apenas custos, rolagens, bônus, críticos, contadores e estados que o app pode resolver com segurança; efeitos dependentes de alvo, resistência, dano, cenário ou decisão narrativa permanecem explicitamente resolvidos em mesa.
- Incluir requisitos estruturados de atributos, perícias, vantagens e técnicas prévias no fluxo guiado.

## Capabilities

### New Capabilities
- `complete-technique-catalog`: cobertura estruturada de todas as técnicas do capítulo, com requisitos, categoria, XP, custos, descrição e padrão de uso.

### Modified Capabilities
- `technique-selection-ux`: ampliar requisitos guiados, técnicas repetíveis e configuração inicial de técnicas complexas.
- `complex-technique-patterns`: aplicar os padrões gerais a todas as técnicas restantes e permitir metadados narrativos explícitos.
- `persistent-assisted-techniques`: suportar estoques configuráveis, gatilhos, encerramento e estados assistidos mais completos.
- `temporary-package-techniques`: suportar escolhas temporárias persistidas, manutenção e múltiplas instâncias de pacote.

## Impact

- `src/constants/app/techniques.ts` e novos catálogos auxiliares
- `src/types/character.ts` e persistência compatível de estados/configurações de técnica
- `src/utils/character.ts` para requisitos, criação e cálculo
- `src/components/editor/CharacterEditor.tsx` para aquisição/configuração guiada
- `src/components/play/PlayMode.tsx` e `src/App.tsx` para ativação, recursos e disclosure narrativo
- Sem novas dependências de produção e sem sistema global de turnos ou alvos
