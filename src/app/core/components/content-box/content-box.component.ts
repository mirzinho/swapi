import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'content-box',
    templateUrl: './content-box.html',
    styleUrls: ['./content-box.scss']
})
export class ContentBoxComponent {
    @Input() public title: string | null = null;
    constructor() {}
}
