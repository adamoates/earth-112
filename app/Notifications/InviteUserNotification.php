<?php

namespace App\Notifications;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InviteUserNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Invitation $invitation
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = route('invitations.accept', $this->invitation->token);

        return (new MailMessage)
            ->subject('You\'ve been invited to join Earth-112')
            ->greeting('Hello!')
            ->line('You have been invited to join Earth-112.')
            ->line('Click the button below to accept your invitation and create your account.')
            ->action('Accept Invitation', $url)
            ->line('This invitation will expire on ' . $this->invitation->expires_at->format('F j, Y \a\t g:i A') . '.')
            ->line('If you did not expect this invitation, you can safely ignore this email.')
            ->salutation('Best regards, The Earth-112 Team');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'invitation_id' => $this->invitation->id,
            'email' => $this->invitation->email,
            'role' => $this->invitation->role,
            'expires_at' => $this->invitation->expires_at,
        ];
    }
}
