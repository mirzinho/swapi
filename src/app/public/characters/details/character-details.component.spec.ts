import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../../core/services/http-client.service';
import { CharacterDetailsComponent } from './character-details.component';
import { Character } from '../../../core/interfaces/people.interface';
import { ContentBoxComponent } from '../../../core/components/content-box/content-box.component';
import { ActionButtonsComponent } from '../../../core/components/action-buttons/action-buttons.component';

describe('CharacterDetailsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                CharacterDetailsComponent,
                ContentBoxComponent,
                ActionButtonsComponent
            ],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the film details component', () => {
        const fixture = TestBed.createComponent(CharacterDetailsComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain content-box element', () => {
        const fixture = TestBed.createComponent(CharacterDetailsComponent);
        fixture.componentInstance.character = {
            name: 'Mirzet Murtic'
        } as Character;

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('content-box')).toBeTruthy();
    });

    it('should have character name - Mirzet Murtic', () => {
        const fixture = TestBed.createComponent(CharacterDetailsComponent);
        fixture.componentInstance.character = {
            name: 'Mirzet Murtic'
        } as Character;

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.star-title')?.textContent).toContain(
            'Mirzet Murtic'
        );
    });
});
