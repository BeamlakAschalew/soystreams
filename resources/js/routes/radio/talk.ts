import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\MusicRadioController::talk
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/talk
 */
export const talk = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: talk.url(options),
    method: 'get',
})

talk.definition = {
    methods: ['get','head'],
    url: '\/radio\/talk',
}

/**
 * @see \App\Http\Controllers\MusicRadioController::talk
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/talk
 */
talk.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return talk.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MusicRadioController::talk
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/talk
 */
talk.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: talk.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MusicRadioController::talk
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/talk
 */
talk.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: talk.url(options),
    method: 'head',
})

export default talk