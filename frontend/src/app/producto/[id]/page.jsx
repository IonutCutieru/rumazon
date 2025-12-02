'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import './producto.css';
import { addToCart } from "../../../utils/cart";

export default function ProductoPage() {
  const params = useParams();
  const id = Number(params.id);

  const products = {
    1: { id: 1, name: 'Maquinilla electronica', price: 19.99, image: '/Producto1.jpg', description: 'Corta y afeita con precisión. Ideal para uso diario.' },
    2: { id: 2, name: 'Plancha de pelo', price: 30.99, image: '/Producto2.jpg', description: 'Alisado profesional y acabado brillante.' },
    3: { id: 3, name: 'Soporte de vino', price: 12.99, image: '/Producto3.jpg', description: 'Diseño elegante para mostrar tus botellas.' },
    4: { id: 4, name: 'Mystery Box', price: 15.00, image: '/Producto4.jpg', description: 'Caja sorpresa con artículos seleccionados.' },
    5: { id: 5, name: 'Vertidor de vino', price: 14.99, image: '/Producto5.jpg', description: 'Vertido sin goteo para servir con estilo.' },
    6: { id: 6, name: 'Rama foto digital', price: 22.99, image: '/Producto6.jpg', description: 'Marco digital para tus recuerdos favoritos.' },
  };

  const product = products[id];

  if (!product) {
    return <div style={{ color: '#fff', textAlign: 'center', paddingTop: '100px' }}>Producto no encontrado</div>;
  }

  return <ProductoContent product={product} />;
}

function ProductoContent({ product }) {
  const [cantidad, setCantidad] = useState(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('sessionId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('sessionId', id);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(id);
  }, []);

  const sumarCantidad = () => setCantidad(c => c + 1);
  const restarCantidad = () => setCantidad(c => (c > 1 ? c - 1 : 1));

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    const userMessage = message;
    setMessage('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, sessionId })
      });

      const data = await res.json();

      if (data.reply) {
        setMessages(prev => [...prev, { text: data.reply, sender: 'agent' }]);
      } else {
        setMessages(prev => [...prev, { text: 'No hay respuesta del asistente', sender: 'agent' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: 'Error al conectar con el asistente', sender: 'agent' }]);
    }
  };

  return (
    <main className="producto-main">
      <section className="producto-container">
        <div className="producto-left">
          <div className="producto-image-container">
            <Image src={product.image} alt={product.name} width={400} height={400} className="producto-image" />
          </div>
          <h2 className="producto-nombre">{product.name}</h2>
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
            <h3 className="producto-precio">€{product.price.toFixed(2)}</h3>
            <div className="producto-descripcion"><p>{product.description}</p></div>
            <button className="btn-agregar-carrito" onClick={() => addToCart(producto)}>Agregar al carrito</button>
          </div>

          <div className="chat-container">
            <div className="chat-header"><h4>Asistente de ventas</h4></div>
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-placeholder">
                  <p>¿Tienes preguntas sobre este producto? Pregúntale a nuestro asistente.</p>
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
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu pregunta..."
                className="chat-input"
              />
              <button onClick={handleSendMessage} className="chat-send-btn">Enviar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
