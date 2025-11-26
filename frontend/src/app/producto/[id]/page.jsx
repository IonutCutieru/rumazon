'use client'
import { useState } from 'react'
import Image from 'next/image'
import './producto.css'

export default async function ProductoPage({ params }) {
  const { id } = await params

const products = {
    1: { id: 1, name: 'Maquinilla electronica', price: 19.99, image: '/Producto1.jpg', description: 'Corta y afeita con precisión. Ideal para uso diario.' },
    2: { id: 2, name: 'Plancha de pelo', price: 30.99, image: '/Producto2.jpg', description: 'Alisado profesional y acabado brillante.' },
    3: { id: 3, name: 'Soporte de vino', price: 12.99, image: '/Producto3.jpg', description: 'Diseño elegante para mostrar tus botellas.' },
    4: { id: 4, name: 'Mystery Box', price: 15.00, image: '/Producto4.jpg', description: 'Caja sorpresa con artículos seleccionados.' },
    5: { id: 5, name: 'Vertidor de vino', price: 14.99, image: '/Producto5.jpg', description: 'Vertido sin goteo para servir con estilo.' },
    6: { id: 6, name: 'Rama foto digital', price: 22.99, image: '/Producto6.jpg', description: 'Marco digital para tus recuerdos favoritos.' },
}

  const product = products[id]

  if (!product) {
    return <div style={{ color: '#fff', textAlign: 'center', paddingTop: '100px' }}>Producto no encontrado</div>
  }

  return (
    <ProductoContent product={product} />
  )
}

function ProductoContent({ product }) {
  const [cantidad, setCantidad] = useState(1)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const sumarCantidad = () => setCantidad(c => c + 1)
  const restarCantidad = () => setCantidad(c => c > 1 ? c - 1 : 1)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }])
      setMessage('')
    }
  }

  return (
    <main className="producto-main">
      <section className="producto-container">
        {/* Lado izquierdo - Imagen y cantidad */}
        <div className="producto-left">
          <div className="producto-image-container">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="producto-image"
            />
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

        {/* Lado derecho */}
        <div className="producto-right">
          {/* Cuadrado con precio y descripción */}
          <div className="producto-info-box">
            <h3 className="producto-precio">€{product.price.toFixed(2)}</h3>
            <div className="producto-descripcion">
              <p>{product.description}</p>
            </div>
            <button className="btn-agregar-carrito">Agregar al carrito</button>
          </div>

          {/* Chat / Asistente */}
          <div className="chat-container">
            <div className="chat-header">
              <h4>Asistente de ventas</h4>
            </div>
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
  )
}
