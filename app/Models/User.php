<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'social_provider',
        'social_id',
        'is_social_user',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_social_user' => 'boolean',
        ];
    }

    /**
     * Check if user was created via social login.
     */
    public function isSocialUser(): bool
    {
        return $this->is_social_user || !empty($this->social_provider);
    }

    /**
     * Get the social provider name.
     */
    public function getSocialProviderName(): ?string
    {
        return $this->social_provider ? ucfirst($this->social_provider) : null;
    }

    /**
     * Check if user can use email/password login.
     * Social users with actual passwords can still use email/password.
     */
    public function canUseEmailPassword(): bool
    {
        // If not a social user, they can definitely use email/password
        if (!$this->isSocialUser()) {
            return true;
        }

        // If they're a social user but have a real password (not random 64-char), they can use email/password
        return strlen($this->password) <= 60;
    }

    /**
     * Check if user is a pure social user (no email/password access).
     */
    public function isPureSocialUser(): bool
    {
        return $this->isSocialUser() && !$this->canUseEmailPassword();
    }
}
