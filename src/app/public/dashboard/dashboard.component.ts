import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from '../../core/services/http-client.service';
import { EntityType } from '../../core/enums/enity-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private http: AppHttpClient) {}

    ngOnInit(): void {
        console.log('dash');

        this.http.get<any>(EntityType.People, {}).subscribe({
            next: (response: any) => {
                console.log('response', response);
            },
            error: (error: HttpErrorResponse) => {}
        });
    }
}
