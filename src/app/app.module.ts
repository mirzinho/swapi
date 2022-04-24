import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { PublicPagesModule } from './public/public.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from './core/services/http-interceptor.service';
import { AppLoaderService } from './core/components/app-loader/app-loader.service';
import { AppLoaderComponent } from './core/components/app-loader/app-loader.component';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
];

@NgModule({
    declarations: [AppComponent, AppLoaderComponent],
    imports: [BrowserModule, AppRouting, PublicPagesModule, HttpClientModule],
    providers: [httpInterceptorProviders, AppLoaderService],
    bootstrap: [AppComponent]
})
export class AppModule {}
