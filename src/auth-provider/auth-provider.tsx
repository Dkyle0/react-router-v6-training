import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	user: string | null;
	signin: (newUser: string, callback: () => void) => void;
	signout: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<string | null>(
		() => localStorage.getItem('user') || null,
	);

	const signin = (newUser: string, callback: () => void) => {
		setUser(newUser);
		localStorage.setItem('user', newUser);
		callback();
	};

	const signout = (callback: () => void) => {
		setUser(null);
		localStorage.removeItem('user');
		callback();
	};

	const value: AuthContextType = {
		user,
		signin,
		signout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
