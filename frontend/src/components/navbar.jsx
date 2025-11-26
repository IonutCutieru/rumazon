"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import { isLoggedIn, logout } from "../utils/auth";

const Navbar = () => {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogged(isLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setLogged(false);
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

        {logged === null ? (
          // Mientras carga no muestra nada
          null
        ) : logged === false ? (
          <>
            <li><Link href="/auth/login">Iniciar Sesión</Link></li>
            <li><Link href="/auth/register">Registrarse</Link></li>
          </>
        ) : (
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
