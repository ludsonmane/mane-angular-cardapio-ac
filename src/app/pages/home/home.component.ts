import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    locationId: string = ''

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.locationId = this.activatedRoute.snapshot.paramMap.get('location') || ''
    }
}
