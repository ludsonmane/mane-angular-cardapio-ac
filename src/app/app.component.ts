import { Component, OnInit } from '@angular/core';
import { IconService } from './shared/services/icon/icon.service';
import { LanguageService } from './shared/services/language/language.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    constructor(
        private iconService: IconService,
        private languageService: LanguageService
    ) {}

    ngOnInit(): void {
        this.iconService.registerIcons()
    }
}
