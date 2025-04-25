<?php

namespace App\Services;

use AdinanCenci\RadioBrowser\RadioBrowser;
use Illuminate\Support\Facades\Cache;

class RadioBrowserStatics {
    public static function getCountries() {
        return Cache::remember('radio_browser_countries', 3600, function () {
            $browser = new RadioBrowser(
                RadioBrowserServer::getServerUrl()
            );

            return $browser->getCountries() ?: [];
        });
    }

    public static function getLanguages() {
        return Cache::remember('radio_browser_languages', 3600, function () {
            $browser = new RadioBrowser(
                RadioBrowserServer::getServerUrl()
            );

            return $browser->getLanguages('', 'stationcount', true, true) ?: [];
        });
    }

    public static function getTags() {
        return Cache::remember('radio_browser_tags', 3600, function () {
            $browser = RadioBrowserServer::getServerUrl();

            $client = new \GuzzleHttp\Client;
            $response = $client->get($browser.'json/tags', [
                'query' => [
                    'order' => 'stationcount',
                    'reverse' => 'true',
                    'hidebroken' => 'false',
                    'limit' => 150,
                ],
            ]);

            return \json_decode($response->getBody()->getContents(), true) ?: [];
        });
    }
}
