import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\MusicRadioController::MusicRadioController
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
const MusicRadioController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: MusicRadioController.url(options),
    method: 'get',
})

MusicRadioController.definition = {
    methods: ['get','post','head'],
    url: '\/radio\/music',
}

/**
 * @see \App\Http\Controllers\MusicRadioController::MusicRadioController
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
MusicRadioController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return MusicRadioController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MusicRadioController::MusicRadioController
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
MusicRadioController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: MusicRadioController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MusicRadioController::MusicRadioController
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
MusicRadioController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: MusicRadioController.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\MusicRadioController::MusicRadioController
 * @see app/Http/Controllers/MusicRadioController.php:10
 * @route /radio/music
 */
MusicRadioController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: MusicRadioController.url(options),
    method: 'head',
})

export default MusicRadioController