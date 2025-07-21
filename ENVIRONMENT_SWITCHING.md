# Environment Switching Guide

## 🎯 Simple Environment Management

Just copy the appropriate environment file. No complex scripts needed.

## 📁 Environment Files

- **`.env.local`** - Local development (gitignored)
- **`.env.production`** - Production environment (gitignored)

## 🌐 Environment URLs

- **Local**: `http://localhost:8000`
- **Production**: `https://earth-112.com`

## 🔄 Switching Environments

### Local Development
```bash
cp config/environments/.env.local .env
php artisan config:clear
```

### Production Environment
```bash
cp config/environments/.env.production .env
php artisan config:clear
```

## 🗄️ Database Setup

### Local Development
```bash
# Start MySQL
mysql.server start

# Run migrations
php artisan migrate:fresh

# Create test user
php artisan tinker --execute="App\Models\User::create(['name' => 'Local Admin', 'email' => 'admin@local.earth-112.com', 'password' => bcrypt('password'), 'email_verified_at' => now(), 'role' => 'admin']);"
```

### Production (Forge)
- Uses live database credentials
- No local setup needed
- Forge handles the environment

## 🚀 Deployment

### Production Deployment (Forge)
```bash
# Push to main branch - Forge auto-deploys
git push origin main
```

## ⚠️ Important Notes

1. **Environment files are gitignored** - They contain sensitive data
2. **Update passwords on server** - Environment files contain placeholders
3. **Clear cache after switching** - Always run `php artisan config:clear`
4. **Forge handles production** - No manual server setup needed

## 🔧 Server Environment Setup (Forge)

### Environment files contain placeholders and need to be updated on the server:

```bash
# On production server (via Forge)
nano /home/forge/earth-112.com/.env
# Update DB_PASSWORD and other sensitive values
```

### Required Updates on Server:
- `DB_PASSWORD` - Replace `your_production_password_here`
- `MAILGUN_DOMAIN` - Add actual Mailgun domain
- `MAILGUN_SECRET` - Add actual Mailgun secret
- Any other sensitive credentials

## 🚀 Quick Commands

```bash
# Local development
cp config/environments/.env.local .env && php artisan config:clear

# Production  
cp config/environments/.env.production .env && php artisan config:clear
```

## 📝 Environment File Structure

Each environment file contains:
- Database configuration (with placeholder passwords)
- App settings
- Mail configuration (Mailgun for production, log for local)
- Cache settings
- Security settings

## 🔧 Troubleshooting

### If environment switching fails:
1. Check file permissions
2. Verify environment file exists
3. Clear all caches: `php artisan config:clear && php artisan cache:clear`
4. Restart development server

### If database connection fails:
1. Check MySQL service: `mysql.server status`
2. Verify credentials in environment file
3. Test connection: `php artisan tinker --execute="DB::connection()->getPdo();"`

### If environment files need updating on server:
1. SSH to the server via Forge
2. Edit the environment file: `nano /path/to/site/.env`
3. Update passwords and API keys
4. Clear cache: `php artisan config:clear` 