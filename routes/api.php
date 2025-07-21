<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Invitation;
use App\Models\AccessRequest;
use App\Http\Controllers\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin Dashboard API
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard-stats', [AdminDashboardController::class, 'getStats']);
});
