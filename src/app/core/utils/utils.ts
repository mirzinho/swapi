import { Film } from '../interfaces/films.interface';
import { Character } from '../interfaces/people.interface';
import { EntityType } from '../enums/enity-type.enum';

export const toggleFavoriteState = (
    item: Film | Character,
    id: string,
    entityType: EntityType
): boolean => {
    let isFavorite = false;
    const key = String(EntityType[entityType]).toLocaleLowerCase();
    let favorites = localStorage.getItem('starwars.favorites.' + key);

    if (favorites) {
        const favArray: Array<string> = JSON.parse(favorites);
        const isInFavorites = favArray.indexOf(id as string);
        if (isInFavorites < 0) {
            favArray.push(id as string);
            isFavorite = true;
        } else {
            favArray.splice(isInFavorites, 1);
            isFavorite = false;
        }

        localStorage.setItem('starwars.favorites.' + key, JSON.stringify(favArray));
    } else {
        favorites = JSON.stringify([id]);
        localStorage.setItem('starwars.favorites.' + key, favorites);
        isFavorite = true;
    }

    return isFavorite;
};

export const checkFavorite = (
    item: Film | Character,
    id: string,
    entityType: EntityType
): boolean => {
    let isFavorite = false;
    const key = String(EntityType[entityType]).toLocaleLowerCase();

    const favorites = localStorage.getItem('starwars.favorites.' + key);
    if (favorites) {
        const favArray: Array<string> = JSON.parse(favorites);
        const isInFavorites = favArray.indexOf(id);
        if (isInFavorites >= 0) {
            isFavorite = true;
        }
    }
    return isFavorite;
};

export const curry = (targetFn: any, ...existingArgs: any) => {
    return (...args: any): any => {
        const totalArgs = [...args, ...existingArgs];
        if (totalArgs.length >= targetFn.length) {
            return targetFn(...totalArgs);
        }
        return curry(targetFn, ...totalArgs);
    };
};
