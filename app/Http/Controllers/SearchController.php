<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller {
    private function getRadioBrowserInstance(): RadioBrowser {
        return new RadioBrowser(RadioBrowserServer::getServerUrl());
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
        $query = $request->input('q');
        $page = $request->input('page', 1);
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $params = $this->getSearchParameters($request);
        $params['limit'] = $limit;
        $params['offset'] = $offset;
        $stations = $query ? $browser->searchStation($params) : [];
        $hasMore = $query && \count($stations) === $limit;

        return Inertia::render('Search', [
            'title' => 'Search',
            'searched_stations' => $stations,
            'query' => ['q' => $query],
            'no_input' => ! $query,
            'meta' => [
                'current_page' => $page,
                'has_more' => $hasMore,
            ],
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the Best Radio Stations and Podcasts',
                'description' => 'Search the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.com/images/logo.png',
                'url' => env('APP_URL').'/search',
            ],
        ]);
    }
}
