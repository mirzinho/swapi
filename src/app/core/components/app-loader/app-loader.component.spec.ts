import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppLoaderComponent } from './app-loader.component';
import { AppHttpClient } from '../../services/http-client.service';

describe('AppLoaderComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppLoaderComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the apploader component', () => {
        const fixture = TestBed.createComponent(AppLoaderComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain element with id preloader', () => {
        const fixture = TestBed.createComponent(AppLoaderComponent);
        fixture.componentInstance.showLoader = true;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('#preloader')).toBeTruthy();
    });
});
