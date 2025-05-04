import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Radio\RadioIneractionController::click
 * @see app/Http/Controllers/Radio/RadioIneractionController.php:10
 * @route /radio-click/{uuid}
 */
export const click = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: click.url(args, options),
    method: 'get',
})

click.definition = {
    methods: ['get','head'],
    url: '\/radio-click\/{uuid}',
}

/**
 * @see \App\Http\Controllers\Radio\RadioIneractionController::click
 * @see app/Http/Controllers/Radio/RadioIneractionController.php:10
 * @route /radio-click/{uuid}
 */
click.url = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    const parsedArgs = {
        uuid: args.uuid,
    }

    return click.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Radio\RadioIneractionController::click
 * @see app/Http/Controllers/Radio/RadioIneractionController.php:10
 * @route /radio-click/{uuid}
 */
click.get = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: click.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Radio\RadioIneractionController::click
 * @see app/Http/Controllers/Radio/RadioIneractionController.php:10
 * @route /radio-click/{uuid}
 */
click.head = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: click.url(args, options),
    method: 'head',
})

export default click