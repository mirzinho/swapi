import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewRef
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Film } from '../../../core/interfaces/films.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from '../../../core/services/films.service';
import { checkFavorite, toggleFavoriteState } from '../../../core/utils/utils';
import { EntityType } from '../../../core/enums/enity-type.enum';
import { getIdFromUrl } from '../../../core/services/http-client.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { CharacterService } from '../../characters/character.service';
import { Character } from '../../../core/interfaces/people.interface';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmsService, CharacterService]
})
export class FilmDetailsComponent {
    private id: string | null;
    public film: Film;
    public characters: Array<Character>;
    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private service: FilmsService,
        private characterService: CharacterService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.getFilm();
        }
    }

    getFilm = (): void => {
        this.service.getFilm(this.id as string).subscribe({
            next: (response: Film) => {
                console.log('response', response);
                this.film = {
                    ...response,
                    ...{
                        isFavorite: checkFavorite(
                            this.film,
                            this.id as string,
                            EntityType.Films
                        )
                    }
                };
                this.getAdditionalData();
            },
            error: (error: HttpErrorResponse) => {}
        });
    };

    getAdditionalData = (): void => {
        const characterIds = this.film.characters.map((characterUrl: string) => {
            return getIdFromUrl(characterUrl);
        });

        const additionalData: Array<any> = [];
        for (let i = 0; i < characterIds.length; i++) {
            additionalData.push(
                this.characterService.getCharacter(characterIds[i]).pipe(
                    map((result) => {
                        return result;
                    }),
                    catchError((err) => {
                        return of(null);
                    })
                )
            );
        }

        forkJoin(additionalData).subscribe((response) => {
            this.characters = response;
            this.detectChanges();
        });
    };

    toggleFavoriteState = (): void => {
        this.film.isFavorite = toggleFavoriteState(
            this.film,
            this.id as string,
            EntityType.Films
        );
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
