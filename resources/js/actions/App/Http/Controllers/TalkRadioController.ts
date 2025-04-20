import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\TalkRadioController::TalkRadioController
 * @see app/Http/Controllers/TalkRadioController.php:11
 * @route /radio/talk
 */
const TalkRadioController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: TalkRadioController.url(options),
    method: 'get',
})

TalkRadioController.definition = {
    methods: ['get','post','head'],
    url: '\/radio\/talk',
}

/**
 * @see \App\Http\Controllers\TalkRadioController::TalkRadioController
 * @see app/Http/Controllers/TalkRadioController.php:11
 * @route /radio/talk
 */
TalkRadioController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return TalkRadioController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TalkRadioController::TalkRadioController
 * @see app/Http/Controllers/TalkRadioController.php:11
 * @route /radio/talk
 */
TalkRadioController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: TalkRadioController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TalkRadioController::TalkRadioController
 * @see app/Http/Controllers/TalkRadioController.php:11
 * @route /radio/talk
 */
TalkRadioController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: TalkRadioController.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\TalkRadioController::TalkRadioController
 * @see app/Http/Controllers/TalkRadioController.php:11
 * @route /radio/talk
 */
TalkRadioController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: TalkRadioController.url(options),
    method: 'head',
})

export default TalkRadioController