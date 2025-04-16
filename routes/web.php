<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use AdinanCenci\RadioBrowser\RadioBrowser;

Route::get('/', function () {
    $browser = new RadioBrowser('https://de2.api.radio-browser.info/');
    $searchTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 200, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'pop', 'tagExact' => true, 'hidebroken' => true,];
    $stations = $browser->searchStation($searchTerms);
    //$searchTerms = ['countrycode' => 'US', 'limit' => 50, 'order' => 'votes', 'language' => 'english', 'languageExact' => true, 'reverse' => true, 'hidebroken' => true,];
    return Inertia::render('Home', [
        'title' => 'Home',
        'topStations' => $stations
    ]);
});

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
