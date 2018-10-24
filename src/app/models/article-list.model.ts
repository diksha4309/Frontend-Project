export interface ArticleList {
    type: String;

    filters: {
        tag?: string,
        author?: string,
        favorited?: string,
        limit?: number,
        offset?: number
    };
}