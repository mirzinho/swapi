import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface SidebarItem {
    icon: string;
    name: string;
    route: string;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
    public sidebarItems: Array<SidebarItem> = [
        { icon: 'users', name: 'Characters', route: './characters' },
        { icon: 'film', name: 'Films', route: './films' }
    ];
    constructor(private router: Router, private route: ActivatedRoute) {}

    open = (item: SidebarItem): void => {
        this.router.navigate([item.route], { relativeTo: this.route });
    };
}
