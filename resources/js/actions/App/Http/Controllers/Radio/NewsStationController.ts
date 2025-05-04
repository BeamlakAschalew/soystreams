import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::NewsStationController
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
const NewsStationController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: NewsStationController.url(options),
    method: 'get',
})

NewsStationController.definition = {
    methods: ['get','post','head'],
    url: '\/radio\/news',
}

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::NewsStationController
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
NewsStationController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return NewsStationController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::NewsStationController
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
NewsStationController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: NewsStationController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::NewsStationController
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
NewsStationController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: NewsStationController.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::NewsStationController
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
NewsStationController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: NewsStationController.url(options),
    method: 'head',
})

export default NewsStationController