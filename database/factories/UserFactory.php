<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $birthday = $this->faker->dateTimeBetween('-65 years', '-18 years');
        $age = Carbon::parse($birthday)->age;

        $gender = $this->faker->randomElement(['male', 'female']);
        $avatar = match ($gender) {
            'male' => "https://randomuser.me/api/portraits/men/" . rand(1, 99) . ".jpg",
            'female' => "https://randomuser.me/api/portraits/women/" . rand(1, 99) . ".jpg",
        };

        $firstName = $this->faker->firstName($gender);
        $lastName = $this->faker->lastName();
        $fullName = "$firstName $lastName";

        $rawPhone = $this->faker->numerify('###-###-####'); // e.g. 555-123-4567
        $formattedPhone = preg_replace(
            '/(\d{3})-(\d{3})-(\d{4})/',
            '($1) $2-$3',
            $rawPhone
        );

        return [
            'age' => $age,
            'avatar_url' => $avatar,
            'birthday' => $birthday,
            'email' => strtolower(substr($firstName, 0, 1) . $lastName . '@earth-112.com'),
            'email_verified_at' => now(),
            'gender' => $gender,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'name' => $fullName,
            'password' => static::$password ??= Hash::make('password'),
            'phone_number' => $formattedPhone,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
