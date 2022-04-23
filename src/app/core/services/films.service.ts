import { Injectable } from '@angular/core';
import { AppHttpClient } from './http-client.service';
import { PageEvent } from '../components/table/table.interface';
import { Observable } from 'rxjs';
import { ActionResponse } from '../interfaces/action-response.interface';
import { EntityType } from '../enums/enity-type.enum';
import { Film } from '../interfaces/films.interface';

@Injectable()
export class FilmsService {
    constructor(private http: AppHttpClient) {}

    getFilms = (page: PageEvent): Observable<ActionResponse<Film>> => {
        return this.http.getPaged<Film>(EntityType.Films, { page: page.pageIndex });
    };

    getFilm = (id: string): Observable<Film> => {
        return this.http.get<Film>(EntityType.Films, { id: id });
    };
}
