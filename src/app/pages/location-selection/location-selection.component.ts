import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UnitLocationBottomSheetComponent } from '../../shared/components/unit-location-bottom-sheet/unit-location-bottom-sheet.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-location-selection',
    standalone: false,
    templateUrl: './location-selection.component.html',
    styleUrl: './location-selection.component.css'
})
export class LocationSelectionComponent implements OnInit {

    constructor(
        private matBottomSheet: MatBottomSheet,
        private router: Router
    ) {}

    ngOnInit(): void {
        const placeId = localStorage.getItem('place_id')

        if (placeId && placeId != '') {
            this.router.navigate(['/home'])
        } else { this.openBottomSheet() }
    }

    openBottomSheet(): void {
        this.matBottomSheet.open(UnitLocationBottomSheetComponent,
            { hasBackdrop: false }
        )
    }
}
