<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;

// Public - boleh diakses pengunjung
Route::prefix('galleries')->group(function () {
    Route::get('/', [GalleryController::class, 'index']);
    Route::get('/{id}', [GalleryController::class, 'show']);
});

// Protected - hanya yang sudah login
Route::middleware(['auth'])->prefix('galleries')->group(function () {
    Route::post('/', [GalleryController::class, 'store']);
    Route::put('/{id}', [GalleryController::class, 'update']);
    Route::delete('/{id}', [GalleryController::class, 'destroy']);
    Route::patch('/{id}/toggle-publish', [GalleryController::class, 'togglePublish']);
    Route::post('/{id}/images', [GalleryController::class, 'uploadImages']);
    Route::delete('/{galleryId}/images/{imageId}', [GalleryController::class, 'deleteImage']);
});