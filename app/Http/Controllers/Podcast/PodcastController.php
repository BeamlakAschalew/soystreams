<?php

namespace App\Http\Controllers\Podcast;

use App\Http\Controllers\Controller;
use App\Services\PodcastIndexService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PodcastIndexWrapper\Client;

class PodcastController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function index(string $id) {
        $client = new Client(PodcastIndexService::config());
        $podcast = $client->podcasts->byFeedId($id)->json()->feed;

        if (! $podcast) {
            abort(404);
        }

        return Inertia::render('Podcast/Podcast', [
            'podcast' => $podcast ?? null,
            'pageInfo' => [
                'title' => $podcast->name ?? 'Unknown Station',
                'description' => 'Tune in to '.($podcast->name ?? 'this station')
                    .', broadcasting in '.($podcast->language ?? 'unknown language')
                    .' from '.($podcast->country ?? 'unknown location')
                    .'. Specializing in '.($podcast->tags ?? 'various genres')
                    .', this station has attracted '.($podcast->votes ?? 0)
                    .' votes and '.($podcast->clickcount ?? 0)
                    .' clicks from engaged listeners.',
                'image' => $stations[0]['favicon'] ?? '',
                'url' => env('APP_URL').'/station/'.($stations[0]['stationuuid'] ?? ''),
            ],
        ]);
    }
}
