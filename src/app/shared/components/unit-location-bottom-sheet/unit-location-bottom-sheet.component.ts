import { Component, OnInit } from '@angular/core';
import { UnitLocationService } from '../../services/unit-location/unit-location.service';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-unit-location-bottom-sheet',
    standalone: false,
    templateUrl: './unit-location-bottom-sheet.component.html',
    styleUrl: './unit-location-bottom-sheet.component.css'
})
export class UnitLocationBottomSheetComponent implements OnInit {

    locations: any[] = []

    constructor(
        private unitLocationService: UnitLocationService,
        private router: Router,
        private matBottomSheetRef: MatBottomSheetRef<UnitLocationBottomSheetComponent>
    ) {}

    ngOnInit(): void {
        this.getLocations()
    }

    getLocations(): void {
        this.unitLocationService.getLocations()
            .subscribe((response: any) => this.locations = response.data)
    }

    selectLocation(placeId: string, name: string): void {
        localStorage.setItem('place_id', placeId)
        localStorage.setItem('location_name', name)

        this.router.navigate(['/home'])
        this.matBottomSheetRef.dismiss()
    }
}
