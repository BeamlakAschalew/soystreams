import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\SportsRadioController::sports
 * @see app/Http/Controllers/SportsRadioController.php:11
 * @route /radio/sports
 */
export const sports = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: sports.url(options),
    method: 'get',
})

sports.definition = {
    methods: ['get','post','head'],
    url: '\/radio\/sports',
}

/**
 * @see \App\Http\Controllers\SportsRadioController::sports
 * @see app/Http/Controllers/SportsRadioController.php:11
 * @route /radio/sports
 */
sports.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return sports.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\SportsRadioController::sports
 * @see app/Http/Controllers/SportsRadioController.php:11
 * @route /radio/sports
 */
sports.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: sports.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\SportsRadioController::sports
 * @see app/Http/Controllers/SportsRadioController.php:11
 * @route /radio/sports
 */
sports.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: sports.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\SportsRadioController::sports
 * @see app/Http/Controllers/SportsRadioController.php:11
 * @route /radio/sports
 */
sports.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: sports.url(options),
    method: 'head',
})

export default sports