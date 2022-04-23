import { Character } from '../../interfaces/people.interface';

export interface TableCell<T> {
    property: keyof T;
    header: string;
}
export interface TableConfig<T> {
    columns: Array<TableCell<Character>>;
    data?: Array<T>;
    count?: number;
    currentPage?: number;
}

export interface PageEvent {
    pageIndex: number;
    pageSize: number;
}
