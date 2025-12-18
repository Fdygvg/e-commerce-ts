// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import type { Order, OrderStatus } from '../types';

// Generate mock orders for demonstration
function generateMockOrders(): Order[] {
  const statuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered'];
  const mockProducts = [
    { id: 1, title: "iPhone 15 Pro", price: 999.99, image: "https://images.unsplash.com/photo-1695048132832-b41495f12eb4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D" },
    { id: 2, title: "MacBook Air M2", price: 1299.99, image: "https://images.unsplash.com/photo-1659135890084-930731031f40?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9vayUyMGFpciUyMG0yfGVufDB8fDB8fHww" },
    { id: 3, title: "AirPods Pro", price: 249.99, image: "https://images.unsplash.com/photo-1668073343175-31e76569eb8f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9kJTIwcHJvfGVufDB8fDB8fHww" },
    { id: 4, title: "iPad Pro", price: 799.99, image: "https://images.unsplash.com/photo-1662731340335-e5485bd50268?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D" },
  ];

  const orders: Order[] = [];
  
  // Generate 5 mock orders
  for (let i = 0; i < 5; i++) {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - i * 7); // Orders from past weeks
    
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
    
    orders.push({
      id: `ORD-${1000 + i}`,
      userId: "user_001",
      items: [
        {
          product: mockProducts[i % mockProducts.length],
          quantity: Math.floor(Math.random() * 3) + 1
        },
        {
          product: mockProducts[(i + 1) % mockProducts.length],
          quantity: 1
        }
      ],
      total: 1200 + (i * 200),
      shippingAddress: {
        fullName: "Alex Johnson",
        street: `${i + 1}${i % 2 === 0 ? '23' : '45'} Main St`,
        city: "New York",
        state: "NY",
        zipCode: "1000" + i,
        country: "United States",
        phone: "(555) 123-4567"
      },
      paymentMethod: {
        type: i % 2 === 0 ? 'credit' : 'paypal',
        cardNumber: i % 2 === 0 ? '**** **** **** 1234' : undefined,
        paypalEmail: i % 2 === 1 ? 'alex@example.com' : undefined
      },
      status: statuses[i % statuses.length],
      orderDate: orderDate.toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      trackingNumber: i > 1 ? `TRACK-${10000 + i}` : undefined
    });
  }
  
  return orders;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  // Load orders from localStorage or generate mock data
  useEffect(() => {
    try {
      setLoading(true);
      
      // Try to get from localStorage first
      const savedOrders = localStorage.getItem('userOrders');
      
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Generate mock orders for first-time users
        const mockOrders = generateMockOrders();
        setOrders(mockOrders);
        localStorage.setItem('userOrders', JSON.stringify(mockOrders));
      }
      
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get filtered orders
  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  // Add a new order (called from checkout)
  const addOrder = (order: Omit<Order, 'id' | 'orderDate' | 'estimatedDelivery'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now().toString().slice(-8)}`,
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // +5 days
      trackingNumber: `TRACK-${Math.floor(Math.random() * 90000) + 10000}`
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
    
    return newOrder;
  };

  // Cancel an order (only if pending)
  const cancelOrder = (orderId: string) => {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    if (orders[orderIndex].status !== 'pending') {
      throw new Error('Only pending orders can be cancelled');
    }
    
    const updatedOrders = [...orders];
    updatedOrders[orderIndex] = {
      ...updatedOrders[orderIndex],
      status: 'cancelled' as OrderStatus
    };
    
    setOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  };

  // Track order
  const trackOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order?.trackingNumber) {
      throw new Error('No tracking available');
    }
    return order.trackingNumber;
  };

  // Get order by ID
  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return {
    orders: filteredOrders,
    allOrders: orders,
    loading,
    error,
    filter,
    setFilter,
    addOrder,
    cancelOrder,
    trackOrder,
    getOrderById,
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };
}