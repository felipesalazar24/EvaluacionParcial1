//  Array de productos
const productos = [
    { id: 1, nombre: "test1", precio: 100, imagen: "assets/1.jpg", descripcion: "nose", miniaturas: ["assets/1.jpg"], atributo: "nose" },
    { id: 2, nombre: "test2", precio: 80, imagen: "assets/2.jpg", descripcion: "nose", miniaturas: ["assets/2.jpg", "assets/1.jpg"], atributo: "nose" },
    { id: 3, nombre: "test3", precio: 90, imagen: "assets/3.jpg", descripcion: "nose", miniaturas: ["assets/3.jpg","assets/2.jpg","assets/1.jpg"], atributo: "nose" },
    { id: 4, nombre: "titulo", precio: 0, imagen: "assets/3.jpg", descripcion: "nose", miniaturas: ["assets/3.jpg"], atributo: "nose" },
    { id: 5, nombre: "titulo", precio: 0, imagen: "assets/3.jpg", descripcion: "nose", miniaturas: ["assets/3.jpg"], atributo: "nose" },
    { id: 6, nombre: "titulo", precio: 0, imagen: "assets/3.jpg", descripcion: "nose", miniaturas: ["assets/3.jpg"], atributo: "nose" },
    { id: 7, nombre: "titulo", precio: 0, imagen: "assets/3.jpg", descripcion: "nose", miniaturas: ["assets/3.jpg"], atributo: "nose" },
    { id: 8, nombre: "titulo", precio: 0, imagen: "assets/3.jpg", descripcion: "nose", miniaturas: ["assets/3.jpg"], atributo: "nose" }
];

// ----------- SESIÓN DE USUARIO TEMPORAL -----------
function usuarioActivo() {
    return !!localStorage.getItem("userActivo");
}
function getUsuarioActivo() {
    return JSON.parse(localStorage.getItem("userActivo"));
}

// ----------- CARRITO FUNCIONES -----------
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
        if (prod) cart.push({...prod, cantidad});
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
    let descuento = 0;
    if (input.value.trim().toUpperCase() === "DESCUENTO10") {
        descuento = valorActual * 0.10;
        if (cartTotal) cartTotal.textContent = "$ " + (valorActual - descuento).toLocaleString();
        alert("Cupón aplicado: 10% de descuento");
    } 
    else if (input.value.trim().toUpperCase() === "DESCUENTO20") {
        descuento = valorActual * 0.50;
        if (cartTotal) cartTotal.textContent = "$ " + (valorActual - descuento).toLocaleString();
        alert("Cupón aplicado: 50% de descuento");
    } else {
        if (cartTotal) cartTotal.textContent = "$ " + valorActual.toLocaleString();
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
    cart.forEach(item => {
        texto += `Producto: ${item.nombre}\nCantidad: ${item.cantidad}\nPrecio unitario: $${item.precio}\nSubtotal: $${item.precio * item.cantidad}\n\n`;
    });
    let total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    texto += "TOTAL: $" + total + "\n";
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

// ----------- REGISTRO Y LOGIN -----------
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const telefono = document.getElementById("telefono");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    // comunasPorRegion igual que tu script actual

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valido = true;
            // Tus validaciones aquí
            if (valido) {
                const user = {
                    nombre: nombre.value.trim(),
                    email: email.value.trim(),
                    password: password.value,
                    telefono: telefono.value.trim(),
                    region: regionSelect.value,
                    comuna: comunaSelect.value
                };
                localStorage.setItem("user", JSON.stringify(user));
                alert("Registro exitoso 🎉 Ahora puedes iniciar sesión.");
                form.reset();
                window.location.href = "login.html";
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && email === storedUser.email && password === storedUser.password) {
                localStorage.setItem("userActivo", JSON.stringify(storedUser)); // usuario activo
                alert("✅ Inicio de sesión exitoso");
                window.location.href = "index.html";
            } else {
                alert("❌ Correo o contraseña incorrectos");
            }
        });
    }
});

// ----------- RENDER PRODUCTOS PARA CADA PÁGINA -----------
document.addEventListener("DOMContentLoaded", () => {
    // Página Productos
    if (document.getElementById("listado-productos")) {
        const contenedor = document.getElementById("listado-productos");
        let html = productos.map(p => `
            <div class="col-6 col-md-3">
                <div class="card h-100 text-center bg-light">
                    <a href="producto.html?id=${p.id}">
                        <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid" style="height:120px;object-fit:cover;width:100%;">
                    </a>
                    <div class="card-body">
                        <a href="producto.html?id=${p.id}" class="h6 text-primary text-decoration-none">${p.nombre}</a>
                        <p class="fw-bold mb-1">$${p.precio}</p>
                        <a href="producto.html?id=${p.id}" class="btn btn-outline-dark btn-sm">Ver</a>
                    </div>
                </div>
            </div>
        `).join('');
        contenedor.innerHTML = html;
    }
    // Página Home (productos destacados)
    if (document.getElementById("productos-destacados")) {
        const contenedor = document.getElementById("productos-destacados");
        let destacados = productos.slice(0, 8);
        let html = destacados.map(p => `
            <div class="col-6 col-md-3">
                <div class="card h-100">
                    <a href="producto.html?id=${p.id}">
                        <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid" style="height:120px;object-fit:cover;width:100%;">
                    </a>
                    <div class="card-body text-center">
                        <a href="producto.html?id=${p.id}" class="card-title h6 text-primary text-decoration-none">${p.nombre}</a>
                        <p class="text-muted mb-1 small">${p.atributo}</p>
                        <p class="fw-bold mb-0">$${p.precio}</p>
                    </div>
                </div>
            </div>
        `).join('');
        contenedor.innerHTML = html;
    }
    // Detalle de producto
    if (document.getElementById("main-img")) {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get("id")) || 1;
        const prod = productos.find(p => p.id === id) || productos[0];
        document.getElementById("breadcrumb-product").textContent = prod.nombre;
        document.getElementById("product-name").textContent = prod.nombre;
        document.getElementById("product-price").textContent = "$" + prod.precio;
        document.getElementById("main-img").src = prod.imagen;
        document.getElementById("main-img").alt = prod.nombre;
        document.getElementById("product-desc").textContent = prod.descripcion;
        // Miniaturas
        const thumbsContainer = document.getElementById("thumbs-container");
        thumbsContainer.innerHTML = prod.miniaturas.map(src =>
            `<img src="${src}" class="img-thumbnail thumb" style="height:60px;width:60px;object-fit:cover;cursor:pointer;" onclick="changeImg('${src}')">`
        ).join('');
        // Productos relacionados
        if(document.getElementById("related-products")) {
            let rels = productos.filter(p => p.id !== prod.id).slice(0,5);
            let relHTML = rels.map(p => `
                <a href="producto.html?id=${p.id}">
                    <img src="${p.imagen}" alt="${p.nombre}" class="img-thumbnail" style="height:100px;width:100px;object-fit:cover;">
                </a>
            `).join('');
            document.getElementById("related-products").innerHTML = relHTML;
        }
        // Botón añadir al carrito
        const btnCarrito = document.getElementById("btn-add-cart");
        if (btnCarrito) {
            btnCarrito.onclick = function() {
                const cantidad = parseInt(document.getElementById("cantidad").value) || 1;
                addToCart(prod.id, cantidad);
            };
        }
    }
    // Carrito
    if (document.getElementById("cart-list")) {
        renderCart();
        const aplicarCuponBtn = document.getElementById("apply-coupon");
        if (aplicarCuponBtn) aplicarCuponBtn.onclick = aplicarCupon;
        const pagarBtn = document.getElementById("pay-btn");
        if (pagarBtn) pagarBtn.onclick = pagarCarrito;
    }
    updateCartCount();

    // Header logout button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        if (usuarioActivo()) {
            logoutBtn.classList.remove("d-none");
            document.getElementById("btn-login")?.classList.add("d-none");
            document.getElementById("btn-register")?.classList.add("d-none");
        } else {
            logoutBtn.classList.add("d-none");
            document.getElementById("btn-login")?.classList.remove("d-none");
            document.getElementById("btn-register")?.classList.remove("d-none");
        }
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem("userActivo");
            saveCart([]);
            updateCartCount();
            alert("Sesión cerrada.");
            window.location.href = "index.html";
        };
    }
});

//  Cambiar miniatura principal
function changeImg(src) {
    if(document.getElementById('main-img')) {
        document.getElementById('main-img').src = src;
    }
}