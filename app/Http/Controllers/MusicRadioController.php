<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\RadioBrowserServer;
use Inertia\Inertia;

class MusicRadioController extends Controller {
    public function __invoke() {
        $browser = new RadioBrowser(
            RadioBrowserServer::getServerUrl()
        );
        $genres = [
            'pop',
            'rock',
            'jazz',
            'classical',
            'hip-hop',
            'country',
            'reggae',
        ];

        $stationResults = [];

        foreach ($genres as $genre) {
            $stationResults[$genre] = [
                'name' => \implode('-', \array_map('ucfirst', \explode('-', $genre))).' music',
                'stations' => $browser->searchStation([
                    'language' => 'english',
                    'languageExact' => true,
                    'limit' => 15,
                    'order' => 'clickcount',
                    'reverse' => true,
                    'tag' => $genre,
                    'tagExact' => true,
                    'hidebroken' => true,
                ]),
            ];
        }

        return Inertia::render('Radio/CategoryRadio', [
            'title' => 'Music Radio',
            'stations' => $stationResults,
            'pageInfo' => [
                'title' => 'Soystreams Music - Listen to the Best Music Radio Stations',
                'description' => 'Discover the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy-square-hq.png',
                'url' => env('APP_URL').'/radio/music',
            ],
        ]);
    }
}
