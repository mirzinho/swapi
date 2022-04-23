import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilmsComponent } from './films.component';
import { FilmsRouting } from './films.routing';
import { NgaModule } from '../../core/modules/nga.module';
import { FilmListComponent } from './list/film-list.component';
import { FilmDetailsComponent } from './details/film-details.component';

@NgModule({
    imports: [FilmsRouting, NgaModule],
    declarations: [FilmsComponent, FilmListComponent, FilmDetailsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilmsModule {}
