import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(private translateService: TranslateService) {
        const languageSave = localStorage.getItem('language') || 'pt-br'

        // Define linguagem default
        this.translateService.setDefaultLang('pt-br')
        this.translateService.use(languageSave)
    }

    public changeLanguage(language: string) {
        this.translateService.use(language)
        localStorage.setItem('language', language)
    }

    public currentLanguage(): string {
        return this.translateService.currentLang || 'pt-br'
    }
}
