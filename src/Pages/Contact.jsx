// src/pages/Contact.jsx
import React, { useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px ${props => props.theme.colors.cardShadow};
`

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`

const Textarea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-height: 100px;
`

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`

const Info = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: #444;
  font-size: 1.1rem;
`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    // Here you can integrate with email service or backend
  }

  return (
    <Section>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Send Message</Button>
      </Form>
      {submitted && <Info>Thank you for contacting us! We will get back to you soon.</Info>}
      <Info>
        <div>Shree Balaji Gems & Jewellers, Shivaji Park, Alwar</div>
        <div>Phone: +91-9214332699</div>
        <div>Email: rksoni1946@gmail.com</div>
        <div>
          <iframe
            title="Shop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d442.015687398984!2d76.61467171226205!3d27.589638498982804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397299335a6b4ad3%3A0x6e1d2bce6739db32!2sShree%20Balaji%20Gems%20%26%20Jewellers!5e0!3m2!1sen!2sin!4v1753862294168!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '12px', marginTop: '1rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Info>
    </Section>
  )
}