
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::index
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
export const index = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/episode\/{episodeId}',
}

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::index
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
index.url = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { episodeId: args }
    }

    if (Array.isArray(args)) {
        args = {
            episodeId: args[0],
        }
    }

    const parsedArgs = {
        episodeId: args.episodeId,
    }

    return index.definition.url
            .replace('{episodeId}', parsedArgs.episodeId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::index
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
index.get = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::index
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
index.head = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

const episode = {
    index,
}

export default episode