import { BaseData } from './base-data.interface';

export interface People extends BaseData {
    birth_year: string;
    eye_color: string;
    films: Array<string>;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: Array<string>;
    url: string;
    vehicles: Array<string>;
}

export interface Character extends People {
    isFavorite: boolean;
}
