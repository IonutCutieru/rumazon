import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link href="/">
          <Image 
            src="/Rumazon.png" 
            alt="Rumazon Logo" 
            width={360}   // logo más grande
            height={120} 
            className="logo-img"
          />
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
        <li><Link href="/cuenta">Cuenta</Link></li>
        <li><Link href="/carrito">Carrito</Link></li>
      </ul>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
      </div>
    </nav>
  );
};

export default Navbar;
