<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use Inertia\Inertia;

class HomeStationsController extends Controller {
    public function index() {
        $browser = new RadioBrowser('https://de2.api.radio-browser.info/');

        $searchTopMusicTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'music', 'tagExact' => true, 'hidebroken' => true];
        $musicStations = $browser->searchStation($searchTopMusicTerms);

        $searchTopNewsTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'news', 'tagExact' => true, 'hidebroken' => true];
        $newsStations = $browser->searchStation($searchTopNewsTerms);

        $searchTopTalkTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'talk', 'tagExact' => true, 'hidebroken' => true];
        $talkStations = $browser->searchStation($searchTopTalkTerms);

        $searchTopSportsTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'sports', 'tagExact' => true, 'hidebroken' => true];
        $sportsStations = $browser->searchStation($searchTopSportsTerms);

        $searchTopStationsTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'hidebroken' => true];
        $stations = $browser->searchStation($searchTopStationsTerms);

        // $searchTerms = ['countrycode' => 'US', 'limit' => 50, 'order' => 'votes', 'language' => 'english', 'languageExact' => true, 'reverse' => true, 'hidebroken' => true,];
        return Inertia::render('Home', [
            'title' => 'Home',
            'home_stations' => [
                [
                    'name' => 'Top Music Stations',
                    'stations' => $musicStations,
                ],
                [
                    'name' => 'Top News Stations',
                    'stations' => $newsStations,
                ],
                [
                    'name' => 'Top Talk Stations',
                    'stations' => $talkStations,
                ],
                [
                    'name' => 'Top Sports Stations',
                    'stations' => $sportsStations,
                ],
                [
                    'name' => 'Top Stations',
                    'stations' => $stations,
                ],
            ],
        ]);
    }
}
