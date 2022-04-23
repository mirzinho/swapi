import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters.component';
import { CharacterListComponent } from './list/character-list.component';
import { CharacterDetailsComponent } from './details/character-details.component';
const routes: Routes = [
    {
        path: '',
        component: CharactersComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
                path: 'list',
                component: CharacterListComponent
            },
            {
                path: 'details/:id',
                component: CharacterDetailsComponent
            }
        ]
    }
];

export const CharactersRouting = RouterModule.forChild(routes);
