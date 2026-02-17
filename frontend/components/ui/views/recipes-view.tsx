"use client";

import { Search, Plus, ChefHat, Filter, Clock, Flame, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useData } from "@/components/data-provider";
import { FoodItem } from "@/data/nigerian-foods";

export function RecipesView() {
	const { allFoods, addRecipe } = useData();
	const [search, setSearch] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	// New Recipe State
	const [newName, setNewName] = useState("");
	const [newCategory, setNewCategory] = useState<FoodItem['category']>('Soup');
	const [newVeg, setNewVeg] = useState(false);
	const [newCalories, setNewCalories] = useState("");
	const [newPrep, setNewPrep] = useState("");

	const filteredFoods = allFoods.filter(food =>
		food.name.toLowerCase().includes(search.toLowerCase()) ||
		food.category.toLowerCase().includes(search.toLowerCase())
	);

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		const recipe: FoodItem = {
			id: `custom-${Date.now()}`,
			name: newName,
			category: newCategory,
			calories: parseInt(newCalories) || 400, // Default estimate
			protein: 15,
			carbs: 50,
			fat: 15,
			vegetarian: newVeg,
			prepTime: parseInt(newPrep) || 45,
			description: 'Custom recipe added by you.'
		};
		addRecipe(recipe);
		setIsAdding(false);
		// Reset
		setNewName("");
		setNewVeg(false);
		setNewCalories("");
		setNewPrep("");
	};

	return (
		<div className="space-y-6 pb-20">
			<div className="sticky top-0 bg-stone-50 pt-4 pb-2 z-10 space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-display font-bold text-stone-800">Recipes</h2>
					<Button
						size="sm"
						className={isAdding ? "bg-stone-200 text-stone-600 hover:bg-stone-300" : "bg-emerald-600 hover:bg-emerald-700"}
						onClick={() => setIsAdding(!isAdding)}
					>
						{isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4 mr-1" />}
						{isAdding ? "Cancel" : "Add New"}
					</Button>
				</div>

				{isAdding && (
					<div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-lg animate-in slide-in-from-top-2">
						<h3 className="font-bold text-stone-700 mb-3">Add Custom Recipe</h3>
						<form onSubmit={handleAdd} className="space-y-3">
							<Input
								placeholder="Recipe Name (e.g. My Special Jollof)"
								value={newName}
								onChange={e => setNewName(e.target.value)}
								required
								className="bg-stone-50 border-stone-200"
							/>

							<div className="space-y-4 pt-2">
								<div className="space-y-2">
									<label className="text-sm font-medium text-stone-700">Category</label>
									<div className="grid grid-cols-3 gap-2">
										{['Swallow', 'Soup', 'Rice', 'Breakfast', 'Snack', 'Drink', 'Other'].map(cat => (
											<div
												key={cat}
												onClick={() => setNewCategory(cat as any)}
												className={`px-3 py-2 rounded-lg text-xs font-bold text-center cursor-pointer transition-colors border ${newCategory === cat
													? 'bg-emerald-600 text-white border-emerald-600'
													: 'bg-white text-stone-500 border-stone-200 hover:border-emerald-200'
													}`}
											>
												{cat}
											</div>
										))}
									</div>
								</div>

								<div className="flex gap-2">
									<Input
										placeholder="Calories"
										type="number"
										value={newCalories}
										onChange={e => setNewCalories(e.target.value)}
										className="w-full bg-stone-50 border-stone-200"
									/>
									<Input
										placeholder="Prep Time (mins)"
										type="number"
										value={newPrep}
										onChange={e => setNewPrep(e.target.value)}
										className="w-full bg-stone-50 border-stone-200"
									/>
								</div>

								<div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-100">
									<span className="text-sm font-medium text-stone-700">Vegetarian?</span>
									<Switch checked={newVeg} onCheckedChange={setNewVeg} />
								</div>
							</div>

							<div className="mt-8 flex gap-3">
								<Button
									variant="ghost"
									className="flex-1 text-stone-500"
									onClick={() => setIsAdding(false)}
									type="button"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
									disabled={!newName}
								>
									Save Recipe
								</Button>
							</div>
						</form>
					</div>
				)}

				<div className="relative">
					<Search className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
					<Input
						placeholder="Search for amala, egusi..."
						className="pl-10 h-12 rounded-2xl border-stone-200 bg-white shadow-sm focus:border-emerald-500"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{filteredFoods.map((food) => (
					<div key={food.id} className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
						<div className="h-10 w-10 rounded-full bg-stone-100 mb-3 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
							<ChefHat className="h-5 w-5 text-stone-500 group-hover:text-emerald-600" />
						</div>
						<h3 className="font-bold text-stone-800 text-sm mb-1 line-clamp-1" title={food.name}>{food.name}</h3>
						<p className="text-xs text-stone-500 mb-3">{food.category}</p>

						<div className="flex items-center gap-3 text-xs text-stone-400">
							<div className="flex items-center gap-1">
								<Clock className="h-3 w-3" />
								<span>{food.prepTime}m</span>
							</div>
							<div className="flex items-center gap-1">
								<Flame className="h-3 w-3" />
								<span>{food.calories}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{filteredFoods.length === 0 && (
				<div className="text-center py-10 opacity-50">
					<p>No recipes found.</p>
				</div>
			)}
		</div>
	);
}
