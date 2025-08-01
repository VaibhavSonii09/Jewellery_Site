import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (idx) =>
    setCart((prev) => prev.filter((_, i) => i !== idx));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
