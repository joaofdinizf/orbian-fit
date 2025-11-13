'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Target,
  Activity,
  Heart,
  Scale,
  Ruler,
  Save,
  Plus,
  Edit,
  Trash2,
  Camera,
  Upload,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface UserRegistrationProps {
  userRole: 'trainer' | 'student';
}

interface UserProfile {
  id: string;
  type: 'trainer' | 'student';
  name: string;
  email: string;
  phone: string;
  cpf: string; // Campo obrigatório para ambos
  photo: string; // Campo obrigatório para ambos
  birthDate: string;
  gender: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  // Dados específicos para alunos
  height?: number;
  weight?: number;
  goal?: string;
  experience?: string;
  medicalConditions?: string;
  medications?: string;
  // Dados específicos para personal trainers
  cref?: string; // Campo obrigatório para trainers
  specialties?: string[];
  experience_years?: number;
  bio?: string;
}

export default function UserRegistration({ userRole }: UserRegistrationProps) {
  const [activeForm, setActiveForm] = useState<'list' | 'new' | 'edit'>('list');
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: '1',
      type: 'student',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      birthDate: '1990-05-15',
      gender: 'Masculino',
      address: 'São Paulo, SP',
      emergencyContact: 'Maria Silva',
      emergencyPhone: '(11) 88888-8888',
      height: 175,
      weight: 80,
      goal: 'Ganho de massa muscular',
      experience: 'Intermediário',
      medicalConditions: 'Nenhuma',
      medications: 'Nenhuma'
    },
    {
      id: '2',
      type: 'trainer',
      name: 'Carlos Personal',
      email: 'carlos@email.com',
      phone: '(11) 77777-7777',
      cpf: '987.654.321-00',
      photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
      birthDate: '1985-03-20',
      gender: 'Masculino',
      address: 'São Paulo, SP',
      emergencyContact: 'Ana Personal',
      emergencyPhone: '(11) 66666-6666',
      cref: 'CREF 123456-G/SP',
      specialties: ['Musculação', 'Funcional', 'Reabilitação'],
      experience_years: 8,
      bio: 'Personal trainer especializado em treinamento funcional e reabilitação.'
    }
  ]);

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    type: userRole === 'trainer' ? 'student' : 'trainer',
    name: '',
    email: '',
    phone: '',
    cpf: '',
    photo: '',
    birthDate: '',
    gender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialties: []
  });

  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        setPhotoPreview(photoUrl);
        handleInputChange('photo', photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    handleInputChange('cpf', formatted);
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const handleSpecialtyAdd = (specialty: string) => {
    if (specialty && !formData.specialties?.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...(prev.specialties || []), specialty]
      }));
    }
  };

  const handleSpecialtyRemove = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties?.filter(s => s !== specialty) || []
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name?.trim()) errors.push('Nome é obrigatório');
    if (!formData.email?.trim()) errors.push('E-mail é obrigatório');
    if (!formData.phone?.trim()) errors.push('Telefone é obrigatório');
    if (!formData.cpf?.trim()) errors.push('CPF é obrigatório');
    if (!validateCPF(formData.cpf || '')) errors.push('CPF deve ter 11 dígitos');
    if (!formData.photo?.trim()) errors.push('Foto é obrigatória');
    if (!formData.birthDate?.trim()) errors.push('Data de nascimento é obrigatória');
    if (!formData.gender?.trim()) errors.push('Gênero é obrigatório');
    
    // Validação específica para personal trainers
    if (formData.type === 'trainer' && !formData.cref?.trim()) {
      errors.push('CREF é obrigatório para Personal Trainers');
    }
    
    if (errors.length > 0) {
      alert('Por favor, preencha os campos obrigatórios:\n' + errors.join('\n'));
      return false;
    }
    
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? { ...formData, id: editingUser.id } as UserProfile : user
      ));
    } else {
      const newUser: UserProfile = {
        ...formData,
        id: Date.now().toString()
      } as UserProfile;
      setUsers(prev => [...prev, newUser]);
    }
    
    setActiveForm('list');
    setEditingUser(null);
    setPhotoPreview('');
    setFormData({
      type: userRole === 'trainer' ? 'student' : 'trainer',
      name: '',
      email: '',
      phone: '',
      cpf: '',
      photo: '',
      birthDate: '',
      gender: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      specialties: []
    });
  };

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setFormData(user);
    setPhotoPreview(user.photo);
    setActiveForm('edit');
  };

  const handleDelete = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (activeForm === 'new' || activeForm === 'edit') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-[#FFC300]" />
            <h2 className="text-2xl font-bold text-white">
              {activeForm === 'edit' ? 'Editar' : 'Cadastrar'} {formData.type === 'student' ? 'Aluno' : 'Personal Trainer'}
            </h2>
          </div>
          <Button
            onClick={() => {
              setActiveForm('list');
              setEditingUser(null);
              setPhotoPreview('');
              setFormData({
                type: userRole === 'trainer' ? 'student' : 'trainer',
                name: '',
                email: '',
                phone: '',
                cpf: '',
                photo: '',
                birthDate: '',
                gender: '',
                address: '',
                emergencyContact: '',
                emergencyPhone: '',
                specialties: []
              });
            }}
            className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-xl"
          >
            Voltar
          </Button>
        </div>

        {/* Foto obrigatória */}
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <Camera className="w-6 h-6 text-[#FFC300]" />
              Foto do Perfil <span className="text-[#E10600]">*</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 bg-[#FFF3C4] border-2 border-dashed border-[#E6C85C] rounded-full flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-[#4A4A4A]" />
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    Selecionar Foto
                  </div>
                </Label>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <p className="text-sm text-[#4A4A4A] text-center">
                  Formatos aceitos: JPG, PNG, GIF<br />
                  Tamanho máximo: 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
              <User className="w-6 h-6 text-[#FFC300]" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#0A0A0A] font-medium">
                  Nome Completo <span className="text-[#E10600]">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Digite o nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0A0A0A] font-medium">
                  E-mail <span className="text-[#E10600]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#0A0A0A] font-medium">
                  Telefone <span className="text-[#E10600]">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-[#0A0A0A] font-medium">
                  CPF <span className="text-[#E10600]">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300] pl-10"
                    placeholder="000.000.000-00"
                    maxLength={14}
                  />
                  <CreditCard className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                {formData.cpf && !validateCPF(formData.cpf) && (
                  <div className="flex items-center gap-1 text-[#E10600] text-sm">
                    <AlertCircle className="w-4 h-4" />
                    CPF deve ter 11 dígitos
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-[#0A0A0A] font-medium">
                  Data de Nascimento <span className="text-[#E10600]">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-[#0A0A0A] font-medium">
                  Gênero <span className="text-[#E10600]">*</span>
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                    <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-[#0A0A0A] font-medium">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Cidade, Estado"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-[#0A0A0A] font-medium">Contato de Emergência</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Nome do contato"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-[#0A0A0A] font-medium">Telefone de Emergência</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="(11) 88888-8888"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados específicos para alunos */}
        {formData.type === 'student' && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Target className="w-6 h-6 text-[#FFC300]" />
                Dados do Aluno
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-[#0A0A0A] font-medium">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="175"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-[#0A0A0A] font-medium">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-[#0A0A0A] font-medium">Objetivo</Label>
                  <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                    <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                      <SelectValue placeholder="Selecione o objetivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Perda de peso">Perda de peso</SelectItem>
                      <SelectItem value="Ganho de massa muscular">Ganho de massa muscular</SelectItem>
                      <SelectItem value="Definição muscular">Definição muscular</SelectItem>
                      <SelectItem value="Condicionamento físico">Condicionamento físico</SelectItem>
                      <SelectItem value="Reabilitação">Reabilitação</SelectItem>
                      <SelectItem value="Manutenção">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-[#0A0A0A] font-medium">Experiência</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                      <SelectValue placeholder="Selecione a experiência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Iniciante">Iniciante</SelectItem>
                      <SelectItem value="Intermediário">Intermediário</SelectItem>
                      <SelectItem value="Avançado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalConditions" className="text-[#0A0A0A] font-medium">Condições Médicas</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Descreva condições médicas relevantes ou digite 'Nenhuma'"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications" className="text-[#0A0A0A] font-medium">Medicamentos</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Liste medicamentos em uso ou digite 'Nenhum'"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dados específicos para personal trainers */}
        {formData.type === 'trainer' && (
          <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                <Activity className="w-6 h-6 text-[#FFC300]" />
                Dados Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cref" className="text-[#0A0A0A] font-medium">
                    CREF <span className="text-[#E10600]">*</span>
                  </Label>
                  <Input
                    id="cref"
                    value={formData.cref}
                    onChange={(e) => handleInputChange('cref', e.target.value)}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="CREF 123456-G/SP"
                  />
                  <p className="text-sm text-[#4A4A4A]">
                    Registro obrigatório no Conselho Regional de Educação Física
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience_years" className="text-[#0A0A0A] font-medium">Anos de Experiência</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    value={formData.experience_years || ''}
                    onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value))}
                    className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                    placeholder="5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#0A0A0A] font-medium">Especialidades</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.specialties?.map((specialty, index) => (
                    <Badge
                      key={index}
                      className="bg-[#FFC300] text-[#0A0A0A] px-3 py-1 rounded-xl flex items-center gap-2"
                    >
                      {specialty}
                      <button
                        onClick={() => handleSpecialtyRemove(specialty)}
                        className="hover:bg-[#E6C85C] rounded-full p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={handleSpecialtyAdd}>
                  <SelectTrigger className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]">
                    <SelectValue placeholder="Adicionar especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Musculação">Musculação</SelectItem>
                    <SelectItem value="Funcional">Funcional</SelectItem>
                    <SelectItem value="Pilates">Pilates</SelectItem>
                    <SelectItem value="Crossfit">Crossfit</SelectItem>
                    <SelectItem value="Yoga">Yoga</SelectItem>
                    <SelectItem value="Natação">Natação</SelectItem>
                    <SelectItem value="Corrida">Corrida</SelectItem>
                    <SelectItem value="Reabilitação">Reabilitação</SelectItem>
                    <SelectItem value="Idosos">Idosos</SelectItem>
                    <SelectItem value="Gestantes">Gestantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[#0A0A0A] font-medium">Biografia Profissional</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="border-2 border-[#E6C85C] rounded-xl focus:border-[#FFC300]"
                  placeholder="Descreva sua experiência e metodologia de trabalho"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-8 py-3 rounded-2xl"
          >
            <Save className="w-5 h-5 mr-2" />
            {activeForm === 'edit' ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-[#FFC300]" />
          <h2 className="text-2xl font-bold text-white">
            {userRole === 'trainer' ? 'Gerenciar Alunos' : 'Gerenciar Personal Trainers'}
          </h2>
        </div>
        <Button
          onClick={() => setActiveForm('new')}
          className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-6 py-3 rounded-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Cadastro
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users
          .filter(user => userRole === 'trainer' ? user.type === 'student' : user.type === 'trainer')
          .map((user) => (
            <Card key={user.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-[#FFC300] rounded-full flex items-center justify-center overflow-hidden">
                      {user.photo ? (
                        <img 
                          src={user.photo} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-[#0A0A0A]" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-[#0A0A0A] text-lg">{user.name}</CardTitle>
                      <p className="text-[#4A4A4A] text-sm">
                        {user.type === 'student' ? 'Aluno' : 'Personal Trainer'}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <CreditCard className="w-3 h-3 text-[#4A4A4A]" />
                        <span className="text-[#4A4A4A] text-xs">{user.cpf}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(user)}
                      size="sm"
                      className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] rounded-xl"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      size="sm"
                      className="bg-[#E10600] hover:bg-[#C00000] text-white rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#4A4A4A]" />
                    <span className="text-[#0A0A0A]">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#4A4A4A]" />
                    <span className="text-[#0A0A0A]">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#4A4A4A]" />
                    <span className="text-[#0A0A0A]">{calculateAge(user.birthDate)} anos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#4A4A4A]" />
                    <span className="text-[#0A0A0A]">{user.address}</span>
                  </div>
                </div>

                {user.type === 'student' && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E6C85C]">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-[#4A4A4A]" />
                      <span className="text-[#0A0A0A] text-sm">{user.height}cm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#4A4A4A]" />
                      <span className="text-[#0A0A0A] text-sm">{user.weight}kg</span>
                    </div>
                    <div className="col-span-2">
                      <Badge className="bg-[#FFF3C4] text-[#0A0A0A] border border-[#E6C85C] rounded-xl">
                        {user.goal}
                      </Badge>
                    </div>
                  </div>
                )}

                {user.type === 'trainer' && (
                  <div className="pt-4 border-t border-[#E6C85C]">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-[#4A4A4A]" />
                      <span className="text-[#0A0A0A] text-sm font-medium">{user.cref}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.specialties?.slice(0, 3).map((specialty, index) => (
                        <Badge
                          key={index}
                          className="bg-[#FFC300] text-[#0A0A0A] text-xs px-2 py-1 rounded-lg"
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {user.specialties && user.specialties.length > 3 && (
                        <Badge className="bg-[#E6C85C] text-[#0A0A0A] text-xs px-2 py-1 rounded-lg">
                          +{user.specialties.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {users.filter(user => userRole === 'trainer' ? user.type === 'student' : user.type === 'trainer').length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-lg rounded-2xl">
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Nenhum {userRole === 'trainer' ? 'aluno' : 'personal trainer'} cadastrado
            </h3>
            <p className="text-white/80 mb-6">
              Comece adicionando {userRole === 'trainer' ? 'seus alunos' : 'personal trainers'} ao sistema.
            </p>
            <Button
              onClick={() => setActiveForm('new')}
              className="bg-[#1FBF75] hover:bg-[#1AA366] text-white font-semibold px-6 py-3 rounded-2xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Primeiro Cadastro
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}