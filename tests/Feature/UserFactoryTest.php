<?php

namespace Tests\Feature;

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Carbon;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserFactoryTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_a_valid_user_with_consistent_data(): void
    {
        $user = User::factory()->create();

        // Ensure fields exist
        $this->assertNotEmpty($user->age);
        $this->assertNotEmpty($user->email);
        $this->assertNotEmpty($user->first_name);
        $this->assertNotEmpty($user->last_name);
        $this->assertNotEmpty($user->name);
        $this->assertNotEmpty($user->gender);
        $this->assertNotEmpty($user->avatar_url);
        $this->assertNotEmpty($user->phone_number);
        $this->assertNotEmpty($user->birthday);

        // Full name matches parts
        $this->assertEquals("{$user->first_name} {$user->last_name}", $user->name);

        // Initials check
        $expectedInitials = strtoupper(substr($user->first_name, 0, 1) . substr($user->last_name, 0, 1));
        $this->assertEquals($expectedInitials, $user->initials);

        // Gender must be male or female
        $this->assertContains($user->gender, ['male', 'female']);

        // Avatar URL matches gender
        if ($user->gender === 'male') {
            $this->assertStringContainsString('/men/', $user->avatar_url);
        } elseif ($user->gender === 'female') {
            $this->assertStringContainsString('/women/', $user->avatar_url);
        }

        // Phone format e.g. (123) 456-7890
        $this->assertMatchesRegularExpression('/^\(\d{3}\) \d{3}-\d{4}$/', $user->phone_number);

        // Birthday is a past date and age is between 18 and 65
        $birthday = Carbon::parse($user->birthday);
        $this->assertTrue($birthday->isBefore(now()->subYears(18)));
        $this->assertTrue($birthday->isAfter(now()->subYears(66)));

        // Age matches calculated value
        $expectedAge = $birthday->age;
        if (isset($user->age)) {
            $this->assertEquals($expectedAge, $user->age);
        } else {
            $this->assertEquals($expectedAge, $user->age); // via accessor
        }

        // Email is valid 
        $this->assertMatchesRegularExpression(
            '/^[\w\.\-]+@[\w\-]+\.[\w\-\.]+$/',
            $user->email,
            'The personal email is not a valid email address.'
        );

        // Email has expected format 
        $this->assertMatchesRegularExpression(
            '/^[a-z][a-z]+@earth-112\.com$/',
            $user->email,
            'The company email does not match the expected format (e.g. aoates@earth-112.com).'
        );
    }
}
