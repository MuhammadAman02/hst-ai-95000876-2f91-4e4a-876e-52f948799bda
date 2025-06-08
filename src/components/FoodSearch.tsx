import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { Food, searchFoods, calculateNutrition } from '@/utils/foodDatabase';

interface FoodSearchProps {
  onAddFood: (food: Food, amount: number) => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ onAddFood }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [amount, setAmount] = useState<number>(100);

  console.log('FoodSearch component rendered');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setSearchQuery(query);
    const results = searchFoods(query);
    setSearchResults(results);
    console.log('Search results:', results);
  };

  const handleFoodSelect = (food: Food) => {
    console.log('Food selected:', food);
    setSelectedFood(food);
    setAmount(food.commonServing.amount);
  };

  const handleAddFood = () => {
    if (selectedFood && amount > 0) {
      console.log('Adding food:', selectedFood, 'amount:', amount);
      onAddFood(selectedFood, amount);
      setSelectedFood(null);
      setAmount(100);
    }
  };

  const previewNutrition = selectedFood ? calculateNutrition(selectedFood, amount) : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-700">
          <Search className="h-5 w-5" />
          Find Foods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for foods (e.g., chicken, rice, avocado)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <h4 className="text-sm font-medium text-muted-foreground">Search Results:</h4>
            {searchResults.map((food) => (
              <div
                key={food.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedFood?.id === food.id
                    ? 'border-health-500 bg-health-50'
                    : 'border-border hover:border-health-300'
                }`}
                onClick={() => handleFoodSelect(food)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{food.name}</h5>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {food.category}
                    </Badge>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{food.nutrition.calories} cal</div>
                    <div>{food.nutrition.protein}g protein</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedFood && (
          <div className="border-t pt-4 space-y-4">
            <h4 className="font-medium">Add {selectedFood.name}</h4>
            
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium">Amount (grams)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="100"
                />
              </div>
              <Button onClick={handleAddFood} className="bg-health-600 hover:bg-health-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {previewNutrition && (
              <div className="bg-muted p-3 rounded-lg">
                <h5 className="text-sm font-medium mb-2">Nutrition Preview ({amount}g):</h5>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-nutrition-calories">●</span> {previewNutrition.calories} cal
                  </div>
                  <div>
                    <span className="text-nutrition-protein">●</span> {previewNutrition.protein}g protein
                  </div>
                  <div>
                    <span className="text-nutrition-carbs">●</span> {previewNutrition.carbs}g carbs
                  </div>
                  <div>
                    <span className="text-nutrition-fat">●</span> {previewNutrition.fat}g fat
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodSearch;