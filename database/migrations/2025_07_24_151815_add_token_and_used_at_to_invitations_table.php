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
        Schema::table('invitations', function (Blueprint $table) {
            // Make code column nullable if it exists
            if (Schema::hasColumn('invitations', 'code')) {
                $table->string('code')->nullable()->change();
            }

            // Add token column if it doesn't exist
            if (!Schema::hasColumn('invitations', 'token')) {
                $table->string('token')->unique()->after('id');
            }

            // Add used_at column if it doesn't exist
            if (!Schema::hasColumn('invitations', 'used_at')) {
                $table->timestamp('used_at')->nullable()->after('expires_at');
            }

            // Update role enum to include correct values
            $table->enum('role', ['admin', 'editor', 'viewer'])->default('viewer')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            if (Schema::hasColumn('invitations', 'token')) {
                $table->dropColumn('token');
            }

            if (Schema::hasColumn('invitations', 'used_at')) {
                $table->dropColumn('used_at');
            }

            // Restore original role enum
            $table->enum('role', ['admin', 'user'])->default('user')->change();

            // Restore code column to not nullable
            if (Schema::hasColumn('invitations', 'code')) {
                $table->string('code')->nullable(false)->change();
            }
        });
    }
};
