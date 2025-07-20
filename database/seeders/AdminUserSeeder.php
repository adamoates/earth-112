<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Update existing user to admin role
        User::where('email', 'apmo1984@gmail.com')->update(['role' => 'admin']);

        // Create additional admin user if needed
        if (!User::where('email', 'admin@earth-112.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@earth-112.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]);
        }
    }
}
