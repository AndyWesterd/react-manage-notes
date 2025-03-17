import { body } from "express-validator";

export const registerValidation = [
    body("username").notEmpty().withMessage("Username and password are required"), //validamos que el campo username no este vacío
    body("password")
        .isLength({ min: 6 })
        .withMessage("The password must be least 6 characters long"),// password minimo 6 caracteres
];

export const loginValidation = [
    body("username").notEmpty().withMessage("Username and password are required"),
    body("password").notEmpty().withMessage("Username and password are required"),
];
