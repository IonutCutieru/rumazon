"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import './productGrid.css';

export default function ProductGrid({ viewMode = 'grid3', sortBy = 'default', searchTerm = '' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // refetch cuando cambia searchTerm
  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : '';
        const res = await fetch(`http://localhost:3001/productos${q}`);
        const data = await res.json();
        if (!mounted) return;
        if (res.ok) setProducts(data);
        else setProducts([]);
      } catch (err) {
        console.error('Error cargando productos:', err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // pequeño debounce: espera 300ms antes de fetch si hay búsqueda
    const timer = setTimeout(() => fetchProducts(), searchTerm ? 300 : 0);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // aplicar orden localmente (si quieres que el backend haga el orden, cambia endpoint)
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a,b) => Number(a.precio) - Number(b.precio));
      case 'price-high':
        return sorted.sort((a,b) => Number(b.precio) - Number(a.precio));
      case 'alphabetic':
        return sorted.sort((a,b) => a.nombre.localeCompare(b.nombre));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  if (loading) return <p style={{ padding: 20 }}>Cargando productos...</p>;
  if (!products || products.length === 0) return <p style={{ padding: 20 }}>No hay productos.</p>;

  return (
    <section className="product-section">
      <div className={`products-container ${viewMode}`}>
        {sortedProducts.map((product) => (
          <Link key={product.id_producto} href={`/producto/${product.id_producto}`} style={{ textDecoration: 'none' }}>
            <div className="product-card">
              <div className="product-image-wrapper">
                {/* si product.imagen es URL externa, asegúrate de agregar el dominio en next.config.js */}
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
