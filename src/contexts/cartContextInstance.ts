import { createContext } from "react";
import type { CartContextType } from '../types'

export const cartContext = createContext<CartContextType | undefined>(undefined)
