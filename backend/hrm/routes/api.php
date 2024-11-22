<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\AllEquipmentsController;
use App\Http\Controllers\UserEquipmentController;
use App\Http\Controllers\IssuedEquipmentController;
use App\Http\Controllers\EquipmentRequestController;

// API versioning
//Route::prefix('hrm')->group(function () {
    
    // Public routes: login, register
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::apiResource('allequipments', AllEquipmentsController::class);
    Route::apiResource('equipment', EquipmentController::class);
    Route::apiResource('employees', EmployeeController::class);

    
    // Routes protected by sanctum middleware
    Route::middleware('auth:sanctum')->group(function () {

        // Auth routes
        Route::post('logout', [AuthController::class, 'logout']);

        // Employee routes
        
        // Equipment routes
        
        
        Route::apiResource('issuedequipments', IssuedEquipmentController::class);

        // Dashboard route
        Route::get('dashboard-data', [DashboardController::class, 'dashboardData']);
        
        // Optional: User management route
        Route::apiResource('users', AuthController::class);
        
    });

    // Route::middleware('auth:sanctum')->group(function () {
    //     // User routes
    //     Route::get('/user/equipment', [UserEquipmentController::class, 'getUserEquipment']); // Get user's issued equipment
    //     Route::post('/request-equipment', [EquipmentRequestController::class, 'submitRequest']); // Request new equipment
    //     Route::get('/user/profile', [UserController::class, 'getProfile']); // Get user profile
    //     Route::put('/user/update-profile', [UserController::class, 'updateProfile']); // Update user profile
    // });

//});

// Fallback route for authenticated user
Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
