import express from "express";
import { register, login } from "../controllers/authController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { registerValidation, loginValidation } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register); // aplicamos las validaciones en el middleware y ejecutamos el controller
router.post("/login", validate(loginValidation), login);

export default router;