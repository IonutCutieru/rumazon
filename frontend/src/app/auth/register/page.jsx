"use client";
import "./register.css";
import { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    email: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      setMensaje("✅ Registro exitoso");
      window.location.href = "/auth/login";
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        
        <h1 className="register-title">Crear cuenta</h1>

        {/* Nombre */}
        <div className="input-group">
          <FiUser className="input-icon" />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Usuario */}
        <div className="input-group">
          <FiUser className="input-icon" />
          <input
            type="text"
            name="usuario"
            placeholder="Nombre de usuario"
            value={form.usuario}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="register-btn">
          Registrarse
        </button>

        {mensaje && <p className="register-message">{mensaje}</p>}

        <p className="login-text">
          ¿Ya tienes cuenta?{" "}
          <a href="/auth/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}
