<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    protected static ?string $password;

    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'Adam',
            'last_name' => 'Oates',
            'name' => 'Adam Oates',
            'gender' => 'male',
            'email' => 'aoates@earth-112.com',
            'avatar_url' => 'https://randomuser.me/api/portraits/men/1.jpg',
            'password' => static::$password ??= Hash::make('password'),
            'phone_number' => '(555) 000-0000',
            'birthday' => '1984-05-16',
            'age' => now()->diffInYears('1984-05-16'),
        ]);

        User::factory(10)->create();
    }
}
