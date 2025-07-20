# Email Configuration Guide for Earth-112

## 🔧 **Current Setup**
Your application is currently using the `log` driver, which means emails are logged to files instead of being sent.

## 📧 **Email Configuration Options**

### **Option 1: Gmail SMTP (Recommended for testing)**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"

3. **Update your `.env` file:**
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

### **Option 2: Mailtrap (For development)**

1. **Sign up at [mailtrap.io](https://mailtrap.io)**
2. **Get your SMTP credentials**
3. **Update your `.env` file:**
```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your-mailtrap-username
MAIL_PASSWORD=your-mailtrap-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@earth-112.com"
MAIL_FROM_NAME="Earth-112"
```

### **Option 3: SendGrid (For production)**

1. **Sign up at [sendgrid.com](https://sendgrid.com)**
2. **Create an API key**
3. **Update your `.env` file:**
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

### **Option 4: AWS SES (For production)**

1. **Set up AWS SES**
2. **Get your SMTP credentials**
3. **Update your `.env` file:**
```env
MAIL_MAILER=smtp
MAIL_HOST=email-smtp.us-east-1.amazonaws.com
MAIL_PORT=587
MAIL_USERNAME=your-ses-smtp-username
MAIL_PASSWORD=your-ses-smtp-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@yourdomain.com"
MAIL_FROM_NAME="Earth-112"
```

## 🧪 **Testing Email Configuration**

### **Create a Test Command**
```bash
php artisan make:command TestEmail
```

### **Test Email Content**
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmail extends Command
{
    protected $signature = 'email:test {email}';
    protected $description = 'Send a test email';

    public function handle()
    {
        $email = $this->argument('email');
        
        Mail::raw('This is a test email from Earth-112!', function($message) use ($email) {
            $message->to($email)
                    ->subject('Earth-112 Test Email');
        });

        $this->info("Test email sent to {$email}");
    }
}
```

### **Run the Test**
```bash
php artisan email:test recipient@example.com
```

## 🔐 **Security Best Practices**

### **For Production:**
1. **Use environment-specific credentials**
2. **Never commit email credentials to version control**
3. **Use dedicated email services (SendGrid, AWS SES)**
4. **Set up proper SPF/DKIM records**
5. **Monitor email delivery rates**

### **For Development:**
1. **Use Mailtrap for safe testing**
2. **Use Gmail with App Passwords**
3. **Keep credentials in `.env` file**
4. **Test with real email addresses**

## 📋 **Email Features in Earth-112**

### **Current Email Features:**
- ✅ Password reset emails
- ✅ Email verification (if enabled)
- ✅ Welcome emails (can be added)

### **To Add More Email Features:**
1. **Welcome emails for new users**
2. **Admin notifications**
3. **Security alerts**
4. **Activity summaries**

## 🚀 **Quick Setup for Testing**

1. **Choose an email provider** (Gmail recommended for testing)
2. **Update your `.env` file** with the credentials above
3. **Clear config cache:**
   ```bash
   php artisan config:clear
   ```
4. **Test with the command:**
   ```bash
   php artisan email:test your-email@example.com
   ```

## 📝 **Environment Variables Reference**

```env
# Email Configuration
MAIL_MAILER=smtp                    # Driver: smtp, log, array, etc.
MAIL_HOST=smtp.gmail.com            # SMTP host
MAIL_PORT=587                       # SMTP port
MAIL_USERNAME=your-email@gmail.com  # SMTP username
MAIL_PASSWORD=your-password         # SMTP password
MAIL_ENCRYPTION=tls                 # Encryption: tls, ssl, null
MAIL_FROM_ADDRESS=noreply@domain.com # From email address
MAIL_FROM_NAME="Earth-112"          # From name
```

## 🔍 **Troubleshooting**

### **Common Issues:**
1. **Authentication failed** - Check username/password
2. **Connection timeout** - Check host/port
3. **Encryption issues** - Try different encryption settings
4. **Gmail blocks** - Use App Passwords, not regular password

### **Debug Commands:**
```bash
# Check current mail configuration
php artisan tinker
>>> config('mail')

# Test SMTP connection
php artisan email:test your-email@example.com
``` 