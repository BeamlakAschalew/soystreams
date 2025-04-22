<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RadioExploreController extends Controller {
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request) {
        return Inertia::render('Explore', [
            'title' => 'Explore',
            'stations' => [],
            'query' => ['q' => $request->input('q')],
            'no_input' => ! $request->input('q'),
        ]);
    }
}
