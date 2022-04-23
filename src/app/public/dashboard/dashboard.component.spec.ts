import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { AppHttpClient } from '../../core/services/http-client.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DashboardComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DashboardComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the dashboard', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const dashboard = fixture.componentInstance;
        expect(dashboard).toBeTruthy();
    });

    it(`dashboard stats should be undefined`, () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        const dashboard = fixture.componentInstance;
        expect(dashboard.dashboardStats).toBeUndefined();
    });

    it('should contain 12 in content-box element', () => {
        const fixture = TestBed.createComponent(DashboardComponent);
        fixture.componentInstance.dashboardStats = {
            characters: 12,
            films: 0
        };
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('content-box')?.textContent).toContain('12');
    });
});
