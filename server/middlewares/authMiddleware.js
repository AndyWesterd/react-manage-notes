import jwt from "jsonwebtoken";

//Validamos el token de autenticación
export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Acceso denegado" }); // Si no hay token

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => { //Validamos si el token es valido
        if (err) return res.status(403).json({ message: "Token inválido" });
        req.user = decoded;
        next();
    });
};
