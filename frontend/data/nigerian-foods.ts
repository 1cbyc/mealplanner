export interface FoodItem {
	id: string;
	name: string;
	category: 'Swallow' | 'Soup' | 'Rice' | 'Bean' | 'Tuber' | 'Stew' | 'Snack' | 'Drink' | 'Breakfast' | 'Protein' | 'Other';
	calories: number; // approximate per serving
	protein: number; // grams
	carbs: number; // grams
	fat: number; // grams
	vegetarian: boolean;
	prepTime: number; // in minutes
	description?: string;
}

export const NIGERIAN_FOODS: FoodItem[] = [
	// Swallows (High Carb, Not Veg if served with meat soups typically, but the swallow itself is veg. We will mark swallows as Veg, soups decide meal status)
	{ id: 'sw1', name: 'Pounded Yam', category: 'Swallow', calories: 400, protein: 2, carbs: 90, fat: 1, vegetarian: true, prepTime: 45, description: 'Smooth dough made from boiled yams.' },
	{ id: 'sw2', name: 'Eba (Garri)', category: 'Swallow', calories: 360, protein: 1, carbs: 80, fat: 1, vegetarian: true, prepTime: 10, description: 'Made from fried cassava granules.' },
	{ id: 'sw3', name: 'Amala', category: 'Swallow', calories: 350, protein: 2, carbs: 75, fat: 1, vegetarian: true, prepTime: 20, description: 'Yam flour dough, typically served with Ewedu and Gbegiri.' },
	{ id: 'sw4', name: 'Semovita', category: 'Swallow', calories: 380, protein: 10, carbs: 70, fat: 2, vegetarian: true, prepTime: 15, description: 'Made from semolina flour.' },
	{ id: 'sw5', name: 'Fufu (Akpu)', category: 'Swallow', calories: 330, protein: 2, carbs: 75, fat: 1, vegetarian: true, prepTime: 60, description: 'Fermented cassava dough.' },
	{ id: 'sw6', name: 'Tuwo Shinkafa', category: 'Swallow', calories: 320, protein: 5, carbs: 65, fat: 2, vegetarian: true, prepTime: 40, description: 'Soft rice pudding popular in Northern Nigeria.' },
	{ id: 'sw7', name: 'Starch', category: 'Swallow', calories: 300, protein: 1, carbs: 70, fat: 1, vegetarian: true, prepTime: 20, description: 'Popular in the Niger Delta, eaten with Banga soup.' },
	{ id: 'sw8', name: 'Tuwo Masara', category: 'Swallow', calories: 350, protein: 8, carbs: 70, fat: 3, vegetarian: true, prepTime: 45, description: 'Corn meal dough, popular in the North.' },
	{ id: 'sw9', name: 'Wheat', category: 'Swallow', calories: 340, protein: 12, carbs: 65, fat: 2, vegetarian: true, prepTime: 20, description: 'Whole wheat flour dough, a healthier alternative.' },

	// Soups (Typically contain meat/fish/crayfish - Non-Veg mostly unless specified)
	{ id: 'sp1', name: 'Egusi Soup', category: 'Soup', calories: 450, protein: 25, carbs: 10, fat: 35, vegetarian: false, prepTime: 50, description: 'Melon seed soup with leafy vegetables.' },
	{ id: 'sp2', name: 'Efo Riro', category: 'Soup', calories: 350, protein: 15, carbs: 15, fat: 25, vegetarian: false, prepTime: 45, description: 'Rich mixed vegetable soup.' },
	{ id: 'sp3', name: 'Ogbono Soup', category: 'Soup', calories: 380, protein: 20, carbs: 15, fat: 30, vegetarian: false, prepTime: 40, description: 'Draw soup made from wild mango seeds.' },
	{ id: 'sp4', name: 'Okra Soup', category: 'Soup', calories: 250, protein: 10, carbs: 20, fat: 15, vegetarian: true, prepTime: 30, description: 'Fresh okra soup, often cooked with seafood (marked Veg as base can be).' },
	{ id: 'sp5', name: 'Ewedu', category: 'Soup', calories: 150, protein: 5, carbs: 10, fat: 5, vegetarian: true, prepTime: 20, description: 'Jute leaf soup, traditionally paired with Amala.' },
	{ id: 'sp6', name: 'Gbegiri', category: 'Soup', calories: 280, protein: 15, carbs: 35, fat: 10, vegetarian: true, prepTime: 60, description: 'Bean soup, often mixed with Ewedu (Abula).' },
	{ id: 'sp7', name: 'Edikang Ikong', category: 'Soup', calories: 400, protein: 25, carbs: 15, fat: 20, vegetarian: false, prepTime: 55, description: 'Vegetable soup from Calabar, rich in pumpkin leaves and waterleaf.' },
	{ id: 'sp8', name: 'Banga Soup', category: 'Soup', calories: 480, protein: 15, carbs: 20, fat: 40, vegetarian: false, prepTime: 70, description: 'Palm nut soup, popular in the Niger Delta.' },
	{ id: 'sp9', name: 'Bitterleaf Soup', category: 'Soup', calories: 350, protein: 20, carbs: 15, fat: 25, vegetarian: false, prepTime: 60, description: 'Traditional soup made with washed bitter leaves.' },
	{ id: 'sp10', name: 'Oha Soup', category: 'Soup', calories: 360, protein: 20, carbs: 15, fat: 25, vegetarian: false, prepTime: 50, description: 'Made with Oha leaves and cocoyam thickener.' },
	{ id: 'sp11', name: 'Afang Soup', category: 'Soup', calories: 390, protein: 25, carbs: 15, fat: 25, vegetarian: false, prepTime: 55, description: 'Rich vegetable soup with Okazi leaves.' },
	{ id: 'sp12', name: 'Miyan Kuka', category: 'Soup', calories: 300, protein: 15, carbs: 40, fat: 10, vegetarian: true, prepTime: 40, description: 'Baobab leaf soup, popular in the North.' },
	{ id: 'sp13', name: 'Owo Soup', category: 'Soup', calories: 400, protein: 15, carbs: 20, fat: 35, vegetarian: false, prepTime: 45, description: 'Urhobo/Isoko soup made with palm oil and starch/garri.' },
	{ id: 'sp14', name: 'Fisherman Soup', category: 'Soup', calories: 320, protein: 35, carbs: 5, fat: 15, vegetarian: false, prepTime: 35, description: 'Spicy seafood broth from the riverine areas.' },
	{ id: 'sp15', name: 'White Soup (Ofe Nsala)', category: 'Soup', calories: 300, protein: 25, carbs: 10, fat: 15, vegetarian: false, prepTime: 50, description: 'Spicy soup made with yam thickener and catfish.' },

	// Rice
	{ id: 'rc1', name: 'Jollof Rice', category: 'Rice', calories: 450, protein: 10, carbs: 75, fat: 12, vegetarian: true, prepTime: 60, description: 'The legendary one-pot rice dish cooked in tomato sauce.' },
	{ id: 'rc2', name: 'Fried Rice', category: 'Rice', calories: 480, protein: 12, carbs: 70, fat: 15, vegetarian: false, prepTime: 55, description: 'Rice stir-fried with mixed vegetables and liver.' },
	{ id: 'rc3', name: 'White Rice & Stew', category: 'Rice', calories: 500, protein: 15, carbs: 80, fat: 15, vegetarian: false, prepTime: 45, description: 'Plain boiled rice with tomato-based stew.' },
	{ id: 'rc4', name: 'Ofada Rice & Ayamase', category: 'Rice', calories: 550, protein: 20, carbs: 75, fat: 25, vegetarian: false, prepTime: 70, description: 'Locally grown rice with spicy green pepper sauce.' },
	{ id: 'rc5', name: 'Coconut Rice', category: 'Rice', calories: 520, protein: 10, carbs: 70, fat: 20, vegetarian: true, prepTime: 50, description: 'Rice cooked in coconut milk.' },
	{ id: 'rc6', name: 'Banga Rice', category: 'Rice', calories: 600, protein: 15, carbs: 75, fat: 25, vegetarian: false, prepTime: 60, description: 'Rice cooked in palm nut extract.' },

	// Breakfast
	{ id: 'br1', name: 'Akamu (Pap) & Akara', category: 'Breakfast', calories: 400, protein: 15, carbs: 65, fat: 10, vegetarian: true, prepTime: 30, description: 'Corn meal pap with bean cakes.' },
	{ id: 'br2', name: 'Bread & Fried Egg', category: 'Breakfast', calories: 350, protein: 18, carbs: 40, fat: 15, vegetarian: false, prepTime: 15, description: 'A classic Nigerian breakfast staple.' },
	{ id: 'br3', name: 'Indomie Noodles', category: 'Breakfast', calories: 380, protein: 8, carbs: 60, fat: 12, vegetarian: true, prepTime: 10, description: 'Instant noodles cooked with vegetables and egg.' },
	{ id: 'br4', name: 'Yam & Egg Sauce', category: 'Breakfast', calories: 450, protein: 15, carbs: 70, fat: 15, vegetarian: false, prepTime: 30, description: 'Boiled yam with scrambled egg and tomato sauce.' },
	{ id: 'br5', name: 'Custard & Moi Moi', category: 'Breakfast', calories: 420, protein: 18, carbs: 65, fat: 10, vegetarian: true, prepTime: 15, description: 'Creamy custard paired with bean pudding.' },
	{ id: 'br6', name: 'Plantain & Egg', category: 'Breakfast', calories: 400, protein: 12, carbs: 65, fat: 15, vegetarian: false, prepTime: 20, description: 'Fried or boiled plantain with egg sauce.' },
	{ id: 'br7', name: 'Oats & Milk', category: 'Breakfast', calories: 300, protein: 12, carbs: 45, fat: 8, vegetarian: true, prepTime: 10, description: 'Quick and healthy oatmeal.' },
	{ id: 'br8', name: 'Agege Bread & Beans', category: 'Breakfast', calories: 500, protein: 20, carbs: 85, fat: 10, vegetarian: true, prepTime: 60, description: 'Soft bread eaten with Ewa Agonyin.' },

	// Beans & Tubers
	{ id: 'bn1', name: 'Moi Moi', category: 'Bean', calories: 250, protein: 15, carbs: 30, fat: 8, vegetarian: true, prepTime: 60, description: 'Steamed bean pudding.' },
	{ id: 'bn2', name: 'Akara', category: 'Bean', calories: 300, protein: 12, carbs: 35, fat: 15, vegetarian: true, prepTime: 30, description: 'Fried bean cakes.' },
	{ id: 'bn3', name: 'Ewa Agonyin', category: 'Bean', calories: 450, protein: 25, carbs: 60, fat: 15, vegetarian: true, prepTime: 90, description: 'Mashed beans served with spicy pepper sauce.' },
	{ id: 'bn4', name: 'Beans & Plantain', category: 'Bean', calories: 400, protein: 20, carbs: 65, fat: 10, vegetarian: true, prepTime: 70, description: 'Beans porridge cooked with ripe plantains.' },
	{ id: 'tb1', name: 'Yam Pottage (Asaro)', category: 'Tuber', calories: 400, protein: 5, carbs: 75, fat: 12, vegetarian: true, prepTime: 45, description: 'Yam chunks cooked in palm oil sauce.' },
	{ id: 'tb2', name: 'Fried Yam (Dundun)', category: 'Tuber', calories: 450, protein: 4, carbs: 80, fat: 15, vegetarian: true, prepTime: 30, description: 'Deep fried yam chunks.' },
	{ id: 'tb3', name: 'Fried Plantain (Dodo)', category: 'Tuber', calories: 250, protein: 2, carbs: 55, fat: 5, vegetarian: true, prepTime: 15, description: 'Sweet fried ripe plantains.' },
	{ id: 'tb4', name: 'Roasted Yam/Plantain (Boli)', category: 'Tuber', calories: 300, protein: 4, carbs: 65, fat: 2, vegetarian: true, prepTime: 40, description: 'Roasted on charcoal, eaten with groundnut or palm oil.' },

	// Protein / Sides
	{ id: 'pr1', name: 'Suya', category: 'Protein', calories: 350, protein: 40, carbs: 5, fat: 20, vegetarian: false, prepTime: 40, description: 'Spicy grilled meat skewers.' },
	{ id: 'pr2', name: 'Pepper Soup', category: 'Soup', calories: 200, protein: 25, carbs: 5, fat: 10, vegetarian: false, prepTime: 40, description: 'Spicy broth with fish, goat meat, or chicken.' },
	{ id: 'pr3', name: 'Nkwobi', category: 'Protein', calories: 380, protein: 30, carbs: 5, fat: 25, vegetarian: false, prepTime: 60, description: 'Spicy cow foot delicacy.' },
	{ id: 'pr4', name: 'Asun', category: 'Protein', calories: 350, protein: 35, carbs: 5, fat: 20, vegetarian: false, prepTime: 60, description: 'Spicy grilled goat meat.' },
	{ id: 'pr5', name: 'Grilled Fish', category: 'Protein', calories: 300, protein: 35, carbs: 2, fat: 15, vegetarian: false, prepTime: 45, description: 'Whole grilled fish with spices.' },
	{ id: 'pr6', name: 'Snail (Igbin)', category: 'Protein', calories: 150, protein: 25, carbs: 2, fat: 2, vegetarian: false, prepTime: 50, description: 'Peppered snail.' },

	// Snacks
	{ id: 'sn1', name: 'Chin Chin', category: 'Snack', calories: 400, protein: 6, carbs: 60, fat: 15, vegetarian: true, prepTime: 60, description: 'Crunchy fried dough.' },
	{ id: 'sn2', name: 'Puff Puff', category: 'Snack', calories: 280, protein: 6, carbs: 45, fat: 10, vegetarian: true, prepTime: 45, description: 'Sweet fried dough balls.' },
	{ id: 'sn3', name: 'Meat Pie', category: 'Snack', calories: 350, protein: 12, carbs: 40, fat: 18, vegetarian: false, prepTime: 60, description: 'Pastry filled with minced meat and veggies.' },
	{ id: 'sn4', name: 'Egg Roll', category: 'Snack', calories: 300, protein: 10, carbs: 35, fat: 15, vegetarian: false, prepTime: 40, description: 'Dough wrapped around a boiled egg and fried.' },
	{ id: 'sn5', name: 'Garden Egg & Peanut Butter', category: 'Snack', calories: 150, protein: 4, carbs: 20, fat: 8, vegetarian: true, prepTime: 5, description: 'Fresh garden eggs with spicy peanut paste.' },
	{ id: 'sn6', name: 'Roasted Corn & Pear (Ube)', category: 'Snack', calories: 250, protein: 6, carbs: 40, fat: 10, vegetarian: true, prepTime: 20, description: 'Seasonal favorite.' },
	{ id: 'sn7', name: 'Kilishi', category: 'Snack', calories: 300, protein: 45, carbs: 5, fat: 12, vegetarian: false, prepTime: 120, description: 'Dried spicy beef jerky.' },
	{ id: 'sn8', name: 'Kuli Kuli', category: 'Snack', calories: 200, protein: 15, carbs: 10, fat: 12, vegetarian: true, prepTime: 30, description: 'Crunchy groundnut chips.' },

	// Drinks
	{ id: 'dr1', name: 'Zobo', category: 'Drink', calories: 150, protein: 1, carbs: 38, fat: 0, vegetarian: true, prepTime: 30, description: 'Hibiscus leaf tea, often spiced with ginger and clove.' },
	{ id: 'dr2', name: 'Kunu', category: 'Drink', calories: 200, protein: 4, carbs: 40, fat: 2, vegetarian: true, prepTime: 60, description: 'Traditional milky drink made from millet or sorghum.' },
	{ id: 'dr3', name: 'Chapman', category: 'Drink', calories: 180, protein: 0, carbs: 45, fat: 0, vegetarian: true, prepTime: 10, description: 'Fruity mocktail with cucumber and lemon.' },
];
