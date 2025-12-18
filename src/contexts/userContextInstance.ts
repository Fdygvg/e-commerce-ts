import { createContext } from "react";
import type { UserContextType } from '../types'

export const userContext = createContext<UserContextType | undefined>(undefined)
