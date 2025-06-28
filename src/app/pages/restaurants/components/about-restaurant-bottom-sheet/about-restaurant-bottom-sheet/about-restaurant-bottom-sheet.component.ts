import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-about-restaurant-bottom-sheet',
    standalone: false,
    templateUrl: './about-restaurant-bottom-sheet.component.html',
    styleUrl: './about-restaurant-bottom-sheet.component.css'
})
export class AboutRestaurantBottomSheetComponent {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        public matBottomSheetRef: MatBottomSheetRef
    ) {}
}
