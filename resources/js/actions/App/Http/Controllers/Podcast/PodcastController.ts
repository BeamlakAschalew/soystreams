import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::index
 * @see app/Http/Controllers/Podcast/PodcastController.php:15
 * @route /podcast/{id}
 */
export const index = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/podcast\/{id}',
}

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::index
 * @see app/Http/Controllers/Podcast/PodcastController.php:15
 * @route /podcast/{id}
 */
index.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return index.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::index
 * @see app/Http/Controllers/Podcast/PodcastController.php:15
 * @route /podcast/{id}
 */
index.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::index
 * @see app/Http/Controllers/Podcast/PodcastController.php:15
 * @route /podcast/{id}
 */
index.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

const PodcastController = { index }

export default PodcastController