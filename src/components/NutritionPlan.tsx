'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Apple, 
  Clock, 
  Target, 
  Plus,
  Utensils,
  Droplets,
  Zap,
  TrendingUp
} from 'lucide-react';

interface NutritionPlanProps {
  userRole: 'trainer' | 'student';
}

export default function NutritionPlan({ userRole }: NutritionPlanProps) {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const nutritionPlan = {
    dailyCalories: 2200,
    protein: 165,
    carbs: 275,
    fat: 73,
    water: 3.5,
    meals: [
      {
        id: 'breakfast',
        name: 'Café da Manhã',
        time: '07:00',
        calories: 450,
        foods: [
          { name: '2 ovos mexidos', calories: 140, protein: 12 },
          { name: '2 fatias de pão integral', calories: 160, carbs: 30 },
          { name: '1 banana média', calories: 105, carbs: 27 },
          { name: '1 copo de leite desnatado', calories: 80, protein: 8 }
        ]
      },
      {
        id: 'lunch',
        name: 'Almoço',
        time: '12:30',
        calories: 650,
        foods: [
          { name: '150g peito de frango grelhado', calories: 250, protein: 46 },
          { name: '1 xícara de arroz integral', calories: 220, carbs: 45 },
          { name: 'Salada verde com azeite', calories: 120, fat: 12 },
          { name: '1 porção de brócolis', calories: 60, carbs: 12 }
        ]
      },
      {
        id: 'snack',
        name: 'Lanche da Tarde',
        time: '15:30',
        calories: 300,
        foods: [
          { name: '1 iogurte grego natural', calories: 130, protein: 15 },
          { name: '30g de granola', calories: 120, carbs: 18 },
          { name: '1 maçã média', calories: 95, carbs: 25 }
        ]
      },
      {
        id: 'dinner',
        name: 'Jantar',
        time: '19:00',
        calories: 550,
        foods: [
          { name: '120g salmão grelhado', calories: 280, protein: 39 },
          { name: '1 batata doce média assada', calories: 160, carbs: 37 },
          { name: 'Aspargos refogados', calories: 80, carbs: 8 },
          { name: 'Salada de folhas verdes', calories: 30, carbs: 6 }
        ]
      },
      {
        id: 'supper',
        name: 'Ceia',
        time: '21:30',
        calories: 250,
        foods: [
          { name: '1 copo de leite morno', calories: 150, protein: 8 },
          { name: '2 castanhas do Brasil', calories: 100, fat: 10 }
        ]
      }
    ]
  };

  const weeklyProgress = [
    { day: 'Seg', completed: true, calories: 2180 },
    { day: 'Ter', completed: true, calories: 2250 },
    { day: 'Qua', completed: true, calories: 2100 },
    { day: 'Qui', completed: false, calories: 0 },
    { day: 'Sex', completed: false, calories: 0 },
    { day: 'Sáb', completed: false, calories: 0 },
    { day: 'Dom', completed: false, calories: 0 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {userRole === 'trainer' ? 'Planos Nutricionais dos Alunos' : 'Seu Plano Nutricional'}
        </h2>
        <p className="text-white/80 text-lg">
          {userRole === 'trainer' 
            ? 'Gerencie e acompanhe a nutrição dos seus alunos' 
            : 'Alimentação personalizada para seus objetivos'
          }
        </p>
      </div>

      {/* Daily Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Calorias Diárias</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{nutritionPlan.dailyCalories}</p>
              </div>
              <Zap className="w-8 h-8 text-[#FFC300]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Proteína (g)</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{nutritionPlan.protein}</p>
              </div>
              <Target className="w-8 h-8 text-[#E10600]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Carboidratos (g)</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{nutritionPlan.carbs}</p>
              </div>
              <Apple className="w-8 h-8 text-[#1FBF75]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Água (L)</p>
                <p className="text-3xl font-bold text-[#0A0A0A]">{nutritionPlan.water}</p>
              </div>
              <Droplets className="w-8 h-8 text-[#3B82F6]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
            <TrendingUp className="w-6 h-6 text-[#FFC300]" />
            Progresso Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="text-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto
                  ${day.completed 
                    ? 'bg-[#1FBF75] text-white' 
                    : 'bg-[#FFF3C4] text-[#4A4A4A] border-2 border-[#E6C85C]'
                  }
                `}>
                  {day.completed ? '✓' : day.day}
                </div>
                <p className="text-xs font-medium text-[#4A4A4A]">{day.day}</p>
                {day.completed && (
                  <p className="text-xs text-[#1FBF75] font-medium">{day.calories} kcal</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meal Plan */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-[#0A0A0A] text-xl">
              <Utensils className="w-6 h-6 text-[#FFC300]" />
              Plano Alimentar de Hoje
            </CardTitle>
            {userRole === 'trainer' && (
              <Button className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A] font-medium rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nutritionPlan.meals.map((meal) => (
              <div 
                key={meal.id}
                className={`
                  p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                  ${selectedMeal === meal.id 
                    ? 'bg-[#FFC300] border-[#E6C85C] shadow-lg' 
                    : 'bg-[#FFF3C4] border-[#E6C85C] hover:bg-[#FFC300]/50'
                  }
                `}
                onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#0A0A0A]" />
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{meal.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{meal.time}</p>
                    </div>
                  </div>
                  <Badge className="bg-[#0A0A0A] text-[#FFC300] font-bold px-3 py-1 rounded-xl">
                    {meal.calories} kcal
                  </Badge>
                </div>

                {selectedMeal === meal.id && (
                  <div className="mt-4 space-y-2">
                    {meal.foods.map((food, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl">
                        <span className="text-[#0A0A0A] font-medium">{food.name}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-[#4A4A4A]">{food.calories} kcal</span>
                          {food.protein && (
                            <span className="text-[#E10600] font-medium">{food.protein}g prot</span>
                          )}
                          {food.carbs && (
                            <span className="text-[#1FBF75] font-medium">{food.carbs}g carb</span>
                          )}
                          {food.fat && (
                            <span className="text-[#FFC300] font-medium">{food.fat}g gord</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-[#1FBF75] hover:bg-[#16A085] text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <Target className="w-5 h-5 mr-2" />
          {userRole === 'trainer' ? 'Ajustar Plano' : 'Marcar como Concluído'}
        </Button>
        <Button className="bg-white hover:bg-[#FFF3C4] text-[#0A0A0A] border-2 border-[#0A0A0A] font-semibold py-3 px-8 rounded-2xl transition-all duration-300">
          <Apple className="w-5 h-5 mr-2" />
          {userRole === 'trainer' ? 'Histórico Nutricional' : 'Substituir Alimento'}
        </Button>
      </div>
    </div>
  );
}