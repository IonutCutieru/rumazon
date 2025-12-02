// Obtener carrito desde localStorage
export function getCart() {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Guardar carrito
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Añadir producto al carrito
export function addToCart(product) {
  const cart = getCart();

  const exists = cart.find(p => p.id_producto === product.id_producto);

  if (exists) {
    exists.cantidad += 1;
  } else {
    cart.push({ ...product, cantidad: 1 });
  }

  saveCart(cart);
}

// Eliminar producto del carrito
export function removeFromCart(id) {
  const cart = getCart().filter(p => p.id_producto !== id);
  saveCart(cart);
}

// Cambiar cantidad (+1 o -1)
export function updateQuantity(id, amount) {
  const cart = getCart().map(p => {
    if (p.id_producto === id) {
      return { ...p, cantidad: Math.max(1, p.cantidad + amount) };
    }
    return p;
  });

  saveCart(cart);
}

// Vaciar carrito
export function clearCart() {
  saveCart([]);
}
