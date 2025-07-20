<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'email',
        'name',
        'role',
        'is_used',
        'expires_at',
        'created_by',
        'used_by',
        'used_at',
    ];

    protected $casts = [
        'is_used' => 'boolean',
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    /**
     * Generate a unique invitation code.
     */
    public static function generateCode(): string
    {
        do {
            $code = strtoupper(Str::random(8));
        } while (static::where('code', $code)->exists());

        return $code;
    }

    /**
     * Create a new invitation.
     */
    public static function createInvitation(array $data = []): self
    {
        return static::create(array_merge([
            'code' => static::generateCode(),
            'role' => 'user',
            'is_used' => false,
        ], $data));
    }

    /**
     * Check if the invitation is valid.
     */
    public function isValid(): bool
    {
        return !$this->is_used &&
            ($this->expires_at === null || $this->expires_at->isFuture());
    }

    /**
     * Mark the invitation as used.
     */
    public function markAsUsed(int $userId): void
    {
        $this->update([
            'is_used' => true,
            'used_by' => $userId,
            'used_at' => now(),
        ]);
    }

    /**
     * Get the creator of this invitation.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who used this invitation.
     */
    public function usedBy()
    {
        return $this->belongsTo(User::class, 'used_by');
    }

    /**
     * Scope to get only valid invitations.
     */
    public function scopeValid($query)
    {
        return $query->where('is_used', false)
            ->where(function ($q) {
                $q->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            });
    }

    /**
     * Scope to get only unused invitations.
     */
    public function scopeUnused($query)
    {
        return $query->where('is_used', false);
    }

    /**
     * Scope to get only expired invitations.
     */
    public function scopeExpired($query)
    {
        return $query->where('expires_at', '<', now());
    }
}
