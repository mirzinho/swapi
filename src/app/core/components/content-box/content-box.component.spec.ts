import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../services/http-client.service';
import { ContentBoxComponent } from './content-box.component';

describe('ContentBoxComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ContentBoxComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the ContentBoxComponent', () => {
        const fixture = TestBed.createComponent(ContentBoxComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain element with class content-box', () => {
        const fixture = TestBed.createComponent(ContentBoxComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.content-box')).toBeTruthy();
    });

    it('should set title  value to Mirzet Murtic', () => {
        const fixture = TestBed.createComponent(ContentBoxComponent);
        fixture.componentInstance.title = 'Mirzet Murtic';
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.title')?.textContent).toContain('Mirzet Murtic');
    });
});
