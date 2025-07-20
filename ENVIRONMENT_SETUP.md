# 🌍 Earth-112 Environment Setup

This document explains how to set up and use the different environments for Earth-112 development.

## 🏗️ Environment Structure

### Branches
- **`main`** - Production branch (deploys to production)
- **`staging`** - Staging branch (deploys to staging)
- **`develop`** - Development branch (local development)

### Environments
- **Local** - Local MySQL database for development
- **Staging** - Staging environment with live data
- **Production** - Production environment

## 🚀 Quick Start

### 1. Set up Local Environment
```bash
# Switch to local environment
./switch_env.sh local

# Start MySQL (if not running)
mysql.server start

# Run migrations
php artisan migrate:fresh

# Create test user
php artisan tinker --execute="App\Models\User::create(['name' => 'Local Admin', 'email' => 'admin@local.earth-112.com', 'password' => bcrypt('password'), 'email_verified_at' => now(), 'role' => 'admin']);"

# Start development server
php artisan serve
```

### 2. Switch Between Environments
```bash
# Local development
./switch_env.sh local

# Staging (live data - be careful!)
./switch_env.sh staging

# Production configuration
./switch_env.sh production
```

### 3. Switch Between Branches
```bash
# Development branch + local environment
./switch_env.sh develop

# Staging branch + staging environment
./switch_env.sh staging-branch

# Main branch + production environment
./switch_env.sh main
```

## 📊 Database Configuration

### Local Environment
- **Database**: `earth_112_local`
- **Host**: `127.0.0.1:3306`
- **User**: `earth_112_user`
- **Password**: `earth_112_pass`

### Staging Environment
- **Database**: `earth_112_dev` (live data)
- **Host**: `127.0.0.1:3307`
- **User**: `forge`
- **Password**: Update in `config/environments/.env.staging`

### Production Environment
- **Database**: `earth_112_dev` (live data)
- **Host**: `127.0.0.1:3307`
- **User**: `forge`
- **Password**: Update in `config/environments/.env.production`

## 🔧 Environment Files

- `config/environments/.env.local` - Local development configuration
- `config/environments/.env.staging` - Staging configuration
- `config/environments/.env.production` - Production configuration

## ⚠️ Important Notes

1. **Never commit secrets** - Environment files with passwords are in `.gitignore`
2. **Update passwords** - Update staging and production passwords in config files
3. **Be careful with staging** - It uses live data
4. **Local development is safe** - Uses isolated local database

## 🛠️ Development Workflow

1. **Start on `develop` branch** with local environment
2. **Make changes** and test locally
3. **Push to `develop`** for review
4. **Merge to `staging`** for testing with live data
5. **Merge to `main`** for production deployment

## 🔍 Troubleshooting

### MySQL Connection Issues
```bash
# Start MySQL
mysql.server start

# Check MySQL status
mysql.server status

# Stop MySQL
mysql.server stop
```

### Database Issues
```bash
# Clear cache
php artisan config:clear
php artisan cache:clear

# Reset database
php artisan migrate:fresh
```

### Environment Issues
```bash
# Recreate environment configs
./setup_environments.sh

# Switch to local environment
./switch_env.sh local
```

## 📝 Test Users

- **Local**: `admin@local.earth-112.com` / `password`
- **Staging**: Use existing users in live database
- **Production**: Use existing users in live database 