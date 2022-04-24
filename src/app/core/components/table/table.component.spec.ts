import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppHttpClient } from '../../services/http-client.service';
import { TableComponent } from './table.component';
import { BasicSearchComponent } from '../basic-search/basic-search.component';
import { TableConfig } from './table.interface';
import { FormsModule } from '@angular/forms';
import { PagerComponent } from '../pager/pager.component';

describe('TableComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [TableComponent, BasicSearchComponent, PagerComponent],
            providers: [HttpClient, HttpHandler, AppHttpClient]
        }).compileComponents();
    });

    it('should create the TableComponent', () => {
        const fixture = TestBed.createComponent(TableComponent);
        const filmList = fixture.componentInstance;
        expect(filmList).toBeTruthy();
    });

    it('should have a table header cell with Name', () => {
        const fixture = TestBed.createComponent(TableComponent);
        fixture.componentInstance.config = {
            columns: [{ property: 'name', header: 'Name' }]
        } as TableConfig<any>;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('th')?.textContent).toContain('Name');
    });

    it('should have table cell with content Mirzet', () => {
        const fixture = TestBed.createComponent(TableComponent);
        fixture.componentInstance.config = {
            columns: [{ property: 'name', header: 'Name' }],
            data: [{ name: 'Mirzet' }]
        } as TableConfig<any>;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('td')?.textContent).toContain('Mirzet');
    });
});
