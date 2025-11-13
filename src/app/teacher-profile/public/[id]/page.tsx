'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Phone,
  Mail,
  Globe,
  DollarSign,
  CheckCircle,
  User,
  Award,
  Dumbbell,
  Target,
  MessageCircle,
  Video,
  Clock,
  ArrowLeft,
  Send,
  Heart,
  Share2,
  BookOpen,
  Play,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { isEnabled } from '@/lib/featureFlags';
import { exportNodeToPNG } from '@/lib/shareCard';
import ShareCard from '@/components/share/ShareCard';

interface TeacherProfile {
  id: string;
  name: string;
  photo: string;
  bio: string;
  education: {
    university: string;
    courses: string[];
    certifications: string[];
  };
  experience: {
    years: number;
    areas: string[];
  };
  modalities: string[];
  rating: number;
  totalReviews: number;
  location: string;
  services: {
    online: boolean;
    inPerson: boolean;
    hybrid: boolean;
  };
  plans: {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
  }[];
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}

interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  description: string;
  instructions: string[];
  sets: string;
  reps: string;
  rest: string;
  tips: string[];
  videoUrl?: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    planInterest: ''
  });

  const shareRef = useRef<HTMLDivElement | null>(null);
  const shareEnabled = isEnabled('share_card');

  // Mock data - em produção viria do banco de dados baseado no ID
  const profile: TeacherProfile = {
    id: '1',
    name: 'Carlos Silva',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
    bio: `Personal trainer especializado em transformação corporal com metodologia científica comprovada. Com mais de 8 anos de experiência, já ajudei centenas de alunos a alcançarem seus objetivos através de treinos personalizados e acompanhamento individualizado.

Minha abordagem combina conhecimento técnico avançado com motivação constante, garantindo resultados sustentáveis e duradouros. Especialista em hipertrofia, emagrecimento e condicionamento físico.

🏆 Mais de 500 transformações realizadas
📚 Formação acadêmica sólida e certificações internacionais
💪 Metodologia personalizada para cada objetivo
📱 Acompanhamento 24/7 via WhatsApp`,
    education: {
      university: 'Universidade Federal de São Paulo',
      courses: ['Educação Física - Bacharelado', 'Pós-graduação em Fisiologia do Exercício'],
      certifications: ['CREF 123456-G/SP', 'Certificação ACSM', 'Treinamento Funcional Level 2']
    },
    experience: {
      years: 8,
      areas: ['Hipertrofia', 'Emagrecimento', 'Condicionamento Físico', 'Reabilitação']
    },
    modalities: ['Musculação', 'Treinamento Funcional', 'Corrida', 'Crossfit', 'Pilates'],
    rating: 4.8,
    totalReviews: 127,
    location: 'São Paulo, SP',
    services: {
      online: true,
      inPerson: true,
      hybrid: true
    },
    plans: [
      {
        id: '1',
        name: 'Consultoria Online',
        price: 150,
        description: 'Treino personalizado e acompanhamento via WhatsApp',
        features: ['Treino personalizado', 'Acompanhamento diário', 'Ajustes semanais', 'Suporte via WhatsApp']
      },
      {
        id: '2',
        name: 'Personal Presencial',
        price: 80,
        description: 'Aula individual presencial (por sessão)',
        features: ['Aula individual', 'Correção de postura', 'Motivação presencial', 'Flexibilidade de horários']
      },
      {
        id: '3',
        name: 'Híbrido Premium',
        price: 300,
        description: 'Combinação de online e presencial',
        features: ['2x presencial/semana', 'Acompanhamento online', 'Plano nutricional', 'Relatórios mensais']
      }
    ],
    contact: {
      phone: '(11) 99999-9999',
      email: 'carlos@personaltrainer.com',
      website: 'www.carlossilvapt.com'
    }
  };

  const reviews: Review[] = [
    {
      id: '1',
      studentName: 'Maria Santos',
      rating: 5,
      comment: 'Excelente profissional! Consegui perder 15kg em 6 meses com o acompanhamento do Carlos. Super recomendo!',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      studentName: 'João Oliveira',
      rating: 5,
      comment: 'Carlos é muito dedicado e sempre adapta os treinos conforme minha evolução. Resultados incríveis!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '3',
      studentName: 'Ana Costa',
      rating: 4,
      comment: 'Ótimo personal! Me ajudou muito a ganhar massa muscular. Metodologia excelente.',
      date: '2024-01-05',
      verified: true
    },
    {
      id: '4',
      studentName: 'Pedro Lima',
      rating: 5,
      comment: 'Transformação incrível! Perdi 20kg e ganhei muito condicionamento físico. Recomendo demais!',
      date: '2024-01-01',
      verified: true
    }
  ];

  // BIBLIOTECA COMPLETA DE EXERCÍCIOS
  const exerciseLibrary: Exercise[] = [
    // PEITO
    {
      id: 'ex1',
      name: 'Supino Reto com Barra',
      category: 'Peito',
      muscleGroup: 'Peitoral Maior',
      equipment: 'Barra e Banco',
      difficulty: 'Intermediário',
      description: 'Exercício fundamental para desenvolvimento do peitoral, trabalha principalmente a porção média do peito.',
      instructions: [
        'Deite-se no banco com os pés apoiados no chão',
        'Segure a barra com pegada ligeiramente mais larga que os ombros',
        'Desça a barra controladamente até o meio do peito',
        'Empurre a barra de volta à posição inicial',
        'Mantenha os cotovelos em ângulo de 45 graus'
      ],
      sets: '3-4 séries',
      reps: '8-12 repetições',
      rest: '90-120 segundos',
      tips: [
        'Mantenha as escápulas retraídas durante todo movimento',
        'Não tire os glúteos do banco',
        'Controle a descida (2-3 segundos)',
        'Expire ao empurrar a barra'
      ]
    },
    {
      id: 'ex2',
      name: 'Supino Inclinado com Halteres',
      category: 'Peito',
      muscleGroup: 'Peitoral Superior',
      equipment: 'Halteres e Banco Inclinado',
      difficulty: 'Intermediário',
      description: 'Foca no desenvolvimento da porção superior do peitoral, essencial para um peito completo.',
      instructions: [
        'Ajuste o banco em 30-45 graus de inclinação',
        'Segure os halteres com pegada neutra',
        'Desça os halteres até a linha do peito superior',
        'Empurre os halteres de volta, aproximando-os no topo',
        'Mantenha controle total do movimento'
      ],
      sets: '3-4 séries',
      reps: '10-15 repetições',
      rest: '60-90 segundos',
      tips: [
        'Não incline o banco mais que 45 graus',
        'Foque na contração do peitoral superior',
        'Mantenha os cotovelos ligeiramente flexionados no topo',
        'Use amplitude completa de movimento'
      ]
    },
    {
      id: 'ex3',
      name: 'Crucifixo no Banco Reto',
      category: 'Peito',
      muscleGroup: 'Peitoral (Isolamento)',
      equipment: 'Halteres e Banco',
      difficulty: 'Iniciante',
      description: 'Exercício de isolamento que alonga e contrai intensamente o peitoral.',
      instructions: [
        'Deite-se no banco com halteres acima do peito',
        'Mantenha cotovelos levemente flexionados',
        'Abra os braços em arco até sentir alongamento',
        'Retorne à posição inicial contraindo o peito',
        'Imagine abraçar uma árvore'
      ],
      sets: '3 séries',
      reps: '12-15 repetições',
      rest: '60 segundos',
      tips: [
        'Não estenda completamente os cotovelos',
        'Controle o movimento na descida',
        'Foque na sensação de alongamento',
        'Não use peso excessivo'
      ]
    },
    {
      id: 'ex4',
      name: 'Flexão de Braço',
      category: 'Peito',
      muscleGroup: 'Peitoral, Tríceps, Ombros',
      equipment: 'Peso Corporal',
      difficulty: 'Iniciante',
      description: 'Exercício clássico e versátil que pode ser feito em qualquer lugar.',
      instructions: [
        'Posicione as mãos no chão na largura dos ombros',
        'Mantenha o corpo em linha reta',
        'Desça o corpo até o peito quase tocar o chão',
        'Empurre de volta à posição inicial',
        'Mantenha o core contraído'
      ],
      sets: '3-4 séries',
      reps: 'Até a falha ou 15-20 reps',
      rest: '60 segundos',
      tips: [
        'Não deixe o quadril cair',
        'Mantenha o pescoço neutro',
        'Varie a largura das mãos para diferentes estímulos',
        'Progressão: eleve os pés para maior dificuldade'
      ]
    },

    // COSTAS
    {
      id: 'ex5',
      name: 'Barra Fixa (Pull-up)',
      category: 'Costas',
      muscleGroup: 'Grande Dorsal',
      equipment: 'Barra Fixa',
      difficulty: 'Avançado',
      description: 'Exercício rei para desenvolvimento das costas, trabalha toda a musculatura dorsal.',
      instructions: [
        'Segure a barra com pegada pronada (palmas para frente)',
        'Pendure-se com braços estendidos',
        'Puxe o corpo até o queixo passar a barra',
        'Desça controladamente até extensão completa',
        'Mantenha o core ativado'
      ],
      sets: '3-4 séries',
      reps: '6-12 repetições',
      rest: '120 segundos',
      tips: [
        'Evite balançar o corpo',
        'Puxe com os cotovelos, não com os braços',
        'Desça completamente entre repetições',
        'Use elástico para assistência se necessário'
      ]
    },
    {
      id: 'ex6',
      name: 'Remada Curvada com Barra',
      category: 'Costas',
      muscleGroup: 'Médio das Costas',
      equipment: 'Barra',
      difficulty: 'Intermediário',
      description: 'Excelente para espessura das costas e desenvolvimento da região média.',
      instructions: [
        'Segure a barra com pegada pronada',
        'Incline o tronco a 45 graus',
        'Puxe a barra em direção ao abdômen inferior',
        'Contraia as escápulas no topo',
        'Desça controladamente'
      ],
      sets: '3-4 séries',
      reps: '8-12 repetições',
      rest: '90 segundos',
      tips: [
        'Mantenha as costas retas',
        'Não use impulso',
        'Foque em puxar com os cotovelos',
        'Mantenha os joelhos levemente flexionados'
      ]
    },
    {
      id: 'ex7',
      name: 'Pulldown na Polia',
      category: 'Costas',
      muscleGroup: 'Grande Dorsal',
      equipment: 'Polia Alta',
      difficulty: 'Iniciante',
      description: 'Alternativa à barra fixa, permite controle de carga e foco no dorsal.',
      instructions: [
        'Sente-se na máquina com coxas fixas',
        'Segure a barra com pegada larga',
        'Puxe a barra até a linha do peito',
        'Contraia as escápulas',
        'Retorne controladamente'
      ],
      sets: '3 séries',
      reps: '10-15 repetições',
      rest: '60-90 segundos',
      tips: [
        'Não incline excessivamente para trás',
        'Mantenha o peito elevado',
        'Evite usar o peso do corpo',
        'Foque na contração das costas'
      ]
    },
    {
      id: 'ex8',
      name: 'Remada Unilateral com Halter',
      category: 'Costas',
      muscleGroup: 'Grande Dorsal, Trapézio',
      equipment: 'Halter e Banco',
      difficulty: 'Iniciante',
      description: 'Permite trabalhar cada lado independentemente, corrigindo assimetrias.',
      instructions: [
        'Apoie joelho e mão no banco',
        'Segure o halter com braço estendido',
        'Puxe o halter em direção ao quadril',
        'Mantenha cotovelo próximo ao corpo',
        'Contraia no topo e desça controladamente'
      ],
      sets: '3 séries por lado',
      reps: '10-12 repetições',
      rest: '60 segundos',
      tips: [
        'Mantenha as costas paralelas ao chão',
        'Não rotacione o tronco',
        'Puxe com o cotovelo, não com a mão',
        'Sinta o alongamento na descida'
      ]
    },

    // PERNAS
    {
      id: 'ex9',
      name: 'Agachamento Livre',
      category: 'Pernas',
      muscleGroup: 'Quadríceps, Glúteos, Posterior',
      equipment: 'Barra',
      difficulty: 'Avançado',
      description: 'Rei dos exercícios para pernas, trabalha todo o corpo e libera hormônios anabólicos.',
      instructions: [
        'Posicione a barra nas costas (trapézio)',
        'Pés na largura dos ombros',
        'Desça até coxas paralelas ao chão',
        'Mantenha o peito elevado',
        'Empurre pelos calcanhares para subir'
      ],
      sets: '4 séries',
      reps: '8-12 repetições',
      rest: '120-180 segundos',
      tips: [
        'Joelhos alinhados com os pés',
        'Não deixe os joelhos ultrapassarem muito os pés',
        'Mantenha o core contraído',
        'Olhe para frente, não para baixo'
      ]
    },
    {
      id: 'ex10',
      name: 'Leg Press 45°',
      category: 'Pernas',
      muscleGroup: 'Quadríceps, Glúteos',
      equipment: 'Leg Press',
      difficulty: 'Iniciante',
      description: 'Alternativa segura ao agachamento, permite usar cargas pesadas com menor risco.',
      instructions: [
        'Sente-se com costas apoiadas',
        'Posicione os pés na plataforma',
        'Destrave a máquina',
        'Desça controladamente até 90 graus',
        'Empurre de volta sem travar os joelhos'
      ],
      sets: '3-4 séries',
      reps: '10-15 repetições',
      rest: '90 segundos',
      tips: [
        'Não tire a lombar do apoio',
        'Mantenha os joelhos alinhados',
        'Varie a posição dos pés para diferentes estímulos',
        'Não trave completamente os joelhos no topo'
      ]
    },
    {
      id: 'ex11',
      name: 'Stiff (Levantamento Terra Romeno)',
      category: 'Pernas',
      muscleGroup: 'Posterior de Coxa, Glúteos',
      equipment: 'Barra ou Halteres',
      difficulty: 'Intermediário',
      description: 'Excelente para posterior de coxa e glúteos, melhora postura e força.',
      instructions: [
        'Segure a barra com pegada pronada',
        'Mantenha pernas levemente flexionadas',
        'Incline o tronco para frente mantendo costas retas',
        'Desça até sentir alongamento no posterior',
        'Retorne contraindo glúteos e posterior'
      ],
      sets: '3 séries',
      reps: '10-12 repetições',
      rest: '90 segundos',
      tips: [
        'Mantenha a barra próxima ao corpo',
        'Não arredonde as costas',
        'Foque no alongamento do posterior',
        'Contraia os glúteos no topo'
      ]
    },
    {
      id: 'ex12',
      name: 'Cadeira Extensora',
      category: 'Pernas',
      muscleGroup: 'Quadríceps (Isolamento)',
      equipment: 'Cadeira Extensora',
      difficulty: 'Iniciante',
      description: 'Isolamento do quadríceps, ideal para finalização ou pré-exaustão.',
      instructions: [
        'Sente-se com costas apoiadas',
        'Ajuste o apoio dos pés',
        'Estenda as pernas completamente',
        'Contraia o quadríceps no topo',
        'Desça controladamente'
      ],
      sets: '3 séries',
      reps: '12-15 repetições',
      rest: '60 segundos',
      tips: [
        'Não use impulso',
        'Contraia por 1 segundo no topo',
        'Controle a descida (2-3 segundos)',
        'Não hiperextenda os joelhos'
      ]
    },

    // OMBROS
    {
      id: 'ex13',
      name: 'Desenvolvimento com Barra',
      category: 'Ombros',
      muscleGroup: 'Deltoides (Anterior e Médio)',
      equipment: 'Barra',
      difficulty: 'Intermediário',
      description: 'Exercício composto fundamental para desenvolvimento dos ombros.',
      instructions: [
        'Segure a barra na altura dos ombros',
        'Empurre a barra acima da cabeça',
        'Estenda completamente os braços',
        'Desça controladamente até os ombros',
        'Mantenha o core contraído'
      ],
      sets: '3-4 séries',
      reps: '8-12 repetições',
      rest: '90 segundos',
      tips: [
        'Não arqueie excessivamente as costas',
        'Mantenha os cotovelos ligeiramente à frente',
        'Expire ao empurrar',
        'Use cinto de força se necessário'
      ]
    },
    {
      id: 'ex14',
      name: 'Elevação Lateral com Halteres',
      category: 'Ombros',
      muscleGroup: 'Deltoide Médio',
      equipment: 'Halteres',
      difficulty: 'Iniciante',
      description: 'Isolamento do deltoide médio, essencial para largura dos ombros.',
      instructions: [
        'Segure halteres ao lado do corpo',
        'Eleve os braços lateralmente até a linha dos ombros',
        'Mantenha cotovelos levemente flexionados',
        'Desça controladamente',
        'Evite usar impulso'
      ],
      sets: '3 séries',
      reps: '12-15 repetições',
      rest: '60 segundos',
      tips: [
        'Não eleve acima da linha dos ombros',
        'Mantenha os polegares ligeiramente para baixo',
        'Controle o movimento',
        'Não balance o corpo'
      ]
    },
    {
      id: 'ex15',
      name: 'Elevação Frontal',
      category: 'Ombros',
      muscleGroup: 'Deltoide Anterior',
      equipment: 'Halteres ou Barra',
      difficulty: 'Iniciante',
      description: 'Foca no desenvolvimento da porção anterior dos ombros.',
      instructions: [
        'Segure halteres à frente das coxas',
        'Eleve os braços à frente até a linha dos olhos',
        'Mantenha braços estendidos',
        'Desça controladamente',
        'Alterne os braços ou faça simultâneo'
      ],
      sets: '3 séries',
      reps: '10-12 repetições',
      rest: '60 segundos',
      tips: [
        'Não use impulso do corpo',
        'Mantenha o core estável',
        'Não eleve muito acima da linha dos olhos',
        'Controle a descida'
      ]
    },
    {
      id: 'ex16',
      name: 'Crucifixo Inverso',
      category: 'Ombros',
      muscleGroup: 'Deltoide Posterior',
      equipment: 'Halteres',
      difficulty: 'Intermediário',
      description: 'Essencial para desenvolvimento do deltoide posterior, frequentemente negligenciado.',
      instructions: [
        'Incline o tronco a 90 graus',
        'Segure halteres com braços pendentes',
        'Abra os braços lateralmente',
        'Contraia as escápulas',
        'Retorne controladamente'
      ],
      sets: '3 séries',
      reps: '12-15 repetições',
      rest: '60 segundos',
      tips: [
        'Mantenha cotovelos levemente flexionados',
        'Foque na contração do deltoide posterior',
        'Não use peso excessivo',
        'Mantenha as costas retas'
      ]
    },

    // BRAÇOS
    {
      id: 'ex17',
      name: 'Rosca Direta com Barra',
      category: 'Braços',
      muscleGroup: 'Bíceps',
      equipment: 'Barra',
      difficulty: 'Iniciante',
      description: 'Exercício clássico para desenvolvimento dos bíceps.',
      instructions: [
        'Segure a barra com pegada supinada',
        'Mantenha cotovelos fixos ao lado do corpo',
        'Flexione os braços levando a barra ao peito',
        'Contraia os bíceps no topo',
        'Desça controladamente'
      ],
      sets: '3 séries',
      reps: '10-12 repetições',
      rest: '60 segundos',
      tips: [
        'Não balance o corpo',
        'Mantenha os cotovelos fixos',
        'Controle a fase excêntrica',
        'Não hiperextenda os cotovelos'
      ]
    },
    {
      id: 'ex18',
      name: 'Rosca Alternada com Halteres',
      category: 'Braços',
      muscleGroup: 'Bíceps',
      equipment: 'Halteres',
      difficulty: 'Iniciante',
      description: 'Permite trabalhar cada braço independentemente com rotação natural.',
      instructions: [
        'Segure halteres ao lado do corpo',
        'Flexione um braço de cada vez',
        'Rotacione o pulso durante a subida',
        'Contraia no topo',
        'Alterne os braços'
      ],
      sets: '3 séries',
      reps: '10-12 repetições por braço',
      rest: '60 segundos',
      tips: [
        'Mantenha o cotovelo fixo',
        'Rotacione o pulso naturalmente',
        'Não use impulso',
        'Controle ambas as fases'
      ]
    },
    {
      id: 'ex19',
      name: 'Tríceps Testa com Barra',
      category: 'Braços',
      muscleGroup: 'Tríceps',
      equipment: 'Barra e Banco',
      difficulty: 'Intermediário',
      description: 'Excelente para desenvolvimento da cabeça longa do tríceps.',
      instructions: [
        'Deite-se no banco com barra acima do peito',
        'Flexione apenas os cotovelos',
        'Desça a barra em direção à testa',
        'Estenda os braços de volta',
        'Mantenha cotovelos fixos'
      ],
      sets: '3 séries',
      reps: '10-12 repetições',
      rest: '60 segundos',
      tips: [
        'Não mova os cotovelos',
        'Controle a descida',
        'Não trave completamente no topo',
        'Use barra W para conforto nos pulsos'
      ]
    },
    {
      id: 'ex20',
      name: 'Tríceps na Polia',
      category: 'Braços',
      muscleGroup: 'Tríceps',
      equipment: 'Polia Alta',
      difficulty: 'Iniciante',
      description: 'Isolamento do tríceps com tensão constante.',
      instructions: [
        'Segure a barra ou corda na polia alta',
        'Mantenha cotovelos fixos ao lado do corpo',
        'Estenda os braços completamente',
        'Contraia os tríceps no final',
        'Retorne controladamente'
      ],
      sets: '3 séries',
      reps: '12-15 repetições',
      rest: '45-60 segundos',
      tips: [
        'Não mova os cotovelos',
        'Mantenha o corpo estável',
        'Contraia por 1 segundo no final',
        'Use corda para maior amplitude'
      ]
    },

    // ABDÔMEN
    {
      id: 'ex21',
      name: 'Prancha Isométrica',
      category: 'Abdômen',
      muscleGroup: 'Core Completo',
      equipment: 'Peso Corporal',
      difficulty: 'Iniciante',
      description: 'Exercício fundamental para estabilidade e força do core.',
      instructions: [
        'Apoie-se nos antebraços e pontas dos pés',
        'Mantenha o corpo em linha reta',
        'Contraia abdômen e glúteos',
        'Mantenha a posição pelo tempo determinado',
        'Respire normalmente'
      ],
      sets: '3 séries',
      reps: '30-60 segundos',
      rest: '60 segundos',
      tips: [
        'Não deixe o quadril cair',
        'Não eleve demais o quadril',
        'Mantenha o pescoço neutro',
        'Progressão: aumente o tempo gradualmente'
      ]
    },
    {
      id: 'ex22',
      name: 'Abdominal Supra',
      category: 'Abdômen',
      muscleGroup: 'Reto Abdominal (Superior)',
      equipment: 'Peso Corporal',
      difficulty: 'Iniciante',
      description: 'Clássico exercício para porção superior do abdômen.',
      instructions: [
        'Deite-se com joelhos flexionados',
        'Mãos atrás da cabeça ou cruzadas no peito',
        'Eleve o tronco contraindo o abdômen',
        'Suba apenas até as escápulas saírem do chão',
        'Desça controladamente'
      ],
      sets: '3 séries',
      reps: '15-20 repetições',
      rest: '45 segundos',
      tips: [
        'Não puxe o pescoço',
        'Foque na contração abdominal',
        'Expire ao subir',
        'Não precisa subir completamente'
      ]
    },
    {
      id: 'ex23',
      name: 'Elevação de Pernas',
      category: 'Abdômen',
      muscleGroup: 'Reto Abdominal (Inferior)',
      equipment: 'Peso Corporal',
      difficulty: 'Intermediário',
      description: 'Foca na porção inferior do abdômen.',
      instructions: [
        'Deite-se com pernas estendidas',
        'Mãos ao lado do corpo ou sob o quadril',
        'Eleve as pernas até 90 graus',
        'Desça controladamente sem tocar o chão',
        'Mantenha a lombar no chão'
      ],
      sets: '3 séries',
      reps: '12-15 repetições',
      rest: '60 segundos',
      tips: [
        'Não arqueie a lombar',
        'Controle a descida',
        'Flexione levemente os joelhos se necessário',
        'Foque na contração do abdômen inferior'
      ]
    },
    {
      id: 'ex24',
      name: 'Abdominal Bicicleta',
      category: 'Abdômen',
      muscleGroup: 'Oblíquos e Reto Abdominal',
      equipment: 'Peso Corporal',
      difficulty: 'Intermediário',
      description: 'Excelente para trabalhar oblíquos e abdômen completo.',
      instructions: [
        'Deite-se com mãos atrás da cabeça',
        'Eleve pernas e ombros do chão',
        'Leve cotovelo direito ao joelho esquerdo',
        'Alterne os lados em movimento de pedalar',
        'Mantenha ritmo controlado'
      ],
      sets: '3 séries',
      reps: '20-30 repetições (total)',
      rest: '45 segundos',
      tips: [
        'Não puxe o pescoço',
        'Rotacione o tronco, não apenas os cotovelos',
        'Mantenha o core contraído',
        'Controle o movimento'
      ]
    }
  ];

  const categories = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Abdômen'];

  const filteredExercises = selectedCategory === 'Todos' 
    ? exerciseLibrary 
    : exerciseLibrary.filter(ex => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Iniciante': return 'bg-green-500';
      case 'Intermediário': return 'bg-yellow-500';
      case 'Avançado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui enviaria o lead para o sistema
    console.log('Lead enviado:', contactForm);
    alert('Mensagem enviada! O professor entrará em contato em breve.');
    setShowContactForm(false);
    setContactForm({ name: '', email: '', phone: '', message: '', planInterest: '' });
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = profile.plans.find(p => p.id === planId);
    setContactForm(prev => ({ ...prev, planInterest: plan?.name || '' }));
    setShowContactForm(true);
  };

  const onShare = async () => {
    if (shareEnabled && shareRef.current) {
      const dataUrl = await exportNodeToPNG(shareRef.current, `orbian-${profile.name}`);
      // tenta Web Share API com arquivo base64 (fallback já baixa o PNG)
      try {
        if ((navigator as any).canShare) {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `orbian-${profile.name}.png`, { type: 'image/png' });
          if ((navigator as any).canShare({ files: [file] })) {
            await (navigator as any).share({
              title: `${profile.name} — Orbian Fit`,
              text: `Conheça meu perfil e treinos no Orbian Fit.`,
              files: [file],
            });
            return;
          }
        }
      } catch {}
    } else {
      // fallback: link da página (como já fazia)
      if (navigator.share) {
        navigator.share({
          title: `${profile.name} - Personal Trainer`,
          text: `Conheça o trabalho do ${profile.name}, personal trainer.`,
          url: window.location.href
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFC300] to-[#FFB800]">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#E6C85C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => window.history.back()}
                className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
              <div className="w-12 h-12 bg-[#FFC300] rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-7 h-7 text-[#0A0A0A]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0A0A0A]">
                  Orbian Fit
                </h1>
                <p className="text-[#4A4A4A] font-medium">
                  Personal Trainer Profissional
                </p>
              </div>
            </div>
            <Button
              onClick={onShare}
              className="bg-[#E10600] hover:bg-[#C00000] text-white rounded-xl"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </header>

      {/* ShareCard (fora da tela) */}
      {shareEnabled && (
        <div className="fixed -left-[9999px] -top-[9999px]" aria-hidden>
          <ShareCard
            ref={shareRef}
            title={`${profile.name} — Personal Trainer`}
            subtitle={`${profile.location} • ${profile.experience.years} anos • ⭐ ${profile.rating} (${profile.totalReviews})`}
            imageUrl={profile.photo}
            stats={[
              { label: 'Modalidades', value: profile.modalities.length },
              { label: 'Planos', value: profile.plans.length },
              { label: 'Avaliações', value: profile.totalReviews },
              { label: 'Rating', value: profile.rating },
            ]}
            footer="Progresso e treinos no Orbian Fit"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#FFC300] to-[#FFB800] p-8">
                <div className="flex items-center gap-6">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="text-white">
                    <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-6 h-6 text-yellow-300 fill-current" />
                        <span className="text-2xl font-bold">{profile.rating}</span>
                        <span className="text-lg">({profile.totalReviews} avaliações)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span className="text-lg">{profile.experience.years} anos de experiência</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* About Section */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
                  <User className="w-7 h-7 text-[#FFC300]" />
                  Sobre o Profissional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[#4A4A4A] whitespace-pre-line leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* BIBLIOTECA DE EXERCÍCIOS */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
                  <BookOpen className="w-7 h-7 text-[#FFC300]" />
                  Biblioteca de Exercícios
                </CardTitle>
                <p className="text-[#4A4A4A] mt-2">
                  Explore nossa biblioteca completa com {exerciseLibrary.length} exercícios detalhados
                </p>
              </CardHeader>
              <CardContent>
                {/* Filtros de Categoria */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 ${
                        selectedCategory === category
                          ? 'bg-[#FFC300] text-[#0A0A0A] hover:bg-[#E6C85C]'
                          : 'bg-gray-100 text-[#4A4A4A] hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Lista de Exercícios */}
                <div className="space-y-4">
                  {filteredExercises.map((exercise) => (
                    <Card 
                      key={exercise.id}
                      className="border-2 border-[#E6C85C] hover:border-[#FFC300] transition-all"
                    >
                      <CardHeader 
                        className="cursor-pointer"
                        onClick={() => setExpandedExercise(
                          expandedExercise === exercise.id ? null : exercise.id
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Dumbbell className="w-5 h-5 text-[#FFC300]" />
                              <h3 className="text-lg font-bold text-[#0A0A0A]">
                                {exercise.name}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge className="bg-[#FFC300] text-[#0A0A0A]">
                                {exercise.category}
                              </Badge>
                              <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                                {exercise.difficulty}
                              </Badge>
                              <Badge className="bg-gray-200 text-[#4A4A4A]">
                                {exercise.equipment}
                              </Badge>
                            </div>
                            <p className="text-[#4A4A4A] text-sm">
                              {exercise.description}
                            </p>
                          </div>
                          <Button
                            className="bg-transparent hover:bg-gray-100 text-[#0A0A0A] p-2"
                          >
                            {expandedExercise === exercise.id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>

                      {expandedExercise === exercise.id && (
                        <CardContent className="border-t-2 border-[#E6C85C] pt-4">
                          <div className="space-y-4">
                            {/* Informações Rápidas */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-[#FFF3C4] rounded-xl">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-[#0A0A0A]">{exercise.sets}</div>
                                <div className="text-sm text-[#4A4A4A]">Séries</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-[#0A0A0A]">{exercise.reps}</div>
                                <div className="text-sm text-[#4A4A4A]">Repetições</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-[#0A0A0A]">{exercise.rest}</div>
                                <div className="text-sm text-[#4A4A4A]">Descanso</div>
                              </div>
                            </div>

                            {/* Execução */}
                            <div>
                              <h4 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                                <Play className="w-5 h-5 text-[#FFC300]" />
                                Como Executar
                              </h4>
                              <ol className="space-y-2">
                                {exercise.instructions.map((instruction, index) => (
                                  <li key={index} className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-[#FFC300] text-[#0A0A0A] rounded-full flex items-center justify-center text-sm font-bold">
                                      {index + 1}
                                    </span>
                                    <span className="text-[#4A4A4A]">{instruction}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Dicas */}
                            <div>
                              <h4 className="font-bold text-[#0A0A0A] mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-[#E10600]" />
                                Dicas Importantes
                              </h4>
                              <ul className="space-y-2">
                                {exercise.tips.map((tip, index) => (
                                  <li key={index} className="flex gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-[#4A4A4A]">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Grupo Muscular */}
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-[#4A4A4A]" />
                                <span className="text-sm font-medium text-[#4A4A4A]">Grupo Muscular Principal:</span>
                              </div>
                              <div className="text-lg font-bold text-[#0A0A0A]">{exercise.muscleGroup}</div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                {filteredExercises.length === 0 && (
                  <div className="text-center py-12">
                    <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-[#4A4A4A] text-lg">
                      Nenhum exercício encontrado nesta categoria
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
                  <Target className="w-7 h-7 text-[#FFC300]" />
                  Especialidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] mb-3">Modalidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.modalities.map((modality, index) => (
                        <Badge key={index} className="bg-[#FFC300] text-[#0A0A0A] px-3 py-1 rounded-full">
                          {modality}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A0A0A] mb-3">Áreas de Atuação</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.experience.areas.map((area, index) => (
                        <Badge key={index} className="bg-[#E10600] text-white px-3 py-1 rounded-full">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
                  <Dumbbell className="w-7 h-7 text-[#FFC300]" />
                  Modalidades de Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border-2 ${
                    profile.services.online 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Video className={`w-6 h-6 ${profile.services.online ? 'text-green-500' : 'text-gray-400'}`} />
                      <h3 className={`font-bold ${profile.services.online ? 'text-green-700' : 'text-gray-500'}`}>
                        Online
                      </h3>
                    </div>
                    <p className={`text-sm ${profile.services.online ? 'text-green-600' : 'text-gray-400'}`}>
                      {profile.services.online ? 'Disponível' : 'Não disponível'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border-2 ${
                    profile.services.inPerson 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Users className={`w-6 h-6 ${profile.services.inPerson ? 'text-green-500' : 'text-gray-400'}`} />
                      <h3 className={`font-bold ${profile.services.inPerson ? 'text-green-700' : 'text-gray-500'}`}>
                        Presencial
                      </h3>
                    </div>
                    <p className={`text-sm ${profile.services.inPerson ? 'text-green-600' : 'text-gray-400'}`}>
                      {profile.services.inPerson ? 'Disponível' : 'Não disponível'}
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border-2 ${
                    profile.services.hybrid 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Target className={`w-6 h-6 ${profile.services.hybrid ? 'text-green-500' : 'text-gray-400'}`} />
                      <h3 className={`font-bold ${profile.services.hybrid ? 'text-green-700' : 'text-gray-500'}`}>
                        Híbrido
                      </h3>
                    </div>
                    <p className={`text-sm ${profile.services.hybrid ? 'text-green-600' : 'text-gray-400'}`}>
                      {profile.services.hybrid ? 'Disponível' : 'Não disponível'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
                  <Star className="w-7 h-7 text-[#FFC300]" />
                  Avaliações dos Alunos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-[#E6C85C] pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#FFC300] rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-[#0A0A0A]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-[#0A0A0A]">{review.studentName}</h4>
                              {review.verified && (
                                <Badge className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-[#4A4A4A]">
                                {new Date(review.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#4A4A4A] ml-15 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plans */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <DollarSign className="w-6 h-6 text-[#FFC300]" />
                  Planos e Valores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      selectedPlan === plan.id 
                        ? 'border-[#FFC300] bg-[#FFF3C4]' 
                        : 'border-[#E6C85C] hover:border-[#FFC300]'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold text-[#0A0A0A]">{plan.name}</CardTitle>
                      <div className="text-2xl font-bold text-[#E10600]">
                        R$ {plan.price}
                        <span className="text-sm font-normal text-[#4A4A4A]">
                          {plan.name.includes('Presencial') ? '/sessão' : '/mês'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#4A4A4A] mb-3">{plan.description}</p>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-4 bg-[#E10600] hover:bg-[#C00000] text-white font-bold py-2 rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlanSelect(plan.id);
                        }}
                      >
                        Contratar Agora
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <MessageCircle className="w-6 h-6 text-[#FFC300]" />
                  Contato Direto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-bold py-3 rounded-xl"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar Mensagem
                </Button>
                
                <div className="space-y-3 pt-4 border-t border-[#E6C85C]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#4A4A4A]" />
                    <a 
                      href={`tel:${profile.contact.phone}`}
                      className="text-[#0A0A0A] hover:text-[#E10600] font-medium"
                    >
                      {profile.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#4A4A4A]" />
                    <a 
                      href={`mailto:${profile.contact.email}`}
                      className="text-[#0A0A0A] hover:text-[#E10600] font-medium"
                    >
                      {profile.contact.email}
                    </a>
                  </div>
                  {profile.contact.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#4A4A4A]" />
                      <a 
                        href={`https://${profile.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0A0A0A] hover:text-[#E10600] font-medium"
                      >
                        {profile.contact.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Credentials */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-[#0A0A0A]">
                  <Award className="w-6 h-6 text-[#FFC300]" />
                  Credenciais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#0A0A0A] mb-2">Formação</h4>
                  <p className="text-sm text-[#4A4A4A]">{profile.education.university}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#0A0A0A] mb-2">Certificações</h4>
                  <div className="space-y-1">
                    {profile.education.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-[#E10600] text-white text-xs mr-1 mb-1">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white border-2 border-[#E6C85C] shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl font-bold text-[#0A0A0A]">
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-[#FFC300]" />
                  Entrar em Contato
                </span>
                <Button
                  onClick={() => setShowContactForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 w-8 h-8 p-0 rounded-full"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label className="text-[#0A0A0A] font-medium">Nome *</Label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-[#0A0A0A] font-medium">Email *</Label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl"
                    required
                  />
                </div>
                <div>
                  <Label className="text-[#0A0A0A] font-medium">Telefone</Label>
                  <Input
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-2 border-[#E6C85C] rounded-xl"
                  />
                </div>
                {contactForm.planInterest && (
                  <div>
                    <Label className="text-[#0A0A0A] font-medium">Plano de Interesse</Label>
                    <Input
                      value={contactForm.planInterest}
                      readOnly
                      className="border-2 border-[#E6C85C] rounded-xl bg-[#FFF3C4]"
                    />
                  </div>
                )}
                <div>
                  <Label className="text-[#0A0A0A] font-medium">Mensagem *</Label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="border-2 border-[#E6C85C] rounded-xl"
                    placeholder="Conte um pouco sobre seus objetivos e como posso te ajudar..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#E10600] hover:bg-[#C00000] text-white font-bold py-3 rounded-xl"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
