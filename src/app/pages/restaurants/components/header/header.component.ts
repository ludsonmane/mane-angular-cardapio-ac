import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AboutRestaurantBottomSheetComponent } from '../about-restaurant-bottom-sheet/about-restaurant-bottom-sheet/about-restaurant-bottom-sheet.component';

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
    @Input() imageUrl!: string
    @Input() scrolled: boolean = false
    @Input() headerBg!: string
    @Input() colorTitle!: string
    @Input() aboutRestaurant!: string

    constructor(private matBottomSheet: MatBottomSheet) {}

    openInfo(): void {
        this.matBottomSheet.open(AboutRestaurantBottomSheetComponent, {
            data: {
                imageUrl: this.imageUrl,
                title: this.title,
                colorTitle: this.colorTitle,
                text: this.aboutRestaurant
            }
        })
    }
}
