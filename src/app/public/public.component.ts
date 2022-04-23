import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'public',
    templateUrl: './public.html',
    styleUrls: ['public.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicPagesComponent {}
