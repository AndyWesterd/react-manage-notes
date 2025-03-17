import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Devolvemos la respuesta en JSON
    } catch (error) {
        throw error.response?.data?.error || error.response?.data?.errors[0].msg || "Error in registration"; // Captura errores de API
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const token = response.data.token;

        if (token) {
            localStorage.setItem("token", token);
        }

        return token;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.response?.data?.errors[0].msg || "Error at login");
    }
};

// verificar si el usuario está autenticado
export const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Devuelve `true` si el token existe
};

export const getAuthHeaders = () => { // obtenemos el token del encabezado
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem("token");
};