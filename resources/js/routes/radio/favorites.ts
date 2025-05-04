import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\FavoriteStationsController::favorites
 * @see app/Http/Controllers/Radio/FavoriteStationsController.php:13
 * @route /radio/favorites
 */
export const favorites = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: favorites.url(options),
    method: 'get',
})

favorites.definition = {
    methods: ['get','head'],
    url: '\/radio\/favorites',
}

/**
 * @see \App\Http\Controllers\Radio\FavoriteStationsController::favorites
 * @see app/Http/Controllers/Radio/FavoriteStationsController.php:13
 * @route /radio/favorites
 */
favorites.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return favorites.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\FavoriteStationsController::favorites
 * @see app/Http/Controllers/Radio/FavoriteStationsController.php:13
 * @route /radio/favorites
 */
favorites.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: favorites.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Radio\FavoriteStationsController::favorites
 * @see app/Http/Controllers/Radio/FavoriteStationsController.php:13
 * @route /radio/favorites
 */
favorites.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: favorites.url(options),
    method: 'head',
})

export default favorites