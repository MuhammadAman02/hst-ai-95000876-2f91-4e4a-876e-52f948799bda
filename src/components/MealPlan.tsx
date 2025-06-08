import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, Coffee, Sun, Moon, BookOpen } from 'lucide-react';
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
}

const MealPlan: React.FC<MealPlanProps> = ({ 
  selectedMeals, 
  targets, 
  currentNutrition,
  onRemoveMeal, 
  onClearPlan 
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  console.log('MealPlan component rendered with meals:', selectedMeals);

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 80) return 'bg-yellow-500';
    if (percentage <= 110) return 'bg-health-500';
    return 'bg-red-500';
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Sun className="h-4 w-4" />;
      case 'dinner': return <Moon className="h-4 w-4" />;
      default: return null;
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

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-health-700">
              <Calendar className="h-5 w-5" />
              Your Meal Plan
            </CardTitle>
            {selectedMeals.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearPlan}
                className="text-red-600 hover:text-red-700"
              >
                Clear Plan
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedMeals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No meals added yet. Generate meal suggestions and add them to your plan!</p>
            </div>
          ) : (
            <>
              {/* Progress Tracking */}
              <div className="space-y-4">
                <h4 className="font-medium">Daily Progress</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Calories</span>
                      <span className="font-medium">
                        {Math.round(currentNutrition.calories)} / {targets.calories} kcal
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(currentNutrition.calories, targets.calories)}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Protein</span>
                      <span className="font-medium">
                        {Math.round(currentNutrition.protein * 10) / 10} / {targets.protein}g
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(currentNutrition.protein, targets.protein)}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbs</span>
                      <span className="font-medium">
                        {Math.round(currentNutrition.carbs * 10) / 10} / {targets.carbs}g
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(currentNutrition.carbs, targets.carbs)}
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fat</span>
                      <span className="font-medium">
                        {Math.round(currentNutrition.fat * 10) / 10} / {targets.fat}g
                      </span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(currentNutrition.fat, targets.fat)}
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="bg-health-50 p-3 rounded-lg">
                  <h5 className="font-medium text-health-800 mb-1">Total Nutrition:</h5>
                  <div className="grid grid-cols-4 gap-2 text-sm text-health-700">
                    <div>{Math.round(currentNutrition.calories)} cal</div>
                    <div>{Math.round(currentNutrition.protein * 10) / 10}g protein</div>
                    <div>{Math.round(currentNutrition.carbs * 10) / 10}g carbs</div>
                    <div>{Math.round(currentNutrition.fat * 10) / 10}g fat</div>
                  </div>
                </div>
              </div>

              {/* Meal List by Type */}
              <div className="space-y-4">
                <h4 className="font-medium">Selected Meals</h4>
                
                {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                  const mealsOfType = getMealsByType(mealType as 'breakfast' | 'lunch' | 'dinner');
                  
                  return (
                    <div key={mealType}>
                      <h5 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 capitalize">
                        {getMealIcon(mealType)}
                        {mealType}
                      </h5>
                      
                      {mealsOfType.length === 0 ? (
                        <div className="text-xs text-muted-foreground ml-6 mb-3">
                          No {mealType} selected
                        </div>
                      ) : (
                        <div className="space-y-2 mb-3">
                          {mealsOfType.map((meal) => (
                            <div key={meal.id} className="flex justify-between items-center p-3 bg-muted rounded-lg ml-6">
                              <div className="flex-1">
                                <div className="font-medium text-sm">{meal.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {meal.totalNutrition.calories} cal • {meal.totalNutrition.protein}g protein • {meal.totalNutrition.carbs}g carbs • {meal.totalNutrition.fat}g fat
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Prep: {meal.recipe.prepTime}min • Cook: {meal.recipe.cookTime}min
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewRecipe(meal)}
                                  className="text-health-600 hover:text-health-700"
                                >
                                  <BookOpen className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onRemoveMeal(meal.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <RecipeModal
        meal={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />
    </>
  );
};

export default MealPlan;