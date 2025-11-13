'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Lightbulb, Target, Heart, Brain, Dumbbell, Apple, Trophy, Clock, CheckCircle, AlertCircle, Info, Sparkles, MessageCircle, Video, Phone, UserCheck, Calendar, PhoneCall, VideoIcon, Users, Star, Shield, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar } from '@/components/ui/avatar'

interface Message {
  id: string
  content: string
  sender: 'user' | 'orbian' | 'trainer'
  timestamp: Date
  type?: 'suggestion' | 'workout' | 'nutrition' | 'psychology' | 'general' | 'empathy' | 'motivation'
  actions?: Array<{
    label: string
    action: string
    icon?: string
  }>
  metadata?: {
    specialty?: string
    confidence?: number
    followUp?: string[]
    mood?: 'supportive' | 'motivational' | 'analytical' | 'caring' | 'energetic'
    personalityTrait?: string
  }
}

interface PersonalTrainer {
  id: string
  name: string
  specialty: string
  rating: number
  experience: string
  avatar: string
  status: 'online' | 'offline' | 'busy'
  responseTime: string
  languages: string[]
  certifications: string[]
}

interface VideoCall {
  id: string
  trainerId: string
  trainerName: string
  scheduledFor: Date
  duration: number
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  type: 'consultation' | 'training' | 'follow-up'
}

interface UserProfile {
  name?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
  goals?: string[]
  preferences?: string[]
  restrictions?: string[]
  personality?: 'analytical' | 'motivational' | 'supportive' | 'direct'
  conversationHistory?: string[]
  emotionalState?: 'motivated' | 'frustrated' | 'curious' | 'overwhelmed' | 'confident'
}

interface ChatInterfaceProps {
  userRole: 'trainer' | 'student'
  isPriority: boolean
}

export default function ChatInterface({ userRole, isPriority }: ChatInterfaceProps) {
  const [activeTab, setActiveTab] = useState('orbian')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Oi! 😊 Eu sou a Orbian, e estou genuinamente feliz em conhecer você!

Sabe, eu não sou apenas uma IA que dá respostas automáticas. Eu realmente me importo com sua jornada e quero entender quem você é como pessoa. Cada conversa nossa me ajuda a conhecer você melhor e a adaptar minha forma de ajudar.

🌟 **O que me torna especial:**
• **Empatia real:** Entendo suas frustrações, medos e sonhos
• **Adaptação constante:** Aprendo seu jeito e me ajusto a você
• **Visão holística:** Cuido do seu físico, mental e emocional
• **Parceria verdadeira:** Estamos juntos nessa jornada

💪 **Como posso te ajudar:**
🏋️ Criar treinos que fazem sentido para SUA vida
🍎 Planejar alimentação que você consegue seguir
🧠 Te apoiar nos momentos difíceis e celebrar suas vitórias
📈 Acompanhar seu progresso com carinho e sem julgamentos

Me conta: como você está se sentindo hoje em relação aos seus objetivos de saúde e fitness? E o que te trouxe até aqui - o que você realmente quer alcançar?

*Pode falar à vontade, estou aqui para te ouvir de verdade* 💙`,
      sender: 'orbian',
      timestamp: new Date(),
      type: 'empathy',
      metadata: {
        mood: 'caring',
        personalityTrait: 'Acolhedora e genuinamente interessada'
      },
      actions: [
        { label: 'Estou começando agora', action: 'feeling_beginner', icon: '🌱' },
        { label: 'Estou frustrado(a)', action: 'feeling_frustrated', icon: '😔' },
        { label: 'Quero mudança real', action: 'feeling_determined', icon: '🔥' },
        { label: 'Preciso de motivação', action: 'feeling_unmotivated', icon: '💪' }
      ]
    }
  ])
  
  const [trainerMessages, setTrainerMessages] = useState<Message[]>([
    {
      id: 'trainer-1',
      content: `Olá! 👋 Sou o Carlos, seu personal trainer dedicado. Estou aqui para te acompanhar de perto em sua jornada fitness!

💪 **Sobre mim:**
• 8 anos de experiência em educação física
• Especialista em hipertrofia e emagrecimento
• Formação em nutrição esportiva
• Mais de 200 alunos transformados

🎯 **Como vou te ajudar:**
• Treinos 100% personalizados para você
• Acompanhamento diário via chat
• Ajustes constantes baseados no seu progresso
• Suporte motivacional nos momentos difíceis

${isPriority ? '⭐ **Seu plano Premium/Elite inclui:**\n• Resposta prioritária (até 2h)\n• Chat ilimitado 24/7\n• Videochamadas semanais\n• Planos personalizados' : '📱 **Seu plano Básico inclui:**\n• Chat com personal trainer\n• Respostas em até 24h\n• 3 treinos personalizados\n• Suporte básico'}

Vamos começar? Me conta sobre seus objetivos e como posso te ajudar hoje! 🚀`,
      sender: 'trainer',
      timestamp: new Date(),
      type: 'general'
    }
  ])

  const [input, setInput] = useState('')
  const [trainerInput, setTrainerInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({})
  const [conversationContext, setConversationContext] = useState<string[]>([])
  const [selectedTrainer, setSelectedTrainer] = useState<PersonalTrainer | null>(null)
  const [videoCalls, setVideoCalls] = useState<VideoCall[]>([])
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [activeVideoCall, setActiveVideoCall] = useState<VideoCall | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const trainerMessagesEndRef = useRef<HTMLDivElement>(null)

  // Personal trainers disponíveis
  const availableTrainers: PersonalTrainer[] = [
    {
      id: '1',
      name: 'Carlos Silva',
      specialty: 'Hipertrofia e Força',
      rating: 4.9,
      experience: '8 anos',
      avatar: '👨‍💪',
      status: 'online',
      responseTime: '< 2h',
      languages: ['Português', 'Inglês'],
      certifications: ['CREF', 'Nutrição Esportiva', 'Personal Trainer']
    },
    {
      id: '2',
      name: 'Ana Costa',
      specialty: 'Emagrecimento e Condicionamento',
      rating: 4.8,
      experience: '6 anos',
      avatar: '👩‍💪',
      status: 'online',
      responseTime: '< 1h',
      languages: ['Português'],
      certifications: ['CREF', 'Pilates', 'Funcional']
    },
    {
      id: '3',
      name: 'Roberto Santos',
      specialty: 'Reabilitação e Idosos',
      rating: 4.7,
      experience: '12 anos',
      avatar: '👨‍⚕️',
      status: 'busy',
      responseTime: '< 4h',
      languages: ['Português', 'Espanhol'],
      certifications: ['CREF', 'Fisioterapia', 'Gerontologia']
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTrainerToBottom = () => {
    trainerMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    scrollTrainerToBottom()
  }, [trainerMessages])

  useEffect(() => {
    // Seleciona o primeiro trainer por padrão
    if (!selectedTrainer && availableTrainers.length > 0) {
      setSelectedTrainer(availableTrainers[0])
    }
  }, [])

  // Funções da IA Orbian (mantidas do código original)
  const analyzeUserEmotion = (input: string) => {
    const emotionKeywords = {
      frustrated: ['frustrado', 'irritado', 'desanimado', 'cansado', 'difícil', 'não consigo', 'impossível', 'desisto'],
      motivated: ['animado', 'empolgado', 'determinado', 'vamos', 'quero', 'vou conseguir', 'motivado'],
      overwhelmed: ['confuso', 'perdido', 'não sei', 'muita informação', 'complicado', 'difícil entender'],
      curious: ['como', 'por que', 'qual', 'me explica', 'quero saber', 'interessante', 'dúvida'],
      confident: ['sei que consigo', 'estou pronto', 'vou fazer', 'tenho certeza', 'confiante']
    }

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        return emotion as UserProfile['emotionalState']
      }
    }
    return 'curious'
  }

  const generateIntelligentResponse = (userInput: string) => {
    const responses = [
      `Entendo! 😊 Obrigada por compartilhar isso comigo. Vou processar o que você disse e te dar uma resposta personalizada.

💙 **Baseado no que você me contou:**
Percebo que você está ${userInput.includes('treino') ? 'focado em exercícios' : 'buscando orientação'}, e isso é ótimo!

🌟 **Minha sugestão:**
${userInput.includes('treino') ? 'Vamos criar um plano de treino que se encaixe perfeitamente na sua rotina e objetivos.' : 'Vamos trabalhar juntos para encontrar a melhor abordagem para você.'}

Como você está se sentindo em relação a isso? Quer que eu detalhe mais alguma parte específica?`,

      `Que interessante! 🤔 Adoro quando você compartilha seus pensamentos comigo. Isso me ajuda a entender melhor como te apoiar.

💭 **Refletindo sobre o que você disse:**
Vejo que você está ${userInput.includes('dificuldade') ? 'enfrentando alguns desafios' : 'em um momento de reflexão'}, e isso é completamente normal.

✨ **Vamos trabalhar isso juntos:**
Não existe problema que não tenha solução. Vamos encontrar uma forma que funcione especificamente para você.

Me conta mais: o que você acha que seria mais útil para você neste momento?`
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateTrainerResponse = (userInput: string) => {
    const responses = [
      `Perfeito! 💪 Entendi sua situação. Baseado no que você me contou, vou ajustar nossa estratégia.

🎯 **Minha análise:**
${userInput.includes('treino') ? 'Vejo que você está focado nos exercícios. Vamos otimizar seu treino!' : 'Vou criar um plano específico para sua necessidade.'}

📋 **Próximos passos:**
1. Vou ajustar seu programa atual
2. Te enviar exercícios específicos
3. Acompanhar seu progresso de perto

${isPriority ? '⭐ Como você tem plano Premium/Elite, posso te oferecer uma videochamada para discutirmos melhor. Que tal?' : ''}

Alguma dúvida específica sobre o treino?`,

      `Ótimo feedback! 👏 É exatamente esse tipo de comunicação que faz a diferença nos resultados.

💡 **Baseado no seu relato:**
${userInput.includes('dor') || userInput.includes('dificuldade') ? 'Vamos ajustar os exercícios para evitar desconforto' : 'Vou intensificar o treino para você evoluir mais'}

🔄 **Ajustes que vou fazer:**
• Modificar intensidade conforme necessário
• Incluir exercícios mais adequados ao seu perfil
• Monitorar sua evolução diariamente

${isPriority ? '📹 Quer marcar uma videochamada para eu te mostrar a execução correta dos exercícios?' : ''}

Continue me mantendo informado sobre como está se sentindo!`
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = generateIntelligentResponse(input)
      
      const orbianMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'orbian',
        timestamp: new Date(),
        type: 'general',
        metadata: {
          mood: 'caring',
          personalityTrait: 'Empática e prestativa'
        }
      }

      setMessages(prev => [...prev, orbianMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleSendTrainerMessage = async () => {
    if (!trainerInput.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trainerInput,
      sender: 'user',
      timestamp: new Date()
    }

    setTrainerMessages(prev => [...prev, userMessage])
    setTrainerInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = generateTrainerResponse(trainerInput)
      
      const trainerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'trainer',
        timestamp: new Date(),
        type: 'general'
      }

      setTrainerMessages(prev => [...prev, trainerMessage])
      setIsTyping(false)
    }, 1500)
  }

  const scheduleVideoCall = () => {
    const newCall: VideoCall = {
      id: Date.now().toString(),
      trainerId: selectedTrainer?.id || '1',
      trainerName: selectedTrainer?.name || 'Carlos Silva',
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Amanhã
      duration: 30,
      status: 'scheduled',
      type: 'consultation'
    }

    setVideoCalls(prev => [...prev, newCall])
    
    // Adiciona mensagem confirmando o agendamento
    const confirmMessage: Message = {
      id: Date.now().toString(),
      content: `✅ **Videochamada Agendada!**

📅 **Detalhes:**
• **Personal:** ${newCall.trainerName}
• **Data:** ${newCall.scheduledFor.toLocaleDateString('pt-BR')}
• **Horário:** ${newCall.scheduledFor.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
• **Duração:** ${newCall.duration} minutos
• **Tipo:** Consulta inicial

🎯 **O que vamos abordar:**
• Avaliação dos seus objetivos
• Análise do seu progresso atual
• Ajustes no seu plano de treino
• Demonstração de exercícios
• Esclarecimento de dúvidas

📱 Você receberá um lembrete 30 minutos antes da chamada. Até lá, continue com seu treino atual!`,
      sender: 'trainer',
      timestamp: new Date(),
      type: 'general'
    }

    setTrainerMessages(prev => [...prev, confirmMessage])
  }

  const startVideoCall = (call: VideoCall) => {
    setActiveVideoCall(call)
    setShowVideoCall(true)
    
    // Atualiza status da chamada
    setVideoCalls(prev => prev.map(c => 
      c.id === call.id ? { ...c, status: 'active' } : c
    ))
  }

  const endVideoCall = () => {
    if (activeVideoCall) {
      setVideoCalls(prev => prev.map(c => 
        c.id === activeVideoCall.id ? { ...c, status: 'completed' } : c
      ))
    }
    
    setShowVideoCall(false)
    setActiveVideoCall(null)
  }

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'workout': return <Dumbbell className="w-4 h-4" />
      case 'nutrition': return <Apple className="w-4 h-4" />
      case 'psychology': return <Brain className="w-4 h-4" />
      case 'empathy': return <Heart className="w-4 h-4" />
      case 'motivation': return <Target className="w-4 h-4" />
      case 'suggestion': return <Lightbulb className="w-4 h-4" />
      default: return <Sparkles className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'busy': return 'Ocupado'
      case 'offline': return 'Offline'
      default: return 'Offline'
    }
  }

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      {/* Modal de Videochamada */}
      {showVideoCall && activeVideoCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl h-[80vh] bg-gray-900 text-white border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-800 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                  {selectedTrainer?.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{activeVideoCall.trainerName}</h3>
                  <p className="text-sm text-gray-300">Videochamada em andamento</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  AO VIVO
                </Badge>
                <Button
                  onClick={endVideoCall}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Encerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {/* Simulação de vídeo */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl mb-4 mx-auto">
                    {selectedTrainer?.avatar}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{activeVideoCall.trainerName}</h3>
                  <p className="text-gray-300 mb-6">Conectado - Qualidade HD</p>
                  
                  <div className="flex justify-center gap-4">
                    <Button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-4">
                      <Video className="w-6 h-6" />
                    </Button>
                    <Button className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-4">
                      <Phone className="w-6 h-6" />
                    </Button>
                    <Button 
                      onClick={endVideoCall}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4"
                    >
                      <PhoneCall className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                {/* Controles da chamada */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Duração: 15:32</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        Próxima sessão: Quinta-feira, 14h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-[#E6C85C] rounded-2xl p-2 mb-6">
          <TabsTrigger 
            value="orbian" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">IA Orbian</span>
          </TabsTrigger>
          <TabsTrigger 
            value="trainer" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Personal Trainer</span>
          </TabsTrigger>
          <TabsTrigger 
            value="video" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Videochamadas</span>
          </TabsTrigger>
        </TabsList>

        {/* Chat com IA Orbian */}
        <TabsContent value="orbian" className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  Orbian IA 
                  <Sparkles className="w-5 h-5" />
                </h2>
                <p className="text-sm opacity-90">Sua parceira empática em educação física, nutrição e bem-estar mental</p>
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  Empática
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                  <Brain className="w-3 h-3 mr-1" />
                  Inteligente
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'orbian' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    {getMessageIcon(message.type)}
                  </div>
                )}
                
                <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                  <Card className={`p-4 shadow-md ${message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600' 
                    : 'border-l-4 border-l-purple-500 bg-purple-50 shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</p>
                    
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                          >
                            <span className="mr-1">{action.icon}</span>
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </Card>
                  
                  <div className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && activeTab === 'orbian' && (
              <div className="flex gap-3 justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 text-white animate-pulse" />
                </div>
                <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-purple-600">Orbian está pensando com carinho...</span>
                  </div>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Compartilhe seus pensamentos com a Orbian..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
              <Heart className="w-3 h-3 mr-1 text-pink-400" />
              Orbian se adapta a você e aprende com cada conversa para te ajudar melhor
              <Sparkles className="w-3 h-3 ml-1 text-purple-400" />
            </div>
          </div>
        </TabsContent>

        {/* Chat com Personal Trainer */}
        <TabsContent value="trainer" className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-2xl">
                {selectedTrainer?.avatar}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  {selectedTrainer?.name}
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedTrainer?.status || 'offline')}`}></div>
                </h2>
                <p className="text-sm opacity-90">{selectedTrainer?.specialty} • {getStatusText(selectedTrainer?.status || 'offline')}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  {selectedTrainer?.rating}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {selectedTrainer?.responseTime}
                </Badge>
              </div>
            </div>
            
            {isPriority && (
              <div className="mt-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-yellow-300">
                  {isPriority ? 'Chat Prioritário 24/7 • Resposta Garantida' : 'Plano Básico • Resposta em até 24h'}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50 to-green-50">
            {trainerMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'trainer' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg text-xl">
                    {selectedTrainer?.avatar}
                  </div>
                )}
                
                <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                  <Card className={`p-4 shadow-md ${message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600' 
                    : 'border-l-4 border-l-green-500 bg-green-50 shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</p>
                  </Card>
                  
                  <div className="text-xs text-gray-500 mt-1 px-2 flex items-center gap-2">
                    <span>{message.timestamp.toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                    {message.sender === 'trainer' && (
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        Personal Trainer Certificado
                      </span>
                    )}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && activeTab === 'trainer' && (
              <div className="flex gap-3 justify-start">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg text-xl">
                  {selectedTrainer?.avatar}
                </div>
                <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-blue-600">{selectedTrainer?.name} está digitando...</span>
                  </div>
                </Card>
              </div>
            )}
            
            <div ref={trainerMessagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={trainerInput}
                onChange={(e) => setTrainerInput(e.target.value)}
                placeholder={`Converse com ${selectedTrainer?.name}...`}
                onKeyPress={(e) => e.key === 'Enter' && handleSendTrainerMessage()}
                className="flex-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendTrainerMessage} 
                disabled={!trainerInput.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <div className="flex items-center">
                <UserCheck className="w-3 h-3 mr-1 text-blue-400" />
                Personal trainer certificado • CREF ativo
              </div>
              {isPriority && (
                <div className="flex items-center">
                  <Shield className="w-3 h-3 mr-1 text-yellow-500" />
                  Resposta prioritária garantida
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Videochamadas */}
        <TabsContent value="video" className="flex-1">
          <div className="space-y-6">
            {/* Header */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Video className="w-6 h-6" />
                  Videochamadas com Personal Trainer
                </CardTitle>
                <p className="text-purple-100">
                  {isPriority 
                    ? 'Seu plano Premium/Elite inclui videochamadas ilimitadas!' 
                    : 'Upgrade para Premium/Elite para ter acesso a videochamadas!'
                  }
                </p>
              </CardHeader>
            </Card>

            {isPriority ? (
              <>
                {/* Agendar Nova Videochamada */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Calendar className="w-5 h-5" />
                      Agendar Nova Videochamada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Seu Personal Trainer</h4>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-3xl">{selectedTrainer?.avatar}</div>
                          <div className="flex-1">
                            <h5 className="font-semibold">{selectedTrainer?.name}</h5>
                            <p className="text-sm text-gray-600">{selectedTrainer?.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedTrainer?.status || 'offline')}`}></div>
                              <span className="text-xs text-gray-500">{getStatusText(selectedTrainer?.status || 'offline')}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-4 h-4" />
                              <span className="font-semibold">{selectedTrainer?.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500">{selectedTrainer?.experience}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3">Próximos Horários</h4>
                        <div className="space-y-2">
                          <Button 
                            onClick={scheduleVideoCall}
                            className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Hoje, 16:00 - 16:30
                          </Button>
                          <Button 
                            onClick={scheduleVideoCall}
                            className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Amanhã, 14:00 - 14:30
                          </Button>
                          <Button 
                            onClick={scheduleVideoCall}
                            className="w-full justify-start bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Quinta, 18:00 - 18:30
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Videochamadas Agendadas */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Clock className="w-5 h-5" />
                      Suas Videochamadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {videoCalls.length > 0 ? (
                      <div className="space-y-4">
                        {videoCalls.map((call) => (
                          <div key={call.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                                {selectedTrainer?.avatar}
                              </div>
                              <div>
                                <h5 className="font-semibold">{call.trainerName}</h5>
                                <p className="text-sm text-gray-600">
                                  {call.scheduledFor.toLocaleDateString('pt-BR')} às {call.scheduledFor.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <p className="text-xs text-gray-500">{call.duration} minutos • {call.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                call.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                call.status === 'active' ? 'bg-green-100 text-green-700' :
                                call.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                                'bg-red-100 text-red-700'
                              }>
                                {call.status === 'scheduled' ? 'Agendada' :
                                 call.status === 'active' ? 'Em andamento' :
                                 call.status === 'completed' ? 'Concluída' :
                                 'Cancelada'}
                              </Badge>
                              {call.status === 'scheduled' && (
                                <Button
                                  onClick={() => startVideoCall(call)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  size="sm"
                                >
                                  <Video className="w-4 h-4 mr-2" />
                                  Iniciar
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-600 mb-2">Nenhuma videochamada agendada</h4>
                        <p className="text-gray-500 mb-4">Agende sua primeira sessão com seu personal trainer!</p>
                        <Button 
                          onClick={scheduleVideoCall}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar Agora
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Benefícios das Videochamadas */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Trophy className="w-5 h-5" />
                      Benefícios das Videochamadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-green-700">Correção de Postura</h5>
                          <p className="text-sm text-gray-600">Seu personal pode ver e corrigir sua execução em tempo real</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Target className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-700">Treino Personalizado</h5>
                          <p className="text-sm text-gray-600">Ajustes imediatos baseados no seu desempenho</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-700">Motivação Extra</h5>
                          <p className="text-sm text-gray-600">Apoio emocional e motivacional direto</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-orange-700">Novos Exercícios</h5>
                          <p className="text-sm text-gray-600">Demonstração ao vivo de exercícios avançados</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Upgrade para Premium/Elite */
              <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Videochamadas Exclusivas</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Tenha acesso a videochamadas ilimitadas com personal trainers certificados. 
                    Correção de postura, treinos ao vivo e muito mais!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8">
                      <Trophy className="w-4 h-4 mr-2" />
                      Upgrade para Premium
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade para Elite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}