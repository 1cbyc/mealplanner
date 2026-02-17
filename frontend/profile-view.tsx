"use client";

import { useState } from "react";
import { User, Settings, Heart, Bell, ChevronRight, LogOut, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function ProfileView({ onNavigate }: { onNavigate: (view: string) => void }) {
	const [vegetarian, setVegetarian] = useState(false);
	const [reminders, setReminders] = useState(true);

	return (
		<div className="space-y-8">
			<div className="flex flex-col items-center pt-4">
				<div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mb-4 border-4 border-white shadow-lg">
					<User className="h-10 w-10 text-emerald-600" />
				</div>
				<h2 className="text-2xl font-display font-bold text-stone-800">User Profile</h2>
				<p className="text-stone-500 text-sm">Efficient Home Cook</p>
			</div>

			<div className="space-y-6">
				<section>
					<h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 pl-2">Preferences</h3>
					<div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
						<div className="p-4 flex items-center justify-between border-b border-stone-50">
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
									<Heart className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Vegetarian Mode</span>
							</div>
							<Switch checked={vegetarian} onCheckedChange={setVegetarian} />
						</div>
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
									<Bell className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Meal Reminders</span>
							</div>
							<Switch checked={reminders} onCheckedChange={setReminders} />
						</div>
					</div>
				</section>

				<section>
					<h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 pl-2">Account</h3>
					<div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
						<div
							className="p-4 flex items-center justify-between border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors"
							onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'history' }))}
						>
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
									<Clock className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Meal History</span>
							</div>
							<ChevronRight className="h-4 w-4 text-stone-300" />
						</div>

						<div className="p-4 flex items-center justify-between border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors">
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-stone-100 rounded-lg flex items-center justify-center text-stone-500">
									<Settings className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Settings</span>
							</div>
							<ChevronRight className="h-4 w-4 text-stone-300" />
						</div>
						<div className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-50 transition-colors group">
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
									<LogOut className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700 group-hover:text-red-600">Log Out</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
