import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CharactersComponent } from './characters.component';
import { CharactersRouting } from './characters.routing';
import { NgaModule } from '../../core/modules/nga.module';
import { CharacterListComponent } from './list/character-list.component';
import { CharacterDetailsComponent } from './details/character-details.component';

@NgModule({
    imports: [CharactersRouting, NgaModule],
    declarations: [
        CharactersComponent,
        CharacterListComponent,
        CharacterDetailsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CharactersModule {}
