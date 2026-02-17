"use client";

import { ChevronLeft, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock history data
const HISTORY_DATA = [
	{ date: 'Yesterday', meals: ['Akara', 'Jollof Rice', 'Semovita & Egusi'], calories: 1850 },
	{ date: 'Mon, 16 Feb', meals: ['Yam & Egg', 'Fried Rice', 'Eba & Okra'], calories: 2100 },
	{ date: 'Sun, 15 Feb', meals: ['Pancakes', 'White Rice & Stew', 'Amala & Ewedu'], calories: 2000 },
	{ date: 'Sat, 14 Feb', meals: ['Moi Moi', 'Spaghetti', 'Grilled Fish'], calories: 1750 },
];

export function HistoryView({ onBack }: { onBack: () => void }) {
	return (
		<div className="space-y-6 pb-20">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
					<ChevronLeft className="h-6 w-6 text-stone-600" />
				</Button>
				<h2 className="text-2xl font-display font-bold text-stone-800">Meal History</h2>
			</div>

			<div className="space-y-4">
				{HISTORY_DATA.map((day, i) => (
					<div key={i} className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
						<div className="flex items-center justify-between mb-3 border-b border-stone-50 pb-3">
							<div className="flex items-center gap-2 text-stone-600 font-bold">
								<CalendarDays className="h-4 w-4 text-emerald-500" />
								{day.date}
							</div>
							<span className="text-xs font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-full">
								{day.calories} kcal
							</span>
						</div>
						<div className="space-y-3">
							{day.meals.map((meal, index) => (
								<div key={index} className="flex items-center gap-3">
									<div className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-orange-400' : index === 1 ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
									<span className="text-sm text-stone-700 font-medium">{meal}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
