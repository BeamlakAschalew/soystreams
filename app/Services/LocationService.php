<?php

namespace App\Services;

class LocationService {
    public static function getLocation(string $ip): array {
        // Simulate a location lookup
        return [
            'country' => 'US',
            'city' => 'New York',
            'latitude' => 40.7128,
            'longitude' => -74.0060,
        ];
    }

    public static function getCountry(string $ip): string {
        $location = self::getLocation($ip);

        return $location['country'];
    }
}
