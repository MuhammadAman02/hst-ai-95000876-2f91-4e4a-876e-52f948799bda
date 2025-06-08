import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target } from 'lucide-react';

interface MacroTargetsProps {
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onTargetsChange: (targets: { calories: number; protein: number; carbs: number; fat: number; }) => void;
}

const MacroTargets: React.FC<MacroTargetsProps> = ({ targets, onTargetsChange }) => {
  console.log('MacroTargets component rendered with targets:', targets);

  const handleInputChange = (macro: keyof typeof targets, value: string) => {
    console.log('Macro input changed:', macro, value);
    const numValue = parseFloat(value) || 0;
    onTargetsChange({
      ...targets,
      [macro]: numValue
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-health-700">
          <Target className="h-5 w-5" />
          Daily Macro Targets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calories" className="text-sm font-medium">
              Calories
            </Label>
            <Input
              id="calories"
              type="number"
              value={targets.calories || ''}
              onChange={(e) => handleInputChange('calories', e.target.value)}
              placeholder="2000"
              className="border-nutrition-calories/20 focus:border-nutrition-calories"
            />
            <span className="text-xs text-muted-foreground">kcal</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="protein" className="text-sm font-medium">
              Protein
            </Label>
            <Input
              id="protein"
              type="number"
              value={targets.protein || ''}
              onChange={(e) => handleInputChange('protein', e.target.value)}
              placeholder="100"
              className="border-nutrition-protein/20 focus:border-nutrition-protein"
            />
            <span className="text-xs text-muted-foreground">grams</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="carbs" className="text-sm font-medium">
              Carbs
            </Label>
            <Input
              id="carbs"
              type="number"
              value={targets.carbs || ''}
              onChange={(e) => handleInputChange('carbs', e.target.value)}
              placeholder="150"
              className="border-nutrition-carbs/20 focus:border-nutrition-carbs"
            />
            <span className="text-xs text-muted-foreground">grams</span>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fat" className="text-sm font-medium">
              Fat
            </Label>
            <Input
              id="fat"
              type="number"
              value={targets.fat || ''}
              onChange={(e) => handleInputChange('fat', e.target.value)}
              placeholder="70"
              className="border-nutrition-fat/20 focus:border-nutrition-fat"
            />
            <span className="text-xs text-muted-foreground">grams</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MacroTargets;