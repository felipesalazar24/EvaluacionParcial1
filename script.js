
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
        const regex = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/;
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