

### Backend - RMApp

Guía rápida para levantar la base de datos y el servicio.

### Requisitos previos

- Docker (para la base de datos)
- Node.js 18+ y npm

### Base de datos (PostgreSQL con Docker)

El comando de abajo crea y arranca un contenedor de PostgreSQL con las credenciales por defecto del proyecto.

```bash
docker run --name rmapp-db -e POSTGRES_USER=rick -e POSTGRES_PASSWORD=morty -e POSTGRES_DB=rmapp -p 5432:5432 -d postgres
```

Comandos útiles:

```bash
# Ver contenedores corriendo
docker ps

# Detener / iniciar el contenedor
docker stop rmapp-db
docker start rmapp-db

# Eliminar el contenedor (forzado)
docker rm -f rmapp-db
```

### Variables de entorno (.env)

Crea un archivo `.env` en `backend/` con estas variables (coinciden con el contenedor Docker):

```bash
DB_HOST=localhost
DB_NAME=rmapp
DB_USER=rick
DB_PASSWORD=morty
DB_DIALECT=postgres
```

Estas variables son usadas por `src/config/db.ts` para inicializar Sequelize.

### Instalación y ejecución del backend

```bash
cd backend
npm install
npm run dev
```

### Seed de datos (Rick and Morty)

Para poblar la tabla de `characters` con datos de ejemplo:

```bash
npm run seed
```

### Problemas comunes

- Si el puerto 5432 está ocupado, libera el puerto o ajusta el mapeo `-p` del comando Docker.
- Si falla la conexión, verifica que las variables del `.env` coincidan con las del contenedor (`postgres`/`password` y DB `rmapp`).
