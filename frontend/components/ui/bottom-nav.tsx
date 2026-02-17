"use client";

import { Home, ChefHat, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 pb-safe pt-2">
			<div className="container mx-auto px-6 pb-2">
				<div className="flex items-center justify-between">
					<NavItem
						icon={<Home className="h-6 w-6" />}
						label="Home"
						isActive={activeTab === 'home'}
						onClick={() => onTabChange('home')}
					/>
					<NavItem
						icon={<ChefHat className="h-6 w-6" />}
						label="Recipes"
						isActive={activeTab === 'recipes'}
						onClick={() => onTabChange('recipes')}
					/>
					<div className="w-12" /> {/* Spacer for floating action button if needed */}
					<NavItem
						icon={<ShoppingBag className="h-6 w-6" />}
						label="Shop"
						isActive={activeTab === 'shop'}
						onClick={() => onTabChange('shop')}
					/>
					<NavItem
						icon={<User className="h-6 w-6" />}
						label="Profile"
						isActive={activeTab === 'profile'}
						onClick={() => onTabChange('profile')}
					/>
				</div>
			</div>
		</div>
	);
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
	return (
		<Button
			variant="ghost"
			onClick={onClick}
			className={`flex flex-col items-center gap-1 h-auto py-2 hover:bg-transparent ${isActive ? "text-emerald-600" : "text-stone-400 hover:text-stone-600"
				}`}
		>
			{icon}
			<span className="text-[10px] font-medium">{label}</span>
		</Button>
	);
}
