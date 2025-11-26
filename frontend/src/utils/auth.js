import jwtDecode from "jwt-decode";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;

  const token = getToken();
  if (!token) return false;

  try {
    const payload = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (payload.exp && payload.exp < currentTime) {
      logout();
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error decodificando token:", err);
    logout();
    return false;
  }
}


export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  }
}

export function decodeToken() {
  if (typeof window === "undefined") return null;

  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Token inválido:", err);
    return null;
  }
}


export function getUserRole() {
  const decoded = decodeToken();
  return decoded?.rol || null; // admin / comprador / null
}


export function getUserId() {
  const decoded = decodeToken();
  return decoded?.id || null;
}

export function getUserEmail() {
  const decoded = decodeToken();
  return decoded?.email || null;
}
