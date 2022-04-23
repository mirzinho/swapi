import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const APP_COMPONENTS: any = [];
const NGA_COMPONENTS: any = [];

const NGA_DIRECTIVES: any = [];

const NGA_PIPES: any = [];

const NGA_SERVICES: any = [];

const NGA_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const NGA_EXPORT_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

@NgModule({
    declarations: [...APP_COMPONENTS, ...NGA_COMPONENTS, ...NGA_DIRECTIVES, ...NGA_PIPES],
    imports: [...NGA_MODULES],
    exports: [
        ...APP_COMPONENTS,
        ...NGA_COMPONENTS,
        ...NGA_DIRECTIVES,
        ...NGA_EXPORT_MODULES,
        ...NGA_PIPES
    ],
    providers: [...NGA_SERVICES]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [...NGA_SERVICES]
        };
    }
}
