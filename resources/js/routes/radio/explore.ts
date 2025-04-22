import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\RadioExploreController::explore
 * @see app/Http/Controllers/RadioExploreController.php:12
 * @route /radio/explore
 */
export const explore = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: explore.url(options),
    method: 'get',
})

explore.definition = {
    methods: ['get','head'],
    url: '\/radio\/explore',
}

/**
 * @see \App\Http\Controllers\RadioExploreController::explore
 * @see app/Http/Controllers/RadioExploreController.php:12
 * @route /radio/explore
 */
explore.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return explore.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\RadioExploreController::explore
 * @see app/Http/Controllers/RadioExploreController.php:12
 * @route /radio/explore
 */
explore.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: explore.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\RadioExploreController::explore
 * @see app/Http/Controllers/RadioExploreController.php:12
 * @route /radio/explore
 */
explore.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: explore.url(options),
    method: 'head',
})

export default explore