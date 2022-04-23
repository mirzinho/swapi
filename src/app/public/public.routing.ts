import { Routes, RouterModule } from '@angular/router';
import { PublicPagesComponent } from './public.component';
import { ModuleWithProviders } from '@angular/core';
import { PublicPagesModule } from './public.module';
import { DashboardResolver } from './dashboard/dashboard.resolver';
import { CharactersModule } from './characters/characters.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FilmsModule } from './films/films.module';

export const routes: Routes = [
    {
        path: 'public',
        component: PublicPagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                resolve: {
                    stats: DashboardResolver
                },
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m: { DashboardModule: DashboardModule }) => m.DashboardModule
                    )
            },
            {
                path: 'characters',
                loadChildren: () =>
                    import('./characters/characters.module').then(
                        (m: { CharactersModule: CharactersModule }) => m.CharactersModule
                    )
            },
            {
                path: 'films',
                loadChildren: () =>
                    import('./films/films.module').then(
                        (m: { FilmsModule: FilmsModule }) => m.FilmsModule
                    )
            }
        ]
    }
];

export const PublicRouting: ModuleWithProviders<PublicPagesModule> =
    RouterModule.forChild(routes);
