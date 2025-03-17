import { pool } from "../config/connectionDB.js";

// Crear notas
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    await pool.execute("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)", [
      req.user.id, // id user autenticado
      title,
      content,
    ]);
    res.status(201).json({ message: "Nota creada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Obtener notas
export const getNotes = async (req, res) => {
  try {
    const [notes] = await pool.execute("SELECT * FROM notes WHERE user_id = ?", [req.user.id]);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar notas
export const updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await pool.execute(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
      [title, content, req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nota no encontrada" }); // valiamos si se actualizo el registro

    res.json({ message: "Nota actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Eliminar nota
export const deleteNote = async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM notes WHERE id = ? AND user_id = ?", [
      req.params.id,
      req.user.id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Nota no encontrada" }); 

    res.json({ message: "Nota eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
