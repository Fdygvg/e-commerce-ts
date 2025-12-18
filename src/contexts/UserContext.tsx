// src/contexts/UserContext.tsx
import React, { useState } from 'react';
import type { ReactNode } from "react";
import type { User } from '../types';
import  { mockUser } from '../data/mockData';
import type { UserContextType } from "../types";
import { userContext } from "./userContextInstance";



const UserContext = userContext

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  // Always logged in with mock user (for frontend simulation)
  const [user, setUser] = useState<User | null>(mockUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const login = () => {
    setUser(mockUser);
    setIsLoggedIn(true);
    console.log('User logged in:', mockUser.name);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
      console.log('Profile updated:', updates);
    }
  };

  const value: UserContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

