'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, ChefHat, Calendar as CalendarIcon, ChevronRight, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MealCard } from '@/components/ui/meal-card';
import { BottomNav } from '@/components/ui/bottom-nav';

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

const MEAL_GRADIENTS = {
	breakfast: "bg-gradient-to-br from-orange-100 to-amber-100",
	lunch: "bg-gradient-to-br from-emerald-100 to-teal-100",
	dinner: "bg-gradient-to-br from-indigo-100 to-violet-100",
};

export default function Home() {
	const [currentPlan, setCurrentPlan] = useState<MenuDay | null>(null);
	const [loading, setLoading] = useState(false);
	const [generating, setGenerating] = useState(false);
	const [swapping, setSwapping] = useState<string | null>(null);

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
		setSwapping(mealTime);
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
			setSwapping(null);
		}
	};

	useEffect(() => {
		fetchCurrentPlan();
	}, []);

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			day: 'numeric',
			month: 'short',
		});
	};

	return (
		<div className="min-h-screen bg-stone-50 pb-24 font-sans">
			{/* Mobile Header */}
			<header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
				<div className="flex justify-between items-center">
					<div>
						<p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Good Morning</p>
						<h1 className="text-2xl font-display font-bold text-stone-800">
							User
						</h1>
					</div>
					<div className="h-10 w-10 bg-stone-100 rounded-full flex items-center justify-center border border-stone-200">
						<UserCircle className="h-6 w-6 text-stone-600" />
					</div>
				</div>

				{/* Date Selector (Simulated Week View) */}
				{currentPlan && (
					<div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar pb-2">
						{[...Array(5)].map((_, i) => {
							const d = new Date(currentPlan.date);
							d.setDate(d.getDate() + i);
							const isToday = i === 0;
							return (
								<div
									key={i}
									className={`flex flex-col items-center justify-center min-w-[60px] h-[72px] rounded-2xl border transition-all cursor-pointer ${isToday
											? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200"
											: "bg-white border-stone-200 text-stone-400 hover:border-emerald-200"
										}`}
								>
									<span className="text-[10px] font-bold uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
									<span className="text-xl font-bold font-display">{d.getDate()}</span>
								</div>
							);
						})}
					</div>
				)}
			</header>

			<main className="container mx-auto px-6 py-6 space-y-8">
				{currentPlan ? (
					<>
						{/* Context Header */}
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-display font-bold text-stone-800">Today's Plan</h2>
							<Button variant="ghost" size="sm" className="text-emerald-600 font-semibold text-xs hover:bg-emerald-50">
								Full Schedule <ChevronRight className="h-4 w-4 ml-1" />
							</Button>
						</div>

						{/* Meal Cards */}
						<div className="space-y-6">
							<MealCard
								title="Breakfast"
								mealTime="breakfast"
								emoji="☕"
								primaryDish={currentPlan.breakfast.primary ? {
									name: currentPlan.breakfast.primary.name,
									mealClass: currentPlan.breakfast.primary.mealClass,
									calories: 450, // Placeholder as API might not return consistent cals yet
									prepTime: currentPlan.breakfast.primary.preparationTimeMin,
									imageGradient: MEAL_GRADIENTS.breakfast
								} : null}
								onSwap={() => swapMeal('breakfast')}
								isLoading={swapping === 'breakfast'}
							/>

							<MealCard
								title="Lunch"
								mealTime="lunch"
								emoji="🍲"
								primaryDish={currentPlan.lunch.primary ? {
									name: currentPlan.lunch.primary.name,
									mealClass: currentPlan.lunch.primary.mealClass,
									calories: 650,
									prepTime: currentPlan.lunch.primary.preparationTimeMin,
									imageGradient: MEAL_GRADIENTS.lunch
								} : null}
								secondaryDish={currentPlan.lunch.secondary ? {
									name: currentPlan.lunch.secondary.name,
									mealClass: currentPlan.lunch.secondary.mealClass,
									calories: 150
								} : null}
								onSwap={() => swapMeal('lunch')}
								isLoading={swapping === 'lunch'}
							/>

							<MealCard
								title="Dinner"
								mealTime="dinner"
								emoji="🌙"
								primaryDish={currentPlan.dinner.primary ? {
									name: currentPlan.dinner.primary.name,
									mealClass: currentPlan.dinner.primary.mealClass,
									calories: 550,
									prepTime: currentPlan.dinner.primary.preparationTimeMin,
									imageGradient: MEAL_GRADIENTS.dinner
								} : null}
								secondaryDish={currentPlan.dinner.secondary ? {
									name: currentPlan.dinner.secondary.name,
									mealClass: currentPlan.dinner.secondary.mealClass,
									calories: 100
								} : null}
								onSwap={() => swapMeal('dinner')}
								isLoading={swapping === 'dinner'}
							/>
						</div>

						{/* Nutrition Summary (Mock) */}
						<div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm mt-8">
							<div className="flex justify-between items-center mb-4">
								<h3 className="font-display font-bold text-stone-800">Daily Nutrition</h3>
								<span className="text-xs font-bold text-stone-400 uppercase">Target: 2000</span>
							</div>
							<div className="flex gap-1 h-3 rounded-full overflow-hidden bg-stone-100">
								<div className="w-[30%] bg-emerald-500" />
								<div className="w-[45%] bg-orange-400" />
								<div className="w-[20%] bg-indigo-500" />
							</div>
							<div className="flex justify-between mt-3 text-xs text-stone-500 font-medium">
								<div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Protein</div>
								<div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400" /> Carbs</div>
								<div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Fats</div>
							</div>
						</div>
					</>
				) : (
					/* Empty State */
					<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
						<div className="mb-8 relative">
							<div className="absolute inset-0 bg-emerald-200/50 rounded-full blur-2xl animate-pulse" />
							<div className="relative h-40 w-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
								<ChefHat className="h-20 w-20 text-emerald-600" />
							</div>
						</div>

						<h2 className="text-3xl font-display font-bold text-stone-900 mb-3">
							No Plan Yet?
						</h2>
						<p className="text-stone-500 mb-10 max-w-xs leading-relaxed">
							Let's create your personalized Nigerian meal plan using AI magic.
						</p>

						<Button
							onClick={generateWeeklyPlan}
							disabled={generating}
							size="lg"
							className="w-full max-w-xs h-14 rounded-2xl text-lg font-bold shadow-xl shadow-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
						>
							{generating ? (
								<>
									<RefreshCw className="h-5 w-5 animate-spin mr-2" />
									Generating...
								</>
							) : (
								<>
									<Sparkles className="h-5 w-5 mr-2" />
									Generate My Plan
								</>
							)}
						</Button>
					</div>
				)}
			</main>

			<BottomNav />
		</div>
	);
}
