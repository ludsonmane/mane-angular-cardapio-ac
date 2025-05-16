import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    location: string = ''

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.location = this.activatedRoute.snapshot.paramMap.get('location') || ''
    }
}
