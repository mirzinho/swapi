import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../../core/services/http-client.service';
import { ActionButton, ActionButtonsComponent } from './action-buttons.component';

describe('ActionButtonsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ActionButtonsComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the action button component', () => {
        const fixture = TestBed.createComponent(ActionButtonsComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain element with action button-class', () => {
        const fixture = TestBed.createComponent(ActionButtonsComponent);
        fixture.componentInstance.buttons = [
            {
                icon: 'fa-refresh',
                method: (): void => {
                    console.log('test');
                }
            }
        ] as Array<ActionButton>;

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.action-buttons')).toBeTruthy();
    });

    it('should contain one i element with fa-refresh class', () => {
        const fixture = TestBed.createComponent(ActionButtonsComponent);
        fixture.componentInstance.buttons = [
            {
                icon: 'fa-refresh',
                method: (): void => {
                    console.log('test');
                }
            }
        ] as Array<ActionButton>;

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.fa-refresh')).toBeTruthy();
    });
});
