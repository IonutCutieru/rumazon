"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "../../utils/auth";

import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart
} from "../../utils/cart";

export default function CarritoPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  // Proteger página: SOLO usuarios logueados
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(getCart());
  }, []);

  // Evita parpadeos y acceso fuera de login
  if (!isLoggedIn()) return null;

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleUpdate = (id, amount) => {
    updateQuantity(id, amount);
    setCart(getCart());
  };

  const total = cart.reduce(
    (sum, p) => sum + p.precio * p.cantidad,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>🛒 Carrito</h1>

      {cart.length === 0 && <p>El carrito está vacío.</p>}

      {cart.map((p) => (
        <div
          key={p.id_producto}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px",
            marginTop: "10px",
            borderBottom: "1px solid #ccc"
          }}
        >
          <div>
            <h3>{p.nombre}</h3>
            <p>{p.precio} €</p>
            <p>Cantidad: {p.cantidad}</p>

            <button onClick={() => handleUpdate(p.id_producto, +1)}>➕</button>
            <button onClick={() => handleUpdate(p.id_producto, -1)}>➖</button>

            <button
              onClick={() => handleRemove(p.id_producto)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Total: {total.toFixed(2)} €</h2>

          <button
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={() => alert("Checkout pendiente de implementar")}
          >
            Finalizar Compra
          </button>

          <button
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              padding: "10px 20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={() => {
              clearCart();
              setCart([]);
            }}
          >
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
}
