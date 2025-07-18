# GitHub Actions Deployment Secrets

To enable automatic deployment to production, you need to configure the following secrets in your GitHub repository settings:

## Required Secrets

Navigate to your repository on GitHub → Settings → Secrets and variables → Actions, then add these secrets:

### 1. `DEPLOY_HOST`
- **Description**: The hostname or IP address of your production server
- **Example**: `123.45.67.89` or `example.com`

### 2. `DEPLOY_USER`
- **Description**: The SSH username for connecting to your production server
- **Example**: `deploy` or `ubuntu`

### 3. `DEPLOY_KEY`
- **Description**: The private SSH key for authenticating to your production server
- **How to generate**:
  ```bash
  ssh-keygen -t rsa -b 4096 -C "github-actions@earth-112"
  ```
- **Important**: Copy the entire private key content including the BEGIN and END lines

### 4. `DEPLOY_PORT`
- **Description**: The SSH port for your production server
- **Default**: `22`
- **Example**: `22` or custom port if configured

### 5. `DEPLOY_PATH`
- **Description**: The absolute path to your Laravel application on the production server
- **Example**: `/var/www/earth-112` or `/home/deploy/sites/earth-112`

## Server Prerequisites

Before the deployment can work, ensure your production server has:

1. **Git installed** and configured with access to your repository
2. **PHP 8.2+** with required extensions
3. **Composer** installed globally
4. **Node.js 20+** and npm installed
5. **Proper permissions** for the deploy user to:
   - Pull from git repository
   - Run composer and npm commands
   - Execute artisan commands
   - Write to storage and cache directories

## Additional Configuration

You may also want to add these optional secrets for enhanced deployment:

- `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` - If you want to run migrations
- `APP_KEY` - Your Laravel application key for production
- `APP_ENV` - Set to `production`

## Testing the Deployment

After configuring all secrets, the deployment will automatically trigger when you push to the `main` branch.