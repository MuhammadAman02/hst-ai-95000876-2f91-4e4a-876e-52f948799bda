import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wand2, Plus, Coffee, Sun, Moon } from 'lucide-react';
import { MacroTargets, Meal } from '@/pages/Index';

interface MealGeneratorProps {
  targets: MacroTargets;
  onAddMeal: (meal: Meal) => void;
}

const MealGenerator: React.FC<MealGeneratorProps> = ({ targets, onAddMeal }) => {
  const [generatedMeals, setGeneratedMeals] = useState<{
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  console.log('MealGenerator component rendered with targets:', targets);

  const generateMeals = () => {
    console.log('Generating meals for targets:', targets);
    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      const meals = createMealSuggestions(targets);
      setGeneratedMeals(meals);
      setIsGenerating(false);
      console.log('Generated meals:', meals);
    }, 1500);
  };

  const createMealSuggestions = (targets: MacroTargets) => {
    // Distribute macros across meals (rough percentages)
    const breakfastRatio = 0.25;
    const lunchRatio = 0.35;
    const dinnerRatio = 0.4;

    const breakfastTargets = {
      calories: Math.round(targets.calories * breakfastRatio),
      protein: Math.round(targets.protein * breakfastRatio),
      carbs: Math.round(targets.carbs * breakfastRatio),
      fat: Math.round(targets.fat * breakfastRatio)
    };

    const lunchTargets = {
      calories: Math.round(targets.calories * lunchRatio),
      protein: Math.round(targets.protein * lunchRatio),
      carbs: Math.round(targets.carbs * lunchRatio),
      fat: Math.round(targets.fat * lunchRatio)
    };

    const dinnerTargets = {
      calories: Math.round(targets.calories * dinnerRatio),
      protein: Math.round(targets.protein * dinnerRatio),
      carbs: Math.round(targets.carbs * dinnerRatio),
      fat: Math.round(targets.fat * dinnerRatio)
    };

    return {
      breakfast: generateBreakfastOptions(breakfastTargets),
      lunch: generateLunchOptions(lunchTargets),
      dinner: generateDinnerOptions(dinnerTargets)
    };
  };

  const generateBreakfastOptions = (targets: MacroTargets): Meal[] => {
    return [
      {
        id: `breakfast-1-${Date.now()}`,
        name: "Protein Oatmeal Bowl",
        type: 'breakfast' as const,
        foods: [
          { name: "Oats", amount: 60, calories: 222, protein: 7.5, carbs: 40, fat: 4 },
          { name: "Protein Powder", amount: 30, calories: 120, protein: 24, carbs: 2, fat: 1 },
          { name: "Banana", amount: 100, calories: 89, protein: 1, carbs: 23, fat: 0.3 },
          { name: "Almonds", amount: 20, calories: 116, protein: 4, carbs: 2, fat: 10 }
        ],
        totalNutrition: { calories: 547, protein: 36.5, carbs: 67, fat: 15.3 }
      },
      {
        id: `breakfast-2-${Date.now()}`,
        name: "Greek Yogurt Parfait",
        type: 'breakfast' as const,
        foods: [
          { name: "Greek Yogurt", amount: 200, calories: 130, protein: 20, carbs: 9, fat: 0 },
          { name: "Granola", amount: 40, calories: 180, protein: 4, carbs: 32, fat: 6 },
          { name: "Berries", amount: 100, calories: 57, protein: 1, carbs: 14, fat: 0.3 },
          { name: "Honey", amount: 15, calories: 46, protein: 0, carbs: 12, fat: 0 }
        ],
        totalNutrition: { calories: 413, protein: 25, carbs: 67, fat: 6.3 }
      },
      {
        id: `breakfast-3-${Date.now()}`,
        name: "Avocado Toast & Eggs",
        type: 'breakfast' as const,
        foods: [
          { name: "Whole Grain Bread", amount: 60, calories: 160, protein: 6, carbs: 28, fat: 3 },
          { name: "Avocado", amount: 80, calories: 128, protein: 2, carbs: 7, fat: 12 },
          { name: "Eggs", amount: 100, calories: 155, protein: 13, carbs: 1, fat: 11 },
          { name: "Spinach", amount: 30, calories: 7, protein: 1, carbs: 1, fat: 0 }
        ],
        totalNutrition: { calories: 450, protein: 22, carbs: 37, fat: 26 }
      }
    ];
  };

  const generateLunchOptions = (targets: MacroTargets): Meal[] => {
    return [
      {
        id: `lunch-1-${Date.now()}`,
        name: "Grilled Chicken Salad",
        type: 'lunch' as const,
        foods: [
          { name: "Chicken Breast", amount: 150, calories: 248, protein: 46, carbs: 0, fat: 5 },
          { name: "Mixed Greens", amount: 100, calories: 20, protein: 2, carbs: 4, fat: 0 },
          { name: "Quinoa", amount: 80, calories: 120, protein: 4, carbs: 22, fat: 2 },
          { name: "Olive Oil", amount: 15, calories: 135, protein: 0, carbs: 0, fat: 15 }
        ],
        totalNutrition: { calories: 523, protein: 52, carbs: 26, fat: 22 }
      },
      {
        id: `lunch-2-${Date.now()}`,
        name: "Salmon Rice Bowl",
        type: 'lunch' as const,
        foods: [
          { name: "Salmon Fillet", amount: 120, calories: 248, protein: 25, carbs: 0, fat: 15 },
          { name: "Brown Rice", amount: 100, calories: 111, protein: 3, carbs: 23, fat: 1 },
          { name: "Broccoli", amount: 150, calories: 51, protein: 5, carbs: 10, fat: 1 },
          { name: "Sesame Oil", amount: 10, calories: 88, protein: 0, carbs: 0, fat: 10 }
        ],
        totalNutrition: { calories: 498, protein: 33, carbs: 33, fat: 27 }
      },
      {
        id: `lunch-3-${Date.now()}`,
        name: "Turkey Wrap",
        type: 'lunch' as const,
        foods: [
          { name: "Whole Wheat Tortilla", amount: 80, calories: 210, protein: 7, carbs: 36, fat: 5 },
          { name: "Turkey Breast", amount: 100, calories: 135, protein: 25, carbs: 0, fat: 3 },
          { name: "Hummus", amount: 30, calories: 90, protein: 4, carbs: 8, fat: 6 },
          { name: "Vegetables", amount: 80, calories: 20, protein: 1, carbs: 4, fat: 0 }
        ],
        totalNutrition: { calories: 455, protein: 37, carbs: 48, fat: 14 }
      }
    ];
  };

  const generateDinnerOptions = (targets: MacroTargets): Meal[] => {
    return [
      {
        id: `dinner-1-${Date.now()}`,
        name: "Lean Beef Stir-fry",
        type: 'dinner' as const,
        foods: [
          { name: "Lean Beef", amount: 150, calories: 250, protein: 36, carbs: 0, fat: 11 },
          { name: "Sweet Potato", amount: 200, calories: 172, protein: 4, carbs: 40, fat: 0 },
          { name: "Mixed Vegetables", amount: 150, calories: 35, protein: 2, carbs: 7, fat: 0 },
          { name: "Coconut Oil", amount: 10, calories: 90, protein: 0, carbs: 0, fat: 10 }
        ],
        totalNutrition: { calories: 547, protein: 42, carbs: 47, fat: 21 }
      },
      {
        id: `dinner-2-${Date.now()}`,
        name: "Baked Cod with Quinoa",
        type: 'dinner' as const,
        foods: [
          { name: "Cod Fillet", amount: 180, calories: 158, protein: 34, carbs: 0, fat: 1 },
          { name: "Quinoa", amount: 120, calories: 180, protein: 6, carbs: 33, fat: 3 },
          { name: "Asparagus", amount: 150, calories: 30, protein: 3, carbs: 6, fat: 0 },
          { name: "Butter", amount: 15, calories: 108, protein: 0, carbs: 0, fat: 12 }
        ],
        totalNutrition: { calories: 476, protein: 43, carbs: 39, fat: 16 }
      },
      {
        id: `dinner-3-${Date.now()}`,
        name: "Chicken Pasta",
        type: 'dinner' as const,
        foods: [
          { name: "Chicken Thigh", amount: 140, calories: 280, protein: 25, carbs: 0, fat: 20 },
          { name: "Whole Wheat Pasta", amount: 80, calories: 280, protein: 12, carbs: 56, fat: 2 },
          { name: "Tomato Sauce", amount: 100, calories: 35, protein: 2, carbs: 8, fat: 0 },
          { name: "Parmesan", amount: 20, calories: 80, protein: 7, carbs: 1, fat: 5 }
        ],
        totalNutrition: { calories: 675, protein: 46, carbs: 65, fat: 27 }
      }
    ];
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'lunch': return <Sun className="h-4 w-4" />;
      case 'dinner': return <Moon className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-700">
          <Wand2 className="h-5 w-5" />
          Generate Meal Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!generatedMeals ? (
          <div className="text-center py-8">
            <Wand2 className="h-12 w-12 mx-auto mb-4 text-health-500" />
            <p className="text-muted-foreground mb-4">
              Ready to create your personalized meal plan?
            </p>
            <Button 
              onClick={generateMeals}
              disabled={isGenerating}
              className="bg-health-600 hover:bg-health-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Meals...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Meal Plan
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(generatedMeals).map(([mealType, meals]) => (
              <div key={mealType}>
                <h4 className="font-medium mb-3 flex items-center gap-2 capitalize">
                  {getMealIcon(mealType)}
                  {mealType} Options
                </h4>
                <div className="space-y-3">
                  {meals.map((meal) => (
                    <div key={meal.id} className="border rounded-lg p-4 hover:border-health-300 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-medium">{meal.name}</h5>
                          <Badge variant="outline" className="mt-1 capitalize">
                            {meal.type}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onAddMeal(meal)}
                          className="bg-health-600 hover:bg-health-700"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Plan
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                          <span>{meal.totalNutrition.calories} cal</span>
                          <span>{meal.totalNutrition.protein}g protein</span>
                          <span>{meal.totalNutrition.carbs}g carbs</span>
                          <span>{meal.totalNutrition.fat}g fat</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <strong>Includes:</strong> {meal.foods.map(food => `${food.amount}g ${food.name}`).join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={generateMeals}
              className="w-full"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Generate New Options
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealGenerator;