// src/components/ProductCard.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Modal from 'react-modal'

// Styled components
const Card = styled.div`
  background: ${props => props.theme.colors.card};
  box-shadow: 0 4px 16px ${props => props.theme.colors.cardShadow};
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`

const Info = styled.div`
  padding: 1rem;
`

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`

const Price = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size: 1.1rem;
`

// Animated Add to Cart Button
const AddToCartButton = styled(motion.button)`
  padding: 12px 32px;
  border-radius: 8px;
  border: none;
  background: #fff;
  color: #b4884a;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-top: 12px;
  transition: background 0.2s, color 0.2s;
  display: inline-block;
`;

export default function ProductCard({ product, onAddToCart }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedMsg, setAddedMsg] = useState(false)

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart({ ...product, quantity }); // <-- pass quantity!
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 1500);
    setModalOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.4 }}
        as={Card}
        onClick={() => setModalOpen(true)}
      >
        <Image src={product.image} alt={product.name} />
        <Info>
          <Title>{product.name}</Title>
          <Price>₹{product.price}</Price>
        </Info>
      </motion.div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            maxWidth: 400,
            margin: "auto",
            borderRadius: 16,
            padding: 24,
            textAlign: "center"
          }
        }}
        ariaHideApp={false}
      >
        <h2>{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
        />
        <p style={{ margin: "1rem 0" }}>Price: ₹{product.price}</p>
        <div style={{ margin: "1rem 0" }}>
          <label>
            Quantity:{" "}
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              style={{
                width: 60,
                padding: "0.3rem",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
                textAlign: "center"
              }}
            />
          </label>
        </div>
        <AddToCartButton
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.08, backgroundColor: "#b4884a", color: "#fff" }}
          transition={{ type: "spring", stiffness: 400 }}
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          🛒 Add to Cart
        </AddToCartButton>
        {addedMsg && (
          <div style={{ color: "#25D366", marginTop: 12, fontWeight: 600 }}>
            Item added to cart!
          </div>
        )}
        <br />
        <button
          onClick={() => setModalOpen(false)}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: 8,
            background: "#FFD700",
            color: "#222",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 16
          }}
        >
          Close
        </button>
      </Modal>
    </>
  )
}