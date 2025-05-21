import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Input() imageUrl!: string

    goBack(): void {}

    toggleFavorite(): void {}

    shareItem(): void {}
}
