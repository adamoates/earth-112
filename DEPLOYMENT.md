# 🚀 Production Deployment Guide

## **Quick Start Options**

### **Option 1: Laravel Forge (Recommended)**
1. **Sign up** at [forge.laravel.com](https://forge.laravel.com)
2. **Connect your server** (DigitalOcean, AWS, etc.)
3. **Create a new site** and point to your repository
4. **Set environment variables** (see below)
5. **Deploy** with one click

### **Option 2: DigitalOcean App Platform**
1. **Create account** at [digitalocean.com](https://digitalocean.com)
2. **Create new app** from GitHub repository
3. **Configure environment** variables
4. **Deploy** automatically

### **Option 3: Traditional VPS**
1. **Set up server** (Ubuntu 22.04 recommended)
2. **Install LEMP stack** (Linux, Nginx, MySQL, PHP)
3. **Clone repository** and run `./deploy.sh`
4. **Configure web server**

---

## **Required Environment Variables**

Create a `.env` file on your production server with these variables:

```bash
# App Configuration
APP_NAME="Earth-112"
APP_ENV=production
APP_KEY=base64:your_generated_key
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=earth112_production
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

# Google OAuth (Production)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://your-domain.com/auth/google/callback

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://your-domain.com/auth/github/callback

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=your_smtp_host
MAIL_PORT=587
MAIL_USERNAME=your_email
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@your-domain.com"
MAIL_FROM_NAME="Earth-112"

# Security
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
```

---

## **Pre-Deployment Checklist**

### **1. Domain & SSL**
- [ ] **Domain name** purchased and configured
- [ ] **SSL certificate** installed (Let's Encrypt recommended)
- [ ] **DNS records** pointing to your server

### **2. Database**
- [ ] **MySQL/PostgreSQL** server set up
- [ ] **Database created** with proper permissions
- [ ] **Backup strategy** configured

### **3. OAuth Credentials**
- [ ] **Google OAuth** production credentials created
- [ ] **GitHub OAuth** production credentials (if using)
- [ ] **Redirect URIs** updated to production domain

### **4. Email**
- [ ] **SMTP service** configured (SendGrid, Mailgun, etc.)
- [ ] **Email templates** tested

---

## **Deployment Steps**

### **Step 1: Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install nginx mysql-server php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl composer git -y
```

### **Step 2: Clone Repository**
```bash
# Clone your repository
git clone https://github.com/your-username/earth-112.git /var/www/earth-112
cd /var/www/earth-112

# Set permissions
sudo chown -R www-data:www-data /var/www/earth-112
sudo chmod -R 755 /var/www/earth-112
```

### **Step 3: Environment Setup**
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Edit environment variables
nano .env
```

### **Step 4: Run Deployment Script**
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### **Step 5: Web Server Configuration**
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/earth-112

# Enable site
sudo ln -s /etc/nginx/sites-available/earth-112 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## **Post-Deployment Tasks**

### **1. Create Owner User**
```bash
# Access your application
# Login with: apmo1984@gmail.com / password123
# Or create new owner via tinker:
php artisan tinker
$user = User::create(['name' => 'Your Name', 'email' => 'your-email@domain.com', 'password' => bcrypt('secure_password'), 'email_verified_at' => now()]);
$user->assignRole('owner');
```

### **2. Configure Auth Settings**
1. **Login as owner**
2. **Navigate to Auth Settings**
3. **Configure security controls**
4. **Set up feature toggles**

### **3. Test Functionality**
- [ ] **User registration/login**
- [ ] **Social authentication**
- [ ] **Owner permissions**
- [ ] **Auth settings management**
- [ ] **Maintenance mode**

---

## **Security Considerations**

### **1. File Permissions**
```bash
# Set proper permissions
sudo chown -R www-data:www-data /var/www/earth-112
sudo chmod -R 755 /var/www/earth-112
sudo chmod -R 775 /var/www/earth-112/storage
sudo chmod -R 775 /var/www/earth-112/bootstrap/cache
```

### **2. Firewall**
```bash
# Configure UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### **3. Database Security**
```bash
# Secure MySQL
sudo mysql_secure_installation
```

---

## **Monitoring & Maintenance**

### **1. Logs**
```bash
# View Laravel logs
tail -f /var/www/earth-112/storage/logs/laravel.log

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### **2. Backups**
```bash
# Database backup script
#!/bin/bash
mysqldump -u username -p database_name > backup_$(date +%Y%m%d_%H%M%S).sql
```

### **3. Updates**
```bash
# Update application
git pull origin main
./deploy.sh
```

---

## **Troubleshooting**

### **Common Issues:**

1. **500 Error**: Check Laravel logs and file permissions
2. **Database Connection**: Verify DB credentials and connectivity
3. **OAuth Issues**: Check redirect URIs and credentials
4. **Asset Loading**: Ensure `npm run build` completed successfully

### **Useful Commands:**
```bash
# Check Laravel status
php artisan about

# Clear all caches
php artisan optimize:clear

# Check storage permissions
ls -la storage/

# Test database connection
php artisan tinker --execute="echo 'DB connected: ' . (DB::connection()->getPdo() ? 'Yes' : 'No');"
```

---

## **Support**

If you encounter issues during deployment:
1. **Check logs** in `/var/www/earth-112/storage/logs/`
2. **Verify environment** variables are correct
3. **Test database** connection
4. **Check file permissions**

**Your Earth-112 application is now ready for production! 🚀** 