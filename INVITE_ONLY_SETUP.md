# Earth-112 Invite-Only System

## Overview

Earth-112 is now configured as an **invite-only platform**. This means that users can only register with a valid invitation code, providing enhanced security and controlled access.

## How It Works

### 1. Invitation Codes
- Each invitation has a unique 8-character code (e.g., `BAKO10EP`)
- Codes can be specific to an email address or open for anyone
- Invitations can have expiration dates
- Each code can only be used once

### 2. User Registration
- Users must provide a valid invitation code during registration
- The system validates the code and assigns the appropriate role
- Used invitations are automatically marked as used

### 3. Role Assignment
- Invitations can create users with `user` or `admin` roles
- Role determines access to different parts of the application

## Admin Features

### Managing Invitations
- **Dashboard**: Access invitation management via the "Invitations" card
- **Create Invitations**: Generate new invitation codes with specific settings
- **View All Invitations**: See all invitations with their status and usage

### Command Line Tools
```bash
# Create a basic user invitation
php artisan invitation:create

# Create an admin invitation for specific email
php artisan invitation:create --email=admin@example.com --role=admin

# Create invitation with expiration
php artisan invitation:create --email=user@example.com --expires="2024-12-31 23:59:59"
```

## Sample Invitation Codes

For testing purposes, the following invitation codes are available:

### Admin Codes
- `BAKO10EP` - For adam@adamcodertrader.com (admin)

### User Codes
- `5BUMSCZG` - For test@example.com (user)
- `CIWRBPIC` - Open invitation (user)
- `HCDGMI1E` - Open invitation (user)

## Security Benefits

1. **Controlled Access**: Only invited users can register
2. **Role Management**: Admins control who gets what permissions
3. **Audit Trail**: Track who created and used each invitation
4. **Expiration Control**: Set time limits on invitations
5. **Email Verification**: Optional email-specific invitations

## User Experience

### For New Users
1. Contact an administrator for an invitation code
2. Visit the registration page
3. Enter the invitation code (first field)
4. Complete registration with name, email, and password
5. Access the platform with assigned role

### For Administrators
1. Access invitation management via dashboard
2. Create new invitations with specific settings
3. Share invitation codes with intended users
4. Monitor invitation usage and status

## Technical Implementation

### Database Schema
- `invitations` table stores all invitation data
- Links to `users` table for creator and user tracking
- Supports expiration dates and role assignment

### Middleware
- Registration requires valid invitation code
- Role-based access control for admin features
- Automatic invitation validation and marking

### API Endpoints
- `POST /register` - Requires invitation code
- `GET /invitations` - Admin only, list all invitations
- `POST /invitations` - Admin only, create new invitation
- `DELETE /invitations/{id}` - Admin only, delete invitation

## Best Practices

1. **Secure Code Sharing**: Share invitation codes through secure channels
2. **Regular Cleanup**: Remove unused or expired invitations
3. **Role Assignment**: Carefully consider role assignments
4. **Monitoring**: Regularly check invitation usage patterns
5. **Backup Codes**: Keep some backup invitation codes for emergencies

## Troubleshooting

### Common Issues
- **Invalid Code**: Ensure the invitation code is correct and not expired
- **Email Mismatch**: Some invitations are email-specific
- **Used Code**: Each invitation can only be used once
- **Expired Code**: Check if the invitation has an expiration date

### Admin Commands
```bash
# List all invitations
php artisan tinker --execute="App\Models\Invitation::all(['code', 'email', 'role', 'is_used'])->each(function(\$inv) { echo \$inv->code . ' - ' . (\$inv->email ?: 'Open') . ' (' . \$inv->role . ') - ' . (\$inv->is_used ? 'Used' : 'Active'); });"

# Create emergency admin invitation
php artisan invitation:create --email=emergency@example.com --role=admin
```

## Migration Notes

The invite-only system was added via:
1. `invitations` table migration
2. Updated registration controller
3. Modified registration form
4. Added invitation management UI
5. Created admin commands for invitation management

All existing users retain their access, but new registrations require invitation codes. 