import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\MusicRadioController::chunk
 * @see app/Http/Controllers/MusicRadioController.php:0
 * @route /radio/music/chunk
 */
export const chunk = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: chunk.url(options),
    method: 'post',
})

chunk.definition = {
    methods: ['post'],
    url: '\/radio\/music\/chunk',
}

/**
 * @see \App\Http\Controllers\MusicRadioController::chunk
 * @see app/Http/Controllers/MusicRadioController.php:0
 * @route /radio/music/chunk
 */
chunk.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return chunk.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MusicRadioController::chunk
 * @see app/Http/Controllers/MusicRadioController.php:0
 * @route /radio/music/chunk
 */
chunk.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: chunk.url(options),
    method: 'post',
})

export default chunk