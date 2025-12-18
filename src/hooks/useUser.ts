import { useContext } from "react";
import { userContext } from "../contexts/userContextInstance";

const UserContext = userContext
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}