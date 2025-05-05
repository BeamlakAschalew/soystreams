<?php

namespace App\Http\Controllers\Radio;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Http\Controllers\Controller;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsStationController extends Controller {
    public function __invoke(Request $request) {
        $browser = new RadioBrowser(
            RadioBrowserServer::getServerUrl()
        );

        $newsStationResults = $browser->searchStation([
            'language' => 'english',
            'languageExact' => true,
            'limit' => 25,
            'order' => 'clickcount',
            'reverse' => true,
            'tag' => 'news',
            'tagExact' => true,
            'hidebroken' => true,
        ]);

        $newsTalkStationResults = $browser->searchStation([
            'language' => 'english',
            'languageExact' => true,
            'limit' => 25,
            'order' => 'clickcount',
            'reverse' => true,
            'tag' => 'news talk',
            'tagExact' => true,
            'hidebroken' => true,
        ]);

        return Inertia::render('Radio/CategoryRadio', [
            'title' => 'News Radio',
            'stations' => [
                [
                    'name' => 'News Radio',
                    'stations' => $newsStationResults,
                ],
                [
                    'name' => 'News-talk Radio',
                    'stations' => $newsTalkStationResults,
                ],
            ],
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the News Radio Stations and Podcasts',
                'description' => 'Discover the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy.png',
                'url' => env('APP_URL').'/radio/news',
            ],
        ]);
    }
}
