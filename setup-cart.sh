#!/bin/bash

# Create context directory and CartContext.jsx
mkdir -p src/context
cat > src/context/CartContext.jsx << 'EOF'
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
EOF

# Create Pages directory and Cart.jsx
mkdir -p src/Pages
cat > src/Pages/Cart.jsx << 'EOF'
import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const CartSection = styled.section`
  background: #fffbe6;
  border: 1px solid #ffd700;
  border-radius: 16px;
  margin: 2rem auto 1rem auto;
  max-width: 700px;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px #ffd70022;
`;

const CartTitle = styled.h2`
  font-size: 1.3rem;
  color: #b4884a;
  margin-bottom: 1rem;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
  }
  span {
    flex: 1;
  }
  button {
    background: #ffd700;
    border: none;
    border-radius: 6px;
    padding: 0.2rem 0.7rem;
    margin-left: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    color: #b4884a;
  }
`;

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <CartSection>
      <CartTitle>🛒 Your Cart</CartTitle>
      {cart.length === 0 ? (
        <div style={{ color: "#b4884a" }}>Your cart is empty.</div>
      ) : (
        <CartList>
          {cart.map((item, idx) => (
            <CartItem key={idx}>
              <img src={item.image} alt={item.name} />
              <span>{item.name} {item.price && <>- ₹{item.price}</>}</span>
              <button onClick={() => removeFromCart(idx)}>Remove</button>
            </CartItem>
          ))}
        </CartList>
      )}
    </CartSection>
  );
}
EOF

echo "Files created:"
echo " - src/context/CartContext.jsx"
echo " - src/Pages/Cart.jsx"
echo ""
echo "Now:"
echo "1. Wrap your <App /> in <CartProvider> (see previous instructions)."
echo "2. Add a <Route path=\"/cart\" element={<Cart />} /> to your router."
echo "3. Use the useCart() hook in your Home/ProductCard to add items to cart."
echo "4. Add a link to /cart in your Navbar."

