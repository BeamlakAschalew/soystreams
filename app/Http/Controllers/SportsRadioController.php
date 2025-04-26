<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SportsRadioController extends Controller {
    public function __invoke(Request $request) {
        $browser = new RadioBrowser(
            RadioBrowserServer::getServerUrl()
        );

        $sportsStationResults = $browser->searchStation([
            'language' => 'english',
            'languageExact' => true,
            'limit' => 25,
            'order' => 'clickcount',
            'reverse' => true,
            'tag' => 'sports',
            'tagExact' => true,
            'hidebroken' => true,
        ]);

        $sportStationResults = $browser->searchStation([
            'language' => 'english',
            'languageExact' => true,
            'limit' => 25,
            'order' => 'clickcount',
            'reverse' => true,
            'tag' => 'sport',
            'tagExact' => true,
            'hidebroken' => true,
        ]);

        return Inertia::render('CategoryRadio', [
            'title' => 'Sports Radio',
            'stations' => [
                [
                    'name' => 'Sports Radio',
                    'stations' => \array_merge($sportsStationResults, $sportStationResults),
                ],
            ],
            'pageInfo' => [

                'title' => 'Soystreams - Listen to the Sports Radio Stations and Podcasts',
                'description' => 'Discover the best sports radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy-square-hq.png',
                'url' => env('APP_URL').'/radio/sports',
            ],
        ]);
    }
}
