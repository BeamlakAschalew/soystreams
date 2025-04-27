<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\LocationService;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeStationsController extends Controller {
    public function index(Request $request) {
        $browser = new RadioBrowser(RadioBrowserServer::getServerUrl());

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

        $ip = $request->ip() ?? '::1';
        $country = LocationService::getCountry($ip);
        $locationStations = $browser->searchStation(['limit' => 15, 'country' => $country, 'order' => 'votes', 'reverse' => true, 'hidebroken' => true]);

        // $searchTerms = ['countrycode' => 'US', 'limit' => 50, 'order' => 'votes', 'language' => 'english', 'languageExact' => true, 'reverse' => true, 'hidebroken' => true,];
        return Inertia::render('Home', [
            'title' => 'Home',
            'home_stations' => [
                [
                    'name' => 'Top Music Stations',
                    'stations' => $musicStations,
                    'view_more' => '/radio/music',
                ],
                [
                    'name' => 'Top News Stations',
                    'stations' => $newsStations,
                    'view_more' => '/radio/news',
                ],
                [
                    'name' => 'Top Talk Stations',
                    'stations' => $talkStations,
                    'view_more' => '/radio/talk',
                ],
                [
                    'name' => 'Top Sports Stations',
                    'stations' => $sportsStations,
                    'view_more' => '/radio/sports',
                ],
                [
                    'name' => 'Top Stations',
                    'stations' => $stations,
                ],
                [
                    'name' => 'Top Stations in '.$country,
                    'stations' => $locationStations,
                    'view_more' => '/radio/country/'.$country,
                ],
            ],
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the Best Radio Stations and Podcasts',
                'description' => 'Discover the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy-square-hq.png',
                'url' => env('APP_URL'),
            ],
        ]);
    }
}
