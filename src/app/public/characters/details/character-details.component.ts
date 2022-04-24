import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../../../core/interfaces/people.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PlanetService } from '../../../core/services/planet.service';
import { Planet } from '../../../core/interfaces/planet.interface';
import { getIdFromUrl } from '../../../core/services/http-client.service';
import { FilmsService } from '../../../core/services/films.service';
import { Film } from '../../../core/interfaces/films.interface';
import { catchError, forkJoin, map, of, Subscription } from 'rxjs';
import { checkFavorite, curry, toggleFavoriteState } from '../../../core/utils/utils';
import { EntityType } from '../../../core/enums/enity-type.enum';
import { AppLoaderService } from '../../../core/components/app-loader/app-loader.service';
import { ActionButton } from '../../../core/components/action-buttons/action-buttons.component';

@Component({
    selector: 'character-details',
    templateUrl: './character-details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CharacterService, PlanetService, FilmsService]
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    private id: string | null;
    public character: Character;
    public planet: Planet;
    public films: Array<Film>;
    public actionButtons: Array<ActionButton>;

    public subscriptions: Subscription = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private service: CharacterService,
        private planetService: PlanetService,
        private filmsService: FilmsService,
        private appLoader: AppLoaderService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.getCharacter();
        }

        const buttons: Array<ActionButton> = [
            { icon: 'fa-table-list', method: this.backToList }
        ];
        this.subscriptions.add(
            this.route.queryParams.subscribe((params) => {
                if (params['filmId']) {
                    buttons.push({
                        icon: 'fa-film',
                        method: curry(this.backToFilm, params['filmId'])
                    });
                }
            })
        );

        this.actionButtons = [...buttons];
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getCharacter = (): void => {
        this.appLoader.toggleLoader();
        this.service.getCharacter(this.id as string).subscribe({
            next: (response: Character) => {
                this.character = {
                    ...response,
                    ...{
                        isFavorite: checkFavorite(
                            this.character,
                            this.id as string,
                            EntityType.People
                        )
                    }
                };
                this.getAdditionalData();
            },
            error: (error: HttpErrorResponse) => {}
        });
    };

    getAdditionalData = (): void => {
        const planetId = getIdFromUrl(this.character.homeworld);
        const filmIds = this.character.films.map((filmUrl: string) => {
            return getIdFromUrl(filmUrl);
        });

        const additionalData: Array<any> = [];
        for (let i = 0; i < filmIds.length; i++) {
            additionalData.push(
                this.filmsService.getFilm(filmIds[i]).pipe(
                    map((result) => {
                        return result;
                    }),
                    catchError((err) => {
                        return of(null);
                    })
                )
            );
        }

        this.planetService.getPlanet(planetId).subscribe({
            next: (response: Planet) => {
                this.planet = response;
            },
            error: (error: HttpErrorResponse) => {}
        });

        forkJoin(additionalData).subscribe((response) => {
            this.films = response;
            this.appLoader.toggleLoader();
            this.detectChanges();
        });
    };

    toggleFavoriteState = (): void => {
        this.character.isFavorite = toggleFavoriteState(
            this.character,
            this.id as string,
            EntityType.People
        );
    };

    openFilm = (film: Film): void => {
        this.router.navigate(['public/films/details/' + getIdFromUrl(film.url)], {
            queryParams: {
                characterId: this.id
            }
        });
    };

    backToList = (): void => {
        this.router.navigate(['../../list'], { relativeTo: this.route });
    };

    backToFilm = (id: string): void => {
        this.router.navigate(['public/films/details/' + id]);
    };

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
