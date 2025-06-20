import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { TranslateModule } from '@ngx-translate/core';
import { RestaurantsMaterialModule } from '../../shared/materials/restaurants-material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        RestaurantsComponent
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
