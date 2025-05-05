<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Podcast\PodcastController;
use App\Http\Controllers\Radio\FavoriteStationsController;
use App\Http\Controllers\Radio\MusicRadioController;
use App\Http\Controllers\Radio\NewsStationController;
use App\Http\Controllers\Radio\RadioExploreController;
use App\Http\Controllers\Radio\RadioIneractionController;
use App\Http\Controllers\Radio\SportsRadioController;
use App\Http\Controllers\Radio\StationController;
use App\Http\Controllers\Radio\TalkRadioController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::match(['get', 'post'], '/search', [SearchController::class, 'index'])->name('search');

// RADIO

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

// PODCASTS

Route::get('/podcasts', function () {
    return Inertia::render('Podcast/Podcasts', [
        'title' => 'Podcasts',
    ]);
})->name('podcasts.index');
Route::get('/podcast/{id}', [PodcastController::class, 'index'])->name('podcast.show');
Route::get('/api/podcasts/{id}/all-episodes', [PodcastController::class, 'fetchAllEpisodes'])->name('podcast.episodes.all.api');

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About',
    ]);
})->name('about');

Route::fallback(function () {
    return redirect('/');
});
