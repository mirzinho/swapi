import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewRef
} from '@angular/core';
import { AppHttpClient } from '../../core/services/http-client.service';
import { DashboardStats } from './dashboard.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    public dashboardStats: DashboardStats;

    constructor(
        private http: AppHttpClient,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {
        this.dashboardStats = this.route.snapshot.data['stats'];
    }

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
