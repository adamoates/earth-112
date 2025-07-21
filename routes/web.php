<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AccessRequestController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('security', function () {
        return Inertia::render('security');
    })->name('security');

    Route::get('analytics', function () {
        return Inertia::render('analytics');
    })->name('analytics');

    // Admin-only routes
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('invitations', InvitationController::class);
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
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
