"use client";

import { useEffect, useState } from "react";
import { getToken, getUserRole } from "../../../../../utils/auth";
import Link from "next/link";

export default function EditarProducto({ params }) {
  const { id } = params;
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Proteger la página para admins
  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  // Cargar el producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3001/admin/productos/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    };

    fetchProducto();
  }, [id]);

  // Manejar edición
  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/admin/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(producto),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("❌ Error: " + data.message);
        return;
      }

      setMensaje("✅ Producto actualizado correctamente");

    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Editar Producto</h1>

      <Link href="/admin/productos" style={{ color: "blue" }}>
        ← Volver a productos
      </Link>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "20px", maxWidth: "400px" }}
      >
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          className="input-admin"
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          className="input-admin"
        />

        <label>Precio (€):</label>
        <input
          type="number"
          step="0.01"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          className="input-admin"
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          className="input-admin"
        />

        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          className="input-admin"
        />

        <label>Imagen (URL):</label>
        <input
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          className="input-admin"
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Guardar Cambios
        </button>
      </form>

      {mensaje && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{mensaje}</p>
      )}
    </div>
  );
}
