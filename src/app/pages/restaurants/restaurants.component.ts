import { RestaurantModel } from '../../shared/models/restaurant.model';
import { RestaurantService } from './../../shared/services/restaurant/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants',
  standalone: false,
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {
    search = ''

    listRestaurants: RestaurantModel[] = []
    filteredRestaurants: RestaurantModel[] = []

    constructor(private restaurantService: RestaurantService) {}

    ngOnInit(): void {
        this.loadRestaurants()
    }

    loadRestaurants(): void {
        this.restaurantService.getAllRestaurants()
            .subscribe((response) => {
                this.listRestaurants = response
                this.filteredRestaurants = response
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
}
