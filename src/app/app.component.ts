import { Component, OnInit } from '@angular/core';
import { IconService } from './shared/services/icon/icon.service';
import { LanguageService } from './shared/services/language/language.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    showMenu: boolean = false

    constructor(
        private iconService: IconService,
        private languageService: LanguageService,
        private router: Router
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event) => {
                const url =  (event as NavigationEnd).urlAfterRedirects

                // Rotas que devem mostrar o menu
                const routesWithMenu = [
                    '/home',
                    '/restaurantes',
                    '/buscar',
                    '/favoritos',
                    '/opcoes'
                ]

                this.showMenu = routesWithMenu.some(route => url.startsWith(route))
            })
    }

    ngOnInit(): void {
        this.iconService.registerIcons()
    }
}
