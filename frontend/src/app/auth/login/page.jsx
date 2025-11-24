"use client";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    gmail: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMensaje("❌ " + data.message);
      return;
    }

    // Guardar token en localStorage
    localStorage.setItem("token", data.token);

    setMensaje("✅ Inicio de sesión correcto.");
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto" }}>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Entrar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
