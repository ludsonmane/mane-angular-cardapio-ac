import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Input() title!: string
    @Input() description!: string
    @Input() imageLogoUrl!: string
    @Input() scrolled: boolean = false
    @Input() headerBg!: string
    @Input() colorTitle!: string

    goBack(): void {}

    shareItem(): void {}

    openInfo(): void {}
}
