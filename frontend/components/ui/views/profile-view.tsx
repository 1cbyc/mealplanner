"use client";

import { useState } from "react";
import { User, Settings, Heart, Bell, ChevronRight, LogOut, Clock, X, Lock, Key } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/components/data-provider";
import { useAuth } from "@/components/auth-context";

export function ProfileView({ onNavigate }: { onNavigate: (view: string) => void }) {
	const { settings, updateSettings } = useData();
	const { user, logout, updateProfile } = useAuth();

	// Edit Mode State
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(user?.name || "");
	const [editPass, setEditPass] = useState("");
	const [msg, setMsg] = useState("");

	const handleSave = async () => {
		if (!user) return;
		const success = await updateProfile({
			name: editName,
			...(editPass ? { password: editPass } : {})
		});
		if (success) {
			setMsg("Profile updated successfully!");
			setTimeout(() => { setIsEditing(false); setMsg(""); }, 1500);
		}
	};

	// Local state for immediate UI feedback, though context updates should be fast enough
	// actually let's just use context directly to ensure truth

	return (
		<div className="space-y-8 relative">
			{/* Edit Profile Modal/Overlay */}
			{isEditing && (
				<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in">
					<div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 space-y-4">
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-display font-bold text-xl text-stone-800">Edit Profile</h3>
							<button onClick={() => setIsEditing(false)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200">
								<X className="h-4 w-4 text-stone-500" />
							</button>
						</div>

						<div className="space-y-3">
							<label className="text-xs font-bold text-stone-400 uppercase">Full Name</label>
							<Input
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
								className="bg-stone-50 border-stone-100 h-12 rounded-xl"
							/>
						</div>

						<div className="space-y-3">
							<label className="text-xs font-bold text-stone-400 uppercase">New Password (Optional)</label>
							<Input
								type="password"
								value={editPass}
								placeholder="Leave blank to keep current"
								onChange={(e) => setEditPass(e.target.value)}
								className="bg-stone-50 border-stone-100 h-12 rounded-xl"
							/>
						</div>

						{msg && <p className="text-emerald-600 text-sm font-medium text-center">{msg}</p>}

						<Button onClick={handleSave} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold mt-2">
							Save Changes
						</Button>
					</div>
				</div>
			)}


			<div className="flex flex-col items-center pt-4">
				<div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mb-4 border-4 border-white shadow-lg relative">
					<User className="h-10 w-10 text-emerald-600" />
					<button
						onClick={() => setIsEditing(true)}
						className="absolute bottom-0 right-0 h-8 w-8 bg-stone-800 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm"
					>
						<Settings className="h-4 w-4" />
					</button>
				</div>
				<h2 className="text-2xl font-display font-bold text-stone-800">{user?.name}</h2>
				<p className="text-stone-500 text-sm">@{user?.username}</p>
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
							<Switch
								checked={settings.vegetarian}
								onCheckedChange={(checked) => updateSettings({ vegetarian: checked })}
							/>
						</div>
						<div className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
									<Bell className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Meal Reminders</span>
							</div>
							<Switch
								checked={settings.reminders}
								onCheckedChange={(checked) => updateSettings({ reminders: checked })}
							/>
						</div>
					</div>
				</section>

				<section>
					<h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 pl-2">Account</h3>
					<div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
						<div
							className="p-4 flex items-center justify-between border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors"
							onClick={() => onNavigate('history')}
						>
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
									<Clock className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Meal History</span>
							</div>
							<ChevronRight className="h-4 w-4 text-stone-300" />
						</div>

						<div
							className="p-4 flex items-center justify-between border-b border-stone-50 cursor-pointer hover:bg-stone-50 transition-colors"
							onClick={() => setIsEditing(true)}
						>
							<div className="flex items-center gap-3">
								<div className="h-8 w-8 bg-stone-100 rounded-lg flex items-center justify-center text-stone-500">
									<Settings className="h-4 w-4" />
								</div>
								<span className="text-sm font-medium text-stone-700">Settings</span>
							</div>
							<ChevronRight className="h-4 w-4 text-stone-300" />
						</div>
						<div
							className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-50 transition-colors group"
							onClick={logout}
						>
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
