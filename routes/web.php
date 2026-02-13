<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

function getPaths(string $currentPath){
    return [
        'CurrentPath'=>$currentPath,
        'HomePath'=>route('home'),
        'GalleryPath'=>route('gallery'),
        'ContactPath'=>route('contact'),
    ];
}

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function(Request $request){
    return Inertia::render('Home', getPaths($request->url()));
})->name('home');
Route::get('/gallery', function(Request $request){
    return Inertia::render('gallery/page', getPaths($request->url()));
})->name('gallery');
Route::get('/contact', function(Request $request){
    return Inertia::render('contact/page', getPaths($request->url()));
})->name('contact');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
