# 1. Clonar repo
git clone https://github.com/sergepin/RMApp.git
cd RMApp

# 2. Levantar Postgres y Redis
docker-compose up -d

# 3. Configurar backend/.env
cat > backend/.env
DB_HOST=localhost
DB_NAME=rmapp
DB_USER=rick
DB_PASSWORD=morty
DB_DIALECT=postgres
REDIS_URL=redis://localhost:6379
NODE_ENV=development
EOL


# 4. Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# 6. Inicializar DB (create → migrate → seed)
cd ../backend && npm run db:init

# 7. Iniciar backend
npm run dev

# 8. Iniciar frontend
cd ../frontend && npm run dev
