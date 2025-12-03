"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import { isLoggedIn, logout, getUserRole } from "../utils/auth";

const Navbar = () => {
  const [logged, setLogged] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Detectar si hay sesión activa
    const loggedIn = isLoggedIn();
    setLogged(loggedIn);

    if (loggedIn) {
      const r = getUserRole();
      setRole(r);
    }
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

        {/*  Si el usuario es admin → mostrar "Panel" */}
        {logged && role === "admin" && (
          <li>
            <Link href="/admin" className="admin-panel-button">
              Panel
            </Link>
          </li>
        )}

        {/*  Si NO está logueado → mostrar login/register */}
        {logged === null ? null : !logged ? (
          <>
            <li><Link href="/auth/login">Iniciar Sesión</Link></li>
            <li><Link href="/auth/register">Registrarse</Link></li>
          </>
        ) : (
          //  Si está logueado → botón cerrar sesión
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "red",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Cerrar Sesión
            </button>
          </li>
        )}

        <li><Link href="/carrito">Carrito</Link></li>
      </ul>

      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
      </div>
    </nav>
  );
};

export default Navbar;
