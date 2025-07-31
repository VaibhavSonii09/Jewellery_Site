import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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
    <motion.footer
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      as={FooterContainer}
    >
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
      <div>© {new Date().getFullYear()} Shree Balaji Gems & Jewellers. All rights reserved.</div>
    </motion.footer>
  )
}
