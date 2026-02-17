"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { NIGERIAN_FOODS, FoodItem } from "@/data/nigerian-foods";
import { useAuth } from "@/components/auth-context";

// --- Types ---

interface Settings {
	vegetarian: boolean;
	reminders: boolean;
}

export interface ShoppingItem {
	id: string;
	name: string;
	checked: boolean;
}

interface MealPlanDay {
	date: string;
	breakfast: FoodItem | null;
	lunch: FoodItem | null;
	dinner: FoodItem | null;
}

interface DataContextType {
	// Settings
	settings: Settings;
	updateSettings: (newSettings: Partial<Settings>) => void;

	// Custom Recipes
	customRecipes: FoodItem[];
	addRecipe: (recipe: FoodItem) => void;
	allFoods: FoodItem[]; // Combined default + custom

	// Shopping List
	shoppingList: ShoppingItem[];
	addItemToShop: (name: string) => void;
	toggleShopItem: (id: string) => void;
	removeShopItem: (id: string) => void;
	clearShop: () => void;

	// Meal Planning
	currentPlan: MealPlanDay[];
	generatePlan: () => void;
	updateMeal: (date: string, type: 'breakfast' | 'lunch' | 'dinner', food: FoodItem) => void;
	swapMeal: (date: string, type: 'breakfast' | 'lunch' | 'dinner') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider ---

export function DataProvider({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();

	// 1. Settings State
	const [settings, setSettings] = useState<Settings>({ vegetarian: false, reminders: true });

	// 2. Custom Recipes State
	const [customRecipes, setCustomRecipes] = useState<FoodItem[]>([]);

	// 3. Shopping List State
	const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

	// 4. Meal Plan State
	const [currentPlan, setCurrentPlan] = useState<MealPlanDay[]>([]);

	// --- Load from LocalStorage on User Change ---
	useEffect(() => {
		if (!user) return; // Don't load if no user (or clear state?)

		const prefix = `mealplanner_${user.username}_`;
		console.log("Loading data for:", user.username);

		const load = (key: string, setter: Function, defaultVal: any) => {
			const stored = localStorage.getItem(prefix + key);
			if (stored) {
				setter(JSON.parse(stored));
			} else {
				setter(defaultVal);
			}
		};

		load('settings', setSettings, { vegetarian: false, reminders: true });
		load('customRecipes', setCustomRecipes, []);
		load('shoppingList', setShoppingList, []);
		load('currentPlan', setCurrentPlan, []);
	}, [user]);

	// --- Persist to LocalStorage on Change ---
	// Helper to save only if user exists
	const save = (key: string, data: any) => {
		if (user) {
			localStorage.setItem(`mealplanner_${user.username}_${key}`, JSON.stringify(data));
		}
	};

	useEffect(() => save('settings', settings), [settings, user]);
	useEffect(() => save('customRecipes', customRecipes), [customRecipes, user]);
	useEffect(() => save('shoppingList', shoppingList), [shoppingList, user]);
	useEffect(() => save('currentPlan', currentPlan), [currentPlan, user]);


	// --- Actions ---

	const updateSettings = (newSettings: Partial<Settings>) => {
		setSettings(prev => ({ ...prev, ...newSettings }));
	};

	const addRecipe = (recipe: FoodItem) => {
		setCustomRecipes(prev => [...prev, recipe]);
	};

	const allFoods = [...NIGERIAN_FOODS, ...customRecipes];

	const addItemToShop = (name: string) => {
		const newItem: ShoppingItem = {
			id: Date.now().toString(),
			name,
			checked: false
		};
		setShoppingList(prev => [newItem, ...prev]);
	};

	const toggleShopItem = (id: string) => {
		setShoppingList(prev => prev.map(item =>
			item.id === id ? { ...item, checked: !item.checked } : item
		));
	};

	const removeShopItem = (id: string) => {
		setShoppingList(prev => prev.filter(item => item.id !== id));
	};

	const clearShop = () => setShoppingList([]);

	const generatePlan = () => {
		// Simple Generator
		const days = 7;
		const newPlan: MealPlanDay[] = [];
		const today = new Date();

		for (let i = 0; i < days; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() + i);

			// Random selection helper
			const getRandom = (cat: string) => {
				let candidates = allFoods.filter(f => f.category === cat || (cat === 'Swallow' && f.category === 'Soup'));

				// Vegetarian Filter
				if (settings.vegetarian) {
					candidates = candidates.filter(f => f.vegetarian);
				}

				if (candidates.length === 0) return null;
				return candidates[Math.floor(Math.random() * candidates.length)];
			};

			// Smarter selection based on category
			const breakfast = getRandom('Breakfast') || getRandom('Tuber'); // Fallback if no veg breakfast? Should be fine with current data

			// Lunch: Rice or Swallow
			const lunchType = Math.random() > 0.5 ? 'Rice' : 'Swallow';
			let lunch = getRandom(lunchType);

			// Dinner: Lighter or Swallow
			const dinnerType = Math.random() > 0.5 ? 'Swallow' : 'Soup'; // Simplified logic
			const dinner = getRandom(dinnerType) || getRandom('Other');

			newPlan.push({
				date: date.toISOString(),
				breakfast,
				lunch,
				dinner
			});
		}
		setCurrentPlan(newPlan);
	};

	const updateMeal = (date: string, type: 'breakfast' | 'lunch' | 'dinner', food: FoodItem) => {
		setCurrentPlan(prev => prev.map(day => {
			if (day.date === date) {
				return { ...day, [type]: food };
			}
			return day;
		}));
	};

	const swapMeal = (date: string, type: 'breakfast' | 'lunch' | 'dinner') => {
		setCurrentPlan(prev => prev.map(day => {
			if (day.date === date) {
				const currentFood = day[type];
				// Determine category to swap with. If current exists, use its category.
				// If not, use defaults based on type/time.
				let targetCategory = 'Other';
				if (currentFood) {
					targetCategory = currentFood.category;
				} else {
					if (type === 'breakfast') targetCategory = 'Breakfast';
					else if (type === 'lunch') targetCategory = 'Rice';
					else targetCategory = 'Swallow';
				}

				// Get candidates
				let candidates = allFoods.filter(f => f.category === targetCategory);

				// Vegetarian Filter
				if (settings.vegetarian) {
					candidates = candidates.filter(f => f.vegetarian);
				}

				if (candidates.length === 0) candidates = allFoods.filter(f => !settings.vegetarian || f.vegetarian); // Fallback to all valid

				// Filter out current if possible
				const others = candidates.filter(f => f.id !== currentFood?.id);
				const pool = others.length > 0 ? others : candidates;

				const newFood = pool[Math.floor(Math.random() * pool.length)];

				if (!newFood) return day; // No valid food found?

				return { ...day, [type]: newFood };
			}
			return day;
		}));
	};

	return (
		<DataContext.Provider value={{
			settings, updateSettings,
			customRecipes, addRecipe, allFoods,
			shoppingList, addItemToShop, toggleShopItem, removeShopItem, clearShop,
			currentPlan, generatePlan, updateMeal, swapMeal
		}}>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (!context) throw new Error("useData must be used within DataProvider");
	return context;
}
