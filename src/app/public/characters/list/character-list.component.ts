import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';

@Component({
    selector: 'character-list',
    templateUrl: './character-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent {
    constructor(private cdr: ChangeDetectorRef) {}

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
