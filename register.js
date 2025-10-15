
// --- REGISTRO DE USUARIO (validación visual mejorada) ---
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
        function setValid(input) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
            input.nextElementSibling.style.display = "none";
        }
    }
    function setInvalid(input, msg) {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("invalid-feedback")) {
            input.nextElementSibling.textContent = msg;
            input.nextElementSibling.style.display = "";
        }
    }

    function validarEmail(email) {
        // Solo acepta los dominios @gmail.com, @duocuc.cl, @profesor.duoc.cl
        return /^[a-zA-Z0-9._%+-]+@(gmail\.com|duocuc\.cl|profesor\.duoc\.cl)$/.test(email);
    }
    function validarPassword(pass) {
        // De 4 a 10 caracteres
        return pass.length >= 4 && pass.length <= 10;
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

            // Nombre
            if (!nombre.value.trim()) {
                setInvalid(nombre, "Por favor ingresa tu nombre completo.");
                valido = false;
            } else {
                setValid(nombre);
            }

            // Correo
            if (!email.value.trim()) {
                setInvalid(email, "Por favor ingresa tu correo electrónico.");
                valido = false;
            } else if (!validarEmail(email.value.trim())) {
                setInvalid(email, "Esta dirección de correo no es válida.");
                valido = false;
            } else {
                setValid(email);
            }

            // Contraseña
            if (!password.value) {
                setInvalid(password, "Por favor ingresa una contraseña.");
                valido = false;
            } else if (!validarPassword(password.value)) {
                setInvalid(password, "La contraseña debe tener entre 4 y 10 caracteres.");
                valido = false;
            } else {
                setValid(password);
            }

            // Confirmar contraseña
            if (!password2.value || password.value !== password2.value) {
                setInvalid(password2, "Las contraseñas no coinciden.");
                valido = false;
            } else {
                setValid(password2);
            }

            // Teléfono
            if (!validarTelefono(telefono.value)) {
                setInvalid(telefono, "Ingresa un número de teléfono válido (+569 12345678).");
                valido = false;
            } else {
                setValid(telefono);
            }

            // Región
            if (!regionSelect.value) {
                setInvalid(regionSelect, "Por favor selecciona una región.");
                valido = false;
            } else {
                setValid(regionSelect);
            }

            // Comuna
            if (!comunaSelect.value) {
                setInvalid(comunaSelect, "Por favor selecciona una comuna.");
                valido = false;
            } else {
                setValid(comunaSelect);
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
                [nombre, email, password, password2, telefono, regionSelect, comunaSelect].forEach(i => i.classList.remove('is-valid', 'is-invalid'));
                window.location.href = "login.html";
            }
        });

        // Limpiar marcas al editar
        [nombre, email, password, password2, telefono, regionSelect, comunaSelect].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('is-valid', 'is-invalid');
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')) {
                        input.nextElementSibling.style.display = "none";
                    }
                });
            }
        });
    }
});
