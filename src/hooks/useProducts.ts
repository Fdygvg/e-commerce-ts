// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import type { Product } from '../types';

const API_BASE = 'https://fakestoreapi.com';

export function useProducts() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/products/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products or products by category
  const fetchProducts = async (category?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = category 
        ? `${API_BASE}/products/category/${encodeURIComponent(category)}`
        : `${API_BASE}/products`;
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      setSelectedCategory(category || null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products on initial load
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return {
    categories,
    products,
    selectedCategory,
    loading,
    error,
    fetchProducts,
    fetchCategories,
  };
}