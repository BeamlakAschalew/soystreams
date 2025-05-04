<?php

namespace App\Http\Controllers\Radio;

use AdinanCenci\RadioBrowser\RadioBrowser;
use App\Http\Controllers\Controller;
use App\Services\RadioBrowserServer;

class RadioIneractionController extends Controller {
    public function clickStation(string $uuid) {
        $browser = new RadioBrowser(RadioBrowserServer::getServerUrl());

        return $browser->clickStation($uuid);
    }
}
