<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\FilepondController;
use App\Http\Controllers\PostingController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
	Route::inertia('/', 'Authentication/SignIn')->name('sign-in');

	Route::get('/sign-in/google/redirect', [AuthenticationController::class, 'authenticationRedirect'])->name('login');
	Route::get('/sign-in/google/callback', [AuthenticationController::class, 'handleCallback'])->name('auth.callback');
});

Route::middleware('auth')->group(function () {
	Route::get('/sign-out', [AuthenticationController::class, 'signOut'])->name('sign-out');

	Route::inertia('/home', 'Home')->name('home');
	Route::inertia('/announcements', 'Announcements')->name('announcements');
	Route::inertia('/news', 'News')->name('news');
	Route::inertia('/communications', 'Communications')->name('communications');
	Route::inertia('/posts', 'Posts')->name('posts');
	Route::inertia('/courses', 'Courses')->name('courses');

	Route::inertia('/campaigns', 'Campaigns')->name('campaigns');
	Route::inertia('/store', 'Store')->name('store');
	Route::inertia('/ranking', 'Ranking')->name('ranking');

	Route::prefix('/me')->group(function () {
		// Route::inertia('/posts', 'UserModel/Publications/Main')->name('user.publications');
		Route::get('/posts', [PostingController::class, 'retrieveMyPosts'])->name('user.publications');
		Route::inertia('/new-post', 'User/Publications/NewPost')->name('user.publications.new-post');
		Route::delete('/delete-post', [PostingController::class, 'deletePostById'])->name('user.publications.delete-post');

		Route::inertia('/stats', 'User/Statistics')->name('user.statistics');
		Route::inertia('/config', 'User/Configuration')->name('user.configuration');
	});

	Route::post('/complete-profile', [UserProfileController::class, 'completeProfile'])->name('forms.complete-profile');
	Route::post('/create-post', [PostingController::class, 'writeNewPost'])->name('forms.new-post');
	
	Route::prefix('/filepond-uploads')->group(function () {
		Route::post('/', [FilepondController::class, 'processFilepondUpload'])->name('filepond.process');
		Route::delete('/', [FilepondController::class, 'revertFilepondUpload'])->name('filepond.revert');
	})->name('filepond.root');
});

//Route::get('/example', function () {
//  return Inertia::render('Welcome', [
//    'canLogin' => Route::has('login'),
//    'canRegister' => Route::has('register'),
//    'laravelVersion' => Application::VERSION,
//    'phpVersion' => PHP_VERSION,
//  ]);
//});
