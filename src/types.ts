// types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  rating?: { rate: number; count: number; }
}
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  avatar: string;
  id: string;
  name: string;
  email: string;
  address?: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  type: 'credit' | 'debit' | 'paypal';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';