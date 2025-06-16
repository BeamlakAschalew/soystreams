import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Podcast\FavoritePodcastsController::FavoritePodcastsController
 * @see app/Http/Controllers/Podcast/FavoritePodcastsController.php:13
 * @route /podcast/favorites
 */
const FavoritePodcastsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FavoritePodcastsController.url(options),
    method: 'get',
})

FavoritePodcastsController.definition = {
    methods: ['get','head'],
    url: '\/podcast\/favorites',
}

/**
 * @see \App\Http\Controllers\Podcast\FavoritePodcastsController::FavoritePodcastsController
 * @see app/Http/Controllers/Podcast/FavoritePodcastsController.php:13
 * @route /podcast/favorites
 */
FavoritePodcastsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return FavoritePodcastsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Podcast\FavoritePodcastsController::FavoritePodcastsController
 * @see app/Http/Controllers/Podcast/FavoritePodcastsController.php:13
 * @route /podcast/favorites
 */
FavoritePodcastsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FavoritePodcastsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Podcast\FavoritePodcastsController::FavoritePodcastsController
 * @see app/Http/Controllers/Podcast/FavoritePodcastsController.php:13
 * @route /podcast/favorites
 */
FavoritePodcastsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: FavoritePodcastsController.url(options),
    method: 'head',
})

export default FavoritePodcastsController