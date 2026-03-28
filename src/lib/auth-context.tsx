"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { UserProfile } from "./types";
import { generateId } from "./utils";

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  signUp: (data: Partial<UserProfile>) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  logIn: (email: string) => UserProfile | null;
  logOut: () => void;
  isOnboarded: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "firstgen_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setIsLoading(false);
  }, []);

  const persistUser = useCallback((profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, []);

  const signUp = useCallback(
    (data: Partial<UserProfile>) => {
      const newUser: UserProfile = {
        id: generateId(),
        email: data.email ?? "",
        name: data.name ?? "",
        university: data.university ?? "",
        countryOfOrigin: "",
        primaryCurrency: "USD",
        visaType: "student",
        hasSSN: false,
        hasBankAccount: false,
        sendsMoneyHome: "no",
        financialConcerns: [],
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
        ...data,
      };
      persistUser(newUser);
    },
    [persistUser]
  );

  const updateProfile = useCallback(
    (data: Partial<UserProfile>) => {
      if (!user) return;
      const updated = { ...user, ...data };
      persistUser(updated);
    },
    [user, persistUser]
  );

  const logIn = useCallback((email: string) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const profile: UserProfile = JSON.parse(stored);
        if (profile.email === email) {
          setUser(profile);
          return profile;
        }
      }
    } catch {
      // ignore
    }
    return null;
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    // Keep data in localStorage for demo purposes
  }, []);

  const isOnboarded = user?.onboardingComplete ?? false;

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, updateProfile, logIn, logOut, isOnboarded }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
