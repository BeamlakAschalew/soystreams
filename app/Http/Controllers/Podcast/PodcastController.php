<?php

namespace App\Http\Controllers\Podcast;

use App\Http\Controllers\Controller;
use App\Services\PodcastIndexService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PodcastIndexWrapper\Client;

class PodcastController extends Controller {
    const EPISODES_PER_PAGE = 20;
    const MAX_EPISODES_FETCH = 10000;
    const CACHE_TTL = 3600;

    /**
     * Handle the incoming request.
     */
    public function index(string $id) {
        $client = new Client(PodcastIndexService::config());
        $podcastCacheKey = "podcast_details_{$id}";
        $initialEpisodesCacheKey = "podcast_episodes_{$id}_initial";
        $podcast = $client->podcasts->byFeedId($id)->json()->feed;

        $podcast = Cache::remember($podcastCacheKey, self::CACHE_TTL, function () use ($client, $id) {
            Log::info("Caching podcast details for ID: {$id}");
            try {
                $response = $client->podcasts->byFeedId($id)->json();

                return $response->feed ?? null;
            } catch (\Exception $e) {
                Log::error("API Error fetching podcast details for {$id}: ".$e->getMessage());

                return null;
            }
        });

        if (! $podcast) {
            abort(404, 'Podcast not found.');
        }

        $initialEpisodesResult = Cache::remember($initialEpisodesCacheKey, self::CACHE_TTL, function () use ($client, $id) {
            try {
                return $client->episodes->byFeedId($id, ['max' => self::EPISODES_PER_PAGE])->json();
            } catch (\Exception $e) {
                Log::error("API Error fetching initial episodes for {$id}: ".$e->getMessage());

                return (object) ['items' => [], 'count' => 0];
            }
        });

        $initialEpisodes = $initialEpisodesResult->items ?? [];
        $totalEpisodesAvailable = $podcast->episodeCount ?? ($initialEpisodesResult->count ?? \count($initialEpisodes));

        $pageInfo = [
            'title' => $podcast->title ?? 'Unknown Podcast',
            'description' => $podcast->description ?? 'Listen to this podcast.',
            'image' => $podcast->image ?? $podcast->artwork ?? '',
            'url' => route('podcast.show', $id),
        ];

        return Inertia::render('Podcast/Podcast', [
            'podcast' => $podcast,
            'initialEpisodes' => $initialEpisodes,
            'totalEpisodesHint' => $totalEpisodesAvailable,
            'episodesPerPage' => self::EPISODES_PER_PAGE,
            'pageInfo' => $pageInfo,
        ]);
    }

    public function fetchAllEpisodes(Request $request, string $id) {
        $fullEpisodesCacheKey = "podcast_episodes_{$id}_all";

        $cachedData = Cache::remember($fullEpisodesCacheKey, self::CACHE_TTL, function () use ($id) {
            Log::info("Fetching ALL episodes for podcast {$id} from API (to cache).");
            try {
                $client = new Client(PodcastIndexService::config());
                $allEpisodesResult = $client->episodes->byFeedId($id, ['max' => self::MAX_EPISODES_FETCH])->json();
                $allEpisodes = $allEpisodesResult->items ?? [];
                $totalStored = \count($allEpisodes);

                Log::info("Storing all episodes for podcast {$id} in Cache. Total: {$totalStored}");

                return ['episodes' => $allEpisodes, 'total' => $totalStored];
            } catch (\Exception $e) {
                Log::error("API Error fetching ALL episodes for {$id}: ".$e->getMessage());

                return null;
            }
        });

        if ($cachedData === null) {
            return response()->json(['error' => 'Failed to fetch episodes from source.'], 500);
        }

        return response()->json([
            'episodes' => $cachedData['episodes'] ?? [],
            'totalEpisodes' => $cachedData['total'] ?? 0,
        ]);
    }
}
