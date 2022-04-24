import { Component, Inject } from '@angular/core';
import { AppLoaderService } from './core/components/app-loader/app-loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(@Inject(AppLoaderService) public appLoader: AppLoaderService) {}
}
