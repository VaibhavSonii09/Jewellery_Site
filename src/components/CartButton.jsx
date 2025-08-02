// src/components/CartButton.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartButtonContainer = styled.div`
  position: fixed;
  top: 130px;
  right: 32px;
  z-index: 1000;
  cursor: pointer;
`;

const CartButtonStyled = styled.button`
  background: rgb(223, 144, 34);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: #ffd700;
    color: #b4884a;
    transform: scale(1.1);
  }
`;

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
`;

const CartModal = styled.div`
  position: fixed;
  top: 195px;
  right: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
  border: 1px solid #ffd700;
`;

const CartHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ffd700;
  background: #fffbe6;
  border-radius: 12px 12px 0 0;
  font-weight: bold;
  color: #b4884a;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 0.75rem;
  }
  
  .item-details {
    flex: 1;
    font-size: 0.9rem;
  }
  
  .remove-btn {
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;

const CartFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #ffd700;
  background: #fffbe6;
  border-radius: 0 0 12px 12px;
`;

const ViewCartButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #b4884a;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #ffd700;
    color: #b4884a;
  }
`;

export default function CartButton() {
  const { cart, removeFromCart, addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Ensure cart is always an array
  const cartItems = Array.isArray(cart) ? cart : [];

  const total = cartItems.reduce((sum, item) => {
    const price = parseInt((item.price || "0").replace(/[^\d]/g, ""), 10);
    return sum + (isNaN(price) ? 0 : price) * (item.quantity || 1);
  }, 0);

  return (
    <>
      <CartButtonContainer>
        <CartButtonStyled onClick={() => setIsOpen(!isOpen)}>
          🛒
          {cartItems.length > 0 && <CartBadge>{cartItems.length}</CartBadge>}
        </CartButtonStyled>
      </CartButtonContainer>
      
      {isOpen && (
        <CartModal>
          <CartHeader>
            🛒 Cart ({cartItems.length} items)
          </CartHeader>
          
          
          {cartItems.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
              Your cart is empty
            </div>
          ) : (
            <>
              {cartItems.map((item, idx) => (
                <CartItem key={idx}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <div style={{ fontWeight: "bold" }}>{item.name}</div>
                    <div style={{ color: "#666", fontSize: "0.8rem" }}>
                      {item.price} {item.quantity && `x ${item.quantity}`}
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(idx)}
                  >
                    ×
                  </button>
                </CartItem>
              ))}
              
              <CartFooter>
                <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Total: ₹{total.toLocaleString()}
                </div>
                <ViewCartButton onClick={() => {
                  setIsOpen(false);
                  // Navigate to cart page using React Router
                  navigate("/cart");
                }}>
                  View Cart
                </ViewCartButton>
              </CartFooter>
            </>
          )}
        </CartModal>
      )}
    </>
  );
} 