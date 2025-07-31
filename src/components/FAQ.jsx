import React, { useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  background: #fffbe6;
  border-radius: 16px;
  box-shadow: 0 2px 8px #0001;
  margin-bottom: 2rem;
`
const Q = styled.div`
  font-weight: bold;
  cursor: pointer;
  margin: 1.2rem 0 0.3rem 0;
  color: #b8860b;
  transition: color 0.2s;
  &:hover {
    color: #FFD700;
  }
`
const A = styled.div`
  margin-bottom: 1rem;
  color: #444;
  transition: max-height 0.3s;
`

const faqs = [
  { q: "Is your gold BIS hallmarked?", a: "Yes, all our gold jewellery is BIS hallmarked for purity." },
  { q: "Do you offer custom designs?", a: "Absolutely! Bring your idea or photo and we’ll make it for you." },
  { q: "What is your return policy?", a: "We offer easy returns and exchanges within 7 days of purchase." },
  { q: "Do you provide repair services?", a: "Yes, we offer repair and polishing for all jewellery purchased from us." },
  { q: "Contact? ", a: "Feel free to text or call on 9214332699 😁 or you can share your details in contact tab. " }

]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <Section>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((item, idx) => (
        <div key={idx}>
          <Q onClick={() => setOpen(open === idx ? null : idx)}>{item.q}</Q>
          {open === idx && <A>{item.a}</A>}
        </div>
      ))}
    </Section>
  )
}
