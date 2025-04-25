<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RadioExploreController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        $page = $request->input('page', 1);
        $limit = 50;
        $offset = ($page - 1) * $limit;

        $browser = new RadioBrowser(RadioBrowserServer::getServerUrl());
        $params['limit'] = $limit;
        $params['offset'] = $offset;
        $exploredStations = $browser->searchStation([
            'limit' => 50,
            'order' => 'clickcount',
            'reverse' => true,
            'hidebroken' => true,
            ...$request->all(),
            ...$params,
        ]);

        $hasMore = $request->toArray() !== [] && \count($exploredStations) === $limit;

        return Inertia::render('Explore', [
            'title' => 'Explore',
            'stations' => $exploredStations,
            'no_input' => $request->toArray() == [],
            'meta' => [
                'current_page' => $page,
                'has_more' => $hasMore,
                'filters' => $request->all(),
            ],
        ]);
    }
}
