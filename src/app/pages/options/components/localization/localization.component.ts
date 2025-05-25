import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UnitLocationBottomSheetComponent } from '../../../../shared/components/unit-location-bottom-sheet/unit-location-bottom-sheet.component';

@Component({
    selector: 'app-localization',
    standalone: false,
    templateUrl: './localization.component.html',
    styleUrl: './localization.component.css'
})
export class LocalizationComponent {

    constructor(private matBottomSheet: MatBottomSheet) {}

    openBottomSheetLocation(): void {
        this.matBottomSheet.open(UnitLocationBottomSheetComponent)
    }
}
