'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Video, 
  MessageSquare, 
  Mic,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Heart
} from 'lucide-react';

interface Professor {
  id: string;
  nome: string;
  slug: string;
  bio: string;
  especialidades: string[];
  fotoPerfil?: string;
  rating: number;
  totalAvaliacoes: number;
  cidade?: string;
}

interface Consultoria {
  id: string;
  professorId: string;
  tipoConsultoriaTitulo: string;
  tipoConsultoriaDescricao: string;
  duracao: number;
  tipoAtendimento: string;
  precoBase: number;
  precoComDesconto?: number;
  temDesconto: boolean;
}

const tipoAtendimentoIcons = {
  videochamada: Video,
  chat: MessageSquare,
  audio: Mic,
  misto: Users,
};

export default function MarketplacePage() {
  const router = useRouter();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [consultorias, setConsultorias] = useState<Consultoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEspecialidade, setFiltroEspecialidade] = useState<string>('todas');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [professoresRes, consultoriasRes] = await Promise.all([
        fetch('/api/marketplace/professores'),
        fetch('/api/marketplace/consultorias'),
      ]);

      const professoresData = await professoresRes.json();
      const consultoriasData = await consultoriasRes.json();

      setProfessores(professoresData.data || []);
      setConsultorias(consultoriasData.data || []);
    } catch (error) {
      console.error('Erro ao carregar marketplace:', error);
    } finally {
      setLoading(false);
    }
  };

  const professoresFiltrados = professores.filter((prof) => {
    const matchSearch = prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchEspecialidade = filtroEspecialidade === 'todas' ||
      prof.especialidades?.includes(filtroEspecialidade);

    return matchSearch && matchEspecialidade;
  });

  const especialidadesUnicas = Array.from(
    new Set(professores.flatMap((p) => p.especialidades || []))
  );

  const handleComprarConsultoria = async (consultoriaId: string) => {
    router.push(`/marketplace/checkout/${consultoriaId}`);
  };

  const handleContatoDireto = async (professorId: string) => {
    router.push(`/marketplace/contato-direto/${professorId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Marketplace de Professores</h1>
          <p className="text-xl text-blue-100 mb-8">
            Encontre o profissional perfeito para seus objetivos
          </p>

          {/* Busca */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nome ou especialidade..."
                className="pl-12 bg-white text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            <Button
              variant={filtroEspecialidade === 'todas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltroEspecialidade('todas')}
            >
              Todas
            </Button>
            {especialidadesUnicas.map((esp) => (
              <Button
                key={esp}
                variant={filtroEspecialidade === esp ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFiltroEspecialidade(esp)}
              >
                {esp}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Professores */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {professoresFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum professor encontrado</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professoresFiltrados.map((professor) => {
              const consultoriasProfessor = consultorias.filter(
                (c) => c.professorId === professor.id
              );

              return (
                <Card key={professor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {professor.nome.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{professor.nome}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{professor.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            ({professor.totalAvaliacoes} avaliações)
                          </span>
                        </div>
                        {professor.cidade && (
                          <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            {professor.cidade}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{professor.bio}</p>

                    {professor.especialidades && professor.especialidades.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {professor.especialidades.map((esp) => (
                          <Badge key={esp} variant="secondary" className="text-xs">
                            {esp}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Consultorias disponíveis */}
                    {consultoriasProfessor.length > 0 && (
                      <div className="space-y-2 pt-4 border-t">
                        <p className="text-sm font-semibold text-gray-700">
                          Consultorias disponíveis:
                        </p>
                        {consultoriasProfessor.slice(0, 2).map((consultoria) => {
                          const Icon = tipoAtendimentoIcons[consultoria.tipoAtendimento as keyof typeof tipoAtendimentoIcons] || Users;
                          
                          return (
                            <div
                              key={consultoria.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <Icon className="w-4 h-4 text-gray-600" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {consultoria.tipoConsultoriaTitulo}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {consultoria.duracao} {consultoria.duracao > 60 ? 'dias' : 'min'}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                {consultoria.temDesconto && consultoria.precoComDesconto ? (
                                  <>
                                    <p className="text-xs text-gray-400 line-through">
                                      R$ {consultoria.precoBase.toFixed(2)}
                                    </p>
                                    <p className="text-sm font-bold text-green-600">
                                      R$ {consultoria.precoComDesconto.toFixed(2)}
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-sm font-bold text-gray-900">
                                    R$ {consultoria.precoBase.toFixed(2)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => router.push(`/professor/${professor.slug}`)}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        Ver perfil
                      </Button>
                      <Button
                        onClick={() => handleContatoDireto(professor.id)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                        size="sm"
                      >
                        Contato direto
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Você é professor e quer aparecer aqui?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Cadastre-se como professor e ofereça suas consultorias para milhares de alunos
          </p>
          <Button
            onClick={() => router.push('/cadastro-professor')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Quero ser professor
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
