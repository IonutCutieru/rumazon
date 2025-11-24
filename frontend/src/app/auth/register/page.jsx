"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    gmail: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setMensaje("❌ " + data.message);
      return;
    }

    setMensaje("✅ Registro exitoso. Ahora puedes iniciar sesión.");
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto" }}>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="usuario"
          placeholder="Nombre de usuario"
          value={form.usuario}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="gmail"
          placeholder="Correo electrónico"
          value={form.gmail}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear cuenta</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
