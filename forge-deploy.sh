cd /home/forge/earth-112

git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node.js dependencies and build assets
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and build frontend
npm ci --no-audit
npm run build

# Ensure storage directory permissions
mkdir -p storage/logs bootstrap/cache
sudo chown -R forge:forge storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Clear and rebuild Laravel caches
php artisan optimize:clear
php artisan config:cache
php artisan route:cache

# Run migrations
php artisan migrate --force

# Reload PHP-FPM
echo "🔄 Reloading PHP-FPM..."
sudo systemctl reload php8.3-fpm
