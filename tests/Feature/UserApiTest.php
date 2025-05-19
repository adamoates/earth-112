<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;


class UserApiTest extends TestCase
{
    use RefreshDatabase;

    protected static ?string $password;

    #[Test]
    public function it_can_list_users(): void
    {
        User::factory()->count(3)->create();

        $response = $this->getJson('/api/users');

        $response->assertOk();
        $response->assertJsonCount(3);
    }

    #[Test]
    public function it_can_show_a_user(): void
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email,
                ],
            ]);
    }

    #[Test]
    public function it_can_create_a_user(): void
    {
        $this->actingAs(User::factory()->create()); // or an admin user

        $payload = [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'gender' => 'female',
            'name' => 'Jane Doe',
            'password' => 'password',
            'email' => 'jane@example.com',
            'avatar_url' => 'https://randomuser.me/api/portraits/women/1.jpg',
            'phone_number' => '(555) 123-4567',
            'birthday' => '1990-01-01',
        ];

        $response = $this->postJson('/api/users', $payload);

        $response->assertCreated();
        $this->assertDatabaseHas('users', [
            'email' => 'jane@example.com',
            'first_name' => 'Jane',
        ]);
    }

    #[Test]
    public function it_validates_user_creation(): void
    {
        $this->actingAs(User::factory()->create()); // or an admin user 

        $response = $this->postJson('/api/users', [
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email', 'first_name', 'last_name', 'gender']);
    }

    #[Test]
    public function it_can_update_a_user(): void
    {
        $this->actingAs(User::factory()->create()); // or an admin user

        $user = User::factory()->create([
            'email' => 'old@example.com',
        ]);

        $response = $this->putJson("/api/users/{$user->id}", [
            'email' => 'new@example.com',
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => 'new@example.com',
        ]);
    }

    #[Test]
    public function it_can_delete_a_user(): void
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertNoContent();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
