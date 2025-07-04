import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-restaurant-info',
    standalone: false,
    templateUrl: './restaurant-info.component.html',
    styleUrl: './restaurant-info.component.css'
    })
export class RestaurantInfoComponent {
    @Input() id!: string
    @Input() imageUrl!: string
    @Input() name!: string
    @Input() description!: string

    constructor(private router: Router) {}

    onGoToRestaurant(): void {
        console.log(this.id)
        this.router.navigate([`/restaurantes/${this.id}`])
    }
}
