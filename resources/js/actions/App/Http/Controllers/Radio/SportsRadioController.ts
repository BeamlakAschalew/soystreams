import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\SportsRadioController::SportsRadioController
 * @see app/Http/Controllers/Radio/SportsRadioController.php:12
 * @route /radio/sports
 */
const SportsRadioController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: SportsRadioController.url(options),
    method: 'get',
})

SportsRadioController.definition = {
    methods: ['get','post','head'],
    url: '\/radio\/sports',
}

/**
 * @see \App\Http\Controllers\Radio\SportsRadioController::SportsRadioController
 * @see app/Http/Controllers/Radio/SportsRadioController.php:12
 * @route /radio/sports
 */
SportsRadioController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return SportsRadioController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\SportsRadioController::SportsRadioController
 * @see app/Http/Controllers/Radio/SportsRadioController.php:12
 * @route /radio/sports
 */
SportsRadioController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: SportsRadioController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Radio\SportsRadioController::SportsRadioController
 * @see app/Http/Controllers/Radio/SportsRadioController.php:12
 * @route /radio/sports
 */
SportsRadioController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: SportsRadioController.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Radio\SportsRadioController::SportsRadioController
 * @see app/Http/Controllers/Radio/SportsRadioController.php:12
 * @route /radio/sports
 */
SportsRadioController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: SportsRadioController.url(options),
    method: 'head',
})

export default SportsRadioController