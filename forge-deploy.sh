cd /home/forge/earth-112

git pull origin main

# Ensure SSR is completely disabled
chmod +x disable-ssr.sh
./disable-ssr.sh

# Additional SSR cleanup - more targeted approach
echo "Performing targeted SSR cleanup..."
# Remove specific SSR-related environment variables only
sed -i "/^INERTIA_SSR_PORT=/d" .env
sed -i "/^SSR_URL=/d" .env
sed -i "/^INERTIA_SSR_URL=/d" .env
sed -i "s/^INERTIA_SSR=true/INERTIA_SSR=false/" .env

# Clear Laravel caches (skip view caching for React components)
php artisan config:clear
php artisan cache:clear
php artisan route:clear

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

# Clear all Laravel caches again after build
php artisan optimize:clear

# Rebuild Laravel caches (skip view caching)
php artisan config:cache
php artisan route:cache

# Run migrations
php artisan migrate --force

# Reload PHP-FPM
echo "🔄 Reloading PHP-FPM..."
sudo systemctl reload php8.3-fpm
