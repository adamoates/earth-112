<?php

namespace Tests\Feature\Auth;

use App\Models\Invitation;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Run the database seeder to create roles and permissions
        $this->seed(DatabaseSeeder::class);
    }

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        // Since registration is invitation-only, this should redirect without authenticating
        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_registration_screen_can_be_rendered_with_valid_invitation()
    {
        // Create a test invitation
        $invitation = Invitation::factory()->create([
            'email' => 'test@example.com',
            'role' => 'viewer',
        ]);

        $response = $this->get("/invitations/{$invitation->token}/accept");

        $response->assertStatus(200);
    }

    public function test_registration_screen_returns_404_with_invalid_invitation()
    {
        $response = $this->get('/invitations/invalid-token/accept');

        $response->assertStatus(404);
    }

    public function test_new_users_can_register_with_valid_invitation()
    {
        // Create a test invitation
        $invitation = Invitation::factory()->create([
            'email' => 'test@example.com',
            'role' => 'viewer',
        ]);

        $response = $this->post('/invitations/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'token' => $invitation->token,
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));

        // Follow the redirect to check authentication
        $this->followRedirects($response);

        $this->assertAuthenticated();

        // Verify user was created and invitation was marked as used
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
        $this->assertDatabaseHas('invitations', [
            'id' => $invitation->id,
            'used_at' => now()->toDateTimeString(),
        ]);
    }

    public function test_registration_fails_with_invalid_token()
    {
        $response = $this->post('/invitations/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'token' => 'invalid-token',
        ]);

        $response->assertStatus(404);
        $this->assertGuest();
    }

    public function test_registration_fails_with_email_mismatch()
    {
        // Create a test invitation
        $invitation = Invitation::factory()->create([
            'email' => 'invited@example.com',
            'role' => 'viewer',
        ]);

        $response = $this->post('/invitations/register', [
            'name' => 'Test User',
            'email' => 'different@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'token' => $invitation->token,
        ]);

        $response->assertStatus(400);
        $this->assertGuest();
    }

    public function test_registration_fails_with_expired_invitation()
    {
        // Create an expired invitation
        $invitation = Invitation::factory()->create([
            'email' => 'test@example.com',
            'role' => 'viewer',
            'expires_at' => now()->subDay(),
        ]);

        $response = $this->post('/invitations/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'token' => $invitation->token,
        ]);

        $response->assertStatus(404);
        $this->assertGuest();
    }
}
