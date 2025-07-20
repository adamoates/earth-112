#!/bin/bash

echo "🌍 Earth-112 Database Setup"
echo "=========================="

# Check if we're in production or local
if [ "$APP_ENV" = "production" ] || [ "$APP_ENV" = "staging" ]; then
    echo "🔧 Production Environment Detected"
    echo "Using MySQL configuration from environment variables"
    
    # Clear config cache
    php artisan config:clear
    php artisan cache:clear
    
    # Test database connection
    echo "Testing database connection..."
    php artisan tinker --execute="try { DB::connection()->getPdo(); echo '✅ Database connection successful'; } catch (Exception \$e) { echo '❌ Database connection failed: ' . \$e->getMessage(); }"
    
else
    echo "🔧 Local Development Environment"
    echo "Setting up SQLite database..."
    
    # Create SQLite database file
    touch database/database.sqlite
    
    # Set environment variables for SQLite
    export DB_CONNECTION=sqlite
    export DB_DATABASE=database/database.sqlite
    
    # Run migrations
    echo "Running migrations..."
    php artisan migrate --force
    
    echo "✅ Local database setup complete!"
    echo "To start the server: php artisan serve"
fi 