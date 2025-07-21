<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AccessRequestController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin-only routes
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::get('settings', function () {
            return Inertia::render('settings/index');
        })->name('settings');

        // Admin creation routes
        Route::get('admin/create', [AdminController::class, 'createAdmin'])->name('admin.create');
        Route::post('admin/create', [AdminController::class, 'storeAdmin'])->name('admin.store');

        // Access request management routes
        Route::get('access-requests', [AccessRequestController::class, 'index'])->name('access-requests.index');
        Route::get('access-requests/{accessRequest}', [AccessRequestController::class, 'show'])->name('access-requests.show');
        Route::patch('access-requests/{accessRequest}/approve', [AccessRequestController::class, 'approve'])->name('access-requests.approve');
        Route::patch('access-requests/{accessRequest}/reject', [AccessRequestController::class, 'reject'])->name('access-requests.reject');

        // Essential invitation routes (create and resend only)
        Route::get('invitations/create', [InvitationController::class, 'create'])->name('invitations.create');
        Route::post('invitations', [InvitationController::class, 'store'])->name('invitations.store');
        Route::post('invitations/{invitation}/resend', [InvitationController::class, 'resend'])->name('invitations.resend');
    });

    // Editor and admin routes
    Route::middleware(['role:admin|editor'])->group(function () {
        Route::get('access-requests', [AccessRequestController::class, 'index'])->name('access-requests.index');
        Route::get('access-requests/{accessRequest}', [AccessRequestController::class, 'show'])->name('access-requests.show');
        Route::patch('access-requests/{accessRequest}/approve', [AccessRequestController::class, 'approve'])->name('access-requests.approve');
        Route::patch('access-requests/{accessRequest}/reject', [AccessRequestController::class, 'reject'])->name('access-requests.reject');
    });
});

// Public invitation routes (no auth required)
Route::get('invitations/{token}/accept', [InvitationController::class, 'accept'])->name('invitations.accept');
Route::post('invitations/register', [InvitationController::class, 'register'])->name('invitations.register');

require __DIR__ . '/auth.php';
