import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AppHttpClient } from '../../core/services/http-client.service';
import { EntityType } from '../../core/enums/enity-type.enum';
import { catchError, forkJoin, map, Observable, of, pipe } from 'rxjs';
import { DashboardStats } from './dashboard.model';
import { People } from '../../core/interfaces/people.interface';
import { Films } from '../../core/interfaces/films.interface';

export const countless = {
    count: 0
};

@Injectable()
export class DashboardResolver implements Resolve<DashboardStats> {
    constructor(private http: AppHttpClient) {}

    resolve(): Observable<DashboardStats> {
        return forkJoin([
            this.http.get<People>(EntityType.People).pipe(
                catchError((error) => {
                    // Return default as 0
                    return of(countless);
                })
            ),
            this.http.get<Films>(EntityType.Films).pipe(
                catchError((error) => {
                    // Return default as 0
                    return of(countless);
                })
            )
        ]).pipe(
            map((response) => {
                return {
                    characters: response[0].count,
                    films: response[1].count
                };
            })
        );
    }
}
