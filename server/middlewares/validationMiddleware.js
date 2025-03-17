import { validationResult } from "express-validator";

export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req))); // recorremos todas las validaciones

        const errors = validationResult(req); // Obtenemos los errors de validacion
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // devolvemos los errores en formato JSON
        }

        next();
    };
};
