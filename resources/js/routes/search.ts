import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\SearchController::search
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
export const search = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ['get','post','head'],
    url: '\/search',
}

/**
 * @see \App\Http\Controllers\SearchController::search
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
search.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return search.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\SearchController::search
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
search.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: search.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\SearchController::search
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
search.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: search.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\SearchController::search
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
search.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: search.url(options),
    method: 'head',
})

export default search