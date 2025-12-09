"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useTransition,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    startTransition(() => {
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      }
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser = {
      name: "کاربر مهمان",
      email: email || "guest@example.com",
    };

    startTransition(() => {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("auth-token", "fake-jwt-token");
      setIsLoading(false);
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser = { name, email };

    startTransition(() => {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("auth-token", "fake-jwt-token");
      setIsLoading(false);
    });
  };

  const logout = () => {
    startTransition(() => {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("auth-token");
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
