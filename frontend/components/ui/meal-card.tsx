"use client";

import { RefreshCw, Flame, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface MealCardProps {
	title: string;
	mealTime: "breakfast" | "lunch" | "dinner";
	emoji: string;
	primaryDish: {
		name: string;
		mealClass: string;
		calories?: number;
		prepTime: number;
		imageGradient: string;
	} | null;
	secondaryDish?: {
		name: string;
		mealClass: string;
		calories?: number;
	} | null;
	onSwap: () => void;
	isLoading?: boolean;
}

export function MealCard({
	title,
	emoji,
	primaryDish,
	secondaryDish,
	onSwap,
	isLoading,
}: MealCardProps) {
	return (
		<div className="relative group">
			<div className="absolute inset-0 bg-emerald-100/50 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2" />
			<Card className="relative overflow-hidden border-none shadow-sm group-hover:shadow-md transition-all duration-300 rounded-3xl bg-white">
				{/* Header Image Area */}
				<div className={`h-32 w-full relative ${primaryDish?.imageGradient || "bg-stone-100"}`}>
					<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-700 shadow-sm flex items-center gap-1">
						<span>{emoji}</span> {title}
					</div>
					<Button
						size="icon"
						variant="ghost"
						className="absolute top-3 right-3 bg-white/50 hover:bg-white text-stone-600 rounded-full h-8 w-8 backdrop-blur-md"
						onClick={onSwap}
						disabled={isLoading}
					>
						<RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
					</Button>
				</div>

				<CardContent className="pt-4 pb-6 px-5 space-y-4">
					{primaryDish ? (
						<>
							<div>
								<div className="flex justify-between items-start mb-1">
									<h3 className="font-display font-bold text-lg text-stone-800 leading-tight">
										{primaryDish.name}
									</h3>
								</div>
								<p className="text-stone-500 text-xs uppercase tracking-wider font-medium">
									{primaryDish.mealClass.replace(/_/g, " ")}
								</p>
							</div>

							<div className="flex gap-4">
								{primaryDish.calories && (
									<div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg">
										<Flame className="h-3.5 w-3.5 fill-current" />
										<span className="text-xs font-bold">{primaryDish.calories}</span>
									</div>
								)}
								<div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
									<Clock className="h-3.5 w-3.5" />
									<span className="text-xs font-bold">{primaryDish.prepTime} min</span>
								</div>
							</div>

							{secondaryDish && (
								<div className="mt-4 pt-4 border-t border-stone-100">
									<div className="flex items-center gap-2 mb-2">
										<span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
										<span className="text-xs font-semibold text-stone-400">PAIRED WITH</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium text-stone-700">{secondaryDish.name}</span>
										{secondaryDish.calories && (
											<span className="text-xs text-stone-400">{secondaryDish.calories} kcal</span>
										)}
									</div>
								</div>
							)}
						</>
					) : (
						<div className="py-8 text-center text-stone-400">
							<p className="text-sm">Tap generate to start cooking</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
