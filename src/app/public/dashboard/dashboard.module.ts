import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard.routing';

@NgModule({
    imports: [DashboardRouting],
    declarations: [DashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
