import { Router } from '@angular/router';
import { LocationsModel } from '../../shared/models/locations.model';
import { LocationDataService } from './services/location-data/location-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-location-selection',
    standalone: false,
    templateUrl: './location-selection.component.html',
    styleUrl: './location-selection.component.css'
})
export class LocationSelectionComponent implements OnInit {

    locations: LocationsModel[] = []

    constructor(
        private locationDataService: LocationDataService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.locationDataService.getLocations()
            .subscribe((response: any) => { this.locations = response })
    }

    selectLocation(location: string): void {
        this.router.navigate(['/home'], {
            queryParams: { unitLocaton: location }
        })
    }
}
