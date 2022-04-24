import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../../core/services/http-client.service';
import { CharacterListComponent } from './character-list.component';
import { TableComponent } from '../../../core/components/table/table.component';
import { BasicSearchComponent } from '../../../core/components/basic-search/basic-search.component';
import { ContentBoxComponent } from '../../../core/components/content-box/content-box.component';
import { ActionButtonsComponent } from '../../../core/components/action-buttons/action-buttons.component';
import { FormsModule } from '@angular/forms';

describe('CharacterListComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [
                CharacterListComponent,
                TableComponent,
                BasicSearchComponent,
                ContentBoxComponent,
                ActionButtonsComponent
            ],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the CharacterListComponent', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should contain app-table element', () => {
        const fixture = TestBed.createComponent(CharacterListComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('app-table')).toBeTruthy();
    });
});
