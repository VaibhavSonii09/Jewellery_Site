import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderItems, totalAmount) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      items: orderItems,
      total: totalAmount,
      status: 'processing' // Can be: processing, shipped, completed
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
} 