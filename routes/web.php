<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MemberManagement\MemberManage;
use App\Http\Controllers\MemberManagement\ManagementManage;
use App\Http\Controllers\MemberManagement\AccountManage;
use App\Http\Controllers\MemberManagement\PositionController;
use App\Http\Controllers\MemberManagement\PeriodController;
use App\Http\Controllers\MemberManagement\DivisionController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;


// For routes that can be accessed for anyone
Route::get('/', function(){return redirect(route('home'));})->name('root');
Route::get('/dashboard', function(){return redirect(route('home'));})->name('dashboard');
Route::get('/home', [GuestController::class, 'Home'])->name('home');
Route::get('/gallery', [GuestController::class, 'Gallery'])->name('gallery');
Route::get('/contact', [GuestController::class, 'Contact'])->name('contact');
Route::get('/about/get-members/{period}', [GuestController::class, 'GetMembers'])->name('get-members');
Route::get('/about', [GuestController::class, 'About'])->name('about');
Route::get('/news', [GuestController::class, 'News'])->name('news');

Route::prefix('gallery')->name('galleries.')->group(function () {
    Route::get('/image/tumbnail/{gallery}', [GalleryController::class, 'image_tumbnail'])->name('image.tumbnail');
    Route::get('/{gallery}/image/{image}', [GalleryController::class, 'image'])->name('image');
    Route::get('/{gallery}/images', [GalleryController::class, 'GetAvailableImage'])->name('images');
});

Route::prefix('news')->name('news.')->group(function () {
    Route::get('/tumbnail/{news}', [NewsController::class, 'getTumbnailPublic'])->name('tumbnail');
    Route::get('/{news}', [NewsController::class, 'viewDetail'])->name('detail');
    Route::get('/image/{news_component}', [NewsController::class, 'getImage'])->name('image');
});

// Protected Routes - hanya yang sudah login
Route::middleware(['auth','loginAuth'])->group(function () {
    Route::prefix('gallery')->name('galleries.')->group(function () {
        Route::get('/manage/{gallery}', [GalleryController::class, 'manage'])->name('manage');
        Route::get('/manage/{gallery}/images-id', [GalleryController::class, 'getImagesId'])->name('images-id');
        Route::post('/store', [GalleryController::class, 'store'])->name('store');
        Route::put('/{id}', [GalleryController::class, 'update'])->name('update');
        Route::delete('/{id}', [GalleryController::class, 'destroy'])->name('destroy');
        Route::patch('/{id}/toggle-publish', [GalleryController::class, 'togglePublish'])->name('toggle-publish');
        Route::post('/{id}/images', [GalleryController::class, 'uploadImages'])->name('upload-images');
        Route::delete('/{galleryId}/images/{imageId}', [GalleryController::class, 'deleteImage'])->name('delete-image');
    });  
    Route::prefix('news')->name('news.')->group(function () {
        Route::get('/manage/{news}/components', [NewsController::class, 'getNewsComponents'])->name('components');
        Route::get('/manage/{news}', [NewsController::class, 'manage'])->name('manage');
        Route::post('store/component/{newsId}', [NewsController::class, 'store'])->name('store-component');
        Route::post('store', [NewsController::class, 'createNews'])->name('store');
        Route::put('update/news/{news}', [NewsController::class, 'updateNews'])->name('update');
        Route::put('update/component/{component}', [NewsController::class, 'update'])->name('update-component');
        Route::patch('/{news}/toggle-publish', [NewsController::class, 'togglePublish'])->name('toggle-publish');
        Route::delete('delete/news/{news}', [NewsController::class, 'deleteNews'])->name('delete');
        Route::delete('delete/component/{component}', [NewsController::class, 'deleteComponent'])->name('delete-component');
    });
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

Route::middleware(['adminAuth'])->group(function(){
    Route::get('/members/managements', [ManagementManage::class, 'managements'])->name('managements.index');
    Route::prefix('members')->group(function() {
        Route::name('periods.')->prefix('periods')->group(function () {
            Route::get('/', [ManagementManage::class, 'periodsIndex'])->name('manage');
            Route::get('all', [PeriodController::class, 'get_all'])->name('all');
            Route::post('store', [PeriodController::class, 'store'])->name('store');
            Route::put('update/{period}', [PeriodController::class, 'update'])->name('update');
            Route::delete('destroy/{period}', [PeriodController::class, 'destroy'])->name('destroy');
        });
            Route::name('divisions.')->prefix('divisions')->group(function () {
            Route::get('/', [ManagementManage::class, 'divisionsIndex'])->name('manage');
            Route::get('all', [DivisionController::class, 'get_all'])->name('all');
            Route::post('store', [DivisionController::class, 'store'])->name('store');
            Route::put('update/{division}', [DivisionController::class, 'update'])->name('update');
            Route::delete('destroy/{division}', [DivisionController::class, 'destroy'])->name('destroy');
        });
            Route::name('positions.')->prefix('positions')->group(function () {
            Route::get('/', [ManagementManage::class, 'positionsIndex'])->name('manage');
            Route::get('all', [PositionController::class, 'get_all'])->name('all');
            Route::post('store', [PositionController::class, 'store'])->name('store');
            Route::put('update/{position}', [PositionController::class, 'update'])->name('update');
            Route::delete('destroy/{position}', [PositionController::class, 'destroy'])->name('destroy');
        });
    });
    Route::name('members.')->prefix('members')->group(function () {
        Route::get('/', [MemberManage::class, 'index_member'])->name('manage');
        Route::post('store', [MemberManage::class, 'store'])->name('store');
        Route::put('update', [MemberManage::class, 'update'])->name('update');
        Route::delete('destroy/{member}', [MemberManage::class, 'destroy'])->name('destroy');
        Route::get('photo/{member}', [MemberManage::class, 'photo'])->name('photo');
    });
    Route::name('management-details.')->prefix('management-details')->group(function () {
        Route::post('store', [ManagementManage::class, 'detail_store'])->name('store');
        Route::put('update/{management_detail}', [ManagementManage::class, 'detail_update'])->name('update');
        Route::delete('destroy/{management_detail}', [ManagementManage::class, 'detail_destroy'])->name('destroy');
    });
    Route::name('users.')->prefix('users')->group(function () {
        Route::get('/', [AccountManage::class, 'index'])->name('index');
        Route::post('store', [AccountManage::class, 'store'])->name('store');
        Route::put('update', [AccountManage::class, 'update'])->name('update');
        Route::delete('destroy/{user}', [AccountManage::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/auth.php';