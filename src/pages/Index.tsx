import React, { useState } from 'react';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
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
  recipe: {
    description: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    ingredients: Array<{
      item: string;
      amount: string;
      notes?: string;
    }>;
    instructions: Array<{
      step: number;
      instruction: string;
      time?: string;
    }>;
    tips?: string[];
    nutrition_notes?: string;
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
  const [currentStep, setCurrentStep] = useState<'targets' | 'generate' | 'plan'>('targets');

  const handleAddMeal = (meal: Meal) => {
    console.log('Adding meal to plan:', meal);
    setSelectedMeals(prev => [...prev, meal]);
    if (currentStep === 'generate') {
      setCurrentStep('plan');
    }
  };

  const handleRemoveMeal = (mealId: string) => {
    console.log('Removing meal from plan:', mealId);
    setSelectedMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  const handleClearPlan = () => {
    console.log('Clearing meal plan');
    setSelectedMeals([]);
    setCurrentStep('targets');
  };

  const handleGenerateClick = () => {
    setCurrentStep('generate');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-violet-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-violet-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-300/10 to-violet-300/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <div className="text-center pt-12 pb-8 px-4">
          <div className="inline-flex items-center gap-3 mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
                NutriPlan
              </h1>
              <p className="text-sm text-slate-600">AI-Powered Meal Planning</p>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
            Transform Your Nutrition Goals Into
            <span className="block bg-gradient-to-r from-emerald-600 to-violet-600 bg-clip-text text-transparent">
              Delicious Meal Plans
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Set your macro targets, generate personalized meal suggestions, and build the perfect daily nutrition plan with detailed recipes.
          </p>

          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-4 mt-8 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentStep === 'targets' ? 'bg-emerald-100 text-emerald-700 shadow-md' : 'bg-white/60 text-slate-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${currentStep === 'targets' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              <span className="text-sm font-medium">Set Targets</span>
            </div>
            
            <div className={`w-8 h-0.5 ${currentStep !== 'targets' ? 'bg-emerald-300' : 'bg-slate-200'} transition-colors duration-300`}></div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentStep === 'generate' ? 'bg-violet-100 text-violet-700 shadow-md' : 'bg-white/60 text-slate-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${currentStep === 'generate' ? 'bg-violet-500' : 'bg-slate-300'}`}></div>
              <span className="text-sm font-medium">Generate Meals</span>
            </div>
            
            <div className={`w-8 h-0.5 ${currentStep === 'plan' ? 'bg-emerald-300' : 'bg-slate-200'} transition-colors duration-300`}></div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              currentStep === 'plan' ? 'bg-emerald-100 text-emerald-700 shadow-md' : 'bg-white/60 text-slate-500'
            }`}>
              <div className={`w-2 h-2 rounded-full ${currentStep === 'plan' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
              <span className="text-sm font-medium">Build Plan</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            {currentStep === 'targets' && (
              <div className="animate-fade-in">
                <MacroTargets 
                  targets={targets} 
                  onTargetsChange={setTargets}
                  onGenerateClick={handleGenerateClick}
                />
              </div>
            )}

            {currentStep === 'generate' && (
              <div className="animate-fade-in">
                <MealGenerator 
                  targets={targets}
                  onAddMeal={handleAddMeal}
                  onBackToTargets={() => setCurrentStep('targets')}
                />
              </div>
            )}

            {currentStep === 'plan' && (
              <div className="animate-fade-in">
                <MealPlan
                  selectedMeals={selectedMeals}
                  targets={targets}
                  currentNutrition={currentNutrition}
                  onRemoveMeal={handleRemoveMeal}
                  onClearPlan={handleClearPlan}
                  onBackToGenerate={() => setCurrentStep('generate')}
                  onBackToTargets={() => setCurrentStep('targets')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 px-4">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <TrendingUp className="h-4 w-4" />
            <span>Trusted by nutrition enthusiasts worldwide</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;