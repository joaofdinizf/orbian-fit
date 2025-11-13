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
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';
import PlanVsDoneModal from '@/components/workout/PlanVsDoneModal';

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
  const planVsDoneEnabled = isEnabled('plan_vs_done');
  const [openPlanDone, setOpenPlanDone] = useState<{open:boolean; ex?: any}>({open:false});
  const todayISO = new Date().toISOString().slice(0,10);
  const planVsDoneEnabled = isEnabled('plan_vs_done');
  const [openPlanDone, setOpenPlanDone] = useState<{open:boolean; ex?: any}>({open:false});
  const todayISO = new Date().toISOString().slice(0,10);

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
   