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

# 2. Check environment variables
echo "2. Checking OAuth environment variables..."
php -r "
\$vars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI', 'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'GITHUB_REDIRECT_URI', 'DISCORD_CLIENT_ID', 'DISCORD_CLIENT_SECRET', 'DISCORD_REDIRECT_URI'];
foreach (\$vars as \$var) {
    \$value = getenv(\$var);
    echo \$var . ': ' . (\$value ? 'Set' : 'Not Set') . PHP_EOL;
}
"
echo ""

# 3. Test OAuth configurations
echo "3. Testing OAuth configurations..."
php -r "
try {
    \$services = require 'config/services.php';
    foreach (['google', 'github', 'discord'] as \$provider) {
        if (isset(\$services[\$provider])) {
            echo \$provider . ' config: OK' . PHP_EOL;
        } else {
            echo \$provider . ' config: Missing' . PHP_EOL;
        }
    }
} catch (Exception \$e) {
    echo 'Config error: ' . \$e->getMessage() . PHP_EOL;
}
"
echo ""

# 4. Check recent OAuth errors
echo "4. Checking recent OAuth errors in logs..."
if [ -f "storage/logs/laravel.log" ]; then
    echo "Recent OAuth-related errors:"
    tail -50 storage/logs/laravel.log | grep -i "oauth\|socialite\|google\|discord\|github" | tail -5
else
    echo "No log file found"
fi
echo ""

# 5. Test network connectivity
echo "5. Testing network connectivity to OAuth providers..."
curl -s -o /dev/null -w "Google OAuth: %{http_code}\n" https://accounts.google.com
curl -s -o /dev/null -w "GitHub OAuth: %{http_code}\n" https://github.com
curl -s -o /dev/null -w "Discord OAuth: %{http_code}\n" https://discord.com
echo ""

# 6. Verify auth settings
echo "6. Checking auth settings..."
php artisan tinker --execute="
\$settings = \App\Models\AuthSetting::getCurrent();
echo 'Google Auth: ' . (\$settings->google_auth_enabled ? 'Enabled' : 'Disabled') . PHP_EOL;
echo 'GitHub Auth: ' . (\$settings->github_auth_enabled ? 'Enabled' : 'Disabled') . PHP_EOL;
echo 'Discord Auth: ' . (\$settings->discord_auth_enabled ? 'Enabled' : 'Disabled') . PHP_EOL;
"
echo ""

echo "=== Deployment Complete ==="
echo ""
echo "Next steps:"
echo "1. If any environment variables show 'Not Set', add them in Forge dashboard"
echo "2. If any OAuth config shows 'Missing', check config/services.php"
echo "3. If network tests fail, check server firewall/SSL settings"
echo "4. Test OAuth login again"
echo ""
echo "For detailed diagnostics, run: php debug-social-oauth.php" 