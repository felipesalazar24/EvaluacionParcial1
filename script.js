//  Array de productos
const productos = [
    {
        id: 1,
        nombre: "test1",
        precio: 100,
        imagen: "assets/1.jpg",
        descripcion: "nose",
        miniaturas: ["assets/1.jpg"],
        atributo: "nose"
    },
    {
        id: 2,
        nombre: "test2",
        precio: 80,
        imagen: "assets/2.jpg",
        descripcion: "nose",
        miniaturas: ["assets/2.jpg", "assets/1.jpg"],
        atributo: "nose"
    },
    {
        id: 3,
        nombre: "test3",
        precio: 90,
        imagen: "assets/3.jpg",
        descripcion: "nose",
        miniaturas: ["assets/3.jpg","assets/2.jpg","assets/1.jpg"],
        atributo: "nose"
    },
    {
        id: 4,
        nombre: "titulo",
        precio: 0,
        imagen: "assets/3.jpg",
        descripcion: "nose",
        miniaturas: ["assets/3.jpg"],
        atributo: "nose"
    },
    {
        id: 5,
        nombre: "titulo",
        precio: 0,
        imagen: "assets/3.jpg",
        descripcion: "nose",
        miniaturas: ["assets/3.jpg"],
        atributo: "nose"
    },
    {
        id: 6,
        nombre: "titulo",
        precio: 0,
        imagen: "assets/3.jpg",
        descripcion: "nose",
        miniaturas: ["assets/3.jpg"],
        atributo: "nose"
    },
    {
        id: 7,
        nombre: "titulo",
        precio: 0,
        imagen: "assets/3.jpg",
        descripcion: "nose",
        miniaturas: ["assets/3.jpg"],
        atributo: "nose"
    },
    {
        id: 8,
        nombre: "titulo",
        precio: 0,
        imagen: "assets/3.jpg",
        descripcion: "nose",
        miniaturas: ["assets/3.jpg"],
        atributo: "nose"
    }
];

//  Utils Carrito
function getCart() {
    return JSON.parse(localStorage.getItem("informacion-carrito")) || [];
}
function saveCart(cart) {
    localStorage.setItem("informacion-carrito", JSON.stringify(cart));
}

//  Añadir producto al carrito
function addToCart(productId, cantidad = 1) {
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

//  Eliminar producto del carrito
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

//  Sumar uno a la cantidad
function addOneToCart(productId) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.cantidad += 1;
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
}

//  Restar uno a la cantidad (mínimo 1)
function removeOneFromCart(productId) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item && item.cantidad > 1) {
        item.cantidad -= 1;
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
}

//  Cambiar cantidad manualmente
function updateQuantity(productId, cantidad) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.cantidad = Math.max(1, parseInt(cantidad) || 1);
        saveCart(cart);
        renderCart();
        updateCartCount();
    }
}

//  Contador carrito en header
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.cantidad, 0);
    }
}

//  HTML Carrito: Renderizar el carrito en la página
function renderCart() {
    const cart = getCart();
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    updateCartCount();

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

//  HTML Carrito: Aplicar cupón de descuento
function aplicarCupon() {
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

//  HTML Carrito: Pagar carrito
function pagarCarrito() {
    const cart = getCart();
    if (!cart.length) {
        alert("El carrito está vacío");
        return;
    }

    // Generar el texto del pedido
    let texto = "PEDIDO\n";
    texto += "Fecha: " + new Date().toLocaleString() + "\n\n";
    cart.forEach(item => {
        texto += `Producto: ${item.nombre}\nCantidad: ${item.cantidad}\nPrecio unitario: $${item.precio}\nSubtotal: $${item.precio * item.cantidad}\n\n`;
    });
    let total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    texto += "TOTAL: $" + total + "\n";

    // Crear y descargar el archivo .txt
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

//  HTML Registro
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const telefono = document.getElementById("telefono");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const emptyMessage = document.getElementById("emptyMessage");

    const comunasPorRegion = {
        "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
        "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama"],
        "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Huasco", "Freirina", "Alto del Carmen"],
        "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Ovalle", "Monte Patria", "Punitaqui", "Río Hurtado", "Illapel", "Canela", "Los Vilos", "Salamanca"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "Quillota", "La Calera", "La Cruz", "Hijuelas", "Nogales", "San Antonio", "Cartagena", "El Tabo", "El Quisco", "Algarrobo"],
        "Metropolitana": ["Santiago", "Maipú", "Puente Alto", "Las Condes", "Ñuñoa", "La Florida", "Pudahuel", "Peñalolén", "Quilicura", "Lo Barnechea", "Recoleta", "Estación Central", "Huechuraba", "San Bernardo", "La Pintana"],
        "O´Higgins": ["Rancagua", "Machalí", "Graneros", "San Fernando", "Santa Cruz", "Pichilemu", "Rengo", "San Vicente"],
        "Maule": ["Talca", "Curicó", "Linares", "Constitución", "Parral", "Cauquenes", "San Javier", "Maule"],
        "Ñuble": ["Chillán", "Chillán Viejo", "San Carlos", "Yungay", "Bulnes", "Coihueco", "Quillón", "San Ignacio"],
        "Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Coronel", "Los Ángeles", "Lota", "Chiguayante", "Hualpén", "Tomé"],
        "Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Collipulli", "Victoria", "Lautaro"],
        "Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Paillaco", "Panguipulli", "Lanco", "Futrono"],
        "Los Lagos": ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud", "Quellón", "Chaitén", "Frutillar"],
        "Aysén": ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"],
        "Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
    };

    if (regionSelect) {
        regionSelect.addEventListener("change", () => {
            const regionSeleccionada = regionSelect.value;
            comunaSelect.innerHTML = '<option value="">--Seleccione la comuna--</option>';

            if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
                comunasPorRegion[regionSeleccionada].forEach(comuna => {
                    const option = document.createElement("option");
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            }
        });
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@(duocuc\.cl|gmail\.com|profesor.duoc.cl)$/;
        return regex.test(email);
    }

    function validarPassword(pass) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;
        return regex.test(pass);
    }

    function validarTelefono(tel) {
        if (tel.trim() === "") return true;
        const sanitized = tel.replace(/\s+/g, "");
        return /^\+569\d{8}$/.test(sanitized);
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let valido = true;

            if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{1,50}$/.test(nombre.value.trim())) {
                nombre.classList.add("is-invalid");
                valido = false;
            } else {
                nombre.classList.remove("is-invalid");
                nombre.classList.add("is-valid");
            }

            if (!validarEmail(email.value.trim())) {
                email.classList.add("is-invalid");
                valido = false;
            } else {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
            }

            if (!validarPassword(password.value)) {
                password.classList.add("is-invalid");
                valido = false;
            } else {
                password.classList.remove("is-invalid");
                password.classList.add("is-valid");
            }

            if (password.value !== password2.value || password2.value.trim() === "") {
                password2.classList.add("is-invalid");
                valido = false;
            } else {
                password2.classList.remove("is-invalid");
                password2.classList.add("is-valid");
            }

            if (!validarTelefono(telefono.value)) {
                telefono.classList.add("is-invalid");
                valido = false;
            } else {
                telefono.classList.remove("is-invalid");
                telefono.classList.add("is-valid");
            }

            if (!regionSelect.value) {
                regionSelect.classList.add("is-invalid");
                valido = false;
            } else {
                regionSelect.classList.remove("is-invalid");
                regionSelect.classList.add("is-valid");
            }

            if (!comunaSelect.value) {
                comunaSelect.classList.add("is-invalid");
                valido = false;
            } else {
                comunaSelect.classList.remove("is-invalid");
                comunaSelect.classList.add("is-valid");
            }

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

    const buttonLogin = document.getElementById("buttonLogin");
    if (buttonLogin) {
        buttonLogin.addEventListener("click", function () {
            window.location.href = "login.html";
        });
    }
    const buttonRegister = document.getElementById("buttonRegister");
    if (buttonRegister) {
        buttonRegister.addEventListener("click", function () {
            window.location.href = "register.html";
        });
    }
});

//  HTML Log In
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser && email === storedUser.email && password === storedUser.password) {
                alert("✅ Inicio de sesión exitoso");
                window.location.href = "index.html"; 
            } else {
                alert("❌ Correo o contraseña incorrectos");
            }
        });
    }
});

//  HTML Home
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    if (document.getElementById("productos-destacados")) {
        // Renderiza los productos destacados en el Home
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
});

//  HTML Productos
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    if (document.getElementById("listado-productos")) {
        // Renderiza el listado de productos en la página de productos
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
});

//  HTML Detalle Producto
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    if (document.getElementById("main-img")) {
        // Renderiza el detalle del producto en la página de detalle
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
});

//  HTML Carrito
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-list")) {
        renderCart();

        const aplicarCuponBtn = document.getElementById("apply-coupon");
        if (aplicarCuponBtn) {
            aplicarCuponBtn.onclick = aplicarCupon;
        }

        const pagarBtn = document.getElementById("pay-btn");
        if (pagarBtn) {
            pagarBtn.onclick = pagarCarrito;
        }
    }
});

//  Función global para las miniaturas
function changeImg(src) {
    if(document.getElementById('main-img')) {
        document.getElementById('main-img').src = src;
    }
}