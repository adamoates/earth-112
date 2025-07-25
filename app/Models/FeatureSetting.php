<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'enable_beta_dashboard',
        'enable_new_notifications',
        'enable_user_impersonation',
        'enable_audit_log',
        'enable_maintenance_mode',
        'maintenance_message',
    ];

    protected $casts = [
        'enable_beta_dashboard' => 'boolean',
        'enable_new_notifications' => 'boolean',
        'enable_user_impersonation' => 'boolean',
        'enable_audit_log' => 'boolean',
        'enable_maintenance_mode' => 'boolean',
    ];

    /**
     * Get the current feature settings, creating default if none exist
     */
    public static function getCurrent(): self
    {
        return static::firstOrCreate([], [
            'enable_beta_dashboard' => false,
            'enable_new_notifications' => false,
            'enable_user_impersonation' => false,
            'enable_audit_log' => true,
            'enable_maintenance_mode' => false,
            'maintenance_message' => 'We are currently performing maintenance. Please check back soon.',
        ]);
    }
}
