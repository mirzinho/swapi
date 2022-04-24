import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewRef
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Film } from '../../../core/interfaces/films.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from '../../../core/services/films.service';
import { checkFavorite, curry, toggleFavoriteState } from '../../../core/utils/utils';
import { EntityType } from '../../../core/enums/enity-type.enum';
import { getIdFromUrl } from '../../../core/services/http-client.service';
import { catchError, forkJoin, map, of, Subscription } from 'rxjs';
import { CharacterService } from '../../characters/character.service';
import { Character } from '../../../core/interfaces/people.interface';
import { AppLoaderService } from '../../../core/components/app-loader/app-loader.service';
import { ActionButton } from '../../../core/components/action-buttons/action-buttons.component';

@Component({
    selector: 'film-details',
    templateUrl: './film-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FilmsService, CharacterService]
})
export class FilmDetailsComponent implements OnInit, OnDestroy {
    private id: string | null;
    public film: Film;
    public characters: Array<Character>;
    public actionButtons: Array<ActionButton>;

    public subscriptions: Subscription = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private service: FilmsService,
        private characterService: CharacterService,
        private appLoader: AppLoaderService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        if (this.id) {
            this.getFilm();
        }
        const buttons: Array<ActionButton> = [
            { icon: 'fa-table-list', method: this.backToList }
        ];
        this.subscriptions.add(
            this.route.queryParams.subscribe((params) => {
                if (params['characterId']) {
                    buttons.push({
                        icon: 'fa-user-astronaut',
                        method: curry(this.backToCharacter, params['characterId'])
                    });
                }
            })
        );

        this.actionButtons = [...buttons];
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getFilm = (): void => {
        this.appLoader.toggleLoader();
        this.service.getFilm(this.id as string).subscribe({
            next: (response: Film) => {
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
            this.appLoader.toggleLoader();
            this.detectChanges();
        });
    };

    backToList = (): void => {
        this.router.navigate(['../../list'], { relativeTo: this.route });
    };

    openCharacter = (character: Character): void => {
        this.router.navigate(
            ['public/characters/details/' + getIdFromUrl(character.url)],
            {
                queryParams: {
                    filmId: this.id
                }
            }
        );
    };

    backToCharacter = (id: string): void => {
        this.router.navigate(['public/characters/details/' + id]);
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
