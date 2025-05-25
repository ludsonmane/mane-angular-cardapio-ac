import { Component } from '@angular/core';
import { LanguageService } from '../../../../shared/services/language/language.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-language-bottom-sheet',
    standalone: false,
    templateUrl: './language-bottom-sheet.component.html',
    styleUrl: './language-bottom-sheet.component.css'
})
export class LanguageBottomSheetComponent {

    languages = [
        { label: 'Português', slug: 'pt-br', imageUrl: 'icon/languages/pt-br.png' },
        { label: 'English', slug: 'us', imageUrl: 'icon/languages/us.png' },
        { label: 'Espanõl', slug: 'es', imageUrl: 'icon/languages/es.png' },
        { label: 'Français', slug: 'fr', imageUrl: 'icon/languages/fr.png' },
    ]

    constructor(
        private languageService: LanguageService,
        private bottomSheetRef: MatBottomSheetRef<LanguageBottomSheetComponent>
    ) {}

    selectLanguage(slug: string): void {
        this.languageService.changeLanguage(slug)
        this.bottomSheetRef.dismiss()
    }
}
