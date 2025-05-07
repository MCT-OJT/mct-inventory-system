<?php

use App\Http\Controllers\MetadataController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\FileController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    //* GENERAL ROUTES
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    //* INVENTORY ROUTES
    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::post('/inventory', [InventoryController::class, 'store'])->name('inventory.store');
    Route::get('/inventory/{id}', [InventoryController::class, 'show'])->name('inventory.show');
    Route::delete('/inventory/{id}', [InventoryController::class, 'destroy'])->name('inventory.destroy');
    Route::put('/inventory', [InventoryController::class, 'update'])->name('inventory.update');
    Route::get('/qr-code/{id}', [InventoryController::class, 'generate']);
    Route::post('/repair', [InventoryController::class, 'storeRepairHistory'])->name('inventory.storeRepairHistory');

    //* METADATA ROUTES
    Route::get('/metadata', [MetadataController::class, 'index'])->name('metadata.index');
    Route::post('/employee', [MetadataController::class, 'storeEmployee'])->name('metadata.employee.store');
    Route::post('/new-assets', [MetadataController::class, 'storeAssets'])->name('metadata.assets.store');

    //!test
    Route::post('/upload', [FileController::class, 'store']);
    Route::get('/nas-image/{filename}', [FileController::class, 'show']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
