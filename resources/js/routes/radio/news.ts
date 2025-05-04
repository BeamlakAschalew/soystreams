import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::news
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
export const news = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: news.url(options),
    method: 'get',
})

news.definition = {
    methods: ['get','post','head'],
    url: '\/radio\/news',
}

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::news
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
news.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return news.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::news
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
news.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: news.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::news
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
news.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: news.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Radio\NewsStationController::news
 * @see app/Http/Controllers/Radio/NewsStationController.php:12
 * @route /radio/news
 */
news.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: news.url(options),
    method: 'head',
})

export default news