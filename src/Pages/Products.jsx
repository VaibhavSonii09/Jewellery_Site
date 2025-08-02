import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'
import { motion } from "framer-motion"
import GoogleReviewsWidget from '../components/GoogleReviewsWidget'
import { useCart } from '../context/CartContext'

const Section = styled.section`
  padding: 2rem 0;
  max-width: 1400px;
  margin: 0 auto;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
`

const Tab = styled.button`
  background: none;
  color: ${props => props.active ? '#000' : '#666'};
  border: none;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${props => props.active ? '#000' : 'transparent'};
  
  &:hover {
    color: #000;
  }
`

const SearchAndFilter = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
`

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  font-size: 1rem;
  min-width: 300px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`

const SortButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #000;
  background: white;
  color: #000;
  border-radius: 0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  
  &:hover {
    background: #000;
    color: white;
  }
`

const ResultsCount = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0;
  padding: 0 2rem;
`

const goldProducts = [
  {
    name: "Gold Necklace Set",
    price: "72500",
    image: "/products/GoldSet.png"
  },
  {
    name: "Gold Rings",
    price: "24500",
    image: "/products/GoldRings.png"
  },
  {
    name: "Ladies Gold Ring",
    price: "28900",
    image: "/products/LadiesFashionRingGold.jpeg"
  },
  {
    name: "Pendant Set",
    price: "122000",
    image: "/products/GoldEarrings.png"
  },
  {
    name: "Haar",
    price: "80700",
    image: "/products/goldHaar.jpeg"
  },
  // --- New Gold Products with Unsplash images ---
  {
    name: "Gold Bangle",
    price: "18,000",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gold Chain",
    price: "22,500",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gold Stud Earrings",
    price: "9,500",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  }
]

const silverProducts = [
  {
    name: "Bacchha Kada",
    price: "1800",
    image: "/products/BaccheKade.png"
  },
  {
    name: " Kade",
    price: "4999",
    image: "/products/SilverKade.png"
  },
  {
    name: " Flower Pattern Ring",
    price: "1499",
    image: "/products/SilverFlowerPatternRing.png"
  },
  {
    name: "Kitchen Set",
    price: "20049",
    image: "/products/KitchenSet.png"
  },
  {
    name: "Pooja Set",
    price: "15000",
    image: "/products/PoojaSet.png"
  },
  {
    name: "Payal",
    price: "6000",
    image: "/products/Payal.png"
  },
  // --- New Silver Products with Unsplash images ---
  {
    name: "Silver Pendant",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Silver Earrings",
    price: "3,200",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Silver Bracelet",
    price: "4,800",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  }
]

export default function Products() {
  const [tab, setTab] = useState('gold')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState('all')
  
  const { addToCart } = useCart();

  const allProducts = tab === 'gold' ? goldProducts : silverProducts

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseInt(product.price.replace(/[^\d]/g, ''));
        switch (priceRange) {
          case 'under-10k':
            return price < 10000;
          case '10k-50k':
            return price >= 10000 && price < 50000;
          case '50k-100k':
            return price >= 50000 && price < 100000;
          case 'over-100k':
            return price >= 100000;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, searchTerm, sortBy, priceRange]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      as={Section}
    >
      <GoogleReviewsWidget />
      
      <Tabs>
        <Tab active={tab === 'gold'} onClick={() => setTab('gold')}>Gold</Tab>
        <Tab active={tab === 'silver'} onClick={() => setTab('silver')}>Silver</Tab>
      </Tabs>

      <SearchAndFilter>
        <SearchInput
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FilterSelect
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under-10k">Under ₹10,000</option>
          <option value="10k-50k">₹10,000 - ₹50,000</option>
          <option value="50k-100k">₹50,000 - ₹1,00,000</option>
          <option value="over-100k">Over ₹1,00,000</option>
        </FilterSelect>
        
        <SortButton onClick={() => setSortBy(sortBy === 'name' ? 'price-low' : sortBy === 'price-low' ? 'price-high' : 'name')}>
          Sort: {sortBy === 'name' ? 'Name' : sortBy === 'price-low' ? 'Price (Low to High)' : 'Price (High to Low)'}
        </SortButton>
      </SearchAndFilter>

      <ResultsCount>
        Showing {filteredProducts.length} of {allProducts.length} products
      </ResultsCount>

      <ProductsGrid as={motion.div}>
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
          >
            <ProductCard
              product={product}
              onAddToCart={productWithQty => addToCart(productWithQty)}
            />
          </motion.div>
        ))}
      </ProductsGrid>
    </motion.section>
  )
}