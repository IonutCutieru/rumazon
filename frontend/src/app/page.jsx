'use client'
import { useState } from 'react'
import Slider from '../components/Slider'
import ProductGrid from '../components/ProductGrid'
import './global.css'

export default function HomePage() {
  const [viewMode, setViewMode] = useState('grid3')
  const [sortBy, setSortBy] = useState('default')
  const [filterOpen, setFilterOpen] = useState(true)

  return (
    <main style={{ paddingTop: '56px' }}>
      <Slider />

      <section className="products-section">
        {/* Filtrar por */}
        <aside className={`filters-sidebar ${!filterOpen ? 'closed' : ''}`}>
          <button 
            className="filter-toggle"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterOpen ? '✕ Cerrar filtros' : '☰ Filtros'}
          </button>

          <div className="filters-content">
            <h3 className="filter-title">Filtrar por</h3>

            <div className="filter-group">
              <label className="filter-label">
                <input
                  type="radio"
                  name="sort"
                  value="default"
                  checked={sortBy === 'default'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <span>Predeterminado</span>
              </label>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={sortBy === 'price-low'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <span>Precio: Menor a Mayor</span>
              </label>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={sortBy === 'price-high'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <span>Precio: Mayor a Menor</span>
              </label>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <input
                  type="radio"
                  name="sort"
                  value="alphabetic"
                  checked={sortBy === 'alphabetic'}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                <span>Orden Alfabético</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Vista de productos */}
        <div className="products-main">
          {/* Botón de cambiar vista */}
          <div className="view-options">
            <button
              className={`view-btn ${viewMode === 'grid3' ? 'active' : ''}`}
              onClick={() => setViewMode('grid3')}
              title="Vista de 3 columnas"
            >
              <span className="grid-icon">3⊞</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'grid2' ? 'active' : ''}`}
              onClick={() => setViewMode('grid2')}
              title="Vista de 2 columnas"
            >
              <span className="grid-icon">2⊞</span>
            </button>
          </div>

          {/* Grid de productos */}
          <ProductGrid viewMode={viewMode} sortBy={sortBy} />
        </div>
      </section>
    </main>
  )
}