<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\LocationService;
use App\Services\PodcastIndexService;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use PodcastIndexWrapper\Client;

class HomeController extends Controller {
    public function index(Request $request) {
        $browser = new RadioBrowser(RadioBrowserServer::getServerUrl());

        $searchTopMusicTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'music', 'tagExact' => true, 'hidebroken' => true];
        $musicStations = Cache::remember('topMusicStations', 7200, function () use ($browser, $searchTopMusicTerms) {
            return $browser->searchStation($searchTopMusicTerms);
        });

        $searchTopNewsTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'news', 'tagExact' => true, 'hidebroken' => true];
        $newsStations = Cache::remember('topNewsStations', 7200, function () use ($browser, $searchTopNewsTerms) {
            return $browser->searchStation($searchTopNewsTerms);
        });

        $searchTopTalkTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'talk', 'tagExact' => true, 'hidebroken' => true];
        $talkStations = Cache::remember('topTalkStations', 7200, function () use ($browser, $searchTopTalkTerms) {
            return $browser->searchStation($searchTopTalkTerms);
        });

        $searchTopSportsTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'tag' => 'sports', 'tagExact' => true, 'hidebroken' => true];
        $sportsStations = Cache::remember('topSportsStations', 7200, function () use ($browser, $searchTopSportsTerms) {
            return $browser->searchStation($searchTopSportsTerms);
        });

        $searchTopStationsTerms = ['language' => 'english', 'languageExact' => true, 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'hidebroken' => true];
        $stations = Cache::remember('topStations', 7200, function () use ($browser, $searchTopStationsTerms) {
            return $browser->searchStation($searchTopStationsTerms);
        });

        $client = new Client(PodcastIndexService::config());
        $trendingPodcasts = Cache::remember('trendingPodcasts', 7200, function () use ($client) {
            return $client->podcasts->trending(['lang' => 'en'])->json();
        });

        $ip = $request->ip() ?? '::1';
        $country = LocationService::getCountry($ip);
        $sessionId = $request->session()->getId();

        $locationStations = Cache::remember("locationStations_{$sessionId}", 1800, function () use ($browser, $country) {
            return $browser->searchStation([
                'limit' => 15,
                'country' => $country,
                'order' => 'votes',
                'reverse' => true,
                'hidebroken' => true,
            ]);
        });

        $locationMusicStations = Cache::remember("locationMusicStations_{$sessionId}", 1800, function () use ($browser, $country) {
            return $browser->searchStation([
                'limit' => 15,
                'country' => $country,
                'order' => 'votes',
                'reverse' => true,
                'tag' => 'music',
                'hidebroken' => true,
            ]);
        });

        // $searchTerms = ['countrycode' => 'US', 'limit' => 50, 'order' => 'votes', 'language' => 'english', 'languageExact' => true, 'reverse' => true, 'hidebroken' => true,];
        return Inertia::render('Home', [
            'title' => 'Home',
            'home_stations' => [
                [
                    'name' => 'Top Music Stations',
                    'stations' => $musicStations,
                    'view_more' => route('radio.music'),
                ],
                [
                    'name' => 'Top News Stations',
                    'stations' => $newsStations,
                    'view_more' => route('radio.news'),
                ],
                [
                    'name' => 'Top Stations in '.$country,
                    'stations' => $locationStations,
                ],
                [
                    'name' => 'Top Music Stations in '.$country,
                    'stations' => $locationMusicStations,
                ],
                [
                    'name' => 'Top Talk Stations',
                    'stations' => $talkStations,
                    'view_more' => route('radio.talk'),
                ],
                [
                    'name' => 'Top Sports Stations',
                    'stations' => $sportsStations,
                    'view_more' => route('radio.sports'),
                ],
                [
                    'name' => 'Top Stations',
                    'stations' => $stations,
                ],

            ],
            'home_podcasts' => [
                [
                    'name' => 'Trending Podcasts',
                    'podcasts' => $trendingPodcasts->feeds,
                    'view_more' => route('podcasts.index'),
                ],
            ],
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the Best Radio Stations and Podcasts',
                'description' => 'Discover the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy.png',
                'url' => env('APP_URL'),
            ],
        ]);
    }
}
