<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class RadioBrowserServer {
    public static function getServerUrl() {
        return Cache::remember('radio_browser_server_url', 3600, function () {
            $ips = \gethostbynamel('all.api.radio-browser.info');
            if ($ips && \count($ips) > 0) {
                $hostname = \gethostbyaddr($ips[0]);

                return 'https://'.$hostname.'/';
            }

            // Fallback
            return 'https://de2.api.radio-browser.info/';
        });
    }
}
