"use client";

import { useState } from "react";
import Slider from "../components/Slider";
import ProductGrid from "../components/ProductGrid";
import ClientNavbar from "../components/ClientNavbar";
import "./global.css";

export default function HomePage() {
  const [viewMode, setViewMode] = useState("grid3");
  const [sortBy, setSortBy] = useState("default");
  const [filterOpen, setFilterOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ← buscador

  return (
    <main style={{ paddingTop: "56px" }}>
      {/* NAVBAR con buscador */}
      <ClientNavbar setSearchTerm={setSearchTerm} />

      {/* SLIDER */}
      <Slider />

      {/* PRODUCTOS */}
      <section className="products-section">
        {/* SIDEBAR FILTROS */}
        <aside className={`filters-sidebar ${!filterOpen ? "closed" : ""}`}>
          <button
            className="filter-toggle"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterOpen ? "✕ Cerrar filtros" : "☰ Filtros"}
          </button>

          <div className="filters-content">
            <h3 className="filter-title">Filtrar por</h3>

            <label className="filter-label">
              <input
                type="radio"
                name="sort"
                value="default"
                checked={sortBy === "default"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Predeterminado
            </label>

            <label className="filter-label">
              <input
                type="radio"
                name="sort"
                value="price-low"
                checked={sortBy === "price-low"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Precio: Menor a Mayor
            </label>

            <label className="filter-label">
              <input
                type="radio"
                name="sort"
                value="price-high"
                checked={sortBy === "price-high"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Precio: Mayor a Menor
            </label>

            <label className="filter-label">
              <input
                type="radio"
                name="sort"
                value="alphabetic"
                checked={sortBy === "alphabetic"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Alfabético
            </label>
          </div>
        </aside>

        {/* GRID PRINCIPAL */}
        <div className="products-main">
          {/* BOTONES DE VISTA */}
          <div className="view-options">
            <button
              className={`view-btn ${viewMode === "grid3" ? "active" : ""}`}
              onClick={() => setViewMode("grid3")}
            >
              3⊞
            </button>

            <button
              className={`view-btn ${viewMode === "grid2" ? "active" : ""}`}
              onClick={() => setViewMode("grid2")}
            >
              2⊞
            </button>
          </div>

          {/* PRODUCT GRID CON BUSCADOR */}
          <ProductGrid
            viewMode={viewMode}
            sortBy={sortBy}
            searchTerm={searchTerm}
          />
        </div>
      </section>
      <section
        className="map-section"
        style={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>
          📍 Dónde nos encontramos
        </h2>

        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "450px",
            margin: "0 auto",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <iframe
            src="https://www.google.com/maps?q=40.416775,-3.70379&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
