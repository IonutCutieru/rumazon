"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import "./producto.css";
import { addToCart } from "../../../utils/cart";

export default function ProductoPage() {
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar producto desde backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/productos/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error cargando producto:", error);
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando producto...</div>;
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        Producto no encontrado
      </div>
    );
  }

  return <ProductoContent product={product} />;
}

function ProductoContent({ product }) {
  const [cantidad, setCantidad] = useState(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState('');

  // Generar ID del chat
  useEffect(() => {
    let id = localStorage.getItem('sessionId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('sessionId', id);
    }
    setSessionId(id);
  }, []);

  const sumarCantidad = () => setCantidad(c => c + 1);
  const restarCantidad = () => setCantidad(c => (c > 1 ? c - 1 : 1));

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, sender: "user" }]);

    const userMessage = message;
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { text: data.reply || "No hay respuesta del asistente", sender: "agent" },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "Error al conectar con el asistente", sender: "agent" },
      ]);
    }
  };

  return (
    <main className="producto-main">
      <section className="producto-container">
        <div className="producto-left">
          <div className="producto-image-container">
            <Image
              src={product.imagen || "/placeholder.jpg"}
              alt={product.nombre}
              width={400}
              height={400}
              className="producto-image"
            />
          </div>

          <h2 className="producto-nombre">{product.nombre}</h2>

          <div className="cantidad-selector">
            <label>Cantidad:</label>
            <div className="cantidad-controls">
              <button className="cantidad-btn" onClick={restarCantidad}>−</button>
              <input type="number" value={cantidad} readOnly className="cantidad-input" />
              <button className="cantidad-btn" onClick={sumarCantidad}>+</button>
            </div>
          </div>
        </div>

        <div className="producto-right">
          <div className="producto-info-box">
            <h3 className="producto-precio">€{Number(product.precio).toFixed(2)}</h3>
            <p className="producto-descripcion">{product.descripcion}</p>

            <button className="btn-agregar-carrito" onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
          </div>

          {/* CHAT */}
          <div className="chat-container">
            <div className="chat-header"><h4>Asistente de ventas</h4></div>

            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-placeholder">
                  <p>¿Tienes preguntas sobre este producto?</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                ))
              )}
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe tu pregunta..."
                className="chat-input"
              />

              <button onClick={handleSendMessage} className="chat-send-btn">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
