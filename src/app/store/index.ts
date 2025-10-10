"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your User interface
export interface User {
  userId: number;
  email: string;
  username: string;
  profileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define your Auth store interface
interface AuthState {
  user: User | null;
  token: string | null;
  hasHydrated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

// ✅ Zustand store definition with persistence and hydration
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,

      // Sets the user + token in state
      setUser: (user, token) => {
        set({ user, token });
      },

      // Logs out the user (clears store)
      logout: () => {
        set({ user: null, token: null });
      },

      // Used internally for hydration state
      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      onRehydrateStorage: () => (state) => {
        // Called once hydration finishes
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);