import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::EpisodeController
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
const EpisodeController = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EpisodeController.url(args, options),
    method: 'get',
})

EpisodeController.definition = {
    methods: ['get','head'],
    url: '\/episode\/{episodeId}',
}

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::EpisodeController
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
EpisodeController.url = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return EpisodeController.definition.url
            .replace('{episodeId}', parsedArgs.episodeId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::EpisodeController
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
EpisodeController.get = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EpisodeController.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Podcast\EpisodeController::EpisodeController
 * @see app/Http/Controllers/Podcast/EpisodeController.php:12
 * @route /episode/{episodeId}
 */
EpisodeController.head = (args: { episodeId: string | number } | [episodeId: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: EpisodeController.url(args, options),
    method: 'head',
})

export default EpisodeController