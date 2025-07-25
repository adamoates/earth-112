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
        Schema::create('feature_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('enable_beta_dashboard')->default(false);
            $table->boolean('enable_new_notifications')->default(false);
            $table->boolean('enable_user_impersonation')->default(false);
            $table->boolean('enable_audit_log')->default(true);
            $table->boolean('enable_maintenance_mode')->default(false);
            $table->string('maintenance_message', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feature_settings');
    }
};
