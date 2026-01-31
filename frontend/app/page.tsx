'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, ChefHat, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Dish {
  id: string;
  name: string;
  mealClass: string;
  defaultCalories?: number;
  preparationTimeMin: number;
}

interface Meal {
  primary: Dish | null;
  secondary?: Dish | null;
}

interface MenuDay {
  date: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Home() {
  const [currentPlan, setCurrentPlan] = useState<MenuDay | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const fetchCurrentPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/meal-planner/current`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCurrentPlan(transformApiData(data));
        } else {
          setCurrentPlan(null);
        }
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const transformApiData = (data: any): MenuDay => {
    return {
      date: data.date,
      breakfast: {
        primary: data.breakfastDish,
        secondary: null,
      },
      lunch: {
        primary: data.lunchDish,
        secondary: data.lunchSecondaryDish,
      },
      dinner: {
        primary: data.dinnerDish,
        secondary: data.dinnerSecondaryDish,
      },
    };
  };

  const generateWeeklyPlan = async () => {
    setGenerating(true);
    try {
      const response = await fetch(`${API_URL}/meal-planner/generate`, {
        method: 'POST',
      });
      if (response.ok) {
        await fetchCurrentPlan();
      }
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  const swapMeal = async (mealTime: 'breakfast' | 'lunch' | 'dinner') => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/meal-planner/swap/${mealTime}`, {
        method: 'POST',
      });
      if (response.ok) {
        await fetchCurrentPlan();
      }
    } catch (error) {
      console.error('Error swapping meal:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderMealCard = (
    title: string,
    meal: Meal,
    mealTime: 'breakfast' | 'lunch' | 'dinner',
    emoji: string
  ) => {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{emoji}</div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {title}
                </CardTitle>
                {meal.primary && (
                  <CardDescription className="text-sm mt-1">
                    {meal.primary.preparationTimeMin} mins prep
                  </CardDescription>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => swapMeal(mealTime)}
              disabled={loading || !currentPlan}
              className="hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {meal.primary ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{meal.primary.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                      {meal.primary.mealClass.replace(/_/g, ' ')}
                    </p>
                  </div>
                  {meal.primary.defaultCalories && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">
                        {meal.primary.defaultCalories}
                      </p>
                      <p className="text-xs text-gray-500">calories</p>
                    </div>
                  )}
                </div>

                {meal.secondary && (
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <span className="text-xs text-gray-400 font-medium">PAIRED WITH</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>
                )}

                {meal.secondary && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{meal.secondary.name}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                        {meal.secondary.mealClass.replace(/_/g, ' ')}
                      </p>
                    </div>
                    {meal.secondary.defaultCalories && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">
                          {meal.secondary.defaultCalories}
                        </p>
                        <p className="text-xs text-gray-500">calories</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <ChefHat className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No meal planned yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  MealPlanner
                </h1>
                <p className="text-sm text-gray-500">Smart Nigerian Meal Planning</p>
              </div>
            </div>

            <Button
              onClick={generateWeeklyPlan}
              disabled={generating}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Weekly Plan
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPlan ? (
          <div className="space-y-6">
            {/* Date Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                <div>
                  <h2 className="text-3xl font-bold">{formatDate(currentPlan.date)}</h2>
                  <p className="text-emerald-100 mt-1">Your personalized Nigerian meal plan</p>
                </div>
              </div>
            </div>

            {/* Meal Cards Grid */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {renderMealCard('Breakfast', currentPlan.breakfast, 'breakfast', '🌅')}
              {renderMealCard('Lunch', currentPlan.lunch, 'lunch', '☀️')}
              {renderMealCard('Dinner', currentPlan.dinner, 'dinner', '🌙')}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-6 h-32 w-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
              <ChefHat className="h-16 w-16 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to MealPlanner!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Get started by generating your personalized Nigerian meal plan.
              We'll create delicious, authentic combinations just for you.
            </p>
            <Button
              onClick={generateWeeklyPlan}
              disabled={generating}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate My First Meal Plan
                </>
              )}
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>&copy; 2026 MealPlanner. Made with ❤️ for authentic Nigerian cuisine.</p>
        </div>
      </footer>
    </div>
  );
}
