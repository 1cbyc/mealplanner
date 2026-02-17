"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, AuthProvider } from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChefHat, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
	return (
		<AuthProvider>
			<LoginContent />
		</AuthProvider>
	);
}

function LoginContent() {
	const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login, signup } = useAuth();
	const router = useRouter();

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			// Simulate network delay for realism
			await new Promise(resolve => setTimeout(resolve, 800));

			if (activeTab === 'signin') {
				const success = await login(username, password);
				if (success) {
					router.push("/");
				} else {
					setError("Invalid credentials. Try 'demo' / 'demo123'");
				}
			} else {
				// Signup
				if (!name || !username || !password) {
					setError("All fields are required");
					setLoading(false);
					return;
				}
				const success = await signup(username, password, name);
				if (success) {
					router.push("/");
				} else {
					setError("Username already exists");
				}
			}
		} catch (err) {
			setError("An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
			<div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
				{/* Header Section */}
				<div className="bg-emerald-600 p-8 text-center relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
					<div className="relative z-10 flex flex-col items-center">
						<div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
							<ChefHat className="h-8 w-8 text-emerald-600" />
						</div>
						<h1 className="text-2xl font-display font-bold text-white mb-1">MealPlanner</h1>
						<p className="text-emerald-100 text-xs font-medium uppercase tracking-wider">Smart Nigerian Dining</p>
					</div>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-stone-100">
					<button
						type="button"
						className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'signin' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-stone-400 hover:bg-stone-50'}`}
						onClick={() => setActiveTab('signin')}
					>
						Sign In
					</button>
					<button
						type="button"
						className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'signup' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-stone-400 hover:bg-stone-50'}`}
						onClick={() => setActiveTab('signup')}
					>
						Register
					</button>
				</div>

				{/* Login/Signup Form */}
				<div className="p-8">
					<form onSubmit={handleAuth} className="space-y-4">
						{activeTab === 'signup' && (
							<div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
								<label className="text-xs font-bold text-stone-500 uppercase ml-1">Full Name</label>
								<Input
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="e.g. Nsisong"
									className="rounded-xl border-stone-200 bg-stone-50 focus:bg-white transition-all h-12"
								/>
							</div>
						)}

						<div className="space-y-2">
							<label className="text-xs font-bold text-stone-500 uppercase ml-1">Username</label>
							<Input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Enter username"
								className="rounded-xl border-stone-200 bg-stone-50 focus:bg-white transition-all h-12"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-xs font-bold text-stone-500 uppercase ml-1">Password</label>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter password"
								className="rounded-xl border-stone-200 bg-stone-50 focus:bg-white transition-all h-12"
							/>
						</div>

						{error && (
							<p className="text-red-500 text-xs font-medium text-center bg-red-50 p-2 rounded-lg">
								{error}
							</p>
						)}

						<Button
							type="submit"
							disabled={loading}
							className="w-full h-12 rounded-xl text-lg font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 mt-4 active:scale-95 transition-all"
						>
							{loading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<span className="flex items-center gap-2">
									{activeTab === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight className="h-4 w-4" />
								</span>
							)}
						</Button>
					</form>

					{activeTab === 'signin' && (
						<div className="mt-8 text-center">
							<p className="text-xs text-stone-400">
								Try <strong className="text-stone-600">demo</strong> / <strong className="text-stone-600">demo123</strong>
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
