import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';

@Component({
    selector: 'film-list',
    templateUrl: './film-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmListComponent {
    constructor(private cdr: ChangeDetectorRef) {}

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
