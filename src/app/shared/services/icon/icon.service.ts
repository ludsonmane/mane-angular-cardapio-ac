import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsEnum } from '../../models/icons.enum';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) { }

    public registerIcons(): void {
        this.loadIcons(Object.values(IconsEnum), 'icon')
    }

    private loadIcons(iconKeys: string[], iconUrl: string): void {
        iconKeys.forEach(key => {
            this.matIconRegistry.addSvgIcon(
                key,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`)
            )
        })
    }
}
