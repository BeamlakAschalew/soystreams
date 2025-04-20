<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TalkRadioController extends Controller {
    public function __invoke(Request $request) {
        $browser = new RadioBrowser(
            RadioBrowserServer::getServerUrl()
        );
        $genres = [
            'talk',
            'talk & speech',
            'talk radio',
        ];

        $stationResults = [];

        foreach ($genres as $genre) {
            $stationResults[$genre] = [
                'name' => \implode('-', \array_map('ucfirst', \explode('-', $genre))).' radio',
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

        return Inertia::render('CategoryRadio', [
            'title' => 'Talk Radio',
            'stations' => $stationResults,
        ]);
    }
}
