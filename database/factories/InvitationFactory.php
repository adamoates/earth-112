<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invitation>
 */
class InvitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'token' => Invitation::generateToken(),
            'role' => fake()->randomElement(['viewer', 'editor', 'admin']),
            'expires_at' => now()->addDays(fake()->numberBetween(1, 30)),
            'used_at' => null,
            'created_by' => null,
        ];
    }

    /**
     * Indicate that the invitation is expired.
     */
    public function expired(): static
    {
        return $this->state(fn(array $attributes) => [
            'expires_at' => now()->subDays(fake()->numberBetween(1, 30)),
        ]);
    }

    /**
     * Indicate that the invitation has been used.
     */
    public function used(): static
    {
        return $this->state(fn(array $attributes) => [
            'used_at' => now(),
        ]);
    }

    /**
     * Indicate that the invitation is for a specific role.
     */
    public function role(string $role): static
    {
        return $this->state(fn(array $attributes) => [
            'role' => $role,
        ]);
    }
}
