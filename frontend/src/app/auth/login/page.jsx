"use client";
import "./login.css";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const [form, setForm] = useState({
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

      localStorage.setItem("token", data.token);
      setMensaje("✅ Inicio de sesión correcto");

      window.location.href = "/";
    } catch (err) {
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Iniciar sesión</h1>

        {/* Email */}
        <div className="input-group">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <FiLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="login-btn">
          Entrar
        </button>

        {mensaje && (
          <p className="login-message">{mensaje}</p>
        )}

        <p className="register-text">
          ¿No tienes cuenta?{" "}
          <a href="/auth/register">Regístrate</a>
        </p>
      </form>
    </div>
  );
}
