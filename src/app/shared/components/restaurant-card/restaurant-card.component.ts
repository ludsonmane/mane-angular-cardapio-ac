import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  standalone: false,
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {
    @Input() id!: string
    @Input() imageLogoUrl!: string
    @Input() name!: string
}
