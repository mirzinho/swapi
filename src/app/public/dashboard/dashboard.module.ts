import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard.routing';
import { NgaModule } from '../../core/modules/nga.module';

@NgModule({
    imports: [DashboardRouting, NgaModule],
    declarations: [DashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
