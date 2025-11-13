// Base de alimentos com macronutrientes

export const FOOD_DATABASE = [
  // Proteínas
  {
    id: 'chicken_breast',
    name: 'Peito de Frango',
    description: 'Peito de frango grelhado sem pele',
    calories_per_100g: 165,
    carbs_per_100g: 0,
    protein_per_100g: 31,
    fat_per_100g: 3.6,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'eggs',
    name: 'Ovos',
    description: 'Ovos de galinha inteiros',
    calories_per_100g: 155,
    carbs_per_100g: 1.1,
    protein_per_100g: 13,
    fat_per_100g: 11,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'salmon',
    name: 'Salmão',
    description: 'Salmão grelhado',
    calories_per_100g: 208,
    carbs_per_100g: 0,
    protein_per_100g: 25,
    fat_per_100g: 12,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'lean_beef',
    name: 'Carne Bovina Magra',
    description: 'Patinho ou alcatra grelhada',
    calories_per_100g: 250,
    carbs_per_100g: 0,
    protein_per_100g: 26,
    fat_per_100g: 15,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'greek_yogurt',
    name: 'Iogurte Grego',
    description: 'Iogurte grego natural desnatado',
    calories_per_100g: 59,
    carbs_per_100g: 3.6,
    protein_per_100g: 10,
    fat_per_100g: 0.4,
    is_custom: false,
    created_at: new Date().toISOString()
  },

  // Carboidratos
  {
    id: 'brown_rice',
    name: 'Arroz Integral',
    description: 'Arroz integral cozido',
    calories_per_100g: 111,
    carbs_per_100g: 23,
    protein_per_100g: 2.6,
    fat_per_100g: 0.9,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'sweet_potato',
    name: 'Batata Doce',
    description: 'Batata doce cozida',
    calories_per_100g: 86,
    carbs_per_100g: 20,
    protein_per_100g: 1.6,
    fat_per_100g: 0.1,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'oats',
    name: 'Aveia',
    description: 'Aveia em flocos',
    calories_per_100g: 389,
    carbs_per_100g: 66,
    protein_per_100g: 17,
    fat_per_100g: 7,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'banana',
    name: 'Banana',
    description: 'Banana nanica',
    calories_per_100g: 89,
    carbs_per_100g: 23,
    protein_per_100g: 1.1,
    fat_per_100g: 0.3,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'whole_bread',
    name: 'Pão Integral',
    description: 'Pão integral de forma',
    calories_per_100g: 247,
    carbs_per_100g: 41,
    protein_per_100g: 13,
    fat_per_100g: 4.2,
    is_custom: false,
    created_at: new Date().toISOString()
  },

  // Gorduras Boas
  {
    id: 'avocado',
    name: 'Abacate',
    description: 'Abacate fresco',
    calories_per_100g: 160,
    carbs_per_100g: 9,
    protein_per_100g: 2,
    fat_per_100g: 15,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'olive_oil',
    name: 'Azeite de Oliva',
    description: 'Azeite extra virgem',
    calories_per_100g: 884,
    carbs_per_100g: 0,
    protein_per_100g: 0,
    fat_per_100g: 100,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'almonds',
    name: 'Amêndoas',
    description: 'Amêndoas cruas',
    calories_per_100g: 579,
    carbs_per_100g: 22,
    protein_per_100g: 21,
    fat_per_100g: 50,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'peanut_butter',
    name: 'Pasta de Amendoim',
    description: 'Pasta de amendoim integral',
    calories_per_100g: 588,
    carbs_per_100g: 20,
    protein_per_100g: 25,
    fat_per_100g: 50,
    is_custom: false,
    created_at: new Date().toISOString()
  },

  // Vegetais
  {
    id: 'broccoli',
    name: 'Brócolis',
    description: 'Brócolis cozido no vapor',
    calories_per_100g: 34,
    carbs_per_100g: 7,
    protein_per_100g: 2.8,
    fat_per_100g: 0.4,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'spinach',
    name: 'Espinafre',
    description: 'Espinafre fresco',
    calories_per_100g: 23,
    carbs_per_100g: 3.6,
    protein_per_100g: 2.9,
    fat_per_100g: 0.4,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'tomato',
    name: 'Tomate',
    description: 'Tomate fresco',
    calories_per_100g: 18,
    carbs_per_100g: 3.9,
    protein_per_100g: 0.9,
    fat_per_100g: 0.2,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'lettuce',
    name: 'Alface',
    description: 'Alface americana',
    calories_per_100g: 15,
    carbs_per_100g: 2.9,
    protein_per_100g: 1.4,
    fat_per_100g: 0.2,
    is_custom: false,
    created_at: new Date().toISOString()
  },

  // Laticínios
  {
    id: 'cottage_cheese',
    name: 'Queijo Cottage',
    description: 'Queijo cottage desnatado',
    calories_per_100g: 98,
    carbs_per_100g: 3.4,
    protein_per_100g: 11,
    fat_per_100g: 4.3,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'milk',
    name: 'Leite Desnatado',
    description: 'Leite desnatado',
    calories_per_100g: 34,
    carbs_per_100g: 5,
    protein_per_100g: 3.4,
    fat_per_100g: 0.1,
    is_custom: false,
    created_at: new Date().toISOString()
  },

  // Leguminosas
  {
    id: 'black_beans',
    name: 'Feijão Preto',
    description: 'Feijão preto cozido',
    calories_per_100g: 132,
    carbs_per_100g: 23,
    protein_per_100g: 8.9,
    fat_per_100g: 0.5,
    is_custom: false,
    created_at: new Date().toISOString()
  },
  {
    id: 'lentils',
    name: 'Lentilha',
    description: 'Lentilha cozida',
    calories_per_100g: 116,
    carbs_per_100g: 20,
    protein_per_100g: 9,
    fat_per_100g: 0.4,
    is_custom: false,
    created_at: new Date().toISOString()
  }
];

// Função para buscar alimentos
export const searchFoods = (query: string) => {
  return FOOD_DATABASE.filter(food => 
    food.name.toLowerCase().includes(query.toLowerCase()) ||
    food.description?.toLowerCase().includes(query.toLowerCase())
  );
};

// Função para calcular macros de uma quantidade específica
export const calculateMacros = (food: any, quantityInGrams: number) => {
  const factor = quantityInGrams / 100;
  return {
    calories: Math.round(food.calories_per_100g * factor),
    carbs: Math.round(food.carbs_per_100g * factor * 10) / 10,
    protein: Math.round(food.protein_per_100g * factor * 10) / 10,
    fat: Math.round(food.fat_per_100g * factor * 10) / 10
  };
};