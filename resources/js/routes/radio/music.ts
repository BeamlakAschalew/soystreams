import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\MusicRadioController::music
 * @see app/Http/Controllers/Radio/MusicRadioController.php:11
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
    methods: ['get','post','head'],
    url: '\/radio\/music',
}

/**
 * @see \App\Http\Controllers\Radio\MusicRadioController::music
 * @see app/Http/Controllers/Radio/MusicRadioController.php:11
 * @route /radio/music
 */
music.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return music.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\MusicRadioController::music
 * @see app/Http/Controllers/Radio/MusicRadioController.php:11
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
 * @see \App\Http\Controllers\Radio\MusicRadioController::music
 * @see app/Http/Controllers/Radio/MusicRadioController.php:11
 * @route /radio/music
 */
music.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: music.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Radio\MusicRadioController::music
 * @see app/Http/Controllers/Radio/MusicRadioController.php:11
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