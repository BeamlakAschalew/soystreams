<?php

namespace App\Services;

class PodcastIndexService {
    public static function config() {
        return [
            'app' => env('PODCASTINDEX_APP'),
            'key' => env('PODCASTINDEX_KEY'),
            'secret' => env('PODCASTINDEX_SECRET'),
        ];
    }
}
