import { NgModule } from '@angular/core';
import { PublicPagesComponent } from './public.component';
import { PublicRouting } from './public.routing';
import { NgaModule } from '../core/modules/nga.module';
import { DashboardResolver } from './dashboard/dashboard.resolver';

@NgModule({
    imports: [PublicRouting, NgaModule],
    declarations: [PublicPagesComponent],
    exports: [],
    providers: [DashboardResolver]
})
export class PublicPagesModule {}
