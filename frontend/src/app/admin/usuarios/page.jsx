"use client";

import { useEffect, useState } from "react";
import { getToken, getUserRole } from "../../../utils/auth";
import Link from "next/link";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Proteger esta página solo para admins
  useEffect(() => {
    if (getUserRole() !== "admin") {
      window.location.href = "/";
    }
  }, []);

  // Cargar usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3001/admin/usuarios", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await res.json();
        setUsuarios(data);

      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    };

    fetchUsuarios();
  }, []);

  // Cambiar rol del usuario
  const cambiarRol = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/admin/usuarios/${id}/rol`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ rol: "admin" })
      });

      if (!res.ok) {
        setMensaje("❌ Error al cambiar rol");
        return;
      }

      setMensaje("✅ Rol actualizado");

      // Refrescar lista
      setUsuarios(usuarios.map(u =>
        u.id_usuario === id ? { ...u, rol: "admin" } : u
      ));

    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:3001/admin/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) {
        setMensaje("❌ Error al eliminar usuario");
        return;
      }

      setMensaje("🗑 Usuario eliminado");
      setUsuarios(usuarios.filter(u => u.id_usuario !== id));

    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Usuarios</h1>

      <Link href="/admin" style={{ color: "blue" }}>
        ← Volver al panel admin
      </Link>

      {mensaje && <p style={{ fontWeight: "bold" }}>{mensaje}</p>}

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Nombre</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Rol</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{u.id_usuario}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{u.nombre}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{u.email}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{u.rol}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                
                {u.rol !== "admin" && (
                  <button
                    onClick={() => cambiarRol(u.id_usuario)}
                    style={{ marginRight: "10px", background: "orange" }}
                  >
                    Hacer Admin
                  </button>
                )}

                <button
                  onClick={() => eliminarUsuario(u.id_usuario)}
                  style={{ background: "red", color: "white" }}
                >
                  Eliminar
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
