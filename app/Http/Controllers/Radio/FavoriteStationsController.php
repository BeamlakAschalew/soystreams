<?php

namespace App\Http\Controllers\Radio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteStationsController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        return Inertia::render('Radio/FavoriteStations', [
            'title' => 'Favorite Stations',
            'pageInfo' => [
                'title' => 'Soystreams - Listen to the Best Radio Stations and Podcasts',
                'description' => 'Discover the best radio stations and podcasts from around the world. Listen to your favorite genres, including music, news, talk, and sports. Tune in to top stations and enjoy a diverse range of content.',
                'image' => 'https://soystreams.beamlak.dev/images/soy-square-hq.png',
                'url' => env('APP_URL'),
            ],
        ]);
    }
}
