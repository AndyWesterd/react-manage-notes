import { body } from "express-validator";

export const noteValidation = [
    body("title").notEmpty().withMessage("El título es obligatorio"), // validamos campos no vacíos
    body("content").notEmpty().withMessage("El contenido es obligatorio"),
];
