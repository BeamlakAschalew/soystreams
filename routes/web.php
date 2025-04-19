<?php

use App\Http\Controllers\HomeStationsController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeStationsController::class, 'index'])->name('home');

Route::match(['get', 'post'], '/search', [SearchController::class, 'index'])->name('search');

Route::get('/podcasts', function () {
    $client = new PodcastIndexWrapper\Client([
        'app' => 'AppName',
        'key' => 'RU3VQSRAMPQ6VAGUGEJK',
        'secret' => 'xPahv6ZrqrNVEGFRmH8wq#PqhWM3nRCqgEZ8f5Jh',
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
