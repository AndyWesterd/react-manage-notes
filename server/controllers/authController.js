import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../config/connectionDB.js";

// Registrar usuarios
export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); //hasheamos el password antes de guardarlo en la bd

  try {
    await pool.execute("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);
    res.status(201).json({ message: "Registered user" });
  } catch (error) {
    res.status(400).json({ error: "User already exist" });
  }
};

// Autenticar usuario
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length === 0) return res.status(400).json({ error: "User not found" }); //Validamos que existan usuarios

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password); //Comparamos las contraseñas
    if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { // Generamos un token JWT valido por 1h
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
