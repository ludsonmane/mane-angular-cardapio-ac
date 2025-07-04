import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { placeGuard } from './shared/guards/place/place.guard';

const routes: Routes = [
    {
        path: 'unidade',
        loadChildren: () => import('./pages/location-selection/location-selection.module').then(m => m.LocationSelectionModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        canActivate: [ placeGuard ]
    },
    {
        path: 'produto/:data',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        canActivate: [ placeGuard ]
    },
    {
        path: 'restaurantes',
        loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule),
        canActivate: [ placeGuard ]
    },
    {
        path: 'buscar',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule),
        canActivate: [ placeGuard ]
    },
    {
        path: 'favoritos',
        loadChildren: () => import('./pages/favorites/favorites.module').then(m => m.FavoritesModule),
        canActivate: [ placeGuard ]
    },
    {
        path: 'opcoes',
        loadChildren: () => import('./pages/options/options.module').then(m => m.OptionsModule),
        canActivate: [ placeGuard ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
