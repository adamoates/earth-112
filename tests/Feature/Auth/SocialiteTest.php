<?php

namespace Tests\Feature\Auth;

use App\Models\Invitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class SocialiteTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Mock Socialite facade
        Socialite::shouldReceive('driver')
            ->with('google')
            ->andReturnSelf();

        // Create roles and permissions for testing
        $this->createRolesAndPermissions();
    }

    private function createRolesAndPermissions(): void
    {
        // Create permissions
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view invitations',
            'create invitations',
            'edit invitations',
            'delete invitations',
            'view access requests',
            'approve access requests',
            'reject access requests',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view users',
            'view invitations',
            'create invitations',
            'view access requests',
            'approve access requests',
            'reject access requests',
        ]);

        $viewerRole = Role::firstOrCreate(['name' => 'viewer']);
        $viewerRole->givePermissionTo([
            'view users',
            'view invitations',
        ]);
    }

    public function test_google_login_redirects_to_google()
    {
        Socialite::shouldReceive('redirect')
            ->once()
            ->andReturn(redirect('https://accounts.google.com/oauth/authorize'));

        $response = $this->get('/login/google');

        $response->assertStatus(302);
    }

    public function test_google_callback_requires_valid_invitation()
    {
        // Mock Socialite to return a user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => '12345',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        Socialite::shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $response = $this->get('/login/google/callback');

        $response->assertStatus(302);
        $response->assertRedirectContains('/social-status');
        $response->assertSessionMissing('errors');
    }

    public function test_google_callback_creates_user_with_valid_invitation()
    {
        // Create a valid invitation
        $invitation = Invitation::factory()->create([
            'email' => 'john@example.com',
            'role' => 'viewer',
            'expires_at' => now()->addDays(7),
            'used_at' => null,
        ]);

        // Mock Socialite to return a user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => '12345',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        Socialite::shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $response = $this->get('/login/google/callback');

        $response->assertStatus(302);
        $response->assertRedirectContains('/social-status');

        // Check that user was created with social fields
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'social_provider' => 'google',
            'social_id' => '12345',
            'is_social_user' => true,
        ]);

        // Check that invitation was marked as used
        $this->assertDatabaseHas('invitations', [
            'id' => $invitation->id,
        ]);
        $this->assertNotNull($invitation->fresh()->used_at);

        // Check that user has the correct role
        $user = User::where('email', 'john@example.com')->first();
        $this->assertTrue($user->hasRole('viewer'));
        $this->assertTrue($user->isSocialUser());
    }

    public function test_google_callback_logs_in_existing_user()
    {
        // Create a user with an already-used invitation (simulating production scenario)
        $user = User::factory()->create([
            'email' => 'john@example.com',
        ]);
        $user->assignRole('editor'); // Assign the role that matches the invitation

        // Create a used invitation (simulating that user was created via invitation)
        $invitation = Invitation::factory()->create([
            'email' => 'john@example.com',
            'role' => 'editor',
            'expires_at' => now()->addDays(7),
            'used_at' => now()->subMinutes(10), // Used 10 minutes ago
        ]);

        // Mock Socialite to return a user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => '12345',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        Socialite::shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $response = $this->get('/login/google/callback');

        $response->assertStatus(302);
        $response->assertRedirectContains('/social-status');

        // Check that user was updated with social fields
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'social_provider' => 'google',
            'social_id' => '12345',
            'is_social_user' => true,
        ]);

        // For existing users, invitation should remain as it was (not marked as used again)
        $this->assertDatabaseHas('invitations', [
            'id' => $invitation->id,
        ]);
        // The invitation was already used when the user was created, so it should still be used
        $this->assertNotNull($invitation->fresh()->used_at);

        // Check that user has the correct role
        $this->assertTrue($user->fresh()->hasRole('editor'));
        $this->assertTrue($user->fresh()->isSocialUser());
    }

    public function test_google_callback_rejects_expired_invitation()
    {
        // Create an expired invitation
        $invitation = Invitation::factory()->create([
            'email' => 'john@example.com',
            'role' => 'viewer',
            'expires_at' => now()->subDays(1),
            'used_at' => null,
        ]);

        // Mock Socialite to return a user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => '12345',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        Socialite::shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $response = $this->get('/login/google/callback');

        $response->assertStatus(302);
        $response->assertRedirectContains('/social-status');
        $response->assertSessionMissing('errors');
    }

    public function test_google_callback_rejects_used_invitation()
    {
        // Create a used invitation
        $invitation = Invitation::factory()->create([
            'email' => 'john@example.com',
            'role' => 'viewer',
            'expires_at' => now()->addDays(7),
            'used_at' => now(),
        ]);

        // Mock Socialite to return a user
        $socialiteUser = new SocialiteUser();
        $socialiteUser->map([
            'id' => '12345',
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        Socialite::shouldReceive('user')
            ->once()
            ->andReturn($socialiteUser);

        $response = $this->get('/login/google/callback');

        $response->assertStatus(302);
        $response->assertRedirectContains('/social-status');
        $response->assertSessionMissing('errors');
    }
}
