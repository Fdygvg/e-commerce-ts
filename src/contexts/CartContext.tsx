import React, { useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product, CartItem } from "../types";
import type { CartContextType } from "../types";
import { cartContext } from "./cartContextInstance";

// 1. Define the shape of our context

// 2. Create context with default values
export const CartContext = cartContext;

// 3. Define actions for useReducer (TypeScript union type)
type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | {
    type: "UPDATE_QUANTITY";
    payload: { productId: number; quantity: number };
  }
  | { type: "CLEAR_CART" };

// 4. Reducer function (handles state updates)
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return state.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product: action.payload, quantity: 1 }];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.product.id !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

// 5. Helper function to load cart from localStorage
function loadCartFromStorage(): CartItem[] {
  try {
    const savedCart = localStorage.getItem("ecommerce-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
}

// 6. Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Initialize cart with saved data from localStorage
  const [items, dispatch] = useReducer(cartReducer, [], loadCartFromStorage);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ecommerce-cart", JSON.stringify(items));
  }, [items]);

  // Helper functions
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // Context value
  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems: getCartCount,
    getTotalPrice: getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
