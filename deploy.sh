#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment..."

# Reset any local changes and clean untracked files
echo "Resetting git state..."
git reset --hard HEAD
git clean -fd

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Install dependencies
echo "Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "Installing Node.js dependencies..."
npm ci

# Build assets
echo "Building assets..."
npm run build

# Clear caches
echo "Clearing Laravel caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Optimize for production
echo "Optimizing for production..."
php artisan optimize

echo "Deployment completed successfully!" 