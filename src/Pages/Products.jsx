import React, { useState } from 'react'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'
import { motion } from "framer-motion"
import GoogleReviewsWidget from '../components/GoogleReviewsWidget'
import { useCart } from '../context/CartContext' // <-- import useCart

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`

const Tab = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : '#eee'};
  color: ${props => props.active ? '#fff' : '#222'};
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: #fff;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`

const goldProducts = [
  {
    name: "Gold Necklace Set",
    price: "72500",
    image: "/products/GoldSet.png"
  },
  {
    name: "Gold Rings",
    price: "24500",
    image: "/products/GoldRings.png"
  },
  {
    name: "Ladies Gold Ring",
    price: "28900",
    image: "/products/LadiesFashionRingGold.jpeg"
  },
  {
    name: "Pendant Set",
    price: "122000",
    image: "/products/GoldEarrings.png"
  },
  {
    name: "Haar",
    price: "80700",
    image: "/products/goldHaar.jpeg"
  },
  // --- New Gold Products with Unsplash images ---
  {
    name: "Gold Bangle",
    price: "18,000",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gold Chain",
    price: "22,500",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gold Stud Earrings",
    price: "9,500",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  }
]

const silverProducts = [
  {
    name: "Bacchha Kada",
    price: "1800",
    image: "/products/BaccheKade.png"
  },
  {
    name: " Kade",
    price: "4999",
    image: "/products/SilverKade.png"
  },
  {
    name: " Flower Pattern Ring",
    price: "1499",
    image: "/products/SilverFlowerPatternRing.png"
  },
  {
    name: "Kitchen Set",
    price: "20049",
    image: "/products/KitchenSet.png"
  },
  {
    name: "Pooja Set",
    price: "15000",
    image: "/products/PoojaSet.png"
  },
  {
    name: "Payal",
    price: "6000",
    image: "/products/Payal.png"
  },
  // --- New Silver Products with Unsplash images ---
  {
    name: "Silver Pendant",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Silver Earrings",
    price: "3,200",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Silver Bracelet",
    price: "4,800",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  }
]

export default function Products() {
  const [tab, setTab] = useState('gold')
  const products = tab === 'gold' ? goldProducts : silverProducts
  const { addToCart } = useCart(); // <-- get addToCart from context

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      as={Section}
    >
      <GoogleReviewsWidget />
      <Tabs>
        <Tab active={tab === 'gold'} onClick={() => setTab('gold')}>Gold</Tab>
        <Tab active={tab === 'silver'} onClick={() => setTab('silver')}>Silver</Tab>
      </Tabs>
      <ProductsGrid as={motion.div}>
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
          >
            <ProductCard
              product={product}
              onAddToCart={productWithQty => addToCart(productWithQty)}
            />
          </motion.div>
        ))}
      </ProductsGrid>
    </motion.section>
  )
}