import { Component, Inject } from '@angular/core';
import { AppLoaderService } from './core/components/app-loader/app-loader.service';
import { BasicSearchService } from './core/components/basic-search/basic-search.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        @Inject(AppLoaderService) public appLoader: AppLoaderService,
        @Inject(BasicSearchService) public basicSearch: BasicSearchService
    ) {}
}
