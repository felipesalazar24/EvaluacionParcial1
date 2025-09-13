//  Array de productos
const productos = [
    {
        id: 1,
        nombre: "Manzana Roja",
        precio: 100,
        imagen: "assets/1.jpg",
        descripcion: "Las manzanas rojas son frutas frescas y deliciosas, ideales para cualquier ocasión.",
        miniaturas: ["assets/1.jpg", "assets/2.jpg"],
        atributo: "Fruta fresca"
    },
    {
        id: 2,
        nombre: "Banana",
        precio: 80,
        imagen: "assets/2.jpg",
        descripcion: "Las bananas son frutas tropicales con alto contenido de potasio y energía.",
        miniaturas: ["assets/2.jpg", "assets/1.jpg"],
        atributo: "Fruta tropical"
    },
    {
        id: 3,
        nombre: "Pera",
        precio: 90,
        imagen: "assets/1.jpg",
        descripcion: "Las peras son frutas jugosas y suaves, perfectas para postres y meriendas.",
        miniaturas: ["assets/1.jpg", "assets/2.jpg"],
        atributo: "Fruta de temporada"
    },
    {
        id: 4,
        nombre: "Naranja",
        precio: 70,
        imagen: "assets/2.jpg",
        descripcion: "Las naranjas aportan vitamina C, ideales en jugos naturales.",
        miniaturas: ["assets/2.jpg", "assets/1.jpg"],
        atributo: "Cítrico"
    },
    {
        id: 5,
        nombre: "Uva",
        precio: 110,
        imagen: "assets/1.jpg",
        descripcion: "Las uvas son dulces y se pueden comer solas o en ensaladas.",
        miniaturas: ["assets/1.jpg", "assets/2.jpg"],
        atributo: "Fruta en racimo"
    },
    {
        id: 6,
        nombre: "Melón",
        precio: 95,
        imagen: "assets/2.jpg",
        descripcion: "El melón es refrescante y perfecto para días calurosos.",
        miniaturas: ["assets/2.jpg", "assets/1.jpg"],
        atributo: "Fruta refrescante"
    },
    {
        id: 7,
        nombre: "Sandía",
        precio: 120,
        imagen: "assets/1.jpg",
        descripcion: "La sandía es la fruta ideal para hidratarte en verano.",
        miniaturas: ["assets/1.jpg", "assets/2.jpg"],
        atributo: "Fruta grande"
    },
    {
        id: 8,
        nombre: "Kiwi",
        precio: 130,
        imagen: "assets/2.jpg",
        descripcion: "El kiwi tiene un sabor único y es rico en vitamina C.",
        miniaturas: ["assets/2.jpg", "assets/1.jpg"],
        atributo: "Fruta exótica"
    }
];


//  HTML Registro
document.addEventListener("DOMContentLoaded", () => {
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

    document.getElementById("buttonLogin").addEventListener("click", function () {
        window.location.href = "login.html";
    });
    document.getElementById("buttonRegister").addEventListener("click", function () {
        window.location.href = "register.html";
    });
});

//  HTML Log In
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();


            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");

            if (email === storedEmail && password === storedPassword) {
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
        const thumbs = document.querySelectorAll(".thumb");
        prod.miniaturas.forEach((src, idx) => {
            if (thumbs[idx]) thumbs[idx].src = src;
        });

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
    }
});

//  Función global para las miniaturas
function changeImg(src) {
    if(document.getElementById('main-img')) {
        document.getElementById('main-img').src = src;
    }
}