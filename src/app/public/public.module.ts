import { NgModule } from '@angular/core';
import { PublicPagesComponent } from './public.component';
import { PublicRouting } from './public.routing';
import { SharedModule } from '../core/modules/shared.module';

@NgModule({
    imports: [PublicRouting, SharedModule],
    declarations: [PublicPagesComponent],
    exports: [],
    providers: []
})
export class PublicPagesModule {}
