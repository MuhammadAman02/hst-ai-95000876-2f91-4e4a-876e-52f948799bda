import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, Utensils } from 'lucide-react';
import { Food, calculateNutrition } from '@/utils/foodDatabase';

interface MealItem {
  food: Food;
  amount: number;
  nutrition: Food['nutrition'];
}

interface MealBuilderProps {
  mealItems: MealItem[];
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onRemoveItem: (index: number) => void;
  onClearMeal: () => void;
}

const MealBuilder: React.FC<MealBuilderProps> = ({ 
  mealItems, 
  targets, 
  onRemoveItem, 
  onClearMeal 
}) => {
  console.log('MealBuilder component rendered with items:', mealItems);

  const totalNutrition = mealItems.reduce(
    (total, item) => ({
      calories: total.calories + item.nutrition.calories,
      protein: total.protein + item.nutrition.protein,
      carbs: total.carbs + item.nutrition.carbs,
      fat: total.fat + item.nutrition.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getProgressPercentage = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 80) return 'bg-yellow-500';
    if (percentage <= 100) return 'bg-health-500';
    return 'bg-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-health-700">
            <Utensils className="h-5 w-5" />
            Your Meal Plan
          </CardTitle>
          {mealItems.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClearMeal}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mealItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Utensils className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No foods added yet. Search and add foods to build your meal!</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h4 className="font-medium">Foods in your meal:</h4>
              {mealItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{item.food.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.amount}g • {item.nutrition.calories} cal • {item.nutrition.protein}g protein
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-medium">Nutrition Summary</h4>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span className="font-medium">
                      {Math.round(totalNutrition.calories)} / {targets.calories} kcal
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(totalNutrition.calories, targets.calories)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span className="font-medium">
                      {Math.round(totalNutrition.protein * 10) / 10} / {targets.protein}g
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(totalNutrition.protein, targets.protein)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carbs</span>
                    <span className="font-medium">
                      {Math.round(totalNutrition.carbs * 10) / 10} / {targets.carbs}g
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(totalNutrition.carbs, targets.carbs)}
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fat</span>
                    <span className="font-medium">
                      {Math.round(totalNutrition.fat * 10) / 10} / {targets.fat}g
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(totalNutrition.fat, targets.fat)}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="bg-health-50 p-3 rounded-lg">
                <h5 className="font-medium text-health-800 mb-1">Total Nutrition:</h5>
                <div className="grid grid-cols-4 gap-2 text-sm text-health-700">
                  <div>{Math.round(totalNutrition.calories)} cal</div>
                  <div>{Math.round(totalNutrition.protein * 10) / 10}g protein</div>
                  <div>{Math.round(totalNutrition.carbs * 10) / 10}g carbs</div>
                  <div>{Math.round(totalNutrition.fat * 10) / 10}g fat</div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MealBuilder;