import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';

@Component({
    selector: 'character-details',
    templateUrl: './character-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsComponent {
    constructor(private cdr: ChangeDetectorRef) {}

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
