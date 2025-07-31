import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

const Hero = styled.section`
  background: linear-gradient(120deg, #fffbe6 60%, #ffd700 100%);
  padding: 4rem 2rem 2rem 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.8rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
  font-family: 'Poppins', serif;
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 2rem;
`

const CTA = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 32px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px ${props => props.theme.colors.cardShadow};
  transition: background 0.2s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`

const featuredProducts = [
  {
    name: "Gold Necklace Set",
    price: "         ",
    image: "/products/GoldSet.png"
 },
  {
    name: "Gold Earrings",
    price: "22,000",
    image: "/products/GoldEarrings.png"
 },

  {
    name: "Gold Ladies Rings",
    price: "       ",
    image: "/products/GoldRings.png"
 }
]

export default function Home() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        as={Hero}
      >
        <Title>Shree Balaji Gems & Jewellers</Title>
        <Subtitle>
          Exquisite Gold & Silver Jewellery. Trusted since 1985.<br />
          Discover timeless designs for every occasion.
        </Subtitle>
        <CTA to="/products">Shop Now</CTA>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        as={Section}
      >
        <SectionTitle>Featured Collections</SectionTitle>
        <ProductsGrid>
          {featuredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </ProductsGrid>
      </motion.section>
    </>
  )
}