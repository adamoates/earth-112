# Laravel Forge Deployment via GitHub Actions

This repository is configured to automatically deploy to Laravel Forge when you push to the `main` branch.

## Setup Instructions

### 1. Get Your Forge Deploy Webhook URL

1. Log in to [Laravel Forge](https://forge.laravel.com)
2. Navigate to your server
3. Select your site
4. Go to the "Deployments" tab
5. Find the "Deploy Webhook URL" section
6. Copy the webhook URL (it looks like: `https://forge.laravel.com/servers/123456/sites/789012/deploy/http?token=your-token-here`)

### 2. Add the Webhook URL to GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add the following secret:
   - **Name**: `FORGE_DEPLOY_WEBHOOK`
   - **Value**: Your Forge deployment webhook URL

### 3. Configure Forge Deployment Script (Optional)

In Laravel Forge, you can customize your deployment script. The default script usually includes:

```bash
cd /home/forge/your-site.com
git pull origin $FORGE_SITE_BRANCH

$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader --no-dev

( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9>/tmp/fpmlock

if [ -f artisan ]; then
    $FORGE_PHP artisan migrate --force
    $FORGE_PHP artisan config:cache
    $FORGE_PHP artisan route:cache
    $FORGE_PHP artisan view:cache
    $FORGE_PHP artisan queue:restart
    $FORGE_PHP artisan optimize
fi

npm ci
npm run build
```

You can modify this script in the Forge UI to fit your needs.

## How It Works

1. When you push to the `main` branch on GitHub
2. GitHub Actions triggers the workflow
3. The workflow calls the Forge deployment webhook
4. Forge pulls the latest code and runs your deployment script
5. Your application is deployed!

## Benefits of Using Forge

- Forge handles all server configuration
- Automatic SSL certificates with Let's Encrypt
- Built-in queue workers and scheduler
- Easy environment variable management
- Zero-downtime deployments
- Automatic security updates

## Troubleshooting

If deployments fail:
1. Check the Forge deployment log in the Forge dashboard
2. Ensure your deployment script is correct
3. Verify that your server has enough resources
4. Check that all environment variables are set correctly in Forge