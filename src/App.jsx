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
import CartButton from './components/CartButton'
import Cart from './Pages/Cart'
import OrderedItems from './Pages/OrderedItems'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Notification from './components/Notification'

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
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <GlobalStyle />
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<OrderedItems />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
              <WhatsAppButton />
              <CartButton />
              <Footer />
              <Notification />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}