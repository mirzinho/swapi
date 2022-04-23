import { Routes, RouterModule } from '@angular/router';
import { PublicPagesComponent } from './public.component';
import { ModuleWithProviders } from '@angular/core';
import { PublicPagesModule } from './public.module';

export const routes: Routes = [
    {
        path: 'public',
        component: PublicPagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            }
            // {
            //     path: 'change-password',
            //     loadChildren: () =>
            //         import('./change-password/change-password.module').then(
            //             (m) => m.ChangePasswordModule
            //         )
            // },
            // {
            //     path: 'reset-password',
            //     loadChildren: () =>
            //         import('./reset-password/reset-password.module').then(
            //             (m) => m.ResetPasswordModule
            //         )
            // },
            // {
            //     path: 'compare-localizations',
            //     loadChildren: () =>
            //         import('./compare-localizations/compare-localizations.module').then(
            //             (m) => m.CompareLocalizationsModule
            //         )
            // }
        ]
    }
];

export const PublicRouting: ModuleWithProviders<PublicPagesModule> =
    RouterModule.forChild(routes);
