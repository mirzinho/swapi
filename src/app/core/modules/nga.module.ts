import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AppHttpClient } from '../services/http-client.service';
import { ContentBoxComponent } from '../components/content-box/content-box.component';
import { HeaderComponent } from '../components/header/header.component';
import { TableComponent } from '../components/table/table.component';
import { PagerComponent } from '../components/pager/pager.component';
import { BasicSearchComponent } from '../components/basic-search/basic-search.component';
import { AppLoaderService } from '../components/app-loader/app-loader.service';

const NGA_COMPONENTS: any = [
    HeaderComponent,
    SidebarComponent,
    ContentBoxComponent,
    TableComponent,
    PagerComponent,
    BasicSearchComponent
];

const NGA_DIRECTIVES: any = [];

const NGA_PIPES: any = [];

const NGA_SERVICES: any = [AppHttpClient];

const NGA_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const NGA_EXPORT_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

@NgModule({
    declarations: [...NGA_COMPONENTS, ...NGA_DIRECTIVES, ...NGA_PIPES],
    imports: [...NGA_MODULES],
    exports: [...NGA_COMPONENTS, ...NGA_DIRECTIVES, ...NGA_EXPORT_MODULES, ...NGA_PIPES],
    providers: [...NGA_SERVICES]
})
export class NgaModule {
    static forRoot(): ModuleWithProviders<NgaModule> {
        return {
            ngModule: NgaModule,
            providers: [...NGA_SERVICES]
        };
    }
}
