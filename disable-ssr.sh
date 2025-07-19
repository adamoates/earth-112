#!/bin/bash

# Stop any running SSR processes
sudo supervisorctl stop inertia-ssr || true
sudo pkill -f "node.*ssr" || true

# Remove supervisor config
sudo rm -f /etc/supervisor/conf.d/supervisor-inertia-ssr.conf
sudo supervisorctl reread
sudo supervisorctl update

# Clear the Laravel cache
php artisan config:clear
php artisan view:clear
php artisan route:clear

# Disable SSR in the config
sed -i "s/'enabled' => true/'enabled' => false/g" config/inertia.php

# Update .env file
sed -i "s/INERTIA_SSR=true/INERTIA_SSR=false/" .env
sed -i "/INERTIA_SSR_PORT/d" .env
sed -i "/SSR_URL/d" .env

# Remove SSR-related files
rm -rf bootstrap/ssr
rm -rf storage/logs/ssr.*

# Rebuild the cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "SSR has been completely disabled."
