# Backend - RMApp

API GraphQL para la aplicación Rick and Morty con PostgreSQL, Redis cache, y sistema de migraciones.

##  Características

- **GraphQL API** con Apollo Server
- **PostgreSQL** con Sequelize ORM
- **Redis Cache** para optimización de rendimiento
- **Sistema de migraciones** para control de versiones de BD
- **Middleware de logging** configurable
- **Decoradores** para timing de operaciones
- **Tests unitarios** con Jest
- **Docker Compose** para desarrollo local

##  Requisitos previos

- **Docker** y **Docker Compose** (para base de datos y Redis)
- **Node.js 18+** y **npm**
- **Git**

## Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/sergepin/RMApp.git
cd RMApp/backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la carpeta `backend/`:

```env
# Base de datos PostgreSQL
DB_HOST=localhost
DB_NAME=rmapp
DB_USER=rick
DB_PASSWORD=morty
DB_DIALECT=postgres

# Redis Cache
REDIS_URL=redis://localhost:6379

# Entorno
NODE_ENV=development
```

### 4. Levantar servicios con Docker Compose
```bash
# Desde la raíz del proyecto (donde está docker-compose.yml)
docker-compose up -d
```

Esto levanta:
- **PostgreSQL** en puerto `5432`
- **Redis** en puerto `6379`

### 5. Ejecutar migraciones
```bash
npm run migrate
```

### 6. Poblar datos de ejemplo
```bash
npm run seed
```

### 7. Iniciar el servidor de desarrollo
```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:4000/graphql`

## Scripts del package.json

### **Desarrollo**
```bash
npm run dev                    # Inicia el servidor con nodemon y hot reload
```

### **Base de datos**
```bash
npm run migrate               # Ejecuta migraciones pendientes
npm run migrate:undo          # Revierte la última migración
npm run migrate:undo:all      # Revierte todas las migraciones
npm run migrate:create -- <nombre>  # Crea una nueva migración
npm run db:create             # Crea la base de datos
npm run db:init               # Crea la base de datos -> Migrate -> Seed
npm run db:drop               # Elimina la base de datos
npm run db:reset              # Reinicia BD: drop → create → migrate → seed
```

### **Datos**
```bash
npm run seed                  # Pobla la BD con personajes de Rick and Morty
```

### **Cache**
```bash
npm run flush-cache           # Limpia todo el cache de Redis
```

### **Testing**
```bash
npm test                      # Ejecuta tests unitarios
```

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/              # Configuración de BD y Redis
│   ├── decorators/          # Decoradores (timing, etc.)
│   ├── graphql/             # Schema y resolvers GraphQL
│   ├── middleware/          # Middlewares de Express
│   ├── migrations/          # Migraciones de Sequelize
│   ├── models/              # Modelos de Sequelize
│   ├── seed/                # Scripts de población de datos
│   ├── utils/               # Utilidades (cache, etc.)
│   └── __tests__/           # Tests unitarios
├── docker-compose.yml       # Configuración de servicios
├── frontend                 # App frontend react
└── package.json
```

##  Patrones de diseño implementados

- **Repository Pattern**: Modelos de Sequelize
- **Decorator Pattern**: Timing de operaciones
- **Middleware Pattern**: Logging configurable
- **Factory Pattern**: Generación de claves de cache
- **Strategy Pattern**: Estrategias de cache
- **Observer Pattern**: Eventos de Redis
- **Dependency Injection**: Resolvers GraphQL

## Testing

Los tests incluyen:
- ✅ Búsqueda de personajes por nombre
- ✅ Filtros por status, species, gender, origin
- ✅ Filtros múltiples simultáneos
- ✅ Casos edge (sin resultados, errores)
- ✅ Funcionalidad de cache

##  Monitoreo y logs

El sistema genera logs con prefijos identificables:
- **MIDDLEWARE** - Logs de requests/responses
- **REDIS CACHE** - Logs de operaciones de cache
- **DECORATOR** - Logs de timing de operaciones

##  Comandos Docker útiles

```bash
# Ver contenedores corriendo
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

### **Error de conexión a la BD**
- Verificar que Docker esté corriendo
- Verificar variables del `.env`
- Verificar que el contenedor esté activo: `docker ps`

### **Error de migraciones**
```bash
# Revertir y volver a aplicar
npm run migrate:undo:all
npm run migrate
```

### **Cache no funciona**
```bash
# Limpiar cache
npm run flush-cache

# Verificar conexión a Redis
docker exec -it rmapp-redis redis-cli PING
```

## API GraphQL

### Ejemplo de query
```graphql
query GetCharacters {
  characters(name: "Rick", status: "Alive") {
    id
    name
    species
    status
    gender
    origin
    image
  }
}
```

### Ejemplo de query individual
```graphql
query GetCharacter {
  character(id: 1) {
    id
    name
    species
    status
  }
}
```

