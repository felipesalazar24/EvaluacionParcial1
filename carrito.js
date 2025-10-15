
// --- CUPÓN  ---
let cuponActual = "";
let descuentoActual = 0;

// --- CARRITO ---
function getCart() {
    if (!usuarioActivo()) return [];
    return JSON.parse(localStorage.getItem("informacion-carrito")) || [];
}
function saveCart(cart) {
    if (!usuarioActivo()) return;
    localStorage.setItem("informacion-carrito", JSON.stringify(cart));
}
function addToCart(productId, cantidad = 1) {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.cantidad += cantidad;
    } else {
        let prod = productos.find(p => p.id === productId);
        if (prod) cart.push({ ...prod, cantidad });
    }
    saveCart(cart);
    updateCartCount();
    alert("Producto añadido al carrito.");
}
function removeFromCart(productId) {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartCount();
}
function addOneToCart(productId) {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.cantidad += 1;
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
}
function removeOneFromCart(productId) {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item && item.cantidad > 1) {
        item.cantidad -= 1;
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
}
function updateQuantity(productId, cantidad) {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.cantidad = Math.max(1, parseInt(cantidad) || 1);
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
}
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;
    if (!usuarioActivo()) {
        cartCount.textContent = "0";
        return;
    }
    const cart = getCart();
    cartCount.textContent = cart.reduce((sum, item) => sum + item.cantidad, 0);
}
function renderCart() {
    const cart = getCart();
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    updateCartCount();
    if (!usuarioActivo()) {
        if (cartList) cartList.innerHTML = "<p>Debes iniciar sesión para ver y usar el carrito.</p>";
        if (cartTotal) cartTotal.textContent = "$0";
        return;
    }
    if (!cart.length) {
        if (cartList) cartList.innerHTML = "<p>El carrito está vacío.</p>";
        if (cartTotal) cartTotal.textContent = "$0";
        return;
    }
    let html = cart.map(item => `
        <div class="d-flex align-items-center border rounded p-2 mb-2">
            <img src="${item.imagen}" alt="${item.nombre}" class="cart-img me-3">
            <div class="flex-grow-1">
                <div class="fw-bold">${item.nombre}</div>
                <div class="text-muted small mb-2">${item.descripcion}</div>
                <div class="cart-controls">
                    <button class="btn btn-outline-dark btn-sm" onclick="removeOneFromCart(${item.id})">-</button>
                    <input type="number" min="1" value="${item.cantidad}" style="width:45px;text-align:center;"
                        onchange="updateQuantity(${item.id}, this.value)">
                    <button class="btn btn-outline-dark btn-sm" onclick="addOneToCart(${item.id})">+</button>
                    <button class="btn btn-outline-danger btn-sm ms-2" title="Eliminar" onclick="removeFromCart(${item.id})">&times;</button>
                    <span class="fw-bold ms-3">$ ${item.precio * item.cantidad}</span>
                </div>
            </div>
        </div>
    `).join('');
    if (cartList) cartList.innerHTML = html;
    let total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    if (cartTotal) cartTotal.textContent = "$ " + total.toLocaleString();
}
function aplicarCupon() {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    const input = document.getElementById("cart-coupon");
    const cartTotal = document.getElementById("cart-total");
    const cart = getCart();
    let valorActual = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    cuponActual = input.value.trim().toUpperCase();
    descuentoActual = 0;

    if (cuponActual === "DESCUENTO10") {
        descuentoActual = valorActual * 0.10;
        cartTotal.textContent = "$ " + (valorActual - descuentoActual).toLocaleString();
        alert("Cupón aplicado: 10% de descuento");
    } else if (cuponActual === "DESCUENTO20") {
        descuentoActual = valorActual * 0.50;
        cartTotal.textContent = "$ " + (valorActual - descuentoActual).toLocaleString();
        alert("Cupón aplicado: 50% de descuento");
    } else {
        cartTotal.textContent = "$ " + valorActual.toLocaleString();
        alert("Cupón no válido");
    }
}
function pagarCarrito() {
    if (!usuarioActivo()) {
        alert("Debes iniciar sesión para usar el carrito.");
        return;
    }
    const cart = getCart();
    if (!cart.length) {
        alert("El carrito está vacío");
        return;
    }
    let usuario = getUsuarioActivo();
    let texto = "PEDIDO\n";
    texto += "Fecha: " + new Date().toLocaleString() + "\n";
    texto += "Usuario: " + (usuario ? usuario.nombre + " (" + usuario.email + ")" : "No identificado") + "\n\n";

    let total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    let totalFinal = total - descuentoActual;

    cart.forEach(item => {
        texto += `Producto: ${item.nombre}\nCantidad: ${item.cantidad}\nPrecio unitario: $${item.precio}\nSubtotal: $${item.precio * item.cantidad}\n\n`;
    });

    texto += "Subtotal sin descuento: $" + total + "\n";
    if (descuentoActual > 0) {
        texto += "Cupón aplicado: " + cuponActual + "\n";
        texto += "Descuento: -$" + descuentoActual + "\n";
    }
    texto += "TOTAL A PAGAR: $" + totalFinal + "\n";
    
    // Guardar contador de ventas por producto
    cart.forEach(item => {
        let countKey = "compras-producto-" + item.id;
        let compras = parseInt(localStorage.getItem(countKey)) || 0;
        localStorage.setItem(countKey, compras + item.cantidad);
    });

    let blob = new Blob([texto], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    let fecha = new Date().toISOString().replace(/[:.]/g, "-");
    a.download = "pedido_" + fecha + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("¡Gracias por tu compra! El pedido fue descargado como bloc de notas.");
    saveCart([]);
    renderCart();
}
