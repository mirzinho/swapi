import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { PublicPagesModule } from './public/public.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRouting, PublicPagesModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
