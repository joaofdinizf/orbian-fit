// Tipos para o módulo de nutrição

export interface Food {
  id: string;
  name: string;
  description?: string;
  calories_per_100g: number;
  carbs_per_100g: number;
  protein_per_100g: number;
  fat_per_100g: number;
  is_custom: boolean;
  created_by?: string;
  created_at: string;
}

export interface MealFood {
  id: string;
  food_id: string;
  food: Food;
  quantity: number; // em gramas
  portion_description?: string; // ex: "1 xícara", "2 fatias"
}

export interface Meal {
  id: string;
  name: string;
  scheduled_time: string;
  foods: MealFood[];
  photo_url?: string;
  notes?: string;
  completed: boolean;
  completed_at?: string;
  student_id: string;
  date: string;
}

export interface DayNutrition {
  date: string;
  meals: Meal[];
  total_calories: number;
  total_carbs: number;
  total_protein: number;
  total_fat: number;
}

export interface ShoppingItem {
  id: string;
  food_id: string;
  food: Food;
  quantity_needed: number;
  unit: string; // "g", "kg", "unidade", etc.
  status: 'need_to_buy' | 'have_at_home' | 'bought';
  student_id: string;
  week_start: string;
}

export interface NutritionGoals {
  id: string;
  student_id: string;
  daily_calories: number;
  daily_carbs: number;
  daily_protein: number;
  daily_fat: number;
  created_by: string; // nutricionista
  created_at: string;
}

export interface WaterReminder {
  id: string;
  student_id: string;
  target_ml: number;
  current_ml: number;
  reminders_times: string[]; // horários dos lembretes
  date: string;
}

export interface NutritionStats {
  adherence_percentage: number;
  meals_completed_this_week: number;
  total_meals_this_week: number;
  average_calories_per_day: number;
  days_on_track: number;
}