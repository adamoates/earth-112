#!/bin/bash

# Production Deployment Script for Earth-112
# Usage: ./deploy.sh

set -e

echo "🚀 Starting production deployment..."

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    echo "❌ Error: artisan file not found. Make sure you're in the Laravel project root."
    exit 1
fi

# Environment checks
echo "📋 Checking environment..."

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found. Please create one from .env.example"
    exit 1
fi

# Check if APP_ENV is set to production
if grep -q "APP_ENV=production" .env; then
    echo "✅ APP_ENV is set to production"
else
    echo "⚠️  Warning: APP_ENV is not set to production"
    echo "   Consider setting APP_ENV=production in your .env file"
fi

# Check if APP_DEBUG is disabled
if grep -q "APP_DEBUG=false" .env; then
    echo "✅ APP_DEBUG is disabled"
else
    echo "⚠️  Warning: APP_DEBUG should be set to false in production"
fi

# Deployment steps
echo "🔧 Running deployment steps..."

# 1. Install/update dependencies
echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

# 2. Clear all caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# 3. Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# 4. Optimize for production
echo "⚡ Optimizing for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Set proper permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# 6. Build frontend assets
echo "🎨 Building frontend assets..."
npm ci --production
npm run build

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Post-deployment checklist:"
echo "   • Verify database connection"
echo "   • Test authentication (login/logout)"
echo "   • Check social login (Google OAuth)"
echo "   • Verify owner access to auth settings"
echo "   • Test maintenance mode functionality"
echo ""
echo "🔗 Your application should now be live!"
