import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { LanguageBottomSheetComponent } from './components/language-bottom-sheet/language-bottom-sheet.component';

@Component({
    selector: 'app-options',
    standalone: false,
    templateUrl: './options.component.html',
    styleUrl: './options.component.css'
})
export class OptionsComponent {
    options = [
        //{ label: 'Sobre nós', route: '/sobre-nos' },
        { label: 'Idioma', route: '/idioma' },
        //{ label: 'Reservas', route: '/reservas' },
        //{ label: 'Fome de música', route: '/musica' },
        //{ label: 'Clube Mané', route: '/clube-mane' }
    ]

    constructor(
        private router: Router,
        private matBottomSheet: MatBottomSheet
    ) {}

    navigateTo(route: string) {
        if (route === '/idioma')
            this.matBottomSheet.open(LanguageBottomSheetComponent)
        else
            this.router.navigate([route])
    }
}
