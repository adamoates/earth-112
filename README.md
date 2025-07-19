# Earth-112

A Laravel application with React frontend.

## Database Configuration

### Development Environment
- **Database**: `earth_112_dev`
- **Host**: `127.0.0.1` (Forge MySQL via SSH tunnel)
- **Connection**: MySQL

### Production Environment
- **Database**: `earth_112`
- **Host**: `198.58.114.92` (Forge MySQL server)
- **Connection**: MySQL

## Deployment

### Production Environment Variables
Ensure the production server's `.env` file has the correct database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=198.58.114.92
DB_PORT=3306
DB_DATABASE=earth_112
DB_USERNAME=forge
DB_PASSWORD=your_production_password
```

### Development Environment Variables
Local `.env` file should be configured for development:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=earth_112_dev
DB_USERNAME=forge
DB_PASSWORD=your_development_password
```

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Configure database settings for your environment
4. Run `composer install`
5. Run `npm install`
6. Run `npm run build`
7. Run `php artisan key:generate`
8. Run `php artisan migrate`

## Development

- `npm run dev` - Start Vite development server
- `php artisan serve` - Start Laravel development server
- `php artisan migrate` - Run database migrations # Trigger deployment
# Test deployment with asset building
# Trigger new deployment with latest assets
# Sat Jul 19 08:54:56 CDT 2025
