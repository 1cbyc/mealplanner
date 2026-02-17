"use client";

import { useState } from "react";
import { ChevronLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/ui/meal-card";
import { NIGERIAN_FOODS, FoodItem } from "@/data/nigerian-foods";

// Mock data generator for the schedule
const generateMockDayPlan = (dayOffset: number) => {
	const getRandomFood = (category: string) => {
		const foods = NIGERIAN_FOODS.filter(f => f.category === category || (category === 'Swallow' && f.category === 'Soup'));
		return foods[Math.floor(Math.random() * foods.length)];
	}

	return {
		breakfast: getRandomFood('Bean') || getRandomFood('Tuber'),
		lunch: getRandomFood('Rice') || getRandomFood('Swallow'),
		dinner: getRandomFood('Swallow') || getRandomFood('Soup'),
	};
};

export function ScheduleView({ onBack }: { onBack: () => void }) {
	const [selectedDay, setSelectedDay] = useState(0);
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const todayIndex = new Date().getDay();

	// Reorder days to start from Today
	const orderedDays = [...days.slice(todayIndex), ...days.slice(0, todayIndex)];

	const plan = generateMockDayPlan(selectedDay);

	const MEAL_GRADIENTS = {
		breakfast: "from-amber-50 to-orange-50",
		lunch: "from-emerald-50 to-teal-50",
		dinner: "from-indigo-50 to-blue-50"
	};

	return (
		<div className="space-y-6 pb-20">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
					<ChevronLeft className="h-6 w-6 text-stone-600" />
				</Button>
				<h2 className="text-2xl font-display font-bold text-stone-800">Weekly Schedule</h2>
			</div>

			{/* Date Selector */}
			<div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
				{orderedDays.map((day, i) => {
					const isSelected = i === selectedDay;
					return (
						<div
							key={i}
							onClick={() => setSelectedDay(i)}
							className={`flex flex-col items-center justify-center min-w-[64px] h-[80px] rounded-2xl border transition-all cursor-pointer ${isSelected
									? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105"
									: "bg-white border-stone-200 text-stone-400 hover:border-emerald-200"
								}`}
						>
							<span className="text-xs font-bold uppercase mb-1">{day}</span>
							<span className="text-xl font-bold font-display">{new Date().getDate() + i}</span>
						</div>
					);
				})}
			</div>

			{/* Daily Plan */}
			<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
					<Calendar className="h-4 w-4" />
					<span>Plan for {orderedDays[selectedDay]}</span>
				</div>

				<MealCard
					title="Breakfast"
					mealTime="breakfast"
					emoji="☕"
					primaryDish={{
						name: plan.breakfast.name,
						mealClass: plan.breakfast.category,
						calories: plan.breakfast.calories,
						prepTime: plan.breakfast.prepTime,
						imageGradient: MEAL_GRADIENTS.breakfast
					}}
					onSwap={() => { }}
				/>

				<MealCard
					title="Lunch"
					mealTime="lunch"
					emoji="🍲"
					primaryDish={{
						name: plan.lunch.name,
						mealClass: plan.lunch.category,
						calories: plan.lunch.calories,
						prepTime: plan.lunch.prepTime,
						imageGradient: MEAL_GRADIENTS.lunch
					}}
					onSwap={() => { }}
				/>

				<MealCard
					title="Dinner"
					mealTime="dinner"
					emoji="🌙"
					primaryDish={{
						name: plan.dinner.name,
						mealClass: plan.dinner.category,
						calories: plan.dinner.calories,
						prepTime: plan.dinner.prepTime,
						imageGradient: MEAL_GRADIENTS.dinner
					}}
					onSwap={() => { }}
				/>
			</div>
		</div>
	);
}
