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
        Schema::create('auth_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('google_auth_enabled')->default(true);
            $table->boolean('github_auth_enabled')->default(false);
            $table->boolean('invite_only_mode')->default(true);
            $table->boolean('open_registration')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auth_settings');
    }
};
