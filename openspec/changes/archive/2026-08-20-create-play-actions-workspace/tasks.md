## 1. Classificação e contratos

- [x] 1.1 Definir os tipos de modo da aplicação e das abas Ataques, Técnicas e Modificadores/Bônus
- [x] 1.2 Criar helpers tipados que classifiquem golpes conhecidos, técnicas adquiridas e modificadores/bônus da forma ativa
- [x] 1.3 Cobrir aquisição Golpes e entradas legadas/customizadas sem duplicar nem ocultar ações

## 2. Área independente Ações

- [x] 2.1 Criar o componente de alto nível ActionWorkspace com contratos explícitos de dados e callbacks
- [x] 2.2 Implementar navegação exclusiva entre Ataques, Técnicas e Modificadores/Bônus, com contagens e estados vazios
- [x] 2.3 Extrair ou reutilizar componentes de apresentação e configuração específicos de cada categoria
- [x] 2.4 Adicionar estilos e hooks CSS independentes para o workspace, suas abas e estados responsivos

## 3. Navegação da aplicação

- [x] 3.1 Adicionar o modo actions à composição de App sem mover JSX detalhado para o componente raiz
- [x] 3.2 Adicionar ao drawer o item Ações e controles claros para alternar entre Jogar, Ações e Editar Ficha
- [x] 3.3 Garantir que troca de modo preserve personagem, forma, recursos e configuração persistida

## 4. Simplificação do editor

- [x] 4.1 Manter na aba Técnicas apenas catálogo, busca, elegibilidade, XP, aquisição de técnicas/Golpes e remoção
- [x] 4.2 Transferir golpes conhecidos e controles operacionais de variantes, estoque, pacotes, presets e bônus customizados para o workspace
- [x] 4.3 Exibir orientação para gerenciar a técnica adquirida na área Ações

## 5. Validação

- [x] 5.1 Verificar que cada categoria aparece isoladamente e que Golpes não cria ações duplicadas
- [x] 5.2 Verificar fichas legadas, troca de forma, aquisição/remoção e configurações especiais
- [x] 5.3 Verificar que ativação em jogo, custos, combos, variantes, estados assistidos e pacotes permanecem inalterados
- [x] 5.4 Executar lint e build configurados e corrigir regressões
