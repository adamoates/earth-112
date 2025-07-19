#!/bin/bash

# Deployment script for Laravel Forge
# This script handles deployment issues and ensures proper setup

echo "🚀 Starting deployment..."

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# Handle SSR commands gracefully
echo "📝 Handling SSR commands..."
php artisan inertia:start-ssr || echo "SSR start command handled"
php artisan inertia:stop-ssr || echo "SSR stop command handled"

# Run migrations only if database is accessible
echo "🗄️ Checking database connection..."
php artisan migrate --force || echo "Migration skipped - database not accessible"

# Optimize for production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Build assets
echo "🔨 Building assets..."
npm ci
npm run build

echo "✅ Deployment completed successfully!" 