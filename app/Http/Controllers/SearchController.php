<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\PodcastIndexService;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PodcastIndexWrapper\Client;

class SearchController extends Controller {
    private function getRadioBrowserInstance(): RadioBrowser {
        return new RadioBrowser(RadioBrowserServer::getServerUrl());
    }

    private function getPodcastIndexInstance() {
        return new Client(PodcastIndexService::config());
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
        $podcastBrowser = $this->getPodcastIndexInstance();
        $query = $request->input('q') ?? '';
        $page = $request->input('page', 1);
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $params = $this->getSearchParameters($request);
        $params['limit'] = $limit;
        $params['offset'] = $offset;
        $stations = $query ? $browser->searchStation($params) : [];
        $hasMore = $query && \count($stations) === $limit;

        $podcasts = $query ? $podcastBrowser->search->byTerm($query, 1, 40)->json() : [];

        return Inertia::render('Search', [
            'title' => 'Search',
            'searched_stations' => $stations,
            'searched_podcasts' => $podcasts->feeds ?? [],
            'query' => ['q' => $query],
            'no_input' => ! $query,
            'meta' => [
                'current_page' => $page,
                'has_more' => $hasMore,
            ],
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the Best Radio Stations and Podcasts',
                'description' => 'Search the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy.png',
                'url' => env('APP_URL').'/search',
            ],
        ]);
    }
}
