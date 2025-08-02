import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bottom-nav',
    standalone: false,
    templateUrl: './bottom-nav.component.html',
    styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent implements OnInit {

    unitLocation: string = localStorage.getItem('place_id') || ''

    navItems = [
        {
            label: 'MENU.HOME',
            icon: 'comma',
            route: '/home',
        },
        {
            label: 'MENU.RESTAURANTS',
            icon: 'restaurant-border',
            activeIcon: 'restaurant',
            route: '/restaurantes/home',
        },
        {
            label: 'MENU.SEARCH',
            icon: 'search',
            route: '/buscar',
        },
        {
            label: 'MENU.FAVORITES',
            icon: 'favorite-border',
            route: '/favoritos',
        },
        {
            label: 'MENU.OPTIONS',
            icon: 'options',
            route: '/opcoes',
        }
    ]

    constructor(public router: Router) { }

    ngOnInit(): void {
        if (this.unitLocation == '') {
            // redireciona para uma tela de seleção de unidade, por exemplo
            this.router.navigate(['/'])
            return
        }
    }

    getIcon(item: any): string {
        if (this.isActive(item.route) && item.activeIcon) {
            return item.activeIcon
        }
        return item.icon
    }

    isActive(route: string): boolean {
        return this.router.url.startsWith(route)
    }
}
