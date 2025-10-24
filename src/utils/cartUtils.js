import { productos } from "../data/productos";
import { usuarioActivo, getUsuarioActivo } from "./auth";

// --- CARRITO ---
export function getCart() {
  if (!usuarioActivo()) return [];
  return JSON.parse(localStorage.getItem("informacion-carrito")) || [];
}

export function saveCart(cart) {
  if (!usuarioActivo()) return;
  localStorage.setItem("informacion-carrito", JSON.stringify(cart));
}

export function addToCart(productId, cantidad = 1) {
  if (!usuarioActivo()) {
    alert("Debes iniciar sesión para usar el carrito.");
    return false;
  }
  let cart = getCart();
  let item = cart.find((i) => i.id === productId);
  if (item) {
    item.cantidad += cantidad;
  } else {
    let prod = productos.find((p) => p.id === productId);
    if (prod) cart.push({ ...prod, cantidad });
  }
  saveCart(cart);
  updateCartCount();
  return true;
}

export function updateCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.cantidad, 0);
}
