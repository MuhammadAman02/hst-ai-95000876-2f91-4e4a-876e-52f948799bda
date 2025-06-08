export interface Food {
  id: string;
  name: string;
  category: string;
  nutrition: {
    calories: number; // per 100g
    protein: number; // per 100g
    carbs: number; // per 100g
    fat: number; // per 100g
    fiber?: number; // per 100g
  };
  commonServing: {
    amount: number;
    unit: string;
  };
}

export const foodDatabase: Food[] = [
  // Protein sources
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (skinless)',
    category: 'Protein',
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    commonServing: { amount: 100, unit: 'g' }
  },
  {
    id: 'salmon',
    name: 'Salmon (Atlantic)',
    category: 'Protein',
    nutrition: { calories: 208, protein: 25, carbs: 0, fat: 12 },
    commonServing: { amount: 150, unit: 'g' }
  },
  {
    id: 'eggs',
    name: 'Eggs (whole)',
    category: 'Protein',
    nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    commonServing: { amount: 50, unit: 'g (1 egg)' }
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (plain)',
    category: 'Protein',
    nutrition: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    commonServing: { amount: 170, unit: 'g (1 cup)' }
  },
  {
    id: 'tofu',
    name: 'Tofu (firm)',
    category: 'Protein',
    nutrition: { calories: 144, protein: 17, carbs: 3, fat: 9 },
    commonServing: { amount: 100, unit: 'g' }
  },
  
  // Carb sources
  {
    id: 'brown-rice',
    name: 'Brown Rice (cooked)',
    category: 'Carbs',
    nutrition: { calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
    commonServing: { amount: 150, unit: 'g (1 cup)' }
  },
  {
    id: 'quinoa',
    name: 'Quinoa (cooked)',
    category: 'Carbs',
    nutrition: { calories: 120, protein: 4.4, carbs: 22, fat: 1.9 },
    commonServing: { amount: 185, unit: 'g (1 cup)' }
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato (baked)',
    category: 'Carbs',
    nutrition: { calories: 90, protein: 2, carbs: 21, fat: 0.1 },
    commonServing: { amount: 200, unit: 'g (1 medium)' }
  },
  {
    id: 'oats',
    name: 'Oats (rolled, dry)',
    category: 'Carbs',
    nutrition: { calories: 389, protein: 17, carbs: 66, fat: 7 },
    commonServing: { amount: 40, unit: 'g (1/2 cup)' }
  },
  
  // Healthy fats
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Fats',
    nutrition: { calories: 160, protein: 2, carbs: 9, fat: 15 },
    commonServing: { amount: 150, unit: 'g (1 medium)' }
  },
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Fats',
    nutrition: { calories: 579, protein: 21, carbs: 22, fat: 50 },
    commonServing: { amount: 28, unit: 'g (1 oz)' }
  },
  {
    id: 'olive-oil',
    name: 'Olive Oil',
    category: 'Fats',
    nutrition: { calories: 884, protein: 0, carbs: 0, fat: 100 },
    commonServing: { amount: 15, unit: 'ml (1 tbsp)' }
  },
  
  // Vegetables
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'Vegetables',
    nutrition: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    commonServing: { amount: 100, unit: 'g (1 cup)' }
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'Vegetables',
    nutrition: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    commonServing: { amount: 30, unit: 'g (1 cup)' }
  }
];

export const searchFoods = (query: string): Food[] => {
  console.log('Searching foods with query:', query);
  if (!query.trim()) return foodDatabase;
  
  const lowercaseQuery = query.toLowerCase();
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFoodsByCategory = (category: string): Food[] => {
  console.log('Getting foods by category:', category);
  return foodDatabase.filter(food => food.category === category);
};

export const calculateNutrition = (food: Food, amount: number): Food['nutrition'] => {
  console.log('Calculating nutrition for:', food.name, 'amount:', amount);
  const ratio = amount / 100; // nutrition is per 100g
  return {
    calories: Math.round(food.nutrition.calories * ratio),
    protein: Math.round(food.nutrition.protein * ratio * 10) / 10,
    carbs: Math.round(food.nutrition.carbs * ratio * 10) / 10,
    fat: Math.round(food.nutrition.fat * ratio * 10) / 10
  };
};