import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/notesController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { noteValidation } from "../validations/noteValidation.js";


const notesRoutes = express.Router();

notesRoutes.post("/", verifyToken, validate(noteValidation), createNote); // verificamos user autenticado, aplicamos validaciones, ejecutamos controller
notesRoutes.get("/", verifyToken, getNotes);
notesRoutes.put("/:id", verifyToken, validate(noteValidation), updateNote);
notesRoutes.delete("/:id", verifyToken, deleteNote);

export default notesRoutes;