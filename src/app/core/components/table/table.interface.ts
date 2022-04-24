import { Character } from '../../interfaces/people.interface';

export interface TableCell<T> {
    property: keyof T;
    header: string;
    sortable?: boolean;
    sorting?: 'asc' | 'desc';
}
export interface TableConfig<T> {
    columns: Array<TableCell<T>>;
    data?: Array<T>;
    count?: number;
    currentPage?: number;
    rowLink?: boolean;
}

export interface PageEvent {
    pageIndex: number;
    pageSize: number;
    search?: string | null;
}
