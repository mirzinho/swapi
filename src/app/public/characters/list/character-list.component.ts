import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewRef
} from '@angular/core';
import { CharacterService } from '../character.service';
import { ActionResponse } from '../../../core/interfaces/action-response.interface';
import { Character } from '../../../core/interfaces/people.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PageEvent, TableConfig } from '../../../core/components/table/table.interface';

@Component({
    selector: 'character-list',
    templateUrl: './character-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CharacterService]
})
export class CharacterListComponent implements OnInit {
    public tableConfig: TableConfig<Character>;
    constructor(private cdr: ChangeDetectorRef, private service: CharacterService) {}

    ngOnInit(): void {
        this.tableConfig = {
            columns: [
                { property: 'name', header: 'Name', sortable: true },
                { property: 'birth_year', header: 'Birth year', sortable: true },
                { property: 'gender', header: 'Gender' }
            ]
        };
        this.getCharacters();
    }

    getCharacters = (pageIndex = 1, pageSize = 10): void => {
        this.service
            .getCharacters({ pageIndex: pageIndex, pageSize: pageSize })
            .subscribe({
                next: (response: ActionResponse<Character>) => {
                    this.setTable(response, pageIndex);
                    this.detectChanges();
                },
                error: (error: HttpErrorResponse) => {}
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

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
