import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-restaurant-card',
    standalone: false,
    templateUrl: './restaurant-card.component.html',
    styleUrl: './restaurant-card.component.css'
    })
export class RestaurantCardComponent {
    @Input() id!: string
    @Input() imageUrl!: string
    @Input() name!: string
    @Input() description!: string

    constructor(private router: Router) {}

    onGoToRestaurant(): void {
        this.router.navigate(['', this.id])
    }
}
