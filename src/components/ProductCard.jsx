// src/components/ProductCard.jsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from 'react-modal'

// Styled components
const Card = styled.div`
  background: white;
  border-radius: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;
  
  &:hover {
    border-color: #e0e0e0;
  }
`

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const Info = styled.div`
  padding: 1rem 0;
  text-align: center;
`

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  line-height: 1.4;
`

const Price = styled.div`
  color: #333;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const Material = styled.div`
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`

const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #000;
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`

const QuickActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
  
  ${Card}:hover & {
    opacity: 1;
  }
`

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    background: #000;
    color: white;
    transform: scale(1.1);
  }
`

const StockStatus = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: ${props => props.inStock ? '#4CAF50' : '#ff4444'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`

const AddToCartButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border: 1px solid #000;
  background: #000;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: white;
    color: #000;
  }
  
  &:disabled {
    background: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ProductImage = styled.img`
  width: 100%;
  border-radius: 0;
  box-shadow: none;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ProductTitle = styled.h1`
  color: #333;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.3;
`

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`

const ProductDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
`

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DetailValue = styled.span`
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
`

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`

const QuantityInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  font-size: 1rem;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`

const CloseModalButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`

export default function ProductCard({ product, onAddToCart }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedMsg, setAddedMsg] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  // Generate random rating for demo
  const rating = Math.floor(Math.random() * 2) + 4 // 4-5 stars
  const reviews = Math.floor(Math.random() * 100) + 10
  const inStock = Math.random() > 0.2 // 80% chance of being in stock
  const isNew = Math.random() > 0.7 // 30% chance of being new

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart({ ...product, quantity });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 1500);
    setModalOpen(false);
    setQuantity(1);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        as={Card}
        onClick={() => setModalOpen(true)}
      >
        <Image src={product.image} alt={product.name} />
        
        {isNew && <Badge>New</Badge>}
        <StockStatus inStock={inStock}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </StockStatus>
        
        <QuickActions>
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist();
            }}
          >
            {wishlist ? '❤️' : '🤍'}
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            👁️
          </ActionButton>
        </QuickActions>
        
        <Info>
          <Title>{product.name}</Title>
          <Price>₹{product.price}</Price>
          <Material>14k Gold</Material>
        </Info>
      </motion.div>
      
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            maxWidth: 800,
            margin: "auto",
            borderRadius: 0,
            padding: "2rem",
            border: "none",
            background: "white"
          },
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)"
          }
        }}
        ariaHideApp={false}
      >
        <ModalHeader>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Product Details</h2>
          <CloseModalButton onClick={() => setModalOpen(false)}>×</CloseModalButton>
        </ModalHeader>
        
        <ProductDetails>
          <ProductImage src={product.image} alt={product.name} />
          <ProductInfo>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductPrice>₹{product.price}</ProductPrice>
            
            <ProductDescription>
              Beautiful handcrafted jewellery piece. Perfect for special occasions and daily wear. 
              Made with premium materials and excellent craftsmanship.
            </ProductDescription>
            
            <DetailsGrid>
              <DetailItem>
                <DetailLabel>Material</DetailLabel>
                <DetailValue>14k Gold</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Stone</DetailLabel>
                <DetailValue>Natural Diamond</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Length</DetailLabel>
                <DetailValue>11.2 mm</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Thickness</DetailLabel>
                <DetailValue>1.6 mm</DetailValue>
              </DetailItem>
            </DetailsGrid>
            
            <QuantitySection>
              <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                Quantity:
              </label>
              <QuantityInput
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
              />
            </QuantitySection>
            
            <AddToCartButton
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </AddToCartButton>
            
            {addedMsg && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: "#4CAF50", marginTop: 12, fontWeight: 600 }}
              >
                Item added to cart!
              </motion.div>
            )}
          </ProductInfo>
        </ProductDetails>
      </Modal>
    </>
  )
}