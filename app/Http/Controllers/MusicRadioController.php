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
        $genres[] = [
            'pop',
            'rock',
            'jazz',
            'classical',
            'hip-hop',
            'country',
            'reggae',
        ];

        $stationResults = [];

        foreach ($genres as $key => $value) {
            $stationResults[$key] = $browser->searchStation([
                'language' => 'english',
                'languageExact' => true,
                'limit' => 15,
                'order' => 'clickcount',
                'reverse' => true,
                'tag' => $value,
                'tagExact' => true,
                'hidebroken' => true,
            ]);
        }

        return Inertia::render('CategoryRadio', [
            'title' => 'Music Radio',
            'stations' => $stationResults,
        ]);
    }
}
