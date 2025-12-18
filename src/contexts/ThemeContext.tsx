// src/contexts/ThemeContext.tsx
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react'
import { themeContext } from './themeContextInstance';
import type { Theme } from '../types';


const ThemeContext = themeContext

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Get theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  const isDark = theme === 'dark';

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#1a1a1a');
      root.style.setProperty('--bg-secondary', '#2d2d2d');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#b3b3b3');
      root.style.setProperty('--border-color', '#404040');
      root.style.setProperty('--card-bg', '#2d2d2d');
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--accent-color', '#8b5cf6');
      root.style.setProperty('--hero-bg-start', '#1e1b4b');
      root.style.setProperty('--hero-bg-end', '#312e81');
    } else {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8f9fa');
      root.style.setProperty('--text-primary', '#333333');
      root.style.setProperty('--text-secondary', '#666666');
      root.style.setProperty('--border-color', '#dddddd');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--accent-color', '#667eea');
      root.style.setProperty('--hero-bg-start', '#667eea');
      root.style.setProperty('--hero-bg-end', '#764ba2');
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

