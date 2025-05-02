<?php

use App\Http\Controllers\FavoriteStationsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MusicRadioController;
use App\Http\Controllers\NewsStationController;
use App\Http\Controllers\RadioExploreController;
use App\Http\Controllers\RadioIneractionController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SportsRadioController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\TalkRadioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::match(['get', 'post'], '/search', [SearchController::class, 'index'])->name('search');

Route::match(['get', 'post'], '/radio/music', MusicRadioController::class)->name('radio.music');
Route::match(['get', 'post'], '/radio/news', NewsStationController::class)->name('radio.news');
Route::match(['get', 'post'], '/radio/sports', SportsRadioController::class)->name('radio.sports');
Route::match(['get', 'post'], '/radio/talk', TalkRadioController::class)->name('radio.talk');

Route::get('/radio/explore', RadioExploreController::class)->name('radio.explore');
Route::get('/radio/favorites', FavoriteStationsController::class)->name('radio.favorites');

Route::get('/station/{uuid}', [StationController::class, 'index'])->name('station.show');

Route::get('/radio-click/{uuid}', [RadioIneractionController::class, 'clickStation'])
    ->name('radio.click')
    ->middleware('throttle:40,1');

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About',
    ]);
})->name('about');

Route::fallback(function () {
    return redirect('/');
});
