<?php

namespace Tests\Feature;

use App\Models\Invitation;
use App\Models\User;
use App\Notifications\InviteUserNotification;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class InvitationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Run the database seeder to create roles and permissions
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_can_create_invitation()
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)
            ->post('/invitations', [
                'email' => 'test@example.com',
                'role' => 'viewer',
            ]);

        $response->assertRedirect('/invitations');
        $this->assertDatabaseHas('invitations', [
            'email' => 'test@example.com',
            'role' => 'viewer',
        ]);
    }

    public function test_non_admin_cannot_create_invitation()
    {
        $user = User::factory()->viewer()->create();

        $response = $this->actingAs($user)
            ->post('/invitations', [
                'email' => 'test@example.com',
                'role' => 'viewer',
            ]);

        $response->assertStatus(403);
    }

    public function test_invitation_sends_email()
    {
        Notification::fake();

        $admin = User::factory()->admin()->create();
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->addHours(48),
            'created_by' => $admin->id,
        ]);

        $invitation->notify(new InviteUserNotification($invitation));

        Notification::assertSentTo(
            $invitation,
            InviteUserNotification::class
        );
    }

    public function test_valid_invitation_can_be_accepted()
    {
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->addHours(48),
        ]);

        $response = $this->get("/invitations/{$invitation->token}/accept");

        $response->assertStatus(200);
        $response->assertInertia(fn($page) => $page->component('auth/register'));
    }

    public function test_expired_invitation_cannot_be_accepted()
    {
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->subHours(1),
        ]);

        $response = $this->get("/invitations/{$invitation->token}/accept");

        $response->assertStatus(404);
    }

    public function test_used_invitation_cannot_be_accepted()
    {
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->addHours(48),
            'used_at' => now(),
        ]);

        $response = $this->get("/invitations/{$invitation->token}/accept");

        $response->assertStatus(404);
    }

    public function test_user_can_register_with_valid_invitation()
    {
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->addHours(48),
        ]);

        $response = $this->post('/invitations/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'token' => $invitation->token,
        ]);

        $response->assertRedirect('/dashboard');

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'name' => 'Test User',
        ]);

        $user = User::where('email', 'test@example.com')->first();
        $this->assertTrue($user->hasRole('viewer'));

        $this->assertDatabaseHas('invitations', [
            'email' => 'test@example.com',
            'used_at' => now(),
        ]);
    }

    public function test_user_cannot_register_with_invalid_email()
    {
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->addHours(48),
        ]);

        $response = $this->post('/invitations/register', [
            'name' => 'Test User',
            'email' => 'different@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'token' => $invitation->token,
        ]);

        $response->assertStatus(400);
    }

    public function test_invitation_token_is_secure()
    {
        $invitation = Invitation::create([
            'email' => 'test@example.com',
            'token' => Invitation::generateToken(),
            'role' => 'viewer',
            'expires_at' => now()->addHours(48),
        ]);

        // Token should be a secure random string of 64 characters
        $this->assertEquals(64, strlen($invitation->token));
        $this->assertTrue(ctype_alnum($invitation->token) || preg_match('/[^a-zA-Z0-9]/', $invitation->token));
    }
}
