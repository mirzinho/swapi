import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';
import { AppHttpClient } from '../../core/services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'characters',
    templateUrl: './films.html',
    styleUrls: ['./films.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsComponent {
    constructor(
        private http: AppHttpClient,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {}

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
