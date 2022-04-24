import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppLoaderService {
    protected _toggleLoader = new Subject<any>();
    public toggleLoader$ = this._toggleLoader.asObservable();

    public toggleLoader = (): void => {
        this._toggleLoader.next(true);
    };
}
