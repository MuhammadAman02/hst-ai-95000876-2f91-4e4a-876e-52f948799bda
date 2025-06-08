import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Plus } from 'lucide-react';
import { Food, foodDatabase, calculateNutrition } from '@/utils/foodDatabase';

interface MealSuggestionsProps {
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  currentNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onAddFood: (food: Food, amount: number) => void;
}

const MealSuggestions: React.FC<MealSuggestionsProps> = ({ 
  targets, 
  currentNutrition, 
  onAddFood 
}) => {
  console.log('MealSuggestions component rendered');
  console.log('Current nutrition:', currentNutrition);
  console.log('Targets:', targets);

  const remainingNutrition = {
    calories: Math.max(0, targets.calories - currentNutrition.calories),
    protein: Math.max(0, targets.protein - currentNutrition.protein),
    carbs: Math.max(0, targets.carbs - currentNutrition.carbs),
    fat: Math.max(0, targets.fat - currentNutrition.fat)
  };

  console.log('Remaining nutrition:', remainingNutrition);

  const getSuggestions = () => {
    const suggestions: Array<{ food: Food; amount: number; reason: string }> = [];

    // If we need more protein
    if (remainingNutrition.protein > 10) {
      const proteinFoods = foodDatabase.filter(food => 
        food.category === 'Protein' && food.nutrition.protein > 15
      );
      
      proteinFoods.forEach(food => {
        const neededAmount = Math.ceil((remainingNutrition.protein / food.nutrition.protein) * 100);
        const suggestedAmount = Math.min(neededAmount, 200); // Cap at 200g
        
        if (suggestedAmount >= 50) { // Only suggest if at least 50g
          suggestions.push({
            food,
            amount: suggestedAmount,
            reason: `High protein (${food.nutrition.protein}g per 100g)`
          });
        }
      });
    }

    // If we need more carbs
    if (remainingNutrition.carbs > 15) {
      const carbFoods = foodDatabase.filter(food => 
        food.category === 'Carbs' && food.nutrition.carbs > 15
      );
      
      carbFoods.forEach(food => {
        const neededAmount = Math.ceil((remainingNutrition.carbs / food.nutrition.carbs) * 100);
        const suggestedAmount = Math.min(neededAmount, 200);
        
        if (suggestedAmount >= 30) {
          suggestions.push({
            food,
            amount: suggestedAmount,
            reason: `Good carb source (${food.nutrition.carbs}g per 100g)`
          });
        }
      });
    }

    // If we need more healthy fats
    if (remainingNutrition.fat > 5) {
      const fatFoods = foodDatabase.filter(food => 
        food.category === 'Fats' && food.nutrition.fat > 10
      );
      
      fatFoods.forEach(food => {
        const neededAmount = Math.ceil((remainingNutrition.fat / food.nutrition.fat) * 100);
        const suggestedAmount = Math.min(neededAmount, 50); // Smaller amounts for fats
        
        if (suggestedAmount >= 10) {
          suggestions.push({
            food,
            amount: suggestedAmount,
            reason: `Healthy fats (${food.nutrition.fat}g per 100g)`
          });
        }
      });
    }

    // Always suggest some vegetables for micronutrients
    const vegetables = foodDatabase.filter(food => food.category === 'Vegetables');
    vegetables.slice(0, 2).forEach(food => {
      suggestions.push({
        food,
        amount: 100,
        reason: 'Rich in vitamins and minerals'
      });
    });

    console.log('Generated suggestions:', suggestions);
    return suggestions.slice(0, 6); // Limit to 6 suggestions
  };

  const suggestions = getSuggestions();

  if (suggestions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-health-700">
            <Lightbulb className="h-5 w-5" />
            Meal Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>You're close to your targets! Add some vegetables for micronutrients.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-700">
          <Lightbulb className="h-5 w-5" />
          Suggested Foods
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => {
            const nutrition = calculateNutrition(suggestion.food, suggestion.amount);
            
            return (
              <div key={index} className="border rounded-lg p-3 hover:border-health-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h5 className="font-medium">{suggestion.food.name}</h5>
                    <Badge variant="outline" className="text-xs mt-1">
                      {suggestion.reason}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onAddFood(suggestion.food, suggestion.amount)}
                    className="bg-health-600 hover:bg-health-700"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div className="mb-1">Suggested amount: {suggestion.amount}g</div>
                  <div className="grid grid-cols-4 gap-2">
                    <span>{nutrition.calories} cal</span>
                    <span>{nutrition.protein}g protein</span>
                    <span>{nutrition.carbs}g carbs</span>
                    <span>{nutrition.fat}g fat</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MealSuggestions;