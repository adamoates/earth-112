#!/bin/bash

# Stop any running Node SSR processes
sudo pkill -f "node.*ssr" || true

# Clean up Supervisor only if it exists
if command -v supervisorctl &> /dev/null; then
    echo "Cleaning up Supervisor configuration..."
    sudo supervisorctl stop inertia-ssr 2>/dev/null || true
    sudo rm -f /etc/supervisor/conf.d/supervisor-inertia-ssr.conf 2>/dev/null || true
    sudo supervisorctl reread 2>/dev/null || true
    sudo supervisorctl update 2>/dev/null || true
else
    echo "Supervisor not found, skipping Supervisor cleanup..."
fi

# Clear the Laravel cache (skip view caching for React components)
php artisan config:clear
php artisan route:clear
php artisan cache:clear

# Disable SSR in the config
sed -i "s/'enabled' => true/'enabled' => false/g" config/inertia.php

# Update .env file - more targeted cleanup
sed -i "s/^INERTIA_SSR=true/INERTIA_SSR=false/" .env
sed -i "/^INERTIA_SSR_PORT=/d" .env
sed -i "/^SSR_URL=/d" .env
sed -i "/^INERTIA_SSR_URL=/d" .env

# Remove SSR-related files
rm -rf bootstrap/ssr
rm -rf storage/logs/ssr.*

# Rebuild the cache (skip view caching)
php artisan config:cache
php artisan route:cache

echo "SSR has been completely disabled."
