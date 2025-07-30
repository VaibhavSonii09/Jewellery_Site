import React, { useState } from 'react'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'

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
    price: "         ",
    image: "/products/GoldSet.png"
  },
  {
    name: "Gold Rings",
    price: "       ",
    image: "/products/GoldRings.png"
  },
  {
    name: "Ladies Gold Ring",
    price: "    ",
    image: "/products/LadiesFashionRingGold.jpeg"
 },
  {
    name: "Gold Earrings",
    price: "        ",
    image: "/products/GoldEarrings.png"
  },
  {
    name: "          ",
    price: "        ",
    image: "          "
  },
  {
    name: "          ",
    price: "        ",
    image: "          "
  },
  {
    name: "          ",
    price: "        ",
    image: "          "
  },{
    name: "          ",
    price: "        ",
    image: "          "
  }
  
]

const silverProducts = [
  {
    name: "Bacchha Kada",
    price: "          ",
    image: "/products/BaccheKade.png"
  },
  {
    name: " Kade",
    price: "     ",
    image: "/products/SilverKade.png"
  },
  {
    name: " Flower Pattern Ring",
    price: "        ",
    image: "/products/SilverFlowerPatternRing.png"
  },
  {
    name: "Kitchen Set",
    price: "        ",
    image: "/products/KitchenSet.png"
  },
  {
    name: "Pooja Set",
    price: "        ",
    image: "/products/PoojaSet.png"
  },
  {
    name: "Payal",
    price: "        ",
    image: "/products/Payal.png"
  }
]

export default function Products() {
  const [tab, setTab] = useState('gold')
  const products = tab === 'gold' ? goldProducts : silverProducts

  return (
    <Section>
      <Tabs>
        <Tab active={tab === 'gold'} onClick={() => setTab('gold')}>Gold</Tab>
        <Tab active={tab === 'silver'} onClick={() => setTab('silver')}>Silver</Tab>
      </Tabs>
      <ProductsGrid>
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </ProductsGrid>
    </Section>
  )
}
