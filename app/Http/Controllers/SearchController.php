<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller {
    private function getRadioBrowserInstance(): RadioBrowser {
        return new RadioBrowser('https://de2.api.radio-browser.info/');
    }

    private function getSearchParameters(Request $request): array {
        return [
            'name' => $request->input('q'),
            'limit' => 20,
            'order' => 'clickcount',
            'reverse' => true,
            'hidebroken' => true,
        ];
    }

    public function index(Request $request) {
        $browser = $this->getRadioBrowserInstance();
        $searchStations = $this->getSearchParameters($request);
        $query = $request->input('q');
        $stations = $query ? $browser->searchStation($searchStations) : [];

        return Inertia::render('Search', [
            'title' => 'Search',
            'searched_stations' => $stations,
            'query' => fn () => ['q' => $query],
            'no_input' => ! $query,
        ]);
    }
}
