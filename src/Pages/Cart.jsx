// src/Pages/Cart.jsx
import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

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

const CheckoutSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ffd700;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Total = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #b4884a;
  margin-bottom: 1rem;
`;

const CheckoutButton = styled.button`
  padding: 1rem 2.5rem;
  background: #b4884a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffd700;
    color: #b4884a;
  }
`;

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotifications();

  // Calculate total price (assumes price is a string like "₹2500" or "2500")
  const total = cart.reduce((sum, item) => {
    const price = parseInt((item.price || "0").replace(/[^\d]/g, ""), 10);
    return sum + (isNaN(price) ? 0 : price) * (item.quantity || 1);
  }, 0);

  // Razorpay payment handler
  function handleRazorpayPayment(amount) {
    const options = {
      key: "rzp_test_YcmQRzQyNQfxJe", // <-- Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Shree Balaji Gems & Jewellers",
      description: "Jewellery Purchase",
      image: "/logo.png", // Optional: your logo
      handler: function (response) {
        // Add order to orders list
        const newOrder = addOrder(cart, amount);
        
        showSuccess(`Payment successful! Order #${newOrder.id} has been placed.`);
        // Clear cart after successful payment
        clearCart();
        // Navigate to orders page using React Router
        navigate("/orders");
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#b4884a",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <CartSection>
      <CartTitle>🛒 Your Cart</CartTitle>
      {cart.length === 0 ? (
        <div style={{ color: "#b4884a" }}>Your cart is empty.</div>
      ) : (
        <>
          <CartList>
            {cart.map((item, idx) => (
              <CartItem key={idx}>
                <img src={item.image} alt={item.name} />
                <span>
                  {item.name} {item.price && <>- {item.price}</>}
                  {item.quantity && <> x {item.quantity}</>}
                </span>
                <button onClick={() => removeFromCart(idx)}>Remove</button>
              </CartItem>
            ))}
          </CartList>
          <CheckoutSection>
            <Total>Total: ₹{total.toLocaleString()}</Total>
            <CheckoutButton onClick={() => handleRazorpayPayment(total)}>
              Pay with Razorpay
            </CheckoutButton>
          </CheckoutSection>
        </>
      )}
    </CartSection>
  );
}