import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsComponent {
    constructor(private cdr: ChangeDetectorRef) {}

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
