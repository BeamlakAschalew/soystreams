<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use AdinanCenci\RadioBrowser\RadioBrowser;

Route::get('/', function () {
    $browser = new RadioBrowser();
    $searchTerms = ['countrycode' => 'US', 'limit' => 100, 'order' => 'votes', 'language' => 'english', 'languageExact' => false, 'reverse' => true, 'hidebroken' => true,];
    $stations = $browser->searchStation($searchTerms);
    //$searchTerms = ['countrycode' => 'US', 'limit' => 50, 'order' => 'votes', 'language' => 'english', 'languageExact' => true, 'reverse' => true, 'hidebroken' => true,];
    return Inertia::render('Home', [
        'topStations' => $stations
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::fallback(function () {
    return redirect('/');
});
