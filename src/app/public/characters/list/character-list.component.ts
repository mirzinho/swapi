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

@Component({
    selector: 'character-list',
    templateUrl: './character-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CharacterService]
})
export class CharacterListComponent implements OnInit {
    constructor(private cdr: ChangeDetectorRef, private service: CharacterService) {}

    ngOnInit(): void {
        this.service.getCharacters().subscribe({
            next: (response: ActionResponse<Character>) => {
                console.log('response', response);
            },
            error: (error: HttpErrorResponse) => {}
        });
    }

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
