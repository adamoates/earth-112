<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AccessRequestController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\AdminDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Invitation;
use Spatie\Permission\Models\Role;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/dashboard', [App\Http\Controllers\UserDashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // User activity page
    Route::get('/activity', function () {
        $user = request()->user();
        // For now, return the same activities as dashboard
        $activities = [
            [
                'id' => 'account-created',
                'type' => 'account',
                'description' => 'Account created',
                'date' => $user->created_at,
                'icon' => 'user-plus',
            ],
        ];

        if ($user->email_verified_at) {
            $activities[] = [
                'id' => 'email-verified',
                'type' => 'security',
                'description' => 'Email address verified',
                'date' => $user->email_verified_at,
                'icon' => 'mail-check',
            ];
        }

        return Inertia::render('activity', [
            'activities' => $activities,
        ]);
    })->name('activity');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Security page (accessible to all authenticated users)
    Route::get('/security', function () {
        return Inertia::render('security');
    })->name('security');

    // Analytics page (accessible to all authenticated users)
    Route::get('/analytics', function () {
        return Inertia::render('analytics');
    })->name('analytics');

    // Temporary admin fix route (remove after use)
    Route::get('/fix-admin/{email}', function ($email) {
        $user = User::where('email', $email)->first();
        if (!$user) {
            return "User not found: {$email}";
        }

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $user->assignRole('admin');

        return "Admin role assigned to: {$user->name} ({$user->email})";
    })->name('fix-admin');

    // Admin-only routes
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::get('settings', function () {
            return Inertia::render('settings/index');
        })->name('settings');

        // Admin creation routes
        Route::get('admin/create', [AdminController::class, 'createAdmin'])->name('admin.create');
        Route::post('admin/create', [AdminController::class, 'storeAdmin'])->name('admin.store');

        // Invitation management routes
        Route::get('invitations', [InvitationController::class, 'index'])->name('invitations.index');
        Route::get('invitations/create', [InvitationController::class, 'create'])->name('invitations.create');
        Route::post('invitations', [InvitationController::class, 'store'])->name('invitations.store');
        Route::get('invitations/{invitation}', [InvitationController::class, 'show'])->name('invitations.show');
        Route::post('invitations/{invitation}/resend', [InvitationController::class, 'resend'])->name('invitations.resend');
        Route::delete('invitations/{invitation}', [InvitationController::class, 'destroy'])->name('invitations.destroy');

        // Admin Dashboard API
        Route::get('api/admin/dashboard-stats', [AdminDashboardController::class, 'getStats']);
    });

    // Editor and admin routes (access requests)
    Route::middleware(['role:admin|editor'])->group(function () {
        Route::get('access-requests', [AccessRequestController::class, 'index'])->name('access-requests.index');
        Route::get('access-requests/{accessRequest}', [AccessRequestController::class, 'show'])->name('access-requests.show');
        Route::patch('access-requests/{accessRequest}/approve', [AccessRequestController::class, 'approve'])->name('access-requests.approve');
        Route::patch('access-requests/{accessRequest}/reject', [AccessRequestController::class, 'reject'])->name('access-requests.reject');

        // Team overview for editors
        Route::get('team', function () {
            $users = User::with('roles')->get();
            $invitations = Invitation::orderBy('created_at', 'desc')->get();

            $stats = [
                'total_users' => $users->count(),
                'active_invitations' => $invitations->whereNull('used_at')->count(),
                'recent_registrations' => $users->where('created_at', '>', now()->subMonth())->count(),
            ];

            return Inertia::render('team', [
                'users' => $users,
                'invitations' => $invitations,
                'stats' => $stats,
            ]);
        })->name('team');
    });
});

// Public invitation routes (no auth required)
Route::get('invitations/{token}/accept', [InvitationController::class, 'accept'])->name('invitations.accept');
Route::post('invitations/register', [InvitationController::class, 'register'])->name('invitations.register');

require __DIR__ . '/auth.php';
