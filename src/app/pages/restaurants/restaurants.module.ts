import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { TranslateModule } from '@ngx-translate/core';
import { RestaurantsMaterialModule } from '../../shared/materials/restaurants-material.module';
import { SharedModule } from '../../shared/shared.module';
import { DetailsRestaurantComponent } from './pages/details-restaurant/details-restaurant.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutRestaurantBottomSheetComponent } from './components/about-restaurant-bottom-sheet/about-restaurant-bottom-sheet/about-restaurant-bottom-sheet.component';


@NgModule({
    declarations: [
        RestaurantsComponent,
        DetailsRestaurantComponent,
        HeaderComponent,
        AboutRestaurantBottomSheetComponent
    ],
    imports: [
        CommonModule,
        RestaurantsRoutingModule,
        TranslateModule,
        RestaurantsMaterialModule,
        SharedModule
    ]
})
export class RestaurantsModule { }
