import { useContext } from "react";
import { cartContext } from "../contexts/cartContextInstance";

const CartContext = cartContext
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}