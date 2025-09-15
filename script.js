// --- PRODUCTOS ---
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

// --- SESIÓN / USUARIO ---
function usuarioActivo() {
    return !!localStorage.getItem("userActivo");
}
function getUsuarioActivo() {
    return JSON.parse(localStorage.getItem("userActivo"));
}

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

// --- REGISTRO DE USUARIO ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const telefono = document.getElementById("telefono");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    // Diccionario de comunas por región
    const comunasPorRegion = {
        "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
        "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
        "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
        "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
        "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
        "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "La Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María"],
        "Metropolitana": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
        "O´Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
        "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
        "Ñuble": ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
        "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
        "Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
        "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
        "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo"],
        "Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Río Ibañez", "Chile Chico", "Cochrane", "O'Higgins", "Tortel"],
        "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    };

    // Actualiza comunas al cambiar la región
    if (regionSelect && comunaSelect) {
        regionSelect.addEventListener("change", () => {
            const comunas = comunasPorRegion[regionSelect.value] || [];
            comunaSelect.innerHTML = '<option value="" selected disabled>--Seleccione la comuna--</option>';
            comunas.forEach(comuna => {
                const option = document.createElement("option");
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
        });
    }

    // Validaciones
    function validarEmail(email) {
        // Solo acepta los dominios @gmail.com, @duocuc.cl, @profesor.duoc.cl
        return /^[a-zA-Z0-9._%+-]+@(gmail\.com|duocuc\.cl|profesor\.duoc\.cl)$/.test(email);
    }
    function validarPassword(pass) {
        // De 4 a 10 caracteres
        return pass.length >= 4 && pass.length <= 10;
    }
    function validarTelefono(tel) {
        if (tel.trim() === "") return true; // Opcional
        const sanitized = tel.replace(/\s+/g, "");
        return /^\+569\d{8}$/.test(sanitized);
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valido = true;

            // Nombre obligatorio
            if (!nombre.value.trim()) {
                nombre.classList.add("is-invalid");
                valido = false;
            } else {
                nombre.classList.remove("is-invalid");
                nombre.classList.add("is-valid");
            }

            // Email obligatorio y formato válido
            if (!email.value.trim() || !validarEmail(email.value.trim())) {
                email.classList.add("is-invalid");
                valido = false;
            } else {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
            }

            // Password obligatorio y formato válido
            if (!password.value || !validarPassword(password.value)) {
                password.classList.add("is-invalid");
                valido = false;
            } else {
                password.classList.remove("is-invalid");
                password.classList.add("is-valid");
            }

            // Password2 obligatorio y debe coincidir
            if (!password2.value || password.value !== password2.value) {
                password2.classList.add("is-invalid");
                valido = false;
            } else {
                password2.classList.remove("is-invalid");
                password2.classList.add("is-valid");
            }

            // Teléfono opcional pero si se pone debe ser válido
            if (!validarTelefono(telefono.value)) {
                telefono.classList.add("is-invalid");
                valido = false;
            } else {
                telefono.classList.remove("is-invalid");
                telefono.classList.add("is-valid");
            }

            // Región obligatoria
            if (!regionSelect.value) {
                regionSelect.classList.add("is-invalid");
                valido = false;
            } else {
                regionSelect.classList.remove("is-invalid");
                regionSelect.classList.add("is-valid");
            }

            // Comuna obligatoria
            if (!comunaSelect.value) {
                comunaSelect.classList.add("is-invalid");
                valido = false;
            } else {
                comunaSelect.classList.remove("is-invalid");
                comunaSelect.classList.add("is-valid");
            }

            // Si todo OK, guardar y redirigir
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

// --- LOGIN ---
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

// --- RENDER PRODUCTOS PARA CADA PÁGINA ---
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