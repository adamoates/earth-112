<?php

namespace Tests\Feature\Auth;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

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

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

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
