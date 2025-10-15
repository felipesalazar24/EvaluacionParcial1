
// --- RENDER PRODUCTOS PARA CADA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    // Página Productos
    if (document.getElementById("listado-productos")) {
    const contenedor = document.getElementById("listado-productos");
    let html = productos.map(p => `
        <div class="col-6 col-md-3">
            <div class="card h-100 text-center bg-light">
                <a href="producto.html?id=${p.id}">
                    <div class="card-img-area">
                        <img src="${p.imagen}" alt="${p.nombre}">
                    </div>
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

// Página Home (productos destacados) - ORDENADOS POR MÁS COMPRADOS
if (document.getElementById("productos-destacados")) {
    const contenedor = document.getElementById("productos-destacados");
    // Ordenar productos por cantidad vendida (más comprados primero)
    let productosOrdenados = productos.slice().sort((a, b) => {
        let aCount = parseInt(localStorage.getItem("compras-producto-" + a.id)) || 0;
        let bCount = parseInt(localStorage.getItem("compras-producto-" + b.id)) || 0;
        return bCount - aCount;
    });
    let destacados = productosOrdenados.slice(0, 8); // los 8 más vendidos
    let html = destacados.map(p => `
        <div class="col-6 col-md-3">
            <div class="card h-100">
                <a href="producto.html?id=${p.id}">
                    <div class="card-img-area">
                        <img src="${p.imagen}" alt="${p.nombre}">
                    </div>
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
        // Productos relacionados (por atributo similar)
    if (document.getElementById("related-products")) {
    let rels = productos
        .filter(p => p.id !== prod.id && (
            // Mismo atributo exacto
            p.atributo.toLowerCase() === prod.atributo.toLowerCase() ||
            // Palabra clave parecida (ej: teclado y mouse = "periférico")
            (["Teclado", "Mouse", "Audifono", "Monitor"].includes(p.atributo.toLowerCase()) &&
             ["Teclado", "Mouse", "Audifono", "Monitor"].includes(prod.atributo.toLowerCase()))
        ))
        .slice(0, 5);

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
            btnCarrito.onclick = function () {
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

    // --- MANEJO DE MENÚ SUPERIOR Y LOGOUT ---
    const logoutBtn = document.getElementById("logout-btn");
    const loginBtn = document.getElementById("btn-login");
    const registerBtn = document.getElementById("btn-register");
    const carritoBtn = document.getElementById("btn-carrito");
    const adminBtn = document.getElementById("admin-btn");

    // Mostrar/ocultar botones según el tipo de usuario
    if (usuarioActivo()) {
        if (logoutBtn) logoutBtn.classList.remove("d-none");
        if (loginBtn) loginBtn.classList.add("d-none");
        if (registerBtn) registerBtn.classList.add("d-none");

    if (usuarioEsAdmin()) {
        if (carritoBtn) carritoBtn.classList.remove("d-none"); // El admin ve el carrito igual que los usuarios normales
        if (adminBtn) adminBtn.classList.remove("d-none");
        } else {
        if (carritoBtn) carritoBtn.classList.remove("d-none");
        if (adminBtn) adminBtn.classList.add("d-none");
        }
    } else {
        if (logoutBtn) logoutBtn.classList.add("d-none");
        if (loginBtn) loginBtn.classList.remove("d-none");
        if (registerBtn) registerBtn.classList.remove("d-none");
        if (carritoBtn) carritoBtn.classList.remove("d-none");
        if (adminBtn) adminBtn.classList.add("d-none");
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.onclick = function (e) {
            e.preventDefault();
            localStorage.removeItem("userActivo");
            if (!usuarioEsAdmin()) {
                saveCart([]);
            }
            updateCartCount();
            alert("Sesión cerrada.");
            window.location.href = "index.html";
        };
    }
});


//  Cambiar miniatura principal
function changeImg(src) {
    if (document.getElementById('main-img')) {
        document.getElementById('main-img').src = src;
    }
}