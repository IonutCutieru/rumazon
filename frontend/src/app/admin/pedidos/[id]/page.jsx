"use client";

import { useEffect, useState } from "react";
import { getToken, getUserRole } from "../../../../utils/auth";
import Link from "next/link";

export default function DetallePedido({ params }) {
  const { id } = params;
  const [pedido, setPedido] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Solo admin
  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  // Cargar datos del pedido
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const res = await fetch(`http://localhost:3001/admin/pedidos/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        const data = await res.json();

        setPedido(data);
      } catch (err) {
        console.error(err);
        setMensaje("❌ No se pudo cargar el pedido");
      }
    };

    fetchPedido();
  }, [id]);

  if (!pedido) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedido #{pedido.id_pedido}</h1>

      <Link href="/admin/pedidos" style={{ color: "blue" }}>
        ← Volver a pedidos
      </Link>

      <h2 style={{ marginTop: "20px" }}>Datos del Cliente</h2>
      <p><strong>Nombre:</strong> {pedido.usuario?.nombre}</p>
      <p><strong>Email:</strong> {pedido.usuario?.email}</p>
      <p><strong>Dirección:</strong> {pedido.direccion}</p>

      <h2 style={{ marginTop: "20px" }}>Productos</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Producto</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Cantidad</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {pedido.pedidoProductos.map((pp) => (
            <tr key={pp.id_pedido_producto}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {pp.producto?.nombre}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {pp.cantidad}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {pp.subtotal} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "20px" }}>Total del Pedido</h2>
      <p><strong>{pedido.total} €</strong></p>
    </div>
  );
}
