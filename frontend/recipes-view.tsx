"use client";

import { Search, ChefHat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function RecipesView() {
	const recipes = [
		{ name: "Jollof Rice", category: "Rice", time: "60 min", cals: 450 },
		{ name: "Pounded Yam & Egusi", category: "Swallow", time: "45 min", cals: 700 },
		{ name: "Fried Rice", category: "Rice", time: "45 min", cals: 500 },
		{ name: "Efo Riro", category: "Soup", time: "40 min", cals: 350 },
		{ name: "Moi Moi", category: "Bean", time: "60 min", cals: 300 },
		{ name: "Akara", category: "Bean", time: "30 min", cals: 250 },
	];

	return (
		<div className="space-y-6">
			<div className="sticky top-0 bg-stone-50 pt-2 pb-2 z-10">
				<h2 className="text-2xl font-display font-bold text-stone-800 mb-4">Recipes</h2>
				<div className="relative">
					<Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
					<Input
						placeholder="Search dishes..."
						className="pl-9 bg-white border-stone-200 rounded-xl"
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{recipes.map((recipe, i) => (
					<Card key={i} className="border-none shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden cursor-pointer group">
						<div className="h-24 bg-stone-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
							<ChefHat className="h-8 w-8 text-stone-300 group-hover:text-emerald-200" />
						</div>
						<CardContent className="p-3">
							<h3 className="font-bold text-stone-800 text-sm truncate">{recipe.name}</h3>
							<p className="text-xs text-stone-500 mb-2">{recipe.category}</p>
							<div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
								<span>{recipe.time}</span>
								<span>{recipe.cals} kcal</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
