import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { BasicSearchService } from './basic-search.service';

@Component({
    selector: 'basic-search',
    styleUrls: ['./basic-search.scss'],
    templateUrl: './basic-search.html'
})
export class BasicSearchComponent implements OnInit, OnDestroy {
    @ViewChild('basicSearch', { static: true }) basicSearch: ElementRef;
    @Output() search: EventEmitter<string> = new EventEmitter();

    public subscriptions: Subscription = new Subscription();

    public searchQuery: string | null | undefined;
    constructor(private service: BasicSearchService) {}

    ngOnInit(): void {
        const obs = fromEvent(this.basicSearch.nativeElement, 'keyup').pipe(
            map((evt: any) => evt.target.value),
            filter((res) => res.length >= 0),
            debounceTime(500),
            distinctUntilChanged()
        );

        this.subscriptions.add(obs.subscribe((text: string) => this.submitSearch(text)));

        this.subscriptions.add(
            this.service.setSearchQuery$.subscribe((query: string | null | undefined) => {
                this.searchQuery = query;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    submitSearch = (text: string): void => {
        this.search.emit(text);
    };
}
