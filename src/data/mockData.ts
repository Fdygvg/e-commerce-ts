// src/data/mockData.ts
import type { Product, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 999.99,
    description: "Latest iPhone with advanced camera system and A17 Pro chip.",
    image: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D",
    rating: { rate: 4.8, count: 120 }
  },
  {
    id: 2,
    title: "MacBook Air M2",
    price: 1299.99,
    description: "Super fast laptop with M2 chip, perfect for work and creativity.",
    image: "https://images.unsplash.com/photo-1659135890084-930731031f40?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9vayUyMGFpciUyMG0yfGVufDB8fDB8fHww",
    rating: { rate: 4.7, count: 89 }
  },
  {
    id: 3,
    title: "AirPods Pro",
    price: 249.99,
    description: "Noise cancelling wireless earbuds with spatial audio.",
    image: "https://images.unsplash.com/photo-1668073343175-31e76569eb8f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9kJTIwcHJvfGVufDB8fDB8fHww",
    rating: { rate: 4.5, count: 200 }
  },
  {
    id: 4,
    title: "iPad Pro",
    price: 799.99,
    description: "Powerful tablet for artists, designers, and professionals.",
    image: "https://images.unsplash.com/photo-1662731340335-e5485bd50268?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
    rating: { rate: 4.6, count: 75 }
  },
  {
    id: 5,
    title: "Apple Watch Series 9",
    price: 399.99,
    description: "Stay connected, track fitness, and monitor health.",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    rating: { rate: 4.4, count: 150 }
  },
  {
    id: 6,
    title: "Sony WH-1000XM5",
    price: 299.99,
    description: "Premium noise cancelling headphones with exceptional sound.",
    image: "https://images.unsplash.com/photo-1755719401908-8612266b10c2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U29ueSUyMFdILTEwMDBYTTV8ZW58MHx8MHx8fDA%3D",
    rating: { rate: 4.3, count: 95 }
  }
];

export const mockUser: User = {
  id: "user_001",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://media.istockphoto.com/id/2194078950/photo/profile-picture-of-smiling-confident-arabic-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=42Z7FDi1u5Ogevtd0xMUkTWM7hDzrre4YOlbHKvK_T8=",
  address: "123 Tech Street, Digital City"
};

export const featuredProducts = mockProducts.slice(0, 3);
export const bestSellers = mockProducts.slice(2, 5);