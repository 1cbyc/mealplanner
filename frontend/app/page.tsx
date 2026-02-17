'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, Sparkles, ChefHat, Calendar as CalendarIcon, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MealCard } from '@/components/ui/meal-card';
import { BottomNav } from '@/components/ui/bottom-nav';
import { RecipesView } from '@/components/ui/views/recipes-view';
import { ShopView } from '@/components/ui/views/shop-view';
import { ProfileView } from '@/components/ui/views/profile-view';
import { ScheduleView } from '@/components/ui/views/schedule-view';
import { HistoryView } from '@/components/ui/views/history-view';
import { AuthProvider, useAuth } from '@/components/auth-context';

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

// Force relative path for production to avoid localhost issues
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';


const MEAL_GRADIENTS = {
	breakfast: "bg-gradient-to-br from-orange-100 to-amber-100",
	lunch: "bg-gradient-to-br from-emerald-100 to-teal-100",
	dinner: "bg-gradient-to-br from-indigo-100 to-violet-100",
};

import { DataProvider, useData } from '@/components/data-provider';

export default function Home() {
	return (
		<AuthProvider>
			<DataProvider>
				<ProtectedHome />
			</DataProvider>
		</AuthProvider>
	);
}

function ProtectedHome() {
	const { user, isLoading, logout } = useAuth();
	const { currentPlan, generatePlan, swapMeal } = useData();
	const router = useRouter();
	const [currentView, setCurrentView] = useState('home');
	const [generating, setGenerating] = useState(false);
	const [swapping, setSwapping] = useState<string | null>(null);

	useEffect(() => {
		if (!isLoading && !user) {
			router.push('/login');
		}
	}, [isLoading, user, router]);

	// Handle Generation Animation
	const handleGenerate = async () => {
		setGenerating(true);
		// Simulate API/Thought delay
		await new Promise(resolve => setTimeout(resolve, 2000));
		generatePlan();
		setGenerating(false);
	};

	// Get Today's Plan (assume index 0 for now, or find by date)
	const todaysPlan = currentPlan.length > 0 ? currentPlan[0] : null;

	if (isLoading || !user) {
		return null; // Or a loading spinner
	}

	return (
		<div className="min-h-screen bg-stone-50 pb-24 font-sans">
			{/* Mobile Header - Show only on Home view or different headers for others */}
			{currentView === 'home' && (
				<header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
					<div className="flex justify-between items-center">
						<div>
							<p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Good Morning</p>
							<h1 className="text-2xl font-display font-bold text-stone-800">
								{user.name}
							</h1>
						</div>
						<div className="flex items-center gap-3">
							{/* Refresh / Shuffle Button */}
							<div
								className="h-10 w-10 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100 cursor-pointer hover:bg-orange-100 hover:text-orange-600 transition-colors"
								onClick={handleGenerate}
								title="Shuffle Plan"
							>
								<RefreshCw className={`h-5 w-5 text-orange-400 ${generating ? 'animate-spin' : ''}`} />
							</div>

							{/* Profile Button */}
							<div
								className="h-10 w-10 bg-stone-100 rounded-full flex items-center justify-center border border-stone-200 cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-500 transition-colors"
								onClick={() => setCurrentView('profile')}
								title="View Profile"
							>
								<User className="h-5 w-5" />
							</div>
						</div>
					</div>

					{/* Date Selector (Simulated Week View) */}
					{todaysPlan && (
						<div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar pb-2">
							{currentPlan.slice(0, 5).map((day, i) => {
								const d = new Date(day.date);
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
			)}

			<main className="container mx-auto px-6 py-6 space-y-8">
				{currentView === 'home' && (
					<>
						{todaysPlan ? (
							<>
								{/* Context Header */}
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-display font-bold text-stone-800">Today's Plan</h2>
									<Button
										variant="ghost"
										size="sm"
										className="text-emerald-600 font-semibold text-xs hover:bg-emerald-50"
										onClick={() => setCurrentView('schedule')}
									>
										Full Schedule <ChevronRight className="h-4 w-4 ml-1" />
									</Button>
								</div>

								{/* Meal Cards */}
								<div className="space-y-6">
									<MealCard
										title="Breakfast"
										mealTime="breakfast"
										emoji="☕"
										primaryDish={todaysPlan.breakfast ? {
											name: todaysPlan.breakfast.name,
											mealClass: todaysPlan.breakfast.category,
											calories: todaysPlan.breakfast.calories,
											prepTime: todaysPlan.breakfast.prepTime,
											imageGradient: MEAL_GRADIENTS.breakfast
										} : null}
										onSwap={() => swapMeal(todaysPlan.date, 'breakfast')}
										isLoading={swapping === 'breakfast'}
									/>

									<MealCard
										title="Lunch"
										mealTime="lunch"
										emoji="🍲"
										primaryDish={todaysPlan.lunch ? {
											name: todaysPlan.lunch.name,
											mealClass: todaysPlan.lunch.category,
											calories: todaysPlan.lunch.calories,
											prepTime: todaysPlan.lunch.prepTime,
											imageGradient: MEAL_GRADIENTS.lunch
										} : null}
										onSwap={() => swapMeal(todaysPlan.date, 'lunch')}
										isLoading={swapping === 'lunch'}
									/>

									<MealCard
										title="Dinner"
										mealTime="dinner"
										emoji="🌙"
										primaryDish={todaysPlan.dinner ? {
											name: todaysPlan.dinner.name,
											mealClass: todaysPlan.dinner.category,
											calories: todaysPlan.dinner.calories,
											prepTime: todaysPlan.dinner.prepTime,
											imageGradient: MEAL_GRADIENTS.dinner
										} : null}
										onSwap={() => swapMeal(todaysPlan.date, 'dinner')}
										isLoading={swapping === 'dinner'}
									/>
								</div>

								{/* Nutrition Summary (Real) */}
								<div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm mt-8">
									{(() => {
										const meals = [todaysPlan.breakfast, todaysPlan.lunch, todaysPlan.dinner];
										const totalCals = meals.reduce((acc, m) => acc + (m?.calories || 0), 0);
										const totalProtein = meals.reduce((acc, m) => acc + (m?.protein || 0), 0);
										const totalCarbs = meals.reduce((acc, m) => acc + (m?.carbs || 0), 0);
										const totalFat = meals.reduce((acc, m) => acc + (m?.fat || 0), 0);

										// Targets (Approximate for active adult)
										const targetCals = 2000;
										const targetProtein = 150; // g
										const targetCarbs = 250; // g
										const targetFat = 70; // g

										const pct = (val: number, target: number) => Math.min((val / target) * 100, 100);

										return (
											<>
												<div className="flex justify-between items-center mb-4">
													<h3 className="font-display font-bold text-stone-800">Daily Nutrition</h3>
													<span className="text-xs font-bold text-stone-400 uppercase">Target: {targetCals} kcal</span>
												</div>

												{/* Visual Bar for Calories */}
												<div className="mb-2 flex justify-between text-xs font-bold text-stone-500">
													<span>Calories</span>
													<span>{totalCals}</span>
												</div>
												<div className="h-3 rounded-full bg-stone-100 overflow-hidden mb-6">
													<div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${pct(totalCals, targetCals)}%` }} />
												</div>

												{/* Macros */}
												<div className="grid grid-cols-3 gap-4">
													<div>
														<div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
															<div className="w-2 h-2 rounded-full bg-blue-500" /> Protein
														</div>
														<div className="h-1.5 rounded-full bg-stone-100 mb-1">
															<div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct(totalProtein, targetProtein)}%` }} />
														</div>
														<span className="text-xs font-bold text-stone-700">{totalProtein}g</span>
													</div>
													<div>
														<div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
															<div className="w-2 h-2 rounded-full bg-orange-400" /> Carbs
														</div>
														<div className="h-1.5 rounded-full bg-stone-100 mb-1">
															<div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct(totalCarbs, targetCarbs)}%` }} />
														</div>
														<span className="text-xs font-bold text-stone-700">{totalCarbs}g</span>
													</div>
													<div>
														<div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
															<div className="w-2 h-2 rounded-full bg-indigo-500" /> Fat
														</div>
														<div className="h-1.5 rounded-full bg-stone-100 mb-1">
															<div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct(totalFat, targetFat)}%` }} />
														</div>
														<span className="text-xs font-bold text-stone-700">{totalFat}g</span>
													</div>
												</div>
											</>
										);
									})()}
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
									onClick={handleGenerate}
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
					</>
				)}

				{currentView === 'recipes' && <RecipesView />}
				{currentView === 'shop' && <ShopView />}
				{currentView === 'profile' && <ProfileView onNavigate={setCurrentView} />}
				{currentView === 'schedule' && <ScheduleView onBack={() => setCurrentView('home')} />}
				{currentView === 'history' && <HistoryView onBack={() => setCurrentView('home')} />}
			</main>

			<BottomNav activeTab={currentView} onTabChange={setCurrentView} />
		</div>
	);
}
