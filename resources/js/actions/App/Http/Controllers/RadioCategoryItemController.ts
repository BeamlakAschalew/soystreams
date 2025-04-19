import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\RadioCategoryItemController::RadioCategoryItemController
 * @see app/Http/Controllers/RadioCategoryItemController.php:8
 * @route /radio/{channel}
 */
const RadioCategoryItemController = (args: { channel: string | number } | [channel: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: RadioCategoryItemController.url(args, options),
    method: 'get',
})

RadioCategoryItemController.definition = {
    methods: ['get','head'],
    url: '\/radio\/{channel}',
}

/**
 * @see \App\Http\Controllers\RadioCategoryItemController::RadioCategoryItemController
 * @see app/Http/Controllers/RadioCategoryItemController.php:8
 * @route /radio/{channel}
 */
RadioCategoryItemController.url = (args: { channel: string | number } | [channel: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { channel: args }
    }

    if (Array.isArray(args)) {
        args = {
            channel: args[0],
        }
    }

    const parsedArgs = {
        channel: args.channel,
    }

    return RadioCategoryItemController.definition.url
            .replace('{channel}', parsedArgs.channel.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\RadioCategoryItemController::RadioCategoryItemController
 * @see app/Http/Controllers/RadioCategoryItemController.php:8
 * @route /radio/{channel}
 */
RadioCategoryItemController.get = (args: { channel: string | number } | [channel: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: RadioCategoryItemController.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\RadioCategoryItemController::RadioCategoryItemController
 * @see app/Http/Controllers/RadioCategoryItemController.php:8
 * @route /radio/{channel}
 */
RadioCategoryItemController.head = (args: { channel: string | number } | [channel: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: RadioCategoryItemController.url(args, options),
    method: 'head',
})

export default RadioCategoryItemController