<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartamentosController;
use App\Http\Controllers\TrabajadoresController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Obtener usuario autenticado (requiere Sanctum)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rutas de Departamentos (sin autenticación)
Route::apiResource('departamentos', DepartamentosController::class);

// Rutas de Trabajadores (sin autenticación)
Route::apiResource('trabajadores', TrabajadoresController::class);
Route::get('trabajadores/departamentos', [TrabajadoresController::class, 'TrabajadoresDepartamento']);

// Rutas públicas (sin autenticación)
Route::post('auth/register', [AuthController::class, 'create']);
Route::post('auth/login', [AuthController::class, 'login'])->name('login');

// Rutas protegidas con Sanctum (solo para autenticación y logout)
Route::middleware(['auth:sanctum'])->group(function () {
    // Logout
    Route::post('auth/logout', [AuthController::class, 'logout']);
});

