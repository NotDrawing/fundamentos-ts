export type GifRating = 'g' | 'pg' | 'pg-13';

export interface Gif {
    id: string;
    title: string;
    description?: string;
    url: string;
    username?: string;
    tags: string[];
    rating: GifRating;
}