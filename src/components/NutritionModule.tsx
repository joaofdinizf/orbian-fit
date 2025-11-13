'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Apple, 
  Plus, 
  Clock, 
  Camera, 
  ShoppingCart, 
  Check, 
  X,
  Utensils,
  Target,
  Droplets,
  Bell,
  BarChart3,
  Calendar,
  Search,
  Edit,
  Trash2,
  Save,
  AlertCircle
} from 'lucide-react';
import { FOOD_DATABASE, searchFoods, calculateMacros } from '@/lib/data/foods';
import type { Food, Meal, MealFood, DayNutrition, ShoppingItem, NutritionGoals } from '@/lib/types/nutrition';

interface NutritionModuleProps {
  userRole: 'trainer' | 'student';
}

export default function NutritionModule({ userRole }: NutritionModuleProps) {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
  const [waterIntake, setWaterIntake] = useState({ current: 0, target: 2000 });
  
  // Estados para modais/formulários
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<MealFood[]>([]);

  // Dados simulados iniciais
  useEffect(() => {
    // Simular refeições do dia
    const mockMeals: Meal[] = [
      {
        id: '1',
        name: 'Café da Manhã',
        scheduled_time: '07:00',
        foods: [
          {
            id: '1',
            food_id: 'oats',
            food: FOOD_DATABASE.find(f => f.id === 'oats')!,
            quantity: 50,
            portion_description: '1/2 xícara'
          },
          {
            id: '2',
            food_id: 'banana',
            food: FOOD_DATABASE.find(f => f.id === 'banana')!,
            quantity: 120,
            portion_description: '1 unidade média'
          }
        ],
        completed: true,
        completed_at: new Date().toISOString(),
        student_id: 'student1',
        date: selectedDate
      },
      {
        id: '2',
        name: 'Almoço',
        scheduled_time: '12:00',
        foods: [
          {
            id: '3',
            food_id: 'chicken_breast',
            food: FOOD_DATABASE.find(f => f.id === 'chicken_breast')!,
            quantity: 150,
            portion_description: '1 filé médio'
          },
          {
            id: '4',
            food_id: 'brown_rice',
            food: FOOD_DATABASE.find(f => f.id === 'brown_rice')!,
            quantity: 100,
            portion_description: '4 colheres de sopa'
          },
          {
            id: '5',
            food_id: 'broccoli',
            food: FOOD_DATABASE.find(f => f.id === 'broccoli')!,
            quantity: 80,
            portion_description: '1 xícara'
          }
        ],
        completed: false,
        student_id: 'student1',
        date: selectedDate
      }
    ];
    setMeals(mockMeals);

    // Simular metas nutricionais
    setNutritionGoals({
      id: '1',
      student_id: 'student1',
      daily_calories: 2000,
      daily_carbs: 250,
      daily_protein: 150,
      daily_fat: 67,
      created_by: 'nutritionist1',
      created_at: new Date().toISOString()
    });

    // Simular lista de compras
    const mockShopping: ShoppingItem[] = [
      {
        id: '1',
        food_id: 'chicken_breast',
        food: FOOD_DATABASE.find(f => f.id === 'chicken_breast')!,
        quantity_needed: 1000,
        unit: 'g',
        status: 'need_to_buy',
        student_id: 'student1',
        week_start: selectedDate
      },
      {
        id: '2',
        food_id: 'brown_rice',
        food: FOOD_DATABASE.find(f => f.id === 'brown_rice')!,
        quantity_needed: 500,
        unit: 'g',
        status: 'have_at_home',
        student_id: 'student1',
        week_start: selectedDate
      }
    ];
    setShoppingList(mockShopping);
  }, [selectedDate]);

  // Calcular totais do dia
  const calculateDayTotals = () => {
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;

    meals.forEach(meal => {
      meal.foods.forEach(mealFood => {
        const macros = calculateMacros(mealFood.food, mealFood.quantity);
        totalCalories += macros.calories;
        totalCarbs += macros.carbs;
        totalProtein += macros.protein;
        totalFat += macros.fat;
      });
    });

    return {
      calories: Math.round(totalCalories),
      carbs: Math.round(totalCarbs * 10) / 10,
      protein: Math.round(totalProtein * 10) / 10,
      fat: Math.round(totalFat * 10) / 10
    };
  };

  const dayTotals = calculateDayTotals();

  // Função para adicionar água
  const addWater = (amount: number) => {
    setWaterIntake(prev => ({
      ...prev,
      current: Math.min(prev.current + amount, prev.target)
    }));
  };

  // Função para marcar refeição como concluída
  const completeMeal = (mealId: string) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId 
        ? { ...meal, completed: true, completed_at: new Date().toISOString() }
        : meal
    ));
  };

  // Função para atualizar status da lista de compras
  const updateShoppingStatus = (itemId: string, status: ShoppingItem['status']) => {
    setShoppingList(prev => prev.map(item =>
      item.id === itemId ? { ...item, status } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#0A0A0A]">
            <Apple className="w-7 h-7 text-[#FFC300]" />
            Módulo de Nutrição
          </CardTitle>
          <p className="text-[#4A4A4A]">
            {userRole === 'trainer' 
              ? 'Gerencie a nutrição dos seus alunos com precisão'
              : 'Acompanhe sua alimentação e atinja suas metas nutricionais'
            }
          </p>
        </CardHeader>
      </Card>

      {/* Resumo do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Calorias</p>
                <p className="text-2xl font-bold text-[#0A0A0A]">
                  {dayTotals.calories}
                  {nutritionGoals && (
                    <span className="text-sm font-normal text-[#4A4A4A]">
                      /{nutritionGoals.daily_calories}
                    </span>
                  )}
                </p>
                {nutritionGoals && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#FFC300] h-2 rounded-full" 
                      style={{ width: `${Math.min((dayTotals.calories / nutritionGoals.daily_calories) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <Target className="w-8 h-8 text-[#FFC300]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Carboidratos</p>
                <p className="text-2xl font-bold text-blue-600">
                  {dayTotals.carbs}g
                  {nutritionGoals && (
                    <span className="text-sm font-normal text-[#4A4A4A]">
                      /{nutritionGoals.daily_carbs}g
                    </span>
                  )}
                </p>
                {nutritionGoals && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((dayTotals.carbs / nutritionGoals.daily_carbs) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Proteínas</p>
                <p className="text-2xl font-bold text-[#E10600]">
                  {dayTotals.protein}g
                  {nutritionGoals && (
                    <span className="text-sm font-normal text-[#4A4A4A]">
                      /{nutritionGoals.daily_protein}g
                    </span>
                  )}
                </p>
                {nutritionGoals && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#E10600] h-2 rounded-full" 
                      style={{ width: `${Math.min((dayTotals.protein / nutritionGoals.daily_protein) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <Utensils className="w-8 h-8 text-[#E10600]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#4A4A4A] mb-2">Gorduras</p>
                <p className="text-2xl font-bold text-green-600">
                  {dayTotals.fat}g
                  {nutritionGoals && (
                    <span className="text-sm font-normal text-[#4A4A4A]">
                      /{nutritionGoals.daily_fat}g
                    </span>
                  )}
                </p>
                {nutritionGoals && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((dayTotals.fat / nutritionGoals.daily_fat) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <Apple className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controle de Água */}
      <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-bold text-[#0A0A0A]">Hidratação</h3>
                <p className="text-sm text-[#4A4A4A]">
                  {waterIntake.current}ml / {waterIntake.target}ml
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => addWater(250)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="sm"
              >
                +250ml
              </Button>
              <Button 
                onClick={() => addWater(500)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                +500ml
              </Button>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-300" 
              style={{ width: `${(waterIntake.current / waterIntake.target) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs principais */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border-2 border-[#E6C85C] rounded-2xl p-2">
          <TabsTrigger 
            value="today" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Hoje</span>
          </TabsTrigger>
          <TabsTrigger 
            value="meals" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Utensils className="w-4 h-4" />
            <span className="hidden sm:inline">Refeições</span>
          </TabsTrigger>
          <TabsTrigger 
            value="shopping" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Compras</span>
          </TabsTrigger>
          <TabsTrigger 
            value="foods" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Apple className="w-4 h-4" />
            <span className="hidden sm:inline">Alimentos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="schedule" 
            className="flex items-center gap-2 data-[state=active]:bg-[#FFC300] data-[state=active]:text-[#0A0A0A] rounded-xl font-medium"
          >
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Agenda</span>
          </TabsTrigger>
        </TabsList>

        {/* Visão do Dia */}
        <TabsContent value="today" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Refeições de Hoje</h2>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto bg-white border-2 border-[#E6C85C]"
            />
          </div>

          <div className="space-y-4">
            {meals.map((meal) => {
              const mealTotals = meal.foods.reduce((acc, mealFood) => {
                const macros = calculateMacros(mealFood.food, mealFood.quantity);
                return {
                  calories: acc.calories + macros.calories,
                  carbs: acc.carbs + macros.carbs,
                  protein: acc.protein + macros.protein,
                  fat: acc.fat + macros.fat
                };
              }, { calories: 0, carbs: 0, protein: 0, fat: 0 });

              return (
                <Card key={meal.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#FFC300]" />
                        <div>
                          <h3 className="text-lg font-bold text-[#0A0A0A]">{meal.name}</h3>
                          <p className="text-sm text-[#4A4A4A]">{meal.scheduled_time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {meal.completed ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Check className="w-4 h-4 mr-1" />
                            Concluída
                          </Badge>
                        ) : (
                          <Button
                            onClick={() => completeMeal(meal.id)}
                            className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A]"
                            size="sm"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Marcar como Feita
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {meal.foods.map((mealFood) => (
                        <div key={mealFood.id} className="flex justify-between items-center p-3 bg-[#FFF3C4] rounded-xl">
                          <div>
                            <p className="font-medium text-[#0A0A0A]">{mealFood.food.name}</p>
                            <p className="text-sm text-[#4A4A4A]">
                              {mealFood.quantity}g {mealFood.portion_description && `(${mealFood.portion_description})`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#0A0A0A]">
                              {calculateMacros(mealFood.food, mealFood.quantity).calories} kcal
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Calorias</p>
                        <p className="font-bold text-[#0A0A0A]">{Math.round(mealTotals.calories)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Carbs</p>
                        <p className="font-bold text-blue-600">{Math.round(mealTotals.carbs * 10) / 10}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Proteína</p>
                        <p className="font-bold text-[#E10600]">{Math.round(mealTotals.protein * 10) / 10}g</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-[#4A4A4A]">Gordura</p>
                        <p className="font-bold text-green-600">{Math.round(mealTotals.fat * 10) / 10}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Gerenciamento de Refeições */}
        <TabsContent value="meals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Gerenciar Refeições</h2>
            <Button 
              onClick={() => setShowAddMeal(true)}
              className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Refeição
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meals.map((meal) => (
              <Card key={meal.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0A0A0A]">{meal.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{meal.scheduled_time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingMeal(meal)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {meal.foods.map((mealFood) => (
                      <div key={mealFood.id} className="text-sm text-[#4A4A4A]">
                        • {mealFood.food.name} - {mealFood.quantity}g
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lista de Compras */}
        <TabsContent value="shopping" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Lista de Compras</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* O que precisa comprar */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                  <ShoppingCart className="w-6 h-6 text-[#E10600]" />
                  Precisa Comprar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shoppingList
                  .filter(item => item.status === 'need_to_buy')
                  .map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-xl">
                      <div>
                        <p className="font-medium text-[#0A0A0A]">{item.food.name}</p>
                        <p className="text-sm text-[#4A4A4A]">{item.quantity_needed}{item.unit}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateShoppingStatus(item.id, 'bought')}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => updateShoppingStatus(item.id, 'have_at_home')}
                          size="sm"
                          variant="outline"
                        >
                          Tenho em Casa
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* O que tem em casa */}
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                  <Check className="w-6 h-6 text-green-600" />
                  Disponível em Casa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shoppingList
                  .filter(item => item.status === 'have_at_home' || item.status === 'bought')
                  .map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-xl">
                      <div>
                        <p className="font-medium text-[#0A0A0A]">{item.food.name}</p>
                        <p className="text-sm text-[#4A4A4A]">{item.quantity_needed}{item.unit}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {item.status === 'bought' ? 'Comprado' : 'Em Casa'}
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Base de Alimentos */}
        <TabsContent value="foods" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Base de Alimentos</h2>
            <Button 
              onClick={() => setShowAddFood(true)}
              className="bg-[#FFC300] hover:bg-[#E6C85C] text-[#0A0A0A]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Alimento
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] w-4 h-4" />
              <Input
                placeholder="Buscar alimentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-2 border-[#E6C85C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(searchQuery ? searchFoods(searchQuery) : FOOD_DATABASE).map((food) => (
              <Card key={food.id} className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-[#0A0A0A]">{food.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{food.description}</p>
                    </div>
                    {food.is_custom && (
                      <Badge className="bg-[#FFC300] text-[#0A0A0A]">Custom</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-[#4A4A4A]">Calorias</p>
                      <p className="font-medium">{food.calories_per_100g}/100g</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A]">Proteína</p>
                      <p className="font-medium text-[#E10600]">{food.protein_per_100g}g</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A]">Carbs</p>
                      <p className="font-medium text-blue-600">{food.carbs_per_100g}g</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A]">Gordura</p>
                      <p className="font-medium text-green-600">{food.fat_per_100g}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Agenda e Lembretes */}
        <TabsContent value="schedule" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Agenda e Lembretes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                  <Bell className="w-6 h-6 text-[#FFC300]" />
                  Lembretes de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#FFF3C4] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-[#FFC300]" />
                    <div>
                      <p className="font-medium text-[#0A0A0A]">Café da Manhã</p>
                      <p className="text-sm text-[#4A4A4A]">07:00</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Concluído</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-[#0A0A0A]">Beber Água</p>
                      <p className="text-sm text-[#4A4A4A]">10:00</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Pendente</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FFF3C4] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-[#FFC300]" />
                    <div>
                      <p className="font-medium text-[#0A0A0A]">Almoço</p>
                      <p className="text-sm text-[#4A4A4A]">12:00</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Próximo</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-[#E6C85C] shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#0A0A0A]">
                  <BarChart3 className="w-6 h-6 text-[#E10600]" />
                  Adesão Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#4A4A4A]">Refeições Registradas</span>
                    <span className="font-bold text-[#0A0A0A]">18/21</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#FFC300] h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FFC300]">85%</p>
                    <p className="text-sm text-[#4A4A4A]">Taxa de Adesão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}