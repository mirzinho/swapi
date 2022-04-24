import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';
import { PageEvent, TableConfig } from '../../../core/components/table/table.interface';
import { Subscription } from 'rxjs';
import { getIdFromUrl } from '../../../core/services/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from '../../../core/services/films.service';
import { ActionResponse } from '../../../core/interfaces/action-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Film } from '../../../core/interfaces/films.interface';

@Component({
    selector: 'film-list',
    templateUrl: './film-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmsService]
})
export class FilmListComponent {
    public tableConfig: TableConfig<Film>;
    private subscription: Subscription = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private service: FilmsService
    ) {}

    ngOnInit(): void {
        this.tableConfig = {
            columns: [
                { property: 'title', header: 'Title', sortable: true },
                { property: 'director', header: 'Director', sortable: true },
                { property: 'release_date', header: 'Release date' }
            ],
            rowLink: true
        };
        this.getFilms();
    }

    getFilms = (pageIndex = 1, pageSize = 10, search: string | null = null): void => {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.service
            .getFilms({ pageIndex: pageIndex, pageSize: pageSize, search: search })
            .subscribe({
                next: (response: ActionResponse<Film>) => {
                    this.setTable(response, pageIndex);
                    this.detectChanges();
                },
                error: (error: HttpErrorResponse) => {}
            });
    };

    setTable = (data: ActionResponse<Film>, page: number): void => {
        this.tableConfig = {
            ...this.tableConfig,
            data: data.results,
            currentPage: page,
            count: data.count
        };
    };

    pageChanged = (event: PageEvent): void => {
        this.getFilms(event.pageIndex, event.pageSize);
    };

    rowClicked = (row: Film): void => {
        this.router.navigate(['../details/' + getIdFromUrl(row.url)], {
            relativeTo: this.route
        });
    };

    search = (query: string): void => {
        this.getFilms(1, 10, query);
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
