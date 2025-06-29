import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/location-selection/location-selection.module').then(m => m.LocationSelectionModule)
    },
    {
        path: 'home',
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
        path: 'buscar',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
    },
    {
        path: 'favoritos',
        loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule)
    },
    {
        path: 'opcoes',
        loadChildren: () => import('./pages/options/options.module').then(m => m.OptionsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
