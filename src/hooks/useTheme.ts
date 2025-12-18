import { useContext } from "react";
import { themeContext } from "../contexts/themeContextInstance";

const ThemeContext = themeContext
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}