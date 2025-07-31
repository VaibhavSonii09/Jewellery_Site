// src/pages/AllProducts.jsx
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import GoogleReviewsWidget from '../components/GoogleReviewsWidget'

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 1.2rem;
`

const ProductItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  color: #444;
  font-weight: 500;
`

const allProducts = [
  { name: "Gold Necklace Set" },
  { name: "Gold Ring" },
  { name: "Silver Payal" },
  { name: "Silver Bracelet" },
  { name: "Diamond Earrings" },
  { name: "Silver Chain" },
  { name: "Gold Bangles" },
  { name: "Gold Necklace Set" },
  { name: "Gold Ring" },
  { name: "Silver Payal" },
  { name: "Silver Bracelet" },
  { name: "Diamond Earrings" },
  { name: "Silver Chain" },
  { name: "Gold Necklace Set" },
  { name: "Gold Ring" },
  { name: "Silver Payal" },
  { name: "Silver Bracelet" },
  { name: "Diamond Earrings" },
  { name: "Silver Chain" },
  { name: "Gold Bangles" }
  // Add as many as you want!
]

export default function AllProducts() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      as={Section}
    >
    <GoogleReviewsWidget />
    
      <SectionTitle>All Product Names</SectionTitle>
      <ProductList>
        {allProducts.map((product, idx) => (
          <motion.li
            key={idx}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.04 }}
            as={ProductItem}
          >
            {product.name}
          </motion.li>
        ))}
      </ProductList>
    </motion.section>
  )
}
