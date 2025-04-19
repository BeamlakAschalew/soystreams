import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\SearchController::index
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','post','head'],
    url: '\/search',
}

/**
 * @see \App\Http\Controllers\SearchController::index
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\SearchController::index
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\SearchController::index
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
index.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: index.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\SearchController::index
 * @see app/Http/Controllers/SearchController.php:24
 * @route /search
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const SearchController = { index }

export default SearchController