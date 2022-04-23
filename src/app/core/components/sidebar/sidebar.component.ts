import { Component, OnInit } from '@angular/core';

export interface SidebarItem {
    icon: string;
    name: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
    public sidebarItems: Array<SidebarItem> = [
        { icon: 'users', name: 'Characters' },
        { icon: 'film', name: 'Movies' }
    ];
    constructor() {}
}
