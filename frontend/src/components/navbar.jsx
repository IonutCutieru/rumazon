"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import { isLoggedIn, logout, getUserRole } from "../utils/auth";

export default function Navbar({ setSearchTerm }) {
  const [logged, setLogged] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogged(loggedIn);

    if (loggedIn) setRole(getUserRole());
  }, []);

  const handleLogout = () => {
    logout();
    setLogged(false);
    setRole(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          <Image
            src="/Rumazon.png"
            alt="Rumazon Logo"
            width={360}
            height={120}
            className="logo-img"
          />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>

        {logged && role === "admin" && (
          <li><Link href="/admin">Panel</Link></li>
        )}

        {!logged ? (
          <>
            <li><Link href="/auth/login">Iniciar Sesión</Link></li>
            <li><Link href="/auth/register">Registrarse</Link></li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              style={{ background: "none", border: "none", color: "red" }}
            >
              Cerrar Sesión
            </button>
          </li>
        )}

        <li><Link href="/carrito">Carrito</Link></li>
      </ul>

      {/* 🔍 BÚSQUEDA FUNCIONAL */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
}
