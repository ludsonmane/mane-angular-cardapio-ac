import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { DetailsRestaurantComponent } from './pages/details-restaurant/details-restaurant.component';

const routes: Routes = [
    { path: 'home', component: RestaurantsComponent },
    { path: ':id', component: DetailsRestaurantComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
