<?php

namespace Database\Factories;

use App\Models\Invitation;
use App\Models\User;
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
            'email' => $this->faker->unique()->safeEmail(),
            'token' => Invitation::generateToken(),
            'role' => $this->faker->randomElement(['admin', 'editor', 'viewer']),
            'expires_at' => $this->faker->dateTimeBetween('now', '+48 hours'),
            'used_at' => null,
            'created_by' => null, // Allow null for tests
        ];
    }

    /**
     * Indicate that the invitation is expired.
     */
    public function expired(): static
    {
        return $this->state(fn(array $attributes) => [
            'expires_at' => $this->faker->dateTimeBetween('-48 hours', '-1 hour'),
        ]);
    }

    /**
     * Indicate that the invitation has been used.
     */
    public function used(): static
    {
        return $this->state(fn(array $attributes) => [
            'used_at' => $this->faker->dateTimeBetween('-24 hours', 'now'),
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

    /**
     * Set the creator of the invitation.
     */
    public function createdBy(User $user): static
    {
        return $this->state(fn(array $attributes) => [
            'created_by' => $user->id,
        ]);
    }
}
