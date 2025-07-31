import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Nav = styled.nav`
  background: ${props => props.theme.colors.nav};
  box-shadow: 0 2px 8px ${props => props.theme.colors.cardShadow};
  padding: 0.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  height: 48px;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`

const StyledLink = styled(Link)`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  border-bottom: ${props => props.active ? `2px solid ${props.theme.colors.primary}` : 'none'};
  transition: color 0.2s;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

export default function Navbar() {
  const location = useLocation()
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      as={Nav}
    >
      <Link to="/">
        <Logo src="/logo.png" alt="Jewellery Shop Logo" />
      </Link>
      <NavLinks>
        <StyledLink to="/" active={location.pathname === "/"}>Home</StyledLink>
        <StyledLink to="/products" active={location.pathname === "/products"}>Products</StyledLink>
        <StyledLink to="/about" active={location.pathname === "/about"}>About</StyledLink>
        <StyledLink to="/contact" active={location.pathname === "/contact"}>Contact</StyledLink>
        <StyledLink to="/all-products" active={location.pathname === "/all-products"}>All Products</StyledLink>
      </NavLinks>
    </motion.nav>
  )
}
