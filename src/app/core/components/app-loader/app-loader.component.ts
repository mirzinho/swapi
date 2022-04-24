import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewRef
} from '@angular/core';
import { AppLoaderService } from './app-loader.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './app-loader.html',
    styleUrls: ['./app-loader.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLoaderComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    public showLoader = false;

    constructor(private service: AppLoaderService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.subscription.add(
            this.service.toggleLoader$.subscribe((toggle: boolean) => {
                this.showLoader = !this.showLoader;
                this.detectChanges();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    detectChanges(): void {
        if (!(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
        }
    }
}
