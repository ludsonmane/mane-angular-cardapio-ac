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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
