"use client";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

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
    <div className="min-h-screen bg-[#e9cca7] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

        {/* Gmail */}
        <div className="flex items-center bg-gray-100 p-3 rounded-xl mb-3">
          <FiMail className="text-gray-500 mr-3" />
          <input
            type="email"
            name="gmail"
            placeholder="Correo electrónico"
            value={form.gmail}
            onChange={handleChange}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="flex items-center bg-gray-100 p-3 rounded-xl mb-5">
          <FiLock className="text-gray-500 mr-3" />
          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={form.contrasena}
            onChange={handleChange}
            className="bg-transparent outline-none w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
        >
          Entrar
        </button>

        {mensaje && (
          <p className="text-center mt-4 font-semibold">{mensaje}</p>
        )}

        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/auth/register" className="text-red-600 font-semibold">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
