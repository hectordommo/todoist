<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [AppController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group([], function () {
    Route::get('/clients', [ClientController::class, 'index'])->name('clients.index');

    Route::post('/goals', [GoalsController::class, 'store'])->name('goals.store');
    Route::post('/todo', [TodoController::class, 'store'])->name('todo.store');
    Route::post('/todo/sort', [TodoController::class, 'sort'])->name('todo.sort');
    Route::put('/todo/{todo}', [TodoController::class, 'update'])->name('todo.update');
    Route::post('/client', [ClientController::class, 'store'])->name('client.store');

})->middleware('auth');

require __DIR__.'/auth.php';
