import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, ChefHat, Lightbulb, Sparkles, Coffee, Sun, Moon } from 'lucide-react';
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
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return <Coffee className="h-5 w-5" />;
      case 'lunch': return <Sun className="h-5 w-5" />;
      case 'dinner': return <Moon className="h-5 w-5" />;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-white/20">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-br ${getMealGradient(meal.type)} rounded-xl text-white shadow-lg`}>
              {getMealIcon(meal.type)}
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold text-slate-800 mb-2">
                {meal.name}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize bg-white/60">
                  {meal.type}
                </Badge>
                <Badge className={getDifficultyColor(meal.recipe.difficulty)}>
                  {meal.recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Recipe Overview */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200">
            <p className="text-slate-700 text-lg leading-relaxed mb-6">{meal.recipe.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Prep Time</div>
                  <div className="font-bold text-slate-800">{meal.recipe.prepTime} min</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ChefHat className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Cook Time</div>
                  <div className="font-bold text-slate-800">{meal.recipe.cookTime} min</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Servings</div>
                  <div className="font-bold text-slate-800">{meal.recipe.servings}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/80 rounded-xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Total Time</div>
                  <div className="font-bold text-slate-800">{meal.recipe.prepTime + meal.recipe.cookTime} min</div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Summary */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200">
            <h3 className="font-bold text-xl text-emerald-800 mb-4 flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              Nutrition Per Serving
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/80 rounded-xl">
                <div className="text-3xl font-bold text-slate-800 mb-1">{Math.round(meal.totalNutrition.calories)}</div>
                <div className="text-sm text-slate-600 uppercase tracking-wide">Calories</div>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-xl">
                <div className="text-3xl font-bold text-blue-700 mb-1">{Math.round(meal.totalNutrition.protein * 10) / 10}g</div>
                <div className="text-sm text-blue-600 uppercase tracking-wide">Protein</div>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-xl">
                <div className="text-3xl font-bold text-orange-700 mb-1">{Math.round(meal.totalNutrition.carbs * 10) / 10}g</div>
                <div className="text-sm text-orange-600 uppercase tracking-wide">Carbs</div>
              </div>
              <div className="text-center p-4 bg-white/80 rounded-xl">
                <div className="text-3xl font-bold text-purple-700 mb-1">{Math.round(meal.totalNutrition.fat * 10) / 10}g</div>
                <div className="text-sm text-purple-600 uppercase tracking-wide">Fat</div>
              </div>
            </div>
            {meal.recipe.nutrition_notes && (
              <div className="mt-4 p-4 bg-emerald-100/50 rounded-xl">
                <p className="text-sm text-emerald-800 italic font-medium">{meal.recipe.nutrition_notes}</p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="font-bold text-xl text-blue-800 mb-4">Ingredients</h3>
              <div className="space-y-3">
                {meal.recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-start p-3 bg-white/80 rounded-xl hover:bg-white/90 transition-colors">
                    <span className="font-medium text-slate-800">{ingredient.item}</span>
                    <div className="text-right">
                      <div className="font-bold text-blue-700">{ingredient.amount}</div>
                      {ingredient.notes && (
                        <div className="text-xs text-slate-500 italic">{ingredient.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200">
              <h3 className="font-bold text-xl text-orange-800 mb-4">Instructions</h3>
              <div className="space-y-4">
                {meal.recipe.instructions.map((instruction) => (
                  <div key={instruction.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {instruction.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-slate-800 leading-relaxed">{instruction.instruction}</p>
                      {instruction.time && (
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3 text-orange-600" />
                          <span className="text-xs text-orange-700 font-medium">{instruction.time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          {meal.recipe.tips && meal.recipe.tips.length > 0 && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
              <h3 className="font-bold text-xl text-yellow-800 mb-4 flex items-center gap-2">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                Pro Tips
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {meal.recipe.tips.map((tip, index) => (
                  <div key={index} className="flex gap-3 p-4 bg-white/80 rounded-xl">
                    <span className="text-2xl">💡</span>
                    <p className="text-sm text-yellow-800 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;