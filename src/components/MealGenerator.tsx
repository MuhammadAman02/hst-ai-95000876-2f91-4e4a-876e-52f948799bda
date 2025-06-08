import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wand2, Plus, Coffee, Sun, Moon, BookOpen } from 'lucide-react';
import { MacroTargets, Meal } from '@/pages/Index';
import RecipeModal from './RecipeModal';

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
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

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
        totalNutrition: { calories: 547, protein: 36.5, carbs: 67, fat: 15.3 },
        recipe: {
          description: "A hearty, protein-packed breakfast bowl that combines creamy oats with vanilla protein powder, fresh banana, and crunchy almonds. Perfect for fueling your morning workout or starting your day with sustained energy.",
          prepTime: 5,
          cookTime: 10,
          servings: 1,
          difficulty: 'Easy' as const,
          ingredients: [
            { item: "Rolled oats", amount: "60g", notes: "old-fashioned work best" },
            { item: "Vanilla protein powder", amount: "30g (1 scoop)", notes: "whey or plant-based" },
            { item: "Ripe banana", amount: "1 medium (100g)", notes: "sliced" },
            { item: "Raw almonds", amount: "20g", notes: "roughly chopped" },
            { item: "Water or milk", amount: "200ml", notes: "adjust for desired consistency" },
            { item: "Cinnamon", amount: "1/2 tsp", notes: "optional" },
            { item: "Honey", amount: "1 tsp", notes: "optional, for sweetness" }
          ],
          instructions: [
            { step: 1, instruction: "In a medium saucepan, bring water or milk to a gentle boil.", time: "2-3 minutes" },
            { step: 2, instruction: "Add oats and reduce heat to medium-low. Cook, stirring occasionally, until creamy.", time: "5-7 minutes" },
            { step: 3, instruction: "Remove from heat and let cool for 1 minute. Stir in protein powder until well combined." },
            { step: 4, instruction: "Transfer to a bowl and top with sliced banana and chopped almonds." },
            { step: 5, instruction: "Sprinkle with cinnamon and drizzle with honey if desired. Serve immediately." }
          ],
          tips: [
            "Mix protein powder when oats are slightly cooled to prevent clumping",
            "Prepare overnight oats version by mixing all ingredients cold and refrigerating",
            "Add berries or other fruits for extra antioxidants and flavor variety"
          ],
          nutrition_notes: "High in complete protein and complex carbohydrates for sustained energy. Rich in fiber and healthy fats."
        }
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
        totalNutrition: { calories: 413, protein: 25, carbs: 67, fat: 6.3 },
        recipe: {
          description: "A refreshing and protein-rich parfait layered with creamy Greek yogurt, crunchy granola, and antioxidant-packed berries. This no-cook breakfast is perfect for busy mornings.",
          prepTime: 5,
          cookTime: 0,
          servings: 1,
          difficulty: 'Easy' as const,
          ingredients: [
            { item: "Plain Greek yogurt", amount: "200g", notes: "0% fat, high protein" },
            { item: "Granola", amount: "40g", notes: "low sugar variety preferred" },
            { item: "Mixed berries", amount: "100g", notes: "blueberries, strawberries, raspberries" },
            { item: "Raw honey", amount: "15g (1 tbsp)", notes: "or maple syrup" },
            { item: "Vanilla extract", amount: "1/4 tsp", notes: "optional" },
            { item: "Chia seeds", amount: "1 tsp", notes: "optional, for extra nutrition" }
          ],
          instructions: [
            { step: 1, instruction: "If using vanilla extract, mix it into the Greek yogurt until well combined." },
            { step: 2, instruction: "In a glass or bowl, add 1/3 of the yogurt as the first layer." },
            { step: 3, instruction: "Add half of the berries over the yogurt layer." },
            { step: 4, instruction: "Sprinkle half of the granola over the berries." },
            { step: 5, instruction: "Repeat layers: remaining yogurt, remaining berries, remaining granola." },
            { step: 6, instruction: "Drizzle honey on top and sprinkle with chia seeds if using. Serve immediately." }
          ],
          tips: [
            "Prepare the night before for a grab-and-go breakfast",
            "Keep granola separate until serving to maintain crunchiness",
            "Use frozen berries that have been thawed for a more syrupy texture"
          ],
          nutrition_notes: "Excellent source of probiotics, protein, and antioxidants. Low in fat but high in nutrients."
        }
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
        totalNutrition: { calories: 450, protein: 22, carbs: 37, fat: 26 },
        recipe: {
          description: "A trendy and nutritious breakfast featuring creamy avocado spread on whole grain toast, topped with perfectly cooked eggs and fresh spinach. Rich in healthy fats and complete proteins.",
          prepTime: 5,
          cookTime: 8,
          servings: 1,
          difficulty: 'Easy' as const,
          ingredients: [
            { item: "Whole grain bread", amount: "2 slices (60g)", notes: "thick cut preferred" },
            { item: "Ripe avocado", amount: "80g (1/2 medium)", notes: "should yield to gentle pressure" },
            { item: "Large eggs", amount: "2 eggs (100g)", notes: "room temperature" },
            { item: "Fresh spinach", amount: "30g", notes: "baby spinach leaves" },
            { item: "Lemon juice", amount: "1 tsp", notes: "fresh squeezed" },
            { item: "Salt", amount: "pinch", notes: "sea salt or kosher salt" },
            { item: "Black pepper", amount: "to taste", notes: "freshly ground" },
            { item: "Red pepper flakes", amount: "pinch", notes: "optional" }
          ],
          instructions: [
            { step: 1, instruction: "Toast the bread slices until golden brown and crispy.", time: "2-3 minutes" },
            { step: 2, instruction: "While bread is toasting, mash avocado in a bowl with lemon juice, salt, and pepper." },
            { step: 3, instruction: "Heat a non-stick pan over medium heat. Cook eggs to your preference (fried, poached, or scrambled).", time: "3-5 minutes" },
            { step: 4, instruction: "Spread mashed avocado evenly on toasted bread." },
            { step: 5, instruction: "Top with fresh spinach leaves and cooked eggs." },
            { step: 6, instruction: "Season with additional salt, pepper, and red pepper flakes. Serve immediately." }
          ],
          tips: [
            "Choose avocados that are ripe but not overripe for best texture",
            "Add a splash of hot sauce or everything bagel seasoning for extra flavor",
            "For meal prep, keep avocado separate and assemble just before eating"
          ],
          nutrition_notes: "Rich in monounsaturated fats, complete proteins, and fiber. Provides sustained energy and heart-healthy nutrients."
        }
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
        totalNutrition: { calories: 523, protein: 52, carbs: 26, fat: 22 },
        recipe: {
          description: "A protein-packed salad featuring perfectly grilled chicken breast over a bed of fresh mixed greens and fluffy quinoa, finished with a simple olive oil dressing.",
          prepTime: 15,
          cookTime: 20,
          servings: 1,
          difficulty: 'Medium' as const,
          ingredients: [
            { item: "Chicken breast", amount: "150g", notes: "boneless, skinless" },
            { item: "Mixed salad greens", amount: "100g", notes: "arugula, spinach, lettuce mix" },
            { item: "Quinoa", amount: "80g cooked", notes: "about 30g dry quinoa" },
            { item: "Extra virgin olive oil", amount: "15ml (1 tbsp)", notes: "for dressing" },
            { item: "Lemon juice", amount: "1 tbsp", notes: "fresh squeezed" },
            { item: "Garlic", amount: "1 clove", notes: "minced" },
            { item: "Salt and pepper", amount: "to taste" },
            { item: "Cherry tomatoes", amount: "50g", notes: "halved, optional" },
            { item: "Cucumber", amount: "50g", notes: "diced, optional" }
          ],
          instructions: [
            { step: 1, instruction: "Cook quinoa according to package directions. Set aside to cool.", time: "15 minutes" },
            { step: 2, instruction: "Season chicken breast with salt and pepper. Let rest for 5 minutes." },
            { step: 3, instruction: "Heat grill pan or outdoor grill to medium-high heat.", time: "3-5 minutes" },
            { step: 4, instruction: "Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F.", time: "12-14 minutes" },
            { step: 5, instruction: "Let chicken rest for 5 minutes, then slice into strips." },
            { step: 6, instruction: "Whisk together olive oil, lemon juice, and minced garlic for dressing." },
            { step: 7, instruction: "Arrange mixed greens in bowl, top with quinoa, sliced chicken, and vegetables." },
            { step: 8, instruction: "Drizzle with dressing and serve immediately." }
          ],
          tips: [
            "Pound chicken to even thickness for uniform cooking",
            "Cook quinoa in chicken broth for extra flavor",
            "Marinate chicken for 30 minutes for enhanced taste"
          ],
          nutrition_notes: "Complete protein source with complex carbohydrates and healthy fats. High in fiber and essential amino acids."
        }
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
        totalNutrition: { calories: 498, protein: 33, carbs: 33, fat: 27 },
        recipe: {
          description: "An Asian-inspired bowl featuring omega-3 rich salmon, nutty brown rice, and crisp steamed broccoli, all brought together with aromatic sesame oil.",
          prepTime: 10,
          cookTime: 25,
          servings: 1,
          difficulty: 'Medium' as const,
          ingredients: [
            { item: "Salmon fillet", amount: "120g", notes: "skin-on or skinless" },
            { item: "Brown rice", amount: "100g cooked", notes: "about 40g dry rice" },
            { item: "Fresh broccoli", amount: "150g", notes: "cut into florets" },
            { item: "Sesame oil", amount: "10ml (2 tsp)", notes: "toasted sesame oil" },
            { item: "Soy sauce", amount: "1 tbsp", notes: "low sodium preferred" },
            { item: "Rice vinegar", amount: "1 tsp" },
            { item: "Fresh ginger", amount: "1 tsp", notes: "grated" },
            { item: "Sesame seeds", amount: "1 tsp", notes: "for garnish" },
            { item: "Green onions", amount: "1 stalk", notes: "sliced, for garnish" }
          ],
          instructions: [
            { step: 1, instruction: "Cook brown rice according to package directions.", time: "20-25 minutes" },
            { step: 2, instruction: "Steam broccoli florets until tender-crisp.", time: "5-7 minutes" },
            { step: 3, instruction: "Season salmon with salt and pepper." },
            { step: 4, instruction: "Heat a non-stick pan over medium-high heat. Cook salmon skin-side up for 4 minutes.", time: "4 minutes" },
            { step: 5, instruction: "Flip salmon and cook for another 3-4 minutes until flaky.", time: "3-4 minutes" },
            { step: 6, instruction: "Mix sesame oil, soy sauce, rice vinegar, and grated ginger for dressing." },
            { step: 7, instruction: "Arrange rice in bowl, top with broccoli and flaked salmon." },
            { step: 8, instruction: "Drizzle with dressing and garnish with sesame seeds and green onions." }
          ],
          tips: [
            "Don't overcook salmon - it should flake easily but still be moist",
            "Add sriracha or chili flakes for heat",
            "Substitute cauliflower rice for lower carbs"
          ],
          nutrition_notes: "Excellent source of omega-3 fatty acids, complete protein, and fiber. Anti-inflammatory and heart-healthy."
        }
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
        totalNutrition: { calories: 455, protein: 37, carbs: 48, fat: 14 },
        recipe: {
          description: "A satisfying and portable wrap filled with lean turkey, creamy hummus, and fresh vegetables. Perfect for meal prep or on-the-go lunches.",
          prepTime: 10,
          cookTime: 0,
          servings: 1,
          difficulty: 'Easy' as const,
          ingredients: [
            { item: "Large whole wheat tortilla", amount: "1 tortilla (80g)" },
            { item: "Sliced turkey breast", amount: "100g", notes: "deli meat, low sodium" },
            { item: "Hummus", amount: "30g (2 tbsp)", notes: "any flavor" },
            { item: "Lettuce leaves", amount: "30g", notes: "romaine or butter lettuce" },
            { item: "Tomato", amount: "25g", notes: "sliced" },
            { item: "Cucumber", amount: "25g", notes: "sliced" },
            { item: "Red onion", amount: "10g", notes: "thinly sliced" },
            { item: "Avocado", amount: "30g", notes: "sliced, optional" }
          ],
          instructions: [
            { step: 1, instruction: "Lay tortilla flat on a clean surface." },
            { step: 2, instruction: "Spread hummus evenly across the center of the tortilla, leaving 2 inches on each side." },
            { step: 3, instruction: "Layer turkey slices over the hummus." },
            { step: 4, instruction: "Add lettuce leaves, tomato slices, cucumber, and red onion." },
            { step: 5, instruction: "Add avocado slices if using." },
            { step: 6, instruction: "Fold in the sides of the tortilla, then roll tightly from bottom to top." },
            { step: 7, instruction: "Cut in half diagonally and serve immediately, or wrap in foil for later." }
          ],
          tips: [
            "Pat vegetables dry to prevent soggy wrap",
            "Warm tortilla slightly for easier rolling",
            "Wrap tightly in parchment paper for meal prep"
          ],
          nutrition_notes: "High in lean protein and fiber. Provides sustained energy with balanced macronutrients."
        }
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
        totalNutrition: { calories: 547, protein: 42, carbs: 47, fat: 21 },
        recipe: {
          description: "A colorful and nutritious stir-fry featuring tender lean beef, roasted sweet potatoes, and crisp vegetables, all cooked in aromatic coconut oil.",
          prepTime: 15,
          cookTime: 20,
          servings: 1,
          difficulty: 'Medium' as const,
          ingredients: [
            { item: "Lean beef sirloin", amount: "150g", notes: "cut into thin strips" },
            { item: "Sweet potato", amount: "200g", notes: "cubed" },
            { item: "Bell peppers", amount: "75g", notes: "mixed colors, sliced" },
            { item: "Snap peas", amount: "75g", notes: "trimmed" },
            { item: "Coconut oil", amount: "10ml (2 tsp)", notes: "virgin coconut oil" },
            { item: "Garlic", amount: "2 cloves", notes: "minced" },
            { item: "Fresh ginger", amount: "1 tsp", notes: "grated" },
            { item: "Soy sauce", amount: "2 tbsp", notes: "low sodium" },
            { item: "Sesame oil", amount: "1 tsp", notes: "for finishing" }
          ],
          instructions: [
            { step: 1, instruction: "Preheat oven to 425°F. Toss cubed sweet potato with half the coconut oil and roast.", time: "20 minutes" },
            { step: 2, instruction: "While sweet potato roasts, slice beef into thin strips against the grain." },
            { step: 3, instruction: "Heat remaining coconut oil in a large wok or skillet over high heat.", time: "2 minutes" },
            { step: 4, instruction: "Add beef strips and stir-fry until browned but still tender.", time: "3-4 minutes" },
            { step: 5, instruction: "Add garlic and ginger, stir-fry for 30 seconds until fragrant." },
            { step: 6, instruction: "Add bell peppers and snap peas, stir-fry until crisp-tender.", time: "2-3 minutes" },
            { step: 7, instruction: "Add roasted sweet potato and soy sauce, toss to combine.", time: "1 minute" },
            { step: 8, instruction: "Drizzle with sesame oil and serve immediately over rice if desired." }
          ],
          tips: [
            "Cut beef against the grain for maximum tenderness",
            "Keep heat high for proper stir-fry technique",
            "Have all ingredients prepped before starting to cook"
          ],
          nutrition_notes: "High in complete protein, complex carbohydrates, and beta-carotene. Rich in iron and vitamin A."
        }
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
        totalNutrition: { calories: 476, protein: 43, carbs: 39, fat: 16 },
        recipe: {
          description: "A light yet satisfying dinner featuring flaky baked cod served alongside fluffy quinoa and tender asparagus spears, finished with a touch of butter.",
          prepTime: 10,
          cookTime: 25,
          servings: 1,
          difficulty: 'Easy' as const,
          ingredients: [
            { item: "Cod fillet", amount: "180g", notes: "fresh or thawed" },
            { item: "Quinoa", amount: "120g cooked", notes: "about 45g dry quinoa" },
            { item: "Fresh asparagus", amount: "150g", notes: "trimmed" },
            { item: "Butter", amount: "15g (1 tbsp)", notes: "unsalted" },
            { item: "Lemon", amount: "1/2 lemon", notes: "juiced and zested" },
            { item: "Olive oil", amount: "1 tsp" },
            { item: "Fresh dill", amount: "1 tbsp", notes: "chopped" },
            { item: "Salt and pepper", amount: "to taste" },
            { item: "Garlic powder", amount: "1/2 tsp" }
          ],
          instructions: [
            { step: 1, instruction: "Preheat oven to 400°F. Cook quinoa according to package directions.", time: "15 minutes" },
            { step: 2, instruction: "Pat cod fillet dry and season with salt, pepper, and garlic powder." },
            { step: 3, instruction: "Place cod on a baking sheet lined with parchment paper." },
            { step: 4, instruction: "Toss asparagus with olive oil, salt, and pepper. Add to baking sheet.", time: "2 minutes" },
            { step: 5, instruction: "Bake cod and asparagus together.", time: "12-15 minutes" },
            { step: 6, instruction: "Check cod is flaky and asparagus is tender-crisp." },
            { step: 7, instruction: "Melt butter and mix with lemon juice, zest, and fresh dill." },
            { step: 8, instruction: "Serve cod over quinoa with asparagus, drizzled with lemon butter sauce." }
          ],
          tips: [
            "Don't overcook cod - it should flake easily when done",
            "Choose asparagus spears of similar thickness for even cooking",
            "Add capers to the lemon butter for extra flavor"
          ],
          nutrition_notes: "Excellent source of lean protein and omega-3 fatty acids. High in fiber and essential amino acids."
        }
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
        totalNutrition: { calories: 675, protein: 46, carbs: 65, fat: 27 },
        recipe: {
          description: "A comforting Italian-inspired dish featuring juicy chicken thighs served over whole wheat pasta with rich tomato sauce and freshly grated Parmesan cheese.",
          prepTime: 15,
          cookTime: 30,
          servings: 1,
          difficulty: 'Medium' as const,
          ingredients: [
            { item: "Chicken thigh", amount: "140g", notes: "boneless, skinless" },
            { item: "Whole wheat pasta", amount: "80g dry", notes: "penne or fusilli" },
            { item: "Marinara sauce", amount: "100g", notes: "low sodium" },
            { item: "Parmesan cheese", amount: "20g", notes: "freshly grated" },
            { item: "Olive oil", amount: "1 tbsp" },
            { item: "Garlic", amount: "2 cloves", notes: "minced" },
            { item: "Italian seasoning", amount: "1 tsp" },
            { item: "Fresh basil", amount: "2 tbsp", notes: "chopped" },
            { item: "Salt and pepper", amount: "to taste" }
          ],
          instructions: [
            { step: 1, instruction: "Bring a large pot of salted water to boil for pasta." },
            { step: 2, instruction: "Season chicken thigh with salt, pepper, and Italian seasoning." },
            { step: 3, instruction: "Heat olive oil in a large skillet over medium-high heat.", time: "2 minutes" },
            { step: 4, instruction: "Cook chicken thigh until golden brown and cooked through.", time: "6-8 minutes per side" },
            { step: 5, instruction: "Remove chicken and let rest, then slice into strips." },
            { step: 6, instruction: "Cook pasta according to package directions until al dente.", time: "8-10 minutes" },
            { step: 7, instruction: "In the same skillet, sauté garlic for 30 seconds, add marinara sauce.", time: "3-4 minutes" },
            { step: 8, instruction: "Drain pasta and toss with sauce. Top with sliced chicken, Parmesan, and fresh basil." }
          ],
          tips: [
            "Let chicken rest before slicing to retain juices",
            "Reserve pasta water to thin sauce if needed",
            "Use freshly grated Parmesan for best flavor"
          ],
          nutrition_notes: "Balanced meal with complete protein, complex carbohydrates, and calcium. Higher in calories for active individuals."
        }
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

  const handleViewRecipe = (meal: Meal) => {
    console.log('Opening recipe for:', meal.name);
    setSelectedRecipe(meal);
    setIsRecipeModalOpen(true);
  };

  return (
    <>
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
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="capitalize">
                                {meal.type}
                              </Badge>
                              <Badge variant="outline" className={
                                meal.recipe.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                                meal.recipe.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-red-50 text-red-700'
                              }>
                                {meal.recipe.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewRecipe(meal)}
                            >
                              <BookOpen className="h-3 w-3 mr-1" />
                              Recipe
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => onAddMeal(meal)}
                              className="bg-health-600 hover:bg-health-700"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add to Plan
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                            <span>{meal.totalNutrition.calories} cal</span>
                            <span>{meal.totalNutrition.protein}g protein</span>
                            <span>{meal.totalNutrition.carbs}g carbs</span>
                            <span>{meal.totalNutrition.fat}g fat</span>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            <strong>Prep:</strong> {meal.recipe.prepTime}min • <strong>Cook:</strong> {meal.recipe.cookTime}min • <strong>Serves:</strong> {meal.recipe.servings}
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {meal.recipe.description}
                          </p>
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

      <RecipeModal
        meal={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
      />
    </>
  );
};

export default MealGenerator;