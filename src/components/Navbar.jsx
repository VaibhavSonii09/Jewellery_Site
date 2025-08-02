// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const Nav = styled.nav`
  background: #fffbe6;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px #ffd70022;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #b4884a;
  text-decoration: none;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #b4884a;
  display: none;
  @media (max-width: 700px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 700px) {
    display: ${props => (props.open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100vw;
    background: #fffbe6;
    padding: 2rem 0;
    box-shadow: 0 2px 8px #ffd70022;
    z-index: 99;
  }
`;

const CartBadge = styled.span`
  background: #ffd700;
  color: #b4884a;
  border-radius: 50%;
  padding: 0.2em 0.6em;
  font-size: 0.9em;
  font-weight: bold;
  margin-left: 0.3em;
`;

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (for mobile)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <Nav>
      <Logo to="/">Jewellery Shop</Logo>
      <MenuButton onClick={() => setMenuOpen(m => !m)}>
        ☰
      </MenuButton>
      <NavLinks open={menuOpen}>
        <Link to="/" onClick={handleLinkClick}>Home</Link>
        <Link to="/products" onClick={handleLinkClick}>Products</Link>
        <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
        <Link to="/about" onClick={handleLinkClick}>About</Link>
        <Link to="/all-products" onClick={handleLinkClick}>All Products</Link>
        <Link to="/cart" onClick={handleLinkClick}>
          Cart
          {cart.length > 0 && <CartBadge>{cart.length}</CartBadge>}
        </Link>
      </NavLinks>
    </Nav>
  );
}