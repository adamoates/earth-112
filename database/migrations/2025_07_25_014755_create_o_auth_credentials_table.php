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
        Schema::create('o_auth_credentials', function (Blueprint $table) {
            $table->id();
            $table->string('provider'); // google, github, discord
            $table->string('client_id')->nullable();
            $table->text('client_secret')->nullable(); // Will be encrypted
            $table->string('redirect_uri')->nullable();
            $table->json('scopes')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamps();

            $table->unique('provider');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('o_auth_credentials');
    }
};
