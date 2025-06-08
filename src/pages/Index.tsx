import React, { useState } from 'react';
import { Calculator, Heart } from 'lucide-react';
import MacroTargets from '@/components/MacroTargets';
import MealGenerator from '@/components/MealGenerator';
import MealPlan from '@/components/MealPlan';

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  foods: Array<{
    name: string;
    amount: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const Index = () => {
  console.log('Index page rendered');

  const [targets, setTargets] = useState<MacroTargets>({
    calories: 2000,
    protein: 100,
    carbs: 150,
    fat: 70
  });

  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);

  const handleAddMeal = (meal: Meal) => {
    console.log('Adding meal to plan:', meal);
    setSelectedMeals(prev => [...prev, meal]);
  };

  const handleRemoveMeal = (mealId: string) => {
    console.log('Removing meal from plan:', mealId);
    setSelectedMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  const handleClearPlan = () => {
    console.log('Clearing meal plan');
    setSelectedMeals([]);
  };

  const currentNutrition = selectedMeals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.totalNutrition.calories,
      protein: total.protein + meal.totalNutrition.protein,
      carbs: total.carbs + meal.totalNutrition.carbs,
      fat: total.fat + meal.totalNutrition.fat
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
            Transform your macro targets into complete meal plans
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Set your daily nutrition targets and generate balanced breakfast, lunch, and dinner suggestions 
            that perfectly match your goals.
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
            
            <MealGenerator 
              targets={targets}
              onAddMeal={handleAddMeal}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <MealPlan
              selectedMeals={selectedMeals}
              targets={targets}
              currentNutrition={currentNutrition}
              onRemoveMeal={handleRemoveMeal}
              onClearPlan={handleClearPlan}
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