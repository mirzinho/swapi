import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityType } from '../enums/enity-type.enum';
import { environment } from '../../../environments/environment';
import { ActionResponse } from '../interfaces/action-response.interface';

export interface QueryParams {
    [key: string]: string | number | boolean;
}

export const getIdFromUrl = (url: string): string => {
    // This is not the way to go, id property should be in the object, but the API is pretty consistent
    // and doing this seems ok
    const urlDeconstruction = url.split('/');
    return urlDeconstruction[urlDeconstruction.length - 2];
};

export const formatQueryParams = (queryParams: QueryParams | undefined): string => {
    let query = '';
    for (const property in queryParams) {
        if (property == 'id') {
            query += '/' + queryParams[property] + '/';
        } else {
            query += '?' + property + '=' + queryParams[property];
        }
    }
    return query;
};

export const formatEndpointUrl = (
    entityType: EntityType,
    queryParams?: QueryParams
): string => {
    return (
        environment.baseAPIUrl +
        String(EntityType[entityType]).toLocaleLowerCase() +
        formatQueryParams(queryParams)
    );
};

@Injectable()
export class AppHttpClient {
    constructor(private http: HttpClient) {}

    public getPaged = <T>(
        entityTpe: EntityType,
        queryParams?: QueryParams
    ): Observable<ActionResponse<T>> => {
        return this.http.get<ActionResponse<T>>(
            formatEndpointUrl(entityTpe, { ...queryParams })
        );
    };

    public get = <T>(entityTpe: EntityType, queryParams?: QueryParams): Observable<T> => {
        return this.http.get<T>(formatEndpointUrl(entityTpe, { ...queryParams }));
    };
}
