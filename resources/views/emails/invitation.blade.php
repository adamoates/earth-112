<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>You're invited to join Earth-112</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 30px 0;
            border-bottom: 2px solid #3b82f6;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
        }

        .content {
            padding: 30px 0;
        }

        .button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
        }

        .button:hover {
            background-color: #2563eb;
        }

        .code {
            background-color: #f3f4f6;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            margin: 10px 0;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
        }
    </style>
</head>

<body>
    <div class="header">
        <div class="logo">Earth-112</div>
        <p>Secure, invite-only platform</p>
    </div>

    <div class="content">
        <h2>You're invited to join Earth-112!</h2>

        <p>Hello,</p>

        <p>You've been invited to join Earth-112, a secure platform for collaboration and management.</p>

        @if ($invitation->name)
            <p><strong>Invitation for:</strong> {{ $invitation->name }}</p>
        @endif

        <p><strong>Your role will be:</strong> {{ ucfirst($invitation->role) }}</p>

        @if ($invitation->expires_at)
            <p><strong>This invitation expires:</strong> {{ $invitation->expires_at->format('F j, Y \a\t g:i A') }}</p>
        @endif

        <h3>How to register:</h3>

        <p>Click the button below to create your account. Your invitation code will be automatically filled in:</p>

        <div style="text-align: center;">
            <a href="{{ $registrationUrl }}" class="button">Create Your Account</a>
        </div>

        <p><strong>Or use this invitation code manually:</strong></p>
        <div class="code">{{ $invitation->code }}</div>

        <p><strong>Important:</strong></p>
        <ul>
            <li>This invitation code can only be used once</li>
            <li>Keep this email secure - don't share the invitation code</li>
            <li>If you don't register within the expiration date, the code will become invalid</li>
        </ul>

        <p>If you have any questions, please contact your administrator.</p>
    </div>

    <div class="footer">
        <p>This is an automated invitation from Earth-112. Please do not reply to this email.</p>
        <p>If you didn't expect this invitation, please ignore this email.</p>
    </div>
</body>

</html>
