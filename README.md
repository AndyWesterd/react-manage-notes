# Gestionar notas con React, Node js, Express y MySQL

# Instalación y configuración 
# Clonar repositorio
git clone https://github.com/AndyWesterd/react-manage-notes.git
cd repositorio 

# Configuración del Backend
cd .\server\
npm install

# Configuración variables de entorno
Creamos un archivo .env en la carpeta server y agregamos
PORT=5000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_tu_base_de_datos
JWT_SECRET=tu_secreto_para_jwt

# Ejecutar el servidor
npm run dev


# Configuración del frontend
cd .\client\
npm install

# Ejecutar cliente 
npm run dev