"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/components/data-provider";

export function ShopView() {
	const { shoppingList, addItemToShop, toggleShopItem, removeShopItem, clearShop } = useData();
	const [newItem, setNewItem] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (newItem.trim()) {
			addItemToShop(newItem.trim());
			setNewItem("");
		}
	};

	const checkedCount = shoppingList.filter(i => i.checked).length;

	return (
		<div className="space-y-6 pb-20">
			<div className="sticky top-0 bg-stone-50 pt-4 pb-2 z-10">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-display font-bold text-stone-800">Shopping List</h2>
					{shoppingList.length > 0 && (
						<Button
							variant="ghost"
							size="sm"
							className="text-red-500 hover:text-red-700 hover:bg-red-50"
							onClick={clearShop}
						>
							Clear All
						</Button>
					)}
				</div>

				<form onSubmit={handleAdd} className="relative">
					<Plus className="absolute left-4 top-3.5 h-5 w-5 text-emerald-600" />
					<Input
						placeholder="Add item..."
						className="pl-12 h-12 rounded-2xl border-stone-200 bg-white shadow-sm focus:border-emerald-500"
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
					/>
					<Button
						type="submit"
						size="sm"
						className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 h-8 rounded-xl px-4"
						disabled={!newItem.trim()}
					>
						Add
					</Button>
				</form>
			</div>

			{shoppingList.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
					<ShoppingCart className="h-16 w-16 text-stone-300 mb-4" />
					<p className="font-bold text-stone-400">Your list is empty</p>
					<p className="text-xs text-stone-300">Add ingredients for your next meal</p>
				</div>
			) : (
				<div className="space-y-3">
					{shoppingList.map((item) => (
						<div
							key={item.id}
							className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${item.checked
									? "bg-stone-100 border-transparent opacity-60"
									: "bg-white border-stone-100 shadow-sm"
								}`}
						>
							<div
								className="flex items-center gap-3 flex-1 cursor-pointer"
								onClick={() => toggleShopItem(item.id)}
							>
								{item.checked ? (
									<CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
								) : (
									<Circle className="h-6 w-6 text-stone-300 flex-shrink-0 group-hover:text-emerald-400" />
								)}
								<span className={`font-medium ${item.checked ? "text-stone-400 line-through" : "text-stone-700"}`}>
									{item.name}
								</span>
							</div>

							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => removeShopItem(item.id)}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>
			)}

			{checkedCount > 0 && (
				<div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg pointer-events-none">
					{checkedCount} items completed
				</div>
			)}
		</div>
	);
}
