#!/bin/bash

# OAuth Fix Deployment Script
# Run this on your production server to fix OAuth issues

echo "=== OAuth Fix Deployment Script ==="
echo "This script will help fix OAuth 500 errors in production."
echo ""

# 1. Clear all caches
echo "1. Clearing Laravel caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
echo "✓ Caches cleared"
echo ""

# 2. Run comprehensive OAuth diagnostics
echo "2. Running OAuth diagnostics..."
php artisan debug:oauth
echo ""

# 3. Check recent OAuth errors
echo "3. Checking recent OAuth errors in logs..."
if [ -f "storage/logs/laravel.log" ]; then
    echo "Recent OAuth-related errors:"
    tail -50 storage/logs/laravel.log | grep -i "oauth\|socialite\|google\|discord\|github" | tail -5
else
    echo "No log file found"
fi
echo ""

# 4. Test network connectivity
echo "4. Testing network connectivity to OAuth providers..."
curl -s -o /dev/null -w "Google OAuth: %{http_code}\n" https://accounts.google.com
curl -s -o /dev/null -w "GitHub OAuth: %{http_code}\n" https://github.com
curl -s -o /dev/null -w "Discord OAuth: %{http_code}\n" https://discord.com
echo ""

echo "=== Deployment Complete ==="
echo ""
echo "Next steps:"
echo "1. Review the diagnostics output above"
echo "2. If any environment variables show 'Not Set', add them in Forge dashboard"
echo "3. If any OAuth config shows 'Missing', check config/services.php"
echo "4. If network tests fail, check server firewall/SSL settings"
echo "5. Test OAuth login again"
echo ""
echo "For detailed diagnostics, run: php artisan debug:oauth" 