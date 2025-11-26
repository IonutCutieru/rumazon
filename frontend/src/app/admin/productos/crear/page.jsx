"use client";

import { useState, useEffect } from "react";
import { getToken, getUserRole } from "../../../../utils/auth";
import Link from "next/link";

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Solo admins pueden entrar
  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/admin/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ Error: " + data.message);
        return;
      }

      setMensaje("✅ Producto creado correctamente");
      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
        imagen: "",
      });

    } catch (err) {
      setMensaje("❌ Error al conectar con el servidor");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Crear Producto</h1>

      <Link href="/admin/productos" style={{ color: "blue" }}>
        ← Volver a productos
      </Link>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", maxWidth: "400px" }}>
        
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="input-admin"
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="input-admin"
        />

        <label>Precio (€):</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
          className="input-admin"
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="input-admin"
        />

        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
          className="input-admin"
        />

        <label>Imagen (URL):</label>
        <input
          type="text"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          className="input-admin"
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Crear producto
        </button>

      </form>

      {mensaje && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{mensaje}</p>
      )}
    </div>
  );
}
