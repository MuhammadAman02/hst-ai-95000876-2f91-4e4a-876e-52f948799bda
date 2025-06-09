import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Target, Zap, Users, Dumbbell, Heart, Trophy, ArrowRight, Sparkles } from 'lucide-react';

interface MacroTargetsProps {
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onTargetsChange: (targets: { calories: number; protein: number; carbs: number; fat: number; }) => void;
  onGenerateClick: () => void;
}

const presetTargets = [
  {
    name: "Weight Loss",
    description: "Moderate calorie deficit for sustainable fat loss",
    icon: <Heart className="h-5 w-5" />,
    targets: { calories: 1500, protein: 120, carbs: 100, fat: 60 },
    gradient: "from-red-400 to-pink-500",
    bgGradient: "from-red-50 to-pink-50"
  },
  {
    name: "Maintenance",
    description: "Balanced nutrition for current weight",
    icon: <Target className="h-5 w-5" />,
    targets: { calories: 2000, protein: 100, carbs: 150, fat: 70 },
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50"
  },
  {
    name: "Muscle Gain",
    description: "Higher protein & calories for muscle growth",
    icon: <Dumbbell className="h-5 w-5" />,
    targets: { calories: 2500, protein: 150, carbs: 200, fat: 85 },
    gradient: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50"
  },
  {
    name: "Athletic",
    description: "High performance nutrition for athletes",
    icon: <Trophy className="h-5 w-5" />,
    targets: { calories: 3000, protein: 180, carbs: 300, fat: 100 },
    gradient: "from-violet-400 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50"
  }
];

const MacroTargets: React.FC<MacroTargetsProps> = ({ targets, onTargetsChange, onGenerateClick }) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);

  console.log('MacroTargets component rendered with targets:', targets);

  const handleInputChange = (macro: keyof typeof targets, value: string) => {
    console.log('Macro input changed:', macro, value);
    const numValue = parseFloat(value) || 0;
    onTargetsChange({
      ...targets,
      [macro]: numValue
    });
    setSelectedPreset(null);
  };

  const handlePresetSelect = (preset: typeof presetTargets[0]) => {
    console.log('Preset selected:', preset);
    onTargetsChange(preset.targets);
    setSelectedPreset(preset.name);
    setIsCustomMode(false);
  };

  const isValidTargets = targets.calories > 0 && targets.protein > 0 && targets.carbs > 0 && targets.fat > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Set Your Daily Targets</h3>
        </div>
        <p className="text-slate-600">Choose a preset or customize your macro targets</p>
      </div>

      {/* Preset Options */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardContent className="p-8">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-2">Quick Presets</h4>
            <p className="text-sm text-slate-600">Choose a goal that matches your lifestyle</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {presetTargets.map((preset) => (
              <div
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
                  selectedPreset === preset.name 
                    ? `bg-gradient-to-br ${preset.bgGradient} border-2 border-current shadow-lg` 
                    : 'bg-white/60 border border-slate-200 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${preset.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {preset.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h5 className="font-bold text-slate-800 mb-1">{preset.name}</h5>
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">{preset.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/60 rounded-lg p-2">
                        <span className="font-medium text-slate-700">{preset.targets.calories}</span>
                        <span className="text-slate-500 ml-1">cal</span>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <span className="font-medium text-slate-700">{preset.targets.protein}g</span>
                        <span className="text-slate-500 ml-1">protein</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedPreset === preset.name && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom Toggle */}
          <div className="text-center mb-6">
            <Button
              variant="outline"
              onClick={() => setIsCustomMode(!isCustomMode)}
              className="bg-white/60 hover:bg-white/80 border-slate-200"
            >
              {isCustomMode ? 'Hide Custom Targets' : 'Set Custom Targets'}
            </Button>
          </div>

          {/* Custom Input */}
          {isCustomMode && (
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200 animate-fade-in">
              <h5 className="font-semibold text-slate-800 mb-4">Custom Targets</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="calories" className="text-sm font-medium text-slate-700">
                    Calories
                  </Label>
                  <div className="relative">
                    <Input
                      id="calories"
                      type="number"
                      value={targets.calories || ''}
                      onChange={(e) => handleInputChange('calories', e.target.value)}
                      placeholder="2000"
                      className="pr-12 bg-white/80 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">kcal</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="protein" className="text-sm font-medium text-slate-700">
                    Protein
                  </Label>
                  <div className="relative">
                    <Input
                      id="protein"
                      type="number"
                      value={targets.protein || ''}
                      onChange={(e) => handleInputChange('protein', e.target.value)}
                      placeholder="100"
                      className="pr-8 bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">g</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="carbs" className="text-sm font-medium text-slate-700">
                    Carbs
                  </Label>
                  <div className="relative">
                    <Input
                      id="carbs"
                      type="number"
                      value={targets.carbs || ''}
                      onChange={(e) => handleInputChange('carbs', e.target.value)}
                      placeholder="150"
                      className="pr-8 bg-white/80 border-slate-200 focus:border-orange-400 focus:ring-orange-400/20"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">g</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="fat" className="text-sm font-medium text-slate-700">
                    Fat
                  </Label>
                  <div className="relative">
                    <Input
                      id="fat"
                      type="number"
                      value={targets.fat || ''}
                      onChange={(e) => handleInputChange('fat', e.target.value)}
                      placeholder="70"
                      className="pr-8 bg-white/80 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-500">g</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current Targets Display */}
          {isValidTargets && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 animate-fade-in">
              <h5 className="font-semibold text-emerald-800 mb-3">Your Daily Targets</h5>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">{targets.calories}</div>
                  <div className="text-xs text-emerald-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">{targets.protein}g</div>
                  <div className="text-xs text-blue-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-700">{targets.carbs}g</div>
                  <div className="text-xs text-orange-600">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">{targets.fat}g</div>
                  <div className="text-xs text-purple-600">Fat</div>
                </div>
              </div>
            </div>
          )}

          {/* Generate Button */}
          {isValidTargets && (
            <div className="text-center mt-8 animate-fade-in">
              <Button
                onClick={onGenerateClick}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                Generate My Meal Plan
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <p className="text-sm text-slate-600 mt-3">
                We'll create personalized meal suggestions that match your targets
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MacroTargets;