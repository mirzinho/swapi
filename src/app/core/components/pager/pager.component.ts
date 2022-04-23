import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewRef
} from '@angular/core';
import { PageEvent } from '../table/table.interface';

@Component({
    selector: 'app-table-pager',
    templateUrl: './pager.html',
    styleUrls: ['./pager.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnInit {
    @Input() totalItems: any = 0;
    @Input() currentCount: any = 0;
    @Input() currentPage: any = 1;
    @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter();

    public pageSizes: Array<number> = [10, 25, 50, 100];
    public selectedPageSize = 10;

    public totalPages = 0;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.totalPages = Math.ceil(this.totalItems / this.selectedPageSize);
    }

    previousPage = (): void => {
        const prev = this.currentPage - 1;
        if (prev > 0) {
            this.selectPage(prev);
        }
    };

    nextPage = (): void => {
        const next = this.currentPage + 1;
        if (next <= this.totalPages) {
            this.selectPage(next);
        }
    };

    selectPage = (page: number): void => {
        this.pageChanged.emit({
            pageSize: this.selectedPageSize,
            pageIndex: page
        });
    };

    getPages = (): Array<number> => {
        const pages: Array<number> = [];
        for (let i = 1; i < 3; i++) {
            if (this.currentPage - i > 0) {
                pages.unshift(this.currentPage - i);
            }
        }
        pages.push(this.currentPage);
        for (let i = 1; i < 3; i++) {
            if (this.currentPage + i <= this.totalPages) {
                pages.push(this.currentPage + i);
            }
        }

        return pages;
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
