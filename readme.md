# Multiverse Explorer - Rick & Morty App

Una aplicación completa para explorar y gestionar personajes de Rick & Morty con funcionalidades avanzadas de búsqueda, filtrado, favoritos, comentarios y soft delete.

## Características

- **Frontend React** con TypeScript y TailwindCSS
- **Backend GraphQL** con Apollo Server
- **Base de datos PostgreSQL** con Sequelize ORM
- **Cache Redis**
- **Sistema de migraciones** para control de DB
- **Docker Compose** para desarrollo local
- **Tests unitarios** en frontend y backend

## Tecnologías

### Frontend
- React 19 + TypeScript
- Vite + TailwindCSS
- Apollo Client (GraphQL)
- React Icons
- Vitest (testing)

### Backend
- Node.js + TypeScript
- Apollo Server (GraphQL)
- PostgreSQL + Sequelize
- Redis (cache)
- Jest (testing)

## Instalación Rápida

### 1. Clonar repositorio
```bash
git clone https://github.com/sergepin/RMApp.git
cd RMApp
```

### 2. Levantar servicios con Docker
```bash
docker-compose up -d
```

### 3. Configurar backend
```bash
cd backend
npm install

# Crear archivo .env
Con fines demostrativos repositorio, reconozco que esta es una practica que **nunca** se debe hacer pero dada la naturaleza del proyecto no hay problema

# Inicializar base de datos
npm run db:init

# Iniciar servidor
npm run dev
```

**Alternativa**: Si prefieres un setup automático, puedes usar:
```bash
cd backend
npm install
npm run setup  # Crea .env automáticamente y ejecuta db:init
npm run dev
```

### 4. Configurar frontend
```bash
cd ../frontend
npm install

# Iniciar aplicación
npm run dev
```

## URLs de acceso

- **Frontend**: http://localhost:3000
- **Backend GraphQL**: http://localhost:4000/graphql
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Estructura del proyecto

```
RMApp/
├── frontend/          # Aplicación React
├── backend/           # API GraphQL
├── docker-compose.yml # Servicios Docker
└── readme.md         # Este archivo
```

## Documentación detallada

- **Backend**: Ver [backend/readme.md](backend/readme.md) para detalles de la API GraphQL, migraciones, testing y más
- **Frontend**: Ver [frontend/README.md](frontend/README.md) para componentes, hooks, testing y funcionalidades

## Scripts útiles

### Backend
```bash
cd backend
npm run dev              # Servidor de desarrollo
npm run db:init          # Inicializar BD (create + migrate + seed)
npm run db:reset         # Reiniciar BD completa
npm run test             # Ejecutar tests
npm run flush-cache      # Limpiar cache Redis
```

### Frontend
```bash
cd frontend
npm run dev              # Servidor de desarrollo
npm run build            # Build para producción
npm run test             # Ejecutar tests
npm run preview          # Preview del build
```

### Docker
```bash
docker-compose up -d     # Levantar servicios
docker-compose down      # Detener servicios
docker-compose logs -f   # Ver logs en tiempo real
```

## Funcionalidades principales

- **Exploración de personajes** con búsqueda y filtros avanzados
- **Sistema de favoritos** con persistencia en BD
- **Comentarios** por personaje
- **Soft delete** para gestionar personajes eliminados
- **Diseño responsive** para desktop y móvil
- **Cache inteligente** para mejor rendimiento

##  Troubleshooting

### Problemas comunes

**Error de conexión a la BD**
```bash
# Verificar que Docker esté corriendo
docker ps

# Reiniciar servicios
docker-compose restart
```

**Error de migraciones**
```bash
cd backend
npm run db:reset
```

**Cache no funciona**
```bash
cd backend
npm run flush-cache
```

**Frontend no conecta con backend**
- Verificar que el backend esté en puerto 4000

---

**Desarrollado por [Sergio Pinzón](https://www.sergiopinzon.dev/en)**
