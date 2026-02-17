export interface FoodItem {
	id: string;
	name: string;
	category: 'Swallow' | 'Soup' | 'Rice' | 'Bean' | 'Tuber' | 'Stew' | 'Snack' | 'Drink' | 'Other';
	calories: number; // approximate per serving
	prepTime: number; // in minutes
	description?: string;
}

export const NIGERIAN_FOODS: FoodItem[] = [
	// Swallows
	{ id: 'sw1', name: 'Pounded Yam', category: 'Swallow', calories: 400, prepTime: 45, description: 'Smooth dough made from boiled yams.' },
	{ id: 'sw2', name: 'Eba (Garri)', category: 'Swallow', calories: 360, prepTime: 10, description: 'Made from fried cassava granules.' },
	{ id: 'sw3', name: 'Amala', category: 'Swallow', calories: 350, prepTime: 20, description: 'Yam flour dough, popularly eaten with Ewedu.' },
	{ id: 'sw4', name: 'Semovita', category: 'Swallow', calories: 380, prepTime: 15, description: 'Made from semolina flour.' },
	{ id: 'sw5', name: 'Fufu (Akpu)', category: 'Swallow', calories: 330, prepTime: 60, description: 'Fermented cassava dough.' },
	{ id: 'sw6', name: 'Tuwo Shinkafa', category: 'Swallow', calories: 320, prepTime: 40, description: 'Soft rice pudding popular in Northern Nigeria.' },
	{ id: 'sw7', name: 'Starch', category: 'Swallow', calories: 300, prepTime: 20, description: 'Popular in the Niger Delta, eaten with Banga soup.' },

	// Soups
	{ id: 'sp1', name: 'Egusi Soup', category: 'Soup', calories: 450, prepTime: 50, description: 'Melon seed soup with leafy vegetables.' },
	{ id: 'sp2', name: 'Efo Riro', category: 'Soup', calories: 350, prepTime: 45, description: 'Rich mixed vegetable soup.' },
	{ id: 'sp3', name: 'Ogbono Soup', category: 'Soup', calories: 380, prepTime: 40, description: 'Draw soup made from wild mango seeds.' },
	{ id: 'sp4', name: 'Okra Soup', category: 'Soup', calories: 250, prepTime: 30, description: 'Fresh okra soup, often cooked with seafood.' },
	{ id: 'sp5', name: 'Ewedu', category: 'Soup', calories: 150, prepTime: 20, description: 'Jute leaf soup, traditionally paired with Amala.' },
	{ id: 'sp6', name: 'Gbegiri', category: 'Soup', calories: 280, prepTime: 60, description: 'Bean soup, often mixed with Ewedu (Abula).' },
	{ id: 'sp7', name: 'Edikang Ikong', category: 'Soup', calories: 400, prepTime: 55, description: 'Vegetable soup from Calabar, rich in pumpkin leaves and waterleaf.' },
	{ id: 'sp8', name: 'Banga Soup', category: 'Soup', calories: 480, prepTime: 70, description: 'Palm nut soup, popular in the Niger Delta.' },
	{ id: 'sp9', name: 'Bitterleaf Soup', category: 'Soup', calories: 350, prepTime: 60, description: 'Traditional soup made with washed bitter leaves.' },
	{ id: 'sp10', name: 'Oha Soup', category: 'Soup', calories: 360, prepTime: 50, description: 'Made with Oha leaves and cocoyam thickener.' },
	{ id: 'sp11', name: 'Afang Soup', category: 'Soup', calories: 390, prepTime: 55, description: 'Rich vegetable soup with Okazi leaves.' },

	// Rice
	{ id: 'rc1', name: 'Jollof Rice', category: 'Rice', calories: 450, prepTime: 60, description: 'The legendary one-pot rice dish cooked in tomato sauce.' },
	{ id: 'rc2', name: 'Fried Rice', category: 'Rice', calories: 480, prepTime: 55, description: 'Rice stir-fried with mixed vegetables and liver.' },
	{ id: 'rc3', name: 'White Rice & Stew', category: 'Rice', calories: 500, prepTime: 45, description: 'Plain boiled rice with tomato-based stew.' },
	{ id: 'rc4', name: 'Ofada Rice & Ayamase', category: 'Rice', calories: 550, prepTime: 70, description: 'Locally grown rice with spicy green pepper sauce.' },
	{ id: 'rc5', name: 'Coconut Rice', category: 'Rice', calories: 520, prepTime: 50, description: 'Rice cooked in coconut milk.' },

	// Beans & Tubers
	{ id: 'bn1', name: 'Moi Moi', category: 'Bean', calories: 250, prepTime: 60, description: 'Steamed bean pudding.' },
	{ id: 'bn2', name: 'Akara', category: 'Bean', calories: 300, prepTime: 30, description: 'Fried bean cakes.' },
	{ id: 'bn3', name: 'Ewa Agonyin', category: 'Bean', calories: 450, prepTime: 90, description: 'Mashed beans served with spicy pepper sauce.' },
	{ id: 'tb1', name: 'Yam Pottage (Asaro)', category: 'Tuber', calories: 400, prepTime: 45, description: 'Yam chunks cooked in palm oil sauce.' },
	{ id: 'tb2', name: 'Boiled Yam & Egg Sauce', category: 'Tuber', calories: 420, prepTime: 30, description: 'Simple breakfast staple.' },
	{ id: 'tb3', name: 'Fried Plantain (Dodo)', category: 'Tuber', calories: 250, prepTime: 15, description: 'Sweet fried ripe plantains.' },

	// Others / Snacks
	{ id: 'ot1', name: 'Suya', category: 'Other', calories: 350, prepTime: 40, description: 'Spicy grilled meat skewers.' },
	{ id: 'ot2', name: 'Pepper Soup', category: 'Soup', calories: 200, prepTime: 40, description: 'Spicy broth with fish, goat meat, or chicken.' },
	{ id: 'ot3', name: 'Nkwobi', category: 'Other', calories: 380, prepTime: 60, description: 'Spicy cow foot delicacy.' },
	{ id: 'ot4', name: 'Kilishi', category: 'Snack', calories: 300, prepTime: 120, description: 'Dried spicy beef jerky.' },
	{ id: 'ot5', name: 'Puff Puff', category: 'Snack', calories: 280, prepTime: 45, description: 'Sweet fried dough balls.' },
];
