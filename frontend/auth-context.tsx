"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
	username: string;
	name: string;
}

interface AuthContextType {
	user: User | null;
	login: (username: string, password: string) => Promise<boolean>;
	signup: (username: string, password: string, name: string) => Promise<boolean>;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Check for persisted session
		const storedUser = localStorage.getItem("mealplanner_user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		setIsLoading(false);
	}, []);

	const login = async (username: string, password: string) => {
		// Mock Credentials
		if (username === "demo" && password === "demo123") {
			const user = { username: "demo", name: "Demo User" };
			setUser(user);
			localStorage.setItem("mealplanner_user", JSON.stringify(user));
			return true;
		}

		if (username === "test" && (password === "lovinghusband" || password === "bestcook")) {
			const user = { username: "test", name: "Wife" };
			setUser(user);
			localStorage.setItem("mealplanner_user", JSON.stringify(user));
			return true;
		}

		// Check for locally signed up users
		const localUsers = JSON.parse(localStorage.getItem("mealplanner_users") || "{}");
		if (localUsers[username] && localUsers[username].password === password) {
			const user = { username, name: localUsers[username].name };
			setUser(user);
			localStorage.setItem("mealplanner_user", JSON.stringify(user));
			return true;
		}

		return false;
	};

	const signup = async (username: string, password: string, name: string) => {
		const localUsers = JSON.parse(localStorage.getItem("mealplanner_users") || "{}");
		if (localUsers[username]) {
			return false; // User already exists
		}

		localUsers[username] = { password, name };
		localStorage.setItem("mealplanner_users", JSON.stringify(localUsers));

		// Auto login
		const user = { username, name };
		setUser(user);
		localStorage.setItem("mealplanner_user", JSON.stringify(user));
		return true;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("mealplanner_user");
		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
