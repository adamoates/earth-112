#!/bin/bash

echo "🌍 Setting up Earth-112 Environments"
echo "===================================="

# Create environment directories
mkdir -p config/environments

# Local Environment Setup
echo "🔧 Setting up LOCAL environment..."
cat > config/environments/local.env << 'EOF'
APP_NAME=earth-112
APP_ENV=local
APP_KEY=base64:bQOPevBUR9aYNA7M9t+Ac9Z1sAUprSw51AXIrcEF0xc=
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=earth_112_local
DB_USERNAME=earth_112_user
DB_PASSWORD=earth_112_pass

VITE_APP_NAME="${APP_NAME}"
EOF

# Staging Environment Setup
echo "🔧 Setting up STAGING environment..."
cat > config/environments/staging.env << 'EOF'
APP_NAME=earth-112
APP_ENV=staging
APP_KEY=base64:bQOPevBUR9aYNA7M9t+Ac9Z1sAUprSw51AXIrcEF0xc=
APP_DEBUG=true
APP_URL=https://staging.earth-112.com
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=earth_112_dev
DB_USERNAME=forge
DB_PASSWORD=your_staging_password_here

VITE_APP_NAME="${APP_NAME}"
EOF

# Production Environment Setup
echo "🔧 Setting up PRODUCTION environment..."
cat > config/environments/production.env << 'EOF'
APP_NAME=earth-112
APP_ENV=production
APP_KEY=base64:bQOPevBUR9aYNA7M9t+Ac9Z1sAUprSw51AXIrcEF0xc=
APP_DEBUG=false
APP_URL=https://earth-112.com
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US
APP_MAINTENANCE_DRIVER=file

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=earth_112_dev
DB_USERNAME=forge
DB_PASSWORD=your_production_password_here

VITE_APP_NAME="${APP_NAME}"
EOF

echo "✅ Environment configurations created!"
echo ""
echo "📁 Environment files:"
echo "  - config/environments/local.env"
echo "  - config/environments/staging.env"
echo "  - config/environments/production.env"
echo ""
echo "⚠️  IMPORTANT: Update staging and production passwords in the config files!"
echo ""
echo "To switch environments:"
echo "  cp config/environments/local.env .env      # Local development"
echo "  cp config/environments/staging.env .env    # Staging"
echo "  cp config/environments/production.env .env  # Production" 