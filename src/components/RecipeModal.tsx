import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, ChefHat, Lightbulb } from 'lucide-react';
import { Meal } from '@/pages/Index';

interface RecipeModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ meal, isOpen, onClose }) => {
  if (!meal) return null;

  console.log('RecipeModal opened for meal:', meal.name);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-health-800">
            {meal.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipe Overview */}
          <div className="bg-health-50 p-4 rounded-lg">
            <p className="text-health-700 mb-4">{meal.recipe.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-health-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Prep Time</div>
                  <div className="font-medium">{meal.recipe.prepTime} min</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-health-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Cook Time</div>
                  <div className="font-medium">{meal.recipe.cookTime} min</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-health-600" />
                <div>
                  <div className="text-xs text-muted-foreground">Servings</div>
                  <div className="font-medium">{meal.recipe.servings}</div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground mb-1">Difficulty</div>
                <Badge className={getDifficultyColor(meal.recipe.difficulty)}>
                  {meal.recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="bg-gradient-to-r from-health-100 to-health-50 p-4 rounded-lg">
            <h3 className="font-semibold text-health-800 mb-2">Nutrition Per Serving</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-health-700">{Math.round(meal.totalNutrition.calories)}</div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-health-700">{Math.round(meal.totalNutrition.protein * 10) / 10}g</div>
                <div className="text-xs text-muted-foreground">Protein</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-health-700">{Math.round(meal.totalNutrition.carbs * 10) / 10}g</div>
                <div className="text-xs text-muted-foreground">Carbs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-health-700">{Math.round(meal.totalNutrition.fat * 10) / 10}g</div>
                <div className="text-xs text-muted-foreground">Fat</div>
              </div>
            </div>
            {meal.recipe.nutrition_notes && (
              <p className="text-sm text-health-600 mt-3 italic">{meal.recipe.nutrition_notes}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-health-800">Ingredients</h3>
              <div className="space-y-2">
                {meal.recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-start p-2 bg-gray-50 rounded">
                    <span className="font-medium">{ingredient.item}</span>
                    <div className="text-right">
                      <div className="font-medium text-health-600">{ingredient.amount}</div>
                      {ingredient.notes && (
                        <div className="text-xs text-muted-foreground">{ingredient.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-health-800">Instructions</h3>
              <div className="space-y-3">
                {meal.recipe.instructions.map((instruction) => (
                  <div key={instruction.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-health-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {instruction.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{instruction.instruction}</p>
                      {instruction.time && (
                        <p className="text-xs text-health-600 mt-1">⏱️ {instruction.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          {meal.recipe.tips && meal.recipe.tips.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3 text-health-800 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Pro Tips
                </h3>
                <div className="space-y-2">
                  {meal.recipe.tips.map((tip, index) => (
                    <div key={index} className="flex gap-2 p-3 bg-yellow-50 rounded-lg">
                      <span className="text-yellow-600">💡</span>
                      <p className="text-sm text-yellow-800">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;