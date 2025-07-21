# Earth-112 Functional Overview

## 🏗️ **Application Architecture**

### **Tech Stack**
- **Backend**: Laravel 10+ with PHP 8.1+
- **Frontend**: React 18+ with TypeScript
- **Framework**: Inertia.js for SPA-like experience
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: MySQL/PostgreSQL with Eloquent ORM
- **Authentication**: Laravel Breeze with Spatie Laravel Permission
- **Admin Panel**: Filament Admin Panel
- **Build Tool**: Vite for asset compilation

### **Key Features**
- ✅ **Role-based Access Control** (Admin, Editor, Viewer)
- ✅ **User Management** with invitation system
- ✅ **Access Request Workflow** with approval/rejection
- ✅ **Dual Dashboard System** (Admin + User dashboards)
- ✅ **Email Integration** (password reset, notifications)
- ✅ **Real-time Statistics** and activity tracking
- ✅ **Confirmation Modals** for destructive actions
- ✅ **Responsive Design** with mobile navigation

## 👥 **User Roles & Permissions**

### **Admin Role**
- **Full system access** and user management
- **Invitation management** (create, edit, delete)
- **Access request approval/rejection**
- **System administration** and configuration
- **Dashboard**: Full admin dashboard with system stats

### **Editor Role**
- **View users** and basic user information
- **Create and manage invitations**
- **Approve/reject access requests**
- **Limited administrative functions**
- **Dashboard**: Editor-specific user dashboard

### **Viewer Role**
- **View users** and user lists
- **View invitations** (read-only)
- **Read-only access** to most features
- **Dashboard**: Viewer-specific user dashboard

## 🧪 **Testing & Development**

### **Test Users Seeding**
```bash
# Quick seed test users
php artisan seed:test-users

# Full database reset with test users
php artisan migrate:fresh --seed
```

### **Test User Credentials** (Password: `password`)
| Role       | Email                  | Name            |
| ---------- | ---------------------- | --------------- |
| Admin      | `admin@test.com`       | Admin User      |
| Admin      | `superadmin@test.com`  | Super Admin     |
| Editor     | `editor@test.com`      | Editor User     |
| Editor     | `content@test.com`     | Content Manager |
| Editor     | `teamlead@test.com`    | Team Lead       |
| Viewer     | `viewer@test.com`      | Viewer User     |
| Viewer     | `guest@test.com`       | Guest User      |
| Multi-Role | `admineditor@test.com` | Admin + Editor  |
| Multi-Role | `poweruser@test.com`   | All Roles       |

### **Testing Different Dashboards**
1. **Admin Dashboard**: Login with admin users for full system stats
2. **User Dashboard**: Login with editor/viewer users for role-specific content
3. **Multi-Role Testing**: Use multi-role users to test role combinations

## 📧 **Email Configuration**

### **Current Setup**
- **Driver**: `log` (emails logged to files)
- **Location**: `storage/logs/laravel.log`

### **Production Email Options**

#### **Gmail SMTP (Recommended for testing)**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="your-email@gmail.com"
MAIL_FROM_NAME="Earth-112"
```

#### **SendGrid (Production)**
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="Earth-112"
```

### **Email Testing**
```bash
# Test email configuration
php artisan email:test recipient@example.com
```

## ⚙️ **System Configuration**

### **Session & Cache**
- **Session Driver**: `file` (stored in `storage/framework/sessions/`)
- **Cache Driver**: `file` (stored in `storage/framework/cache/data/`)
- **Benefits**: No database dependency, faster performance, reduced DB load

### **Rendering Strategy**
- **SSR Status**: Disabled (client-side rendering only)
- **Configuration**: `config/inertia.php` - `'enabled' => false`
- **Benefits**: Simpler deployment, no hydration issues, easier development

### **Environment Variables**
```env
# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=earth_112
DB_USERNAME=root
DB_PASSWORD=

# Session & Cache
SESSION_DRIVER=file
CACHE_STORE=file

# Email
MAIL_MAILER=log
MAIL_FROM_ADDRESS="noreply@earth-112.com"
MAIL_FROM_NAME="Earth-112"

# App
APP_NAME="Earth-112"
APP_ENV=local
APP_DEBUG=true
```

## 🚀 **Deployment & Environment**

### **Local Development**
```bash
# Install dependencies
composer install
npm install

# Setup database
php artisan migrate:fresh --seed

# Start development server
php artisan serve
npm run dev

# Seed test users
php artisan seed:test-users
```

### **Production Deployment**
- **Database**: Live production database
- **Email**: Configured SMTP service (SendGrid/AWS SES)
- **Environment**: `APP_ENV=production`
- **Debug**: `APP_DEBUG=false`
- **Cache**: `php artisan config:cache`

### **Environment Switching**
- **Staging**: Uses staging database and configuration
- **Production**: Uses live database and production settings
- **Local**: Uses local database with test users

## 🔧 **Key Commands**

### **Development**
```bash
# Database operations
php artisan migrate:fresh --seed
php artisan seed:test-users

# Asset compilation
npm run dev
npm run build

# Cache management
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### **Testing**
```bash
# Run tests
php artisan test

# Email testing
php artisan email:test recipient@example.com

# Database testing
php artisan tinker
```

### **Production**
```bash
# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Deploy
git push origin main
```

## 📁 **Key File Structure**

### **Backend (Laravel)**
```
app/
├── Http/Controllers/     # Application controllers
├── Models/              # Eloquent models
├── Providers/           # Service providers
└── Console/Commands/    # Artisan commands

database/
├── migrations/          # Database migrations
├── seeders/            # Database seeders
└── factories/          # Model factories

routes/
├── web.php             # Web routes
├── api.php             # API routes
└── auth.php            # Authentication routes
```

### **Frontend (React)**
```
resources/js/
├── components/          # React components
├── pages/              # Inertia page components
├── layouts/            # Layout components
├── hooks/              # Custom React hooks
└── types/              # TypeScript type definitions
```

## 🔒 **Security Features**

### **Authentication**
- **Session-based authentication** for web routes
- **Token-based authentication** for API routes (`auth:sanctum`)
- **Role-based middleware** (`role:admin`, `role:editor`, `role:viewer`)
- **Email verification** (configurable)

### **Authorization**
- **Spatie Laravel Permission** for role management
- **Middleware protection** on routes and controllers
- **Explicit role checks** in controllers
- **Permission-based access control**

### **Data Protection**
- **CSRF protection** enabled
- **Input validation** with Form Requests
- **SQL injection protection** via Eloquent
- **XSS protection** via Blade templating

## 📊 **Dashboard System**

### **Admin Dashboard**
- **Real-time statistics** (users, invitations, requests)
- **System health monitoring**
- **Recent activity feed**
- **Performance metrics**
- **API endpoint**: `/api/admin/dashboard-stats`

### **User Dashboard**
- **Role-specific content** and statistics
- **Personal activity tracking**
- **Team overview** (for editors)
- **Announcements** and notifications
- **Cached data** for performance

## 🎯 **Development Workflow**

### **Feature Development**
1. **Create migration** for database changes
2. **Update models** with relationships and methods
3. **Create controllers** for business logic
4. **Add routes** with proper middleware
5. **Build frontend components** with TypeScript
6. **Add tests** for critical functionality
7. **Update documentation** and test users

### **Testing Strategy**
- **Unit tests** for models and services
- **Feature tests** for controllers and workflows
- **Integration tests** for database operations
- **Manual testing** with seeded test users

### **Deployment Process**
1. **Local testing** with test users
2. **Staging deployment** for validation
3. **Production deployment** with live database
4. **Post-deployment verification**

## 🔍 **Troubleshooting**

### **Common Issues**
- **404 errors**: Check route definitions and middleware
- **Database errors**: Verify connection and migrations
- **Email issues**: Check SMTP configuration
- **Asset loading**: Clear cache and rebuild assets
- **Permission errors**: Verify role assignments

### **Debug Commands**
```bash
# Check configuration
php artisan config:show

# Test database connection
php artisan tinker

# Clear all caches
php artisan optimize:clear

# Check routes
php artisan route:list
```

This consolidated overview provides a complete picture of the Earth-112 application's functionality, architecture, and development workflow. 