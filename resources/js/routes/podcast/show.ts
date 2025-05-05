import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::show
 * @see app/Http/Controllers/Podcast/PodcastController.php:21
 * @route /podcast/{id}
 */
export const show = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/podcast\/{id}',
}

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::show
 * @see app/Http/Controllers/Podcast/PodcastController.php:21
 * @route /podcast/{id}
 */
show.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::show
 * @see app/Http/Controllers/Podcast/PodcastController.php:21
 * @route /podcast/{id}
 */
show.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::show
 * @see app/Http/Controllers/Podcast/PodcastController.php:21
 * @route /podcast/{id}
 */
show.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show