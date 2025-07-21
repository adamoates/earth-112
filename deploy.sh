#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment..."

# Reset any local changes and clean untracked files to handle git conflicts
echo "Resetting git state..."
git reset --hard HEAD
git clean -fd

# Handle divergent branches with multiple strategies
echo "Handling divergent branches..."

# Strategy 1: Try to fetch and reset to remote
echo "Attempting git fetch and reset..."
git fetch origin main
git reset --hard origin/main

# If that fails, try Strategy 2: Force pull with rebase
if [ $? -ne 0 ]; then
    echo "Reset failed, trying git pull with rebase..."
    git pull --rebase origin main
fi

# If that fails, try Strategy 3: Force pull with merge
if [ $? -ne 0 ]; then
    echo "Rebase failed, trying git pull with merge..."
    git pull --no-rebase origin main
fi

# If all else fails, try Strategy 4: Force reset to remote
if [ $? -ne 0 ]; then
    echo "All pull strategies failed, forcing reset..."
    git fetch origin main
    git reset --hard origin/main || {
        echo "ERROR: Unable to sync with remote branch"
        exit 1
    }
fi

echo "Successfully synced with remote branch"

# Set defaults for Forge variables if not set
FORGE_COMPOSER=${FORGE_COMPOSER:-composer}
FORGE_PHP=${FORGE_PHP:-php}
FORGE_PHP_FPM=${FORGE_PHP_FPM:-php8.2-fpm}

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
