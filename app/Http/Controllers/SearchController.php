<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller {
    public function index(Request $request) {
        $browser = new RadioBrowser('https://de2.api.radio-browser.info/');
        $searchStations = ['name' => $request->input('q'), 'limit' => 15, 'order' => 'clickcount', 'reverse' => true, 'hidebroken' => true,];
        $stations = $browser->searchStation($searchStations);
        return Inertia::render('Search', [
            'title' => 'Search',
            'searched_stations' => $stations,
            'filters' => fn() => $request->only('q'),
        ]);
    }
}
