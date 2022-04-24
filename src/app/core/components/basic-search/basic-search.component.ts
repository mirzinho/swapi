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

@Component({
    selector: 'basic-search',
    styleUrls: ['./basic-search.scss'],
    templateUrl: './basic-search.html'
})
export class BasicSearchComponent implements OnInit, OnDestroy {
    @ViewChild('basicSearch', { static: true }) basicSearch: ElementRef;
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() placeholder: any = '';
    @Input() inputValue: any = '';

    private searchSubscription: Subscription = new Subscription();
    constructor() {}

    ngOnInit(): void {
        const obs = fromEvent(this.basicSearch.nativeElement, 'keyup').pipe(
            map((evt: any) => evt.target.value),
            filter((res) => res.length >= 0),
            debounceTime(500),
            distinctUntilChanged()
        );

        this.searchSubscription = obs.subscribe((text: string) =>
            this.submitSearch(text)
        );
    }

    ngOnDestroy(): void {
        this.searchSubscription.unsubscribe();
    }

    submitSearch = (text: string): void => {
        this.search.emit(text);
    };
}
