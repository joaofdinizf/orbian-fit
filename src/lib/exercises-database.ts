export interface ExerciseTemplate {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  gifUrl: string;
  instructions: string[];
  tips: string[];
  variations?: string[];
}

export const MUSCLE_GROUPS = [
  'Peito',
  'Costas',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Pernas',
  'Glúteos',
  'Abdômen',
  'Cardio',
  'Funcional',
  'Atletismo',
  'Pliometria',
  'Kettlebell',
  'Levantamento Olímpico',
  'Lutas',
  'Mobilidade',
  'Alongamento',
  'Core',
  'Equilíbrio',
  'Propriocepção',
  'Condicionamento'
] as const;

export const EQUIPMENT_TYPES = [
  'Peso Livre',
  'Máquina',
  'Cabo',
  'Peso Corporal',
  'Elástico',
  'Kettlebell',
  'Halteres',
  'Barra',
  'TRX',
  'Medicine Ball',
  'Corda Naval',
  'Trenó',
  'Pista',
  'Caixa',
  'Bosu',
  'Foam Roller',
  'PVC'
] as const;

export const EXERCISES_DATABASE: ExerciseTemplate[] = [
  // PEITO
  {
    id: 'chest_bench_press',
    name: 'Supino Reto Barra',
    description: 'Exercício fundamental para desenvolvimento do peitoral maior',
    muscleGroup: 'Peito',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite no banco com os pés firmes no chão',
      'Segure a barra com pegada ligeiramente mais larga que os ombros',
      'Desça a barra controladamente até o peito',
      'Empurre a barra para cima até extensão completa dos braços'
    ],
    tips: [
      'Mantenha os ombros retraídos',
      'Não deixe a barra quicar no peito',
      'Respire fundo na descida, expire na subida'
    ],
    variations: ['Supino Inclinado', 'Supino Declinado', 'Supino com Halteres']
  },
  {
    id: 'chest_bench_press_dumbbells',
    name: 'Supino Reto Halteres',
    description: 'Variação com halteres para maior amplitude de movimento',
    muscleGroup: 'Peito',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite no banco com um halter em cada mão',
      'Inicie com os braços estendidos acima do peito',
      'Desça os halteres controladamente',
      'Empurre de volta à posição inicial'
    ],
    tips: [
      'Maior amplitude que a barra',
      'Controle o movimento na descida',
      'Mantenha os punhos estáveis'
    ]
  },
  {
    id: 'chest_bench_press_machine',
    name: 'Supino Máquina',
    description: 'Versão na máquina para iniciantes',
    muscleGroup: 'Peito',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajuste o banco e pegue as alças',
      'Empurre para frente contraindo o peito',
      'Retorne controladamente',
      'Mantenha os pés firmes no chão'
    ],
    tips: [
      'Ideal para iniciantes',
      'Movimento mais seguro',
      'Foque na contração do peito'
    ]
  },
  {
    id: 'chest_incline_press',
    name: 'Supino Inclinado Barra',
    description: 'Foca na porção superior do peitoral',
    muscleGroup: 'Peito',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajuste o banco em 30-45 graus',
      'Posicione-se com os pés firmes no chão',
      'Segure a barra com pegada média',
      'Desça controladamente até a parte superior do peito'
    ],
    tips: [
      'Não incline muito o banco (máximo 45°)',
      'Foque na contração da parte superior do peito',
      'Mantenha o core contraído'
    ]
  },
  {
    id: 'chest_incline_press_dumbbells',
    name: 'Supino Inclinado Halteres',
    description: 'Versão com halteres para peitoral superior',
    muscleGroup: 'Peito',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Banco inclinado 30-45 graus',
      'Halteres na altura dos ombros',
      'Empurre para cima e ligeiramente para dentro',
      'Desça controladamente'
    ],
    tips: [
      'Maior amplitude que a barra',
      'Controle na descida',
      'Foque no peitoral superior'
    ]
  },
  {
    id: 'chest_incline_press_machine',
    name: 'Supino Inclinado Máquina',
    description: 'Máquina para peitoral superior',
    muscleGroup: 'Peito',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajuste o banco e altura do assento',
      'Pegue as alças na altura dos ombros',
      'Empurre para cima contraindo o peito',
      'Retorne controladamente'
    ],
    tips: [
      'Ajuste correto é fundamental',
      'Movimento controlado',
      'Foque na parte superior do peito'
    ]
  },
  {
    id: 'chest_decline_press',
    name: 'Supino Declinado Barra',
    description: 'Foca na porção inferior do peitoral',
    muscleGroup: 'Peito',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Banco declinado com pés presos',
      'Pegada ligeiramente mais larga que ombros',
      'Desça a barra até a parte inferior do peito',
      'Empurre de volta à posição inicial'
    ],
    tips: [
      'Prenda bem os pés',
      'Foque na parte inferior do peito',
      'Movimento controlado'
    ]
  },
  {
    id: 'chest_decline_press_dumbbells',
    name: 'Supino Declinado Halteres',
    description: 'Versão com halteres para peitoral inferior',
    muscleGroup: 'Peito',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Banco declinado com pés seguros',
      'Halteres na altura do peito inferior',
      'Empurre para cima mantendo controle',
      'Desça com amplitude completa'
    ],
    tips: [
      'Maior amplitude que a barra',
      'Controle extra necessário',
      'Foque no peitoral inferior'
    ]
  },
  {
    id: 'chest_dumbbell_fly',
    name: 'Crucifixo Halteres Reto',
    description: 'Exercício de isolamento para o peitoral',
    muscleGroup: 'Peito',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite no banco com um halter em cada mão',
      'Inicie com os braços estendidos acima do peito',
      'Abra os braços em arco até sentir alongamento no peito',
      'Retorne à posição inicial contraindo o peitoral'
    ],
    tips: [
      'Mantenha uma leve flexão nos cotovelos',
      'Controle o movimento na descida',
      'Não desça muito para evitar lesões'
    ]
  },
  {
    id: 'chest_incline_fly',
    name: 'Crucifixo Halteres Inclinado',
    description: 'Isolamento para peitoral superior',
    muscleGroup: 'Peito',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Banco inclinado 30-45 graus',
      'Halteres acima do peito superior',
      'Abra em arco mantendo leve flexão',
      'Contraia o peitoral superior no retorno'
    ],
    tips: [
      'Foque no peitoral superior',
      'Movimento em arco',
      'Controle na descida'
    ]
  },
  {
    id: 'chest_pec_deck',
    name: 'Crucifixo Máquina (Pec-Deck)',
    description: 'Isolamento na máquina para peitoral',
    muscleGroup: 'Peito',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajuste o assento na altura correta',
      'Apoie os antebraços nas almofadas',
      'Junte os braços contraindo o peito',
      'Retorne controladamente'
    ],
    tips: [
      'Ajuste correto é essencial',
      'Foque na contração do peito',
      'Movimento controlado'
    ]
  },
  {
    id: 'chest_cable_crossover_high',
    name: 'Crossover Cabo Alto→Baixo',
    description: 'Exercício no cabo para peitoral inferior',
    muscleGroup: 'Peito',
    equipment: 'Cabo',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabos na posição alta',
      'Puxe para baixo e para dentro',
      'Cruze as mãos na frente do corpo',
      'Retorne controladamente'
    ],
    tips: [
      'Foque no peitoral inferior',
      'Movimento em arco',
      'Controle na volta'
    ]
  },
  {
    id: 'chest_cable_crossover_low',
    name: 'Crossover Cabo Baixo→Alto',
    description: 'Exercício no cabo para peitoral superior',
    muscleGroup: 'Peito',
    equipment: 'Cabo',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabos na posição baixa',
      'Puxe para cima e para dentro',
      'Junte as mãos acima do peito',
      'Desça controladamente'
    ],
    tips: [
      'Foque no peitoral superior',
      'Movimento ascendente',
      'Contraia no topo'
    ]
  },
  {
    id: 'chest_pushups',
    name: 'Flexão de Braços',
    description: 'Exercício clássico usando peso corporal',
    muscleGroup: 'Peito',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de prancha com mãos na largura dos ombros',
      'Desça o corpo até o peito quase tocar o chão',
      'Empurre o corpo de volta à posição inicial',
      'Mantenha o corpo alinhado durante todo movimento'
    ],
    tips: [
      'Não deixe o quadril cair',
      'Mantenha o core contraído',
      'Respire na descida, expire na subida'
    ],
    variations: ['Flexão Inclinada', 'Flexão Declinada', 'Flexão Diamante']
  },
  {
    id: 'chest_dips',
    name: 'Mergulho nas Paralelas',
    description: 'Exercício avançado para peito e tríceps',
    muscleGroup: 'Peito',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Segure as barras paralelas com braços estendidos',
      'Incline ligeiramente o tronco para frente',
      'Desça o corpo flexionando os cotovelos',
      'Empurre o corpo de volta à posição inicial'
    ],
    tips: [
      'Incline o tronco para focar no peito',
      'Não desça muito para evitar lesões no ombro',
      'Controle o movimento na descida'
    ]
  },

  // COSTAS
  {
    id: 'back_pullup_pronated',
    name: 'Barra Fixa Pronada',
    description: 'Exercício fundamental para desenvolvimento das costas',
    muscleGroup: 'Costas',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Segure a barra com pegada pronada, mãos na largura dos ombros',
      'Pendure com braços estendidos',
      'Puxe o corpo para cima até o queixo passar da barra',
      'Desça controladamente até extensão completa'
    ],
    tips: [
      'Inicie o movimento puxando os ombros para baixo',
      'Foque em puxar com as costas, não com os braços',
      'Evite balançar o corpo'
    ],
    variations: ['Barra Fixa Supinada', 'Barra Fixa Neutra', 'Barra Fixa Assistida']
  },
  {
    id: 'back_pullup_supinated',
    name: 'Barra Fixa Supinada',
    description: 'Variação com pegada supinada',
    muscleGroup: 'Costas',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Pegada supinada (palmas para você)',
      'Mãos na largura dos ombros',
      'Puxe até o queixo passar da barra',
      'Desça controladamente'
    ],
    tips: [
      'Trabalha mais os bíceps',
      'Movimento mais fácil que pronada',
      'Foque nas costas'
    ]
  },
  {
    id: 'back_lat_pulldown',
    name: 'Puxada Frente (Lat Pulldown)',
    description: 'Exercício na máquina para desenvolvimento do latíssimo',
    muscleGroup: 'Costas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Sente na máquina e ajuste as almofadas nas coxas',
      'Segure a barra com pegada larga',
      'Puxe a barra até a altura do peito',
      'Retorne controladamente à posição inicial'
    ],
    tips: [
      'Mantenha o peito estufado',
      'Puxe os ombros para baixo e para trás',
      'Não use o peso do corpo para ajudar'
    ]
  },
  {
    id: 'back_neutral_pulldown',
    name: 'Puxada Neutra V-Bar',
    description: 'Puxada com pegada neutra',
    muscleGroup: 'Costas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Use a barra V com pegada neutra',
      'Puxe até a altura do peito superior',
      'Foque na contração das costas',
      'Retorne controladamente'
    ],
    tips: [
      'Pegada neutra é mais confortável',
      'Trabalha bem o meio das costas',
      'Mantenha o peito estufado'
    ]
  },
  {
    id: 'back_bent_row',
    name: 'Remada Curvada Barra',
    description: 'Exercício para desenvolvimento da musculatura das costas',
    muscleGroup: 'Costas',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé com pés na largura dos ombros',
      'Incline o tronco para frente mantendo as costas retas',
      'Segure a barra com pegada pronada',
      'Puxe a barra em direção ao abdômen'
    ],
    tips: [
      'Mantenha o core contraído',
      'Não arredonde as costas',
      'Puxe os cotovelos para trás'
    ]
  },
  {
    id: 'back_t_bar_row',
    name: 'Remada T-Bar',
    description: 'Remada com barra T específica',
    muscleGroup: 'Costas',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione-se sobre a barra T',
      'Segure as alças com pegada neutra',
      'Puxe em direção ao peito',
      'Controle o movimento na descida'
    ],
    tips: [
      'Mantenha as costas retas',
      'Puxe com as costas, não braços',
      'Contraia as escápulas'
    ]
  },
  {
    id: 'back_cavalinho_row',
    name: 'Remada Cavalinho',
    description: 'Remada na máquina cavalinho',
    muscleGroup: 'Costas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Apoie o peito na almofada',
      'Segure as alças',
      'Puxe para trás contraindo as costas',
      'Retorne controladamente'
    ],
    tips: [
      'Apoio do peito ajuda na postura',
      'Foque na contração das costas',
      'Movimento controlado'
    ]
  },
  {
    id: 'back_seated_row_machine',
    name: 'Remada Baixa Máquina',
    description: 'Remada sentada na máquina',
    muscleGroup: 'Costas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Sente com peito apoiado',
      'Segure as alças',
      'Puxe para trás mantendo cotovelos próximos',
      'Contraia as escápulas'
    ],
    tips: [
      'Mantenha o peito no apoio',
      'Puxe os ombros para trás',
      'Não use o tronco para ajudar'
    ]
  },
  {
    id: 'back_seated_row',
    name: 'Remada Baixa no Cabo',
    description: 'Exercício na polia para desenvolvimento das costas',
    muscleGroup: 'Costas',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Sente na máquina com pés apoiados',
      'Segure o cabo com ambas as mãos',
      'Puxe o cabo em direção ao abdômen',
      'Retorne controladamente à posição inicial'
    ],
    tips: [
      'Mantenha as costas eretas',
      'Puxe os ombros para trás',
      'Não use o tronco para ajudar no movimento'
    ]
  },
  {
    id: 'back_one_arm_row',
    name: 'Remada Serrote Halter',
    description: 'Remada unilateral com halter',
    muscleGroup: 'Costas',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Apoie joelho e mão no banco',
      'Halter na mão livre',
      'Puxe o halter em direção ao quadril',
      'Controle o movimento na descida'
    ],
    tips: [
      'Mantenha as costas retas',
      'Puxe com as costas, não braço',
      'Trabalhe um lado de cada vez'
    ]
  },
  {
    id: 'back_meadows_row',
    name: 'Remada Meadows Unilateral',
    description: 'Remada unilateral específica',
    muscleGroup: 'Costas',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione a barra em um canto',
      'Segure uma extremidade',
      'Puxe em direção ao quadril',
      'Trabalhe um lado de cada vez'
    ],
    tips: [
      'Técnica específica',
      'Grande amplitude de movimento',
      'Foque na contração'
    ]
  },
  {
    id: 'back_cable_pullover',
    name: 'Pullover no Cabo',
    description: 'Exercício para latíssimo no cabo',
    muscleGroup: 'Costas',
    equipment: 'Cabo',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Cabo na posição alta',
      'Braços estendidos',
      'Puxe para baixo em arco',
      'Foque no latíssimo'
    ],
    tips: [
      'Movimento em arco',
      'Foque no latíssimo',
      'Braços ligeiramente flexionados'
    ]
  },
  {
    id: 'back_dumbbell_pullover',
    name: 'Pullover com Halter',
    description: 'Exercício para latíssimo e serrátil',
    muscleGroup: 'Costas',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    instructions: [
      'Deite perpendicular ao banco',
      'Halter com ambas as mãos',
      'Desça o peso atrás da cabeça',
      'Puxe de volta sobre o peito'
    ],
    tips: [
      'Movimento controlado',
      'Foque no alongamento',
      'Não desça muito'
    ]
  },

  // OMBROS
  {
    id: 'shoulders_overhead_press_standing',
    name: 'Desenvolvimento Barra em Pé',
    description: 'Exercício fundamental para ombros',
    muscleGroup: 'Ombros',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé com pés na largura dos ombros',
      'Segure a barra na altura dos ombros',
      'Empurre a barra para cima até extensão completa',
      'Desça controladamente até a posição inicial'
    ],
    tips: [
      'Mantenha o core contraído',
      'Não arqueie excessivamente as costas',
      'Empurre a cabeça para frente ao passar a barra'
    ]
  },
  {
    id: 'shoulders_overhead_press_seated',
    name: 'Desenvolvimento Barra Sentado',
    description: 'Versão sentada para maior estabilidade',
    muscleGroup: 'Ombros',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente no banco com apoio nas costas',
      'Barra na altura dos ombros',
      'Empurre para cima',
      'Desça controladamente'
    ],
    tips: [
      'Maior estabilidade que em pé',
      'Foque nos ombros',
      'Apoio das costas ajuda'
    ]
  },
  {
    id: 'shoulders_dumbbell_press_standing',
    name: 'Desenvolvimento Halteres em Pé',
    description: 'Desenvolvimento com halteres em pé',
    muscleGroup: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Halteres na altura dos ombros',
      'Empurre para cima simultaneamente',
      'Junte ligeiramente no topo',
      'Desça controladamente'
    ],
    tips: [
      'Maior amplitude que barra',
      'Trabalha estabilização',
      'Movimento natural'
    ]
  },
  {
    id: 'shoulders_dumbbell_press_seated',
    name: 'Desenvolvimento Halteres Sentado',
    description: 'Versão sentada com halteres',
    muscleGroup: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente com apoio nas costas',
      'Halteres na altura dos ombros',
      'Empurre para cima',
      'Controle na descida'
    ],
    tips: [
      'Maior estabilidade',
      'Foque nos deltóides',
      'Movimento controlado'
    ]
  },
  {
    id: 'shoulders_machine_press',
    name: 'Desenvolvimento Máquina Sentado',
    description: 'Desenvolvimento na máquina',
    muscleGroup: 'Ombros',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajuste o assento',
      'Segure as alças',
      'Empurre para cima',
      'Retorne controladamente'
    ],
    tips: [
      'Ideal para iniciantes',
      'Movimento guiado',
      'Foque na contração'
    ]
  },
  {
    id: 'shoulders_arnold_press',
    name: 'Arnold Press Sentado',
    description: 'Variação criada por Arnold Schwarzenegger',
    muscleGroup: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Inicie com halteres na frente do peito',
      'Gire os punhos enquanto empurra para cima',
      'Termine com palmas para frente',
      'Inverta o movimento na descida'
    ],
    tips: [
      'Movimento de rotação',
      'Trabalha todos os deltóides',
      'Controle na rotação'
    ]
  },
  {
    id: 'shoulders_upright_row',
    name: 'Remada Alta Barra em Pé',
    description: 'Exercício para deltóides e trapézio',
    muscleGroup: 'Ombros',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Barra com pegada fechada',
      'Puxe para cima próximo ao corpo',
      'Cotovelos sempre acima das mãos',
      'Desça controladamente'
    ],
    tips: [
      'Não puxe muito alto',
      'Cotovelos lideram o movimento',
      'Cuidado com os ombros'
    ]
  },
  {
    id: 'shoulders_lateral_raise_standing',
    name: 'Elevação Lateral Halteres em Pé',
    description: 'Isolamento para deltóide médio',
    muscleGroup: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé com um halter em cada mão',
      'Braços ao lado do corpo',
      'Eleve os braços lateralmente até a altura dos ombros',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha leve flexão nos cotovelos',
      'Não eleve acima da linha dos ombros',
      'Controle o movimento na descida'
    ]
  },
  {
    id: 'shoulders_lateral_raise_seated',
    name: 'Elevação Lateral Halteres Sentado',
    description: 'Versão sentada para maior isolamento',
    muscleGroup: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente com halteres ao lado',
      'Eleve lateralmente',
      'Pare na altura dos ombros',
      'Desça controladamente'
    ],
    tips: [
      'Elimina impulso das pernas',
      'Maior isolamento',
      'Foque no deltóide médio'
    ]
  },
  {
    id: 'shoulders_lateral_raise_cable',
    name: 'Elevação Lateral no Cabo em Pé',
    description: 'Elevação lateral com resistência constante',
    muscleGroup: 'Ombros',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabo na posição baixa',
      'Puxe lateralmente até altura do ombro',
      'Resistência constante',
      'Controle na descida'
    ],
    tips: [
      'Tensão constante',
      'Movimento controlado',
      'Foque no deltóide médio'
    ]
  },
  {
    id: 'shoulders_front_raise',
    name: 'Elevação Frontal Halteres em Pé',
    description: 'Isolamento para deltóide anterior',
    muscleGroup: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé com halteres na frente das coxas',
      'Eleve um braço de cada vez para frente',
      'Pare na altura dos ombros',
      'Desça controladamente'
    ],
    tips: [
      'Não balance o corpo',
      'Mantenha leve flexão no cotovelo',
      'Controle o movimento na descida'
    ]
  },
  {
    id: 'shoulders_face_pull',
    name: 'Face Pull no Cabo em Pé',
    description: 'Exercício para deltóide posterior e trapézio',
    muscleGroup: 'Ombros',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabo na altura do rosto',
      'Puxe em direção ao rosto',
      'Separe as mãos no final',
      'Contraia o deltóide posterior'
    ],
    tips: [
      'Excelente para postura',
      'Foque no deltóide posterior',
      'Movimento controlado'
    ]
  },

  // BÍCEPS
  {
    id: 'biceps_barbell_curl',
    name: 'Rosca Direta Barra em Pé',
    description: 'Exercício clássico para bíceps',
    muscleGroup: 'Bíceps',
    equipment: 'Barra',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé com a barra nas mãos',
      'Braços estendidos ao lado do corpo',
      'Flexione os cotovelos levando a barra ao peito',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha os cotovelos fixos',
      'Não balance o corpo',
      'Contraia o bíceps no topo do movimento'
    ]
  },
  {
    id: 'biceps_ez_bar_curl',
    name: 'Rosca Barra W em Pé',
    description: 'Rosca com barra W para conforto dos punhos',
    muscleGroup: 'Bíceps',
    equipment: 'Barra',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Segure a barra W nas curvas',
      'Flexione os cotovelos',
      'Contraia os bíceps no topo',
      'Desça controladamente'
    ],
    tips: [
      'Mais confortável para os punhos',
      'Pegada natural',
      'Foque na contração'
    ]
  },
  {
    id: 'biceps_alternating_curl',
    name: 'Rosca Alternada Halteres em Pé',
    description: 'Rosca alternada com halteres',
    muscleGroup: 'Bíceps',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Halteres ao lado do corpo',
      'Flexione um braço de cada vez',
      'Gire o punho durante a subida',
      'Alterne os braços'
    ],
    tips: [
      'Trabalha um braço de cada vez',
      'Rotação do punho',
      'Controle em ambos os braços'
    ]
  },
  {
    id: 'biceps_scott_curl',
    name: 'Rosca Scott Sentado',
    description: 'Rosca no banco Scott para isolamento',
    muscleGroup: 'Bíceps',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente no banco Scott',
      'Braços apoiados na almofada',
      'Flexione controladamente',
      'Não estenda completamente'
    ],
    tips: [
      'Isolamento total dos bíceps',
      'Não estenda completamente',
      'Controle na descida'
    ]
  },
  {
    id: 'biceps_hammer_curl',
    name: 'Rosca Martelo em Pé',
    description: 'Variação que trabalha bíceps e antebraço',
    muscleGroup: 'Bíceps',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Segure os halteres com pegada neutra',
      'Braços ao lado do corpo',
      'Flexione alternadamente mantendo a pegada neutra',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha os punhos alinhados',
      'Não gire os halteres durante o movimento',
      'Foque na contração do bíceps'
    ]
  },
  {
    id: 'biceps_concentration_curl',
    name: 'Rosca Concentrada Sentado',
    description: 'Exercício de isolamento para bíceps',
    muscleGroup: 'Bíceps',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente em um banco com pernas abertas',
      'Apoie o cotovelo na parte interna da coxa',
      'Flexione o braço levando o halter ao peito',
      'Desça controladamente'
    ],
    tips: [
      'Mantenha o cotovelo fixo na coxa',
      'Foque na contração máxima do bíceps',
      'Não balance o tronco'
    ]
  },
  {
    id: 'biceps_zottman_curl',
    name: 'Rosca Zottman Unilateral em Pé',
    description: 'Rosca com rotação do punho',
    muscleGroup: 'Bíceps',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Suba com pegada supinada',
      'Gire o punho no topo',
      'Desça com pegada pronada',
      'Gire novamente na base'
    ],
    tips: [
      'Trabalha bíceps e antebraços',
      'Movimento de rotação',
      'Controle na descida pronada'
    ]
  },

  // TRÍCEPS
  {
    id: 'triceps_lying_extension',
    name: 'Tríceps Testa (Barra/Halter)',
    description: 'Exercício de isolamento para tríceps',
    muscleGroup: 'Tríceps',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite no banco com barra acima do peito',
      'Flexione apenas os cotovelos',
      'Desça a barra em direção à testa',
      'Estenda de volta à posição inicial'
    ],
    tips: [
      'Mantenha os cotovelos fixos',
      'Não mova os ombros',
      'Controle o peso na descida'
    ]
  },
  {
    id: 'triceps_pushdown',
    name: 'Tríceps Pulley (Barra/Corda) em Pé',
    description: 'Exercício na polia para tríceps',
    muscleGroup: 'Tríceps',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé de frente para a polia alta',
      'Segure a barra com pegada pronada',
      'Empurre a barra para baixo estendendo os cotovelos',
      'Retorne controladamente'
    ],
    tips: [
      'Mantenha os cotovelos fixos ao lado do corpo',
      'Não use o tronco para ajudar',
      'Contraia os tríceps na extensão completa'
    ]
  },
  {
    id: 'triceps_overhead_cable',
    name: 'Tríceps Corda Overhead no Cabo em Pé',
    description: 'Extensão de tríceps overhead no cabo',
    muscleGroup: 'Tríceps',
    equipment: 'Cabo',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'De costas para a polia alta',
      'Corda atrás da cabeça',
      'Estenda os braços para frente',
      'Retorne controladamente'
    ],
    tips: [
      'Mantenha os cotovelos fixos',
      'Movimento para frente',
      'Contraia os tríceps'
    ]
  },
  {
    id: 'triceps_overhead_dumbbell',
    name: 'Tríceps Overhead com Halter Sentado',
    description: 'Extensão de tríceps overhead',
    muscleGroup: 'Tríceps',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Segure um halter com ambas as mãos acima da cabeça',
      'Flexione os cotovelos descendo o peso atrás da cabeça',
      'Estenda os braços de volta à posição inicial',
      'Mantenha os cotovelos fixos'
    ],
    tips: [
      'Não mova os cotovelos durante o movimento',
      'Controle o peso na descida',
      'Foque na extensão completa dos tríceps'
    ]
  },
  {
    id: 'triceps_french_press',
    name: 'Tríceps Francês com Halter Sentado',
    description: 'Variação do tríceps overhead',
    muscleGroup: 'Tríceps',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente com halter acima da cabeça',
      'Desça o peso atrás da cabeça',
      'Estenda de volta ao topo',
      'Mantenha cotovelos fixos'
    ],
    tips: [
      'Similar ao overhead',
      'Foque na extensão',
      'Controle na descida'
    ]
  },
  {
    id: 'triceps_kickback',
    name: 'Kickback com Halter em Pé',
    description: 'Isolamento unilateral para tríceps',
    muscleGroup: 'Tríceps',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Incline o tronco para frente',
      'Cotovelo fixo ao lado do corpo',
      'Estenda o braço para trás',
      'Contraia o tríceps no final'
    ],
    tips: [
      'Mantenha o cotovelo fixo',
      'Tronco inclinado',
      'Foque na contração final'
    ]
  },
  {
    id: 'triceps_bench_dips',
    name: 'Mergulho no Banco',
    description: 'Exercício com peso corporal para tríceps',
    muscleGroup: 'Tríceps',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Mãos na borda do banco',
      'Pés no chão ou outro banco',
      'Desça flexionando os cotovelos',
      'Empurre de volta ao topo'
    ],
    tips: [
      'Mantenha os cotovelos próximos',
      'Não desça muito',
      'Foque nos tríceps'
    ]
  },

  // PERNAS - QUADRÍCEPS/GLÚTEO (BILATERAL/MÁQUINA)
  {
    id: 'legs_back_squat',
    name: 'Agachamento Livre (Back Squat)',
    description: 'Exercício fundamental para pernas e glúteos',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione a barra nos trapézios',
      'Pés na largura dos ombros',
      'Desça flexionando quadris e joelhos',
      'Desça até as coxas ficarem paralelas ao chão'
    ],
    tips: [
      'Mantenha o peito estufado',
      'Joelhos alinhados com os pés',
      'Inicie o movimento pelos quadris'
    ],
    variations: ['Agachamento Frontal', 'Agachamento Búlgaro', 'Agachamento Sumô']
  },
  {
    id: 'legs_front_squat',
    name: 'Agachamento Frontal (Front Squat)',
    description: 'Agachamento com barra na frente',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Barra apoiada nos ombros frontais',
      'Cotovelos altos',
      'Desça mantendo o tronco ereto',
      'Suba empurrando pelos calcanhares'
    ],
    tips: [
      'Mantém tronco mais ereto',
      'Trabalha mais quadríceps',
      'Cotovelos sempre altos'
    ]
  },
  {
    id: 'legs_overhead_squat',
    name: 'Agachamento Overhead',
    description: 'Agachamento com barra acima da cabeça',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Barra estendida acima da cabeça',
      'Agache mantendo a barra no alto',
      'Requer grande mobilidade',
      'Movimento muito técnico'
    ],
    tips: [
      'Exercício muito avançado',
      'Requer mobilidade excelente',
      'Comece com peso leve'
    ]
  },
  {
    id: 'legs_zercher_squat',
    name: 'Zercher Squat',
    description: 'Agachamento com barra nos braços',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Barra apoiada nos antebraços',
      'Braços cruzados segurando a barra',
      'Agache normalmente',
      'Posição única da barra'
    ],
    tips: [
      'Posição única',
      'Trabalha core intensamente',
      'Use almofada na barra'
    ]
  },
  {
    id: 'legs_leg_press',
    name: 'Leg Press 45° Sentado',
    description: 'Exercício na máquina para quadríceps',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente na máquina com pés na plataforma',
      'Pés na largura dos ombros',
      'Desça flexionando os joelhos',
      'Empurre a plataforma de volta'
    ],
    tips: [
      'Não desça muito para evitar lesões no joelho',
      'Mantenha os pés alinhados',
      'Controle o movimento na descida'
    ]
  },
  {
    id: 'legs_hack_squat',
    name: 'Hack Squat Máquina em Pé',
    description: 'Agachamento na máquina hack',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione-se na máquina hack',
      'Pés na plataforma',
      'Desça controladamente',
      'Empurre de volta ao topo'
    ],
    tips: [
      'Máquina guia o movimento',
      'Foque nos quadríceps',
      'Amplitude controlada'
    ]
  },
  {
    id: 'legs_walking_lunge',
    name: 'Passada (Walking Lunge) em Pé',
    description: 'Afundo caminhando',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Dê um passo à frente',
      'Desça flexionando ambos joelhos',
      'Empurre para frente com a perna da frente',
      'Continue alternando as pernas'
    ],
    tips: [
      'Mantenha o tronco ereto',
      'Passos longos',
      'Controle em cada repetição'
    ]
  },
  {
    id: 'legs_step_up',
    name: 'Step-Up no Banco em Pé',
    description: 'Subida no banco unilateral',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Coloque um pé no banco',
      'Suba empurrando com essa perna',
      'Desça controladamente',
      'Alterne as pernas'
    ],
    tips: [
      'Use a perna de cima para subir',
      'Não empurre com a perna de baixo',
      'Controle na descida'
    ]
  },

  // PERNAS - UNILATERAL
  {
    id: 'legs_bulgarian_split_squat',
    name: 'Agachamento Búlgaro Halteres em Pé',
    description: 'Agachamento unilateral com pé elevado',
    muscleGroup: 'Pernas',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Pé traseiro elevado no banco',
      'Desça flexionando a perna da frente',
      'Mantenha o peso na perna da frente',
      'Suba empurrando com a perna da frente'
    ],
    tips: [
      'Foque na perna da frente',
      'Pé traseiro apenas para apoio',
      'Desça até 90 graus no joelho'
    ]
  },
  {
    id: 'legs_split_squat',
    name: 'Split Squat (RFESS) em Pé',
    description: 'Agachamento em posição de afundo',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de afundo estática',
      'Desça flexionando ambos joelhos',
      'Suba mantendo a posição',
      'Complete as repetições e troque'
    ],
    tips: [
      'Posição estática',
      'Foque na perna da frente',
      'Mantenha o equilíbrio'
    ]
  },
  {
    id: 'legs_pistol_squat',
    name: 'Pistol Squat em Pé',
    description: 'Agachamento unilateral avançado',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Equilibre-se em uma perna',
      'Outra perna estendida à frente',
      'Desça até agachamento completo',
      'Suba usando apenas uma perna'
    ],
    tips: [
      'Exercício muito avançado',
      'Requer força e equilíbrio',
      'Pratique com apoio primeiro'
    ]
  },
  {
    id: 'legs_side_lunge',
    name: 'Side Lunge (Agachamento Lateral) em Pé',
    description: 'Afundo lateral',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Dê um passo largo para o lado',
      'Desça flexionando a perna do lado',
      'Outra perna permanece estendida',
      'Retorne à posição inicial'
    ],
    tips: [
      'Movimento lateral',
      'Uma perna trabalha, outra estica',
      'Mantenha o tronco ereto'
    ]
  },
  {
    id: 'legs_cossack_squat',
    name: 'Cossack Squat em Pé',
    description: 'Agachamento lateral profundo',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Pernas bem abertas',
      'Desça para um lado mantendo calcanhar no chão',
      'Outra perna estendida com dedos para cima',
      'Alterne os lados'
    ],
    tips: [
      'Requer boa mobilidade',
      'Calcanhar sempre no chão',
      'Movimento controlado'
    ]
  },
  {
    id: 'legs_step_up_reverse',
    name: 'Step-Up com Reversão em Pé',
    description: 'Step-up com movimento reverso',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Suba no banco',
      'Desça para trás com a perna oposta',
      'Retorne à posição no banco',
      'Alterne as pernas'
    ],
    tips: [
      'Movimento mais complexo',
      'Trabalha equilíbrio',
      'Controle na descida'
    ]
  },

  // POSTERIOR DE COXA/GLÚTEO
  {
    id: 'legs_deadlift',
    name: 'Levantamento Terra Convencional em Pé',
    description: 'Exercício composto para posterior de pernas',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé com a barra próxima às canelas',
      'Flexione quadris e joelhos para pegar a barra',
      'Levante a barra estendendo quadris e joelhos',
      'Mantenha as costas retas durante todo movimento'
    ],
    tips: [
      'Mantenha a barra próxima ao corpo',
      'Não arredonde as costas',
      'Inicie o movimento pelos quadris'
    ]
  },
  {
    id: 'legs_sumo_deadlift',
    name: 'Levantamento Terra Sumô em Pé',
    description: 'Variação com pés mais abertos',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Pés bem abertos, dedos para fora',
      'Pegada mais fechada na barra',
      'Levante estendendo quadris e joelhos',
      'Tronco mais ereto que convencional'
    ],
    tips: [
      'Pés mais abertos',
      'Trabalha mais glúteos',
      'Pegada dentro das pernas'
    ]
  },
  {
    id: 'legs_rdl_barbell',
    name: 'RDL (Terra Romeno) Barra em Pé',
    description: 'Romanian deadlift para posterior',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Inicie em pé com a barra',
      'Flexione apenas os quadris',
      'Desça a barra próxima às pernas',
      'Suba contraindo glúteos e posteriores'
    ],
    tips: [
      'Joelhos ligeiramente flexionados',
      'Movimento pelos quadris',
      'Foque no alongamento posterior'
    ]
  },
  {
    id: 'legs_rdl_dumbbell',
    name: 'RDL Halteres em Pé',
    description: 'Romanian deadlift com halteres',
    muscleGroup: 'Pernas',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Halteres na frente das coxas',
      'Flexione os quadris descendo os halteres',
      'Mantenha próximo às pernas',
      'Suba contraindo glúteos'
    ],
    tips: [
      'Maior amplitude que barra',
      'Movimento natural',
      'Foque no posterior'
    ]
  },
  {
    id: 'legs_stiff_leg',
    name: 'Stiff Barra em Pé',
    description: 'Deadlift com pernas rígidas',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Pernas mais rígidas que RDL',
      'Flexione apenas quadris',
      'Desça até sentir alongamento',
      'Suba contraindo posteriores'
    ],
    tips: [
      'Pernas mais rígidas',
      'Maior alongamento posterior',
      'Amplitude menor que RDL'
    ]
  },
  {
    id: 'glutes_hip_thrust',
    name: 'Hip Thrust com Barra',
    description: 'Exercício específico para glúteos',
    muscleGroup: 'Glúteos',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente no chão com as costas apoiadas no banco',
      'Posicione a barra sobre os quadris',
      'Eleve os quadris contraindo os glúteos',
      'Desça controladamente'
    ],
    tips: [
      'Contraia fortemente os glúteos no topo',
      'Mantenha o queixo recolhido',
      'Use uma almofada na barra para conforto'
    ]
  },
  {
    id: 'glutes_hip_thrust_machine',
    name: 'Hip Thrust Máquina Sentado',
    description: 'Hip thrust na máquina específica',
    muscleGroup: 'Glúteos',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajuste a máquina',
      'Posicione-se corretamente',
      'Empurre com os glúteos',
      'Contraia no topo'
    ],
    tips: [
      'Máquina facilita execução',
      'Foque na contração',
      'Movimento controlado'
    ]
  },
  {
    id: 'glutes_bridge',
    name: 'Glute Bridge com Barra',
    description: 'Ponte de glúteo com peso',
    muscleGroup: 'Glúteos',
    equipment: 'Barra',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite com joelhos flexionados',
      'Barra sobre os quadris',
      'Eleve os quadris contraindo glúteos',
      'Desça controladamente'
    ],
    tips: [
      'Versão no chão do hip thrust',
      'Contraia os glúteos no topo',
      'Não arqueie as costas'
    ]
  },
  {
    id: 'legs_nordic_curl',
    name: 'Nordic Curl',
    description: 'Exercício avançado para posteriores',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ajoelhe com pés presos',
      'Desça o tronco controladamente',
      'Use os posteriores para controlar',
      'Empurre com as mãos para subir'
    ],
    tips: [
      'Exercício muito avançado',
      'Controle excêntrico',
      'Pode usar assistência'
    ]
  },
  {
    id: 'legs_ghr',
    name: 'GHR (Glute Ham Raise)',
    description: 'Exercício na máquina GHR',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione-se na máquina GHR',
      'Desça controladamente',
      'Suba usando posteriores e glúteos',
      'Movimento completo'
    ],
    tips: [
      'Máquina específica',
      'Trabalha posteriores intensamente',
      'Movimento controlado'
    ]
  },
  {
    id: 'legs_good_morning',
    name: 'Good Morning Barra em Pé',
    description: 'Flexão de quadril com barra',
    muscleGroup: 'Pernas',
    equipment: 'Barra',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Barra nos trapézios como agachamento',
      'Flexione apenas os quadris',
      'Desça até sentir alongamento',
      'Suba contraindo glúteos'
    ],
    tips: [
      'Movimento pelos quadris',
      'Mantenha costas retas',
      'Não desça muito'
    ]
  },
  {
    id: 'legs_single_leg_rdl',
    name: 'RDL Unilateral com Halter em Pé',
    description: 'Romanian deadlift unilateral',
    muscleGroup: 'Pernas',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Equilibre-se em uma perna',
      'Flexione o quadril descendo o halter',
      'Outra perna vai para trás',
      'Suba contraindo glúteo'
    ],
    tips: [
      'Trabalha equilíbrio',
      'Uma perna de cada vez',
      'Foque no glúteo da perna de apoio'
    ]
  },
  {
    id: 'glutes_single_leg_bridge',
    name: 'Ponte de Glúteo Unilateral',
    description: 'Ponte com uma perna',
    muscleGroup: 'Glúteos',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite com um joelho flexionado',
      'Outra perna estendida',
      'Eleve o quadril com uma perna',
      'Contraia o glúteo intensamente'
    ],
    tips: [
      'Uma perna trabalha',
      'Maior ativação do glúteo',
      'Mantenha equilíbrio'
    ]
  },

  // ABDUTORES
  {
    id: 'glutes_abductor_machine',
    name: 'Máquina Abdutora Sentado',
    description: 'Abdução de quadril na máquina',
    muscleGroup: 'Glúteos',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente na máquina abdutora',
      'Abra as pernas contra a resistência',
      'Contraia os glúteos médios',
      'Retorne controladamente'
    ],
    tips: [
      'Foque nos glúteos médios',
      'Movimento controlado',
      'Não use impulso'
    ]
  },
  {
    id: 'glutes_cable_abduction',
    name: 'Abdução de Quadril no Cabo em Pé',
    description: 'Abdução com cabo',
    muscleGroup: 'Glúteos',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabo preso no tornozelo',
      'Abra a perna lateralmente',
      'Contraia o glúteo médio',
      'Retorne controladamente'
    ],
    tips: [
      'Mantenha o tronco estável',
      'Foque no glúteo médio',
      'Movimento lateral puro'
    ]
  },
  {
    id: 'glutes_band_abduction',
    name: 'Abdução de Quadril com Miniband em Pé',
    description: 'Abdução com elástico',
    muscleGroup: 'Glúteos',
    equipment: 'Elástico',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Miniband ao redor das pernas',
      'Abra as pernas contra a resistência',
      'Mantenha tensão constante',
      'Controle o movimento'
    ],
    tips: [
      'Tensão constante',
      'Movimento controlado',
      'Foque nos glúteos'
    ]
  },
  {
    id: 'glutes_lateral_walk',
    name: 'Caminhada Lateral com Miniband em Pé',
    description: 'Caminhada lateral com elástico',
    muscleGroup: 'Glúteos',
    equipment: 'Elástico',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Miniband ao redor das pernas',
      'Caminhe lateralmente mantendo tensão',
      'Passos controlados',
      'Mantenha postura agachada'
    ],
    tips: [
      'Mantenha tensão constante',
      'Passos controlados',
      'Postura ligeiramente agachada'
    ]
  },
  {
    id: 'glutes_side_lying_abduction',
    name: 'Abdução de Quadril Deitado Lateral (Solo)',
    description: 'Abdução deitado de lado',
    muscleGroup: 'Glúteos',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite de lado',
      'Eleve a perna de cima',
      'Contraia o glúteo médio',
      'Desça controladamente'
    ],
    tips: [
      'Movimento puro lateral',
      'Foque no glúteo médio',
      'Não gire o quadril'
    ]
  },
  {
    id: 'glutes_cable_abduction_standing',
    name: 'Abdução de Quadril na Polia Baixa em Pé',
    description: 'Abdução na polia baixa',
    muscleGroup: 'Glúteos',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Polia baixa presa no tornozelo',
      'Abra a perna lateralmente',
      'Mantenha o tronco estável',
      'Contraia o glúteo médio'
    ],
    tips: [
      'Resistência constante',
      'Movimento lateral',
      'Estabilize o tronco'
    ]
  },

  // ADUTORES
  {
    id: 'legs_adductor_machine',
    name: 'Máquina Adutora Sentado',
    description: 'Adução de quadril na máquina',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente na máquina adutora',
      'Feche as pernas contra a resistência',
      'Contraia os adutores',
      'Retorne controladamente'
    ],
    tips: [
      'Foque nos adutores',
      'Movimento controlado',
      'Não use impulso'
    ]
  },
  {
    id: 'legs_cable_adduction',
    name: 'Adução de Quadril no Cabo em Pé',
    description: 'Adução com cabo',
    muscleGroup: 'Pernas',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabo preso no tornozelo',
      'Puxe a perna para dentro',
      'Cruze na frente da perna de apoio',
      'Contraia os adutores'
    ],
    tips: [
      'Movimento para dentro',
      'Cruze na frente',
      'Foque nos adutores'
    ]
  },
  {
    id: 'legs_ball_squeeze',
    name: 'Squeeze de Bola entre Joelhos Sentado',
    description: 'Compressão de bola com adutores',
    muscleGroup: 'Pernas',
    equipment: 'Medicine Ball',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente com bola entre os joelhos',
      'Aperte a bola com força',
      'Mantenha a contração',
      'Relaxe e repita'
    ],
    tips: [
      'Contração isométrica',
      'Foque nos adutores',
      'Mantenha a posição'
    ]
  },
  {
    id: 'legs_side_lying_adduction',
    name: 'Adução de Quadril Deitado Lateral (Solo)',
    description: 'Adução deitado de lado',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite de lado',
      'Perna de cima flexionada à frente',
      'Eleve a perna de baixo',
      'Contraia os adutores'
    ],
    tips: [
      'Perna de baixo trabalha',
      'Movimento pequeno',
      'Foque nos adutores'
    ]
  },
  {
    id: 'legs_copenhagen_adduction',
    name: 'Copenhagen Adduction (Progredir com Cautela)',
    description: 'Adução avançada de Copenhagen',
    muscleGroup: 'Pernas',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Apoie a perna de cima no banco',
      'Mantenha prancha lateral',
      'Eleve a perna de baixo',
      'Exercício muito avançado'
    ],
    tips: [
      'Exercício muito avançado',
      'Comece com progressões',
      'Cuidado com lesões'
    ]
  },
  {
    id: 'legs_cable_cross_adduction',
    name: 'Adução na Polia Baixa Cruzada em Pé',
    description: 'Adução cruzada no cabo',
    muscleGroup: 'Pernas',
    equipment: 'Cabo',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cabo do lado oposto',
      'Puxe a perna cruzando',
      'Movimento diagonal',
      'Contraia os adutores'
    ],
    tips: [
      'Movimento cruzado',
      'Resistência constante',
      'Foque nos adutores'
    ]
  },

  // PANTURRILHAS
  {
    id: 'calves_standing_raise',
    name: 'Panturrilha em Pé Máquina/Smith em Pé',
    description: 'Elevação de panturrilha em pé',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione-se na máquina',
      'Eleve-se na ponta dos pés',
      'Contraia as panturrilhas no topo',
      'Desça controladamente'
    ],
    tips: [
      'Amplitude completa',
      'Contraia no topo',
      'Desça até alongar'
    ]
  },
  {
    id: 'calves_dumbbell_raise',
    name: 'Panturrilha com Halteres em Pé',
    description: 'Elevação com halteres',
    muscleGroup: 'Pernas',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Halteres nas mãos',
      'Eleve-se na ponta dos pés',
      'Contraia as panturrilhas',
      'Desça controladamente'
    ],
    tips: [
      'Use step para amplitude',
      'Contraia no topo',
      'Movimento controlado'
    ]
  },
  {
    id: 'calves_seated_raise',
    name: 'Panturrilha Sentado (Sóleo) Sentado',
    description: 'Exercício para o sóleo',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente na máquina',
      'Joelhos flexionados',
      'Eleve os calcanhares',
      'Foca no sóleo'
    ],
    tips: [
      'Trabalha o sóleo especificamente',
      'Joelhos flexionados',
      'Amplitude completa'
    ]
  },
  {
    id: 'calves_leg_press',
    name: 'Panturrilha no Leg Press Sentado',
    description: 'Panturrilha na máquina leg press',
    muscleGroup: 'Pernas',
    equipment: 'Máquina',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicione apenas os dedos na plataforma',
      'Empurre com as panturrilhas',
      'Amplitude completa',
      'Contraia no final'
    ],
    tips: [
      'Apenas dedos na plataforma',
      'Grande amplitude',
      'Controle o movimento'
    ]
  },
  {
    id: 'calves_single_leg_raise',
    name: 'Panturrilha Unilateral com Halter em Pé',
    description: 'Elevação unilateral',
    muscleGroup: 'Pernas',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Uma perna de cada vez',
      'Halter na mão do mesmo lado',
      'Eleve-se na ponta do pé',
      'Trabalha equilíbrio também'
    ],
    tips: [
      'Uma perna trabalha',
      'Maior ativação',
      'Trabalha equilíbrio'
    ]
  },

  // ATLETISMO - PISTA (VELOCIDADE)
  {
    id: 'athletics_50m',
    name: '50m Sprint',
    description: 'Corrida de velocidade de 50 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de largada baixa',
      'Explosão máxima na saída',
      'Mantenha velocidade máxima',
      'Técnica de corrida perfeita'
    ],
    tips: [
      'Foque na técnica de saída',
      'Velocidade máxima',
      'Respiração controlada'
    ]
  },
  {
    id: 'athletics_60m',
    name: '60m Sprint',
    description: 'Corrida de velocidade de 60 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada explosiva',
      'Aceleração progressiva',
      'Manutenção da velocidade',
      'Finalização forte'
    ],
    tips: [
      'Distância padrão indoor',
      'Foque na aceleração',
      'Técnica de passada'
    ]
  },
  {
    id: 'athletics_80m',
    name: '80m Sprint',
    description: 'Corrida de velocidade de 80 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Saída dos blocos',
      'Fase de aceleração',
      'Velocidade máxima',
      'Manutenção até o fim'
    ],
    tips: [
      'Distância de desenvolvimento',
      'Trabalha resistência de velocidade',
      'Técnica consistente'
    ]
  },
  {
    id: 'athletics_100m',
    name: '100m Sprint',
    description: 'Corrida de velocidade clássica de 100 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada dos blocos perfeita',
      'Aceleração até 60-70m',
      'Manutenção da velocidade máxima',
      'Finalização relaxada'
    ],
    tips: [
      'Prova rainha da velocidade',
      'Técnica fundamental',
      'Relaxamento na reta final'
    ]
  },
  {
    id: 'athletics_150m',
    name: '150m Sprint',
    description: 'Corrida de velocidade de 150 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada explosiva',
      'Velocidade máxima até 100m',
      'Resistência de velocidade',
      'Manutenção técnica'
    ],
    tips: [
      'Transição velocidade-resistência',
      'Demanda alta potência',
      'Controle do ritmo'
    ]
  },
  {
    id: 'athletics_200m',
    name: '200m Sprint',
    description: 'Corrida de velocidade de 200 metros com curva',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada na curva',
      'Aceleração controlada',
      'Técnica de curva',
      'Explosão na reta final'
    ],
    tips: [
      'Técnica de curva essencial',
      'Distribuição de energia',
      'Inclinação na curva'
    ]
  },
  {
    id: 'athletics_300m',
    name: '300m Sprint',
    description: 'Corrida de velocidade prolongada de 300 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Saída controlada',
      'Ritmo alto mas sustentável',
      'Resistência de velocidade',
      'Finalização forte'
    ],
    tips: [
      'Prova de resistência de velocidade',
      'Controle do lactato',
      'Estratégia de prova'
    ]
  },
  {
    id: 'athletics_400m',
    name: '400m Sprint',
    description: 'Corrida de velocidade de 400 metros - volta completa',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada rápida mas controlada',
      'Primeira curva técnica',
      'Manutenção na reta oposta',
      'Resistência na segunda curva',
      'Explosão final'
    ],
    tips: [
      'Prova mais difícil do atletismo',
      'Estratégia de distribuição',
      'Resistência anaeróbica'
    ]
  },

  // ATLETISMO - BARREIRAS
  {
    id: 'athletics_60m_hurdles',
    name: '60m com Barreiras (Hurdles)',
    description: 'Corrida com barreiras indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada explosiva',
      'Ritmo de 3 passadas entre barreiras',
      'Técnica de transposição',
      'Manutenção do ritmo'
    ],
    tips: [
      'Técnica específica de barreira',
      'Ritmo constante',
      'Flexibilidade essencial'
    ]
  },
  {
    id: 'athletics_80m_hurdles',
    name: '80m com Barreiras',
    description: 'Corrida com barreiras juvenil',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Adaptação da técnica de 100m',
      'Barreiras mais baixas',
      'Desenvolvimento técnico',
      'Progressão para 100m'
    ],
    tips: [
      'Categoria de desenvolvimento',
      'Foco na técnica',
      'Preparação para adulto'
    ]
  },
  {
    id: 'athletics_100m_hurdles',
    name: '100m com Barreiras',
    description: 'Corrida com barreiras feminina',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada até primeira barreira',
      '3 passadas entre barreiras',
      'Técnica de ataque e passagem',
      'Velocidade entre obstáculos'
    ],
    tips: [
      'Prova técnica complexa',
      'Coordenação essencial',
      'Velocidade + técnica'
    ]
  },
  {
    id: 'athletics_110m_hurdles',
    name: '110m com Barreiras',
    description: 'Corrida com barreiras masculina',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada explosiva',
      'Primeira barreira em 8 passadas',
      '3 passadas entre barreiras',
      'Manutenção da velocidade'
    ],
    tips: [
      'Barreiras mais altas',
      'Maior exigência técnica',
      'Força e flexibilidade'
    ]
  },
  {
    id: 'athletics_400m_hurdles',
    name: '400m com Barreiras',
    description: 'Corrida com barreiras de volta completa',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia de distribuição',
      'Alternância de pernas',
      'Manutenção técnica com fadiga',
      'Resistência + técnica'
    ],
    tips: [
      'Prova mais complexa',
      'Estratégia fundamental',
      'Resistência anaeróbica'
    ]
  },

  // ATLETISMO - MEIO-FUNDO
  {
    id: 'athletics_600m',
    name: '600m',
    description: 'Corrida de meio-fundo de 600 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada controlada',
      'Ritmo sustentável',
      'Mudanças de ritmo',
      'Sprint final'
    ],
    tips: [
      'Transição velocidade-resistência',
      'Controle do ritmo',
      'Tática de prova'
    ]
  },
  {
    id: 'athletics_800m',
    name: '800m',
    description: 'Corrida clássica de meio-fundo',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Primeira volta controlada',
      'Posicionamento estratégico',
      'Segunda volta progressiva',
      'Sprint final nos últimos 200m'
    ],
    tips: [
      'Prova mais tática',
      'Equilíbrio anaeróbico/aeróbico',
      'Posicionamento crucial'
    ]
  },
  {
    id: 'athletics_1000m',
    name: '1.000m',
    description: 'Corrida de 1000 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo constante inicial',
      'Controle do meio da prova',
      'Preparação para sprint',
      'Finalização forte'
    ],
    tips: [
      'Distância de desenvolvimento',
      'Resistência aeróbica',
      'Controle de ritmo'
    ]
  },
  {
    id: 'athletics_1500m',
    name: '1.500m',
    description: 'Milha métrica - corrida clássica',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada posicionada',
      'Primeiras voltas controladas',
      'Mudanças de ritmo táticas',
      'Sprint final decisivo'
    ],
    tips: [
      'Prova mais tática do meio-fundo',
      'Velocidade final crucial',
      'Posicionamento estratégico'
    ]
  },
  {
    id: 'athletics_mile',
    name: '1 Milha (1.609m)',
    description: 'Milha inglesa - distância histórica',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo controlado inicial',
      'Distribuição estratégica',
      'Aceleração progressiva',
      'Sprint final'
    ],
    tips: [
      'Distância histórica',
      'Barreira dos 4 minutos',
      'Estratégia de ritmo'
    ]
  },

  // ATLETISMO - FUNDO
  {
    id: 'athletics_2000m',
    name: '2.000m',
    description: 'Corrida de fundo de 2000 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo aeróbico sustentável',
      'Controle da respiração',
      'Mudanças de ritmo',
      'Resistência mental'
    ],
    tips: [
      'Base aeróbica importante',
      'Controle de ritmo',
      'Resistência mental'
    ]
  },
  {
    id: 'athletics_3000m',
    name: '3.000m',
    description: 'Corrida de fundo de 3000 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo constante',
      'Economia de movimento',
      'Controle tático',
      'Sprint final'
    ],
    tips: [
      'Prova de resistência',
      'Economia energética',
      'Tática de grupo'
    ]
  },
  {
    id: 'athletics_5000m',
    name: '5.000m',
    description: 'Corrida clássica de fundo',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo aeróbico controlado',
      'Posicionamento no pelotão',
      'Mudanças de ritmo táticas',
      'Kick final'
    ],
    tips: [
      'Prova tática complexa',
      'Base aeróbica sólida',
      'Velocidade final'
    ]
  },
  {
    id: 'athletics_10000m',
    name: '10.000m',
    description: 'Corrida de fundo longa na pista',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo muito controlado',
      'Economia máxima',
      'Hidratação estratégica',
      'Resistência mental'
    ],
    tips: [
      'Prova de resistência pura',
      'Controle de ritmo crucial',
      'Preparação mental'
    ]
  },
  {
    id: 'athletics_1hour_run',
    name: '1 Hora Corrida (Pista)',
    description: 'Corrida por tempo determinado',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo constante sustentável',
      'Controle de voltas',
      'Economia energética',
      'Foco mental'
    ],
    tips: [
      'Prova por tempo',
      'Ritmo muito controlado',
      'Resistência mental'
    ]
  },

  // ATLETISMO - OBSTÁCULOS
  {
    id: 'athletics_2000m_steeplechase',
    name: '2.000m com Obstáculos',
    description: 'Corrida com obstáculos de 2000m',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de obstáculos',
      'Passagem no fosso',
      'Ritmo sustentável',
      'Coordenação específica'
    ],
    tips: [
      'Técnica específica necessária',
      'Coordenação complexa',
      'Resistência + habilidade'
    ]
  },
  {
    id: 'athletics_3000m_steeplechase',
    name: '3.000m com Obstáculos (Steeplechase)',
    description: 'Corrida clássica com obstáculos e fosso',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de transposição',
      'Passagem no fosso d\'água',
      'Ritmo de corrida de fundo',
      'Coordenação sob fadiga'
    ],
    tips: [
      'Prova mais técnica do fundo',
      'Fosso d\'água desafiador',
      'Técnica + resistência'
    ]
  },

  // ATLETISMO - REVEZAMENTOS
  {
    id: 'athletics_4x100m',
    name: '4×100m Relay',
    description: 'Revezamento de velocidade',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Passagem de bastão perfeita',
      'Zona de passagem',
      'Velocidade máxima',
      'Sincronização da equipe'
    ],
    tips: [
      'Técnica de passagem crucial',
      'Trabalho em equipe',
      'Velocidade + precisão'
    ]
  },
  {
    id: 'athletics_4x200m',
    name: '4×200m Relay',
    description: 'Revezamento de velocidade prolongada',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Passagem em velocidade',
      'Técnica de curva',
      'Resistência de velocidade',
      'Coordenação de equipe'
    ],
    tips: [
      'Combina velocidade e resistência',
      'Técnica de curva',
      'Passagens precisas'
    ]
  },
  {
    id: 'athletics_4x400m',
    name: '4×400m Relay',
    description: 'Revezamento clássico de meio-fundo',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia de equipe',
      'Distribuição de esforço',
      'Passagem controlada',
      'Tática de prova'
    ],
    tips: [
      'Prova mais tática',
      'Estratégia de equipe',
      'Resistência anaeróbica'
    ]
  },
  {
    id: 'athletics_4x800m',
    name: '4×800m Relay',
    description: 'Revezamento de meio-fundo',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo controlado',
      'Passagem em movimento',
      'Resistência aeróbica',
      'Tática de equipe'
    ],
    tips: [
      'Prova de resistência',
      'Controle de ritmo',
      'Trabalho em equipe'
    ]
  },
  {
    id: 'athletics_swedish_medley',
    name: 'Medley Sueco (100–200–300–400m)',
    description: 'Revezamento com distâncias progressivas',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Especialistas em cada distância',
      'Passagens variadas',
      'Estratégia específica',
      'Coordenação complexa'
    ],
    tips: [
      'Cada atleta especializado',
      'Distâncias progressivas',
      'Estratégia única'
    ]
  },
  {
    id: 'athletics_mixed_medley',
    name: 'Revezamento Medley (Misto)',
    description: 'Revezamento com distâncias variadas',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Combinação de distâncias',
      'Especialização por trecho',
      'Passagens técnicas',
      'Estratégia adaptada'
    ],
    tips: [
      'Versatilidade da equipe',
      'Estratégia complexa',
      'Especialização necessária'
    ]
  },

  // ATLETISMO - MARCHA ATLÉTICA
  {
    id: 'athletics_3000m_walk',
    name: '3.000m Race Walk',
    description: 'Marcha atlética de 3000 metros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de marcha correta',
      'Contato constante com solo',
      'Perna estendida no apoio',
      'Ritmo sustentável'
    ],
    tips: [
      'Técnica específica obrigatória',
      'Regras rígidas',
      'Eficiência energética'
    ]
  },
  {
    id: 'athletics_5km_walk',
    name: '5km Race Walk',
    description: 'Marcha atlética de 5 quilômetros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de marcha perfeita',
      'Economia de movimento',
      'Controle de ritmo',
      'Resistência específica'
    ],
    tips: [
      'Distância de desenvolvimento',
      'Técnica fundamental',
      'Resistência aeróbica'
    ]
  },
  {
    id: 'athletics_10km_walk',
    name: '10km Race Walk',
    description: 'Marcha atlética de 10 quilômetros',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica consistente',
      'Ritmo controlado',
      'Economia energética',
      'Resistência mental'
    ],
    tips: [
      'Prova de resistência',
      'Técnica sob fadiga',
      'Controle mental'
    ]
  },
  {
    id: 'athletics_20km_walk',
    name: '20km Race Walk',
    description: 'Marcha atlética olímpica',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica perfeita por longa duração',
      'Estratégia de hidratação',
      'Controle de ritmo',
      'Resistência específica'
    ],
    tips: [
      'Prova olímpica',
      'Técnica + resistência',
      'Preparação específica'
    ]
  },
  {
    id: 'athletics_35km_walk',
    name: '35km Race Walk',
    description: 'Marcha atlética de longa distância',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica econômica',
      'Estratégia nutricional',
      'Controle de esforço',
      'Resistência extrema'
    ],
    tips: [
      'Prova de ultra-resistência',
      'Preparação específica',
      'Aspecto mental crucial'
    ]
  },

  // ATLETISMO - SALTOS
  {
    id: 'athletics_long_jump',
    name: 'Salto em Distância (Long Jump)',
    description: 'Salto horizontal clássico',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Corrida de aproximação',
      'Impulsão na tábua',
      'Fase de voo',
      'Aterrissagem na areia'
    ],
    tips: [
      'Velocidade de aproximação',
      'Técnica de impulsão',
      'Coordenação complexa'
    ]
  },
  {
    id: 'athletics_triple_jump',
    name: 'Salto Triplo (Triple Jump)',
    description: 'Sequência de três saltos',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Corrida de aproximação',
      'Hop (mesmo pé)',
      'Step (pé oposto)',
      'Jump (aterrissagem)'
    ],
    tips: [
      'Sequência hop-step-jump',
      'Ritmo específico',
      'Técnica complexa'
    ]
  },
  {
    id: 'athletics_high_jump',
    name: 'Salto em Altura (High Jump)',
    description: 'Salto vertical sobre sarrafo',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Corrida em curva',
      'Impulsão vertical',
      'Técnica Fosbury',
      'Passagem sobre sarrafo'
    ],
    tips: [
      'Técnica Fosbury Flop',
      'Corrida em J',
      'Impulsão vertical'
    ]
  },
  {
    id: 'athletics_pole_vault',
    name: 'Salto com Vara (Pole Vault)',
    description: 'Salto com auxílio de vara',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Corrida com vara',
      'Encaixe da vara',
      'Balanço e inversão',
      'Passagem sobre sarrafo'
    ],
    tips: [
      'Técnica mais complexa',
      'Força e coordenação',
      'Equipamento específico'
    ]
  },

  // ATLETISMO - LANÇAMENTOS/ARREMESSOS
  {
    id: 'athletics_shot_put',
    name: 'Arremesso do Peso (Shot Put)',
    description: 'Arremesso de peso de ferro',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Livre',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição inicial no círculo',
      'Técnica de deslizamento',
      'Explosão final',
      'Liberação do peso'
    ],
    tips: [
      'Força explosiva',
      'Técnica específica',
      'Coordenação de corpo inteiro'
    ]
  },
  {
    id: 'athletics_discus',
    name: 'Lançamento do Disco (Discus)',
    description: 'Lançamento rotacional do disco',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Livre',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição inicial',
      'Rotação no círculo',
      'Aceleração progressiva',
      'Liberação do disco'
    ],
    tips: [
      'Técnica rotacional',
      'Coordenação complexa',
      'Força e velocidade'
    ]
  },
  {
    id: 'athletics_javelin',
    name: 'Lançamento do Dardo (Javelin)',
    description: 'Lançamento do dardo com corrida',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Livre',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Corrida de aproximação',
      'Fase de preparação',
      'Lançamento explosivo',
      'Seguimento do movimento'
    ],
    tips: [
      'Corrida + lançamento',
      'Técnica específica',
      'Coordenação total'
    ]
  },
  {
    id: 'athletics_hammer',
    name: 'Lançamento do Martelo (Hammer)',
    description: 'Lançamento rotacional do martelo',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Livre',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Rotações preliminares',
      'Giros no círculo',
      'Aceleração progressiva',
      'Liberação final'
    ],
    tips: [
      'Técnica mais complexa',
      'Múltiplas rotações',
      'Força e coordenação'
    ]
  },

  // ATLETISMO - PROVAS COMBINADAS
  {
    id: 'athletics_decathlon',
    name: 'Decatlo (Decathlon)',
    description: 'Dez provas em dois dias',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Dia 1: 100m, salto distância, peso, altura, 400m',
      'Dia 2: 110m barreiras, disco, vara, dardo, 1500m',
      'Versatilidade total',
      'Resistência mental'
    ],
    tips: [
      'Prova mais completa',
      'Versatilidade total',
      'Preparação específica'
    ]
  },
  {
    id: 'athletics_heptathlon_outdoor',
    name: 'Heptatlo Outdoor',
    description: 'Sete provas femininas outdoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Dia 1: 100m barreiras, altura, peso, 200m',
      'Dia 2: distância, dardo, 800m',
      'Versatilidade feminina',
      'Resistência e técnica'
    ],
    tips: [
      'Prova combinada feminina',
      'Sete modalidades',
      'Versatilidade necessária'
    ]
  },
  {
    id: 'athletics_heptathlon_indoor',
    name: 'Heptatlo Indoor',
    description: 'Sete provas adaptadas para indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Adaptação para pista coberta',
      'Provas modificadas',
      'Técnica indoor',
      'Versatilidade adaptada'
    ],
    tips: [
      'Versão indoor',
      'Provas adaptadas',
      'Técnica específica'
    ]
  },
  {
    id: 'athletics_pentathlon_indoor',
    name: 'Pentatlo Indoor',
    description: 'Cinco provas indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Cinco provas em um dia',
      'Adaptação indoor',
      'Versatilidade reduzida',
      'Preparação específica'
    ],
    tips: [
      'Versão reduzida',
      'Cinco modalidades',
      'Preparação indoor'
    ]
  },

  // ATLETISMO - ESTRADA/RUA
  {
    id: 'athletics_5km_road',
    name: '5km Road Race',
    description: 'Corrida de rua de 5 quilômetros',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo sustentável',
      'Adaptação ao terreno',
      'Controle de respiração',
      'Sprint final'
    ],
    tips: [
      'Distância popular',
      'Boa para iniciantes',
      'Ritmo controlado'
    ]
  },
  {
    id: 'athletics_10km_road',
    name: '10km Road Race',
    description: 'Corrida de rua clássica',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo aeróbico',
      'Controle de esforço',
      'Adaptação ao percurso',
      'Finalização forte'
    ],
    tips: [
      'Distância muito popular',
      'Base aeróbica importante',
      'Estratégia de ritmo'
    ]
  },
  {
    id: 'athletics_15km_road',
    name: '15km Road Race',
    description: 'Corrida de rua de 15 quilômetros',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo controlado',
      'Resistência aeróbica',
      'Controle nutricional',
      'Preparação para distâncias maiores'
    ],
    tips: [
      'Preparação para meia maratona',
      'Resistência importante',
      'Controle de ritmo'
    ]
  },
  {
    id: 'athletics_20km_road',
    name: '20km Road Race',
    description: 'Corrida de rua de 20 quilômetros',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia de hidratação',
      'Ritmo sustentável',
      'Resistência mental',
      'Preparação específica'
    ],
    tips: [
      'Distância desafiadora',
      'Preparação específica',
      'Aspecto mental importante'
    ]
  },
  {
    id: 'athletics_half_marathon',
    name: 'Meia Maratona (21,097km)',
    description: 'Meia maratona oficial',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia de ritmo',
      'Hidratação planejada',
      'Controle mental',
      'Preparação de longo prazo'
    ],
    tips: [
      'Distância clássica',
      'Preparação de meses',
      'Estratégia crucial'
    ]
  },
  {
    id: 'athletics_marathon',
    name: 'Maratona (42,195km)',
    description: 'Distância clássica da maratona',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia nutricional',
      'Controle rigoroso de ritmo',
      'Preparação mental',
      'Resistência extrema'
    ],
    tips: [
      'Prova mais icônica',
      'Preparação de meses',
      'Desafio mental e físico'
    ]
  },
  {
    id: 'athletics_10_miles',
    name: '10 Milhas (16,1km)',
    description: 'Corrida de 10 milhas inglesas',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Ritmo de meia maratona',
      'Resistência aeróbica',
      'Controle de esforço',
      'Preparação específica'
    ],
    tips: [
      'Distância inglesa',
      'Boa preparação',
      'Ritmo controlado'
    ]
  },
  {
    id: 'athletics_100km_ultra',
    name: '100km Ultra',
    description: 'Ultra maratona de 100 quilômetros',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia nutricional complexa',
      'Ritmo muito controlado',
      'Preparação mental extrema',
      'Resistência ultra'
    ],
    tips: [
      'Prova de ultra resistência',
      'Preparação específica',
      'Aspecto mental crucial'
    ]
  },

  // ATLETISMO - CROSS-COUNTRY
  {
    id: 'athletics_cross_short',
    name: 'Cross Curto (4–6km)',
    description: 'Cross country de distância curta',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Adaptação ao terreno irregular',
      'Ritmo variável',
      'Técnica de subidas e descidas',
      'Resistência específica'
    ],
    tips: [
      'Terreno natural',
      'Técnica específica',
      'Adaptação ao ambiente'
    ]
  },
  {
    id: 'athletics_cross_long',
    name: 'Cross Longo (8–12km)',
    description: 'Cross country de distância longa',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Resistência em terreno variado',
      'Estratégia de ritmo',
      'Técnica de terreno',
      'Preparação mental'
    ],
    tips: [
      'Prova de resistência',
      'Terreno desafiador',
      'Preparação específica'
    ]
  },
  {
    id: 'athletics_cross_relay',
    name: 'Cross Revezamento Misto',
    description: 'Revezamento em cross country',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Trabalho em equipe',
      'Adaptação ao terreno',
      'Passagem de bastão',
      'Estratégia de equipe'
    ],
    tips: [
      'Combina equipe e terreno',
      'Estratégia específica',
      'Coordenação complexa'
    ]
  },

  // ATLETISMO - MONTANHA/TRAIL
  {
    id: 'athletics_vertical_mountain',
    name: 'Corrida em Montanha Vertical',
    description: 'Corrida vertical em montanha',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de subida íngreme',
      'Uso de bastões (opcional)',
      'Respiração controlada',
      'Força específica de pernas'
    ],
    tips: [
      'Modalidade específica',
      'Técnica de subida',
      'Preparação específica'
    ]
  },
  {
    id: 'athletics_classic_mountain',
    name: 'Corrida em Montanha Clássica',
    description: 'Corrida tradicional em montanha',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Subida e descida',
      'Técnica de terreno',
      'Resistência específica',
      'Adaptação à altitude'
    ],
    tips: [
      'Subida e descida',
      'Técnica variada',
      'Preparação específica'
    ]
  },
  {
    id: 'athletics_short_trail',
    name: 'Trail Curto (≤40km)',
    description: 'Trail running de distância curta',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Adaptação ao terreno natural',
      'Técnica de trail',
      'Hidratação estratégica',
      'Navegação básica'
    ],
    tips: [
      'Modalidade em crescimento',
      'Técnica específica',
      'Contato com natureza'
    ]
  },
  {
    id: 'athletics_ultra_trail',
    name: 'Trail Longo/Ultra (>40km)',
    description: 'Ultra trail running',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia nutricional complexa',
      'Gestão de esforço',
      'Técnica de terreno variado',
      'Preparação mental extrema'
    ],
    tips: [
      'Prova de ultra resistência',
      'Preparação específica longa',
      'Aspecto mental crucial'
    ]
  },

  // ATLETISMO - INDOOR
  {
    id: 'athletics_60m_indoor',
    name: '60m Indoor',
    description: 'Velocidade padrão indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Largada explosiva',
      'Aceleração máxima',
      'Adaptação à pista indoor',
      'Técnica específica'
    ],
    tips: [
      'Distância padrão indoor',
      'Pista mais curta',
      'Curvas mais fechadas'
    ]
  },
  {
    id: 'athletics_60m_hurdles_indoor',
    name: '60m com Barreiras Indoor',
    description: 'Barreiras padrão indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de barreiras adaptada',
      'Ritmo específico indoor',
      'Coordenação em espaço reduzido',
      'Velocidade + técnica'
    ],
    tips: [
      'Adaptação para indoor',
      'Espaço mais limitado',
      'Técnica específica'
    ]
  },
  {
    id: 'athletics_200m_indoor',
    name: '200m Indoor',
    description: 'Velocidade prolongada indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Técnica de curva fechada',
      'Adaptação à pista indoor',
      'Distribuição de esforço',
      'Inclinação específica'
    ],
    tips: [
      'Curvas mais fechadas',
      'Técnica específica',
      'Adaptação necessária'
    ]
  },
  {
    id: 'athletics_400m_indoor',
    name: '400m Indoor',
    description: 'Volta completa indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia adaptada',
      'Técnica de curvas fechadas',
      'Resistência anaeróbica',
      'Controle de ritmo'
    ],
    tips: [
      'Mais curvas que outdoor',
      'Técnica específica',
      'Estratégia adaptada'
    ]
  },
  {
    id: 'athletics_800m_indoor',
    name: '800m Indoor',
    description: 'Meio-fundo indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicionamento estratégico',
      'Adaptação às curvas',
      'Tática específica',
      'Sprint final'
    ],
    tips: [
      'Mais tático que outdoor',
      'Posicionamento crucial',
      'Curvas frequentes'
    ]
  },
  {
    id: 'athletics_1500m_indoor',
    name: '1.500m Indoor',
    description: 'Meio-fundo longo indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Tática de pelotão',
      'Adaptação ao ambiente',
      'Mudanças de ritmo',
      'Kick final'
    ],
    tips: [
      'Prova muito tática',
      'Ambiente fechado',
      'Estratégia específica'
    ]
  },
  {
    id: 'athletics_3000m_indoor',
    name: '3.000m Indoor',
    description: 'Fundo indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Resistência em ambiente fechado',
      'Controle de ritmo',
      'Tática de grupo',
      'Adaptação ao ambiente'
    ],
    tips: [
      'Muitas voltas',
      'Ambiente fechado',
      'Resistência mental'
    ]
  },
  {
    id: 'athletics_4x400m_indoor',
    name: '4×400m Indoor',
    description: 'Revezamento indoor',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Estratégia de equipe adaptada',
      'Passagens em curvas fechadas',
      'Coordenação específica',
      'Tática indoor'
    ],
    tips: [
      'Adaptação para indoor',
      'Passagens específicas',
      'Trabalho em equipe'
    ]
  },

  // DRILLS TÉCNICOS DE CORRIDA
  {
    id: 'running_drills_a_skip',
    name: 'A-Skip',
    description: 'Drill técnico básico de corrida',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Eleve o joelho até 90 graus',
      'Mantenha postura ereta',
      'Movimento alternado',
      'Apoio no antepé'
    ],
    tips: [
      'Drill fundamental',
      'Desenvolve coordenação',
      'Base para outros drills'
    ]
  },
  {
    id: 'running_drills_b_skip',
    name: 'B-Skip',
    description: 'Drill técnico avançado',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'A-skip + extensão da perna',
      'Joelho alto, depois estende',
      'Puxada ativa da perna',
      'Coordenação complexa'
    ],
    tips: [
      'Evolução do A-skip',
      'Mais coordenação',
      'Técnica específica'
    ]
  },
  {
    id: 'running_drills_c_skip',
    name: 'C-Skip',
    description: 'Drill técnico com movimento circular',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Movimento circular da perna',
      'Joelho alto, movimento para frente',
      'Coordenação específica',
      'Técnica avançada'
    ],
    tips: [
      'Movimento circular',
      'Coordenação avançada',
      'Técnica específica'
    ]
  },
  {
    id: 'running_drills_high_knees',
    name: 'Joelho Alto (High Knees)',
    description: 'Elevação de joelhos',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Eleve os joelhos alternadamente',
      'Mantenha ritmo acelerado',
      'Postura ereta',
      'Apoio no antepé'
    ],
    tips: [
      'Drill básico',
      'Desenvolve força',
      'Melhora coordenação'
    ]
  },
  {
    id: 'running_drills_butt_kicks',
    name: 'Calcanhar no Glúteo (Butt Kicks)',
    description: 'Elevação dos calcanhares',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Leve os calcanhares aos glúteos',
      'Movimento alternado rápido',
      'Mantenha tronco ereto',
      'Trabalha flexibilidade'
    ],
    tips: [
      'Melhora flexibilidade',
      'Ativa posteriores',
      'Drill complementar'
    ]
  },
  {
    id: 'running_drills_skipping',
    name: 'Skippings no Lugar',
    description: 'Skipping estacionário',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Movimento de corrida no lugar',
      'Joelhos moderadamente altos',
      'Ritmo constante',
      'Coordenação básica'
    ],
    tips: [
      'Aquecimento ideal',
      'Coordenação básica',
      'Preparação para drills'
    ]
  },
  {
    id: 'running_drills_stride_technique',
    name: 'Técnica de Passada (Drive)',
    description: 'Desenvolvimento da passada',
    muscleGroup: 'Atletismo',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Passadas longas e controladas',
      'Foco na técnica',
      'Velocidade progressiva',
      'Coordenação total'
    ],
    tips: [
      'Desenvolve técnica',
      'Melhora eficiência',
      'Preparação específica'
    ]
  },
  {
    id: 'running_drills_block_starts',
    name: 'Saída dos Blocos (Técnica)',
    description: 'Técnica de largada',
    muscleGroup: 'Atletismo',
    equipment: 'Pista',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posicionamento nos blocos',
      'Reação ao comando',
      'Explosão inicial',
      'Transição para corrida'
    ],
    tips: [
      'Técnica específica',
      'Fundamental para velocidade',
      'Requer prática específica'
    ]
  },

  // PLIOMETRIA
  {
    id: 'plyometrics_box_jump',
    name: 'Box Jump',
    description: 'Salto em caixa',
    muscleGroup: 'Pliometria',
    equipment: 'Caixa',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição inicial com pés paralelos',
      'Salto explosivo para cima da caixa',
      'Aterrissagem suave',
      'Desça controladamente'
    ],
    tips: [
      'Aterrissagem suave',
      'Altura progressiva',
      'Foco na explosão'
    ]
  },
  {
    id: 'plyometrics_box_jump_over',
    name: 'Box Jump-Over',
    description: 'Salto sobre a caixa',
    muscleGroup: 'Pliometria',
    equipment: 'Caixa',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Salte sobre a caixa',
      'Aterrisse do outro lado',
      'Movimento contínuo',
      'Coordenação bilateral'
    ],
    tips: [
      'Movimento fluido',
      'Aterrissagem controlada',
      'Coordenação importante'
    ]
  },
  {
    id: 'plyometrics_broad_jump',
    name: 'Broad Jump (Salto Horizontal)',
    description: 'Salto horizontal máximo',
    muscleGroup: 'Pliometria',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição inicial agachada',
      'Salto horizontal máximo',
      'Aterrissagem em agachamento',
      'Explosão dos membros inferiores'
    ],
    tips: [
      'Foco na distância',
      'Aterrissagem segura',
      'Explosão máxima'
    ]
  },
  {
    id: 'plyometrics_lateral_hop',
    name: 'Lateral Hop',
    description: 'Salto lateral',
    muscleGroup: 'Pliometria',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Saltos laterais alternados',
      'Aterrissagem em uma perna',
      'Movimento controlado',
      'Estabilização lateral'
    ],
    tips: [
      'Controle lateral',
      'Estabilização importante',
      'Movimento alternado'
    ]
  },
  {
    id: 'plyometrics_single_leg_hop',
    name: 'Single-Leg Hop',
    description: 'Salto unilateral',
    muscleGroup: 'Pliometria',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Saltos em uma perna só',
      'Aterrissagem na mesma perna',
      'Equilíbrio e força',
      'Alternância entre pernas'
    ],
    tips: [
      'Trabalha equilíbrio',
      'Força unilateral',
      'Progressão gradual'
    ]
  },
  {
    id: 'plyometrics_depth_jump',
    name: 'Depth Jump',
    description: 'Salto em profundidade',
    muscleGroup: 'Pliometria',
    equipment: 'Caixa',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Desça da caixa',
      'Aterrisse e salte imediatamente',
      'Tempo de contato mínimo',
      'Reatividade máxima'
    ],
    tips: [
      'Exercício avançado',
      'Tempo de contato mínimo',
      'Reatividade muscular'
    ]
  },
  {
    id: 'plyometrics_drop_jump',
    name: 'Drop Jump',
    description: 'Salto de queda',
    muscleGroup: 'Pliometria',
    equipment: 'Caixa',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Caia da caixa',
      'Aterrissagem e salto vertical',
      'Absorção e explosão',
      'Ciclo alongamento-encurtamento'
    ],
    tips: [
      'Foco na reatividade',
      'Absorção + explosão',
      'Exercício específico'
    ]
  },
  {
    id: 'plyometrics_hurdle_hops',
    name: 'Hurdle Hops',
    description: 'Saltos sobre barreiras baixas',
    muscleGroup: 'Pliometria',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Saltos consecutivos sobre obstáculos',
      'Aterrissagem e decolagem rápida',
      'Ritmo constante',
      'Coordenação específica'
    ],
    tips: [
      'Ritmo importante',
      'Coordenação específica',
      'Progressão gradual'
    ]
  },
  {
    id: 'plyometrics_bounding',
    name: 'Bounding',
    description: 'Saltos alternados longos',
    muscleGroup: 'Pliometria',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Saltos alternados longos',
      'Ênfase na distância',
      'Coordenação de braços',
      'Ritmo específico'
    ],
    tips: [
      'Foco na distância',
      'Coordenação total',
      'Específico para corrida'
    ]
  },
  {
    id: 'plyometrics_skater_jump',
    name: 'Skater Jump',
    description: 'Salto lateral tipo patinador',
    muscleGroup: 'Pliometria',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Salto lateral com uma perna',
      'Aterrissagem na perna oposta',
      'Movimento de patinação',
      'Estabilização lateral'
    ],
    tips: [
      'Movimento lateral',
      'Estabilização importante',
      'Coordenação específica'
    ]
  },

  // FUNCIONAL/CONDICIONAMENTO/CROSSFIT
  {
    id: 'functional_burpee',
    name: 'Burpee',
    description: 'Exercício funcional completo',
    muscleGroup: 'Funcional',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Agachamento com mãos no chão',
      'Salte os pés para trás (prancha)',
      'Flexão de braço (opcional)',
      'Salte os pés de volta e pule'
    ],
    tips: [
      'Movimento fluido',
      'Respiração controlada',
      'Modifique se necessário'
    ]
  },
  {
    id: 'functional_burpee_box_jump',
    name: 'Burpee Box Jump-Over',
    description: 'Burpee com salto sobre caixa',
    muscleGroup: 'Funcional',
    equipment: 'Caixa',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Burpee completo',
      'Salte sobre a caixa',
      'Aterrisse do outro lado',
      'Movimento contínuo'
    ],
    tips: [
      'Exercício muito intenso',
      'Aterrissagem segura',
      'Ritmo controlado'
    ]
  },
  {
    id: 'functional_burpee_pullup',
    name: 'Burpee Pull-Up',
    description: 'Burpee com barra fixa',
    muscleGroup: 'Funcional',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Burpee sob a barra',
      'Salte e segure a barra',
      'Execute uma barra fixa',
      'Desça e repita'
    ],
    tips: [
      'Combinação complexa',
      'Força e resistência',
      'Movimento avançado'
    ]
  },
  {
    id: 'functional_wall_ball',
    name: 'Wall Ball Shot',
    description: 'Arremesso de medicine ball na parede',
    muscleGroup: 'Funcional',
    equipment: 'Medicine Ball',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Agachamento com medicine ball',
      'Suba e arremesse na parede',
      'Pegue a bola na descida',
      'Movimento contínuo'
    ],
    tips: [
      'Movimento fluido',
      'Alvo na parede',
      'Ritmo constante'
    ]
  },
  {
    id: 'functional_thruster_barbell',
    name: 'Thruster com Barra',
    description: 'Agachamento frontal + desenvolvimento',
    muscleGroup: 'Funcional',
    equipment: 'Barra',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Front squat completo',
      'Suba e empurre a barra overhead',
      'Movimento contínuo',
      'Coordenação total'
    ],
    tips: [
      'Movimento composto',
      'Coordenação essencial',
      'Força total'
    ]
  },
  {
    id: 'functional_thruster_dumbbell',
    name: 'Thruster com Halter (Unilateral)',
    description: 'Thruster unilateral',
    muscleGroup: 'Funcional',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Agachamento com halter no ombro',
      'Suba e empurre overhead',
      'Uma mão de cada vez',
      'Trabalha estabilização'
    ],
    tips: [
      'Desafio unilateral',
      'Estabilização importante',
      'Coordenação específica'
    ]
  },
  {
    id: 'functional_dumbbell_snatch',
    name: 'Dumbbell Snatch (Alternado)',
    description: 'Arranque com halter alternado',
    muscleGroup: 'Funcional',
    equipment: 'Halteres',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Halter no chão',
      'Puxe em um movimento até overhead',
      'Alterne os braços',
      'Movimento explosivo'
    ],
    tips: [
      'Movimento explosivo',
      'Técnica específica',
      'Coordenação total'
    ]
  },
  {
    id: 'functional_dumbbell_clean',
    name: 'Dumbbell Clean (Alternado)',
    description: 'Clean com halter alternado',
    muscleGroup: 'Funcional',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Halter no chão',
      'Puxe até o ombro',
      'Alterne os braços',
      'Movimento explosivo'
    ],
    tips: [
      'Explosão dos quadris',
      'Técnica específica',
      'Alternância controlada'
    ]
  },
  {
    id: 'functional_devils_press',
    name: 'Devil\'s Press',
    description: 'Burpee com halteres e overhead',
    muscleGroup: 'Funcional',
    equipment: 'Halteres',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Burpee segurando halteres',
      'Suba e leve halteres overhead',
      'Movimento muito intenso',
      'Coordenação complexa'
    ],
    tips: [
      'Exercício muito intenso',
      'Coordenação essencial',
      'Movimento avançado'
    ]
  },
  {
    id: 'functional_ring_row',
    name: 'Ring Row',
    description: 'Remada em anéis',
    muscleGroup: 'Funcional',
    equipment: 'TRX',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Segure os anéis inclinado',
      'Puxe o corpo para cima',
      'Mantenha corpo alinhado',
      'Controle na descida'
    ],
    tips: [
      'Ajuste a inclinação',
      'Corpo alinhado',
      'Progressão gradual'
    ]
  },

  // KETTLEBELL
  {
    id: 'kettlebell_swing_russian',
    name: 'Kettlebell Swing (Russo)',
    description: 'Swing até altura dos ombros',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Kettlebell entre as pernas',
      'Explosão dos quadris',
      'Swing até altura dos ombros',
      'Controle na descida'
    ],
    tips: [
      'Movimento dos quadris',
      'Não use os braços',
      'Contraia o core'
    ]
  },
  {
    id: 'kettlebell_swing_american',
    name: 'Kettlebell Swing (Americano)',
    description: 'Swing até overhead',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Swing completo até overhead',
      'Maior amplitude que russo',
      'Explosão máxima dos quadris',
      'Controle total'
    ],
    tips: [
      'Amplitude completa',
      'Maior demanda',
      'Técnica perfeita'
    ]
  },
  {
    id: 'kettlebell_swing_single',
    name: 'Kettlebell Swing Unilateral',
    description: 'Swing com uma mão',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Swing com uma mão',
      'Alterne as mãos',
      'Maior desafio de estabilização',
      'Controle anti-rotacional'
    ],
    tips: [
      'Desafio unilateral',
      'Estabilização importante',
      'Alternância controlada'
    ]
  },
  {
    id: 'kettlebell_clean',
    name: 'Kettlebell Clean',
    description: 'Clean com kettlebell',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Puxe o kettlebell ao ombro',
      'Movimento explosivo',
      'Aterrissagem suave',
      'Técnica específica'
    ],
    tips: [
      'Técnica específica',
      'Explosão dos quadris',
      'Aterrissagem controlada'
    ]
  },
  {
    id: 'kettlebell_clean_jerk',
    name: 'Kettlebell Clean & Jerk',
    description: 'Clean seguido de jerk',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Clean até o ombro',
      'Jerk até overhead',
      'Movimento composto',
      'Coordenação total'
    ],
    tips: [
      'Movimento composto',
      'Técnica avançada',
      'Força e coordenação'
    ]
  },
  {
    id: 'kettlebell_snatch',
    name: 'Kettlebell Snatch',
    description: 'Arranque com kettlebell',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Um movimento do chão ao overhead',
      'Explosão máxima',
      'Técnica complexa',
      'Coordenação total'
    ],
    tips: [
      'Movimento mais técnico',
      'Explosão máxima',
      'Prática específica'
    ]
  },
  {
    id: 'kettlebell_thruster',
    name: 'Kettlebell Thruster (Duplo)',
    description: 'Thruster com dois kettlebells',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Dois kettlebells nos ombros',
      'Agachamento + overhead press',
      'Movimento contínuo',
      'Força total'
    ],
    tips: [
      'Movimento composto',
      'Dois kettlebells',
      'Coordenação bilateral'
    ]
  },
  {
    id: 'kettlebell_push_press',
    name: 'Kettlebell Push Press',
    description: 'Push press com kettlebell',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Kettlebell no ombro',
      'Leve flexão das pernas',
      'Explosão para overhead',
      'Uso das pernas'
    ],
    tips: [
      'Use as pernas',
      'Explosão coordenada',
      'Técnica específica'
    ]
  },
  {
    id: 'kettlebell_high_pull',
    name: 'Kettlebell High Pull',
    description: 'Puxada alta com kettlebell',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Puxe o kettlebell até o peito',
      'Cotovelos altos',
      'Explosão dos quadris',
      'Movimento vertical'
    ],
    tips: [
      'Cotovelos altos',
      'Explosão dos quadris',
      'Movimento vertical'
    ]
  },
  {
    id: 'kettlebell_turkish_getup',
    name: 'Turkish Get-Up',
    description: 'Exercício funcional complexo',
    muscleGroup: 'Kettlebell',
    equipment: 'Kettlebell',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite com kettlebell estendido',
      'Levante-se passando por várias posições',
      'Mantenha o peso sempre acima do ombro',
      'Retorne à posição inicial'
    ],
    tips: [
      'Aprenda cada fase',
      'Peso sempre estável',
      'Pratique sem peso primeiro'
    ]
  },

  // CORE
  {
    id: 'core_plank',
    name: 'Plank (Prancha Frontal)',
    description: 'Exercício isométrico para core',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de flexão apoiado nos antebraços',
      'Mantenha o corpo alinhado',
      'Contraia o abdômen',
      'Respire normalmente'
    ],
    tips: [
      'Não deixe o quadril cair ou subir',
      'Mantenha o pescoço neutro',
      'Contraia o core durante todo o tempo'
    ]
  },
  {
    id: 'core_rkc_plank',
    name: 'RKC Plank',
    description: 'Prancha com máxima contração',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de prancha',
      'Contraia TODOS os músculos',
      'Glúteos, core, pernas',
      'Tensão máxima'
    ],
    tips: [
      'Contração total do corpo',
      'Tempo menor que prancha normal',
      'Intensidade máxima'
    ]
  },
  {
    id: 'core_side_plank',
    name: 'Side Plank',
    description: 'Prancha lateral',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite de lado apoiado no antebraço',
      'Eleve o quadril',
      'Corpo alinhado',
      'Mantenha a posição'
    ],
    tips: [
      'Trabalha oblíquos',
      'Corpo em linha reta',
      'Alterne os lados'
    ]
  },
  {
    id: 'core_side_plank_leg_lift',
    name: 'Side Plank com Perna Elevada',
    description: 'Prancha lateral com elevação de perna',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Avançado',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de prancha lateral',
      'Eleve a perna de cima',
      'Mantenha estabilidade',
      'Desafio adicional'
    ],
    tips: [
      'Maior desafio',
      'Estabilização importante',
      'Controle total'
    ]
  },
  {
    id: 'core_plank_rotation',
    name: 'Plank com Rotação',
    description: 'Prancha com movimento rotacional',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição de prancha alta',
      'Gire para prancha lateral',
      'Alterne os lados',
      'Movimento controlado'
    ],
    tips: [
      'Movimento fluido',
      'Controle na transição',
      'Trabalha rotação'
    ]
  },
  {
    id: 'core_plank_up_down',
    name: 'Plank Up-Down',
    description: 'Transição entre pranchas',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Alterne entre prancha alta e baixa',
      'Suba e desça controladamente',
      'Mantenha quadril estável',
      'Movimento alternado'
    ],
    tips: [
      'Quadril estável',
      'Movimento controlado',
      'Alterne o braço que inicia'
    ]
  },
  {
    id: 'core_hollow_hold',
    name: 'Hollow Hold',
    description: 'Posição oca isométrica',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite de costas',
      'Eleve ombros e pernas',
      'Forme uma posição "oca"',
      'Mantenha lombar no chão'
    ],
    tips: [
      'Lombar sempre no chão',
      'Posição desafiadora',
      'Respiração controlada'
    ]
  },
  {
    id: 'core_hollow_rock',
    name: 'Hollow Rock',
    description: 'Balanço na posição oca',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Posição hollow hold',
      'Balance para frente e para trás',
      'Mantenha a forma',
      'Movimento controlado'
    ],
    tips: [
      'Mantenha a posição oca',
      'Balanço controlado',
      'Core sempre contraído'
    ]
  },
  {
    id: 'core_dead_bug',
    name: 'Dead Bug',
    description: 'Exercício de estabilização do core',
    muscleGroup: 'Core',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Deite com joelhos e braços a 90°',
      'Estenda braço e perna opostos',
      'Retorne à posição inicial',
      'Alterne os lados'
    ],
    tips: [
      'Lombar sempre no chão',
      'Movimento controlado',
      'Respiração coordenada'
    ]
  },
  {
    id: 'core_dead_bug_band',
    name: 'Dead Bug com Banda',
    description: 'Dead bug com resistência',
    muscleGroup: 'Core',
    equipment: 'Elástico',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Dead bug com elástico',
      'Resistência adicional',
      'Maior desafio de estabilização',
      'Controle anti-rotacional'
    ],
    tips: [
      'Resistência adicional',
      'Maior desafio',
      'Controle importante'
    ]
  },

  // MOBILIDADE
  {
    id: 'mobility_deep_squat',
    name: 'Cócora Profunda (Deep Squat)',
    description: 'Posição de cócora para mobilidade',
    muscleGroup: 'Mobilidade',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Agache o mais profundo possível',
      'Calcanhares no chão',
      'Mantenha a posição',
      'Respire normalmente'
    ],
    tips: [
      'Posição natural',
      'Melhora mobilidade geral',
      'Mantenha por tempo'
    ]
  },
  {
    id: 'mobility_cossack_squat',
    name: 'Cossack Squat (Mobilidade Lateral)',
    description: 'Agachamento lateral para mobilidade',
    muscleGroup: 'Mobilidade',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Pernas bem abertas',
      'Desça para um lado',
      'Outra perna estendida',
      'Alterne os lados'
    ],
    tips: [
      'Melhora mobilidade lateral',
      'Calcanhar sempre no chão',
      'Movimento controlado'
    ]
  },
  {
    id: 'mobility_90_90',
    name: '90/90 (Transições)',
    description: 'Posição 90/90 para quadris',
    muscleGroup: 'Mobilidade',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Sente com ambas pernas a 90°',
      'Transicione entre os lados',
      'Trabalha rotação do quadril',
      'Movimento controlado'
    ],
    tips: [
      'Excelente para quadris',
      'Rotação interna e externa',
      'Progressão gradual'
    ]
  },
  {
    id: 'mobility_pigeon_stretch',
    name: 'Pigeon Stretch (Glúteo)',
    description: 'Alongamento do pombo para glúteos',
    muscleGroup: 'Mobilidade',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Uma perna flexionada à frente',
      'Outra perna estendida atrás',
      'Incline o tronco para frente',
      'Mantenha a posição'
    ],
    tips: [
      'Alongamento profundo',
      'Respiração relaxada',
      'Progressão gradual'
    ]
  },
  {
    id: 'mobility_couch_stretch',
    name: 'Couch Stretch (Flexor do Quadril)',
    description: 'Alongamento do flexor do quadril',
    muscleGroup: 'Mobilidade',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Pé traseiro elevado',
      'Joelho da frente a 90°',
      'Empurre o quadril para frente',
      'Mantenha postura ereta'
    ],
    tips: [
      'Alonga flexores do quadril',
      'Postura ereta',
      'Respiração profunda'
    ]
  },

  // ALONGAMENTO
  {
    id: 'stretching_chest_doorway',
    name: 'Peitoral na Porta',
    description: 'Alongamento do peitoral na porta',
    muscleGroup: 'Alongamento',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Apoie o antebraço na porta',
      'Dê um passo à frente',
      'Sinta o alongamento no peito',
      'Mantenha por 30 segundos'
    ],
    tips: [
      'Alongamento efetivo',
      'Várias alturas do braço',
      'Respiração relaxada'
    ]
  },
  {
    id: 'stretching_lat_pulldown',
    name: 'Lat (Barra/Parede)',
    description: 'Alongamento do latíssimo',
    muscleGroup: 'Alongamento',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Segure uma barra ou apoie na parede',
      'Incline o corpo para o lado',
      'Sinta o alongamento lateral',
      'Alterne os lados'
    ],
    tips: [
      'Alongamento lateral',
      'Respiração profunda',
      'Movimento suave'
    ]
  },
  {
    id: 'stretching_triceps_overhead',
    name: 'Tríceps Overhead',
    description: 'Alongamento do tríceps acima da cabeça',
    muscleGroup: 'Alongamento',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Leve o braço atrás da cabeça',
      'Puxe o cotovelo com a outra mão',
      'Sinta o alongamento no tríceps',
      'Alterne os braços'
    ],
    tips: [
      'Alongamento simples',
      'Não force muito',
      'Respiração relaxada'
    ]
  },

  // EQUILÍBRIO & CONTROLE MOTOR
  {
    id: 'balance_single_leg',
    name: 'Aviãozinho (Single-Leg Balance)',
    description: 'Equilíbrio em uma perna',
    muscleGroup: 'Equilíbrio',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Equilibre-se em uma perna',
      'Outra perna estendida para trás',
      'Braços abertos para equilíbrio',
      'Mantenha a posição'
    ],
    tips: [
      'Desenvolve equilíbrio',
      'Fortalece estabilizadores',
      'Progressão gradual'
    ]
  },
  {
    id: 'balance_eyes_closed',
    name: 'Single-Leg Balance — Olhos Fechados',
    description: 'Equilíbrio sem visão',
    muscleGroup: 'Equilíbrio',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Equilibre-se em uma perna',
      'Feche os olhos',
      'Mantenha a posição',
      'Desafio proprioceptivo'
    ],
    tips: [
      'Maior desafio',
      'Desenvolve propriocepção',
      'Comece com tempo curto'
    ]
  },

  // PROPRIOCEPÇÃO
  {
    id: 'proprioception_balance_board',
    name: 'Balance Board — Estático',
    description: 'Equilíbrio em prancha instável',
    muscleGroup: 'Propriocepção',
    equipment: 'Bosu',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Fique em pé na prancha de equilíbrio',
      'Mantenha estabilidade',
      'Trabalha propriocepção',
      'Progressão gradual'
    ],
    tips: [
      'Desenvolve propriocepção',
      'Fortalece estabilizadores',
      'Progressão importante'
    ]
  },

  // CONDICIONAMENTO GERAL
  {
    id: 'conditioning_continuous_run',
    name: 'Corrida Contínua Leve',
    description: 'Corrida aeróbica contínua',
    muscleGroup: 'Condicionamento',
    equipment: 'Peso Corporal',
    difficulty: 'Iniciante',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Corrida em ritmo confortável',
      'Respiração controlada',
      'Ritmo conversacional',
      'Duração prolongada'
    ],
    tips: [
      'Base aeróbica',
      'Ritmo sustentável',
      'Respiração natural'
    ]
  },
  {
    id: 'conditioning_interval_run',
    name: 'Corrida Intervalada (TI)',
    description: 'Treino intervalado de corrida',
    muscleGroup: 'Condicionamento',
    equipment: 'Peso Corporal',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Alterne períodos intensos e recuperação',
      'Exemplo: 1min forte, 1min leve',
      'Melhora capacidade anaeróbica',
      'Controle do tempo'
    ],
    tips: [
      'Melhora performance',
      'Controle de intensidade',
      'Recuperação ativa'
    ]
  },
  {
    id: 'conditioning_bike_intervals',
    name: 'Bike de Ar (Assault) — Intervalos',
    description: 'Intervalos na bike de ar',
    muscleGroup: 'Condicionamento',
    equipment: 'Máquina',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Intervalos de alta intensidade',
      'Use braços e pernas',
      'Recuperação ativa',
      'Controle da intensidade'
    ],
    tips: [
      'Exercício total',
      'Alta intensidade',
      'Recuperação importante'
    ]
  },
  {
    id: 'conditioning_rowing_intervals',
    name: 'Remo Erg — Intervalos',
    description: 'Intervalos no remo ergométrico',
    muscleGroup: 'Condicionamento',
    equipment: 'Máquina',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Intervalos no remo',
      'Técnica de remada',
      'Potência controlada',
      'Recuperação ativa'
    ],
    tips: [
      'Técnica importante',
      'Exercício completo',
      'Controle da potência'
    ]
  },
  {
    id: 'conditioning_skierg_intervals',
    name: 'SkiErg — Intervalos',
    description: 'Intervalos no SkiErg',
    muscleGroup: 'Condicionamento',
    equipment: 'Máquina',
    difficulty: 'Intermediário',
    gifUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    instructions: [
      'Movimento de esqui',
      'Puxada com braços e core',
      'Intervalos de alta intensidade',
      'Técnica específica'
    ],
    tips: [
      'Movimento específico',
      'Trabalha core intensamente',
      'Técnica importante'
    ]
  }
];

export function getExercisesByMuscleGroup(muscleGroup: string): ExerciseTemplate[] {
  return EXERCISES_DATABASE.filter(exercise => exercise.muscleGroup === muscleGroup);
}

export function getExercisesByEquipment(equipment: string): ExerciseTemplate[] {
  return EXERCISES_DATABASE.filter(exercise => exercise.equipment === equipment);
}

export function getExercisesByDifficulty(difficulty: string): ExerciseTemplate[] {
  return EXERCISES_DATABASE.filter(exercise => exercise.difficulty === difficulty);
}

export function searchExercises(query: string): ExerciseTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return EXERCISES_DATABASE.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery) ||
    exercise.description.toLowerCase().includes(lowercaseQuery) ||
    exercise.muscleGroup.toLowerCase().includes(lowercaseQuery)
  );
}