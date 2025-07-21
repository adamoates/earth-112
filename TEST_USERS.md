# Test Users for Local Development

This document explains how to seed test users with different roles for local development and testing.

## Quick Start

### Option 1: Using Artisan Command (Recommended)
```bash
php artisan seed:test-users
```

### Option 2: Using Database Seeder
```bash
php artisan db:seed --class=TestUsersSeeder
```

### Option 3: Full Database Seed (includes test users in local environment)
```bash
php artisan db:seed
```

## Test User Credentials

All test users have the password: `password`

### Admin Users
| Email                 | Name        | Role  |
| --------------------- | ----------- | ----- |
| `admin@test.com`      | Admin User  | Admin |
| `superadmin@test.com` | Super Admin | Admin |

### Editor Users
| Email               | Name            | Role   |
| ------------------- | --------------- | ------ |
| `editor@test.com`   | Editor User     | Editor |
| `content@test.com`  | Content Manager | Editor |
| `teamlead@test.com` | Team Lead       | Editor |

### Viewer Users
| Email               | Name           | Role   |
| ------------------- | -------------- | ------ |
| `viewer@test.com`   | Viewer User    | Viewer |
| `guest@test.com`    | Guest User     | Viewer |
| `readonly@test.com` | Read Only User | Viewer |
| `observer@test.com` | Observer User  | Viewer |

### Multi-Role Users (for testing role combinations)
| Email                   | Name          | Roles                 |
| ----------------------- | ------------- | --------------------- |
| `admineditor@test.com`  | Admin Editor  | Admin, Editor         |
| `editorviewer@test.com` | Editor Viewer | Editor, Viewer        |
| `poweruser@test.com`    | Power User    | Admin, Editor, Viewer |

## Role Permissions

### Admin Role
- Full access to all features
- User management
- Invitation management
- Access request management
- System administration

### Editor Role
- View users
- Create and manage invitations
- Approve/reject access requests
- Limited administrative functions

### Viewer Role
- View users
- View invitations
- Read-only access to most features

## Testing Different Dashboards

1. **Admin Dashboard**: Login with any admin user to see the full admin dashboard with system stats
2. **User Dashboard**: Login with editor or viewer users to see the role-specific user dashboard
3. **Multi-Role Testing**: Use the multi-role users to test how the system handles users with multiple roles

## Commands Reference

### Seed Test Users Only
```bash
php artisan seed:test-users
```

### Force Seed in Production (Not Recommended)
```bash
php artisan seed:test-users --force
```

### Clear and Reseed Everything
```bash
php artisan migrate:fresh --seed
```

### Clear and Reseed with Test Users
```bash
php artisan migrate:fresh --seed
# Test users will be automatically seeded in local environment
```

## Security Notes

- Test users are only created in the `local` environment by default
- All test users have the same password (`password`) for easy testing
- Test users are not created in production unless forced with `--force` flag
- Consider changing passwords in production if test users are accidentally created

## Customization

To add more test users or modify existing ones, edit the `database/seeders/TestUsersSeeder.php` file.

Example of adding a new test user:
```php
private function createCustomUsers(): void
{
    $user = User::firstOrCreate(
        ['email' => 'custom@test.com'],
        [
            'name' => 'Custom User',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]
    );

    if (!$user->hasRole('editor')) {
        $user->assignRole('editor');
    }
}
``` 