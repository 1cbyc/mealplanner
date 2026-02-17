"use client";

import { Home, ChefHat, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BottomNav() {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 pb-safe pt-2">
			<div className="container mx-auto px-6 pb-2">
				<div className="flex items-center justify-between">
					<NavItem icon={<Home className="h-6 w-6" />} label="Home" active />
					<NavItem icon={<ChefHat className="h-6 w-6" />} label="Recipes" />
					<div className="w-12" /> {/* Spacer for floating action button */}
					<NavItem icon={<ShoppingBag className="h-6 w-6" />} label="Shop" />
					<NavItem icon={<User className="h-6 w-6" />} label="Profile" />
				</div>
			</div>
		</div>
	);
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
	return (
		<Button
			variant="ghost"
			className={`flex flex-col items-center gap-1 h-auto py-2 hover:bg-transparent ${active ? "text-emerald-600" : "text-stone-400 hover:text-stone-600"
				}`}
		>
			{icon}
			<span className="text-[10px] font-medium">{label}</span>
		</Button>
	);
}
