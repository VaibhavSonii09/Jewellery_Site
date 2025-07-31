import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion' // 1. Import motion

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`

const Story = styled.p`
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 2rem;
`

const Image = styled.img`
  width: 320px;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px ${props => props.theme.colors.cardShadow};
`

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      as={Section}
    >
      <Image src="/products/Shop1.png" alt="Shop" />
      <Title>About Shree Balaji Gems & Jewellers</Title>
      <Story>
        Established in 1985, Shree Jewellers is a family-run business known for trust, quality, and exquisite craftsmanship in gold and silver jewellery. Our designs blend tradition with modern elegance, making every piece a cherished memory.<br /><br />
        Visit us for a personalized experience and discover why generations trust Shree Jewellers for their most precious moments.
      </Story>
    </motion.section>
  )
}
