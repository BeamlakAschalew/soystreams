import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\RadioExploreController::RadioExploreController
 * @see app/Http/Controllers/Radio/RadioExploreController.php:16
 * @route /radio/explore
 */
const RadioExploreController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: RadioExploreController.url(options),
    method: 'get',
})

RadioExploreController.definition = {
    methods: ['get','head'],
    url: '\/radio\/explore',
}

/**
 * @see \App\Http\Controllers\Radio\RadioExploreController::RadioExploreController
 * @see app/Http/Controllers/Radio/RadioExploreController.php:16
 * @route /radio/explore
 */
RadioExploreController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return RadioExploreController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\RadioExploreController::RadioExploreController
 * @see app/Http/Controllers/Radio/RadioExploreController.php:16
 * @route /radio/explore
 */
RadioExploreController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: RadioExploreController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Radio\RadioExploreController::RadioExploreController
 * @see app/Http/Controllers/Radio/RadioExploreController.php:16
 * @route /radio/explore
 */
RadioExploreController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: RadioExploreController.url(options),
    method: 'head',
})

export default RadioExploreController