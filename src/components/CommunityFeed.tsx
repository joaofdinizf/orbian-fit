'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  Plus,
  User,
  Trophy,
  TrendingUp,
  Lightbulb,
  Target,
  Clock,
  ThumbsUp,
  Bookmark,
  Filter,
  Search,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Award,
  Flame,
  Zap,
  Users
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    role: 'trainer' | 'student';
    avatar: string;
    verified: boolean;
  };
  content: string;
  images: string[];
  type: 'evolution' | 'tip' | 'achievement' | 'question';
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

interface CommunityFeedProps {
  userRole: 'trainer' | 'student';
}

export default function CommunityFeed({ userRole }: CommunityFeedProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [postType, setPostType] = useState<'evolution' | 'tip' | 'achievement' | 'question'>('evolution');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Maria Silva',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        verified: false
      },
      content: '3 meses de treino e já posso ver a diferença! 💪 Perdi 8kg e ganhei muito mais disposição. Obrigada ao meu personal por toda a dedicação!',
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop'
      ],
      type: 'evolution',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: '2h atrás',
      tags: ['transformação', 'emagrecimento', 'motivação'],
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '2',
      author: {
        name: 'Carlos Personal',
        role: 'trainer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      },
      content: 'DICA DO DIA: Para maximizar a queima de gordura, combine treino de força com cardio HIIT. 20 minutos de HIIT após o treino de musculação pode aumentar o metabolismo por até 24h! 🔥',
      images: [],
      type: 'tip',
      likes: 45,
      comments: 12,
      shares: 18,
      timestamp: '4h atrás',
      tags: ['dica', 'hiit', 'queima de gordura'],
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      author: {
        name: 'João Santos',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false
      },
      content: 'Consegui fazer minha primeira barra fixa completa! 🎉 Depois de 2 meses treinando com elásticos e exercícios assistidos, finalmente chegou o dia!',
      images: [
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop'
      ],
      type: 'achievement',
      likes: 67,
      comments: 15,
      shares: 5,
      timestamp: '6h atrás',
      tags: ['conquista', 'barra fixa', 'força'],
      isLiked: true,
      isBookmarked: true
    },
    {
      id: '4',
      author: {
        name: 'Ana Personal',
        role: 'trainer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        verified: true
      },
      content: 'Qual a melhor estratégia para ganhar massa muscular sendo vegetariana? Estou ajudando uma aluna e gostaria de ouvir experiências de vocês! 🌱',
      images: [],
      type: 'question',
      likes: 12,
      comments: 23,
      shares: 7,
      timestamp: '8h atrás',
      tags: ['vegetariano', 'massa muscular', 'nutrição'],
      isLiked: false,
      isBookmarked: false
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: userRole === 'trainer' ? 'Você (Personal)' : 'Você (Aluno)',
        role: userRole,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        verified: userRole === 'trainer'
      },
      content: newPost,
      images: selectedImages,
      type: postType,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'agora',
      tags: [],
      isLiked: false,
      isBookmarked: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setSelectedImages([]);
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'evolution': return <TrendingUp className="w-4 h-4" />;
      case 'tip': return <Lightbulb className="w-4 h-4" />;
      case 'achievement': return <Trophy className="w-4 h-4" />;
      case 'question': return <MessageCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'evolution': return 'bg-[#1FBF75] text-white';
      case 'tip': return 'bg-[#FFC300] text-[#0A0A0A]';
      case 'achievement': return 'bg-[#E10600] text-white';
      case 'question': return 'bg-[#4A90E2] text-white';
      default: return 'bg-[#0A0A0A] text-white';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.type === activeFilter;
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-2xl">
            <Users className="w-7 h-7 text-[#FFC300]" />
            Comunidade Orbian Fit
          </CardTitle>
          <p className="text-[#4A4A4A] text-lg">
            Compartilhe suas evoluções, dicas e conquistas com toda a comunidade!
          </p>
        </CardHeader>
      </Card>

      {/* Create Post */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <Plus className="w-6 h-6 text-[#FFC300]" />
            Criar Nova Publicação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Post Type Selection */}
          <Tabs value={postType} onValueChange={(value) => setPostType(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[#FFF3C4] border border-[#E6C85C] rounded-xl p-1">
              <TabsTrigger 
                value="evolution" 
                className="flex items-center gap-2 data-[state=active]:bg-[#1FBF75] data-[state=active]:text-white rounded-lg font-medium"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Evolução</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tip" 
                className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-lg font-medium"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Dica</span>
              </TabsTrigger>
              <TabsTrigger 
                value="achievement" 
                className="flex items-center gap-2 data-[state=active]:bg-[#E10600] data-[state=active]:text-white rounded-lg font-medium"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Conquista</span>
              </TabsTrigger>
              <TabsTrigger 
                value="question" 
                className="flex items-center gap-2 data-[state=active]:bg-[#4A90E2] data-[state=active]:text-white rounded-lg font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Pergunta</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Post Content */}
          <Textarea
            placeholder={
              postType === 'evolution' ? 'Compartilhe sua evolução e inspire outros...' :
              postType === 'tip' ? 'Compartilhe uma dica valiosa...' :
              postType === 'achievement' ? 'Conte sobre sua conquista...' :
              'Faça uma pergunta para a comunidade...'
            }
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[120px] border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300] resize-none"
          />

          {/* Image Upload Simulation */}
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 border-2 border-[#E6C85C] hover:bg-[#FFF3C4] text-[#0A0A0A] rounded-xl"
              onClick={() => {
                // Simular upload de imagem
                const mockImages = [
                  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop'
                ];
                setSelectedImages([...selectedImages, mockImages[Math.floor(Math.random() * mockImages.length)]]);
              }}
            >
              <Camera className="w-4 h-4" />
              Adicionar Foto
            </Button>
            
            {selectedImages.length > 0 && (
              <Badge className="bg-[#FFC300] text-[#0A0A0A] font-medium px-3 py-1 rounded-xl">
                {selectedImages.length} foto{selectedImages.length > 1 ? 's' : ''} selecionada{selectedImages.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-xl border-2 border-[#E6C85C]"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                    onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Post Button */}
          <Button
            onClick={handleCreatePost}
            disabled={!newPost.trim()}
            className="w-full bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            <Send className="w-5 h-5 mr-2" />
            Publicar
          </Button>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
              <Input
                placeholder="Buscar publicações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#4A4A4A]" />
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'Todos', icon: Target },
                  { key: 'evolution', label: 'Evoluções', icon: TrendingUp },
                  { key: 'tip', label: 'Dicas', icon: Lightbulb },
                  { key: 'achievement', label: 'Conquistas', icon: Trophy },
                  { key: 'question', label: 'Perguntas', icon: MessageCircle }
                ].map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant={activeFilter === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(key)}
                    className={`flex items-center gap-1 rounded-xl font-medium ${
                      activeFilter === key 
                        ? 'bg-[#FFC300] text-[#0A0A0A] hover:bg-[#E6C85C]' 
                        : 'border-[#E6C85C] hover:bg-[#FFF3C4] text-[#0A0A0A]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardContent className="p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full border-2 border-[#E6C85C]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0A0A0A]">{post.author.name}</h3>
                      {post.author.verified && (
                        <Award className="w-4 h-4 text-[#FFC300]" />
                      )}
                      <Badge className={`text-xs px-2 py-1 rounded-full ${
                        post.author.role === 'trainer' 
                          ? 'bg-[#E10600] text-white' 
                          : 'bg-[#1FBF75] text-white'
                      }`}>
                        {post.author.role === 'trainer' ? 'Personal' : 'Aluno'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getPostTypeColor(post.type)}`}>
                        {getPostTypeIcon(post.type)}
                        {post.type === 'evolution' ? 'Evolução' :
                         post.type === 'tip' ? 'Dica' :
                         post.type === 'achievement' ? 'Conquista' : 'Pergunta'}
                      </Badge>
                      <span className="text-sm text-[#4A4A4A] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#4A4A4A] hover:bg-[#FFF3C4] rounded-xl">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-[#0A0A0A] leading-relaxed">{post.content}</p>
              </div>

              {/* Post Images */}
              {post.images.length > 0 && (
                <div className={`mb-4 grid gap-3 ${
                  post.images.length === 1 ? 'grid-cols-1' :
                  post.images.length === 2 ? 'grid-cols-2' :
                  'grid-cols-2 md:grid-cols-3'
                }`}>
                  {post.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Post image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl border-2 border-[#E6C85C] cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ))}
                </div>
              )}

              {/* Post Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={index}
                      className="bg-[#FFF3C4] text-[#0A0A0A] border border-[#E6C85C] hover:bg-[#FFC300] cursor-pointer text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E6C85C]">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 hover:bg-[#FFF3C4] rounded-xl ${
                      post.isLiked ? 'text-[#E10600]' : 'text-[#4A4A4A]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{post.likes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-[#4A4A4A] hover:bg-[#FFF3C4] rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">{post.comments}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-[#4A4A4A] hover:bg-[#FFF3C4] rounded-xl"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="font-medium">{post.shares}</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(post.id)}
                  className={`hover:bg-[#FFF3C4] rounded-xl ${
                    post.isBookmarked ? 'text-[#FFC300]' : 'text-[#4A4A4A]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-[#FFF3C4] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#FFC300]" />
            </div>
            <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">Nenhuma publicação encontrada</h3>
            <p className="text-[#4A4A4A] mb-6">
              {searchTerm 
                ? `Não encontramos publicações com "${searchTerm}"`
                : 'Não há publicações nesta categoria ainda'
              }
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setActiveFilter('all');
              }}
              className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-semibold px-6 py-2 rounded-xl"
            >
              Ver Todas as Publicações
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}