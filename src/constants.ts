export interface WalmartItem {
    title: string | undefined,
    price: string | undefined,
    image: string | undefined,
    urlLink: string | undefined
}

export interface RequestBody {
    queryString: string
}