import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\StationController::show
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
export const show = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/station\/{uuid}',
}

/**
 * @see \App\Http\Controllers\StationController::show
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
show.url = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\StationController::show
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
show.get = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\StationController::show
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
show.head = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show