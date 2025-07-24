<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('auth_settings', function (Blueprint $table) {
            // Security Controls
            $table->boolean('require_2fa_all_users')->default(false);
            $table->boolean('require_2fa_admins_only')->default(false);
            $table->integer('session_timeout_minutes')->default(60); // 1 hour default
            $table->integer('min_password_length')->default(8);
            $table->boolean('require_password_complexity')->default(false);
            $table->boolean('require_password_expiration')->default(false);
            $table->integer('password_expiration_days')->default(90);

            // Feature Toggles
            $table->boolean('enable_beta_dashboard')->default(false);
            $table->boolean('enable_new_notifications')->default(false);
            $table->boolean('enable_user_impersonation')->default(false);
            $table->boolean('enable_audit_log')->default(true);
            $table->boolean('enable_maintenance_mode')->default(false);
            $table->text('maintenance_message')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('auth_settings', function (Blueprint $table) {
            $table->dropColumn([
                'require_2fa_all_users',
                'require_2fa_admins_only',
                'session_timeout_minutes',
                'min_password_length',
                'require_password_complexity',
                'require_password_expiration',
                'password_expiration_days',
                'enable_beta_dashboard',
                'enable_new_notifications',
                'enable_user_impersonation',
                'enable_audit_log',
                'enable_maintenance_mode',
                'maintenance_message',
            ]);
        });
    }
};
