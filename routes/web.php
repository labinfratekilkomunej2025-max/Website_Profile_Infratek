<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MemberManagement\MemberManage;
use App\Http\Controllers\MemberManagement\ManagementManage;
use App\Http\Controllers\MemberManagement\AccountManage;
use App\Http\Controllers\MemberManagement\PositionController;
use App\Http\Controllers\MemberManagement\PeriodController;

function getPaths(string $currentPath){
    return [
        'CurrentPath'=>$currentPath,
        // 'HomePath'=>route('home'),
        // 'GalleryPath'=>route('gallery'),
        // 'ContactPath'=>route('contact'),
    ];
}

Route::get('/', function () {
    // Ini akan mencari file di: resources/js/Pages/Home.tsx
    return Inertia::render('Home'); 
})->name('home');

Route::get('/gallery', function () {
    // Ini akan mencari file di: resources/js/Pages/gallery/page.tsx
    // Perhatikan huruf kecil 'g' dan 'p' harus sama persis dengan nama folder/file
    return Inertia::render('gallery/page'); 
})->name('gallery');

Route::get('/contact', function () {
    // Ini akan mencari file di: resources/js/Pages/contact/page.tsx
    return Inertia::render('contact/page'); 
})->name('contact');

// For routes that can only be accessed by Editor or Admin
Route::middleware('loginAuth')->group(function(){
    Route::get('auth/test-editor', function(){});
});
// For routes that can only be accessed by Admin
Route::middleware('adminAuth')->group(function(){
    Route::get('auth/test-admin', function(Request $request){
    }); 
});

Route::get('/news', function () {
    return Inertia::render('News');
})->name('news');

Route::get('/news/{slug}', function ($slug) {
    // Kita kirim $slug ke komponen React agar bisa dipakai (nanti buat fetch data)
    return Inertia::render('NewsDetail', ['slug' => $slug]);
})->name('news.detail');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
    
// Route::post('/users/destroy', [UserController::class, 'delete_user'])->name('user.delete'); // testing
// Route::get('/users/delete', function(){
//     return Inertia::render('Nyoba');
// })->name('user.delete_page'); // testing

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// This using middleware of laravel auth
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Route::get('/secret', function(){
//     return Storage::disk('local')->response("secret.txt");
// });
Route::get('/users', [UserController::class, 'get_all_editor'])->name('get_all_editor');
 
Route::get('/managements/get-all', [ManagementManage::class, 'get_all_management_member'])->name('get_all_managements');
Route::get('/managements', [ManagementManage::class, 'index_per_pos'])->name('managements.index_per_pos');
Route::get('/managements/per-pos', [ManagementManage::class, 'get_all_period_position'])->name('get_all_per_pos');
Route::get('/members', [MemberManage::class, 'get_all_member'])->name('get_all_members');

Route::name('positions.')->prefix('position')->group(function () {
    Route::get('all', [PositionController::class, 'get_all'])->name('all');
    Route::post('store', [PositionController::class, 'store'])->name('store');
    Route::put('update', [PositionController::class, 'update'])->name('update');
    Route::delete('destroy/{position}', [PositionController::class, 'destroy'])->name('destroy');
});
Route::name('periods.')->prefix('periods')->group(function () {
    Route::get('all', [PeriodController::class, 'get_all'])->name('all');
    Route::post('store', [PeriodController::class, 'store'])->name('store');
    Route::put('update', [PeriodController::class, 'update'])->name('update');
    Route::delete('destroy/{period}', [PeriodController::class, 'destroy'])->name('destroy');
});
Route::name('members.')->prefix('members')->group(function () {
    Route::get('/', [MemberManage::class, 'index_member'])->name('index');
    Route::post('store', [MemberManage::class, 'store'])->name('store');
    Route::put('update', [MemberManage::class, 'update'])->name('update');
    Route::delete('destroy/{member}', [MemberManage::class, 'destroy'])->name('destroy');
    Route::get('photo/{member}', [MemberManage::class, 'photo'])->name('photo');
});
Route::name('users.')->prefix('users')->group(function () {
    Route::get('/', [AccountManage::class, 'index'])->name('index');
    Route::post('store', [AccountManage::class, 'store'])->name('store');
    Route::put('update', [AccountManage::class, 'update'])->name('update');
    Route::delete('destroy/{user}', [AccountManage::class, 'destroy'])->name('destroy');
});
    // $path = $request->file('avatar')->store('/', 'private_gallery_images');
    // $path = $request->file('avatar')->store('/', 'private_news_images');
    // $path = $request->file('avatar')->store('/', 'member_photos');