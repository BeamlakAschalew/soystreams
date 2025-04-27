<?php

namespace App\Services;

use Stevebauman\Location\Facades\Location;

class LocationService {
    public static function getCountry(): string {
        $location = Location::get();

        return $location->countryName ?? '';
    }
}
