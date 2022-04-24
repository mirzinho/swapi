import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../services/http-client.service';
import { SidebarComponent, SidebarItem } from './sidebar.component';

describe('SidebarComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SidebarComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the SidebarComponent', () => {
        const fixture = TestBed.createComponent(SidebarComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain element with id app-sidebar', () => {
        const fixture = TestBed.createComponent(SidebarComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('#app-sidebar')).toBeTruthy();
    });
    it('should contain Boba Fett within user-name element', () => {
        const fixture = TestBed.createComponent(SidebarComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.user-name')?.textContent).toContain('Boba Fett');
    });

    it('should have a sidebar item containing Starwars Films', () => {
        const fixture = TestBed.createComponent(SidebarComponent);
        fixture.componentInstance.sidebarItems = [
            {
                icon: 'fa-user',
                name: 'Starwars Films',
                route: 'null'
            }
        ] as Array<SidebarItem>;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.item')?.textContent).toContain('Starwars Films');
    });
});
