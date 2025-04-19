<?php

use App\Http\Controllers\HomeStationsController;
use App\Http\Controllers\RadioCategoryItemController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeStationsController::class, 'index'])->name('home');

Route::match(['get', 'post'], '/search', [SearchController::class, 'index'])->name('search');

Route::get('/radio/{channel}', RadioCategoryItemController::class)->where('channel', 'music|news|talk');

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
