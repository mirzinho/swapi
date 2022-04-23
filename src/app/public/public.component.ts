import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'public',
    templateUrl: './public.html',
    styleUrls: ['public.scss']
})
export class PublicPagesComponent {
    constructor() {
        console.log('public');
    }
}
