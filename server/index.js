import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // Utilizamos cors para todas las solicitudes

app.use("/api/auth", authRoutes);// rutas principales
app.use("/api/notes", notesRoutes);

/* app.get("/", (req, res) => {
    res.send("Welcome server..");
}); */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
