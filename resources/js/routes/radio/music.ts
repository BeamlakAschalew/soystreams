import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\MusicRadioController::music
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
export const music = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: music.url(options),
    method: 'get',
})

music.definition = {
    methods: ['get','head'],
    url: '\/radio\/music',
}

/**
 * @see \App\Http\Controllers\MusicRadioController::music
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
music.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return music.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MusicRadioController::music
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
music.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: music.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MusicRadioController::music
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
music.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: music.url(options),
    method: 'head',
})

export default music