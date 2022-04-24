import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewRef
} from '@angular/core';
import { CharacterService } from '../character.service';
import { ActionResponse } from '../../../core/interfaces/action-response.interface';
import { Character } from '../../../core/interfaces/people.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent, TableConfig } from '../../../core/components/table/table.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { getIdFromUrl } from '../../../core/services/http-client.service';
import { AppLoaderService } from '../../../core/components/app-loader/app-loader.service';

@Component({
    selector: 'character-list',
    templateUrl: './character-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CharacterService]
})
export class CharacterListComponent implements OnInit, OnDestroy {
    public tableConfig: TableConfig<Character>;
    private subscription: Subscription = new Subscription();
    constructor(
        private cdr: ChangeDetectorRef,
        private service: CharacterService,
        private router: Router,
        private route: ActivatedRoute,
        private appLoader: AppLoaderService
    ) {}

    ngOnInit(): void {
        this.tableConfig = {
            columns: [
                { property: 'name', header: 'Name', sortable: true },
                { property: 'birth_year', header: 'Birth year', sortable: true },
                { property: 'gender', header: 'Gender' }
            ],
            rowLink: true
        };
        this.getCharacters();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getCharacters = (
        pageIndex = 1,
        pageSize = 10,
        search: string | null = null
    ): void => {
        this.appLoader.toggleLoader();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.service
            .getCharacters({ pageIndex: pageIndex, pageSize: pageSize, search: search })
            .subscribe({
                next: (response: ActionResponse<Character>) => {
                    this.setTable(response, pageIndex);
                    this.appLoader.toggleLoader();
                    this.detectChanges();
                },
                error: (error: HttpErrorResponse) => {
                    this.appLoader.toggleLoader();
                }
            });
    };

    setTable = (data: ActionResponse<Character>, page: number): void => {
        this.tableConfig = {
            ...this.tableConfig,
            data: data.results,
            currentPage: page,
            count: data.count
        };
    };

    pageChanged = (event: PageEvent): void => {
        this.getCharacters(event.pageIndex, event.pageSize);
    };

    search = (query: string): void => {
        this.getCharacters(1, 10, query);
    };

    rowClicked = (row: Character): void => {
        this.router.navigate(['../details/' + getIdFromUrl(row.url)], {
            relativeTo: this.route
        });
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
