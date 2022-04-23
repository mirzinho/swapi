import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppModule } from './app.module';

export const routes: Routes = [
    { path: '', redirectTo: 'public/dashboard', pathMatch: 'full' },
    { path: './', redirectTo: 'public/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'public/dashboard', pathMatch: 'full' }
];

export const AppRouting: ModuleWithProviders<AppModule> = RouterModule.forRoot(routes, {
    useHash: false,
    relativeLinkResolution: 'legacy'
});
