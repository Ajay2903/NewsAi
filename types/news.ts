export interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    source: {
        name: string;
    };
    content: string;
}

export type NewsCategory =
    | 'general'
    | 'technology'
    | 'business'
    | 'sports'
    | 'entertainment';