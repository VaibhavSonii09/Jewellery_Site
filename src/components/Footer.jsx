import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.footer};
  color: #fff;
  text-align: center;
  padding: 2rem 1rem 1rem 1rem;
  margin-top: 3rem;
`

const Socials = styled.div`
  margin-bottom: 1rem;
  a {
    margin: 0 0.5rem;
    color: #fff;
    font-size: 1.5rem;
    transition: color 0.2s;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`

export default function Footer() {
  return (
    <FooterContainer>
      <Socials>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </Socials>
      <div>© {new Date().getFullYear()} Your Shop Name. All rights reserved.</div>
    </FooterContainer>
  )
}
