# RMApp Frontend - Rick and Morty Character Manager

Una aplicación React moderna para gestionar y explorar personajes de Rick and Morty con funcionalidades avanzadas de búsqueda, filtrado y gestión de favoritos.

## 🚀 Características

- **Lista de personajes** con diseño de tarjetas responsive
- **Búsqueda avanzada** por nombre, especie, estado y género
- **Sistema de favoritos** con persistencia local
- **Soft delete** para gestionar personajes eliminados
- **Comentarios** por personaje (almacenados localmente)
- **Ordenamiento** por nombre (A-Z / Z-A)
- **Diseño responsive** con TailwindCSS
- **GraphQL** con Apollo Client para datos
- **TypeScript** para type safety

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Type safety
- **Vite** - Build tool y dev server
- **TailwindCSS** - Framework de estilos
- **Apollo Client** - Cliente GraphQL
- **React Router DOM** - Navegación
- **React Icons** - Iconografía
- **Vitest** - Testing framework

## 📋 Prerrequisitos

- **Node.js 18+** y **npm**
- **Backend corriendo** en `http://localhost:4000`
- **Docker** (opcional, para base de datos)

## 🚀 Instalación y configuración

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:4000/graphql
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── features/           # Componentes específicos de features
│   │   │   ├── CharacterList.tsx
│   │   │   ├── CharacterListItem.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── AdvancedFilters.tsx
│   │   │   ├── DeletedCharactersManager.tsx
│   │   │   ├── CharacterDetailPanel.tsx
│   │   │   ├── CommentSection.tsx
│   │   │   └── CharacterCard.tsx
│   │   ├── layout/             # Componentes de layout
│   │   └── ui/                 # Componentes de UI base
│   ├── hooks/                  # Custom hooks
│   │   ├── useCharacters.ts
│   │   ├── useCharacter.ts
│   │   ├── useFavorites.ts
│   │   └── useSoftDelete.ts
│   ├── pages/                  # Páginas principales
│   │   ├── HomePage.tsx
│   │   └── CharacterDetailPage.tsx
│   ├── services/               # Servicios y configuración
│   │   └── apollo.ts
│   ├── types/                  # Definiciones de tipos
│   │   └── character.ts
│   ├── utils/                  # Utilidades
│   │   ├── storage.ts
│   │   └── comments.ts
│   └── test/                   # Configuración de tests
├── public/                     # Archivos estáticos
└── index.html
```

## 🎯 Funcionalidades principales

### **Gestión de personajes**
- Lista de personajes con información básica
- Detalles completos al hacer click
- Imágenes con fallback automático

### **Búsqueda y filtrado**
- Búsqueda por nombre y especie
- Filtros avanzados por estado, especie y género
- Ordenamiento alfabético

### **Sistema de favoritos**
- Marcar/desmarcar personajes como favoritos
- Persistencia en localStorage
- Sección separada para favoritos

### **Soft Delete**
- "Eliminar" personajes sin borrarlos permanentemente
- Gestor de personajes eliminados
- Restauración de personajes

### **Comentarios**
- Agregar comentarios por personaje
- Almacenamiento local
- Interfaz intuitiva

## 🧪 Testing

### Ejecutar tests

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Estructura de tests

```
src/
├── components/
│   └── features/
│       └── __tests__/
│           ├── CharacterCard.test.tsx
│           └── SearchBar.test.tsx
└── test/
    └── setup.ts
```

## 🎨 Estilos y diseño

### **TailwindCSS**
- Sistema de diseño consistente
- Colores personalizados:
  - `primary-100`: #EEE3FF
  - `primary-600`: #8054C7
  - `primary-700`: #5A3696
  - `secondary-600`: #63D838

### **Responsive Design**
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexbox y CSS Grid

## 🔧 Scripts disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build

# Testing
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Coverage report

# Linting
npm run lint         # ESLint
npm run lint:fix     # ESLint con auto-fix
```

## 🌐 API y datos

### **GraphQL Endpoint**
- URL: `http://localhost:4000/graphql`
- Configurado en `src/services/apollo.ts`

### **Queries principales**
- `GetCharacters` - Lista de personajes con filtros
- `GetCharacter` - Detalle de personaje individual

### **Almacenamiento local**
- Favoritos: `localStorage.favorites`
- Personajes eliminados: `localStorage.deleted_characters`
- Comentarios: `localStorage.comments_${characterId}`

## 🚀 Despliegue

### Build para producción

```bash
npm run build
```

Los archivos se generan en `dist/`

### Variables de entorno para producción

```env
VITE_API_URL=https://tu-api.com/graphql
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Troubleshooting

### **Problemas comunes**

**Error de conexión GraphQL**
- Verifica que el backend esté corriendo en puerto 4000
- Revisa la URL en `src/services/apollo.ts`

**Estilos no se aplican**
- Verifica que TailwindCSS esté instalado: `npm install -D tailwindcss`
- Revisa `src/index.css` para las directivas de Tailwind

**Tests fallan**
- Verifica que Vitest esté configurado correctamente
- Revisa `vite.config.ts` para la configuración de tests

## 📞 Soporte

Para soporte técnico o preguntas:
- Abre un issue en el repositorio
- Revisa la documentación del backend
- Consulta los logs del navegador para errores
