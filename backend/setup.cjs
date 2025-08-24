#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up RMApp Backend...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envContent = `# Database Configuration
DB_USER=rick
DB_PASSWORD=morty
DB_NAME=rmapp
DB_HOST=localhost
DB_DIALECT=postgres

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Server Configuration
PORT=4000
NODE_ENV=development
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
}

// Check if Docker is running
try {
  console.log('🐳 Checking Docker services...');
  execSync('docker ps', { stdio: 'pipe' });
  console.log('✅ Docker is running');
} catch (error) {
  console.log('❌ Docker is not running. Please start Docker first.');
  process.exit(1);
}

// Start Docker services
try {
  console.log('🐳 Starting Docker services...');
  execSync('docker-compose up -d', { stdio: 'inherit' });
  console.log('✅ Docker services started');
} catch (error) {
  console.log('❌ Failed to start Docker services');
  process.exit(1);
}

// Wait for database to be ready
console.log('⏳ Waiting for database to be ready...');
setTimeout(() => {
  try {
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');

    // Run migrations
    console.log('🗄️ Running database migrations...');
    execSync('npm run migrate', { stdio: 'inherit' });
    console.log('✅ Migrations completed');

    // Seed database
    console.log('🌱 Seeding database...');
    execSync('npm run seed', { stdio: 'inherit' });
    console.log('✅ Database seeded');

    console.log('\n🎉 Setup completed successfully!');
    console.log('🚀 You can now run: npm run dev');
    
  } catch (error) {
    console.log('❌ Setup failed:', error.message);
    process.exit(1);
  }
}, 5000);
