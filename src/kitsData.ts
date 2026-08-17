export const ALL_KITS = [
  {
    "id": "abastado",
    "name": "Abastado",
    "exigencias": "Influência ou Manha; Riqueza",
    "nucleos": "Era das Arcas, Guerra da Galáxia",
    "powers": [
      {
        "id": "abastado_meritocracia",
        "name": "Meritocracia",
        "desc": "Uma vez por cena, você pode fazer um teste de compra para usar uma vantagem que não possua, uma única vez. Uma vanta- gem de 1pt exige um teste Mé- dio (9); para cada ponto extra, a dificuldade aumenta +3. Você ainda deve pagar outros cus- tos da vantagem (como PM). Por exemplo, usar Incorpóreo exige um teste com meta 12, uma ação e 5PM.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "abastado_poder_aquisitivo",
        "name": "Poder aquisitivo",
        "desc": "To- dos os seus testes de compra ganham +3 no resultado final (depois da rolagem).",
        "type": "passive"
      },
      {
        "id": "abastado_tempo_e_dinheiro__seu_primeiro",
        "name": "Tempo é dinheiro! Seu primeiro",
        "desc": "Tempo é dinheiro! Seu primeiro teste de compra em cada sessão recebe Ganho, e seu segundo teste não sofre Perda (como se- ria normal para um segundo teste). Agente Secreto",
        "type": "passive"
      }
    ]
  },
  {
    "id": "agente_secreto",
    "name": "Agente Secreto",
    "exigencias": "Manha ou Percepção; Patrono",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL",
    "powers": [
      {
        "id": "agente_secreto_identidade_secreta",
        "name": "Identidade secreta",
        "desc": "Você tem Ganho em testes para ocultar suas atividades (incluindo manter-se escondido). Da mesma forma, testes feitos por outros para descobrir qualquer coisa sobre você têm Perda.",
        "type": "passive"
      },
      {
        "id": "agente_secreto_olho_clinico",
        "name": "Olho clínico",
        "desc": "Você pode gastar uma ação e 1PM para fazer um teste de Percep- ção (Habilidade, 9). Se bem-sucedido, você descobre algo sobre um persona- gem (como um valor de atributo, perí- cia, vantagem ou desvantagem).",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "agente_secreto_plano_de_acao",
        "name": "Plano de ação",
        "desc": "Você pode gas- tar um movimento e 2PM para analisar a situação e elaborar um plano. Até o fim da cena você recebe H+2. Isso não afeta os seus recursos. Alquimista",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "alquimista",
    "name": "Alquimista",
    "exigencias": "Mística, Saber",
    "nucleos": "Era das Arcas, Tormenta ALPHA, UniPotência",
    "powers": [
      {
        "id": "alquimista_diagrama",
        "name": "Diagrama",
        "desc": "Você pode gastar um movimento para traçar um dia- grama alquímico em alguma superfície (no chão, na parede, nas costas do amigo distraído...). Sua próxima vantagem ou técnica que gasta PM tem seu custo reduzido em –1 (mínimo 1PM).",
        "type": "passive"
      },
      {
        "id": "alquimista_diagrama_pessoal",
        "name": "Diagrama pessoal",
        "desc": "Escolha uma vantagem ou técnica que você tem e gasta PM. Você pode levar consigo o diagrama necessário para usá-la (em um pergaminho, bordado na roupa, tatua- do no corpo...), sem precisar gastar um movimento para reduzir o custo. pode mudar seus atributos e vanta- gens livremente, como na vanta- gem Transformação — exceto que não pode mudar vez disso, você pode transmutar normal no fim da",
        "type": "transformation"
      }
    ]
  },
  {
    "id": "artista_marcial",
    "name": "Artista Marcial",
    "exigencias": "Luta",
    "nucleos": "Era das Arcas, Operação ARSENAL",
    "powers": [
      {
        "id": "artista_marcial_kata",
        "name": "Kata",
        "desc": "Quando seu ataque vence a defesa do alvo, você pode usar um movimento para aumentar o dano em 2 pontos. Se tiver mais movimen- tos neste turno, cada um adiciona mais 2 pontos.",
        "type": "passive"
      },
      {
        "id": "artista_marcial_montagem_de_treino",
        "name": "Montagem de treino",
        "desc": "Uma vez por sessão, antes de um combate im- portante, você pode fazer um teste de Luta (9, ou mais para oponentes muito mais fortes que você). Se tiver sucesso, aquela será a luta para a qual você vinha se preparando: você recebe Maestria (Luta) durante aquele combate. Se já tem a vanta- gem, pode escolher pagar 2PM para crítico com 4, 5 e 6.",
        "type": "per_session"
      },
      {
        "id": "artista_marcial_lutarei_para",
        "name": "Lutarei para",
        "desc": "Lutarei para conseguir! Sua arte marcial é versátil. Uma vez por cena, você pode usar Luta para subs- tituir qualquer outra perícia. Você pode pagar 3PM para cada nova utiliza- ção na mesma cena. SÁ Ás Advogado",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      }
    ]
  },
  {
    "id": "as_advogado",
    "name": "Ás Advogado",
    "exigencias": "Influência, Defesa Especial (Reflexão)",
    "nucleos": "Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "as_advogado_coleta_de_provas",
        "name": "Coleta de provas",
        "desc": "Quando tem um crítico em um teste de Influ- ência ou Saber, em vez de somar o atri- buto outra vez, você pode escolher pegar uma Prova (anote P, a lápis, em algum lugar da ficha). Você pode fazer isso até três vezes por cena. Em outros testes de Influência ou Saber, você pode gastar uma ou mais Provas; cada Prova concede um críti- co automático. Provas não usadas até o fim da cena são desqualificadas e perdidas.",
        "type": "buff"
      },
      {
        "id": "as_advogado_embargo",
        "name": "Embargo",
        "desc": "Você pode pagar 2PM para evitar todo o dano de um ataque, ou qualquer efeito negativo por falhar em um teste. Você pode fazer isso um número de vezes por sessão igual a seu Poder ou 5, o que for menor.",
        "type": "per_session"
      },
      {
        "id": "as_advogado_objecao__sua_defesa_espe_",
        "name": "Objeção! Sua Defesa Espe-",
        "desc": "Objeção! Sua Defesa Espe- cial (Reflexão) adiciona +2 ao dano contra o adversário. ED Atirador de Elite",
        "type": "passive"
      }
    ]
  },
  {
    "id": "atirador_de_elite",
    "name": "Atirador de Elite",
    "exigencias": "Manha; Alcance 2",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "atirador_de_elite_mira_perfeita",
        "name": "Mira perfeita",
        "desc": "Em cada cena, seu primeiro ataque contra cada alvo Longe ou mais impõe Perda na defesa do alvo.",
        "type": "passive"
      },
      {
        "id": "atirador_de_elite_posicao_vantajosa",
        "name": "Posição vantajosa",
        "desc": "Você pode gastar uma ação completa para se colocar em um ponto protegido, recebendo Ganho em testes de defesa contra ataques de Longe ou mais.",
        "type": "passive"
      },
      {
        "id": "atirador_de_elite_um_tiro__duas_mortes",
        "name": "Um tiro, duas mortes",
        "desc": "Quando reduz um oponente a 0PV com um ataque à distância (Longe ou mais), o mesmo projétil segue, rico- cheteia e atinge outro alvo à sua escolha, com a mesma rolagem de ataque, sem qualquer custo extra. Bárbaro",
        "type": "passive"
      }
    ]
  },
  {
    "id": "barbaro",
    "name": "Bárbaro",
    "exigencias": "Sobrevivência; Vigoroso",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "barbaro_espirito_livre",
        "name": "Espírito livre",
        "desc": "Se estiver conscien- te, você nunca é considerado indefeso.",
        "type": "passive"
      },
      {
        "id": "barbaro_frenesi_de_combate",
        "name": "Frenesi de combate",
        "desc": "Você pode gastar 3PM para invocar um frenesi que oferece P+3 (sem afetar seus Pontos de Ação) até o fim da cena. Quando o combate termina, você fica esgota- do e é considerado derrotado duran- te toda a cena seguinte.",
        "type": "buff",
        "costPM": 3
      },
      {
        "id": "barbaro_resistencia_superior",
        "name": "Resistência superior",
        "desc": "Para você a vantagem Vigoroso oferece R+3, em vez de +2. Caça-Prêmios",
        "type": "passive"
      }
    ]
  },
  {
    "id": "caca_premios",
    "name": "Caça-Prêmios",
    "exigencias": "Percepção, Manha ou Sobrevivência",
    "nucleos": "Guerra da Galáxia, Tormenta ALPHA",
    "powers": [
      {
        "id": "caca_premios_ataque_subjugante",
        "name": "Ataque subjugante",
        "desc": "Gaste 2PM antes de fazer um ataque. Se causar dano, o alvo tem Perda em testes de ataque e defesa até seu pró- ximo turno.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "caca_premios_contrato",
        "name": "Contrato",
        "desc": "Quando aceita um contrato para caçar um alvo, você rece- be a vantagem Inimi- go temporariamente para esse alvo.",
        "type": "passive"
      },
      {
        "id": "caca_premios_mural_de",
        "name": "Mural de",
        "desc": "Mural de recompensas. Você sempre tem Ga- nho em testes para con- seguir informações sobre procurados e suas recompensas, e também em tes- tes para rastrear o alvo de seu Con- trato.",
        "type": "passive"
      }
    ]
  },
  {
    "id": "card_gamer",
    "name": "CARD Gamer",
    "exigencias": "Magia, Mística, Utensílio.",
    "nucleos": "Era das Arcas, Tormenta ALPHA.",
    "powers": [
      {
        "id": "card_gamer_caiu_na_armadilha__uma_vez_por_cena__apos_um_oponente",
        "name": "Caiu na armadilha! Uma vez por cena, após um oponente",
        "desc": "Caiu na armadilha! Uma vez por cena, após um oponente realizar qualquer ação, você pode fazer um teste de Mística (6 + Habilidade do oponente). Se tiver sucesso, pode usar Magia ou uma técnica mágica que conheça como reação.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "card_gamer_carta_na_manga",
        "name": "Carta na manga",
        "desc": "Quando usa uma vantagem ou técnica que gasta PM, se você gastar +2PM, existe uma chance (resultado ímpar em 1D) de que o mesmo efeito aconteça outra vez em seu turno seguinte, sem custo adicional.",
        "type": "passive"
      },
      {
        "id": "card_gamer_escolha_uma_carta",
        "name": "Escolha uma carta",
        "desc": "Você invoca uma criatura. Gaste 1PM para receber um Ajudante até o fim da cena. Se tiver sucesso em um teste de Mística (9) você escolhe o tipo de ajudante; se falhar, o mestre escolhe. Você ainda deve pagar PM por cada utili- zação do Ajudante. Cavaleiro",
        "type": "buff",
        "costPM": 1
      }
    ]
  },
  {
    "id": "cavaleiro",
    "name": "Cavaleiro",
    "exigencias": "Resoluto ou Vigoroso; Código (qualquer)",
    "nucleos": "Era das Arcas, Tormenta ALPHA",
    "powers": [
      {
        "id": "cavaleiro_armadura_completa",
        "name": "Armadura completa",
        "desc": "Quando sofre um ataque, você pode escolher gastar 2PM para reduzir em –1 o resultado de cada dado do atacan- te. Se ele rolar um 4, por exemplo, conta como 3. Essa redução, inclusive, cancela acertos críticos. Você ainda faz seu teste de defesa normalmente.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "cavaleiro_forca_da_honra",
        "name": "Força da honra",
        "desc": "Você recebe um Ganho em qualquer teste, uma vez por cena, para cada Códi- go que você tem. Se violar qualquer de seus Códi- gos, não pode usar este poder até se redimir. (Note que você pode escolher ado- tar mais de dois Códigos, embora não receba pontos de personagem por estes.)",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "cavaleiro_inspirar_aliado",
        "name": "Inspirar aliado",
        "desc": "Você pode gastar 1PM e uma ação para inspirar um aliado que possa vê-lo. Ele recebe Ganho em um teste em seu próximo turno. Não é possível “guardar” Ganhos para depois. Celebridade",
        "type": "passive"
      }
    ]
  },
  {
    "id": "celebridade",
    "name": "Celebridade",
    "exigencias": "Famoso, Torcida",
    "nucleos": "Era das Arcas, Guerra da Galáxia, Operação ARSENAL",
    "powers": [
      {
        "id": "celebridade_grande_fama",
        "name": "Grande fama",
        "desc": "Você gasta 2PM, em vez de 3, para usar a vantagem Famoso.",
        "type": "passive"
      },
      {
        "id": "celebridade_ovacao",
        "name": "Ovação",
        "desc": "Quando está sob efeito de sua Torci- da, você pode gastar um tur- no para recuperar 1D Pontos de Mana.",
        "type": "passive"
      },
      {
        "id": "celebridade_rugido_das_mas_",
        "name": "Rugido das mas-",
        "desc": "Rugido das mas- sas. Além do Ganho recebi- do por Torcida, seu teste cau- sa um acerto crítico com 5 ou 6. Cientista",
        "type": "passive"
      }
    ]
  },
  {
    "id": "cientista",
    "name": "Cientista",
    "exigencias": "Saber",
    "nucleos": "Era das Arcas, Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "cientista_eureka__voce_pode_pro_",
        "name": "Eureka! Você pode pro-",
        "desc": "Eureka! Você pode pro- duzir um invento ou método capaz de resol- ver um problema. Uma vez por sessão, com um mo- vimento e 3PM, você adquire uma vantagem de custo 1pt à sua escolha, até o fim da cena. Você ainda deve pagar quaisquer outros custos da vantagem esco- lhida.",
        "type": "per_session",
        "costPM": 3
      },
      {
        "id": "cientista_metodo_cientifico",
        "name": "Método científico",
        "desc": "Você enxerga padrões nos eventos ao redor. Uma vez por cena, pode usar Sa- ber para substituir qualquer outra perí- cia. Você pode pagar 3PM para cada nova utilização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "cientista_pesquisa",
        "name": "Pesquisa",
        "desc": "Você pode gastar um movi- mento e 1PM para fazer um teste de Saber (9) e des- cobrir informações sobre um personagem na cena. Escolha: atributos, perícias, vantagens, desvanta- gens, técnicas ou itens. A critério do mestre, você também pode descobrir outros segredos. Clérigo",
        "type": "buff",
        "costPM": 1
      }
    ]
  },
  {
    "id": "clerigo",
    "name": "Clérigo",
    "exigencias": "Devoto",
    "nucleos": "Era das Arcas, Tormenta ALPHA, UniPotência",
    "powers": [
      {
        "id": "clerigo_devoto_fervoroso",
        "name": "Devoto fervoroso",
        "desc": "Você pode usar a vantagem Devoto até três vezes por cena, em vez de duas.",
        "type": "passive"
      },
      {
        "id": "clerigo_dom_divino",
        "name": "Dom divino",
        "desc": "Sua divindade permite realizar milagres mágicos variados. Uma vez por cena, com um movimento e 3PM, você adquire uma perícia ou vantagem de custo 1pt à sua es- colha, até o fim da cena. Você ainda deve pagar outros custos da van- tagem escolhida.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "clerigo_poder_concedido",
        "name": "Poder concedido",
        "desc": "Escolha uma vantagem entre as seguintes: Anulação, Confusão, Cura, Defesa Especial (qualquer), Magia, Paralisia. Se tiver essa van- tagem (ou a escolheu como Dom Divino), você pode usá-la sem gastar PM uma vez por cena. AD Cosmonauta da",
        "type": "per_scene",
        "maxUsesPerScene": 1
      }
    ]
  },
  {
    "id": "agente_da_ordem",
    "name": "Agente da ORDEM",
    "exigencias": "Patrono, Inimigo (aliens)",
    "nucleos": "Guerra da Galáxia",
    "powers": [
      {
        "id": "agente_da_ordem_primeiro_contato",
        "name": "Primeiro contato",
        "desc": "Você é treina- do para enfrentar o desconhecido. Pode gastar 2PM para receber +3 em qualquer teste de Sa- ber ou Sobrevivência.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "agente_da_ordem_inimigo_meu",
        "name": "Inimigo meu",
        "desc": "Você pode usar a vantagem Inimigo para se- res extraterrestres que nunca viu antes. Apesar do nome, também afeta testes para interações sociais amistosas e prestação de ajuda.",
        "type": "passive"
      },
      {
        "id": "agente_da_ordem_sensores_avancados",
        "name": "Sensores avançados",
        "desc": "Você pode pagar 2PM para adquirir um Senti- do à sua escolha, para um único teste. Curandeiro",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "curandeiro",
    "name": "Curandeiro",
    "exigencias": "Medicina; Cura",
    "nucleos": "Era das Arcas, UniPotência, Tormenta ALPHA",
    "powers": [
      {
        "id": "curandeiro_paramedico",
        "name": "Paramédico",
        "desc": "Você pode curar 1D Pontos de Vida com uma ação e um teste de Medi- cina (9).",
        "type": "passive"
      },
      {
        "id": "curandeiro_cura_critica",
        "name": "Cura crítica",
        "desc": "Sem- pre que você rola 6 em um dado de Cura, pode rolar um dado extra. Isso também vale para os dados extras.",
        "type": "passive"
      },
      {
        "id": "curandeiro_explosao_de_cura",
        "name": "Explosão de cura",
        "desc": "Uma vez por cena, você pode usar sua Cura em capacidade máxima (1D para cada ponto de Habilidade) sem gastar PM. Detetive",
        "type": "per_scene",
        "maxUsesPerScene": 1
      }
    ]
  },
  {
    "id": "detetive",
    "name": "Detetive",
    "exigencias": "Manha, Percepção",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "detetive_elementar__uma_vez",
        "name": "Elementar! Uma vez",
        "desc": "Elementar! Uma vez por cena, você pode usar Percep- ção para substituir qualquer outra perícia. Você pode pa- gar 3PM para cada nova uti- lização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "detetive_obter_informa_",
        "name": "Obter informa-",
        "desc": "Obter informa- ção. Quando tem um crítico em um teste de Manha ou Percepção, em vez de somar o atributo outra vez, você pode escolher obter uma Pista (anote P, a lápis, em algum lugar da ficha). Você pode fazer isso até três vezes por cena. Em outros testes de Manha ou Percepção, você pode gastar uma ou mais Pistas; cada Pista concede um crítico automático. Pis- tas não usadas até o fim da cena esfriam e são perdidas.",
        "type": "buff"
      },
      {
        "id": "detetive_caso_encerrado",
        "name": "Caso encerrado",
        "desc": "Em sua presença, inimigos derrotados permanecem nessa condição até o fim da cena, mesmo se re- cuperam PV.",
        "type": "buff"
      }
    ]
  },
  {
    "id": "cuperam_pv_",
    "name": "cuperam PV.",
    "exigencias": "P3, Ataque Especial (qualquer)",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "cuperam_pv__estilo_de_combate",
        "name": "Estilo de combate",
        "desc": "Escolha entre melee ou ranged. Você recebe Especialização (Luta) para atacar Perto (me- lee) ou Longe e além (ranged). No entanto, é considerado Inapto para qualquer defesa e para ataques no estilo não escolhido.",
        "type": "passive"
      },
      {
        "id": "cuperam_pv__ataque_gra_",
        "name": "Ataque gra-",
        "desc": "Ataque gra- tuito. Uma vez por cena, você pode usar um Ataque Especial sem gastar PM.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "cuperam_pv__ultimo_recurso",
        "name": "Último recurso",
        "desc": "Quan- do você está perto da derrota, to- dos os seus ataques no estilo escolhido têm Ganho. Druida",
        "type": "passive"
      }
    ]
  },
  {
    "id": "druida",
    "name": "Druida",
    "exigencias": "Animais; Ajudante, Transformação; Código Dahllan",
    "nucleos": "Era das Arcas, Guerra da Galáxia, Operação ARSENAL",
    "powers": [
      {
        "id": "druida_forma_selvagem",
        "name": "Forma selvagem",
        "desc": "Sua Transformação permite mudar para várias feras poderosas com habilidades diferentes. Cada vez que muda para sua segunda forma, escolha duas vantagens extras entre as seguintes, sem custo: Aceleração, Ágil, Alcance 1, Forte, Imune (Anfíbio, Doenças ou Re- siliente), +Membros, Paralisia, Regeneração, Sentido (Aguçado, Infravisão ou Radar), Vigoroso, Voo.",
        "type": "transformation"
      },
      {
        "id": "druida_irmaos_selvagens",
        "name": "Irmãos selvagens",
        "desc": "Onde você estiver, animais (e plantas!) surgem para ajudá-lo. Você pode mudar seu Ajudante para um tipo diferente no início de cada cena.",
        "type": "passive"
      },
      {
        "id": "druida_dadiva_da_natureza",
        "name": "Dádiva da natureza",
        "desc": "Animais (e plantas!) ajudam em suas tarefas. Uma vez por cena, você pode usar Animais para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova uti- lização na mes- ma cena. Código Dahllan (–1 pt) Não consumir produ- tos de origem animal. Nun- ca atacar um animal, nem deixar de prestar ajuda a um animal em dificuldade. Elementalista",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      }
    ]
  },
  {
    "id": "elementalista",
    "name": "Elementalista",
    "exigencias": "Magia, Ambiente, Fraqueza",
    "nucleos": "Era das Arcas, Tormenta ALPHA, UniPotência",
    "powers": [
      {
        "id": "elementalista_ambiente_elemental",
        "name": "Ambiente elemental",
        "desc": "Seu elemento escolhido é seu Ambien- te. A desvantagem segue suas regras normais (ao rolar 1 em 1D, Perda em to- dos os testes). No entanto, se rolar 6, seu elemento existe em abundância na cena; você tem direito a uma utilização de Magia sem gastar PM.",
        "type": "passive"
      },
      {
        "id": "elementalista_elemento_pri_",
        "name": "Elemento pri-",
        "desc": "Elemento pri- mordial. Você sabe contro- lar seu elemento para conse- guir efeitos variados. Uma vez por sessão, com um movimento e 3PM, você adquire uma perícia ou vantagem de custo 1pt à sua escolha, até o fim da cena. Você ainda deve pagar quaisquer outros custos da vantagem escolhida.",
        "type": "per_session",
        "costPM": 3
      },
      {
        "id": "elementalista_moldar_essencia",
        "name": "Moldar essência",
        "desc": "Na primeira rodada de cada cena, você pode mudar seus atributos e perí- cias livremente — mas não vantagens, desvantagens e técnicas. Você reverte à forma normal no fim da cena. Fraqueza Elemental (–1-2 pt) Escolha um elemento oposto, diferente do seu, como sua Fraqueza. Decida se é comum ou inco- mum. A desvantagem segue suas regras nor- mais (Perda em todos os testes se estiver Perto). Engenheiro Mecha",
        "type": "passive"
      }
    ]
  },
  {
    "id": "engenheiro_mecha",
    "name": "Engenheiro Mecha",
    "exigencias": "Máquinas; Utensílio (ferramentas)",
    "nucleos": "Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "engenheiro_mecha_a_ferramenta_certa",
        "name": "A ferramenta certa",
        "desc": "Não há problema que algumas marteladas não re- solvam. Uma vez por cena, você pode usar Máquinas para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "engenheiro_mecha_engenheiro",
        "name": "Engenheiro",
        "desc": "Engenheiro de campo. Você pode criar ou improvisar apare- lhos na hora. Se bem-sucedido em um teste de Máquinas (9), gaste 1PM para ter um Ajudante de tipo à sua escolha, até o fim da cena. Você ainda deve pagar PM por cada utili- zação do Ajudante.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "engenheiro_mecha_martelinho_de_ouro",
        "name": "Martelinho de ouro",
        "desc": "Você pode gastar uma ação para fazer um teste de Máquinas (9). Se bem-sucedido, cura 2D PVs em um personagem cons- truto Perto, ou soma 1D ao seu próximo teste. (Esse persona- gem pode ser você, caso seja um construto.) Entidade Exilada",
        "type": "passive"
      }
    ]
  },
  {
    "id": "entidade_exilada",
    "name": "Entidade Exilada",
    "exigencias": "nenhuma.",
    "nucleos": "Era das Arcas, Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "entidade_exilada_nao_conheci_o_outro",
        "name": "Não conheci o outro",
        "desc": "Não conheci o outro mundo por querer! Em testes de morte, você pode rolar 1D extra e descartar o dado mais baixo.",
        "type": "passive"
      },
      {
        "id": "entidade_exilada_sorte_extraplanar",
        "name": "Sorte extraplanar",
        "desc": "Seus dons incomuns funcionam na hora certa. Uma vez por ses- são, você pode usar uma vantagem, técnica ou Energia youkai (a seguir) sem gastar PM.",
        "type": "passive"
      },
      {
        "id": "entidade_exilada_energia_youkai",
        "name": "Energia youkai",
        "desc": "Você pode usar uma ação para gastar qualquer quantidade de PM e curar PV, em você mesmo ou alguém com quem tenha Elo Mental. Cada 2PM curam 1PV. Estudante",
        "type": "passive"
      }
    ]
  },
  {
    "id": "estudante",
    "name": "Estudante",
    "exigencias": "Qualquer perícia; Mentor",
    "nucleos": "Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "estudante_hora_do_intervalo",
        "name": "Hora do intervalo",
        "desc": "Após uma cena de conflito, você recebe uma refeição básica (Ganho em um único teste, à sua escolha, até o fim do dia). Você não re- cebe uma nova refeição antes de consumir a anterior.",
        "type": "passive"
      },
      {
        "id": "estudante_prova_real",
        "name": "Prova real",
        "desc": "Você pode pa- gar 2PM para rolar 1D extra em um teste de perícia que possua, e descartar o resultado mais baixo.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "estudante_quem_nao_cola",
        "name": "Quem não cola",
        "desc": ".. Você pode usar a vantagem Mentor uma segunda vez por cena.",
        "type": "passive"
      }
    ]
  },
  {
    "id": "exercito_da_luz",
    "name": "Exército da Luz",
    "exigencias": "Patrono",
    "nucleos": "Guerra da Galáxia",
    "powers": [
      {
        "id": "exercito_da_luz_artilha_",
        "name": "Artilha-",
        "desc": "Artilha- ria total. Uma vez por cena, você pode fa- zer um Ataque Especial de até 3pt à sua esco- lha. Você ainda deve pagar seu cus- to em PM.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "exercito_da_luz_armadura_radiante",
        "name": "Armadura radiante",
        "desc": "Por seu treino rigoroso e tecnologias de proteção, você adiciona 1D a qualquer teste para resistir a efeitos nocivos (in- cluindo testes de defesa), descartando o dado mais baixo.",
        "type": "passive"
      },
      {
        "id": "exercito_da_luz_ombro_a_ombro",
        "name": "Ombro a ombro",
        "desc": "Você pode gastar 2PM para conce- der Ganho a um teste de um alia- do Perto. Experimento",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "experimento",
    "name": "Experimento",
    "exigencias": "Imune; +Mana ou +Vida",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL",
    "powers": [
      {
        "id": "experimento_adaptacao",
        "name": "Adaptação",
        "desc": "Você tem duas formas de imunidade pela vantagem Imune, em vez de uma.",
        "type": "passive"
      },
      {
        "id": "experimento_bioenergia",
        "name": "Bioenergia",
        "desc": "Em vez de +10, você recebe +15PM ou +15PV pela vantagem +Mana ou +Vida (escolha uma).",
        "type": "passive"
      },
      {
        "id": "experimento_mutacao",
        "name": "Mutação",
        "desc": "Escolha um atributo. Sempre que faz um teste com o atributo escolhido, você pode pagar 2PM para rolar 1D extra e descartar o dado mais baixo. Gatuno Galante",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "gatuno_galante",
    "name": "Gatuno Galante",
    "exigencias": "Manha; Ágil, Carismático ou Gênio",
    "nucleos": "Era das Arcas, Tormenta ALPHA",
    "powers": [
      {
        "id": "gatuno_galante_ardiloso",
        "name": "Ardiloso",
        "desc": "Você pode pagar 3PM para ter os benefícios da vantagem Con- fusão, Invisível, Inofensivo ou Telepa- ta durante um turno. Você ainda deve pagar outros custos em PM se houver.",
        "type": "buff",
        "costPM": 3
      },
      {
        "id": "gatuno_galante_reconhecimento_de",
        "name": "Reconhecimento de",
        "desc": "Reconhecimento de terreno. Uma vez por sessão, por ter investigado o lugar antes, você pode escolher o local de uma cena como Arena.",
        "type": "per_session"
      },
      {
        "id": "gatuno_galante_um_passo_a",
        "name": "Um passo à",
        "desc": "Um passo à frente. O gatuno esca- pa do veneno porque já to- mou o antídoto! Você pode gastar 2PM para ter Ganho em um teste para evitar qualquer efeito negativo (exceto dano). Você pode fazer isso um número de vezes por cena igual à sua Habilidade.",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "gigante_da_luz",
    "name": "Gigante da Luz",
    "exigencias": "Transformação; Código do Combate e Heróis",
    "nucleos": "Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "gigante_da_luz_poder_interior",
        "name": "Poder interior",
        "desc": "Sua forma original é aprimorada. Escolha entre Forte, Ágil ou Vigoroso. Esta vantagem também se aplica à segunda forma.",
        "type": "passive"
      },
      {
        "id": "gigante_da_luz_transformacao_gigante",
        "name": "Transformação gigante",
        "desc": "Você tem uma segunda forma, seguindo as regras normais desta vantagem, exceto que tam- bém eleva sua escala para Kiodai até o fim da cena. Esta for- ma também recebe as vantagens Alcance (uma variedade de raios e lâminas de energia), Golpe Final e Voo, sem custo. Um sinal piscante avi- sa quando você está perto da derrota, e você reverte para a forma normal caso seja der- rotado. Esta Transformação não pode ser executada se não existir adversário de escala Kiodai em cena, nem em caso de violação dos Códigos.",
        "type": "transformation"
      },
      {
        "id": "gigante_da_luz_transformacao",
        "name": "Transformação",
        "desc": "Transformação menor. Você pode adotar sua segunda forma em tama- nho normal, com as mesmas vantagens, poderes e limita- ções, mas sem mudar de escala. Guerreira Mágica",
        "type": "transformation"
      }
    ]
  },
  {
    "id": "guerreira_magica",
    "name": "Guerreira Mágica",
    "exigencias": "Mística; Magia",
    "nucleos": "Era das Arcas, UniPotência",
    "powers": [
      {
        "id": "guerreira_magica_auxilio_magico",
        "name": "Auxílio mágico",
        "desc": "Quando usa Magia para emular efeitos de vantagens (veja em +Magia), você gasta PM igual ao custo da vantagem (em vez de x3) para Ataque Especial (qualquer), Ajudante (qualquer), Alcance e Mentor.",
        "type": "passive"
      },
      {
        "id": "guerreira_magica_punirei_voce__contra_um_alvo_perto",
        "name": "Punirei você! Contra um alvo perto",
        "desc": "Punirei você! Contra um alvo perto da derrota, seu custo em PM para Magia cai pela metade. Apesar do nome, você tam- bém pode usar este poder para ajudar alia- dos em perigo.",
        "type": "buff"
      },
      {
        "id": "guerreira_magica_transformacao_radiante",
        "name": "Transformação radiante",
        "desc": "Você pode gastar um movimento para vestir seu traje mágico de combate (com musiquinha e coreografia). Nesta for- ma, pode gastar 2PM para ter Ganho em um teste de Mística, e testes para descobrir sua verdadeira iden- tidade sofrem Perda. A transfor- mação dura até o fim da cena. Guerreiro",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "guerreiro",
    "name": "Guerreiro",
    "exigencias": "Luta; Ataque Especial ou Defesa Especial",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "guerreiro_lutar_e_tudo__quando",
        "name": "Lutar é tudo! Quando",
        "desc": "Lutar é tudo! Quando faz um teste de Luta, você pode gas- tar 2PM para adicionar +3 ao resul- tado, após a rolagem (antes do opo- nente rolar a defesa).",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "guerreiro_manobra_especial",
        "name": "Manobra especial",
        "desc": "Uma vez por cena, você pode usar um Ataque ou Defesa Especial sem gastar PM.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "guerreiro_sem_parar",
        "name": "Sem parar",
        "desc": "Quando reduz um oponente a 0PV de forma violen- ta, você pode imediata- mente fazer um ataque contra outro oponente ao alcance. Herói Sentai",
        "type": "passive"
      }
    ]
  },
  {
    "id": "heroi_sentai",
    "name": "Herói Sentai",
    "exigencias": "Elo Mental, Golpe Final, Patrono.",
    "nucleos": "Era das Arcas, Guerra da Galáxia, UniPotência.",
    "powers": [
      {
        "id": "heroi_sentai_hora_de_sincronizar",
        "name": "Hora de sincronizar",
        "desc": "Seu Elo Mental funciona com todos os seus aliados (no máximo 5). Eles não precisam ter também esta vantagem, mas recebem seus benefícios.",
        "type": "passive"
      },
      {
        "id": "heroi_sentai_soltar_faisca",
        "name": "Soltar faísca",
        "desc": "Quando você sofre dano, pode escolher pagar 1PM para anular 3 pontos de dano.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "heroi_sentai_finalizacao",
        "name": "Finalização",
        "desc": "Quando você executa um Golpe Final, cada alia- do pode escolher pagar 3PM para somar seu próprio Poder a esse ataque. Idol",
        "type": "buff",
        "costPM": 3
      }
    ]
  },
  {
    "id": "idol",
    "name": "Idol",
    "exigencias": "Arte; Carismática, Famosa",
    "nucleos": "Era das Arcas, Operação ARSENAL",
    "powers": [
      {
        "id": "idol_seu_sorriso",
        "name": "Seu sorriso",
        "desc": ".. Para você a vantagem Ca- rismática oferece P+3, em vez de +2.",
        "type": "passive"
      },
      {
        "id": "idol__e_tao_resplan_",
        "name": "…É tão resplan-",
        "desc": "…É tão resplan- decente! Você faz tudo de forma artística. Uma vez por cena, você pode usar Arte para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "idol_me_de_a_mao__em_caso",
        "name": "Me dê a mão! Em caso",
        "desc": "Me dê a mão! Em caso de sucesso em um teste de Arte (9), você pode gastar um movimento e 1PM para con- ceder Ganho a um aliado que consiga ver e ouvir você. Ilusionista",
        "type": "buff",
        "costPM": 1
      }
    ]
  },
  {
    "id": "ilusionista",
    "name": "Ilusionista",
    "exigencias": "Arte, Mística ou Telepata; Ilusão",
    "nucleos": "Era das Arcas, Tormenta ALPHA, UniPotência",
    "powers": [
      {
        "id": "ilusionista_gambito_ilusorio",
        "name": "Gambito ilusório",
        "desc": "Seus ini- migos não sabem quando atacam você ou uma ilusão! Uma vez por rodada, você pode gastar 1PM para ter Ganho em um teste de defesa.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "ilusionista_glamour",
        "name": "Glamour",
        "desc": "Você pode usar seus poderes para mudar a própria apa- rência (Ganho em testes de Manha) ou a aparência de aliados e objetos, conforme os limites de tama- nho normais para Ilusão. Essas ilusões se movem juntamente com seus alvos e não gastam movimentos do ilusionista.",
        "type": "passive"
      },
      {
        "id": "ilusionista_ilusao_autono_",
        "name": "Ilusão autôno-",
        "desc": "Ilusão autôno- ma. Você pode criar uma ilusão que age sozinha, sem gastar seus movi- mentos (mas você ain- da precisa ser capaz de vê-la), pelo custo nor- mal em PM. Você pode manter ativa apenas uma ilusão deste tipo. No entan- to, você ainda é livre para criar outras ilusões. Impostor",
        "type": "passive"
      }
    ]
  },
  {
    "id": "impostor",
    "name": "Impostor",
    "exigencias": "Influência; Imitar",
    "nucleos": "Era das Arcas, Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "impostor_disfarce_perfeito",
        "name": "Disfarce perfeito",
        "desc": "Com um mo- vimento e 3PM, você pode assumir a aparência de qualquer pessoa ou criatura que conhe- ça ou consiga ver (para alvos que não conheça, use a vantagem Imitar). É impossível enxergar através de seu disfarce, exceto com Telepatia ou Sentidos, e mesmo assim o teste de Percepção tem Perda.",
        "type": "passive"
      },
      {
        "id": "impostor_engenheiro_social",
        "name": "Engenheiro social",
        "desc": "Uma vez por cena, você pode usar Influência para substi- tuir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mes- ma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "impostor_jogo_da_imitacao",
        "name": "Jogo da imitação",
        "desc": "Você pode copiar e manter duas vantagens por vez com Imitar, em vez de uma. Intendente",
        "type": "passive"
      }
    ]
  },
  {
    "id": "intendente",
    "name": "Intendente",
    "exigencias": "Arte ou Sobrevivência; Improviso",
    "nucleos": "Quais ele quiser.",
    "powers": [
      {
        "id": "intendente_excelencia",
        "name": "Excelência",
        "desc": "Quando consegue um crí- tico em um teste de perícia que possua (incluindo perícias aprendidas com Improviso), você pode gastar 3PM para somar o atributo no teste mais uma vez.",
        "type": "buff",
        "costPM": 3
      },
      {
        "id": "intendente_housekeeping",
        "name": "Housekeeping",
        "desc": "Você é es- pecialista em economia doméstica e administração de recursos. Por 3PM, escolha um número máximo de aliados voluntários (incluindo você, se quiser) igual à sua Habilidade. Eles somam seus PM atuais. Esse total é compartilhado por todos até o fim da cena, ou até você ser derrotado. Se o efeito acaba, os PM restantes são divididos igual- mente (arredonde para baixo).",
        "type": "buff",
        "costPM": 3
      },
      {
        "id": "intendente_sempre_a_pos_",
        "name": "Sempre a pos-",
        "desc": "Sempre a pos- tos. Você gasta 2PM (em vez de 3) para aprender perícias com Improviso. Além disso, pode manter até duas perícias ao mesmo tempo. Ladino",
        "type": "passive"
      }
    ]
  },
  {
    "id": "ladino",
    "name": "Ladino",
    "exigencias": "Manha; Ágil ou Gênio",
    "nucleos": "Era das Arcas, Tormenta ALPHA",
    "powers": [
      {
        "id": "ladino_ataque_furtivo",
        "name": "Ataque furtivo",
        "desc": "Quando ataca um alvo desprevenido, você pode gastar 2PM para reduzir em –1 sua Resistência para defesa. Você tam- bém pode gastar +1PM para fazer um ataque furtivo contra um alvo envol- vido em combate com um aliado.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "ladino_malandragem",
        "name": "Malandragem",
        "desc": "Para tudo se dá um jeitinho. Uma vez por cena, você pode usar Manha para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "ladino_trapaca",
        "name": "Trapaça",
        "desc": "Ao usar um poder surpreendente (veja em +Ação!!!), você pode gas- tar 1 Ponto de Ação para ter qualquer vantagem (mesmo aquelas que custam mais de 1pt). Maginauta",
        "type": "passive"
      }
    ]
  },
  {
    "id": "maginauta",
    "name": "Maginauta",
    "exigencias": "Magia, Mística",
    "nucleos": "Era das Arcas, Tormenta ALPHA, UniPotência",
    "powers": [
      {
        "id": "maginauta_imersao",
        "name": "Imersão",
        "desc": "Você usa uma ação completa e 2PM para imergir a consciência no magiespaço. Enquanto está ali seu corpo físico fica imóvel e indefeso, mas você sempre tem Ganho em testes de Mística, a vantagem Magia (e técnicas que a tenham como requisito) gasta metade dos PM, e pode afetar alvos até Muito Longe sem penalidade. No entanto, não pode interagir sem usar Magia com nenhum personagem ou objeto. Manter a imersão custa 1PM por rodada, e pode encerrá-la com um movimento.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "maginauta_interferencia",
        "name": "Interferência",
        "desc": "Você pode usar uma ação e 2PM para conceder Ganho ou causar Perda em um teste de Mística de outro personagem, que seja feito até seu próximo turno. No magiespaço, este poder gasta apenas um movimento.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "maginauta_sobrecarga",
        "name": "Sobrecarga",
        "desc": "Você sobrecarrega suas magias até quase estou- rar. Ao usar Magia, faça um teste de Mística (9). Com sucesso, recebe +2 no teste afetado. Cada crítico aumenta em +1. Em caso de falha a magia não tem efeito, mas ainda gasta PM (falha crítica gasta o dobro). Mago",
        "type": "passive"
      }
    ]
  },
  {
    "id": "mago",
    "name": "Mago",
    "exigencias": "Mística; Magia",
    "nucleos": "Era das Arcas, UniPotência, Tormenta ALPHA",
    "powers": [
      {
        "id": "mago_aptidao_magica",
        "name": "Aptidão mágica",
        "desc": "Seu bônus máximo da vantagem Magia é H+2 (em vez de H).",
        "type": "passive"
      },
      {
        "id": "mago_bateria_de_mana",
        "name": "Bateria de mana",
        "desc": "Uma vez por cena, você pode usar uma ação completa para recuperar 1D+H PM.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "mago_preparar_magias",
        "name": "Preparar magias",
        "desc": "Sempre que estiver com Pon- tos de Mana completos (tipi- camente após um descanso) e não envolvido em conflito, você pode escolher deixar certas magias preparadas, otimizando o gasto de mana. Faça uma lista com os efeitos de Magia que preferir (por exemplo, +2 em ataque, +3 em defesa, +2 em uma perícia...). Você gasta me- tade dos PM para preparar essas magias. Elas não podem ser mudadas, e seus PM não podem ser recuperados, até você usá-las. Menestreamer",
        "type": "buff"
      }
    ]
  },
  {
    "id": "menestreamer",
    "name": "Menestreamer",
    "exigencias": "Arte, Influência ou Carismático; Famoso",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "menestreamer_inspirar",
        "name": "Inspirar",
        "desc": "Você pode gastar um movimento e 3PM para conceder Ganho ao teste de perí- cia de um aliado Perto ou Longe. Esse teste deve ser realizado até o próximo turno do aliado; não é possível “guardar” para depois. Se já tiver este poder (pelo arquétipo Ce- lestial ou outra fonte), o custo cai para 1PM.",
        "type": "buff",
        "costPM": 3
      },
      {
        "id": "menestreamer_e_meu_amigo__menes",
        "name": "É meu amigo! Menes",
        "desc": "É meu amigo! Menes transformam seus companheiros em celebridades. Você pode pagar 1PM para conceder a um aliado os benefícios da vantagem Famoso durante uma cena.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "menestreamer_audiencia_generosa",
        "name": "Audiência generosa",
        "desc": "Com um tes- te de Arte ou Influência (9), o menestreamer pode arrecadar doações de seus seguidores para ter Ga- nho em um teste de compra. Mercenário",
        "type": "passive"
      }
    ]
  },
  {
    "id": "mercenario",
    "name": "Mercenário",
    "exigencias": "Devoto, Patrono, Código",
    "nucleos": "Era das Arcas, Guerra da Galáxia, Operação ARSENAL",
    "powers": [
      {
        "id": "mercenario_nem_morto",
        "name": "Nem morto",
        "desc": "Você não morre sem cumprir a missão. Enquanto tiver um contrato, sempre que fizer um teste de morte, role +1D e descarte o menor resultado.",
        "type": "passive"
      },
      {
        "id": "mercenario_melhor_no_que_faz",
        "name": "Melhor no que faz",
        "desc": "Você é devotado a cumprir seus con- tratos. Pode usar Devoto até três vezes por cena, em vez de duas.",
        "type": "passive"
      },
      {
        "id": "mercenario_trato_feito",
        "name": "Trato feito",
        "desc": "No início de cada sessão, se não houver violação do Código (veja a seguir), você pode escolher mudar de Patrono, re- presentando seu contratante atual. Além disso, em testes de compra para o Patro- no, some +3 ao resultado final. Código do Merce- nário (–1pt) Jamais trair seu Patrono. Jamais falhar em cumprir uma missão para seu Patrono. Este Código pode ser adqui- rido apenas por personagens com Patrono. Mestre-Cuca",
        "type": "passive"
      }
    ]
  },
  {
    "id": "mestre_cuca",
    "name": "Mestre-Cuca",
    "exigencias": "Arte ou Sobrevivência",
    "nucleos": "Era das Arcas, UniPotência",
    "powers": [
      {
        "id": "mestre_cuca_talento_culinario",
        "name": "Talento culinário",
        "desc": "Você recebe +3 em todos os testes de Arte e Sobrevivência para prepa- rar refeições.",
        "type": "passive"
      },
      {
        "id": "mestre_cuca_prato_mila_",
        "name": "Prato mila-",
        "desc": "Prato mila- groso. Uma vez por ses- são, quando prepara uma refeição, você pode gastar Pontos de Ação para conce- der uma vantagem (veja em +Ação!!!) como poder surpreen- dente a você mesmo ou um aliado, pela duração do efeito do prato.",
        "type": "passive"
      },
      {
        "id": "mestre_cuca_despensa_cheia",
        "name": "Despensa cheia",
        "desc": "Você começa cada sessão com um número de refeições básicas igual à sua Habilidade. Você pode trocar três refeições básicas por uma refeição gourmet, ou cinco básicas por uma refeição do chef que já conheça. Monge",
        "type": "passive"
      }
    ]
  },
  {
    "id": "monge",
    "name": "Monge",
    "exigencias": "Ágil; Resoluto ou Vigoroso; 1ª Lei de Asimov",
    "nucleos": "Era das Arcas, Operação ARSENAL",
    "powers": [
      {
        "id": "monge_agilidade_superior",
        "name": "Agilidade superior",
        "desc": "Para você a vantagem Ágil oferece H+3, em vez de +2.",
        "type": "passive"
      },
      {
        "id": "monge_alma_de_aco",
        "name": "Alma de aço",
        "desc": "Sempre que faz um teste de R (incluindo defesas), você pode gastar 1PM para aumentar em +1 o resultado de um dado. Esse poder não provoca acertos críticos, mas anula falhas críticas.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "monge_controle_dos",
        "name": "Controle dos",
        "desc": "Controle dos chakras. Em situação de conflito, você pode gastar um turno completo para recuperar 1D+H PV ou 1D+H PM. Você pode usar este poder apenas se tiver pelo menos 1PV e 1PM. Motoqueiro Mascarado",
        "type": "passive"
      }
    ]
  },
  {
    "id": "cavaleiro_mascarado",
    "name": "Cavaleiro Mascarado",
    "exigencias": "Luta; Ajudante (Montaria)",
    "nucleos": "Guerra da Galáxia, UniPotência, Operação ARSENAL",
    "powers": [
      {
        "id": "cavaleiro_mascarado_henshin",
        "name": "Henshin",
        "desc": "Você pode gastar um movimento para invocar sua más- cara e traje de combate, ou abandonar seu disfarce humano e reverter para sua forma verdadeira. Nesta forma, pode gastar 2PM para ter Ganho em um teste de Luta, e testes para descobrir sua verdadeira identidade sofrem Perda. A transformação dura até o fim da cena.",
        "type": "transformation"
      },
      {
        "id": "cavaleiro_mascarado_moto_de_batalha",
        "name": "Moto de batalha",
        "desc": "Você pode pagar 2PM para que seu ajudan- te atue como Lutador, em vez de Montaria.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "cavaleiro_mascarado_ate_o_fim",
        "name": "Até o fim",
        "desc": "Você não sofre Perda e pode seguir lu- tando normalmente quando está derrotado. Você ainda pode mor- rer se receber dano nesse estado. Necromante",
        "type": "passive"
      }
    ]
  },
  {
    "id": "necromante",
    "name": "Necromante",
    "exigencias": "Mística; Magia",
    "nucleos": "Era das Arcas, Tormenta ALPHA, UniPotência",
    "powers": [
      {
        "id": "necromante_criar_morto_vivo",
        "name": "Criar morto-vivo",
        "desc": "Você conjura servos desmortos. Se bem- -sucedido em um teste de Mística (9), gaste 1PM para receber um Ajudante de tipo à sua escolha, até o fim da cena. Você ainda deve pagar PM por cada utilização do Ajudante.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "necromante_energia_negativa",
        "name": "Energia negativa",
        "desc": "Suas vantagens de cura (incluindo um Ajudante Curandeiro) funcionam em seres Sem Vida* (mas não se aplica a descanso ou itens).",
        "type": "passive"
      },
      {
        "id": "necromante_fortificar_morto_vivo",
        "name": "Fortificar morto-vivo",
        "desc": "Você gasta –1PM (mínimo 1) para usar Magia em seres Sem Vida*. *Incluindo você mesmo, se tiver essa desvantagem. O mestre pode ve- tar casos em que isso não se aplica, como ciborgues e construtos; ou fazer exceções, como vampiros. Negociador",
        "type": "passive"
      }
    ]
  },
  {
    "id": "negociador",
    "name": "Negociador",
    "exigencias": "Influência, Carismático",
    "nucleos": "Era das Arcas, Guerra da Galáxia, UniPotência",
    "powers": [
      {
        "id": "negociador_argumentacao",
        "name": "Argumentação",
        "desc": "Uma vez por cena, você pode usar Influência para substituir qualquer outra perícia. Você pode pa- gar 3PM para cada nova utilização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "negociador_empatia",
        "name": "Empatia",
        "desc": "Você entende e questiona as motivações dos outros. Pode pagar 2PM para anu- lar um Ganho em um teste de Poder (incluindo combate) realizado contra você.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "negociador_palavras_de_conforto",
        "name": "Palavras de conforto",
        "desc": "Sempre que qualquer poder de cura é utilizado em sua presença, o teste tem Ganho ou recupera +2PV. Ninja",
        "type": "passive"
      }
    ]
  },
  {
    "id": "ninja",
    "name": "Ninja",
    "exigencias": "Manha; Mentor",
    "nucleos": "Era das Arcas, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "ninja_mestre_ninja",
        "name": "Mestre ninja",
        "desc": "Você tem Ganho em dois testes de perícia por cena pela vantagem Mentor, em vez de um.",
        "type": "passive"
      },
      {
        "id": "ninja_ninpo_de_combate",
        "name": "Ninpo de combate",
        "desc": "Uma vez por rodada, você pode gastar 1PM para trocar um teste de ataque ou defesa por um teste de Manha (Ha- bilidade). Você pode usar vantagens e técnicas como se fosse um ataque ou defesa normal.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "ninja_ougi",
        "name": "Ougi",
        "desc": "Escolha uma de suas vanta- gens ou técnicas: ela será seu ougi, ou téc- nica secreta. Custará –1PM (mínimo 1) e, no primeiro uso da sessão, o alvo tem Perda no teste resistido. Você pode tro- car seu ougi sempre que passar por uma evolução dramática. Operativo",
        "type": "passive"
      }
    ]
  },
  {
    "id": "operativo",
    "name": "Operativo",
    "exigencias": "Luta, Sobrevivência; Patrono",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL",
    "powers": [
      {
        "id": "operativo_combate_tatico",
        "name": "Combate tático",
        "desc": "Sempre que executa uma manobra de combate (agarrão, ataque concentrado, ataque direcionado, ataque total, contra-ataque, defesa total, fuga), você pode pagar 1PM para ter +3 em seu teste de ataque ou defesa.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "operativo_armas_secretas",
        "name": "Armas secretas",
        "desc": "Tentativas de revelar ou anular suas vantagens e técnicas (como Anula- ção ou Telepatia) sempre sofrem Perda, ou gastam PM dobrado.",
        "type": "passive"
      },
      {
        "id": "operativo_equipamento",
        "name": "Equipamento",
        "desc": "Equipamento de espião. Uma vez por sessão, seu Patrono fornece um aparelho com efeito igual a uma vantagem de 1pt (esco- lhida no início da ses- são), que funciona uma única vez. Para vantagens que gastam Pontos de Mana, o aparelho tem carga equivalen- te a 3PM. Paladino",
        "type": "per_session",
        "costPM": 3
      }
    ]
  },
  {
    "id": "paladino",
    "name": "Paladino",
    "exigencias": "Devoto; Código dos Heróis e Honestidade",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA.",
    "powers": [
      {
        "id": "paladino_bravura_final",
        "name": "Bravura final",
        "desc": "Sua virtude vence a morte. Você não faz testes de morte: em vez disso, qualquer dano que recebe neste estado é desconta- do de seus PM restantes. Se ficar sem PM, você cai automaticamente Quase Morto. PM perdidos assim só podem ser recuperados com descanso.",
        "type": "passive"
      },
      {
        "id": "paladino_me_de_sua_forca__o_poder_da_sua_devo_",
        "name": "Me dê sua força! O poder da sua devo-",
        "desc": "Me dê sua força! O poder da sua devo- ção o fortalece. Quando usa Devoto para ter Ga- nho em um teste, some +1 ao resultado de cada dado. Isso não afeta acertos críticos, mas can- cela falhas críticas.",
        "type": "passive"
      },
      {
        "id": "paladino_setimo_sentido",
        "name": "Sétimo sentido",
        "desc": "Quando está perto da derro- ta, você pode gastar 2PM para fazer um ataque ou defesa uma es- cala acima. Patrulheiro",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "patrulheiro",
    "name": "Patrulheiro",
    "exigencias": "Sobrevivência",
    "nucleos": "Era das Arcas, Tormenta ALPHA",
    "powers": [
      {
        "id": "patrulheiro_natureza_provedora",
        "name": "Natureza provedora",
        "desc": "Uma vez por cena, você pode usar Sobrevivência para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mesma cena.",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      },
      {
        "id": "patrulheiro_a_prova_de_tudo",
        "name": "À prova de tudo",
        "desc": "Você é automaticamente bem-sucedido em testes de Sobrevivência para achar lugar adequado de descanso para você e seus aliados. Você também pode pagar 1PM para que você ou um aliado receba +3 em um teste contra privações (cansaço, respiração, fome e sede, sono).",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "patrulheiro_rastreador_perfeito",
        "name": "Rastreador perfeito",
        "desc": "Você pode pagar 2PM para adquirir um Sentido à sua escolha, para um único teste. Pescador Parrudo",
        "type": "buff",
        "costPM": 2
      }
    ]
  },
  {
    "id": "pescador_parrudo",
    "name": "Pescador Parrudo",
    "exigencias": "Poder 3; Sobrevivência; Vigoroso",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "pescador_parrudo_quem_sou__onde_estou_",
        "name": "Quem sou? Onde estou?",
        "desc": "Quem sou? Onde estou? Uma vez por cena, você pode usar os be- nefícios da vantagem Vigoroso em testes de Poder.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "pescador_parrudo_parrudez",
        "name": "Parrudez",
        "desc": "Você pode gastar 1PM para fazer um tes- te de defesa usando a perícia Sobrevivência. Quando o faz, some +1 ao resultado de cada dado (não afeta acertos críticos, mas can- cela falhas críticas). Qualquer defesa bem-sucedida é conside- rada perfeita.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "pescador_parrudo_pescado_do_dia",
        "name": "Pescado do dia",
        "desc": "No início da cena, faça um teste de So- brevivência (meta 6 +1 para cada aliado). Se tiver sucesso, todos ganham +1 em testes de Resistência, incluindo defesa, até o fim da cena. Funciona ape- nas próximo a lugares com possibilidade de pesca (rio, lago, mar, peixaria...). Piloto Mecha",
        "type": "buff"
      }
    ]
  },
  {
    "id": "piloto_mecha",
    "name": "Piloto Mecha",
    "exigencias": "Máquinas; Ajudante",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "piloto_mecha_ajudante_robo",
        "name": "Ajudante robô",
        "desc": "Seu Ajudante robótico funciona como arma, armadura e veículo, sendo considerado Lutador e Montaria. Você ainda deve pagar PM para cada utilização.",
        "type": "buff"
      },
      {
        "id": "piloto_mecha_as_indomavel",
        "name": "Ás indomável",
        "desc": "Você é um mestre das manobras impossíveis. Uma vez por sessão, quando usar 1 Ponto de Ação para qualquer teste, você também pode aumentar esse teste uma escala.",
        "type": "per_session"
      },
      {
        "id": "piloto_mecha_kiodai_mecha",
        "name": "Kiodai mecha",
        "desc": "Uma vez por sessão, ou a critério do mestre, você pode in- vocar um veículo de 10 pontos em escala Kio- dai (cruzador espacial, robô gigante, dinossauro mecânico…). O veículo surge apenas se houver um oponente de escala Kiodai na cena. OD Policial do Espaço",
        "type": "per_session"
      }
    ]
  },
  {
    "id": "policial_do_espaco",
    "name": "Policial do Espaço",
    "exigencias": "Luta; Ajudante, Patrono; Código dos Heróis",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "policial_do_espaco_jouchaku__voce_pode_gastar_um_movimento_para_invocar_um",
        "name": "Jouchaku! Você pode gastar um movimento para invocar um",
        "desc": "Jouchaku! Você pode gastar um movimento para invocar um traje de combate tecnológico, ou abandonar seu disfarce humano e rever- ter para sua forma verdadeira. Nesta forma, pode gastar 2PM para um úni- co uso da vantagem Alcance 1 (pistola de raios) ou Golpe Final. A transfor- mação dura até o fim da cena.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "policial_do_espaco_assistente",
        "name": "Assistente",
        "desc": "Seu Ajudan- te custa –1PM (mínimo 1PM) para ser utilizado.",
        "type": "passive"
      },
      {
        "id": "policial_do_espaco_kiodai_mecha",
        "name": "Kiodai mecha",
        "desc": "Uma vez por sessão, ou a critério do mestre, seu Pa- trono disponibiliza um veículo de 10 pontos em escala Kiodai (cruzador espacial, robô gigante, dinossauro mecânico…). O veículo surge apenas se houver um oponente de escala Kiodai na cena. Psiônico",
        "type": "per_session"
      }
    ]
  },
  {
    "id": "psionico",
    "name": "Psiônico",
    "exigencias": "Obstinado, Sentido (Intuição), Telepata",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "psionico_dom_telepatico",
        "name": "Dom telepático",
        "desc": "Você não precisa gastar um movimento (mas ainda gasta PM) para usar Telepata.",
        "type": "passive"
      },
      {
        "id": "psionico_intuicao_psiquica",
        "name": "Intuição psíquica",
        "desc": "Você pode pagar 1PM para ter Ganho em um teste de Percepção usando Sentido (Intuição).",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "psionico_sobrecarga_psiquica",
        "name": "Sobrecarga psíquica",
        "desc": "Quando utiliza Obstinado, você pode escolher gastar 1 ponto de atributo como se fossem 2 Pontos de Ação, em vez de 1. Sempre que fizer isso, role um dado. Com um re- sultado 1, seus PV caem para zero e você deve fazer um teste de morte. Repórter Extremo",
        "type": "passive"
      }
    ]
  },
  {
    "id": "reporter_extremo",
    "name": "Repórter Extremo",
    "exigencias": "Percepção; Sentido (Intuição)",
    "nucleos": "Guerra da Galáxia, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "reporter_extremo_faro_para_noticia",
        "name": "Faro para notícia",
        "desc": "Você fuça até achar. Pode pagar 1PM para trocar sua Intuição por outro Sentido, para um único teste.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "reporter_extremo_fontes_con_",
        "name": "Fontes con-",
        "desc": "Fontes con- fiáveis. Uma vez por sessão, você pode con- tactar suas fontes para revelar uma informação crucial no momento certo. Durante uma cena, escolha uma vantagem entre Ajudan- te, Arena, Base, Inimigo ou Telepata. Você ainda paga custos em PM da vantagem escolhida, se houver.",
        "type": "per_session"
      },
      {
        "id": "reporter_extremo_furo_de_reportagem",
        "name": "Furo de reportagem",
        "desc": "Uma vez por cena, você pode usar Per- cepção para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mesma cena. Samurai",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      }
    ]
  },
  {
    "id": "samurai",
    "name": "Samurai",
    "exigencias": "Patrono ou Código",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "samurai_guerreiro_poeta",
        "name": "Guerreiro poeta",
        "desc": "Samurais são treinados em arte e etique- ta. Você pode gastar 2PM para receber +3 em qualquer teste de Arte ou Influência.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "samurai_artefato_ancestral",
        "name": "Artefato ancestral",
        "desc": "No início de seu turno, você pode gas- tar PM para imbuir sua arma ou armadura com uma qualidade de artefato (veja em Recompensas) durante um turno. O custo é igual a um décimo do custo em XP. Por exemplo, pode tornar sua arma Encantada +1 por 1PM, ou sua armadura Fortificada por 2PM. Você pode aplicar apenas uma qualidade por vez.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "samurai_guerreiro_honrado",
        "name": "Guerreiro honrado",
        "desc": "Você tem 1 Ponto de Ação extra para cada Patrono e Código que possua. Se desobedecer a seu Patrono ou vio- lar qualquer de seus Códigos, perde esses pontos extras até se redimir. (Note que você pode escolher adotar mais de dois Códigos, embora não receba pontos de personagem por estes.) AD Servo da Centelha",
        "type": "passive"
      }
    ]
  },
  {
    "id": "servo_da_centelha",
    "name": "Servo da Centelha",
    "exigencias": "Luta; Devoto",
    "nucleos": "Operação ARSENAL",
    "powers": [
      {
        "id": "servo_da_centelha_bater_onde_doi",
        "name": "Bater onde dói",
        "desc": "Quando faz um ataque, você pode gastar 2PM para impor R–1 no teste de de- fesa do oponente.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "servo_da_centelha_combate_violento",
        "name": "Combate violento",
        "desc": "Para cada acerto crí- tico em um tes- te de ataque, além do efei- to normal, você também soma +2 ao re- sultado final.",
        "type": "passive"
      },
      {
        "id": "servo_da_centelha_faisca_da",
        "name": "Faísca da",
        "desc": "Faísca da Centelha. Você é devotado ao despertar da Centelha. Quando usa sua vantagem Devoto, em vez do benefício normal, você recebe P+2 e R+1 (não afeta seus recursos). O efeito dura uma quantidade de rodadas igual seu Poder, após o ajuste. Shinigami",
        "type": "passive"
      }
    ]
  },
  {
    "id": "shinigami",
    "name": "Shinigami",
    "exigencias": "Imortal, Inimigo (espíritos)",
    "nucleos": "Era das Arcas, Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "shinigami_eu_voltarei__um_shinigami_morto_retorna_com",
        "name": "Eu voltarei! Um shinigami morto retorna com",
        "desc": "Eu voltarei! Um shinigami morto retorna com recursos completos no início da cena seguinte. A única forma de destruí-lo permanentemente é pelo ataque de outro shinigami.",
        "type": "passive"
      },
      {
        "id": "shinigami_guia_dos_mortos",
        "name": "Guia dos mortos",
        "desc": "Cabe ao shi- nigami adiar a passagem daqueles cuja hora final ainda não chegou. Você pode conceder um Ganho a qualquer teste de morte realizado em sua presença.",
        "type": "passive"
      },
      {
        "id": "shinigami_inimigo_espiritual",
        "name": "Inimigo espiritual",
        "desc": "Um espírito derrotado por um shiniga- mi não recupera PV e permane- ce derrotado até o fim da cena, ou até ser destruído. Superatleta",
        "type": "buff"
      }
    ]
  },
  {
    "id": "superatleta",
    "name": "Superatleta",
    "exigencias": "Esportes",
    "nucleos": "Operação ARSENAL, UniPotência",
    "powers": [
      {
        "id": "superatleta_aquecimento",
        "name": "Aquecimento",
        "desc": "No início de uma nova cena, você sempre recupera um nú- mero de PM igual a seu maior atributo.",
        "type": "passive"
      },
      {
        "id": "superatleta_espirito_olimpico",
        "name": "Espírito olímpico",
        "desc": "Suas vitórias inspiram seus companheiros. Sempre que você tem sucesso em um teste, todos os seus aliados rece- bem +1 em seu teste seguinte.",
        "type": "passive"
      },
      {
        "id": "superatleta_medalha_de_ouro",
        "name": "Medalha de ouro",
        "desc": "Uma vez por cena, você pode usar Esportes para substituir qualquer outra perícia. Você pode pagar 3PM para cada nova utilização na mesma cena. Super-Herói",
        "type": "per_scene",
        "maxUsesPerScene": 1,
        "repeatCostPM": 3
      }
    ]
  },
  {
    "id": "super_heroi",
    "name": "Super-Herói",
    "exigencias": "Ágil, Carismático, Forte, Gênio, Resoluto ou Vigoroso; Có-",
    "nucleos": "Guerra da Galáxia, UniPotência, Operação ARSENAL",
    "powers": [
      {
        "id": "super_heroi_sobrehumano",
        "name": "Sobrehumano",
        "desc": "Escolha uma vantagem das exigências que você possua. Você pode gastar 1PM para aumentar seu bônus de atribu- to em +4, em vez de +2.",
        "type": "buff",
        "costPM": 1
      },
      {
        "id": "super_heroi_facanha_epica",
        "name": "Façanha épica",
        "desc": "Uma vez por sessão, em um teste envolvendo um atributo sobrehumano, você pode aumentar esse teste uma escala.",
        "type": "per_session"
      },
      {
        "id": "super_heroi_heroi_de_acao",
        "name": "Herói de ação",
        "desc": "Você tem 2 Pontos de Ação extras (Poder+2). Tanque",
        "type": "passive"
      }
    ]
  },
  {
    "id": "tanque",
    "name": "Tanque",
    "exigencias": "R3, Defesa Especial (Provocação)",
    "nucleos": "Era das Arcas, UniPotência, Tormenta ALPHA",
    "powers": [
      {
        "id": "tanque_hoje_nao__uma_vez_por_cena__quando_recebe_dano_que_o_levaria_a",
        "name": "Hoje não! Uma vez por cena, quando recebe dano que o levaria a",
        "desc": "Hoje não! Uma vez por cena, quando recebe dano que o levaria a 0PV, você pode ignorar completamente esse dano.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "tanque_defesa_gratuita",
        "name": "Defesa gratuita",
        "desc": "Uma vez por cena, você pode usar uma De- fesa Especial sem gastar PM.",
        "type": "per_scene",
        "maxUsesPerScene": 1
      },
      {
        "id": "tanque_ultimo_bastiao",
        "name": "Último bastião",
        "desc": "Quando você está per- to da derrota, todos os seus testes de de- fesa têm Ganho. ED Treinador de Monstros",
        "type": "passive"
      }
    ]
  },
  {
    "id": "treinador_de_monstros",
    "name": "Treinador de Monstros",
    "exigencias": "Animais; Ajudante (qualquer)",
    "nucleos": "Todos",
    "powers": [
      {
        "id": "treinador_de_monstros_amigo_dos_monstros",
        "name": "Amigo dos monstros",
        "desc": "Para você, cada utilização de Aju- dante custa –1PM (mínimo 1PM).",
        "type": "passive"
      },
      {
        "id": "treinador_de_monstros_eu_escolho_voce__se_tiver_mais",
        "name": "Eu escolho você! Se tiver mais",
        "desc": "Eu escolho você! Se tiver mais de um Ajudante, você pode utilizar a vantagem duas vezes por rodada, em vez de uma (apenas duas, mesmo se tiver mais de dois Ajudantes). Você não pode usar o mesmo Ajudante mais de uma vez em cada rodada, e você ainda deve pagar o custo em PM por cada utilização.",
        "type": "passive"
      },
      {
        "id": "treinador_de_monstros_temos_que_pegar__no_inicio_da",
        "name": "Temos que pegar! No início da",
        "desc": "Temos que pegar! No início da cena, você pode fazer um teste de Animais (9 ou mais, a critério do mes- tre). Em caso de sucesso, um novo Ajudante (tipo escolhido pelo mestre) surge para aju- dá-lo até o fim da cena. Você ainda deve pa- gar o custo em PM por sua utilização. Este poder funcio- na apenas uma vez por sessão. Vigilante Sombrio",
        "type": "per_session"
      }
    ]
  },
  {
    "id": "vigilante_sombrio",
    "name": "Vigilante Sombrio",
    "exigencias": "Invisível, Sentido (infravisão)",
    "nucleos": "Era das Arcas, Operação ARSENAL, Tormenta ALPHA",
    "powers": [
      {
        "id": "vigilante_sombrio_forma_sombria",
        "name": "Forma sombria",
        "desc": "Você pode gastar um movimento para adquirir a vantagem In- corpóreo ao custo de 1PM por turno, por uma quantidade de turnos igual a 5 ou sua Habili- dade, o que for menor. Se já tem Incorpóreo pode interagir com o mundo físico (inclusive atacar) ao custo de 1PM por interação.",
        "type": "passive"
      },
      {
        "id": "vigilante_sombrio_terror_da_noite",
        "name": "Terror da noite",
        "desc": "Sempre que causa dano, você pode gastar 2PM para forçar o alvo a fazer um teste de R (6 + H do vigilante). Se falhar, ele tem Perda na defesa contra o próximo ataque que receber. Caso seja uma falha crítica, ele fica indefeso.",
        "type": "buff",
        "costPM": 2
      },
      {
        "id": "vigilante_sombrio_sumir_nas_som_",
        "name": "Sumir nas som-",
        "desc": "Sumir nas som- bras. Você gasta 1PM (em vez de 3) para ficar Invisível.",
        "type": "passive"
      }
    ]
  }
];
