import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../services/http-client.service';
import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [PagerComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the PagerComponent', () => {
        const fixture = TestBed.createComponent(PagerComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain element with class pager', () => {
        const fixture = TestBed.createComponent(PagerComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.pager')).toBeTruthy();
    });

    it('should contain Page 12 / 22', () => {
        const fixture = TestBed.createComponent(PagerComponent);
        fixture.componentInstance.currentPage = 12;
        fixture.componentInstance.totalPages = 22;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.page')?.textContent).toContain('Page 12 / 22');
    });
});
