import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/location-selection/location-selection.module').then(m => m.LocationSelectionModule)
    },
    {
        path: 'home/:location',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'produto/:id',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
    },
    {
        path: 'restaurantes',
        loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
    },
    {
        path: 'restaurantes/:id',
        loadChildren: () => import('./pages/details-restaurant/details-restaurant.module').then(m => m.DetailsRestaurantModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
