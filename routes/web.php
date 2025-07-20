<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvitationController;

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
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
