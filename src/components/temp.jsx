import React from 'react'
import styled from 'styled-components'

const Button = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #25d366;
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 4px 16px #0002;
  z-index: 999;
  transition: background 0.2s;
  &:hover {
    background: #128c7e;
  }
`

export default function WhatsappButton() {
  return (
    <Button
      href="https://wa.me/919214332699"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </Button>
  )
}
