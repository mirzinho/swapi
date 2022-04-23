import { Injectable } from '@angular/core';
import { AppHttpClient } from '../../core/services/http-client.service';
import { Character } from '../../core/interfaces/people.interface';
import { ActionResponse } from '../../core/interfaces/action-response.interface';
import { EntityType } from '../../core/enums/enity-type.enum';
import { Observable } from 'rxjs';

@Injectable()
export class CharacterService {
    constructor(private http: AppHttpClient) {}

    getCharacters = (): Observable<ActionResponse<Character>> => {
        return this.http.get<Character>(EntityType.People);
    };

    getCharacter = (): Character => {
        return {} as Character;
    };
}
