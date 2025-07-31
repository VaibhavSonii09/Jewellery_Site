import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background: #fffbe6;
  padding: 3rem 2rem;
  text-align: center;
  margin: 2rem 0;
`
const Testimonial = styled.div`
  margin: 1.5rem auto;
  max-width: 500px;
  font-style: italic;
  color: #555;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 1.5rem;
`
const Name = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  color: #b8860b;
`

const testimonials = [
  { text: "Beautiful designs and very trustworthy shop. Highly recommended!", name: "Priya Sharma" },
  { text: "Excellent service and quality. I always buy my jewellery here.", name: "Rahul Jain" }
]

export default function Testimonials() {
  return (
    <Section>
      <h2>What Our Customers Say</h2>
      {testimonials.map((t, idx) => (
        <Testimonial key={idx}>
          “{t.text}”
          <Name>- {t.name}</Name>
        </Testimonial>
      ))}
    </Section>
  )
}