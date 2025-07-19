#!/bin/bash

# Deploy build script - temporarily use SQLite for build process
echo "🚀 Starting deployment build process..."

# Backup current environment
cp .env .env.backup

# Temporarily switch to SQLite for build process
echo "📝 Switching to SQLite for build process..."
sed -i '' 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env
sed -i '' 's/DB_DATABASE=earth_112/DB_DATABASE=database\/database.sqlite/' .env

# Create SQLite database file if it doesn't exist
touch database/database.sqlite

# Clear caches and build assets
echo "🔧 Clearing caches and building assets..."
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Build frontend assets
echo "📦 Building frontend assets..."
npm ci --no-audit
npm run build

# Restore original environment
echo "🔄 Restoring original environment..."
cp .env.backup .env

echo "✅ Build process completed successfully!" 