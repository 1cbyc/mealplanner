"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MealCard } from "@/components/ui/meal-card";
import { useData } from "@/components/data-provider";

export function ScheduleView({ onBack }: { onBack: () => void }) {
	const { currentPlan } = useData();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Helper to get plan for a specific date
	const getPlanForDate = (date: Date) => {
		return currentPlan.find(d => new Date(d.date).toDateString() === date.toDateString());
	};

	const activePlan = getPlanForDate(selectedDate);

	const MEAL_GRADIENTS = {
		breakfast: "from-amber-50 to-orange-50",
		lunch: "from-emerald-50 to-teal-50",
		dinner: "from-indigo-50 to-blue-50"
	};

	// Calendar Logic
	const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

	const changeMonth = (delta: number) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + delta);
		setCurrentDate(newDate);
	};

	const renderCalendar = () => {
		const days = [];
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		// Pad empty days
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
		}

		// Render days
		for (let d = 1; d <= daysInMonth; d++) {
			const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
			const isSelected = date.toDateString() === selectedDate.toDateString();
			const hasPlan = !!getPlanForDate(date);
			const isToday = date.toDateString() === new Date().toDateString();

			days.push(
				<div
					key={d}
					className={`relative h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-all ${isSelected ? "bg-emerald-600 text-white font-bold shadow-md" :
							isToday ? "bg-emerald-100 text-emerald-700 font-bold" : "hover:bg-stone-100 text-stone-700"
						}`}
					onClick={() => setSelectedDate(date)}
				>
					{d}
					{hasPlan && !isSelected && (
						<div className="absolute bottom-1 h-1 w-1 bg-emerald-500 rounded-full" />
					)}
				</div>
			);
		}

		return (
			<div className="bg-white rounded-3xl p-5 border border-stone-100 shadow-sm">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-display font-bold text-stone-800 text-lg">
						{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
					</h3>
					<div className="flex gap-2">
						<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => changeMonth(-1)}>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => changeMonth(1)}>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-7 gap-1 text-center mb-2">
					{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
						<span key={i} className="text-xs font-bold text-stone-400">{day}</span>
					))}
				</div>
				<div className="grid grid-cols-7 gap-y-2 gap-x-1 justify-items-center">
					{days}
				</div>
			</div>
		);
	};

	return (
		<div className="space-y-6 pb-20">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
					<ChevronLeft className="h-6 w-6 text-stone-600" />
				</Button>
				<h2 className="text-2xl font-display font-bold text-stone-800">Schedule</h2>
			</div>

			{renderCalendar()}

			{/* Daily Plan */}
			<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
					<Calendar className="h-4 w-4" />
					<span>Plan for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
				</div>

				{activePlan ? (
					<>
						<MealCard
							title="Breakfast"
							mealTime="breakfast"
							emoji="☕"
							primaryDish={activePlan.breakfast ? {
								name: activePlan.breakfast.name,
								mealClass: activePlan.breakfast.category,
								calories: activePlan.breakfast.calories,
								prepTime: activePlan.breakfast.prepTime,
								imageGradient: MEAL_GRADIENTS.breakfast
							} : null}
							onSwap={() => { }}
						/>

						<MealCard
							title="Lunch"
							mealTime="lunch"
							emoji="🍲"
							primaryDish={activePlan.lunch ? {
								name: activePlan.lunch.name,
								mealClass: activePlan.lunch.category,
								calories: activePlan.lunch.calories,
								prepTime: activePlan.lunch.prepTime,
								imageGradient: MEAL_GRADIENTS.lunch
							} : null}
							onSwap={() => { }}
						/>

						<MealCard
							title="Dinner"
							mealTime="dinner"
							emoji="🌙"
							primaryDish={activePlan.dinner ? {
								name: activePlan.dinner.name,
								mealClass: activePlan.dinner.category,
								calories: activePlan.dinner.calories,
								prepTime: activePlan.dinner.prepTime,
								imageGradient: MEAL_GRADIENTS.dinner
							} : null}
							onSwap={() => { }}
						/>
					</>
				) : (
					<div className="text-center py-10 text-stone-400 bg-stone-50 rounded-2xl border border-stone-100 border-dashed">
						<p>No meal plan for this day.</p>
						<p className="text-xs mt-2">Generate a plan from the Home screen.</p>
					</div>
				)}
			</div>
		</div>
	);
}
