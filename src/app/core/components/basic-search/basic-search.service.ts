import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BasicSearchService {
    protected _setSearchQuery = new Subject<string | null | undefined>();
    public setSearchQuery$ = this._setSearchQuery.asObservable();

    public setSearchQuery = (query: string | null | undefined): void => {
        this._setSearchQuery.next(query);
    };
}
