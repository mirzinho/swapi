import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../core/services/http-client.service';
import { Character } from '../../core/interfaces/people.interface';
import { ActionResponse } from '../../core/interfaces/action-response.interface';
import { EntityType } from '../../core/enums/enity-type.enum';
import { Observable } from 'rxjs';
import { PageEvent } from '../../core/components/table/table.interface';

@Injectable()
export class CharacterService {
    constructor(private http: AppHttpClient) {}

    getCharacters = (page: PageEvent): Observable<ActionResponse<Character>> => {
        return this.http.getPaged<Character>(EntityType.People, { page: page.pageIndex });
    };

    getCharacter = (id: string): Observable<Character> => {
        return this.http.get<Character>(EntityType.People, { id: id });
    };
}
