// src/Pages/OrderedItems.jsx
import React from "react";
import styled from "styled-components";
import { useOrders } from "../context/OrderContext";

const OrdersSection = styled.section`
  background: #fffbe6;
  border: 1px solid #ffd700;
  border-radius: 16px;
  margin: 2rem auto 1rem auto;
  max-width: 800px;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px #ffd70022;
`;

const OrdersTitle = styled.h2`
  font-size: 1.5rem;
  color: #b4884a;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid #ffd700;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ffd700;
`;

const OrderId = styled.span`
  font-weight: bold;
  color: #b4884a;
  font-size: 1.1rem;
`;

const OrderDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const OrderTime = styled.span`
  color: #999;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const OrderStatus = styled.span`
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#4CAF50';
      case 'processing': return '#FF9800';
      case 'shipped': return '#2196F3';
      default: return '#9E9E9E';
    }
  }};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const OrderItems = styled.div`
  margin-bottom: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    font-weight: bold;
    color: #333;
  }
  
  .item-price {
    color: #666;
    font-size: 0.9rem;
  }
`;

const OrderTotal = styled.div`
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  color: #b4884a;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ffd700;
`;

const PaymentMethod = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
  text-align: right;
`;

const EmptyOrders = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-size: 1.1rem;
`;

export default function OrderedItems() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <OrdersSection>
        <OrdersTitle>📦 Your Orders</OrdersTitle>
        <EmptyOrders>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
          <div>No orders yet.</div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#999" }}>
            Your completed orders will appear here.
          </div>
        </EmptyOrders>
      </OrdersSection>
    );
  }

  return (
    <OrdersSection>
      <OrdersTitle>📦 Your Orders</OrdersTitle>
      {orders.map((order, index) => (
        <OrderCard key={order.id || index}>
          <OrderHeader>
            <OrderId>Order #{order.id || `ORD${String(index + 1).padStart(4, '0')}`}</OrderId>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <OrderDate>
                {new Date(order.date).toLocaleDateString()}
                <OrderTime>
                  {new Date(order.date).toLocaleTimeString()}
                </OrderTime>
              </OrderDate>
              <OrderStatus status={order.status}>{order.status}</OrderStatus>
            </div>
          </OrderHeader>
          
          <OrderItems>
            {order.items.map((item, itemIndex) => (
              <OrderItem key={itemIndex}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">
                    {item.price} {item.quantity && `x ${item.quantity}`}
                  </div>
                </div>
              </OrderItem>
            ))}
          </OrderItems>
          
          <OrderTotal>
            Total: ₹{order.total.toLocaleString()}
            <PaymentMethod>
              Payment Method: Razorpay
            </PaymentMethod>
          </OrderTotal>
        </OrderCard>
      ))}
    </OrdersSection>
  );
} 