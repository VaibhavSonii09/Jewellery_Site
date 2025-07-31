import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Card = styled.div`
  background: ${props => props.theme.colors.card};
  box-shadow: 0 4px 16px ${props => props.theme.colors.cardShadow};
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s;
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

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.4 }}
      as={Card}
    >
      <Image src={product.image} alt={product.name} />
      <Info>
        <Title>{product.name}</Title>
        <Price>₹{product.price}</Price>
      </Info>
    </motion.div>
  )
}
