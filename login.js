
// --- ADMINISTRADORES ---

const administradores = [
    { email: "mati.vegaa@duocuc.cl", password: "adminmatias", nombre: "Matias" },
    { email: "fe.salazarv@duocuc.cl", password: "adminfelipe", nombre: "Felipe" }
];


// --- SESIÓN / USUARIO ---
function usuarioActivo() {
    return !!localStorage.getItem("userActivo");
}
function getUsuarioActivo() {
    return JSON.parse(localStorage.getItem("userActivo"));
}
function usuarioEsAdmin() {
    const user = getUsuarioActivo();
    return user && user.esAdmin;
}

// --- LOGIN ---
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();
            const storedUser = JSON.parse(localStorage.getItem("user"));

            // --- Check si es uno de los administradores ---
            const admin = administradores.find(a => a.email === email && a.password === password);
            if (admin) {
                localStorage.setItem("userActivo", JSON.stringify({
                    nombre: admin.nombre,
                    email: admin.email,
                    esAdmin: true
                }));
                alert("✅ Bienvenido Administrador");
                window.location.href = "index.html";
                return;
            }

            // --- Usuario normal ---
            if (storedUser && email === storedUser.email && password === storedUser.password) {
                localStorage.setItem("userActivo", JSON.stringify(storedUser)); // usuario activo normal
                alert("✅ Inicio de sesión exitoso");
                window.location.href = "index.html";
            } else {
                alert("❌ Correo o contraseña incorrectos");
            }
        });
    }
});
