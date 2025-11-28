"use client";

import { useEffect, useState } from "react";
import { getToken, getUserRole } from "../../../utils/auth";
import Link from "next/link";

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Solo admin puede entrar
  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  // Cargar pedidos
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch("http://localhost:3001/admin/pedidos", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await res.json();
        setPedidos(data);
      } catch (err) {
        setMensaje("❌ Error cargando pedidos");
        console.error(err);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pedidos</h1>

      <Link href="/admin" style={{ color: "blue" }}>
        ← Volver al panel admin
      </Link>

      {mensaje && <p>{mensaje}</p>}

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Usuario</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Fecha</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Total</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Estado</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id_pedido}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.id_pedido}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.usuario?.nombre || "Desconocido"}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{new Date(p.fecha).toLocaleString()}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.total} €</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{p.estado}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                <Link href={`/admin/pedidos/${p.id_pedido}`}>
                  <button style={{ background: "blue", color: "white", padding: "5px 10px" }}>
                    Ver Detalle
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
