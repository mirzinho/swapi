import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films.component';
import { FilmListComponent } from './list/film-list.component';
import { FilmDetailsComponent } from './details/film-details.component';
const routes: Routes = [
    {
        path: '',
        component: FilmsComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: FilmListComponent
            },
            {
                path: 'details/:id',
                component: FilmDetailsComponent
            }
        ]
    }
];

export const FilmsRouting = RouterModule.forChild(routes);
