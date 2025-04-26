<?php

namespace App\Http\Controllers;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Services\RadioBrowserServer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StationController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(string $uuid) {
        $browser = new RadioBrowser(
            RadioBrowserServer::getServerUrl()
        );
        $stations = $browser->getStationsByUuid($uuid);

        if (empty($stations)) {
            abort(404);
        }

        return Inertia::render('Station', [
            'station' => $stations[0],
            'pageInfo' => [
                'title' => $stations[0]['name'],
                'description' => 'Tune in to '.$stations[0]['name'].', broadcasting in '.$stations[0]['language'].' from '.$stations[0]['country'].'. Specializing in '.$stations[0]['tags'].', this station has attracted '.$stations[0]['votes'].' votes and '.$stations[0]['clickcount'].' clicks from engaged listeners. ',
                'image' => $stations[0]['favicon'],
                'url' => env('APP_URL').'/station/'.$stations[0]['stationuuid'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
