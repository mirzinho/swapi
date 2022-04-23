import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from '../../core/services/http-client.service';
import { DashboardStats } from './dashboard.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
    public dashboardStats: DashboardStats;

    constructor(private http: AppHttpClient, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.dashboardStats = this.route.snapshot.data['stats'];
        console.log('stats', this.dashboardStats);
    }
}
