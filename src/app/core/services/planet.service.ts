import { Injectable } from '@angular/core';
import { AppHttpClient } from './http-client.service';
import { PageEvent } from '../components/table/table.interface';
import { Observable } from 'rxjs';
import { ActionResponse } from '../interfaces/action-response.interface';
import { Planet } from '../interfaces/planet.interface';
import { EntityType } from '../enums/enity-type.enum';

@Injectable()
export class PlanetService {
    constructor(private http: AppHttpClient) {}

    getPlanets = (page: PageEvent): Observable<ActionResponse<Planet>> => {
        return this.http.getPaged<Planet>(EntityType.Planets, { page: page.pageIndex });
    };

    getPlanet = (id: string): Observable<Planet> => {
        return this.http.get<Planet>(EntityType.Planets, { id: id });
    };
}
