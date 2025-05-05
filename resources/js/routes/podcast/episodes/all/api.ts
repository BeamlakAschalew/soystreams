import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::api
 * @see app/Http/Controllers/Podcast/PodcastController.php:73
 * @route /api/podcasts/{id}/all-episodes
 */
export const api = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: api.url(args, options),
    method: 'get',
})

api.definition = {
    methods: ['get','head'],
    url: '\/api\/podcasts\/{id}\/all-episodes',
}

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::api
 * @see app/Http/Controllers/Podcast/PodcastController.php:73
 * @route /api/podcasts/{id}/all-episodes
 */
api.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return api.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::api
 * @see app/Http/Controllers/Podcast/PodcastController.php:73
 * @route /api/podcasts/{id}/all-episodes
 */
api.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: api.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Podcast\PodcastController::api
 * @see app/Http/Controllers/Podcast/PodcastController.php:73
 * @route /api/podcasts/{id}/all-episodes
 */
api.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: api.url(args, options),
    method: 'head',
})

export default api