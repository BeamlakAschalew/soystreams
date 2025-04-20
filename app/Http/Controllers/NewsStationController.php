<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
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

        return Inertia::render('CategoryRadio', [
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
        ]);
    }
}
