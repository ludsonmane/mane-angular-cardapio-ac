
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../../shared/services/restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-restaurants',
    standalone: false,
    templateUrl: './restaurants.component.html',
    styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {
    search = ''

    listRestaurants: any[] = []
    filteredRestaurants: any[] = []

    constructor(
        private restaurantService: RestaurantService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadRestaurants()
    }

    loadRestaurants(): void {
        this.restaurantService.getAllRestaurants()
            .subscribe((response: any) => {
                this.listRestaurants = response.data
                this.filteredRestaurants = response.data
            })
    }

    filterRestaurants(): void {
        this.filteredRestaurants = this.listRestaurants.filter((item) =>
            item.name.toLowerCase().includes(this.search.toLowerCase())
        )
    }

    cancelSearch(): void {
        this.search = ''
        this.loadRestaurants()
    }

    openDetailsRestaurant(id: string): void {
        this.router.navigate(['restaurantes/', id])
    }
}
