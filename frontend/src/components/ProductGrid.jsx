'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './productGrid.css';

export default function ProductGrid({ viewMode = 'grid3', sortBy = 'default' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/productos');
        const data = await res.json();

        if (res.ok) setProducts(data);
      } catch (err) {
        console.error('Error cargando productos:', err);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.precio - b.precio);
      case 'price-high':
        return sorted.sort((a, b) => b.precio - a.precio);
      case 'alphabetic':
        return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
      default:
        return sorted;
    }
  }, [sortBy, products]);

  if (loading) return <p style={{ padding: 20 }}>Cargando productos...</p>;

  if (products.length === 0)
    return <p style={{ padding: 20 }}>No hay productos en la base de datos.</p>;

  return (
    <section className="product-section">
      <div className={`products-container ${viewMode}`}>
        {sortedProducts.map((product) => (
          <Link
            key={product.id_producto}
            href={`/producto/${product.id_producto}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="product-card">
              <div className="product-image-wrapper">
                <Image
                  src={product.imagen || "/placeholder.jpg"}
                  alt={product.nombre}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.nombre}</h3>
                <p className="product-price">€{Number(product.precio).toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

