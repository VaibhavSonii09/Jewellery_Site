// src/Pages/home.jsx
import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Testimonials from '../components/Testimonials'
import GoogleReviewsWidget from '../components/GoogleReviewsWidget'
import { useCart } from '../context/CartContext'

const ParallaxHeroWrapper = styled.section`
  background: linear-gradient(120deg, #fffbe6 60%, #ffd700 100%);
  padding: 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 32px 32px;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParallaxImage = styled.div`
  background: url('/products/GoldSet.png') center/cover no-repeat;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0.18;
  z-index: 1;
  transition: transform 0.2s;
  will-change: transform;
`;

const ParallaxContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 4rem 2rem 2rem 2rem;
`;

function ParallaxHero({ children }) {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { width, height, left, top } = imgRef.current.parentNode.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 18;
    const y = (e.clientY - top - height / 2) / 18;
    imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    imgRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <ParallaxHeroWrapper
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParallaxImage ref={imgRef} />
      <ParallaxContent>
        {children}
      </ParallaxContent>
    </ParallaxHeroWrapper>
  );
}

const Title = styled.h1`
  font-size: 2.8rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
  font-family: 'Poppins', serif;
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 2rem;
`

const CTA = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 32px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px ${props => props.theme.colors.cardShadow};
  transition: background 0.2s;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`

const galleryImages = [
  "/products/GoldSet.png",
  "/products/GoldEarrings.png",
  "/products/GoldRings.png",
  "/products/SilverKade.png",
  "/products/LadiesFashionRingGold.jpeg"
]

const featuredProducts = [
  {
    name: "Gold Necklace Set",
    price: "72500",
    image: "/products/GoldSet.png"
  },
  {
    name: "Gold Earrings",
    price: "22,000",
    image: "/products/GoldEarrings.png"
  },
  {
    name: " Ladies Gold Rings",
    price: "5599",
    image: "/products/GoldRings.png"
  }
]

export default function Home() {
  const { addToCart } = useCart();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      {
        breakpoint: 800,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <>
      <ParallaxHero>
        <Title>Shree Balaji Gems & Jewellers</Title>
        <Subtitle>
          Exquisite Gold & Silver Jewellery. Trusted since 1985.<br />
          Discover timeless designs for every occasion.
        </Subtitle>
        <CTA to="/products">Shop Now</CTA>
      </ParallaxHero>

      {/* Gallery Carousel */}
      <div style={{ maxWidth: 700, margin: "2rem auto" }}>
        <Slider {...settings}>
          {galleryImages.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`Gallery ${idx}`}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 4px 16px #0001",
                  maxHeight: 350,
                  objectFit: "cover"
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        as={Section}
      >
        <SectionTitle>Featured Collections</SectionTitle>
        <ProductsGrid>
          {featuredProducts.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              onAddToCart={productWithQty => addToCart(productWithQty)}
            />
          ))}
        </ProductsGrid>
      </motion.section>
      <GoogleReviewsWidget />
      <Testimonials />
    </>
  )
}