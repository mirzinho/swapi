import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../services/http-client.service';
import { BasicSearchComponent } from './basic-search.component';
import { BasicSearchService } from './basic-search.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('BasicSearchComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [BasicSearchComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient, BasicSearchService]
        }).compileComponents();
    });

    it('should create the BasicSearchComponent', () => {
        const fixture = TestBed.createComponent(BasicSearchComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain element with class search', () => {
        const fixture = TestBed.createComponent(BasicSearchComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.search')).toBeTruthy();
    });

    it('should set input value to Mirzet Murtic', () => {
        const fixture = TestBed.createComponent(BasicSearchComponent);
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('.search-term'));
        input.nativeElement.value = 'Mirzet Murtic';
        expect(input.nativeElement.value).toContain('Mirzet Murtic');
    });
});
