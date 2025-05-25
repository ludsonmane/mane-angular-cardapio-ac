import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-options',
    standalone: false,
    templateUrl: './options.component.html',
    styleUrl: './options.component.css'
})
export class OptionsComponent {
    options = [
        { label: 'Sobre nós', route: '/sobre-nos' },
        { label: 'Idioma', route: '/idioma' },
        { label: 'Reservas', route: '/reservas' },
        { label: 'Fome de música', route: '/musica' },
        { label: 'Clube Mané', route: '/clube-mane' }
    ]

    constructor(private router: Router) {}

    navigateTo(route: string) {
        this.router.navigate([route])
    }
}
