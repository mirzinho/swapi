import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityType } from '../enums/enity-type.enum';
import { environment } from '../../../environments/environment';
import { ActionResponse } from '../interfaces/action-response.interface';

export interface QueryParams {
    [key: string]: string | number | boolean;
}

export const formatEndpointUrl = (
    entityType: EntityType,
    queryParams?: QueryParams
): string => {
    return environment.baseAPIUrl + String(EntityType[entityType]).toLocaleLowerCase();
};

@Injectable()
export class AppHttpClient {
    constructor(private http: HttpClient) {}

    public get = <T>(
        entityTpe: EntityType,
        queryParams?: QueryParams
    ): Observable<ActionResponse<T>> => {
        return this.http.get<any>(formatEndpointUrl(entityTpe, { ...queryParams }));
    };
}
