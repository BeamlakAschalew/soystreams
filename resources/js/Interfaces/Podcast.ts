export default interface Podcast {
    id: number
    podcastGuid: string
    title: string
    url: string
    originalUrl: string
    link: string
    description: string
    author: string
    ownerName: string
    image: string
    artwork: string
    lastUpdateTime: number
    lastCrawlTime: number
    lastParseTime: number
    lastGoodHttpStatusTime: number
    lastHttpStatus: number
    contentType: string
    itunesId: number | null
    generator: string
    language: string
    explicit: boolean
    type: number
    medium: string
    dead: number
    episodeCount: number
    crawlErrors: number
    parseErrors: number
    categories: Array<any>
    locked: number
    imageUrlHash: number
    newestItemPubDate: number
}
