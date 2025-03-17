<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use AdinanCenci\RadioBrowser\RadioBrowser;

Route::get('/', function () {
    $browser = new RadioBrowser();
    $searchTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 200, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'pop', 'tagExact' => true, 'hidebroken' => true,];
    $stations = $browser->searchStation($searchTerms);
    //$searchTerms = ['countrycode' => 'US', 'limit' => 50, 'order' => 'votes', 'language' => 'english', 'languageExact' => true, 'reverse' => true, 'hidebroken' => true,];
    return Inertia::render('Home', [
        'title' => 'Home',
        'topStations' => $stations
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About'
    ]);
});

Route::fallback(function () {
    return redirect('/');
});
