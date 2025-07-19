#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment..."

# Reset any local changes and clean untracked files to handle git conflicts
echo "Resetting git state..."
git reset --hard HEAD
git clean -fd

# Handle divergent branches by forcing a reset to match remote
echo "Handling divergent branches..."
git fetch origin $FORGE_SITE_BRANCH
git reset --hard origin/$FORGE_SITE_BRANCH

# Install PHP dependencies
echo "Installing PHP dependencies..."
$FORGE_COMPOSER install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm ci

# Build assets
echo "Building assets..."
npm run build

# Clear Laravel caches
echo "Clearing Laravel caches..."
$FORGE_PHP artisan cache:clear
$FORGE_PHP artisan config:clear
$FORGE_PHP artisan route:clear
$FORGE_PHP artisan view:clear

# Run migrations
echo "Running migrations..."
$FORGE_PHP artisan migrate --force

# Optimize for production
echo "Optimizing for production..."
$FORGE_PHP artisan optimize

# Prevent concurrent php-fpm reloads
echo "Reloading PHP FPM..."
touch /tmp/fpmlock 2>/dev/null || true
( flock -w 10 9 || exit 1
    echo 'Reloading PHP FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9</tmp/fpmlock

echo "Deployment completed successfully!" 