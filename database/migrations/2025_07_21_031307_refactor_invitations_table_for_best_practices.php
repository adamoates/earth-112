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
            // Drop foreign key constraints first
            $table->dropForeign(['used_by']);

            // Drop old columns
            $table->dropColumn(['code', 'name', 'is_used', 'used_by', 'used_at']);

            // Add new columns following best practices
            $table->string('token')->unique()->after('id');
            $table->string('email')->nullable(false)->change();
            $table->enum('role', ['admin', 'editor', 'viewer'])->default('viewer')->change();
            $table->timestamp('used_at')->nullable()->after('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            // Drop new columns
            $table->dropColumn(['token', 'used_at']);

            // Restore old columns
            $table->string('code')->unique();
            $table->string('name')->nullable();
            $table->boolean('is_used')->default(false);
            $table->foreignId('used_by')->nullable()->constrained('users')->onDelete('set null');

            // Restore old role enum
            $table->enum('role', ['admin', 'user'])->default('user')->change();
        });
    }
};
