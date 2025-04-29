import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\StationController::index
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
export const index = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/station\/{uuid}',
}

/**
 * @see \App\Http\Controllers\StationController::index
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
index.url = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return index.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\StationController::index
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
index.get = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\StationController::index
 * @see app/Http/Controllers/StationController.php:13
 * @route /station/{uuid}
 */
index.head = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

const StationController = { index }

export default StationController