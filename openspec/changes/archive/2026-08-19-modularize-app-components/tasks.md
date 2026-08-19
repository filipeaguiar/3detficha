## 1. Baseline e estrutura modular

- [x] 1.1 Executar lint e build antes da refatoração e registrar falhas preexistentes
- [x] 1.2 Criar a estrutura de diretórios por domínio para componentes, hooks, tipos e utilitários

## 2. Tipos, constantes e funções compartilhadas

- [x] 2.1 Extrair os tipos de personagem, formulário, bônus, kit, poder e resultado de rolagem para módulos TypeScript dedicados
- [x] 2.2 Extrair presets e opções estáticas restantes de `App.tsx` para módulos de constantes
- [x] 2.3 Extrair normalização, formatação, interpretação de modificadores e cálculos puros para utilitários tipados
- [x] 2.4 Atualizar imports e executar build para confirmar compatibilidade dos contratos extraídos

## 3. Componentes compartilhados

- [x] 3.1 Extrair os ícones SVG para um módulo compartilhado sem alterar tamanhos ou aparência
- [x] 3.2 Extrair `SegmentedBar` e outros elementos apresentacionais reutilizados para `components/common`
- [x] 3.3 Verificar que os componentes compartilhados possuem props explícitas e não dependem de componentes de domínio

## 4. Modularização do modo de edição

- [x] 4.1 Extrair o contêiner e a navegação por abas do editor para um componente de domínio tipado
- [x] 4.2 Extrair a seção de conceito, incluindo personagem, kit, cor, formas e avatar
- [x] 4.3 Extrair a seção de atributos e seus controles de edição
- [x] 4.4 Extrair as seções de vantagens, desvantagens e perícias
- [x] 4.5 Extrair a seção de técnicas e bônus, preservando inclusão, edição, presets e remoção

## 5. Modularização do modo de jogo

- [x] 5.1 Extrair o cabeçalho e o resumo da ficha ativa do modo de jogo
- [x] 5.2 Extrair os controles de recursos PV, PM e PA, preservando limites e feedback visual
- [x] 5.3 Extrair os controles de atributos e rolagem, incluindo ganho/perda, crítico e estados desabilitados
- [x] 5.4 Extrair as listas de bônus, poderes de kit e controles de forma ou transformação

## 6. Navegação e modais

- [x] 6.1 Extrair drawer, overlay e ações de edição, descanso, som e troca de ficha
- [x] 6.2 Extrair o seletor e gerenciador de fichas para um componente modal
- [x] 6.3 Extrair os modais de seleção e informação de kit com busca e filtro preservados
- [x] 6.4 Extrair os modais de presets, edição de bônus, transformação e demais formulários auxiliares
- [x] 6.5 Extrair o modal de resultado da rolagem e manter animação de abertura e fechamento
- [x] 6.6 Manter a integração existente do modal de recorte de avatar após a recomposição

## 7. Estado, persistência e efeitos

- [x] 7.1 Encapsular carregamento, migração, seleção, atualização e persistência de fichas em um hook coeso sem mudar chaves ou formato do `localStorage`
- [x] 7.2 Encapsular a inicialização e configuração do DiceBox e a limpeza de dados em uma interface de hook coesa
- [x] 7.3 Separar a execução da rolagem e seus cálculos do JSX, preservando bônus, custos, críticos, áudio e resultado
- [x] 7.4 Revisar estado local de modais e painéis, mantendo no `App` apenas coordenação realmente compartilhada

## 8. Recomposição e validação

- [x] 8.1 Recompor `App.tsx` como orquestrador de alto nível sem tipos, constantes volumosas, ícones ou JSX detalhado das áreas principais
- [x] 8.2 Revisar imports para remover ciclos, exports não utilizados e supressões TypeScript que deixarem de ser necessárias
- [x] 8.3 Executar lint e build finais e corrigir regressões introduzidas pela modularização
- [x] 8.4 Verificar manualmente edição, persistência e migração, troca e duplicação de fichas, formas, kits, vantagens, perícias e bônus
- [x] 8.5 Verificar manualmente recursos, descansos, drawer, modais, avatar, som, rolagens 3D e resultados nos modos de edição e jogo
