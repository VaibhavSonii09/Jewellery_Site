// src/pages/AllProducts.jsx
import React from 'react'
import styled from 'styled-components'

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

  // Add more products here


export default function AllProducts() {
  return (
    <Section>
      <SectionTitle>All Product Names</SectionTitle>
      <ProductList>
        {allProducts.map((product, idx) => (
          <ProductItem key={idx}>{product.name}</ProductItem>
        ))}
      </ProductList>
    </Section>
  )
}
