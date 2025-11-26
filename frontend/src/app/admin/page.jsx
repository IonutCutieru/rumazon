"use client";
import Link from "next/link";
import { getUserRole } from "../../utils/auth";
import { useEffect } from "react";

export default function AdminPanel() {
  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administrador</h1>

      <ul>
        <li><Link href="/admin/productos">Gestionar Productos</Link></li>
        <li><Link href="/admin/usuarios">Gestionar Usuarios</Link></li>
        <li><Link href="/admin/pedidos">Revisar Pedidos</Link></li>
        <li><Link href="/admin/estadisticas">Estadísticas</Link></li>
      </ul>
    </div>
  );
}

