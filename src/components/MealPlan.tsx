import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, Coffee, Sun, Moon, BookOpen, ArrowLeft, Target, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { MacroTargets, Meal } from '@/pages/Index';
import RecipeModal from './RecipeModal';

interface MealPlanProps {
  selectedMeals: Meal[];
  targets: MacroTargets;
  currentNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onRemoveMeal: (mealId: string) => void;
  onClearPlan: () => void;
  onBackToGenerate: () => void;
  onBackToTargets: () => void;
}

const MealPlan: React.FC<MealPlanProps> = ({ 
  selectedMeals, 
  targets, 
  currentNutrition,
  onRemoveMeal, 
  onClearPlan,
  onBackToGenerate,
  onBackToTargets
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  console.log('MealPlan component rendered with meals:', selectedMeals);

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getProgressStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 80) return { status: 'low', color: 'bg-yellow-500', icon: AlertCircle };
    if (percentage <= 110) return { status: 'good', color: 'bg-emerald-500', icon: CheckCircle2 };
    return { status: 'high', color: 'bg-red-500', icon: AlertCircle };
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Sun className="h-4 w-4" />;
      case 'dinner': return <Moon className="h-4 w-4" />;
      default: return null;
    }
  };

  const getMealGradient = (type: string) => {
    switch (type) {
      case 'breakfast': return 'from-orange-400 to-amber-500';
      case 'lunch': return 'from-emerald-400 to-teal-500';
      case 'dinner': return 'from-violet-400 to-purple-500';
      default: return 'from-slate-400 to-slate-500';
    }
  };

  const getMealsByType = (type: 'breakfast' | 'lunch' | 'dinner') => {
    return selectedMeals.filter(meal => meal.type === type);
  };

  const handleViewRecipe = (meal: Meal) => {
    console.log('Opening recipe for:', meal.name);
    setSelectedRecipe(meal);
    setIsRecipeModalOpen(true);
  };

  const macroData = [
    { 
      name: 'Calories', 
      current: currentNutrition.calories, 
      target: targets.calories, 
      unit: 'kcal',
      color: 'slate',
      bgColor: 'bg-slate-50'
    },
    { 
      name: 'Protein', 
      current: currentNutrition.protein, 
      target: targets.protein, 
      unit: 'g',
      color: 'blue',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Carbs', 
      current: currentNutrition.carbs, 
      target: targets.carbs, 
      unit: 'g',
      color: 'orange',
      bgColor: 'bg-orange-50'
    },
    { 
      name: 'Fat', 
      current: currentNutrition.fat, 
      target: targets.fat, 
      unit: 'g',
      color: 'purple',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center gap-3 mb-6">
            <Button
              variant="outline"
              onClick={onBackToTargets}
              className="bg-white/60 hover:bg-white/80 border-slate-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Targets
            </Button>
            <Button
              variant="outline"
              onClick={onBackToGenerate}
              className="bg-white/60 hover:bg-white/80 border-slate-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Add More Meals
            </Button>
          </div>
          
          <div className="inline-flex items-center gap-3 mb-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Your Daily Meal Plan</h3>
          </div>
          <p className="text-slate-600">Track your progress and manage your selected meals</p>
        </div>

        {selectedMeals.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <Calendar className="h-10 w-10 text-slate-400" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">No Meals Selected Yet</h4>
              <p className="text-slate-600 mb-6">
                Start by generating meal suggestions and adding them to your plan!
              </p>
              <Button
                onClick={onBackToGenerate}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              >
                Generate Meal Suggestions
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Progress Tracking */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-800">Daily Progress</h4>
                  </div>
                  
                  <div className="space-y-6">
                    {macroData.map((macro) => {
                      const status = getProgressStatus(macro.current, macro.target);
                      const percentage = getProgressPercentage(macro.current, macro.target);
                      
                      return (
                        <div key={macro.name} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-700">{macro.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-800">
                                {Math.round(macro.current * 10) / 10} / {macro.target} {macro.unit}
                              </span>
                              <status.icon className={`h-4 w-4 ${
                                status.status === 'good' ? 'text-emerald-500' : 
                                status.status === 'low' ? 'text-yellow-500' : 'text-red-500'
                              }`} />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <Progress 
                              value={percentage}
                              className="h-3"
                            />
                            <div className={`absolute inset-0 h-3 rounded-full ${status.color} opacity-80`} 
                                 style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                          </div>
                          
                          <div className="text-xs text-slate-500">
                            {percentage < 80 && `${Math.round(80 - percentage)}% below target`}
                            {percentage >= 80 && percentage <= 110 && 'Perfect range! 🎯'}
                            {percentage > 110 && `${Math.round(percentage - 100)}% over target`}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Card */}
                  <div className="mt-6 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <h5 className="font-semibold text-emerald-800">Today's Total</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-emerald-700">{Math.round(currentNutrition.calories)}</div>
                        <div className="text-emerald-600">calories</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-emerald-700">{Math.round(currentNutrition.protein * 10) / 10}g</div>
                        <div className="text-emerald-600">protein</div>
                      </div>
                    </div>
                  </div>

                  {/* Clear Plan Button */}
                  <Button
                    variant="outline"
                    onClick={onClearPlan}
                    className="w-full mt-4 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Meals
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Meal List */}
            <div className="lg:col-span-2 space-y-6">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                const mealsOfType = getMealsByType(mealType as 'breakfast' | 'lunch' | 'dinner');
                
                return (
                  <Card key={mealType} className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 bg-gradient-to-br ${getMealGradient(mealType)} rounded-xl text-white shadow-lg`}>
                          {getMealIcon(mealType)}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 capitalize">{mealType}</h5>
                          <p className="text-sm text-slate-600">
                            {mealsOfType.length} meal{mealsOfType.length !== 1 ? 's' : ''} selected
                          </p>
                        </div>
                      </div>
                      
                      {mealsOfType.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                          <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                            {getMealIcon(mealType)}
                          </div>
                          <p className="text-sm">No {mealType} selected</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onBackToGenerate}
                            className="mt-3 bg-white/60 hover:bg-white/80"
                          >
                            Add {mealType}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {mealsOfType.map((meal) => (
                            <div key={meal.id} className="group p-4 bg-gradient-to-r from-white/60 to-white/40 rounded-xl border border-white/40 hover:shadow-lg transition-all duration-300">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h6 className="font-semibold text-slate-800">{meal.name}</h6>
                                    <Badge variant="outline" className={
                                      meal.recipe.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                                      meal.recipe.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                      'bg-red-50 text-red-700 border-red-200'
                                    }>
                                      {meal.recipe.difficulty}
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-4 gap-2 mb-2">
                                    <div className="text-center bg-white/60 rounded-lg p-2">
                                      <div className="text-sm font-bold text-slate-700">{Math.round(meal.totalNutrition.calories)}</div>
                                      <div className="text-xs text-slate-500">cal</div>
                                    </div>
                                    <div className="text-center bg-white/60 rounded-lg p-2">
                                      <div className="text-sm font-bold text-blue-700">{Math.round(meal.totalNutrition.protein * 10) / 10}g</div>
                                      <div className="text-xs text-blue-600">protein</div>
                                    </div>
                                    <div className="text-center bg-white/60 rounded-lg p-2">
                                      <div className="text-sm font-bold text-orange-700">{Math.round(meal.totalNutrition.carbs * 10) / 10}g</div>
                                      <div className="text-xs text-orange-600">carbs</div>
                                    </div>
                                    <div className="text-center bg-white/60 rounded-lg p-2">
                                      <div className="text-sm font-bold text-purple-700">{Math.round(meal.totalNutrition.fat * 10) / 10}g</div>
                                      <div className="text-xs text-purple-600">fat</div>
                                    </div>
                                  </div>
                                  
                                  <div className="text-xs text-slate-500">
                                    Prep: {meal.recipe.prepTime}min • Cook: {meal.recipe.cookTime}min • Serves: {meal.recipe.servings}
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 ml-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewRecipe(meal)}
                                    className="bg-white/60 hover:bg-white/80"
                                  >
                                    <BookOpen className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onRemoveMeal(meal.id)}
                                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <RecipeModal
        meal={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />
    </>
  );
};

export default MealPlan;