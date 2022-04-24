import { BaseData } from './base-data.interface';

export interface Film extends BaseData {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: Array<string>;
    planets: Array<string>;
    vehicles: Array<string>;
    species: Array<string>;
    url: string;
    isFavorite?: boolean;
}
