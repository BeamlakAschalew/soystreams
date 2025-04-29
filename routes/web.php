<?php

use App\Http\Controllers\FavoriteStationsController;
use App\Http\Controllers\HomeStationsController;
use App\Http\Controllers\MusicRadioController;
use App\Http\Controllers\NewsStationController;
use App\Http\Controllers\RadioExploreController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SportsRadioController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\TalkRadioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeStationsController::class, 'index'])->name('home');

Route::match(['get', 'post'], '/search', [SearchController::class, 'index'])->name('search');

Route::match(['get', 'post'], '/radio/music', MusicRadioController::class)->name('radio.music');
Route::match(['get', 'post'], '/radio/news', NewsStationController::class)->name('radio.news');
Route::match(['get', 'post'], '/radio/sports', SportsRadioController::class)->name('radio.sports');
Route::match(['get', 'post'], '/radio/talk', TalkRadioController::class)->name('radio.talk');

Route::get('/radio/explore', RadioExploreController::class)->name('radio.explore');
Route::get('/radio/favorites', FavoriteStationsController::class)->name('radio.favorites');

Route::get('/station/{uuid}', [StationController::class, 'index'])->name('station.show');

Route::get('/podcasts', function () {
    $client = new PodcastIndexWrapper\Client([
        'app' => env('PODCASTINDEX_APP'),
        'key' => env('PODCASTINDEX_KEY'),
        'secret' => env('PODCASTINDEX_SECRET'),
    ]);

    $searchResult = $client->search->byTerm('meri');

    dd($searchResult->json());

    return $searchResult;
});

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About',
    ]);
});

Route::fallback(function () {
    return redirect('/');
});
