<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::apiResource('users', UserController::class);

Route::get('debug', function () {
    return 'API ROUTES ARE WORKING';
});
