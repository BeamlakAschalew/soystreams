export default interface PodcastEpisode {
    id: number
    title: string
    link: string
    description: string
    guid: string
    podcastGuid: string
    datePublished: number
    datePublishedPretty: string
    dateCrawled: number
    enclosureUrl: string
    enclosureType: string
    enclosureLength: number
    duration: number
    explicit: number
    episode: number
    episodeType: string
    season: number
    image?: string
    feedItunesId: number
    feedImage: string
    feedId: number
    feedTitle: string
    feedLanguage: string
    chaptersUrl: string | null
}
