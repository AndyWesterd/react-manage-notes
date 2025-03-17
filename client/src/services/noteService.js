import axios from "axios";
import { getAuthHeaders } from "./authService.js";

const API_URL = "http://localhost:5000/api/notes";
//obtenemos las notas
export const getNotes = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() }); // solo si el usuario esta autenticado
    return response.data;
};
//creamos notas
export const createNote = async (noteData) => {
    await axios.post(API_URL, noteData, { headers: getAuthHeaders() });
};
// actualizamos las notas
export const updateNote = async (id, noteData) => {
    await axios.put(`${API_URL}/${id}`, noteData, { headers: getAuthHeaders() });
};
// eliminamos las notas
export const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
