
// --- FORMULARIO DE CONTACTO (validación visual estilo Bootstrap) ---
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const contenidoInput = document.getElementById('contenido');

    // Helpers para mostrar feedback
    function setValid(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')) {
            input.nextElementSibling.style.display = "none";
        }
    }
    function setInvalid(input, msg) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')) {
            input.nextElementSibling.textContent = msg;
            input.nextElementSibling.style.display = "";
        }
    }

    if (contactForm && nombreInput && correoInput && contenidoInput) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let valido = true;

            // Validar nombre y correo contra usuarios registrados
            const nombre = nombreInput.value.trim();
            const correo = correoInput.value.trim();
            const contenido = contenidoInput.value.trim();

            // Nombre
            let usuarioValido = false;
            const usuarioGuardado = JSON.parse(localStorage.getItem("user"));
            if (usuarioGuardado && usuarioGuardado.nombre === nombre && usuarioGuardado.email === correo) {
                usuarioValido = true;
            }
            if (typeof administradores !== "undefined" && Array.isArray(administradores)) {
                if (administradores.some(admin => admin.nombre === nombre && admin.email === correo)) {
                    usuarioValido = true;
                }
            }
            if (!nombre) {
                setInvalid(nombreInput, "Por favor ingresa tu nombre completo.");
                valido = false;
            } else if (!usuarioValido) {
                setInvalid(nombreInput, "Nombre y correo deben coincidir con un usuario registrado.");
                valido = false;
            } else {
                setValid(nombreInput);
            }

            // Correo
            // Validar formato de correo
            function validarEmail(email) {
                // Puedes usar una RegExp básica (opcional)
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
            if (!correo) {
                setInvalid(correoInput, "Por favor ingresa tu correo electrónico.");
                valido = false;
            } else if (!validarEmail(correo)) {
                setInvalid(correoInput, "Por favor ingresa un correo electrónico válido.");
                valido = false;
            } else if (!usuarioValido) {
                setInvalid(correoInput, "Nombre y correo deben coincidir con un usuario registrado.");
                valido = false;
            } else {
                setValid(correoInput);
            }

            // Contenido
            if (!contenido) {
                setInvalid(contenidoInput, "Por favor ingresa el contenido del mensaje.");
                valido = false;
            } else {
                setValid(contenidoInput);
            }

            // Si todo OK, guardar mensaje
            if (valido) {
                let mensajes = [];
                try {
                    mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
                } catch { mensajes = []; }
                mensajes.push({
                    nombre,
                    correo,
                    contenido,
                    fecha: new Date().toLocaleString()
                });
                localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
                contactForm.reset();
                [nombreInput, correoInput, contenidoInput].forEach(i => i.classList.remove('is-valid', 'is-invalid'));
                alert('¡Mensaje enviado exitosamente!');
            }
        });

        // Limpiar marcas al editar
        [nombreInput, correoInput, contenidoInput].forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-valid', 'is-invalid');
                if (input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')) {
                    input.nextElementSibling.style.display = "none";
                }
            });
        });
    }
});