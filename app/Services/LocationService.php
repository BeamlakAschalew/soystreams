<?php

namespace App\Services;

use Stevebauman\Location\Facades\Location;

class LocationService {
    public static function getCountry(string $ip): string {
        $location = Location::get($ip);

        return $location->countryName ?? '';
    }
}
