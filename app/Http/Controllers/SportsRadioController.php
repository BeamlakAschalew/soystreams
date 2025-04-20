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
        ]);
    }
}
