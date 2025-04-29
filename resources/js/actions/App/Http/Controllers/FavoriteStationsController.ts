import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\FavoriteStationsController::FavoriteStationsController
 * @see app/Http/Controllers/FavoriteStationsController.php:12
 * @route /radio/favorites
 */
const FavoriteStationsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FavoriteStationsController.url(options),
    method: 'get',
})

FavoriteStationsController.definition = {
    methods: ['get','head'],
    url: '\/radio\/favorites',
}

/**
 * @see \App\Http\Controllers\FavoriteStationsController::FavoriteStationsController
 * @see app/Http/Controllers/FavoriteStationsController.php:12
 * @route /radio/favorites
 */
FavoriteStationsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return FavoriteStationsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FavoriteStationsController::FavoriteStationsController
 * @see app/Http/Controllers/FavoriteStationsController.php:12
 * @route /radio/favorites
 */
FavoriteStationsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FavoriteStationsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FavoriteStationsController::FavoriteStationsController
 * @see app/Http/Controllers/FavoriteStationsController.php:12
 * @route /radio/favorites
 */
FavoriteStationsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: FavoriteStationsController.url(options),
    method: 'head',
})

export default FavoriteStationsController