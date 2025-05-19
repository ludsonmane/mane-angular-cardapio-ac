import { Component, OnInit } from '@angular/core';
import { UnitLocationService } from '../../services/unit-location/unit-location.service';
import { LocationModel } from '../../models/location.model';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-unit-location-bottom-sheet',
    standalone: false,
    templateUrl: './unit-location-bottom-sheet.component.html',
    styleUrl: './unit-location-bottom-sheet.component.css'
})
export class UnitLocationBottomSheetComponent implements OnInit {

    locations: LocationModel[] = []

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
            .subscribe((response) => this.locations = response)
    }

    selectLocation(locationId: string): void {
        this.router.navigate(['/home', locationId])
        this.matBottomSheetRef.dismiss()
    }
}
