<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Http\Controllers\HomeStationsController;

Route::get('/', [HomeStationsController::class, 'index'])->name('home');

Route::get('/podcasts', function () {
    $client = new PodcastIndexWrapper\Client([
        'app' => 'AppName',
        'key' => 'RU3VQSRAMPQ6VAGUGEJK',
        'secret' => 'xPahv6ZrqrNVEGFRmH8wq#PqhWM3nRCqgEZ8f5Jh'
    ]);

    $searchResult = $client->search->byTerm('meri');

    dd($searchResult->json());
    return $searchResult;
});

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About'
    ]);
});

Route::fallback(function () {
    return redirect('/');
});
