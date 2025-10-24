// --- ADMINISTRADORES ---
export const administradores = [
  { email: "mati.vegaa@duocuc.cl", password: "adminmatias", nombre: "Matias" },
  { email: "fe.salazarv@duocuc.cl", password: "adminfelipe", nombre: "Felipe" },
];

// --- SESIÓN / USUARIO ---
export function usuarioActivo() {
  return !!localStorage.getItem("userActivo");
}

export function getUsuarioActivo() {
  return JSON.parse(localStorage.getItem("userActivo"));
}

export function usuarioEsAdmin() {
  const user = getUsuarioActivo();
  return user && user.esAdmin;
}

// --- LOGIN ---
export function login(email, password) {
  const admin = administradores.find(
    (a) => a.email === email && a.password === password
  );
  if (admin) {
    localStorage.setItem(
      "userActivo",
      JSON.stringify({
        nombre: admin.nombre,
        email: admin.email,
        esAdmin: true,
      })
    );
    return { success: true, isAdmin: true };
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (
    storedUser &&
    email === storedUser.email &&
    password === storedUser.password
  ) {
    localStorage.setItem("userActivo", JSON.stringify(storedUser));
    return { success: true, isAdmin: false };
  }

  return { success: false, message: "Correo o contraseña incorrectos" };
}
