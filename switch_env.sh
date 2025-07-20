#!/bin/bash

echo "🌍 Earth-112 Environment Switcher"
echo "================================="

case "$1" in
    "local")
        echo "🔄 Switching to LOCAL environment..."
        cp config/environments/.env.local .env
        echo "✅ Now using local MySQL database"
        echo "📊 Database: earth_112_local"
        echo "🚀 Run: php artisan serve"
        ;;
    "staging")
        echo "🔄 Switching to STAGING environment..."
        cp config/environments/.env.staging .env
        echo "✅ Now using staging database (live data)"
        echo "⚠️  Be careful - you're connected to live data!"
        echo "🚀 Run: php artisan serve"
        ;;
    "production")
        echo "🔄 Switching to PRODUCTION environment..."
        cp config/environments/.env.production .env
        echo "✅ Now using production configuration"
        echo "⚠️  EXTREME CARE - Production environment!"
        ;;
    "develop")
        echo "🔄 Switching to DEVELOP branch..."
        git checkout develop
        cp config/environments/.env.local .env
        echo "✅ Now on develop branch with local database"
        ;;
    "staging-branch")
        echo "🔄 Switching to STAGING branch..."
        git checkout staging
        cp config/environments/.env.staging .env
        echo "✅ Now on staging branch with staging database"
        ;;
    "main")
        echo "🔄 Switching to MAIN branch..."
        git checkout main
        cp config/environments/.env.production .env
        echo "✅ Now on main branch with production config"
        ;;
    *)
        echo "Usage: ./switch_env.sh [local|staging|production|develop|staging-branch|main]"
        echo ""
        echo "Environments:"
        echo "  local         - Local development with local MySQL"
        echo "  staging       - Staging environment (live data)"
        echo "  production    - Production configuration"
        echo ""
        echo "Branches:"
        echo "  develop       - Switch to develop branch + local env"
        echo "  staging-branch- Switch to staging branch + staging env"
        echo "  main          - Switch to main branch + production env"
        echo ""
        echo "Current branch: $(git branch --show-current)"
        echo "Current environment: $(grep 'APP_ENV=' .env | cut -d'=' -f2)"
        ;;
esac

# Clear cache after switching
if [ "$1" != "" ]; then
    echo "🧹 Clearing cache..."
    php artisan config:clear
    php artisan cache:clear
fi 