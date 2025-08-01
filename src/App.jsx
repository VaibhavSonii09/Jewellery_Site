// src/App.jsx
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Pages/home'
import Products from './Pages/Products'
import About from './Pages/About'
import Contact from './Pages/Contact'
import AllProducts from './Pages/AllProducts'
import WhatsAppButton from './components/WhatsAppButton'
import Cart from './Pages/Cart'
import { CartProvider } from './context/CartContext'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: ${props => props.theme.fonts.main};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  }
  * {
  box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
    }
`

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <WhatsAppButton />
        <Footer />
      </CartProvider>
    </ThemeProvider>
  )
}