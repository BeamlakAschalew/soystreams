<?php

namespace App\Http\Controllers\Radio;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Http\Controllers\Controller;
use App\Services\RadioBrowserServer;
use App\Services\RadioBrowserStatics;
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

        $countries = RadioBrowserStatics::getCountries();
        $languages = RadioBrowserStatics::getLanguages();
        $tags = RadioBrowserStatics::getTags();

        return Inertia::render('Radio/Explore', [
            'title' => 'Explore',
            'stations' => $exploredStations,
            'no_input' => $request->toArray() == [],
            'meta' => [
                'current_page' => $page,
                'has_more' => $hasMore,
                'filters' => $request->all(),
                'countries' => $countries,
                'languages' => $languages,
                'tags' => $tags,
            ],
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the Best Radio Stations and Podcasts',
                'description' => 'Discover the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy.png',
                'url' => env('APP_URL').'/radio/explore',
            ],
        ]);
    }
}
