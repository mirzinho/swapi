import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../../core/services/http-client.service';
import { FilmDetailsComponent } from './film-details.component';
import { Film } from '../../../core/interfaces/films.interface';
import { ContentBoxComponent } from '../../../core/components/content-box/content-box.component';
import { ActionButtonsComponent } from '../../../core/components/action-buttons/action-buttons.component';

describe('FilmDetailsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                FilmDetailsComponent,
                ContentBoxComponent,
                ActionButtonsComponent
            ],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the film details component', () => {
        const fixture = TestBed.createComponent(FilmDetailsComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain content-box element', () => {
        const fixture = TestBed.createComponent(FilmDetailsComponent);
        fixture.componentInstance.film = {
            title: 'Film title'
        } as Film;

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('content-box')).toBeTruthy();
    });

    it('should have Film title', () => {
        const fixture = TestBed.createComponent(FilmDetailsComponent);
        fixture.componentInstance.film = {
            title: 'Film title'
        } as Film;

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.star-title')?.textContent).toContain(
            'Film title'
        );
    });
});
