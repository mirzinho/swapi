import { Film } from '../interfaces/films.interface';
import { Character } from '../interfaces/people.interface';
import { EntityType } from '../enums/enity-type.enum';
import { PageEvent, TableCell } from '../components/table/table.interface';

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

export const getListParameters = (entityType: EntityType): PageEvent => {
    const key = String(EntityType[entityType]).toLocaleLowerCase();

    let pageEvent: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        search: null
    };
    const settings = localStorage.getItem('starwars.lists.' + key);
    if (settings) {
        pageEvent = { ...pageEvent, ...JSON.parse(settings) };
    }

    return pageEvent;
};

export const setListParameters = (entityType: EntityType, settings?: PageEvent): void => {
    if (!settings) {
        settings = {
            pageIndex: 1,
            pageSize: 10,
            search: null
        };
    }
    const key = String(EntityType[entityType]).toLocaleLowerCase();
    localStorage.setItem('starwars.lists.' + key, JSON.stringify(settings));
};

export const setTableCellSettings = <T>(
    cell: TableCell<T>,
    entityType: EntityType
): void => {
    const key = String(EntityType[entityType]).toLocaleLowerCase();
    localStorage.setItem('starwars.cell.' + key, JSON.stringify(cell));
};

export const getTableCellSettings = <T>(entityType: EntityType): TableCell<T> | null => {
    let tableCell = null;
    const key = String(EntityType[entityType]).toLocaleLowerCase();
    const cell = localStorage.getItem('starwars.cell.' + key);
    if (cell) {
        tableCell = { ...JSON.parse(cell) };
    }
    return tableCell;
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
