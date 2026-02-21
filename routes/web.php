<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Gallery Routes - UPDATED
|--------------------------------------------------------------------------
|
| Routes untuk fitur Gallery dengan image serving
| Pattern mengikuti MemberManage dari Adit
|
| CATATAN: 
| - Tambahkan ke routes/web.php (bukan api.php)
| - Image serving harus di web.php untuk bisa akses file
|
*/

// Public Routes - bisa diakses siapa saja
Route::prefix('galleries')->name('galleries.')->group(function () {
    // Get all galleries
    Route::get('/', [GalleryController::class, 'index'])->name('index');
    
    // Get single gallery
    Route::get('/{id}', [GalleryController::class, 'show'])->name('show');
    
    // Serve image (public access untuk yang published)
    Route::get('/{gallery}/image/{image}', [GalleryController::class, 'image'])->name('image');
});

// Protected Routes - hanya yang sudah login
Route::middleware(['auth'])->prefix('galleries')->name('galleries.')->group(function () {
    // Create gallery
    Route::post('/', [GalleryController::class, 'store'])->name('store');
    
    // Update gallery
    Route::put('/{id}', [GalleryController::class, 'update'])->name('update');
    
    // Delete gallery
    Route::delete('/{id}', [GalleryController::class, 'destroy'])->name('destroy');
    
    // Toggle publish
    Route::patch('/{id}/toggle-publish', [GalleryController::class, 'togglePublish'])->name('toggle-publish');
    
    // Upload images
    Route::post('/{id}/images', [GalleryController::class, 'uploadImages'])->name('upload-images');
    
    // Delete image
    Route::delete('/{galleryId}/images/{imageId}', [GalleryController::class, 'deleteImage'])->name('delete-image');
});

Route::get('/test/gallery', function () {
    return view('test.gallery');
})->name('test.gallery');