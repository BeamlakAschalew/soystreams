import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\RadioIneractionController::clickStation
 * @see app/Http/Controllers/RadioIneractionController.php:9
 * @route /radio-click/{uuid}
 */
export const clickStation = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: clickStation.url(args, options),
    method: 'get',
})

clickStation.definition = {
    methods: ['get','head'],
    url: '\/radio-click\/{uuid}',
}

/**
 * @see \App\Http\Controllers\RadioIneractionController::clickStation
 * @see app/Http/Controllers/RadioIneractionController.php:9
 * @route /radio-click/{uuid}
 */
clickStation.url = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return clickStation.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\RadioIneractionController::clickStation
 * @see app/Http/Controllers/RadioIneractionController.php:9
 * @route /radio-click/{uuid}
 */
clickStation.get = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: clickStation.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\RadioIneractionController::clickStation
 * @see app/Http/Controllers/RadioIneractionController.php:9
 * @route /radio-click/{uuid}
 */
clickStation.head = (args: { uuid: string | number } | [uuid: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: clickStation.url(args, options),
    method: 'head',
})

const RadioIneractionController = { clickStation }

export default RadioIneractionController