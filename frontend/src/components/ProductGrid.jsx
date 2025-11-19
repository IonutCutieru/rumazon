'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import './productGrid.css'

export default function ProductGrid({ viewMode = 'grid3', sortBy = 'default' }) {
  const [cart, setCart] = useState([])

  const products = [
    { id: 1, name: 'Maquinilla electronica', price: 19.99, image: '/Producto1.jpg' },
    { id: 2, name: 'Plancha de pelo', price: 30.99, image: '/Producto2.jpg' },
    { id: 3, name: 'Soporte de vino', price: 12.99, image: '/Producto3.jpg' },
    { id: 4, name: 'Mystery Box', price: 15.00, image: '/Producto4.jpg' },
    { id: 5, name: 'Vertidor de vino', price: 14.99, image: '/Producto5.jpg' },
    { id: 6, name: 'Rama foto digital', price: 22.99, image: '/Producto6.jpg' },
  ]

  // Ordenar productos según el filtro
  const sortedProducts = useMemo(() => {
    const sorted = [...products]
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'alphabetic':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [sortBy])

  const addToCart = (product) => {
    setCart([...cart, product])
    alert(`${product.name} añadido al carrito!`)
  }

  return (
    <section className="product-section">
      <div className={`products-container ${viewMode}`}>
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'fill' }}
              />
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                +
              </button>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">€{product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}