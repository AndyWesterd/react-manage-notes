import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Cargamos las variables de entorno desde .env

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'prueba_commerk_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("Ya tamos conectados a MySQL");