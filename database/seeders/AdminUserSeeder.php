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
        // Create a default admin user (only if it doesn't exist)
        $admin = User::firstOrCreate(
            ['email' => 'admin@earth-112.com'],
            [
                'name' => 'Adam Oates',
                'password' => bcrypt('Welcome#1'),
                'email_verified_at' => now(),
            ]
        );

        if (! $admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }

        // Add a second default admin user (apmo1984@gmail.com)
        $admin2 = User::firstOrCreate(
            ['email' => 'apmo1984@gmail.com'],
            [
                'name' => 'Adam Oates',
                'password' => bcrypt('ZoeOates@2014!'),
                'email_verified_at' => now(),
            ]
        );

        if (! $admin2->hasRole('admin')) {
            $admin2->assignRole('admin');
        }
    }
}
