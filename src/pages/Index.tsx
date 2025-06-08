import React, { useState } from 'react';
import { Calculator, Heart, Target } from 'lucide-react';
import MacroTargets from '@/components/MacroTargets';
import FoodSearch from '@/components/FoodSearch';
import MealBuilder from '@/components/MealBuilder';
import MealSuggestions from '@/components/MealSuggestions';
import { Food, calculateNutrition } from '@/utils/foodDatabase';

interface MealItem {
  food: Food;
  amount: number;
  nutrition: Food['nutrition'];
}

const Index = () => {
  console.log('Index page rendered');

  const [targets, setTargets] = useState({
    calories: 2000,
    protein: 100,
    carbs: 150,
    fat: 70
  });

  const [mealItems, setMealItems] = useState<MealItem[]>([]);

  const handleAddFood = (food: Food, amount: number) => {
    console.log('Adding food to meal:', food.name, amount);
    const nutrition = calculateNutrition(food, amount);
    const newItem: MealItem = {
      food,
      amount,
      nutrition
    };
    setMealItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    console.log('Removing item at index:', index);
    setMealItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearMeal = () => {
    console.log('Clearing all meal items');
    setMealItems([]);
  };

  const currentNutrition = mealItems.reduce(
    (total, item) => ({
      calories: total.calories + item.nutrition.calories,
      protein: total.protein + item.nutrition.protein,
      carbs: total.carbs + item.nutrition.carbs,
      fat: total.fat + item.nutrition.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-health-600 rounded-full">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-health-800">NutriPlan</h1>
          </div>
          <p className="text-xl text-health-600 mb-2">
            Transform your dietitian's macro targets into delicious meals
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your daily nutrition targets and let us suggest the perfect foods to meet your goals. 
            Build balanced meals with precise macro tracking.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <MacroTargets 
              targets={targets} 
              onTargetsChange={setTargets} 
            />
            
            <FoodSearch onAddFood={handleAddFood} />
            
            <MealSuggestions 
              targets={targets}
              currentNutrition={currentNutrition}
              onAddFood={handleAddFood}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <MealBuilder
              mealItems={mealItems}
              targets={targets}
              onRemoveItem={handleRemoveItem}
              onClearMeal={handleClearMeal}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-health-500" />
            <span>Built to help you achieve your nutrition goals</span>
          </div>
          <p>Always consult with your dietitian for personalized nutrition advice.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;