"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserRole, getToken } from "../../../utils/auth";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/admin/productos", {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });

        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error cargando productos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await fetch(`http://localhost:3001/admin/productos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
      });

      setProductos(productos.filter((p) => p.id_producto !== id));
    } catch (err) {
      console.error("Error eliminando producto", err);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productos</h1>

      <Link
        href="/admin/productos/crear"
        style={{
          display: "inline-block",
          marginBottom: "15px",
          background: "#28a745",
          padding: "10px 20px",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        ➕ Crear Producto
      </Link>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>
                {p.imagen ? (
                  <img src={p.imagen} alt="img" width={50} />
                ) : (
                  "Sin imagen"
                )}
              </td>
              <td>{p.nombre}</td>
              <td>{p.precio} €</td>
              <td>{p.stock}</td>
              <td>{p.categoria}</td>

              <td>
                <Link
                  href={`/admin/productos/editar/${p.id_producto}`}
                  style={{
                    marginRight: "10px",
                    color: "blue",
                  }}
                >
                  Editar
                </Link>

                <button
                  onClick={() => eliminarProducto(p.id_producto)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  Eliminar ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
