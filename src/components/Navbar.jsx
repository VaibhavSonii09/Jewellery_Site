// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Nav = styled.nav`
  background: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  
  a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
    transition: color 0.2s;
    
    &:hover {
      color: #000;
    }
  }
  
  @media (max-width: 700px) {
    display: ${props => (props.open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100vw;
    background: white;
    padding: 2rem 0;
    border-bottom: 1px solid #e0e0e0;
    z-index: 99;
  }
`;

const CartBadge = styled.span`
  background: #000;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.6em;
  font-size: 0.8em;
  font-weight: 600;
  margin-left: 0.3em;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #000;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 0;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  &:hover {
    background: #000;
    color: white;
  }
`;

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
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
        <Link to="/orders" onClick={handleLinkClick}>Orders</Link>
        <Link to="/cart" onClick={handleLinkClick}>
          Cart
          {cart.length > 0 && <CartBadge>{cart.length}</CartBadge>}
        </Link>
        {user ? (
          <UserMenu>
            <UserName>👤 {user.name}</UserName>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </UserMenu>
        ) : (
          <Link to="/login" onClick={handleLinkClick}>Login</Link>
        )}
      </NavLinks>
    </Nav>
  );
}